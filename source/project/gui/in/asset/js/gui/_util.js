(function () {
    'use strict';

    const GUI = window.SynticoreGui;
    const { STATE, UI } = GUI;
    const GUI_CONFIG_STORAGE_KEY = 'synticore-gui-config';
    const THEME_STORAGE_KEY = 'synticore-gui-theme';
    const LOG_ENTRY_LIMIT = 200;
    const TOOLTIP_LONG_PRESS_MS = 420;
    const TOOLTIP_VIEWPORT_MARGIN = 12;
    const TOOLTIP_DISMISS_LOCK_MS = 260;
    const TOOLTIP_KEYBOARD_NAV_MS = 700;

    GUI.setLoading = function setLoading(message, visible) {
        if (message) {
            UI.loadingText.textContent = message;
        }
        UI.loadingOverlay.hidden = !visible;
    };

    GUI.api = async function api(path, options = {}) {
        const response = await fetch(path, {
            method: options.method || 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: options.body ? JSON.stringify(options.body) : undefined
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok || data.ok === false) {
            const error = new Error(String(data.message || `Request failed: ${response.status}`));
            error.status = response.status;
            error.data = data;
            throw error;
        }
        return data;
    };

    GUI.getBrowserNameFromUserAgent = function getBrowserNameFromUserAgent(userAgent = '') {
        const raw = String(userAgent || '');
        if (!raw) return 'browser';
        if (/edg\//i.test(raw)) return 'edge';
        if (/opr\/|opera/i.test(raw)) return 'opera';
        if (/firefox\/|fxios\//i.test(raw)) return 'firefox';
        if (/chrome\/|crios\//i.test(raw)) return 'chrome';
        if (/safari\//i.test(raw) && !/chrome\/|crios\/|android/i.test(raw)) return 'safari';
        return 'browser';
    };

    GUI.getClientDeviceType = function getClientDeviceType() {
        const nav = typeof navigator !== 'undefined' ? navigator : null;
        const userAgent = String(nav && nav.userAgent || '').toLowerCase();
        const maxTouchPoints = Number(nav && nav.maxTouchPoints || 0);

        if (/ipad|tablet/i.test(userAgent)) return 'tablet';
        if (/mobi|iphone|android/i.test(userAgent)) return 'mobile';
        if (maxTouchPoints > 1 && /macintosh/i.test(userAgent)) return 'tablet';
        return 'desktop';
    };

    GUI.setCheckboxButtonState = function setCheckboxButtonState(button, isChecked, options = {}) {
        if (!button) return button;
        const checked = Boolean(isChecked);
        button.setAttribute('aria-pressed', checked ? 'true' : 'false');
        button.classList.toggle('font-icon--interface--checkbox-on', checked);
        button.classList.toggle('font-icon--interface--checkbox-off', !checked);
        if (Object.prototype.hasOwnProperty.call(options, 'disabled')) {
            button.disabled = Boolean(options.disabled);
            button.classList.toggle('is-disabled', Boolean(options.disabled));
        }
        return button;
    };

    GUI.isCheckboxButtonChecked = function isCheckboxButtonChecked(button) {
        return Boolean(button) && button.getAttribute('aria-pressed') === 'true';
    };

    GUI.normalizeClientLogNamePart = function normalizeClientLogNamePart(value, fallback = 'unknown') {
        const normalized = String(value || '')
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return normalized || fallback;
    };

    GUI.buildClientLogContext = async function buildClientLogContext() {
        const nav = typeof navigator !== 'undefined' ? navigator : null;
        const userAgent = String(nav && nav.userAgent || '').trim();
        const userAgentData = nav && nav.userAgentData ? nav.userAgentData : null;
        const brands = Array.isArray(userAgentData && userAgentData.brands) ? userAgentData.brands : [];
        const preferredBrand = brands.find((entry) => !/not.*brand/i.test(String(entry && entry.brand || '')));
        const browserName = GUI.normalizeClientLogNamePart(
            preferredBrand && preferredBrand.brand
                ? preferredBrand.brand
                : GUI.getBrowserNameFromUserAgent(userAgent),
            'browser'
        );

        let model = '';
        let platform = String(
            userAgentData && userAgentData.platform
                || nav && nav.platform
                || ''
        ).trim();

        if (userAgentData && typeof userAgentData.getHighEntropyValues === 'function') {
            try {
                const entropy = await userAgentData.getHighEntropyValues(['model', 'platform']);
                model = String(entropy && entropy.model || '').trim();
                platform = String(entropy && entropy.platform || platform || '').trim();
            } catch {}
        }

        const deviceType = GUI.getClientDeviceType();
        const deviceName = GUI.normalizeClientLogNamePart(model || platform || deviceType, deviceType);
        const platformName = GUI.normalizeClientLogNamePart(platform || deviceType, deviceType);

        return {
            browserName,
            deviceName,
            deviceType,
            platformName,
            userAgent
        };
    };

    GUI.getClientLogContext = async function getClientLogContext() {
        if (STATE.clientLogContext) {
            return STATE.clientLogContext;
        }

        if (!STATE.clientLogContextPromise) {
            STATE.clientLogContextPromise = GUI.buildClientLogContext()
                .catch(() => ({
                    browserName: 'browser',
                    deviceName: 'device',
                    deviceType: 'desktop',
                    platformName: 'desktop',
                    userAgent: typeof navigator !== 'undefined' ? String(navigator.userAgent || '') : ''
                }))
                .then((context) => {
                    STATE.clientLogContext = context;
                    return context;
                });
        }

        return STATE.clientLogContextPromise;
    };

    GUI.logEvent = async function logEvent(level, message, payload) {
        const normalizedLevel = String(level || 'info').trim().toLowerCase();
        let response = null;
        const client = await GUI.getClientLogContext();

        try {
            response = await GUI.api('/api/log', {
                method: 'POST',
                body: {
                    level: normalizedLevel,
                    tag: '[GUI Browser UI]',
                    message: String(message || 'Browser GUI event'),
                    payload: payload && typeof payload === 'object' ? payload : undefined,
                    client
                }
            });
        } catch (error) {
            GUI.appendLogEntry({
                message,
                tone: GUI.getLogToneFromLevel(normalizedLevel),
                source: normalizedLevel.toUpperCase(),
                payload,
                renderSource: 'api-fallback',
                renderError: String(error && error.message || error || 'API log failed')
            });
            return;
        }

        try {
            GUI.appendLogEntry({
                record: response && response.record ? response.record : null,
                message,
                tone: GUI.getLogToneFromLevel(normalizedLevel),
                source: normalizedLevel.toUpperCase(),
                payload,
                renderSource: response && response.record ? 'api-record' : 'plain-record-missing'
            });
        } catch (error) {
            GUI.appendLogEntry({
                message,
                tone: GUI.getLogToneFromLevel(normalizedLevel),
                source: normalizedLevel.toUpperCase(),
                payload,
                renderSource: 'record-fallback',
                renderError: String(error && error.message || error || 'Record render failed')
            });
        }
    };

    GUI.formatMtime = function formatMtime(mtimeMs) {
        if (!mtimeMs) return '';
        try {
            return new Date(mtimeMs).toLocaleString();
        } catch {
            return '';
        }
    };

    GUI.escapeHtml = function escapeHtml(value) {
        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    };

    GUI.formatLogTime = function formatLogTime(dateInput = new Date()) {
        try {
            return new Date(dateInput).toLocaleTimeString();
        } catch {
            return '';
        }
    };

    GUI.getLogToneFromLevel = function getLogToneFromLevel(level) {
        switch (String(level || '').trim().toLowerCase()) {
        case 'fatal':
        case 'error':
            return 'danger';
        case 'trace':
        case 'warn':
        case 'notice':
            return 'warn';
        case 'success':
        case 'debug':
            return 'success';
        case 'detail':
            return 'detail';
        case 'begin':
        case 'end':
            return 'accent';
        case 'init':
        case 'shutdown':
            return 'info';
        default:
            return 'info';
        }
    };

    GUI.getLogRootType = function getLogRootType(level) {
        switch (String(level || '').trim().toLowerCase()) {
        case 'fatal':
        case 'error':
            return 'error';
        case 'warn':
            return 'warn';
        case 'info':
        case 'notice':
        case 'success':
        case 'begin':
        case 'end':
        case 'init':
        case 'shutdown':
            return 'info';
        default:
            return 'log';
        }
    };

    GUI.getLogIconClass = function getLogIconClass(level, rootType) {
        switch (String(level || '').trim().toLowerCase()) {
        case 'trace':
            return 'font-icon--interface--log-trace';
        case 'begin':
            return 'font-icon--interface--log-begin';
        case 'end':
            return 'font-icon--interface--log-end';
        case 'fatal':
            return 'font-icon--interface--log-fatal';
        case 'debug':
            return 'font-icon--interface--log-debug';
        case 'init':
            return 'font-icon--interface--log-init';
        case 'notice':
            return 'font-icon--interface--log-notice';
        case 'shutdown':
            return 'font-icon--interface--log-shutdown';
        case 'success':
            return 'font-icon--interface--log-success';
        case 'detail':
            return 'font-icon--interface--log-detail';
        default:
            break;
        }

        switch (String(rootType || '').trim().toLowerCase()) {
        case 'error':
            return 'font-icon--interface--log-error';
        case 'warn':
            return 'font-icon--interface--log-warn';
        case 'info':
            return 'font-icon--interface--log-info';
        case 'log':
            return 'font-icon--interface--log-log';
        default:
            return 'font-icon--interface--log-info';
        }
    };

    GUI.createAnsiState = function createAnsiState() {
        return {
            bold: false,
            dim: false,
            italic: false,
            underline: false,
            inverse: false,
            foreground: null,
            background: null
        };
    };

    GUI.getAnsiContrastColor = function getAnsiContrastColor(code) {
        if (code === 47 || code === 107) {
            return 'var(--log-ansi-bg-contrast-dark)';
        }

        return code >= 100
            ? 'var(--log-ansi-bg-contrast-dark)'
            : 'var(--log-ansi-bg-contrast-light)';
    };

    GUI.getAnsiColorValue = function getAnsiColorValue(code, isBackground = false) {
        const prefix = isBackground ? '--log-ansi-bg-' : '--log-ansi-fg-';
        const normalizedCode = Number.parseInt(code, 10);
        if (!Number.isFinite(normalizedCode)) return null;
        return `var(${prefix}${normalizedCode})`;
    };

    GUI.applyAnsiCodes = function applyAnsiCodes(state, codes) {
        const nextState = state || GUI.createAnsiState();
        const normalizedCodes = Array.isArray(codes) && codes.length
            ? codes
            : [0];

        normalizedCodes.forEach((value) => {
            const code = Number.parseInt(value, 10);
            if (!Number.isFinite(code)) return;

            if (code === 0) {
                Object.assign(nextState, GUI.createAnsiState());
                return;
            }

            if (code === 1) {
                nextState.bold = true;
                nextState.dim = false;
                return;
            }

            if (code === 2) {
                nextState.dim = true;
                nextState.bold = false;
                return;
            }

            if (code === 3) {
                nextState.italic = true;
                return;
            }

            if (code === 4) {
                nextState.underline = true;
                return;
            }

            if (code === 7) {
                nextState.inverse = true;
                return;
            }

            if (code === 22) {
                nextState.bold = false;
                nextState.dim = false;
                return;
            }

            if (code === 23) {
                nextState.italic = false;
                return;
            }

            if (code === 24) {
                nextState.underline = false;
                return;
            }

            if (code === 27) {
                nextState.inverse = false;
                return;
            }

            if (code === 39) {
                nextState.foreground = null;
                return;
            }

            if (code === 49) {
                nextState.background = null;
                return;
            }

            if ((code >= 30 && code <= 37) || (code >= 90 && code <= 97)) {
                nextState.foreground = {
                    code,
                    value: GUI.getAnsiColorValue(code, false)
                };
                return;
            }

            if ((code >= 40 && code <= 47) || (code >= 100 && code <= 107)) {
                nextState.background = {
                    code,
                    value: GUI.getAnsiColorValue(code, true)
                };
            }
        });

        return nextState;
    };

    GUI.getAnsiStyle = function getAnsiStyle(state) {
        const styleParts = [];
        const foregroundToken = state.inverse ? state.background : state.foreground;
        const backgroundToken = state.inverse ? state.foreground : state.background;
        const foreground = foregroundToken && typeof foregroundToken === 'object'
            ? foregroundToken.value
            : foregroundToken;
        const background = backgroundToken && typeof backgroundToken === 'object'
            ? backgroundToken.value
            : backgroundToken;

        if (foreground) styleParts.push(`color:${foreground}`);
        if (background) styleParts.push(`background-color:${background}`);
        if (background && !foreground && backgroundToken && typeof backgroundToken === 'object') {
            styleParts.push(`color:${GUI.getAnsiContrastColor(backgroundToken.code)}`);
        }
        if (state.bold) styleParts.push('font-weight:700');
        if (state.dim) styleParts.push('opacity:0.72');
        if (state.italic) styleParts.push('font-style:italic');
        if (state.underline) styleParts.push('text-decoration:underline');

        return styleParts.join(';');
    };

    GUI.ansiToHtml = function ansiToHtml(input) {
        const source = String(input || '');
        const pattern = /\x1b\[([0-9;]*)m/g;
        let html = '';
        let cursor = 0;
        let match = null;
        const state = GUI.createAnsiState();

        const appendSegment = function appendSegment(segment) {
            if (!segment) return;
            const escaped = GUI.escapeHtml(segment).replace(/\n/g, '<br>');
            const style = GUI.getAnsiStyle(state);
            html += style
                ? `<span class="log-entry__ansi-segment" style="${style}">${escaped}</span>`
                : escaped;
        };

        while ((match = pattern.exec(source))) {
            appendSegment(source.slice(cursor, match.index));
            const codes = String(match[1] || '')
                .split(';')
                .filter((value) => value !== '');
            GUI.applyAnsiCodes(state, codes);
            cursor = pattern.lastIndex;
        }

        appendSegment(source.slice(cursor));
        return html;
    };

    GUI.getLogSymbolFallback = function getLogSymbolFallback(level, source) {
        const normalizedLevel = String(level || '').trim().toLowerCase();
        if (normalizedLevel === 'fatal') return '[Fatal]';
        if (normalizedLevel === 'error') return '[Error]';
        if (normalizedLevel === 'warn') return '[Warning]';
        if (normalizedLevel === 'success') return '[Success]';
        if (normalizedLevel === 'notice') return '[Notice]';
        if (normalizedLevel === 'begin') return '[Begin]';
        if (normalizedLevel === 'end') return '[End]';
        if (normalizedLevel === 'init') return '[Init]';
        if (normalizedLevel === 'shutdown') return '[Shutdown]';
        if (normalizedLevel === 'debug') return '[Debug]';
        if (normalizedLevel === 'detail') return '[Detail]';
        if (normalizedLevel === 'trace') return '[Trace]';
        if (source) return `[${String(source).trim()}]`;
        return '[Info]';
    };

    GUI.flashButtonLabel = function flashButtonLabel(button, idleText, nextText, timeoutMs = 1200) {
        if (!button) return;
        const label = button.querySelector('.button--icon-action__label');
        if (!label) return;
        if (button.__labelFlashTimer) {
            window.clearTimeout(button.__labelFlashTimer);
        }
        label.textContent = nextText;
        button.__labelFlashTimer = window.setTimeout(() => {
            label.textContent = idleText;
            button.__labelFlashTimer = null;
        }, timeoutMs);
    };

    GUI.spinButtonIconOnce = function spinButtonIconOnce(button) {
        if (!button || !(button instanceof HTMLElement)) return;
        button.classList.remove('is-spinning-once');
        void button.offsetWidth;
        button.classList.add('is-spinning-once');

        window.setTimeout(() => {
            button.classList.remove('is-spinning-once');
        }, 500);
    };

    GUI.isLogNearBottom = function isLogNearBottom() {
        if (!UI.logEntries) return true;
        const threshold = 16;
        const remaining = UI.logEntries.scrollHeight - UI.logEntries.scrollTop - UI.logEntries.clientHeight;
        return remaining <= threshold;
    };

    GUI.isLogTabActive = function isLogTabActive() {
        return Boolean(UI.topPanels && UI.topPanels.log && UI.topPanels.log.classList.contains('is-active'));
    };

    GUI.captureLogScrollState = function captureLogScrollState() {
        if (!UI.logEntries || !GUI.isLogTabActive()) return;
        STATE.logScrollTop = UI.logEntries.scrollTop;
        STATE.logStickToBottom = GUI.isLogNearBottom();
    };

    GUI.restoreLogScrollPosition = function restoreLogScrollPosition() {
        if (!UI.logEntries) return;

        if (STATE.logStickToBottom) {
            UI.logEntries.scrollTop = UI.logEntries.scrollHeight;
            STATE.logScrollTop = UI.logEntries.scrollTop;
            return;
        }

        UI.logEntries.scrollTop = Number.isFinite(STATE.logScrollTop) ? STATE.logScrollTop : 0;
    };

    GUI.applyLogOptionsExpanded = function applyLogOptionsExpanded(expanded) {
        const isExpanded = expanded !== false;
        const tooltipText = isExpanded ? 'Collapse log option.' : 'Expand log option.';
        STATE.logOptionsExpanded = isExpanded;

        if (UI.logOptionsPanel) {
            UI.logOptionsPanel.classList.toggle('is-collapsed', !isExpanded);
            UI.logOptionsPanel.hidden = !isExpanded;
            UI.logOptionsPanel.style.display = isExpanded ? '' : 'none';
        }

        if (UI.logOptionsBody) {
            UI.logOptionsBody.hidden = !isExpanded;
            UI.logOptionsBody.style.display = isExpanded ? '' : 'none';
        }

        if (UI.logOptionsToggle) {
            UI.logOptionsToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            UI.logOptionsToggle.classList.toggle('is-collapsed', !isExpanded);
            UI.logOptionsToggle.removeAttribute('title');
            UI.logOptionsToggle.setAttribute('aria-label', tooltipText);
            UI.logOptionsToggle.dataset.tooltip = tooltipText;
        }
    };

    GUI.LOG_FILTER_GROUPS = {
        general: ['log', 'info'],
        attention: ['notice', 'warn', 'error', 'fatal', 'success'],
        lifecycle: ['begin', 'end', 'init', 'shutdown'],
        verbose: ['trace', 'detail', 'debug']
    };

    GUI.getLogFilterLevels = function getLogFilterLevels() {
        return Object.keys(GUI.DEFAULT_LOG_LEVEL_VISIBILITY || {});
    };

    GUI.getLogFilterState = function getLogFilterState(level) {
        const key = String(level || '').trim().toLowerCase();
        if (!key) return true;
        if (!Object.prototype.hasOwnProperty.call(STATE.logLevelVisibility, key)) return true;
        return !!STATE.logLevelVisibility[key];
    };

    GUI.getLogFilterGroupState = function getLogFilterGroupState(groupName) {
        const levels = GUI.LOG_FILTER_GROUPS[String(groupName || '').trim().toLowerCase()] || [];
        if (levels.length <= 0) return 'off';

        const activeCount = levels.filter((level) => GUI.getLogFilterState(level)).length;
        if (activeCount <= 0) return 'off';
        if (activeCount >= levels.length) return 'on';
        return 'mixed';
    };

    GUI.setLogFilterGroupState = function setLogFilterGroupState(groupName, isActive) {
        const levels = GUI.LOG_FILTER_GROUPS[String(groupName || '').trim().toLowerCase()] || [];
        levels.forEach((level) => {
            STATE.logLevelVisibility[level] = Boolean(isActive);
        });
    };

    GUI.getVisibleLogEntries = function getVisibleLogEntries() {
        const query = String(STATE.logSearchQuery || '').trim().toLowerCase();
        const entries = Array.isArray(STATE.logEntries) ? STATE.logEntries : [];

        return entries.filter((entry) => {
            const normalized = GUI.normalizeLogEntry(entry);
            const filterKey = String(normalized.level || 'info').trim().toLowerCase() || 'info';
            const isVisible = GUI.getLogFilterState(filterKey);
            if (!isVisible) return false;
            if (!query) return true;

            const parts = [
                normalized.level,
                normalized.rootType,
                normalized.tone,
                normalized.symbol,
                normalized.timestamp,
                normalized.messageText,
                normalized.ansiText,
                normalized.renderSource,
                normalized.renderError,
                ...(Array.isArray(normalized.lines) ? normalized.lines : [])
            ];

            if (entry && typeof entry === 'object') {
                parts.push(
                    entry.level,
                    entry.tone,
                    entry.source,
                    entry.time,
                    entry.message,
                    entry.renderSource,
                    entry.renderError
                );

                if (entry.record && typeof entry.record === 'object') {
                    parts.push(JSON.stringify(entry.record));
                }

                if (entry.payload && typeof entry.payload === 'object') {
                    parts.push(JSON.stringify(entry.payload));
                }
            }

            const haystack = parts
                .filter((value) => value !== null && value !== undefined && value !== '')
                .map((value) => String(value).toLowerCase())
                .join('\n');

            return haystack.includes(query);
        });
    };

    GUI.normalizeLogPreferenceState = function normalizeLogPreferenceState(guiConfig = {}) {
        const preferences = guiConfig && typeof guiConfig === 'object' && !Array.isArray(guiConfig)
            ? guiConfig
            : {};
        const savedFilters = preferences.log_filters && typeof preferences.log_filters === 'object' && !Array.isArray(preferences.log_filters)
            ? preferences.log_filters
            : {};
        const defaultFilters = Object.assign({}, GUI.DEFAULT_LOG_LEVEL_VISIBILITY || {});
        const hasExactLevelFilters = GUI.getLogFilterLevels().some((level) => Object.prototype.hasOwnProperty.call(savedFilters, level));

        return {
            filters: hasExactLevelFilters
                ? GUI.getLogFilterLevels().reduce((result, level) => {
                    result[level] = savedFilters[level] !== false;
                    return result;
                }, {})
                : defaultFilters,
            searchText: String(preferences.log_search_text || '').trim(),
            optionsExpanded: Boolean(preferences.log_options_expanded)
        };
    };

    GUI.applyLogPreferenceState = function applyLogPreferenceState(guiConfig = {}) {
        const normalized = GUI.normalizeLogPreferenceState(guiConfig);
        STATE.logLevelVisibility = Object.assign({}, normalized.filters);
        STATE.logSearchQuery = normalized.searchText;
        STATE.logOptionsExpanded = normalized.optionsExpanded;
        GUI.syncLogFilterInputs();
        GUI.applyLogOptionsExpanded(normalized.optionsExpanded);
    };

    GUI.buildLogPreferencePatch = function buildLogPreferencePatch() {
        return {
            log_filters: GUI.getLogFilterLevels().reduce((result, level) => {
                result[level] = !!STATE.logLevelVisibility[level];
                return result;
            }, {}),
            log_search_text: String(STATE.logSearchQuery || '').trim(),
            log_options_expanded: Boolean(STATE.logOptionsExpanded)
        };
    };

    GUI.queueLogPreferenceSave = function queueLogPreferenceSave(delayMs = 200) {
        if (STATE.logPreferenceSaveTimer) {
            window.clearTimeout(STATE.logPreferenceSaveTimer);
        }

        STATE.logPreferenceSaveTimer = window.setTimeout(() => {
            STATE.logPreferenceSaveTimer = null;
            GUI.saveGuiPreference(GUI.buildLogPreferencePatch())
                .catch((error) => {
                    GUI.logEvent('error', 'Saving log preferences failed.', {
                        message: String(error.message || error)
                    });
                });
        }, delayMs);
    };

    GUI.syncLogFilterInputs = function syncLogFilterInputs() {
        if (Array.isArray(UI.logFilterGroupButtons)) {
            UI.logFilterGroupButtons.forEach((button) => {
                const groupName = String(button.getAttribute('data-log-filter-group') || '').trim().toLowerCase();
                const state = GUI.getLogFilterGroupState(groupName);
                button.setAttribute('aria-pressed', state === 'on' ? 'true' : 'false');
                button.dataset.state = state;
                button.classList.toggle('font-icon--interface--checkbox-mix', state === 'mixed');
                button.classList.toggle('font-icon--interface--checkbox-on', state === 'on');
                button.classList.toggle('font-icon--interface--checkbox-off', state === 'off');
                button.classList.toggle('is-active', state === 'on');
                button.classList.toggle('is-mixed', state === 'mixed');
            });
        }

        if (Array.isArray(UI.logFilterButtons)) {
            UI.logFilterButtons.forEach((button) => {
                const level = String(button.getAttribute('data-log-filter') || '').trim().toLowerCase();
                const isActive = GUI.getLogFilterState(level);
                button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
                button.classList.toggle('is-active', isActive);
            });
        }
        if (UI.logSearch) {
            UI.logSearch.value = String(STATE.logSearchQuery || '').trim();
        }
    };

    GUI.normalizeLogEntry = function normalizeLogEntry(entry) {
        const record = entry && entry.record && typeof entry.record === 'object'
            ? entry.record
            : null;

        if (record) {
            const level = String(record.level || 'info').trim().toLowerCase() || 'info';
            const rootType = String(record.rootType || GUI.getLogRootType(level)).trim().toLowerCase() || 'log';
            const messageText = String(record.argsPlainText || '').trim()
                || String(record.plainText || '').trim()
                || 'Event';

            return {
                level,
                rootType,
                tone: GUI.getLogToneFromLevel(level),
                iconClass: GUI.getLogIconClass(level, rootType),
                symbol: String(record.symbol || GUI.getLogSymbolFallback(level)).trim(),
                timestamp: String(record.timestamp || '').trim(),
                entryIndex: Number.isFinite(record.entryIndex) ? record.entryIndex : null,
                messageText,
                ansiText: String(record.ansiText || '').trim(),
                renderSource: record.ansiText ? 'ansi-record' : 'plain-record',
                messageHtml: record.ansiText
                    ? GUI.ansiToHtml(record.ansiText)
                    : GUI.escapeHtml(messageText).replace(/\n/g, '<br>'),
                lines: Array.isArray(record.plainLines) && record.plainLines.length
                    ? record.plainLines.map((line) => String(line))
                    : String(messageText).split('\n')
            };
        }

        const level = String((entry && entry.level) || '').trim().toLowerCase()
            || (String((entry && entry.tone) || '').trim().toLowerCase() === 'danger'
                ? 'error'
                : (String((entry && entry.tone) || '').trim().toLowerCase() === 'warn'
                    ? 'warn'
                    : (String((entry && entry.tone) || '').trim().toLowerCase() === 'success'
                        ? 'success'
                        : 'info')));
        const payloadText = entry && entry.payload && typeof entry.payload === 'object'
            ? JSON.stringify(entry.payload, null, 2)
            : '';
        const baseMessage = String((entry && entry.message) || '').trim() || 'Event';
        const messageText = payloadText
            ? `${baseMessage}\n${payloadText}`
            : baseMessage;
        const rootType = GUI.getLogRootType(level);

        return {
            level,
            rootType,
            tone: String((entry && entry.tone) || GUI.getLogToneFromLevel(level)).trim() || GUI.getLogToneFromLevel(level),
            iconClass: GUI.getLogIconClass(level, rootType),
            symbol: GUI.getLogSymbolFallback(level, entry && entry.source),
            timestamp: String((entry && entry.time) || GUI.formatLogTime()).trim(),
            entryIndex: null,
            messageText,
            ansiText: '',
            renderSource: String((entry && entry.renderSource) || 'fallback').trim() || 'fallback',
            renderError: String((entry && entry.renderError) || '').trim(),
            messageHtml: GUI.escapeHtml(messageText).replace(/\n/g, '<br>'),
            lines: messageText.split('\n')
        };
    };

    GUI.renderLogEntries = function renderLogEntries() {
        if (!UI.logEntries || !UI.logEmpty) return;
        const logIsVisible = GUI.isLogTabActive();
        const previousScrollTop = Number.isFinite(STATE.logScrollTop)
            ? STATE.logScrollTop
            : (logIsVisible ? UI.logEntries.scrollTop : 0);
        const wasNearBottom = logIsVisible && GUI.isLogNearBottom();
        const shouldStickToBottom = STATE.logStickToBottom || wasNearBottom;
        const visibleEntries = GUI.getVisibleLogEntries();
        UI.logEntries.replaceChildren();

        if (visibleEntries.length <= 0) {
            UI.logEmpty.textContent = Array.isArray(STATE.logEntries) && STATE.logEntries.length > 0
                ? 'No log entries match the current filters.'
                : 'No log entries yet.';
            UI.logEmpty.classList.toggle('log-empty--filtered', Array.isArray(STATE.logEntries) && STATE.logEntries.length > 0);
            UI.logEmpty.hidden = false;
            UI.logEntries.appendChild(UI.logEmpty);
            STATE.logScrollTop = 0;
            return;
        }

        UI.logEmpty.hidden = true;
        UI.logEmpty.classList.remove('log-empty--filtered');
        visibleEntries.forEach((entry) => {
            const normalized = GUI.normalizeLogEntry(entry);
            const item = document.createElement('article');
            item.className = 'log-entry';
            item.dataset.tone = String(normalized.tone || 'info').trim() || 'info';
            item.dataset.level = String(normalized.level || 'info').trim().toLowerCase() || 'info';
            item.dataset.rootType = String(normalized.rootType || 'log').trim().toLowerCase() || 'log';
            if (normalized.renderSource) {
                item.dataset.renderSource = String(normalized.renderSource).trim();
            }

            item.innerHTML = `
                ${normalized.renderError ? `<div class="log-entry__render-error">${GUI.escapeHtml(normalized.renderError)}</div>` : ''}
                <div class="log-entry__content">
                    <div class="log-entry__meta">
                        <span class="log-entry__level">${GUI.escapeHtml(String(normalized.level || 'info'))}</span>
                        <time class="log-entry__time">${GUI.escapeHtml(String(normalized.timestamp || ''))}</time>
                    </div>
                    <div class="log-entry__message">${normalized.messageHtml || GUI.escapeHtml(normalized.messageText || 'Event')}</div>
                </div>
            `;
            UI.logEntries.appendChild(item);
        });

        if (shouldStickToBottom) {
            UI.logEntries.scrollTop = UI.logEntries.scrollHeight;
            STATE.logScrollTop = UI.logEntries.scrollTop;
            return;
        }

        UI.logEntries.scrollTop = previousScrollTop;
        STATE.logScrollTop = previousScrollTop;
    };

    GUI.appendLogEntry = function appendLogEntry(entry) {
        const nextEntry = entry && typeof entry === 'object'
            ? {
                time: String(entry.time || GUI.formatLogTime()).trim() || GUI.formatLogTime(),
                source: String((entry && entry.source) || 'Log').trim() || 'Log',
                message: String((entry && entry.message) || '').trim() || 'Event',
                tone: String((entry && entry.tone) || 'info').trim() || 'info',
                level: String((entry && entry.level) || '').trim(),
                payload: entry && entry.payload && typeof entry.payload === 'object' ? entry.payload : undefined,
                record: entry && entry.record && typeof entry.record === 'object' ? GUI.clone(entry.record) : undefined,
                renderSource: String((entry && entry.renderSource) || '').trim(),
                renderError: String((entry && entry.renderError) || '').trim()
            }
            : {
                time: GUI.formatLogTime(),
                source: 'Log',
                message: 'Event',
                tone: 'info'
            };
        STATE.logEntries.push(nextEntry);
        if (STATE.logEntries.length > LOG_ENTRY_LIMIT) {
            STATE.logEntries.splice(0, STATE.logEntries.length - LOG_ENTRY_LIMIT);
        }
        const wasNearBottom = GUI.isLogTabActive() ? GUI.isLogNearBottom() : STATE.logStickToBottom;
        GUI.renderLogEntries();
        STATE.logStickToBottom = STATE.logStickToBottom || wasNearBottom;
    };

    GUI.clearLogEntries = function clearLogEntries() {
        STATE.logEntries = [];
        STATE.logStickToBottom = true;
        STATE.logScrollTop = 0;
        GUI.renderLogEntries();
    };

    GUI.getLogExportText = function getLogExportText() {
        const visibleEntries = GUI.getVisibleLogEntries();
        if (visibleEntries.length <= 0) {
            return '';
        }

        return visibleEntries.map((entry) => {
            const normalized = GUI.normalizeLogEntry(entry);
            const messageText = String(normalized.messageText || 'Event');
            return `[${normalized.timestamp || ''}] ${String(normalized.level || 'info').toUpperCase()} ${messageText}`.trim();
        }).join('\n');
    };

    GUI.normalizeTooltipTargets = function normalizeTooltipTargets(root = document) {
        root.querySelectorAll('.button--icon-action--solo[title]').forEach((node) => {
            if (!node.dataset.tooltip) {
                node.dataset.tooltip = String(node.getAttribute('title') || '').trim();
            }
            node.removeAttribute('title');
        });
    };

    GUI.getTooltipText = function getTooltipText(node) {
        if (!node) return '';
        return String(node.dataset.tooltip || '').trim();
    };

    GUI.getTooltipHeading = function getTooltipHeading(node) {
        if (!node) return '';
        return String(node.dataset.tooltipHeading || '').trim();
    };

    GUI.getFloatingPanelPosition = function getFloatingPanelPosition(anchorRect, panelRect, options = {}) {
        const documentElement = document.documentElement;
        const layoutViewportWidth = documentElement && documentElement.clientWidth
            ? documentElement.clientWidth
            : window.innerWidth;
        const layoutViewportHeight = documentElement && documentElement.clientHeight
            ? documentElement.clientHeight
            : window.innerHeight;
        const visualViewportWidth = window.visualViewport && Number.isFinite(window.visualViewport.width)
            ? Math.round(window.visualViewport.width)
            : layoutViewportWidth;
        const visualViewportHeight = window.visualViewport && Number.isFinite(window.visualViewport.height)
            ? Math.round(window.visualViewport.height)
            : layoutViewportHeight;
        const viewportLeft = window.visualViewport && Number.isFinite(window.visualViewport.offsetLeft)
            ? Math.round(window.visualViewport.offsetLeft)
            : 0;
        const viewportTop = window.visualViewport && Number.isFinite(window.visualViewport.offsetTop)
            ? Math.round(window.visualViewport.offsetTop)
            : 0;
        const viewportWidth = Math.min(layoutViewportWidth, visualViewportWidth);
        const viewportHeight = Math.min(layoutViewportHeight, visualViewportHeight);
        const margin = Number(options.margin) || TOOLTIP_VIEWPORT_MARGIN;
        const offset = Number(options.offset) || 10;
        const preferPlacement = String(options.preferPlacement || 'bottom').trim().toLowerCase();
        const align = String(options.align || 'center').trim().toLowerCase();
        const stretchWidth = Boolean(options.stretchWidth);
        const viewportRight = viewportLeft + viewportWidth;
        const viewportBottom = viewportTop + viewportHeight;
        const maxWidth = Math.max(0, viewportWidth - (margin * 2));
        const width = stretchWidth
            ? Math.min(maxWidth, Math.max(anchorRect.width, panelRect.width))
            : Math.min(maxWidth, panelRect.width);
        const height = Math.min(Math.max(0, viewportHeight - (margin * 2)), panelRect.height);

        let top = preferPlacement === 'top'
            ? anchorRect.top - height - offset
            : anchorRect.bottom + offset;
        let placement = preferPlacement === 'top' ? 'top' : 'bottom';

        if (placement === 'top' && top < viewportTop + margin) {
            top = anchorRect.bottom + offset;
            placement = 'bottom';
        }
        if (placement === 'bottom' && (top + height) > (viewportBottom - margin)) {
            top = anchorRect.top - height - offset;
            placement = 'top';
        }
        if (top < viewportTop + margin) {
            top = viewportTop + margin;
        }
        if (top + height > viewportBottom - margin) {
            top = Math.max(
                viewportTop + margin,
                viewportBottom - margin - height
            );
        }

        let left = anchorRect.left + ((anchorRect.width - width) / 2);
        if (align === 'start') {
            left = anchorRect.left;
        } else if (align === 'end') {
            left = anchorRect.right - width;
        }

        if (left < viewportLeft + margin) {
            left = viewportLeft + margin;
        }
        if (left + width > viewportRight - margin) {
            left = Math.max(
                viewportLeft + margin,
                viewportRight - margin - width
            );
        }

        return {
            top: Math.round(top),
            left: Math.round(left),
            width: Math.round(width),
            maxHeight: Math.max(0, Math.floor(viewportHeight - (margin * 2))),
            placement
        };
    };

    GUI.positionTooltip = function positionTooltip(target) {
        if (!target || !UI.tooltipLayer || UI.tooltipLayer.hidden) return;

        const targetRect = target.getBoundingClientRect();
        const tooltipRect = UI.tooltipLayer.getBoundingClientRect();
        const nextPosition = GUI.getFloatingPanelPosition(targetRect, tooltipRect, {
            margin: TOOLTIP_VIEWPORT_MARGIN,
            offset: 10,
            preferPlacement: 'top',
            align: 'center'
        });

        UI.tooltipLayer.style.left = `${nextPosition.left}px`;
        UI.tooltipLayer.style.top = `${nextPosition.top}px`;
        UI.tooltipLayer.dataset.placement = nextPosition.placement;
    };

    GUI.openTooltip = function openTooltip(target, source = '') {
        const tooltipText = GUI.getTooltipText(target);
        if (!target || !tooltipText || !UI.tooltipLayer) return;
        if (Date.now() < Number(STATE.tooltipDismissUntil || 0)) return;

        const tooltipHeading = GUI.getTooltipHeading(target);
        UI.tooltipLayer.innerHTML = `
            ${tooltipHeading ? `<div class="tooltip-layer__heading font-icon--interface--light-bulb">${GUI.escapeHtml(tooltipHeading)}</div>` : ''}
            <div class="tooltip-layer__body${tooltipHeading ? '' : ' font-icon--interface--light-bulb'}"><span class="tooltip-layer__body-text">${GUI.escapeHtml(tooltipText)}</span></div>
        `;
        UI.tooltipLayer.hidden = false;
        UI.tooltipLayer.style.left = '0px';
        UI.tooltipLayer.style.top = '0px';
        STATE.activeTooltipTarget = target;
        STATE.tooltipOpenSource = String(source || '').trim();
        GUI.positionTooltip(target);
    };

    GUI.closeTooltip = function closeTooltip() {
        if (!UI.tooltipLayer) return;
        if (STATE.tooltipFocusRepositionFrame) {
            window.cancelAnimationFrame(STATE.tooltipFocusRepositionFrame);
            STATE.tooltipFocusRepositionFrame = null;
        }
        UI.tooltipLayer.hidden = true;
        UI.tooltipLayer.innerHTML = '';
        delete UI.tooltipLayer.dataset.placement;
        STATE.activeTooltipTarget = null;
        STATE.tooltipOpenSource = '';
    };

    GUI.clearTooltipLongPress = function clearTooltipLongPress() {
        if (STATE.tooltipLongPressTimer) {
            window.clearTimeout(STATE.tooltipLongPressTimer);
        }
        STATE.tooltipLongPressTimer = null;
        STATE.tooltipLongPressTarget = null;
    };

    GUI.scheduleTooltipFocusReposition = function scheduleTooltipFocusReposition() {
        if (!STATE.activeTooltipTarget || STATE.tooltipOpenSource !== 'focus') return;
        if (STATE.tooltipFocusRepositionFrame) {
            window.cancelAnimationFrame(STATE.tooltipFocusRepositionFrame);
        }
        STATE.tooltipFocusRepositionFrame = window.requestAnimationFrame(() => {
            STATE.tooltipFocusRepositionFrame = null;
            if (!STATE.activeTooltipTarget || STATE.tooltipOpenSource !== 'focus') return;
            GUI.positionTooltip(STATE.activeTooltipTarget);
        });
    };

    GUI.getTooltipTargetUnderPointer = function getTooltipTargetUnderPointer() {
        if (!STATE.tooltipPointerInside) return null;
        if (typeof STATE.tooltipPointerX !== 'number' || typeof STATE.tooltipPointerY !== 'number') return null;
        const hoveredNode = document.elementFromPoint(STATE.tooltipPointerX, STATE.tooltipPointerY);
        if (!hoveredNode) return null;
        const target = hoveredNode.closest('[data-tooltip]');
        if (!target || !GUI.getTooltipText(target)) return null;
        return target;
    };

    GUI.getFocusedTooltipTarget = function getFocusedTooltipTarget() {
        const activeElement = document.activeElement;
        if (!activeElement) return null;
        const target = activeElement.closest('[data-tooltip]');
        if (!target || !GUI.getTooltipText(target)) return null;
        return target;
    };

    GUI.isTooltipKeyboardNavKey = function isTooltipKeyboardNavKey(event) {
        const key = String(event && event.key || '');
        return key === 'Tab'
            || key === 'ArrowUp'
            || key === 'ArrowDown'
            || key === 'ArrowLeft'
            || key === 'ArrowRight'
            || key === 'Home'
            || key === 'End'
            || key === 'PageUp'
            || key === 'PageDown';
    };

    GUI.bindTooltips = function bindTooltips() {
        GUI.normalizeTooltipTargets(document);

        document.addEventListener('mousemove', (event) => {
            STATE.tooltipPointerX = event.clientX;
            STATE.tooltipPointerY = event.clientY;
            STATE.tooltipPointerInside = true;
        }, { passive: true });

        document.addEventListener('mouseleave', () => {
            STATE.tooltipPointerInside = false;
        });

        document.addEventListener('mouseover', (event) => {
            const target = event.target.closest('[data-tooltip]');
            if (!target || !GUI.getTooltipText(target)) return;
            if (target.contains(event.relatedTarget)) return;
            GUI.openTooltip(target, 'hover');
        });

        document.addEventListener('mouseout', (event) => {
            const target = event.target.closest('[data-tooltip]');
            if (!target || STATE.activeTooltipTarget !== target) return;
            if (target.contains(event.relatedTarget)) return;
            if (STATE.tooltipOpenSource !== 'hover') return;
            GUI.closeTooltip();
        });

        document.addEventListener('focusin', (event) => {
            const target = event.target.closest('[data-tooltip]');
            if (!target || !GUI.getTooltipText(target)) return;
            GUI.openTooltip(target, 'focus');
            GUI.scheduleTooltipFocusReposition();
        });

        document.addEventListener('focusout', (event) => {
            const target = event.target.closest('[data-tooltip]');
            if (!target || STATE.activeTooltipTarget !== target) return;
            if (target.contains(event.relatedTarget)) return;
            if (STATE.tooltipOpenSource !== 'focus') return;
            GUI.closeTooltip();
        });

        document.addEventListener('pointerdown', (event) => {
            if (STATE.activeTooltipTarget) {
                GUI.closeTooltip();
                GUI.clearTooltipLongPress();
                STATE.tooltipDismissUntil = Date.now() + TOOLTIP_DISMISS_LOCK_MS;
                return;
            }

            const target = event.target.closest('[data-tooltip]');
            if (!target || !GUI.getTooltipText(target)) return;

            GUI.clearTooltipLongPress();
            STATE.tooltipLongPressTarget = target;
            STATE.tooltipLongPressTimer = window.setTimeout(() => {
                GUI.openTooltip(target, 'longpress');
                STATE.tooltipSuppressClick = true;
                STATE.tooltipSuppressClickTarget = target;
                GUI.clearTooltipLongPress();
            }, TOOLTIP_LONG_PRESS_MS);
        });

        document.addEventListener('pointerup', () => {
            GUI.clearTooltipLongPress();
        });

        document.addEventListener('pointercancel', () => {
            GUI.clearTooltipLongPress();
            STATE.tooltipSuppressClick = false;
            STATE.tooltipSuppressClickTarget = null;
        });

        document.addEventListener('click', (event) => {
            if (!STATE.tooltipSuppressClick) return;
            const suppressTarget = STATE.tooltipSuppressClickTarget;
            STATE.tooltipSuppressClick = false;
            STATE.tooltipSuppressClickTarget = null;
            if (suppressTarget && !suppressTarget.contains(event.target)) return;
            event.preventDefault();
            event.stopPropagation();
        }, true);

        document.addEventListener('keydown', (event) => {
            if (GUI.isTooltipKeyboardNavKey(event)) {
                STATE.tooltipKeyboardNavUntil = Date.now() + TOOLTIP_KEYBOARD_NAV_MS;
            }
            if (event.key !== 'Escape') return;
            GUI.clearTooltipLongPress();
            if (!STATE.activeTooltipTarget) return;
            GUI.closeTooltip();
        });

        window.addEventListener('resize', () => {
            if (!STATE.activeTooltipTarget) return;
            GUI.positionTooltip(STATE.activeTooltipTarget);
        });

        window.addEventListener('scroll', () => {
            const focusedTarget = GUI.getFocusedTooltipTarget();
            if (focusedTarget && Date.now() < Number(STATE.tooltipKeyboardNavUntil || 0)) {
                if (STATE.activeTooltipTarget !== focusedTarget || STATE.tooltipOpenSource !== 'focus') {
                    GUI.openTooltip(focusedTarget, 'focus');
                }
                GUI.scheduleTooltipFocusReposition();
                return;
            }
            if (!STATE.activeTooltipTarget) return;
            if (STATE.tooltipOpenSource === 'focus') {
                GUI.scheduleTooltipFocusReposition();
                return;
            }
            GUI.closeTooltip();
        }, true);
    };

    GUI.clone = function clone(value) {
        return JSON.parse(JSON.stringify(value));
    };

    GUI.parseJsonEditor = function parseJsonEditor() {
        try {
            return JSON.parse(UI.configEditor.value || '{}');
        } catch (error) {
            throw new Error(`Raw JSON is invalid: ${String(error.message || error)}`);
        }
    };

    GUI.parseProjectSchemaEditor = function parseProjectSchemaEditor() {
        try {
            return JSON.parse(UI.configSchemaEditor && UI.configSchemaEditor.value || '{}');
        } catch (error) {
            throw new Error(`Project schema JSON is invalid: ${String(error.message || error)}`);
        }
    };

    GUI.syncJsonEditorPresentation = function syncJsonEditorPresentation(editor, highlightCode, shell) {
        if (!editor || !highlightCode || !shell) return;

        const rawValue = String(editor.value || '');
        const source = rawValue || ' ';
        const prism = window.Prism;

        highlightCode.textContent = source;

        if (prism && prism.languages && prism.languages.json && typeof prism.highlightElement === 'function') {
            prism.highlightElement(highlightCode);
        } else {
            highlightCode.textContent = source;
        }

        shell.classList.toggle('is-empty', !rawValue);
    };

    GUI.syncRawEditorPresentation = function syncRawEditorPresentation() {
        GUI.syncJsonEditorPresentation(UI.configEditor, UI.configEditorHighlightCode, UI.configEditorShell);
    };

    GUI.syncProjectSchemaEditorPresentation = function syncProjectSchemaEditorPresentation() {
        GUI.syncJsonEditorPresentation(UI.configSchemaEditor, UI.configSchemaEditorHighlightCode, UI.configSchemaEditorShell);
    };

    GUI.syncJsonEditorScroll = function syncJsonEditorScroll(editor, highlight) {
        if (!editor || !highlight) return;
        highlight.scrollTop = editor.scrollTop;
        highlight.scrollLeft = editor.scrollLeft;
    };

    GUI.syncRawEditorScroll = function syncRawEditorScroll() {
        GUI.syncJsonEditorScroll(UI.configEditor, UI.configEditorHighlight);
    };

    GUI.syncProjectSchemaEditorScroll = function syncProjectSchemaEditorScroll() {
        GUI.syncJsonEditorScroll(UI.configSchemaEditor, UI.configSchemaEditorHighlight);
    };

    GUI.syncRawEditor = function syncRawEditor() {
        UI.configEditor.value = `${JSON.stringify(GUI.STATE.configData, null, 4)}\n`;
        GUI.syncRawEditorPresentation();
        GUI.syncRawEditorScroll();
    };

    GUI.syncProjectSchemaEditor = function syncProjectSchemaEditor() {
        const defaultSchemaValue = { keys: [] };
        const schemaValue = GUI.STATE.configModel
            && GUI.STATE.configModel.projectSchema
            && typeof GUI.STATE.configModel.projectSchema === 'object'
            && !Array.isArray(GUI.STATE.configModel.projectSchema)
            ? GUI.STATE.configModel.projectSchema
            : defaultSchemaValue;
        if (!UI.configSchemaEditor) return;
        UI.configSchemaEditor.value = `${JSON.stringify(schemaValue, null, 4)}\n`;
        GUI.syncProjectSchemaEditorPresentation();
        GUI.syncProjectSchemaEditorScroll();
    };

    GUI.normalizePath = function normalizePath(path) {
        return String(path || '').trim().replace(/\[(\d+)\]/g, '.$1');
    };

    GUI.getCachedGuiConfig = function getCachedGuiConfig() {
        try {
            const raw = window.localStorage.getItem(GUI_CONFIG_STORAGE_KEY);
            if (!raw) return {};
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
        } catch {
            return {};
        }
    };

    GUI.cacheGuiConfig = function cacheGuiConfig(guiConfig) {
        const nextConfig = guiConfig && typeof guiConfig === 'object' && !Array.isArray(guiConfig)
            ? guiConfig
            : {};
        try {
            window.localStorage.setItem(GUI_CONFIG_STORAGE_KEY, JSON.stringify(nextConfig));
            if (nextConfig.theme === 'light' || nextConfig.theme === 'dark') {
                window.localStorage.setItem(THEME_STORAGE_KEY, nextConfig.theme);
            }
        } catch {}
        STATE.bootstrap = STATE.bootstrap || {};
        STATE.bootstrap.guiConfig = nextConfig;
        return nextConfig;
    };

    GUI.applyTheme = function applyTheme(theme) {
        const nextTheme = theme === 'light' ? 'light' : 'dark';
        STATE.theme = nextTheme;
        document.documentElement.dataset.theme = nextTheme;
        UI.themeToggle.classList.toggle('font-icon--interface--sun', nextTheme === 'dark');
        UI.themeToggle.classList.toggle('font-icon--interface--moon', nextTheme === 'light');
        UI.themeToggleLabel.textContent = nextTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        UI.themeToggle.dataset.tooltip = nextTheme === 'dark' ? 'Switch to light mode.' : 'Switch to dark mode.';
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        } catch {}
    };

    GUI.applyButtonTitlesSetting = function applyButtonTitlesSetting(showButtonTitles) {
        const nextValue = Boolean(showButtonTitles);
        STATE.showButtonTitles = nextValue;
        document.querySelector('.app-shell').dataset.showButtonTitles = nextValue ? 'true' : 'false';
        GUI.setCheckboxButtonState(UI.buttonTitlesToggle, nextValue);
        UI.buttonTitlesToggleLabel.textContent = 'Button Title';
        UI.buttonTitlesToggle.dataset.tooltip = nextValue
            ? 'Button titles are enabled for icon-only toolbar buttons.'
            : 'Button titles are disabled for icon-only toolbar buttons.';
    };

    GUI.saveGuiPreference = async function saveGuiPreference(patch) {
        const cachedGuiConfig = GUI.getCachedGuiConfig();
        const optimisticGuiConfig = Object.assign({}, cachedGuiConfig, patch);
        GUI.cacheGuiConfig(optimisticGuiConfig);
        const result = await GUI.api('/api/gui-config', {
            method: 'POST',
            body: patch
        });
        if (result && result.guiConfig) {
            GUI.cacheGuiConfig(result.guiConfig);
            GUI.applyLogPreferenceState(result.guiConfig);
        }
        return result;
    };

    GUI.saveThemePreference = async function saveThemePreference(theme) {
        return GUI.saveGuiPreference({ theme });
    };

    GUI.initializeTheme = function initializeTheme() {
        let nextTheme = 'dark';
        try {
            const cachedGuiConfig = GUI.getCachedGuiConfig();
            if (cachedGuiConfig.theme === 'light' || cachedGuiConfig.theme === 'dark') {
                nextTheme = cachedGuiConfig.theme;
            } else {
                const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
                if (storedTheme === 'light' || storedTheme === 'dark') {
                    nextTheme = storedTheme;
                }
            }
        } catch {}
        GUI.applyTheme(nextTheme);
    };
})();
