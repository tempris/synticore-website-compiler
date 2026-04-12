(function () {
    'use strict';

    const GUI = window.SynticoreGui;
    const { STATE, UI, api, clone, escapeHtml, formatMtime, getFloatingPanelPosition, logEvent, parseJsonEditor, parseProjectSchemaEditor, saveGuiPreference, saveThemePreference, setLoading, syncProjectSchemaEditor, syncRawEditor } = GUI;

    GUI.getConfigWatchSignature = function getConfigWatchSignature(model) {
        const source = model && typeof model === 'object' ? model : {};
        return JSON.stringify({
            mode: String(STATE.configMode || ''),
            selectedProject: String(STATE.selectedProject || ''),
            path: String(source.path || ''),
            defaultSchemaPath: String(source.defaultSchemaPath || ''),
            defaultSchemaMtimeMs: Number(source.defaultSchemaMtimeMs || 0),
            schemaPath: String(source.schemaPath || ''),
            schemaExists: Boolean(source.schemaExists),
            schemaMtimeMs: Number(source.schemaMtimeMs || 0),
            projectSchemaPath: String(source.projectSchemaPath || ''),
            projectSchemaExists: Boolean(source.projectSchemaExists),
            projectSchemaMtimeMs: Number(source.projectSchemaMtimeMs || 0),
            mtimeMs: Number(source.mtimeMs || 0)
        });
    };

    GUI.getProjectWatchSignature = function getProjectWatchSignature(version) {
        const source = version && typeof version === 'object' ? version : {};
        return JSON.stringify({
            selectedProject: String(STATE.selectedProject || ''),
            projectDir: String(source.projectDir || ''),
            projectDirAbsolute: String(source.projectDirAbsolute || ''),
            exists: Boolean(source.exists),
            version: String(source.version || ''),
            relation: String(source.relation || ''),
            status: String(source.status || ''),
            detail: String(source.detail || ''),
            advice: String(source.advice || ''),
            infoPath: String(source.infoPath || ''),
            infoMtimeMs: Number(source.infoMtimeMs || 0)
        });
    };

    GUI.stopConfigWatch = function stopConfigWatch() {
        if (STATE.configWatchTimer) {
            window.clearInterval(STATE.configWatchTimer);
            STATE.configWatchTimer = null;
        }
    };

    GUI.stopProjectWatch = function stopProjectWatch() {
        if (STATE.projectWatchTimer) {
            window.clearInterval(STATE.projectWatchTimer);
            STATE.projectWatchTimer = null;
        }
    };

    GUI.isConfigWatchActive = function isConfigWatchActive() {
        return STATE.activeTopTab === 'config';
    };

    GUI.pollConfigModel = async function pollConfigModel() {
        if (!GUI.isConfigWatchActive()) return;
        if (STATE.configMode === 'project' && !STATE.selectedProject) return;

        try {
            const params = new URLSearchParams({ mode: STATE.configMode });
            if (STATE.selectedProject) params.set('dir', STATE.selectedProject);
            const model = await api(`/api/config-watch?${params.toString()}`);
            const nextSignature = GUI.getConfigWatchSignature(model);
            if (!STATE.configWatchSignature) {
                STATE.configWatchSignature = nextSignature;
                return;
            }
            if (nextSignature === STATE.configWatchSignature) return;

            if (STATE.configDirty) {
                if (STATE.configWatchWarnedSignature !== nextSignature) {
                    STATE.configWatchWarnedSignature = nextSignature;
                    logEvent('warn', 'Config files changed on disk while the editor has unsaved changes.', {
                        mode: STATE.configMode,
                        path: model.path || ''
                    });
                }
                return;
            }

            STATE.configWatchWarnedSignature = '';
            STATE.configWatchSignature = nextSignature;
            await GUI.loadConfigModel({ silent: true, reason: 'watch' });
            logEvent('info', 'Reloaded config after an external file change.', {
                mode: STATE.configMode,
                path: model.path || ''
            });
        } catch (error) {
            logEvent('warn', 'Config watch refresh failed.', {
                mode: STATE.configMode,
                message: String(error.message || error)
            });
        }
    };

    GUI.startConfigWatch = function startConfigWatch() {
        GUI.stopConfigWatch();
        if (!GUI.isConfigWatchActive()) return;
        STATE.configWatchTimer = window.setInterval(() => {
            GUI.pollConfigModel().catch(() => {});
        }, Number(STATE.configWatchIntervalMs) || 3000);
    };

    GUI.pollProjectVersion = async function pollProjectVersion() {
        if (!STATE.selectedProject) {
            STATE.projectWatchSignature = '';
            return;
        }

        try {
            const version = await api(`/api/project-info?dir=${encodeURIComponent(STATE.selectedProject)}`);
            const nextSignature = GUI.getProjectWatchSignature(version);
            if (!STATE.projectWatchSignature) {
                STATE.projectWatchSignature = nextSignature;
                return;
            }
            if (nextSignature === STATE.projectWatchSignature) return;

            STATE.projectWatchSignature = nextSignature;
            GUI.renderVersion(version);
            logEvent('info', 'Reloaded project version after info.json changed on disk.', {
                selectedProject: STATE.selectedProject,
                infoPath: String(version.infoPath || '')
            });
        } catch (error) {
            logEvent('warn', 'Project info watch refresh failed.', {
                selectedProject: STATE.selectedProject,
                message: String(error.message || error)
            });
        }
    };

    GUI.startProjectWatch = function startProjectWatch() {
        GUI.stopProjectWatch();
        if (!STATE.selectedProject) {
            STATE.projectWatchSignature = '';
            return;
        }
        STATE.projectWatchTimer = window.setInterval(() => {
            GUI.pollProjectVersion().catch(() => {});
        }, Number(STATE.projectWatchIntervalMs) || 3000);
    };

    GUI.normalizeWikiPath = function normalizeWikiPath(path = '/wiki') {
        let value = decodeURIComponent(String(path || '').trim().split('#')[0] || '')
            .replace(/\\/g, '/')
            .replace(/\/+/g, '/');

        if (!value || value === '/' || /^\/?wiki\/?$/i.test(value) || /^\/?readme\.md$/i.test(value)) {
            return '/wiki';
        }

        if (!value.startsWith('/')) {
            value = `/${value}`;
        }

        if (/^\/wiki\/readme\.md$/i.test(value)) {
            return '/wiki';
        }

        if (!/^\/wiki(?:\/|$)/i.test(value)) {
            value = `/wiki/${value.replace(/^\/+/, '')}`;
        }

        if (/^\/wiki\/?$/i.test(value)) {
            return '/wiki';
        }

        const suffix = value
            .replace(/^\/wiki\/?/i, '')
            .replace(/^\/+|\/+$/g, '');
        const segments = suffix.split('/').filter(Boolean);
        if (segments.length <= 0) return '/wiki';
        if (segments.some((segment) => segment === '.' || segment === '..')) {
            throw new Error('Invalid wiki path.');
        }

        const lastIndex = segments.length - 1;
        if (!/\.md$/i.test(segments[lastIndex])) {
            segments[lastIndex] = `${segments[lastIndex]}.md`;
        }

        return `/wiki/${segments.join('/')}`;
    };

    GUI.resolveWikiNavigation = function resolveWikiNavigation(href) {
        const rawHref = String(href || '').trim();
        if (!rawHref) return null;

        if (rawHref.startsWith('#')) {
            return {
                type: 'anchor',
                hash: rawHref
            };
        }

        if (/^(?:[a-z]+:)?\/\//i.test(rawHref) || /^(?:mailto|tel):/i.test(rawHref)) {
            return null;
        }

        const currentPath = GUI.normalizeWikiPath(STATE.wikiPath || '/wiki');
        const baseUrl = new URL(currentPath, 'http://synticore.local');
        const resolved = new URL(rawHref, baseUrl);

        if (resolved.origin !== 'http://synticore.local') {
            return null;
        }

        if (resolved.pathname === '/' && (!resolved.hash || resolved.hash === '#')) {
            return null;
        }

        if (resolved.hash && (resolved.pathname === currentPath || resolved.pathname === '/')) {
            return {
                type: 'anchor',
                hash: resolved.hash
            };
        }

        return {
            type: 'page',
            path: GUI.normalizeWikiPath(resolved.pathname || '/wiki'),
            hash: resolved.hash || ''
        };
    };

    GUI.getWikiLinkIconClass = function getWikiLinkIconClass(path = '') {
        const normalizedPath = String(path || '').trim().toLowerCase();
        if (!normalizedPath) return 'font-icon--interface--book';
        if (/^\/wiki\/developer(?:\/|\.md$)/i.test(normalizedPath)) {
            return 'font-icon--interface--book-dev';
        }
        return 'font-icon--interface--book';
    };

    GUI.getExternalWikiLinkPrefixClass = function getExternalWikiLinkPrefixClass(href = '') {
        const normalizedHref = String(href || '').trim().toLowerCase();
        if (!normalizedHref) return 'font-icon--interface--link';
        if (/^https:\/\/github\.com\/cureinteractive\/synticore-website-compiler\/releases(?:\/|$)/i.test(normalizedHref)) {
            return 'font-icon--interface--download';
        }
        if (/^https:\/\/github\.com\/cureinteractive\/synticore-website-compiler\/issues(?:\/|$)/i.test(normalizedHref)) {
            return 'font-icon--interface--flag';
        }
        return 'font-icon--interface--link';
    };

    GUI.decorateWikiContentLinks = function decorateWikiContentLinks(rootNode) {
        if (!(rootNode instanceof HTMLElement)) return;
        rootNode.querySelectorAll('a[href]').forEach((anchor) => {
            anchor.classList.remove(
                'wiki-link-icon',
                'wiki-link-icon--external',
                'font-icon--interface--download',
                'font-icon--interface--link',
                'font-icon--interface--flag',
                'font-icon--interface--book',
                'font-icon--interface--book-dev'
            );
            anchor.removeAttribute('target');
            anchor.removeAttribute('rel');
            if (anchor.closest('#wiki-toc')) return;
            const href = String(anchor.getAttribute('href') || '').trim();
            if (!href) return;
            if (/^(?:[a-z]+:)?\/\//i.test(href)) {
                anchor.classList.add(
                    'wiki-link-icon',
                    'wiki-link-icon--external',
                    GUI.getExternalWikiLinkPrefixClass(href)
                );
                anchor.target = '_blank';
                anchor.rel = 'noopener noreferrer';
                return;
            }
            const navigation = GUI.resolveWikiNavigation(href);
            if (!navigation || navigation.type !== 'page') return;
            anchor.classList.add('wiki-link-icon', GUI.getWikiLinkIconClass(navigation.path));
        });
    };

    GUI.renderWikiBreadcrumbs = function renderWikiBreadcrumbs(breadcrumbs = []) {
        if (!UI.wikiBreadcrumbs) return;
        UI.wikiBreadcrumbs.replaceChildren();

        const items = Array.isArray(breadcrumbs) ? breadcrumbs : [];
        if (items.length <= 0) {
            const empty = document.createElement('span');
            empty.className = 'wiki-breadcrumbs__empty';
            empty.textContent = 'Wiki is not loaded yet.';
            UI.wikiBreadcrumbs.appendChild(empty);
            return;
        }

        items.forEach((item, index) => {
            const normalizedItem = item && typeof item === 'object' ? item : {};
            const label = String(normalizedItem.label || '').trim() || 'Wiki';
            const path = String(normalizedItem.path || '').trim();
            const isCurrent = Boolean(normalizedItem.current);

            if (index > 0) {
                const separator = document.createElement('span');
                separator.className = 'wiki-breadcrumbs__separator';
                separator.setAttribute('aria-hidden', 'true');
                separator.textContent = '/';
                UI.wikiBreadcrumbs.appendChild(separator);
            }

            const node = (path && !isCurrent)
                ? document.createElement('a')
                : document.createElement('span');
            node.className = `wiki-breadcrumbs__item${isCurrent ? ' is-current' : ''}`;
            if (index === 0) {
                node.classList.add('gui-icon-label', 'font-icon--interface--home');
            } else {
                node.classList.add('gui-icon-label', GUI.getWikiLinkIconClass(path));
            }
            node.textContent = label;
            if (node instanceof HTMLAnchorElement) {
                node.href = path;
            } else if (isCurrent) {
                node.setAttribute('aria-current', 'page');
            }
            UI.wikiBreadcrumbs.appendChild(node);
        });
    };

    GUI.renderWikiPage = function renderWikiPage(payload = {}) {
        const page = payload && typeof payload === 'object' ? payload : {};
        STATE.wikiPage = page;
        STATE.wikiPath = GUI.normalizeWikiPath(page.path || STATE.wikiPath || '/wiki');
        GUI.renderWikiBreadcrumbs(page.breadcrumbs || []);

        if (UI.wikiToc) {
            UI.wikiToc.innerHTML = String(page.tocHtml || '').trim()
                ? page.tocHtml
                : '<p class="wiki-empty">No table of contents for this page.</p>';
            const firstTocDetail = UI.wikiToc.querySelector(':scope > details');
            if (firstTocDetail instanceof HTMLDetailsElement) {
                firstTocDetail.setAttribute('open', '');
            }
        }

        if (UI.wikiContent) {
            UI.wikiContent.innerHTML = String(page.contentHtml || '').trim()
                ? page.contentHtml
                : '<p class="wiki-empty">This wiki page did not render any content.</p>';
            GUI.decorateWikiContentLinks(UI.wikiContent);
            UI.wikiContent.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
                if (heading.querySelector('.counter')) return;
                heading.insertAdjacentHTML('afterbegin', '<span class="counter"></span>');
            });
            if (window.Prism && typeof window.Prism.highlightAllUnder === 'function') {
                window.Prism.highlightAllUnder(UI.wikiContent);
            }
        }
    };

    GUI.renderWikiError = function renderWikiError(message) {
        STATE.wikiPage = null;
        if (UI.wikiBreadcrumbs) {
            UI.wikiBreadcrumbs.innerHTML = '<span class="wiki-breadcrumbs__empty">Wiki</span>';
        }
        if (UI.wikiToc) {
            UI.wikiToc.innerHTML = '<p class="wiki-empty">No table of contents for this page.</p>';
        }
        if (UI.wikiContent) {
            UI.wikiContent.innerHTML = `<p class="wiki-empty">${escapeHtml(String(message || 'Wiki page failed to load.'))}</p>`;
        }
    };

    GUI.scrollWikiAnchorIntoView = function scrollWikiAnchorIntoView(hash = '') {
        const normalizedHash = String(hash || '').trim();
        if (!normalizedHash || normalizedHash === '#') return;
        const targetId = normalizedHash.replace(/^#/, '');
        const target = document.getElementById(targetId);
        if (!target) return;
        window.requestAnimationFrame(() => {
            target.scrollIntoView({ block: 'start', behavior: 'auto' });
        });
    };

    GUI.loadWikiPage = async function loadWikiPage(path = STATE.wikiPath || '/wiki', options = {}) {
        const normalizedPath = GUI.normalizeWikiPath(path);
        const hash = String(options.hash || '').trim();
        const shouldPersist = options.persist !== false;
        const shouldLog = options.log !== false;

        if (UI.wikiContent && !options.silent) {
            UI.wikiContent.innerHTML = '<p class="wiki-empty">Loading wiki page...</p>';
        }

        const payload = await api(`/api/wiki?page=${encodeURIComponent(normalizedPath)}`);
        GUI.renderWikiPage(payload);

        if (shouldPersist) {
            saveGuiPreference({ wiki_path: normalizedPath }).catch(() => {});
        }

        if (hash) {
            GUI.scrollWikiAnchorIntoView(hash);
        } else {
            const mainElement = document.querySelector('main.layout');
            if (mainElement instanceof HTMLElement) {
                mainElement.scrollIntoView({ block: 'start', behavior: 'auto' });
            } else {
                window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
            }
        }

        if (shouldLog) {
            logEvent('detail', 'Loaded wiki page.', {
                path: normalizedPath,
                title: String(payload.title || '')
            });
        }

        return payload;
    };

    GUI.setWikiTocBranchExpanded = function setWikiTocBranchExpanded(detailNode, expanded, includeDescendants = false) {
        if (!(detailNode instanceof HTMLDetailsElement)) return;
        const nextExpanded = Boolean(expanded);
        detailNode.open = nextExpanded;
        if (!includeDescendants) return;
        detailNode.querySelectorAll('details').forEach((child) => {
            child.open = nextExpanded;
        });
    };

    GUI.getTaskCategorySlug = function getTaskCategorySlug(title) {
        const normalized = String(title || '').trim().toLowerCase();
        if (normalized === 'maintenance') return 'update';
        return normalized.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'general';
    };

    GUI.formatTaskLabel = function formatTaskLabel(name) {
        return String(name || '')
            .trim()
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
    };

    GUI.getTaskLaunchCommand = function getTaskLaunchCommand(taskName) {
        const parts = ['npm', 'run', 'gulp', '--', String(taskName || '').trim()];
        if (STATE.selectedProject) {
            parts.push('--project', STATE.selectedProject);
        }
        return parts.filter(Boolean).join(' ');
    };

    GUI.getProjectRecentEntries = function getProjectRecentEntries(guiConfig) {
        const recents = Array.isArray(guiConfig && guiConfig.dir_recent) ? guiConfig.dir_recent : [];
        const seen = new Set();
        const entries = [];
        for (const entry of recents) {
            const value = String(entry || '').trim();
            if (!value || seen.has(value)) continue;
            seen.add(value);
            entries.push(value);
        }
        return entries;
    };

    GUI.getProjectRecentStashEntries = function getProjectRecentStashEntries(guiConfig) {
        return GUI.getProjectRecentEntries({ dir_recent: guiConfig && guiConfig.dev_dir_recent_stash });
    };

    GUI.syncProjectRecentToggle = function syncProjectRecentToggle(guiConfig) {
        const hasRecentProjects = GUI.getProjectRecentEntries(guiConfig).length > 0;
        UI.projectPathToggle.disabled = !hasRecentProjects;
        UI.projectPathToggle.dataset.tooltip = hasRecentProjects
            ? 'Toggle recent project paths.'
            : 'No recent project paths.';
        if (!hasRecentProjects) {
            GUI.hideProjectSuggestions();
        }
    };

    GUI.syncDevRecentButtons = function syncDevRecentButtons(guiConfig) {
        const hasRecentProjects = GUI.getProjectRecentEntries(guiConfig).length > 0;
        const hasStashedRecentProjects = GUI.getProjectRecentStashEntries(guiConfig).length > 0;

        if (UI.devArchiveRecents) {
            UI.devArchiveRecents.disabled = !hasRecentProjects;
            UI.devArchiveRecents.classList.toggle('is-disabled', UI.devArchiveRecents.disabled);
        }

        if (UI.devRestoreRecents) {
            UI.devRestoreRecents.disabled = !hasStashedRecentProjects;
            UI.devRestoreRecents.classList.toggle('is-disabled', UI.devRestoreRecents.disabled);
        }
    };

    GUI.getDropdownPanel = function getDropdownPanel(dropdown) {
        return dropdown ? dropdown.querySelector('[data-dropdown-panel]') : null;
    };

    GUI.isDropdownOpen = function isDropdownOpen(dropdown) {
        return Boolean(dropdown && dropdown.classList.contains('is-open'));
    };

    GUI.setDropdownOpen = function setDropdownOpen(dropdown, isOpen) {
        if (!dropdown) return;

        const panel = GUI.getDropdownPanel(dropdown);
        const toggle = dropdown.querySelector('[data-dropdown-toggle]');

        dropdown.classList.toggle('is-open', Boolean(isOpen));
        if (panel) {
            panel.hidden = !isOpen;
            if (isOpen) {
                panel.dataset.positioning = 'true';
                GUI.stopDropdownPositionObservation(dropdown);
                GUI.scheduleDropdownPanelPosition(dropdown, {
                    reveal: true,
                    startObservation: true
                });
            } else {
                if (dropdown.__positionFrame) {
                    window.cancelAnimationFrame(dropdown.__positionFrame);
                    dropdown.__positionFrame = null;
                }
                GUI.stopDropdownPositionObservation(dropdown);
                GUI.hideCopyFeedbacks(panel);
                panel.style.left = '';
                panel.style.top = '';
                panel.style.width = '';
                panel.style.maxHeight = '';
                delete panel.dataset.placement;
                delete panel.dataset.positioning;
            }
        }
        if (toggle) {
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            toggle.classList.toggle('is-open', Boolean(isOpen));
        }
    };

    GUI.closeDropdowns = function closeDropdowns(exception = null) {
        UI.dropdowns.forEach((dropdown) => {
            if (dropdown === exception) return;
            GUI.setDropdownOpen(dropdown, false);
        });
    };

    GUI.toggleDropdown = function toggleDropdown(dropdown) {
        const nextState = !GUI.isDropdownOpen(dropdown);
        GUI.closeDropdowns(nextState ? dropdown : null);
        GUI.setDropdownOpen(dropdown, nextState);
        return nextState;
    };

    GUI.getDropdownAnchor = function getDropdownAnchor(dropdown) {
        if (!dropdown) return null;

        const anchorSelector = String(dropdown.dataset.dropdownAnchor || '').trim();
        return (anchorSelector ? dropdown.querySelector(anchorSelector) : null)
            || dropdown.querySelector('[data-dropdown-toggle]')
            || dropdown;
    };

    GUI.ensureDropdownPositionObserver = function ensureDropdownPositionObserver() {
        if (GUI.dropdownPositionObserver || typeof window.ResizeObserver !== 'function') return;

        GUI.dropdownPositionObserver = new window.ResizeObserver((entries) => {
            const seen = new Set();
            entries.forEach((entry) => {
                const dropdown = entry && entry.target && entry.target.__dropdownOwner;
                if (!dropdown || seen.has(dropdown) || !GUI.isDropdownOpen(dropdown)) return;
                seen.add(dropdown);
                GUI.scheduleDropdownPanelPosition(dropdown);
            });
        });
    };

    GUI.startDropdownPositionObservation = function startDropdownPositionObservation(dropdown) {
        if (!dropdown) return;
        GUI.ensureDropdownPositionObserver();
        if (!GUI.dropdownPositionObserver) return;

        const anchor = GUI.getDropdownAnchor(dropdown);
        if (anchor) {
            anchor.__dropdownOwner = dropdown;
            GUI.dropdownPositionObserver.observe(anchor);
        }
    };

    GUI.stopDropdownPositionObservation = function stopDropdownPositionObservation(dropdown) {
        if (!dropdown || !GUI.dropdownPositionObserver) return;

        const anchor = GUI.getDropdownAnchor(dropdown);
        if (anchor) {
            GUI.dropdownPositionObserver.unobserve(anchor);
        }
    };

    GUI.scheduleDropdownPanelPosition = function scheduleDropdownPanelPosition(dropdown, options = {}) {
        if (!dropdown) return;

        if (dropdown.__positionFrame) {
            window.cancelAnimationFrame(dropdown.__positionFrame);
            dropdown.__positionFrame = null;
        }

        dropdown.__positionFrame = window.requestAnimationFrame(() => {
            dropdown.__positionFrame = null;
            GUI.positionDropdownPanel(dropdown);
            const panel = GUI.getDropdownPanel(dropdown);
            if (panel && options.reveal !== false) {
                delete panel.dataset.positioning;
            }
            if (options.startObservation) {
                GUI.startDropdownPositionObservation(dropdown);
            }
        });
    };

    GUI.positionDropdownPanel = function positionDropdownPanel(dropdown) {
        const panel = GUI.getDropdownPanel(dropdown);
        if (!dropdown || !panel || panel.hidden) return;

        const anchor = GUI.getDropdownAnchor(dropdown);
        const anchorRect = anchor.getBoundingClientRect();
        const stretchWidth = String(dropdown.dataset.dropdownStretch || '').trim().toLowerCase() === 'true';
        const panelAlign = String(
            dropdown.dataset.dropdownPanelAlign
            || dropdown.dataset.dropdownAlign
            || 'start'
        ).trim().toLowerCase();
        const scrollRegions = [panel, ...panel.querySelectorAll('.floating-panel__body, .settings-menu__body, .project-path-suggestions__list')]
            .filter((node, index, list) => list.indexOf(node) === index)
            .map((node) => ({
                node,
                top: node.scrollTop,
                left: node.scrollLeft
            }));

        panel.style.left = '0px';
        panel.style.top = '0px';
        panel.style.width = '';
        panel.style.maxHeight = '';

        const initialPanelRect = panel.getBoundingClientRect();
        const initialPosition = getFloatingPanelPosition(anchorRect, initialPanelRect, {
            margin: 12,
            offset: 8,
            preferPlacement: 'bottom',
            align: panelAlign,
            stretchWidth
        });

        panel.style.width = stretchWidth
            ? `${initialPosition.width}px`
            : '';
        panel.style.maxHeight = `${initialPosition.maxHeight}px`;

        const measuredPanelRect = panel.getBoundingClientRect();
        const finalPosition = getFloatingPanelPosition(anchorRect, measuredPanelRect, {
            margin: 12,
            offset: 8,
            preferPlacement: 'bottom',
            align: panelAlign,
            stretchWidth
        });

        panel.style.left = `${finalPosition.left}px`;
        panel.style.top = `${finalPosition.top}px`;
        panel.style.width = stretchWidth
            ? `${finalPosition.width}px`
            : '';
        panel.style.maxHeight = `${finalPosition.maxHeight}px`;
        panel.dataset.placement = finalPosition.placement;
        scrollRegions.forEach((region) => {
            region.node.scrollTop = region.top;
            region.node.scrollLeft = region.left;
        });
    };

    GUI.createOverlayPanelHeader = function createOverlayPanelHeader(options = {}) {
        const header = document.createElement('div');
        header.className = 'floating-panel__header';

        const title = document.createElement('div');
        title.className = `floating-panel__title ${String(options.titleClassName || '').trim()}`.trim();
        title.textContent = String(options.title || '');
        header.appendChild(title);

        if (options.closeMode === 'dropdown') {
            const closeButton = document.createElement('button');
            closeButton.type = 'button';
            closeButton.className = 'button button--icon-action button--icon-action--solo gui-icon-button font-icon--interface--close';
            closeButton.dataset.dropdownClose = '';
            closeButton.setAttribute('aria-label', String(options.closeLabel || 'Close'));
            closeButton.dataset.tooltipHeading = 'Close';
            closeButton.dataset.tooltip = String(options.closeTooltip || GUI.getCloseSurfaceTooltipText(options.title, 'panel'));

            const closeLabel = document.createElement('span');
            closeLabel.className = 'button--icon-action__label';
            closeLabel.textContent = String(options.closeLabel || 'Close');
            closeButton.appendChild(closeLabel);
            header.appendChild(closeButton);
        }

        return { header, title };
    };

    GUI.getCloseSurfaceTooltipText = function getCloseSurfaceTooltipText(title, kind = 'panel') {
        const normalizedTitle = String(title || '').trim();
        const normalizedKind = String(kind || 'panel').trim().toLowerCase() || 'panel';
        if (!normalizedTitle) {
            return normalizedKind === 'dialog'
                ? 'Close this dialog.'
                : 'Close this panel.';
        }
        return `Close ${normalizedTitle} ${normalizedKind}.`;
    };

    GUI.getCloseButtonSurfaceTooltip = function getCloseButtonSurfaceTooltip(button, fallbackText = 'Close this panel.') {
        if (!button) return String(fallbackText || 'Close this panel.');

        const modal = button.closest('[data-modal]');
        if (modal) {
            const labelledBy = String(modal.getAttribute('aria-labelledby') || '').trim();
            const titleNode = labelledBy ? document.getElementById(labelledBy) : modal.querySelector('.floating-panel__title, .modal__header h2');
            const title = String(titleNode && titleNode.textContent || '').trim();
            return GUI.getCloseSurfaceTooltipText(title, 'dialog');
        }

        const panel = button.closest('[data-dropdown-panel], .floating-panel');
        if (panel) {
            const titleNode = panel.querySelector('.floating-panel__title');
            const title = String(titleNode && titleNode.textContent || '').trim();
            return GUI.getCloseSurfaceTooltipText(title, 'panel');
        }

        return String(fallbackText || 'Close this panel.');
    };

    GUI.applyCloseButtonTooltip = function applyCloseButtonTooltip(button, fallbackText = 'Close this panel.') {
        if (!button || button.tagName !== 'BUTTON') return;
        if (!String(button.dataset.tooltipHeading || '').trim()) {
            button.dataset.tooltipHeading = 'Close';
        }
        if (!String(button.dataset.tooltip || '').trim()) {
            button.dataset.tooltip = GUI.getCloseButtonSurfaceTooltip(button, fallbackText);
        }
    };

    GUI.createDropdownSurface = function createDropdownSurface(options = {}) {
        const dropdown = options.dropdown || document.createElement('div');
        const rootClassName = String(options.rootClassName || dropdown.className || 'dropdown').trim();
        dropdown.className = rootClassName;
        dropdown.dataset.dropdown = '';
        dropdown.dataset.dropdownAlign = String(options.align || dropdown.dataset.dropdownAlign || 'start');
        dropdown.dataset.dropdownPanelAlign = String(
            options.panelAlign
            || dropdown.dataset.dropdownPanelAlign
            || dropdown.dataset.dropdownAlign
            || 'start'
        );
        if (Object.prototype.hasOwnProperty.call(options, 'stretch')) {
            dropdown.dataset.dropdownStretch = options.stretch ? 'true' : 'false';
        }

        let toggle = options.toggleNode || dropdown.querySelector('[data-dropdown-toggle]');
        if (!toggle) {
            toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = String(options.buttonClassName || 'button button--icon-action gui-icon-button font-icon--interface--arrow-down').trim();
            toggle.dataset.dropdownToggle = '';
            toggle.setAttribute('aria-expanded', 'false');
            const label = document.createElement('span');
            label.className = 'button--icon-action__label';
            label.textContent = String(options.buttonLabel || '');
            toggle.appendChild(label);
        }

        let panel = options.panelNode || dropdown.querySelector('[data-dropdown-panel]');
        if (!panel || options.rebuildPanel) {
            const newPanel = document.createElement('div');
            newPanel.className = String(options.panelClassName || 'floating-panel dropdown__panel overlay-surface overlay-surface--panel').trim();
            newPanel.dataset.dropdownPanel = '';
            newPanel.hidden = true;

            if (options.title) {
                const panelHeader = GUI.createOverlayPanelHeader({
                    title: options.title,
                    titleClassName: options.titleClassName,
                    closeMode: 'dropdown',
                    closeLabel: options.closeLabel || 'Close'
                });
                newPanel.appendChild(panelHeader.header);
            }

            let bodyNode = options.bodyNode || null;
            if (bodyNode) {
                bodyNode.className = String(options.bodyClassName || bodyNode.className || '').trim();
                newPanel.appendChild(bodyNode);
            }

            if (panel && panel.parentNode === dropdown) {
                dropdown.replaceChild(newPanel, panel);
            } else {
                dropdown.appendChild(newPanel);
            }
            panel = newPanel;
        }

        if (!toggle.parentNode || toggle.parentNode !== dropdown) {
            dropdown.prepend(toggle);
        }

        if (typeof GUI.bindDropdown === 'function') {
            GUI.bindDropdown(dropdown);
        } else if (Array.isArray(UI.dropdowns) && !UI.dropdowns.includes(dropdown)) {
            UI.dropdowns.push(dropdown);
        }

        return { dropdown, toggle, panel };
    };

    GUI.normalizeStaticDropdownSurfaces = function normalizeStaticDropdownSurfaces() {
        if (UI.settingsMenu) {
            const settingsBody = UI.settingsMenu.querySelector('.settings-menu__body');
            const settingsSurface = GUI.createDropdownSurface({
                dropdown: UI.settingsMenu,
                toggleNode: UI.settingsMenuToggle,
                rootClassName: 'settings-menu dropdown',
                align: 'end',
                panelClassName: 'settings-menu__panel floating-panel dropdown__panel overlay-surface overlay-surface--panel',
                title: 'Setting',
                titleClassName: 'gui-icon-label font-icon--interface--gear',
                closeLabel: 'Close',
                bodyNode: settingsBody,
                bodyClassName: 'settings-menu__body floating-panel__body',
                rebuildPanel: true
            });
            UI.settingsMenu = settingsSurface.dropdown;
            UI.settingsMenuToggle = settingsSurface.toggle;
        }

        if (UI.projectPathControl) {
            const recentBody = UI.projectPathSuggestionsList;
            const recentSurface = GUI.createDropdownSurface({
                dropdown: UI.projectPathControl,
                toggleNode: UI.projectPathToggle,
                rootClassName: 'project-path-control dropdown',
                align: 'start',
                stretch: true,
                panelClassName: 'project-path-suggestions floating-panel dropdown__panel overlay-surface overlay-surface--panel',
                title: 'Recent Projects',
                titleClassName: 'gui-icon-label font-icon--interface--clock',
                closeLabel: 'Close',
                bodyNode: recentBody,
                bodyClassName: 'project-path-suggestions__list floating-panel__body',
                rebuildPanel: true
            });
            UI.projectPathControl = recentSurface.dropdown;
            UI.projectPathToggle = recentSurface.toggle;
            UI.projectPathSuggestions = recentSurface.panel;
        }
    };

    GUI.bindDropdown = function bindDropdown(dropdown) {
        if (!dropdown || dropdown.dataset.dropdownBound === 'true') return;
        const toggle = dropdown.querySelector('[data-dropdown-toggle]');
        if (!toggle) return;

        dropdown.dataset.dropdownBound = 'true';
        if (!UI.dropdowns.includes(dropdown)) {
            UI.dropdowns.push(dropdown);
        }

        toggle.addEventListener('click', async (event) => {
            event.preventDefault();
            if (dropdown === UI.projectPathControl && !GUI.isDropdownOpen(dropdown)) {
                GUI.renderProjectSuggestions('');
                return;
            }
            if (dropdown === UI.settingsMenu && !GUI.isDropdownOpen(dropdown)) {
                try {
                    await GUI.refreshNetworkSettingsFromServer();
                } catch (error) {
                    logEvent('warn', 'Refreshing live network settings failed.', {
                        message: String(error.message || error)
                    });
                }
            }
            GUI.toggleDropdown(dropdown);
        });

        dropdown.querySelectorAll('[data-dropdown-close]').forEach((node) => {
            GUI.applyCloseButtonTooltip(node, 'Close this panel.');
            node.addEventListener('click', (event) => {
                event.preventDefault();
                GUI.setDropdownOpen(dropdown, false);
            });
        });
    };

    GUI.bindDropdowns = function bindDropdowns() {
        UI.dropdowns.forEach((dropdown) => {
            GUI.bindDropdown(dropdown);
        });

        document.addEventListener('pointerdown', (event) => {
            const activeDropdown = UI.dropdowns.find((dropdown) => dropdown.contains(event.target));
            GUI.closeDropdowns(activeDropdown || null);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            GUI.closeDropdowns();
        });

        document.addEventListener('focusin', (event) => {
            const focusedDropdown = UI.dropdowns.find((dropdown) => dropdown.contains(event.target));
            GUI.closeDropdowns(focusedDropdown || null);
        });

        window.addEventListener('resize', () => {
            UI.dropdowns.forEach((dropdown) => {
                if (!GUI.isDropdownOpen(dropdown)) return;
                GUI.scheduleDropdownPanelPosition(dropdown);
            });
        });

        window.addEventListener('scroll', (event) => {
            UI.dropdowns.forEach((dropdown) => {
                if (!GUI.isDropdownOpen(dropdown)) return;
                const panel = GUI.getDropdownPanel(dropdown);
                if (panel && event && event.target && panel.contains(event.target)) return;
                GUI.scheduleDropdownPanelPosition(dropdown);
            });
        }, true);
    };

    GUI.isModalOpen = function isModalOpen(modal) {
        return Boolean(modal && !modal.hidden);
    };

    GUI.openModal = function openModal(modal) {
        if (!modal) return;
        modal.hidden = false;
        document.documentElement.classList.add('has-modal-open');
        document.body.classList.add('has-modal-open');
    };

    GUI.closeModal = function closeModal(modal) {
        if (!modal) return;
        GUI.hideCopyFeedbacks(modal);
        modal.hidden = true;
        const hasOpenModal = UI.modals.some((item) => !item.hidden);
        document.documentElement.classList.toggle('has-modal-open', hasOpenModal);
        document.body.classList.toggle('has-modal-open', hasOpenModal);
    };

    GUI.bindModals = function bindModals() {
        UI.modals.forEach((modal) => {
            modal.querySelectorAll('[data-modal-close]').forEach((node) => {
                GUI.applyCloseButtonTooltip(node, 'Close this dialog.');
                node.addEventListener('click', () => {
                    GUI.closeModal(modal);
                });
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') return;
            const activeModal = UI.modals.find((modal) => !modal.hidden);
            if (!activeModal) return;
            GUI.closeModal(activeModal);
        });
    };

    GUI.bindDirectoryBrowsers = function bindDirectoryBrowsers() {
        UI.browseDirectoryButtons.forEach((button) => {
            button.addEventListener('click', async () => {
                const targetId = String(button.dataset.browseTarget || '').trim();
                const input = targetId ? document.getElementById(targetId) : null;
                if (!input) return;

                const initialSourceId = String(button.dataset.browseInitial || targetId).trim();
                const initialSource = initialSourceId ? document.getElementById(initialSourceId) : input;
                const initialDir = initialSource ? String(initialSource.value || '').trim() : '';

                try {
                    const result = await api('/api/browse/directory', {
                        method: 'POST',
                        body: { initialDir }
                    });

                    if (!result.dir) return;

                    input.value = result.dir;
                    const applyMode = String(button.dataset.browseApply || '').trim();
                    if (applyMode === 'project-select') {
                        await GUI.selectProject(result.dir);
                    }

                    logEvent('success', 'Applied browsed directory to input.', {
                        targetId,
                        dir: result.dir,
                        applyMode
                    });
                } catch (error) {
                    logEvent('error', 'Directory browse failed.', {
                        targetId,
                        message: String(error.message || error)
                    });
                }
            });
        });
    };

    GUI.renderProjectSuggestions = function renderProjectSuggestions(filterValue = '') {
        const allEntries = GUI.getProjectRecentEntries(STATE.bootstrap && STATE.bootstrap.guiConfig);
        const normalizedFilter = String(filterValue || '').trim().toLowerCase();
        const entries = normalizedFilter
            ? allEntries.filter((entry) => entry.toLowerCase().includes(normalizedFilter))
            : allEntries;

        UI.projectPathSuggestionsList.replaceChildren();

        if (entries.length <= 0) {
            GUI.setDropdownOpen(UI.projectPathControl, false);
            return;
        }

        for (const entry of entries) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'project-path-suggestions__item dropdown-option gui-icon-label';
            const isCurrent = entry === STATE.selectedProject;
            button.classList.toggle('is-current', isCurrent);
            button.classList.toggle('font-icon--interface--radio-on', isCurrent);
            button.classList.toggle('font-icon--interface--radio-off', !isCurrent);
            button.textContent = entry;
            button.dataset.tooltipHeading = 'Recent Project';
            button.dataset.tooltip = entry;
            button.addEventListener('mousedown', (event) => {
                event.preventDefault();
            });
            button.addEventListener('click', async () => {
                UI.projectPath.value = entry;
                GUI.hideProjectSuggestions();
                try {
                    await GUI.selectProject(entry);
                } catch (error) {
                    logEvent('error', 'Recent project selection failed.', {
                        path: entry,
                        message: String(error.message || error)
                    });
                }
            });
            UI.projectPathSuggestionsList.appendChild(button);
        }

        GUI.normalizeTooltipTargets(UI.projectPathSuggestionsList);
        GUI.closeDropdowns(UI.projectPathControl);
        GUI.setDropdownOpen(UI.projectPathControl, true);
    };

    GUI.hideProjectSuggestions = function hideProjectSuggestions() {
        GUI.setDropdownOpen(UI.projectPathControl, false);
    };

    GUI.hideCopyFeedbacks = function hideCopyFeedbacks(container = document) {
        const root = container && typeof container.querySelectorAll === 'function' ? container : document;
        root.querySelectorAll('[data-copy-feedback]').forEach((node) => {
            if (node.__copyTimer) {
                window.clearTimeout(node.__copyTimer);
                node.__copyTimer = null;
            }
            node.hidden = true;
        });
    };

    GUI.showCopyFeedback = function showCopyFeedback(feedback) {
        if (!feedback) return;
        if (feedback.__copyTimer) {
            window.clearTimeout(feedback.__copyTimer);
        }
        feedback.hidden = false;
        feedback.__copyTimer = window.setTimeout(() => {
            feedback.hidden = true;
            feedback.__copyTimer = null;
        }, 3000);
    };

    GUI.bindCopyFields = function bindCopyFields() {
        UI.copyTriggers.forEach((button) => {
            button.addEventListener('click', async () => {
                const targetId = String(button.dataset.copyTarget || '').trim();
                const target = targetId ? document.getElementById(targetId) : null;
                const field = button.closest('[data-copy-field]');
                const feedback = field ? field.querySelector('[data-copy-feedback]') : null;
                if (!target || button.disabled || target.disabled) return;

                const value = 'value' in target
                    ? String(target.value || '').trim()
                    : String(target.textContent || '').trim();
                if (!value) return;

                try {
                    await navigator.clipboard.writeText(value);
                    GUI.showCopyFeedback(feedback);
                    logEvent('detail', 'Copied readonly field value.', { targetId });
                } catch (error) {
                    logEvent('warn', 'Copying readonly field value failed.', {
                        targetId,
                        message: String(error.message || error)
                    });
                }
            });
        });
    };

    GUI.renderTasks = function renderTasks(tasksByCategory) {
        UI.taskColumns.replaceChildren();
        for (const category of tasksByCategory) {
            const group = document.createElement('section');
            group.className = `task-group task-group--${GUI.getTaskCategorySlug(category.title)}`;

            const title = document.createElement('h3');
            title.className = 'task-group__title gui-icon-label';
            title.textContent = category.title || 'Tasks';
            group.appendChild(title);

            const summary = document.createElement('p');
            summary.textContent = category.comment || 'Compiler task group.';
            group.appendChild(summary);

            const list = document.createElement('div');
            list.className = 'task-list';

            for (const task of category.tasks || []) {
                const taskComment = String(task.comment || '').trim();
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'button task-button';
                button.dataset.tooltipHeading = 'Command';
                button.dataset.tooltip = GUI.getTaskLaunchCommand(task.name);
                button.innerHTML = `
                    <span class="task-button__name">${escapeHtml(GUI.formatTaskLabel(task.name))}</span>
                    ${taskComment ? `<span class="task-button__comment">${escapeHtml(taskComment)}</span>` : ''}
                `;
                button.addEventListener('click', async () => {
                    try {
                        await api('/api/task/run', {
                            method: 'POST',
                            body: { task: task.name, dir: STATE.selectedProject }
                        });
                        logEvent('success', 'Launched task from browser GUI.', {
                            task: task.name,
                            dir: STATE.selectedProject || ''
                        });
                    } catch (error) {
                        logEvent('error', 'Task launch failed from browser GUI.', {
                            task: task.name,
                            dir: STATE.selectedProject || '',
                            message: String(error.message || error)
                        });
                    }
                });
                list.appendChild(button);
            }

            group.append(list);
            UI.taskColumns.appendChild(group);
        }
        GUI.normalizeTooltipTargets(UI.taskColumns);
    };

    GUI.hasTaskCategory = function hasTaskCategory(tasksByCategory, title) {
        const wantedTitle = String(title || '').trim().toLowerCase();
        if (!wantedTitle || !Array.isArray(tasksByCategory)) return false;
        return tasksByCategory.some((category) => String(category && category.title || '').trim().toLowerCase() === wantedTitle);
    };

    GUI.applyTasksPayload = function applyTasksPayload(tasksByCategory, options = {}) {
        const previousTasksByCategory = Array.isArray(options.previousTasksByCategory)
            ? options.previousTasksByCategory
            : STATE.bootstrap && Array.isArray(STATE.bootstrap.tasksByCategory)
                ? STATE.bootstrap.tasksByCategory
                : [];
        const nextTasksByCategory = Array.isArray(tasksByCategory) ? tasksByCategory : [];
        const hadTestTaskGroup = GUI.hasTaskCategory(previousTasksByCategory, 'Test');
        const hasTestTaskGroup = GUI.hasTaskCategory(nextTasksByCategory, 'Test');

        STATE.bootstrap = STATE.bootstrap || {};
        STATE.bootstrap.tasksByCategory = nextTasksByCategory;
        GUI.renderTasks(nextTasksByCategory);

        if (!hadTestTaskGroup && hasTestTaskGroup && options.notice !== false) {
            logEvent('notice', 'Added Test task group because the Synticore compiler repository is in Git.', {
                compilerRepositoryInGit: true
            });
        }
    };

    GUI.renderProjectInput = function renderProjectInput(guiConfig, selectedProject) {
        UI.projectPath.value = selectedProject || '';
        GUI.syncProjectRecentToggle(guiConfig);
        GUI.syncDevRecentButtons(guiConfig);
        GUI.hideProjectSuggestions();
    };

    GUI.updateTemplateSelection = function updateTemplateSelection() {
        const selected = UI.newProjectTemplate.value;
        Array.from(UI.newProjectTemplateCards.children).forEach((node) => {
            const isSelected = node.dataset.template === selected;
            const title = node.querySelector('.template-card__title');
            node.classList.toggle('is-selected', isSelected);
            if (title) {
                title.classList.toggle('font-icon--interface--checkbox-on', isSelected);
                title.classList.toggle('font-icon--interface--checkbox-off', !isSelected);
            }
        });
    };

    GUI.renderTemplates = function renderTemplates(templates) {
        UI.newProjectTemplate.replaceChildren();
        UI.newProjectTemplateCards.replaceChildren();

        templates.forEach((template, index) => {
            const option = document.createElement('option');
            option.value = template.id;
            option.textContent = template.label;
            UI.newProjectTemplate.appendChild(option);

            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'template-card';
            card.dataset.template = template.id;
            card.innerHTML = `
                <strong class="template-card__title gui-icon-label font-icon--interface--checkbox-off">${escapeHtml(template.label)}</strong>
                <span>${escapeHtml(template.description || template.path || template.id)}</span>
            `;
            card.addEventListener('click', () => {
                UI.newProjectTemplate.value = template.id;
                GUI.updateTemplateSelection();
            });
            UI.newProjectTemplateCards.appendChild(card);

            if (index === 0 && !UI.newProjectTemplate.value) {
                UI.newProjectTemplate.value = template.id;
            }
        });

        GUI.updateTemplateSelection();
    };

    GUI.renderVersion = function renderVersion(version) {
        const rawVersion = String((version && version.version) || '').trim();
        const displayVersion = rawVersion
            ? (rawVersion.toLowerCase().startsWith('v') ? rawVersion : `v${rawVersion}`)
            : 'v0.0.0';
        const detailText = String(version.detail || '').trim();
        const relation = String(version.relation || 'missing').trim();
        const stateIconClass = {
            equal: 'font-icon--interface--checkbox-on',
            older: 'font-icon--interface--log-warn',
            newer: 'font-icon--interface--log-error'
        }[relation] || '';
        const tooltipParts = [
            'Project Version',
            String(version.status || 'No project selected').trim(),
            detailText,
            String(version.advice || '').trim()
        ].filter(Boolean);
        UI.versionBadge.dataset.relation = relation || 'missing';
        UI.versionText.textContent = displayVersion;
        UI.versionState.classList.remove(
            'font-icon--interface--checkbox-on',
            'font-icon--interface--log-warn',
            'font-icon--interface--log-error'
        );
        if (stateIconClass) {
            UI.versionState.classList.add(stateIconClass);
        }
        UI.versionState.textContent = version.status || 'No project selected';
        UI.versionDetail.textContent = detailText;
        UI.versionBadge.dataset.tooltipHeading = 'Version';
        UI.versionBadge.dataset.tooltip = tooltipParts.join('\n\n');
        UI.versionBadge.removeAttribute('title');
    };

    GUI.showAuthOverlay = function showAuthOverlay(auth = {}, message = '') {
        STATE.authRequired = true;
        UI.authOverlay.hidden = false;
        UI.authText.textContent = message || 'Enter the LAN access token for this compiler instance on your network.';
        UI.authToken.placeholder = new Array(Number(auth.tokenGroupCount || 4)).fill('X'.repeat(Number(auth.tokenGroupLength || 4))).join('-');
        UI.authToken.value = '';
        UI.authError.hidden = true;
        UI.authError.textContent = '';
        UI.authToken.focus();
    };

    GUI.hideAuthOverlay = function hideAuthOverlay() {
        STATE.authRequired = false;
        UI.authOverlay.hidden = true;
        UI.authError.hidden = true;
        UI.authError.textContent = '';
    };

    GUI.waitForServerReconnect = async function waitForServerReconnect(maxAttempts = 40, delayMs = 350) {
        let lastError = null;
        for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
            try {
                const bootstrapData = await GUI.loadBootstrapData();
                const guiConfig = bootstrapData && bootstrapData.guiConfig ? bootstrapData.guiConfig : {};
                const network = bootstrapData && bootstrapData.network ? bootstrapData.network : {};
                const expectsLanBinding = Boolean(guiConfig.network_public);
                const hostMatches = expectsLanBinding
                    ? String(network.host || '') === '0.0.0.0'
                    : String(network.host || '') === '127.0.0.1';

                if (!hostMatches) {
                    lastError = new Error('Browser GUI server binding has not switched yet.');
                } else {
                    return bootstrapData;
                }
            } catch (error) {
                lastError = error;
            }
            await new Promise((resolve) => {
                window.setTimeout(resolve, delayMs);
            });
        }
        throw lastError || new Error('Browser GUI server restart timed out.');
    };

    GUI.restartServerAndReconnect = async function restartServerAndReconnect(options = {}) {
        const keepDropdown = options.keepDropdown || null;
        GUI.closeDropdowns(keepDropdown);
        GUI.closeTooltip();
        GUI.hideProjectSuggestions();
        GUI.hideAuthOverlay();
        setLoading('Restarting browser GUI server...', true);
        await logEvent('begin', 'Restarting browser GUI server...');

        try {
            const bootstrapData = await GUI.waitForServerReconnect();
            logEvent('success', 'Browser GUI server restarted and reconnected.', {
                networkPublic: Boolean(bootstrapData && bootstrapData.guiConfig && bootstrapData.guiConfig.network_public),
                host: bootstrapData && bootstrapData.network ? bootstrapData.network.host : ''
            });
            if (keepDropdown && GUI.isDropdownOpen(keepDropdown)) {
                GUI.scheduleDropdownPanelPosition(keepDropdown);
            }
        } catch (error) {
            if (error && error.status === 401 && error.data && error.data.authRequired) {
                GUI.showAuthOverlay(error.data.auth || {}, String(error.message || 'Authentication required.'));
                logEvent('warn', 'LAN authentication required.', {
                    context: 'server-restart'
                });
            } else {
                logEvent('error', 'Browser GUI server restart reconnect failed.', {
                    message: String(error.message || error)
                });
            }
            throw error;
        } finally {
            setLoading('', false);
        }
    };

    GUI.loadBootstrapData = async function loadBootstrapData() {
        const bootstrapData = await api('/api/bootstrap');
        const previousTasksByCategory = STATE.bootstrap && Array.isArray(STATE.bootstrap.tasksByCategory)
            ? STATE.bootstrap.tasksByCategory
            : [];
        STATE.bootstrap = bootstrapData;
        STATE.selectedProject = bootstrapData.selectedProject || '';
        STATE.configWatchIntervalMs = Number(bootstrapData.watcherIntervalMs) || STATE.configWatchIntervalMs || 3000;
        STATE.projectWatchIntervalMs = Number(bootstrapData.watcherIntervalMs) || STATE.projectWatchIntervalMs || 3000;
        STATE.wikiPath = GUI.normalizeWikiPath((bootstrapData.guiConfig && bootstrapData.guiConfig.wiki_path) || '/wiki');
        GUI.cacheGuiConfig(bootstrapData.guiConfig || {});
        GUI.applyLogPreferenceState(bootstrapData.guiConfig || {});

        document.title = bootstrapData.title || document.title;
        GUI.applyTheme((bootstrapData.guiConfig && bootstrapData.guiConfig.theme) || 'dark');
        GUI.applyButtonTitlesSetting(Boolean(bootstrapData.guiConfig && bootstrapData.guiConfig.show_button_titles));
        GUI.renderProjectInput(bootstrapData.guiConfig || {}, STATE.selectedProject);
        GUI.renderNetworkSettings(bootstrapData.guiConfig || {}, bootstrapData.network || {});
        GUI.applyTasksPayload(bootstrapData.tasksByCategory || [], { previousTasksByCategory });
        GUI.renderTemplates(bootstrapData.templates || []);
        GUI.renderVersion(bootstrapData.projectVersion || {});
        STATE.projectWatchSignature = GUI.getProjectWatchSignature(bootstrapData.projectVersion || {});
        GUI.startProjectWatch();
        GUI.activateConfigMode((bootstrapData.guiConfig && bootstrapData.guiConfig.config_mode) || 'project');
        GUI.activateTopTab((bootstrapData.guiConfig && bootstrapData.guiConfig.current_tab) || 'task');
        await GUI.loadConfigModel().catch((error) => {
            logEvent('warn', 'Initial config load failed during bootstrap.', {
                mode: STATE.configMode,
                message: String(error.message || error)
            });
        });
        return bootstrapData;
    };

    GUI.openDevModal = function openDevModal() {
        if (!UI.devModal) return;
        GUI.openModal(UI.devModal);
        logEvent('detail', 'Opened dev lab modal.');
    };

    GUI.resetDevSecretGesture = function resetDevSecretGesture() {
        if (STATE.devSecretHoldTimer) {
            window.clearTimeout(STATE.devSecretHoldTimer);
        }
        STATE.devSecretStage = 0;
        STATE.devSecretDeadline = 0;
        STATE.devSecretHoldTimer = null;
        STATE.devSecretPointerId = null;
        STATE.devSecretPointerStartX = null;
        STATE.devSecretPointerStartY = null;
    };

    GUI.advanceDevSecretGesture = function advanceDevSecretGesture(target) {
        const normalizedTarget = String(target || '').trim().toLowerCase();
        const now = Date.now();
        const expectedTarget = ['logo', 'settings', 'logo'][STATE.devSecretStage] || '';
        if (!expectedTarget) {
            GUI.resetDevSecretGesture();
            return false;
        }

        if (STATE.devSecretDeadline && now > STATE.devSecretDeadline) {
            GUI.resetDevSecretGesture();
            if (normalizedTarget !== 'logo') {
                return false;
            }
        }

        if (normalizedTarget !== expectedTarget) {
            if (normalizedTarget === 'logo') {
                STATE.devSecretStage = 1;
                STATE.devSecretDeadline = now + 3500;
                return true;
            }
            GUI.resetDevSecretGesture();
            return false;
        }

        STATE.devSecretStage += 1;
        STATE.devSecretDeadline = now + 3500;
        return true;
    };

    GUI.isDevSecretTouchPointer = function isDevSecretTouchPointer(event) {
        const pointerType = String(event && event.pointerType || '').trim().toLowerCase();
        return pointerType === 'touch' || pointerType === 'pen';
    };

    GUI.bindDevSecretGesture = function bindDevSecretGesture() {
        if (!UI.brandLogo || !UI.settingsMenuToggle) return;

        const DEV_HOLD_MS = 1000;
        const DEV_MOVE_PX = 18;

        UI.brandLogo.addEventListener('pointerup', (event) => {
            if (!GUI.isDevSecretTouchPointer(event)) return;
            if (STATE.devSecretStage >= 3) return;
            GUI.advanceDevSecretGesture('logo');
        });

        UI.settingsMenuToggle.addEventListener('pointerup', (event) => {
            if (!GUI.isDevSecretTouchPointer(event)) return;
            if (STATE.devSecretStage !== 1) {
                GUI.resetDevSecretGesture();
                return;
            }
            GUI.advanceDevSecretGesture('settings');
        });

        UI.brandLogo.addEventListener('pointerdown', (event) => {
            if (!GUI.isDevSecretTouchPointer(event)) return;
            if (STATE.devSecretStage !== 3 || GUI.isModalOpen(UI.devModal)) return;

            STATE.devSecretPointerId = event.pointerId;
            STATE.devSecretPointerStartX = Number(event.clientX);
            STATE.devSecretPointerStartY = Number(event.clientY);
            STATE.devSecretHoldTimer = window.setTimeout(() => {
                STATE.devSecretHoldTimer = null;
                STATE.devSecretStage = 0;
                STATE.devSecretDeadline = 0;
                STATE.devSecretPointerId = null;
                STATE.devSecretPointerStartX = null;
                STATE.devSecretPointerStartY = null;
                if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                    navigator.vibrate(30);
                }
                GUI.openDevModal();
                logEvent('detail', 'Opened dev lab modal from mobile secret gesture.');
            }, DEV_HOLD_MS);
        });

        const cancelDevSecretHold = function cancelDevSecretHold(event) {
            if (!STATE.devSecretHoldTimer) return;
            if (event && STATE.devSecretPointerId !== null && event.pointerId !== STATE.devSecretPointerId) return;
            window.clearTimeout(STATE.devSecretHoldTimer);
            STATE.devSecretHoldTimer = null;
            STATE.devSecretPointerId = null;
            STATE.devSecretPointerStartX = null;
            STATE.devSecretPointerStartY = null;
        };

        UI.brandLogo.addEventListener('pointermove', (event) => {
            if (!STATE.devSecretHoldTimer) return;
            if (event.pointerId !== STATE.devSecretPointerId) return;
            const deltaX = Math.abs(Number(event.clientX) - Number(STATE.devSecretPointerStartX));
            const deltaY = Math.abs(Number(event.clientY) - Number(STATE.devSecretPointerStartY));
            if (deltaX > DEV_MOVE_PX || deltaY > DEV_MOVE_PX) {
                cancelDevSecretHold(event);
                GUI.resetDevSecretGesture();
            }
        });

        UI.brandLogo.addEventListener('pointerup', cancelDevSecretHold);
        UI.brandLogo.addEventListener('pointercancel', (event) => {
            cancelDevSecretHold(event);
            GUI.resetDevSecretGesture();
        });

        window.addEventListener('scroll', () => {
            if (STATE.devSecretHoldTimer) {
                cancelDevSecretHold();
                GUI.resetDevSecretGesture();
            }
        }, true);
    };

    GUI.isTypingTarget = function isTypingTarget(target) {
        if (!target) return false;
        const tagName = String(target.tagName || '').trim().toLowerCase();
        return tagName === 'input'
            || tagName === 'textarea'
            || tagName === 'select'
            || Boolean(target.isContentEditable);
    };

    GUI.runDevLog = async function runDevLog(level, message, payload = {}) {
        GUI.activateTopTab('log');
        await logEvent(level, message, Object.assign({
            source: 'dev-lab',
            timestamp: new Date().toISOString()
        }, payload));
    };

    GUI.runDevLogSuite = async function runDevLogSuite() {
        GUI.activateTopTab('log');
        const entries = [
            ['begin', 'Dev lab log suite started.', { suite: 'logging', stage: 'begin' }],
            ['log', 'Dev lab standard log sample.', { suite: 'logging', channel: 'default-output' }],
            ['trace', 'Dev lab trace sample.', { suite: 'logging', path: ['dev-modal', 'logging-lab', 'trace'] }],
            ['info', 'Dev lab info sample.', { suite: 'logging', source: 'browser-gui', mode: 'informational' }],
            ['detail', 'Dev lab detail sample.', { suite: 'logging', detail: { activeTab: 'log', selectedProject: STATE.selectedProject || '' } }],
            ['debug', 'Dev lab debug sample.', { suite: 'logging', debugFlags: ['ansi', 'structured-record', 'browser-gui'] }],
            ['notice', 'Dev lab notice sample.', { suite: 'logging', audience: 'developer' }],
            ['success', 'Dev lab success sample.', { suite: 'logging', operation: 'success-path', ok: true }],
            ['warn', 'Dev lab warning sample.', { suite: 'logging', warning: 'Synthetic caution state' }],
            ['error', 'Dev lab error sample.', { suite: 'logging', error: 'Synthetic failure state', recoverable: true }],
            ['fatal', 'Dev lab fatal sample.', { suite: 'logging', error: 'Synthetic fatal state', exitsProcess: false, browserFrontendOnly: true }],
            ['init', 'Dev lab init sample.', { suite: 'logging', subsystem: 'browser-gui', stage: 'init' }],
            ['shutdown', 'Dev lab shutdown sample.', { suite: 'logging', subsystem: 'browser-gui', stage: 'shutdown' }],
            ['end', 'Dev lab log suite finished.', { suite: 'logging', stage: 'end' }]
        ];

        for (const [level, message, payload] of entries) {
            await logEvent(level, message, payload);
        }
    };

    GUI.refreshNetworkSettingsFromServer = async function refreshNetworkSettingsFromServer() {
        const settingsPanel = GUI.getDropdownPanel(UI.settingsMenu);
        if (GUI.isDropdownOpen(UI.settingsMenu) && settingsPanel) {
            settingsPanel.dataset.positioning = 'true';
            GUI.stopDropdownPositionObservation(UI.settingsMenu);
        }

        const payload = await api('/api/network-info');
        const guiConfig = payload && payload.guiConfig ? payload.guiConfig : {};
        const network = payload && payload.network ? payload.network : {};

        GUI.cacheGuiConfig(guiConfig);
        STATE.bootstrap = STATE.bootstrap || {};
        STATE.bootstrap.guiConfig = guiConfig;
        STATE.bootstrap.network = network;
        GUI.renderNetworkSettings(guiConfig, network);
        if (GUI.isDropdownOpen(UI.settingsMenu)) {
            GUI.scheduleDropdownPanelPosition(UI.settingsMenu, {
                reveal: true,
                startObservation: true
            });
        }

        return payload;
    };

    GUI.archiveRecentProjectsForDev = async function archiveRecentProjectsForDev() {
        const payload = await api('/api/dev/recents/archive', {
            method: 'POST',
            body: {}
        });
        const guiConfig = payload && payload.guiConfig ? payload.guiConfig : {};
        GUI.cacheGuiConfig(guiConfig);
        GUI.applyLogPreferenceState(guiConfig);
        GUI.renderProjectInput(guiConfig, STATE.selectedProject || '');
        return payload;
    };

    GUI.restoreRecentProjectsForDev = async function restoreRecentProjectsForDev() {
        const payload = await api('/api/dev/recents/restore', {
            method: 'POST',
            body: {}
        });
        const guiConfig = payload && payload.guiConfig ? payload.guiConfig : {};
        GUI.cacheGuiConfig(guiConfig);
        GUI.applyLogPreferenceState(guiConfig);
        GUI.renderProjectInput(guiConfig, STATE.selectedProject || '');
        return payload;
    };

    GUI.renderNetworkSettings = function renderNetworkSettings(guiConfig, network) {
        const networkPublicEnabled = Boolean(guiConfig && guiConfig.network_public);
        const trustedLanEnabled = Boolean(guiConfig && guiConfig.network_trusted);
        const tokenControlsDisabled = !networkPublicEnabled || trustedLanEnabled;
        GUI.setCheckboxButtonState(UI.networkPublicToggle, networkPublicEnabled);
        GUI.setCheckboxButtonState(UI.networkTrustedToggle, trustedLanEnabled, {
            disabled: !networkPublicEnabled
        });
        UI.networkToken.value = String((guiConfig && guiConfig.network_token) || '');
        UI.networkToken.disabled = tokenControlsDisabled;
        UI.networkTokenRegenerate.disabled = tokenControlsDisabled;
        if (UI.networkToken.closest('.settings-field')) {
            UI.networkToken.closest('.settings-field').classList.toggle('is-disabled', tokenControlsDisabled);
        }
        UI.networkTokenRegenerate.classList.toggle('is-disabled', tokenControlsDisabled);
        UI.networkLocalUrl.value = String((network && network.localUrl) || 'http://127.0.0.1:3084');
        UI.networkLanUrl.value = String((network && network.lanUrl) || 'Unavailable');
        UI.networkLanUrl.disabled = !networkPublicEnabled || !String((network && network.lanUrl) || '').trim();
        UI.copyTriggers.forEach((button) => {
            const targetId = String(button.dataset.copyTarget || '').trim();
            const target = targetId ? document.getElementById(targetId) : null;
            const hasValue = Boolean(target && String(('value' in target ? target.value : target.textContent) || '').trim());
            button.disabled = !target || target.disabled || !hasValue;
            button.classList.toggle('is-disabled', button.disabled);
        });
        UI.networkNote.textContent = networkPublicEnabled
            ? 'LAN access is enabled. Host-binding changes restart the browser GUI server automatically.'
            : 'LAN access is currently disabled. Enable it to expose the browser GUI on your network. If the host binding changes, the server restarts automatically.';
    };

    GUI.activateTopTab = function activateTopTab(id) {
        GUI.captureLogScrollState();
        STATE.activeTopTab = id;
        UI.topTabs.forEach((tab) => {
            const isActive = tab.dataset.tab === id;
            tab.classList.toggle('is-active', isActive);
            tab.disabled = isActive;
            if (isActive) {
                tab.setAttribute('aria-current', 'page');
            } else {
                tab.removeAttribute('aria-current');
            }
        });
        Object.keys(UI.topPanels).forEach((key) => {
            UI.topPanels[key].classList.toggle('is-active', key === id);
        });
        if (id === 'log') {
            GUI.restoreLogScrollPosition();
            window.requestAnimationFrame(() => {
                GUI.restoreLogScrollPosition();
            });
        }
        if (id === 'config') {
            GUI.startConfigWatch();
        } else {
            GUI.stopConfigWatch();
        }
        if (id === 'wiki') {
            GUI.loadWikiPage(STATE.wikiPath || '/wiki', {
                silent: Boolean(STATE.wikiPage),
                log: Boolean(!STATE.wikiPage)
            }).catch((error) => {
                GUI.renderWikiError(String(error.message || error));
                logEvent('error', 'Wiki page load failed.', {
                    path: STATE.wikiPath || '/wiki',
                    message: String(error.message || error)
                });
            });
        }
        saveGuiPreference({ current_tab: id }).catch(() => {});
        logEvent('detail', 'Activated top tab.', { tab: id });
    };

    GUI.activateConfigMode = function activateConfigMode(mode) {
        STATE.configMode = mode;
        UI.configModeTabs.forEach((tab) => {
            const isActive = tab.dataset.mode === mode;
            tab.classList.toggle('is-active', isActive);
            tab.disabled = isActive;
            if (isActive) {
                tab.setAttribute('aria-current', 'page');
            } else {
                tab.removeAttribute('aria-current');
            }
        });
        GUI.renderConfigIntroCopy();
        GUI.syncConfigRawVisibility();
        saveGuiPreference({ config_mode: mode }).catch(() => {});
        logEvent('detail', 'Activated config mode.', { mode });
    };

    GUI.renderConfigIntroCopy = function renderConfigIntroCopy() {
        if (!UI.configIntroCopy) return;
        let introText = 'Edit the selected project\'s config.json here.';
        if (STATE.configMode === 'log') {
            introText = 'Edit the tool-level config/log.json here.';
        }
        UI.configIntroCopy.innerHTML = `${GUI.escapeHtml(introText)}<br>Hold Ctrl, Shift, or Alt while toggling a section to expand or collapse that section and all descendants.`;
    };

    GUI.isProjectConfigMode = function isProjectConfigMode() {
        return String(STATE.configMode || '').trim().toLowerCase() === 'project';
    };

    GUI.syncConfigRawVisibility = function syncConfigRawVisibility() {
        const showRaw = GUI.isProjectConfigMode();
        if (UI.configRaw) {
            UI.configRaw.hidden = !showRaw;
        }
        if (UI.configSchemaRaw) {
            UI.configSchemaRaw.hidden = !showRaw;
        }
        if (!showRaw) {
            if (UI.configRaw) {
                UI.configRaw.open = false;
            }
            if (UI.configSchemaRaw) {
                UI.configSchemaRaw.open = false;
            }
        }
    };

    GUI.resetProjectSchemaEditor = function resetProjectSchemaEditor() {
        if (!UI.configSchemaEditor) return;
        UI.configSchemaEditor.value = '{\n    "keys": []\n}\n';
        GUI.syncProjectSchemaEditorPresentation();
        GUI.syncProjectSchemaEditorScroll();
    };

    GUI.getProjectSchemaDraft = function getProjectSchemaDraft() {
        if (!GUI.isProjectConfigMode()) return undefined;
        return parseProjectSchemaEditor();
    };

    GUI.applyProjectSchemaModel = function applyProjectSchemaModel(model) {
        if (!model || typeof model !== 'object') return;
        const projectSchemaExists = Boolean(model.projectSchemaExists);
        model.projectSchema = (
            model.projectSchema
            && typeof model.projectSchema === 'object'
            && !Array.isArray(model.projectSchema)
        ) ? clone(model.projectSchema) : (projectSchemaExists ? {} : { keys: [] });
    };

    GUI.syncProjectSchemaFromModel = function syncProjectSchemaFromModel(model) {
        GUI.applyProjectSchemaModel(model);
        if (GUI.isProjectConfigMode()) {
            syncProjectSchemaEditor();
        } else {
            GUI.resetProjectSchemaEditor();
        }
    };

    GUI.setConfigDirty = function setConfigDirty(nextValue = true) {
        STATE.configDirty = Boolean(nextValue);
    };

    GUI.syncConfigEditorsAfterNoProject = function syncConfigEditorsAfterNoProject() {
        UI.configEditor.value = '';
        GUI.syncRawEditorPresentation();
        GUI.syncRawEditorScroll();
        GUI.resetProjectSchemaEditor();
    };

    GUI.syncConfigEditorsFromState = function syncConfigEditorsFromState() {
        syncRawEditor();
        GUI.syncProjectSchemaFromModel(STATE.configModel);
    };

    GUI.handleProjectSchemaEditorInput = function handleProjectSchemaEditorInput() {
        GUI.setConfigDirty(true);
        GUI.syncProjectSchemaEditorPresentation();
        GUI.syncProjectSchemaEditorScroll();
    };

    GUI.handleProjectSchemaEditorChange = function handleProjectSchemaEditorChange() {
        try {
            const schemaDocument = GUI.getProjectSchemaDraft();
            if (STATE.configModel && typeof STATE.configModel === 'object') {
                STATE.configModel.projectSchema = clone(schemaDocument || {});
            }
            GUI.setConfigDirty(true);
            logEvent('detail', 'Project schema raw JSON updated.', {
                mode: STATE.configMode
            });
        } catch (error) {
            logEvent('warn', 'Project schema raw JSON parse failed.', {
                mode: STATE.configMode,
                message: String(error.message || error)
            });
        }
    };

    GUI.handleProjectSchemaEditorScroll = function handleProjectSchemaEditorScroll() {
        GUI.syncProjectSchemaEditorScroll();
    };

    GUI.renderConfigMeta = function renderConfigMeta(pathText, mtimeMs, options = {}) {
        const showSchemaMeta = GUI.isProjectConfigMode();
        const schemaPath = String(options.schemaPath || '').trim();
        const schemaExists = Boolean(options.schemaExists);
        const schemaValue = schemaPath
            ? (schemaExists ? schemaPath : `${schemaPath} (not created yet)`)
            : 'No schema file for this config.';
        if (UI.configPath) {
            UI.configPath.innerHTML = [
                `
                    <div class="config-meta__line">
                        <span class="config-meta__label gui-icon-label font-icon--interface--file">Path:</span>
                        <span class="config-meta__value config-primitive__tag config-primitive__tag--path">${escapeHtml(String(pathText || 'No config selected'))}</span>
                    </div>
                `,
                showSchemaMeta ? `
                    <div class="config-meta__line">
                        <span class="config-meta__label gui-icon-label font-icon--interface--tag">Schema:</span>
                        <span class="config-meta__value config-primitive__tag config-primitive__tag--path${schemaExists ? '' : ' config-meta__value--missing'}">${escapeHtml(schemaValue)}</span>
                    </div>
                ` : ''
            ].join('');
        }
        if (UI.configMtime) {
            const formattedMtime = mtimeMs ? formatMtime(mtimeMs) : '';
            UI.configMtime.innerHTML = formattedMtime
                ? `<span class="config-meta__label gui-icon-label font-icon--interface--clock">Modified:</span> <span class="config-meta__value config-primitive__tag">${escapeHtml(formattedMtime)}</span>`
                : '<span class="config-meta__label gui-icon-label font-icon--interface--clock">Modified:</span>';
        }
    };

    GUI.loadConfigModel = async function loadConfigModel(options = {}) {
        const silent = Boolean(options && options.silent);
        if (STATE.configSectionStateSavePromise) {
        try {
            await STATE.configSectionStateSavePromise;
        } catch {}
        }
        GUI.syncConfigRawVisibility();
        if (GUI.isProjectConfigMode() && !STATE.selectedProject) {
            GUI.renderConfigMeta('No config selected', 0, {
                schemaPath: '',
                schemaExists: false
            });
            GUI.renderConfigIntroCopy();
            UI.configForm.replaceChildren();
            GUI.syncConfigEditorsAfterNoProject();
            GUI.setConfigDirty(false);
            STATE.configWatchSignature = '';
            STATE.configWatchWarnedSignature = '';
            if (!silent) {
                logEvent('detail', 'Skipped project config load because no project is selected.', {
                    mode: STATE.configMode
                });
            }
            return;
        }

        if (!silent) {
            await logEvent('begin', `Loading ${STATE.configMode} config...`, {
                mode: STATE.configMode,
                dir: STATE.selectedProject || ''
            });
        }
        const params = new URLSearchParams({ mode: STATE.configMode });
        if (STATE.selectedProject) params.set('dir', STATE.selectedProject);

        const model = await api(`/api/config-model?${params.toString()}`);
        GUI.applyProjectSchemaModel(model);
        STATE.configModel = model;
        STATE.configData = clone(model.mergedConfig || {});
        STATE.configSectionState = model && model.uiCache && model.uiCache.config_sections
            ? clone(model.uiCache.config_sections)
            : {};
        STATE.configUnionBranchMemory = {};
        STATE.configCustomDraft = null;
        GUI.setConfigDirty(false);
        STATE.configWatchSignature = GUI.getConfigWatchSignature(model);
        STATE.configWatchWarnedSignature = '';
        GUI.renderConfigMeta(model.path || '', model.mtimeMs, {
            schemaPath: model.schemaPath || '',
            schemaExists: Boolean(model.schemaExists)
        });
        GUI.renderConfigIntroCopy();
        GUI.syncConfigEditorsFromState();
        GUI.renderConfigForm();
        if (!silent) {
            logEvent('success', 'Loaded config model.', {
                mode: STATE.configMode,
                path: model.path,
                schemaEntryCount: Array.isArray(model.schemaEntries) ? model.schemaEntries.length : 0
            });
        }
    };

    GUI.selectProject = async function selectProject(dir) {
        const requested = String(dir || '').trim();
        if (!requested) {
            STATE.selectedProject = '';
            GUI.stopProjectWatch();
            STATE.projectWatchSignature = '';
            GUI.renderProjectInput(STATE.bootstrap.guiConfig || {}, '');
            GUI.applyTasksPayload((STATE.bootstrap && STATE.bootstrap.tasksByCategory) || [], { notice: false });
            GUI.renderVersion({
                version: 'v0.0.0',
                relation: 'missing',
                status: 'No project selected',
                detail: 'Select a valid project directory containing config.json and in/.'
            });
            await GUI.loadConfigModel().catch(() => {});
            logEvent('info', 'Cleared selected project.');
            return;
        }

        const payload = await api('/api/select-project', {
            method: 'POST',
            body: { dir: requested }
        });

        STATE.bootstrap.guiConfig = payload.guiConfig;
        STATE.selectedProject = payload.selectedProject;
        GUI.renderProjectInput(payload.guiConfig, payload.selectedProject);
        GUI.applyTasksPayload(payload.tasksByCategory || []);
        try {
            const projectVersion = await api(`/api/project-info?dir=${encodeURIComponent(payload.selectedProject)}`);
            GUI.renderVersion(projectVersion);
            STATE.projectWatchSignature = GUI.getProjectWatchSignature(projectVersion);
        } catch (error) {
            GUI.renderVersion(payload.projectVersion || {});
            STATE.projectWatchSignature = GUI.getProjectWatchSignature(payload.projectVersion || {});
            logEvent('warn', 'Explicit project version refresh failed after selection.', {
                selectedProject: payload.selectedProject,
                message: String(error.message || error)
            });
        }
        GUI.startProjectWatch();
        await GUI.loadConfigModel();
        logEvent('success', 'Selected project.', {
            requested,
            selectedProject: payload.selectedProject
        });
    };

    GUI.bindEvents = function bindEvents() {
        UI.topTabs.forEach((tab) => {
            tab.addEventListener('click', () => GUI.activateTopTab(tab.dataset.tab));
        });

        const handleWikiNavigation = async (event) => {
            const anchor = event.target.closest('a[href]');
            if (!anchor) return;
            const navigation = GUI.resolveWikiNavigation(anchor.getAttribute('href'));
            if (!navigation) return;
            event.preventDefault();
            try {
                if (navigation.type === 'anchor') {
                    GUI.scrollWikiAnchorIntoView(navigation.hash);
                    return;
                }
                await GUI.loadWikiPage(navigation.path, {
                    hash: navigation.hash || ''
                });
            } catch (error) {
                GUI.renderWikiError(String(error.message || error));
                logEvent('error', 'Wiki navigation failed.', {
                    href: anchor.getAttribute('href') || '',
                    message: String(error.message || error)
                });
            }
        };

        if (UI.wikiToc) {
            UI.wikiToc.addEventListener('click', (event) => {
                if (!(event.ctrlKey || event.shiftKey || event.altKey)) return;
                const target = event.target;
                if (!(target instanceof Element)) return;
                const summary = target.closest('summary');
                if (!(summary instanceof HTMLElement)) return;
                const detailNode = summary.parentElement;
                if (!(detailNode instanceof HTMLDetailsElement)) return;
                event.preventDefault();
                event.stopPropagation();
                GUI.setWikiTocBranchExpanded(detailNode, !detailNode.open, true);
            }, true);
        }

        [UI.wikiBreadcrumbs, UI.wikiToc, UI.wikiContent].forEach((node) => {
            if (!node) return;
            node.addEventListener('click', (event) => {
                handleWikiNavigation(event).catch(() => {});
            });
        });

        UI.themeToggle.addEventListener('click', () => {
            const nextTheme = STATE.theme === 'dark' ? 'light' : 'dark';
            GUI.applyTheme(nextTheme);
            saveThemePreference(nextTheme)
                .then(() => {
                    logEvent('info', 'Toggled interface theme.', { theme: STATE.theme });
                })
                .catch((error) => {
                    logEvent('error', 'Saving interface theme failed.', {
                        theme: nextTheme,
                        message: String(error.message || error)
                    });
                });
        });

        UI.buttonTitlesToggle.addEventListener('click', () => {
            const nextValue = !STATE.showButtonTitles;
            GUI.applyButtonTitlesSetting(nextValue);
            saveGuiPreference({ show_button_titles: nextValue })
                .then(() => {
                    logEvent('info', 'Toggled icon-button titles.', { showButtonTitles: STATE.showButtonTitles });
                })
                .catch((error) => {
                    logEvent('error', 'Saving icon-button title preference failed.', {
                        showButtonTitles: nextValue,
                        message: String(error.message || error)
                    });
                });
        });

        const applyProjectPath = async () => {
            try {
                await GUI.selectProject(UI.projectPath.value);
            } catch (error) {
                logEvent('error', 'Project selection failed from path input.', {
                    path: UI.projectPath.value,
                    message: String(error.message || error)
                });
            }
        };

        UI.projectPath.addEventListener('change', applyProjectPath);
        UI.projectPath.addEventListener('input', () => {
            GUI.renderProjectSuggestions(UI.projectPath.value);
        });
        UI.projectPath.addEventListener('keydown', async (event) => {
            if (event.key === 'Escape') {
                GUI.hideProjectSuggestions();
                return;
            }
            if (event.key !== 'Enter') return;
            event.preventDefault();
            GUI.hideProjectSuggestions();
            await applyProjectPath();
        });

        UI.projectOpen.addEventListener('click', async () => {
            try {
                await api('/api/open/explorer', {
                    method: 'POST',
                    body: { dir: STATE.selectedProject || UI.projectPath.value }
                });
                logEvent('success', 'Opened project directory.', {
                    dir: STATE.selectedProject || UI.projectPath.value
                });
            } catch (error) {
                logEvent('error', 'Open-project-directory failed.', {
                    dir: STATE.selectedProject || UI.projectPath.value,
                    message: String(error.message || error)
                });
            }
        });

        UI.terminalRoot.addEventListener('click', async () => {
            try {
                await api('/api/open/terminal-root', { method: 'POST' });
                logEvent('success', 'Opened compiler-root terminal.');
            } catch (error) {
                logEvent('error', 'Open-terminal-root failed.', {
                    message: String(error.message || error)
                });
            }
        });

        UI.configModeTabs.forEach((tab) => {
            tab.addEventListener('click', async () => {
                try {
                    GUI.activateConfigMode(tab.dataset.mode);
                    await GUI.loadConfigModel();
                } catch (error) {
                    logEvent('error', 'Config mode switch failed.', {
                        mode: tab.dataset.mode,
                        message: String(error.message || error)
                    });
                }
            });
        });

        UI.configReload.addEventListener('click', async () => {
            GUI.spinButtonIconOnce(UI.configReload);
            try {
                await GUI.loadConfigModel();
            } catch (error) {
                logEvent('error', 'Config reload failed.', {
                    mode: STATE.configMode,
                    message: String(error.message || error)
                });
            }
        });

        UI.configSave.addEventListener('click', async () => {
            try {
                STATE.configData = parseJsonEditor();
                if (GUI.isProjectConfigMode()) {
                    GUI.applyProjectSchemaModel(STATE.configModel || {});
                    STATE.configModel.projectSchema = clone(GUI.getProjectSchemaDraft() || {});
                }
                const result = await api('/api/config', {
                    method: 'POST',
                    body: {
                        mode: STATE.configMode,
                        dir: STATE.selectedProject,
                        data: STATE.configData,
                        projectSchema: STATE.configMode === 'project'
                            ? ((STATE.configModel && STATE.configModel.projectSchema) || {})
                            : undefined
                    }
                });
                GUI.applyProjectSchemaModel(result.model);
                STATE.configModel = result.model;
                STATE.configData = clone(result.model.mergedConfig || {});
                if (STATE.configModel && typeof STATE.configModel === 'object') {
                    STATE.configModel.uiCache = Object.assign({}, STATE.configModel.uiCache || {}, {
                        version: 1,
                        config_sections: clone(STATE.configSectionState || {})
                    });
                }
                GUI.setConfigDirty(false);
                STATE.configWatchSignature = GUI.getConfigWatchSignature(result.model);
                STATE.configWatchWarnedSignature = '';
                GUI.renderConfigMeta(result.path || '', result.mtimeMs, {
                    schemaPath: result.model && result.model.schemaPath || '',
                    schemaExists: Boolean(result.model && result.model.schemaExists)
                });
                GUI.syncConfigEditorsFromState();
                GUI.renderConfigForm();
                logEvent('success', 'Saved config.', {
                    mode: STATE.configMode,
                    path: result.path || UI.configPath.textContent
                });
            } catch (error) {
                logEvent('error', 'Config save failed.', {
                    mode: STATE.configMode,
                    message: String(error.message || error)
                });
            }
        });

        UI.configEditor.addEventListener('input', () => {
            GUI.setConfigDirty(true);
            GUI.syncRawEditorPresentation();
            GUI.syncRawEditorScroll();
        });

        UI.configEditor.addEventListener('change', () => {
            try {
                STATE.configData = parseJsonEditor();
                GUI.setConfigDirty(true);
                GUI.renderConfigForm();
                logEvent('detail', 'Structured config editor synced from raw JSON.', {
                    mode: STATE.configMode
                });
            } catch (error) {
                logEvent('warn', 'Raw JSON parse failed during structured sync.', {
                    mode: STATE.configMode,
                    message: String(error.message || error)
                });
            }
        });

        UI.configEditor.addEventListener('scroll', () => {
            GUI.syncRawEditorScroll();
        });

        if (UI.configSchemaEditor) {
            UI.configSchemaEditor.addEventListener('input', GUI.handleProjectSchemaEditorInput);
            UI.configSchemaEditor.addEventListener('change', GUI.handleProjectSchemaEditorChange);
            UI.configSchemaEditor.addEventListener('scroll', GUI.handleProjectSchemaEditorScroll);
        }

        if (UI.logEntries) {
            UI.logEntries.addEventListener('scroll', () => {
                STATE.logScrollTop = UI.logEntries.scrollTop;
                STATE.logStickToBottom = GUI.isLogNearBottom();
            });
        }

        GUI.applyLogOptionsExpanded(STATE.logOptionsExpanded);

        if (UI.logOptionsToggle) {
            UI.logOptionsToggle.addEventListener('click', () => {
                GUI.applyLogOptionsExpanded(!STATE.logOptionsExpanded);
                GUI.queueLogPreferenceSave();
            });
        }

        if (Array.isArray(UI.logFilterButtons)) {
            UI.logFilterButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const level = String(button.getAttribute('data-log-filter') || '').trim().toLowerCase();
                    if (!level) return;
                    STATE.logLevelVisibility[level] = !STATE.logLevelVisibility[level];
                    GUI.syncLogFilterInputs();
                    GUI.renderLogEntries();
                    GUI.queueLogPreferenceSave();
                });
            });
        }

        if (Array.isArray(UI.logFilterGroupButtons)) {
            UI.logFilterGroupButtons.forEach((button) => {
                button.addEventListener('click', () => {
                    const groupName = String(button.getAttribute('data-log-filter-group') || '').trim().toLowerCase();
                    if (!groupName) return;

                    const currentState = GUI.getLogFilterGroupState(groupName);
                    GUI.setLogFilterGroupState(groupName, currentState === 'off');
                    GUI.syncLogFilterInputs();
                    GUI.renderLogEntries();
                    GUI.queueLogPreferenceSave();
                });
            });
        }

    if (UI.logSearch) {
        UI.logSearch.addEventListener('input', () => {
            STATE.logSearchQuery = String(UI.logSearch.value || '').trim();
            GUI.renderLogEntries();
            GUI.queueLogPreferenceSave();
        });
    }

        UI.logClear.addEventListener('click', () => {
            GUI.clearLogEntries();
            logEvent('detail', 'Cleared browser GUI log entries.');
        });

        UI.logCopy.addEventListener('click', async () => {
            const logText = GUI.getLogExportText();
            if (!logText) {
                logEvent('warn', 'Copy-log request ignored because the log is empty.');
                return;
            }

            try {
                await navigator.clipboard.writeText(logText);
                GUI.flashButtonLabel(UI.logCopy, 'Copy', 'Copied');
                logEvent('detail', 'Copied browser GUI log entries.', {
                    entryCount: GUI.getVisibleLogEntries().length
                });
            } catch (error) {
                GUI.flashButtonLabel(UI.logCopy, 'Copy', 'Failed');
                logEvent('error', 'Copying browser GUI log entries failed.', {
                    message: String(error.message || error)
                });
            }
        });

        UI.authSubmit.addEventListener('click', async () => {
            try {
                await api('/api/auth', {
                    method: 'POST',
                    body: { token: UI.authToken.value }
                });
                GUI.hideAuthOverlay();
                setLoading('Unlocking browser GUI...', true);
                const bootstrapData = await GUI.loadBootstrapData();
                logEvent('success', 'Browser GUI authenticated and bootstrapped.', {
                    selectedProject: STATE.selectedProject || '',
                    taskCategoryCount: Array.isArray(bootstrapData.tasksByCategory) ? bootstrapData.tasksByCategory.length : 0
                });
            } catch (error) {
                UI.authError.hidden = false;
                UI.authError.textContent = String(error.message || error);
                logEvent('warn', 'GUI LAN authentication failed.', {
                    message: String(error.message || error)
                });
            } finally {
                setLoading('', false);
            }
        });

        UI.authToken.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter') return;
            event.preventDefault();
            UI.authSubmit.click();
        });

        UI.networkPublicToggle.addEventListener('click', async () => {
            const nextValue = UI.networkPublicToggle.getAttribute('aria-pressed') !== 'true';
            try {
                const keepSettingsOpen = GUI.isDropdownOpen(UI.settingsMenu) ? UI.settingsMenu : null;
                const result = await saveGuiPreference({ network_public: nextValue });
                const guiConfig = (result && result.guiConfig) || (STATE.bootstrap && STATE.bootstrap.guiConfig) || {};
                const network = (result && result.network) || (STATE.bootstrap && STATE.bootstrap.network) || {};
                GUI.renderNetworkSettings(guiConfig, network);
                if (STATE.bootstrap) {
                    STATE.bootstrap.network = network;
                }
                logEvent('info', 'Updated LAN access setting.', { networkPublic: Boolean(guiConfig.network_public) });
                if (result && result.restartScheduled) {
                    await GUI.restartServerAndReconnect({ keepDropdown: keepSettingsOpen });
                }
            } catch (error) {
                logEvent('error', 'Updating LAN access setting failed.', { message: String(error.message || error) });
            }
        });

        UI.networkTrustedToggle.addEventListener('click', async () => {
            if (UI.networkTrustedToggle.disabled) return;
            const nextValue = UI.networkTrustedToggle.getAttribute('aria-pressed') !== 'true';
            try {
                const result = await saveGuiPreference({ network_trusted: nextValue });
                const guiConfig = (result && result.guiConfig) || (STATE.bootstrap && STATE.bootstrap.guiConfig) || {};
                const network = (result && result.network) || (STATE.bootstrap && STATE.bootstrap.network) || {};
                GUI.renderNetworkSettings(guiConfig, network);
                if (STATE.bootstrap) {
                    STATE.bootstrap.network = network;
                }
                logEvent('info', 'Updated trusted LAN setting.', { networkTrusted: Boolean(guiConfig.network_trusted) });
            } catch (error) {
                logEvent('error', 'Updating trusted LAN setting failed.', { message: String(error.message || error) });
            }
        });

        UI.networkTokenRegenerate.addEventListener('click', async () => {
            try {
                const result = await saveGuiPreference({ network_token: '' });
                const guiConfig = (result && result.guiConfig) || (STATE.bootstrap && STATE.bootstrap.guiConfig) || {};
                const network = (result && result.network) || (STATE.bootstrap && STATE.bootstrap.network) || {};
                GUI.renderNetworkSettings(guiConfig, network);
                if (STATE.bootstrap) {
                    STATE.bootstrap.network = network;
                }
                logEvent('success', 'Regenerated LAN token.');
            } catch (error) {
                logEvent('error', 'LAN token regeneration failed.', { message: String(error.message || error) });
            }
        });

        UI.newProjectToggle.addEventListener('click', () => {
            GUI.openModal(UI.newProjectModal);
            logEvent('detail', 'Opened new project modal.');
        });

        if (UI.licenseSoftwareToggle) {
            UI.licenseSoftwareToggle.addEventListener('click', () => {
                GUI.openModal(UI.licenseSoftwareModal);
                logEvent('detail', 'Opened compiler license modal.');
            });
        }

        UI.newProjectClose.addEventListener('click', () => {
            logEvent('detail', 'Closed new project modal from close button.');
        });

        UI.newProjectModal.querySelector('.modal__scrim').addEventListener('click', () => {
            logEvent('detail', 'Closed new project modal from scrim.');
        });

        if (UI.licenseSoftwareClose) {
            UI.licenseSoftwareClose.addEventListener('click', () => {
                logEvent('detail', 'Closed compiler license modal from close button.');
            });
        }

        if (UI.licenseSoftwareModal) {
            UI.licenseSoftwareModal.querySelector('.modal__scrim').addEventListener('click', () => {
                logEvent('detail', 'Closed compiler license modal from scrim.');
            });
        }

        GUI.setCheckboxButtonState(UI.newProjectForce, false);
        UI.newProjectForce.addEventListener('click', () => {
            GUI.setCheckboxButtonState(UI.newProjectForce, !GUI.isCheckboxButtonChecked(UI.newProjectForce));
        });

        UI.newProjectCreate.addEventListener('click', async () => {
            try {
                const dir = String(UI.newProjectDir.value || '').trim();
                if (!dir) {
                    throw new Error('New project location is required.');
                }

                await api('/api/project/new', {
                    method: 'POST',
                    body: {
                        dir,
                        template: UI.newProjectTemplate.value,
                        force: GUI.isCheckboxButtonChecked(UI.newProjectForce)
                    }
                });

                GUI.closeModal(UI.newProjectModal);
                logEvent('success', 'Launched new project flow.', {
                    dir,
                    template: UI.newProjectTemplate.value,
                    force: GUI.isCheckboxButtonChecked(UI.newProjectForce)
                });
            } catch (error) {
                logEvent('error', 'New project flow failed.', {
                    dir: String(UI.newProjectDir.value || '').trim(),
                    template: UI.newProjectTemplate.value,
                    message: String(error.message || error)
                });
            }
        });

        if (UI.devModalClose) {
            UI.devModalClose.addEventListener('click', () => {
                logEvent('detail', 'Closed dev lab modal from close button.');
            });
        }

        if (UI.devModal) {
            UI.devModal.querySelector('.modal__scrim').addEventListener('click', () => {
                logEvent('detail', 'Closed dev lab modal from scrim.');
            });
        }

        if (UI.devOpenTaskSurface) {
            UI.devOpenTaskSurface.addEventListener('click', () => {
                GUI.activateTopTab('task');
                logEvent('detail', 'Opened task surface from dev lab.');
            });
        }

        if (UI.devOpenProjectConfigSurface) {
            UI.devOpenProjectConfigSurface.addEventListener('click', async () => {
                GUI.activateTopTab('config');
                GUI.activateConfigMode('project');
                await GUI.loadConfigModel().catch(() => {});
                logEvent('detail', 'Opened project config surface from dev lab.');
            });
        }

        if (UI.devOpenLogConfigSurface) {
            UI.devOpenLogConfigSurface.addEventListener('click', async () => {
                GUI.activateTopTab('config');
                GUI.activateConfigMode('log');
                await GUI.loadConfigModel().catch(() => {});
                logEvent('detail', 'Opened log config surface from dev lab.');
            });
        }

        if (UI.devOpenLogSurface) {
            UI.devOpenLogSurface.addEventListener('click', () => {
                GUI.activateTopTab('log');
                logEvent('detail', 'Opened log surface from dev lab.');
            });
        }

        if (UI.devOpenNewProjectSurface) {
            UI.devOpenNewProjectSurface.addEventListener('click', () => {
                GUI.openModal(UI.newProjectModal);
                logEvent('detail', 'Opened new project modal from dev lab.');
            });
        }

        if (UI.devReloadWikiSurface) {
            UI.devReloadWikiSurface.addEventListener('click', async () => {
                const path = STATE.wikiPath || '/wiki';
                GUI.activateTopTab('wiki');
                try {
                    await GUI.loadWikiPage(path, {
                        silent: false,
                        log: false,
                        persist: false
                    });
                    logEvent('detail', 'Reloaded wiki surface from dev lab.', {
                        path
                    });
                } catch (error) {
                    logEvent('error', 'Reloading wiki surface from dev lab failed.', {
                        path,
                        message: String(error.message || error)
                    });
                }
            });
        }

        if (UI.devArchiveRecents) {
            UI.devArchiveRecents.addEventListener('click', async () => {
                try {
                    const payload = await GUI.archiveRecentProjectsForDev();
                    logEvent('success', 'Archived recent projects into dev stash.', {
                        archivedCount: Number(payload && payload.archivedCount) || 0,
                        stashCount: Number(payload && payload.stashCount) || 0
                    });
                } catch (error) {
                    logEvent('error', 'Archiving recent projects into dev stash failed.', {
                        message: String(error.message || error)
                    });
                }
            });
        }

        if (UI.devRestoreRecents) {
            UI.devRestoreRecents.addEventListener('click', async () => {
                try {
                    const payload = await GUI.restoreRecentProjectsForDev();
                    logEvent('success', 'Restored recent projects from dev stash.', {
                        restoredCount: Number(payload && payload.restoredCount) || 0,
                        recentCount: Number(payload && payload.recentCount) || 0
                    });
                } catch (error) {
                    logEvent('error', 'Restoring recent projects from dev stash failed.', {
                        message: String(error.message || error)
                    });
                }
            });
        }

        if (UI.devLogSuite) {
            UI.devLogSuite.addEventListener('click', async () => {
                await GUI.runDevLogSuite();
            });
        }

        if (UI.devLogClear) {
            UI.devLogClear.addEventListener('click', () => {
                GUI.clearLogEntries();
                logEvent('detail', 'Cleared browser GUI log entries from logging lab.');
            });
        }

        document.addEventListener('keydown', (event) => {
            if (!(event.ctrlKey && event.altKey && event.shiftKey && String(event.key || '').toLowerCase() === 'd')) {
                return;
            }
            if (GUI.isTypingTarget(event.target)) {
                return;
            }
            event.preventDefault();
            if (GUI.isModalOpen(UI.devModal)) {
                GUI.closeModal(UI.devModal);
                logEvent('detail', 'Closed dev lab modal from keyboard shortcut.');
                return;
            }
            GUI.openDevModal();
        });

        GUI.bindDevSecretGesture();
        GUI.normalizeStaticDropdownSurfaces();
        GUI.bindDropdowns();
        GUI.bindCopyFields();
        GUI.bindTooltips();
        GUI.bindDirectoryBrowsers();
        GUI.bindModals();
        window.addEventListener('beforeunload', () => {
            GUI.stopConfigWatch();
        });
    };

    GUI.bootstrap = async function bootstrap() {
        GUI.initializeTheme();
        GUI.applyLogPreferenceState(GUI.getCachedGuiConfig());
        GUI.renderLogEntries();
        setLoading('Starting browser GUI...', true);
        await logEvent('begin', 'Loading browser GUI...', {
            selectedProject: STATE.selectedProject || '',
            phase: 'bootstrap'
        });

        try {
            const bootstrapData = await GUI.loadBootstrapData();
            logEvent('success', 'Browser GUI bootstrap complete.', {
                selectedProject: STATE.selectedProject || '',
                taskCategoryCount: Array.isArray(bootstrapData.tasksByCategory) ? bootstrapData.tasksByCategory.length : 0
            });
        } catch (error) {
            if (error && error.status === 401 && error.data && error.data.authRequired) {
                GUI.showAuthOverlay(error.data.auth || {}, String(error.message || 'Authentication required.'));
                logEvent('warn', 'LAN authentication required.', {
                    context: 'bootstrap'
                });
                return;
            }
            logEvent('error', 'Browser GUI bootstrap failed.', {
                message: String(error.message || error)
            });
        } finally {
            setLoading('', false);
        }
    };
})();
