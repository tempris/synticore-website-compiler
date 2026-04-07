(function () {
  var doc = document;
  var root = doc.documentElement;
  var body = doc.body;

  if (!root || !body) return;

  var DEV_PANEL_STATE_ROUTE = "/__synticore_dev_panel_state__";
  var PANEL_STORAGE_KEY = "synticore:browsersync:synticore-dev-panel-state";
  var SHARED_LOG_STORAGE_KEY = "synticore:browsersync:synticore-dev-panel-shared-log-state";
  var DEV_CONSOLE_EVENT_NAME = "synticore:dev-panel:console-entry";
  var DEV_CONSOLE_MAX_ENTRIES = 200;
  var MONTH_NAMES_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var MONTH_NAMES_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var WEEKDAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var WEEKDAY_NAMES_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  var PANEL_MARGIN = 12;
  var PANEL_HIDE_DRAG_THRESHOLD = 32;
  var FRAME_MS = 16.6667;
  var MIN_SPEED = 0.025;
  var WALL_CAPTURE_MIN_VX = 0.22;
  var MAX_SPEED = 2.2;
  var SIDE_FRICTION = 0.9;
  var SIDE_MAGNET_ACCEL = 0.0045;
  var SIDE_MAGNET_MAX_VX = 1.9;
  var SAMPLE_WINDOW_MS = 120;
  var RELEASE_IDLE_MS = 64;
  var SETTLE_MS = 220;
  var RESIZE_DEBOUNCE_MS = 120;
  var HIDE_Y_MOMENTUM_FACTOR = 0.85;
  var DEFAULT_LOG_TIMESTAMP_FORMAT = "iso";

  var defaultPersistedState = {
    grid: {
      size: "1",
      unit: "rem",
      color: "#60fa68",
      alpha: "0.25",
      anchorX: "center",
      anchorY: "top"
    },
    log: {
      filters: {
        log: true,
        info: true,
        warn: true,
        error: true
      },
      searchText: ""
    }
  };

  var defaultPanelState = {
    dockSide: "right",
    hidden: true,
    yProgress: 0,
    heatmap: false,
    gridEnabled: false,
    gridOptionsExpanded: false,
    consoleOptionsExpanded: false,
    activeTab: "tools"
  };

  var persistRequestId = 0;

  var clonePersistedState = function (value) {
    return JSON.parse(JSON.stringify(value));
  };

  var loadPanelState = function () {
    try {
      var value = window.localStorage.getItem(PANEL_STORAGE_KEY);
      if (!value) return clonePersistedState(defaultPanelState);
      var parsed = JSON.parse(value);
      return parsed && typeof parsed === "object"
        ? parsed
        : clonePersistedState(defaultPanelState);
    } catch (error) {
      return clonePersistedState(defaultPanelState);
    }
  };

  var savePanelState = function (snapshot) {
    try {
      window.localStorage.setItem(PANEL_STORAGE_KEY, JSON.stringify(snapshot));
    } catch (error) {
      return;
    }
  };

  var loadSharedLogState = function () {
    try {
      var value = window.localStorage.getItem(SHARED_LOG_STORAGE_KEY);
      if (!value) return clonePersistedState(defaultPersistedState.log);
      var parsed = JSON.parse(value);
      return parsed && typeof parsed === "object"
        ? parsed
        : clonePersistedState(defaultPersistedState.log);
    } catch (error) {
      return clonePersistedState(defaultPersistedState.log);
    }
  };

  var saveSharedLogState = function (snapshot) {
    try {
      window.localStorage.setItem(SHARED_LOG_STORAGE_KEY, JSON.stringify(snapshot));
    } catch (error) {
      return;
    }
  };

  var loadPersistedState = function () {
    if (typeof window.fetch !== "function") {
      return Promise.resolve(clonePersistedState(defaultPersistedState));
    }

    try {
      return window.fetch(DEV_PANEL_STATE_ROUTE, {
        credentials: "same-origin",
        cache: "no-store"
      }).then(function (response) {
        if (!response.ok) {
          throw new Error("Failed to load dev panel state");
        }

        return response.json();
      }).catch(function () {
        return clonePersistedState(defaultPersistedState);
      });
    } catch (error) {
      return Promise.resolve(clonePersistedState(defaultPersistedState));
    }
  };

  var savePersistedState = function (snapshot) {
    if (typeof window.fetch !== "function") {
      return Promise.resolve();
    }

    try {
      persistRequestId += 1;
      var requestId = persistRequestId;

      return window.fetch(DEV_PANEL_STATE_ROUTE, {
        method: "POST",
        credentials: "same-origin",
        keepalive: true,
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(snapshot)
      }).then(function () {
        if (requestId !== persistRequestId) {
          return;
        }
      }).catch(function () {
        return;
      });
    } catch (error) {
      return Promise.resolve();
    }
  };

  var readPersistedBool = function (value, fallback) {
    return typeof value === "boolean" ? value : fallback;
  };

  var readPersistedString = function (value, fallback) {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
  };

  var readPersistedNumber = function (value, fallback) {
    return typeof value === "number" && Number.isFinite(value) ? value : fallback;
  };

  var clampUnitInterval = function (value, fallback) {
    if (!Number.isFinite(value)) {
      return fallback;
    }

    return clamp(value, 0, 1);
  };

  var queueFrame = function (callback) {
    return window.requestAnimationFrame(function () {
      window.requestAnimationFrame(callback);
    });
  };

  var host = doc.querySelector("[data-synticore-dev-panel-host], [data-synticore-dev-panel]");
  if (!host) return;

  var getShadowStylesheetHref = function () {
    var currentScript = doc.currentScript;
    if (currentScript && typeof currentScript.src === "string" && currentScript.src) {
      return currentScript.src.replace(/\/js\/dev-overlay(?:\.min)?\.js(?:\?.*)?$/i, "/css/dev/dev-panel.min.css");
    }

    return "/__synticore_source__/project/browser/out/asset/css/dev/dev-panel.min.css";
  };

  var mountPanelInShadowRoot = function () {
    var sourceShell = host.matches("[data-synticore-dev-panel]")
      ? host
      : host.querySelector("[data-synticore-dev-panel]");

    if (!sourceShell) return null;

    var shadowRoot = host.shadowRoot || host.attachShadow({ mode: "open" });
    var shellClone = sourceShell.cloneNode(true);
    var hostReset = doc.createElement("style");
    var stylesheetLink = doc.createElement("link");
    var resolveStylesheetReady = function () {};
    var stylesheetReady = new Promise(function (resolve) {
      resolveStylesheetReady = resolve;
    });
    var revealShell = function () {
      shellClone.hidden = false;
      resolveStylesheetReady();
    };

    hostReset.textContent =
      ":host {" +
      " all: initial;" +
      " }" +
      ":host([hidden]) {" +
      " display: none;" +
      " }";

    stylesheetLink.rel = "stylesheet";
    stylesheetLink.href = getShadowStylesheetHref();
    stylesheetLink.addEventListener("load", revealShell, { once: true });
    stylesheetLink.addEventListener("error", revealShell, { once: true });
    shellClone.hidden = true;

    shadowRoot.replaceChildren(hostReset, stylesheetLink, shellClone);

    if (host.matches("[data-synticore-dev-panel]")) {
      host.className = "synticore-dev-shadow-host synticore-dev-heatmap-exclude";
      host.removeAttribute("data-synticore-dev-panel");
      host.setAttribute("data-synticore-dev-panel-host", "");
    }

    host.replaceChildren();

    return {
      shell: shadowRoot.querySelector("[data-synticore-dev-panel]"),
      stylesheetReady: stylesheetReady
    };
  };

  var mountedPanel = mountPanelInShadowRoot();
  if (!mountedPanel || !mountedPanel.shell) return;
  var shell = mountedPanel.shell;
  var waitForShadowStylesheet = mountedPanel.stylesheetReady || Promise.resolve();
  shell.setAttribute("data-synticore-dev-state", "initializing");

  var panel = shell.querySelector(".synticore-dev-panel");
  var dockToggle = shell.querySelector(".synticore-dev-panel__dock-toggle");
  var header = shell.querySelector(".synticore-dev-panel__header");
  var tabButtons = Array.prototype.slice.call(shell.querySelectorAll("[data-synticore-dev-tab]"));
  var tabViews = Array.prototype.slice.call(shell.querySelectorAll("[data-synticore-dev-view]"));
  var checkbox = shell.querySelector(".synticore-dev-panel__toggle input");
  var gridToggle = shell.querySelector("[data-synticore-grid-toggle]");
  var gridSection = shell.querySelector("[data-synticore-grid-section]");
  var gridOptionsToggle = shell.querySelector("[data-synticore-grid-options-toggle]");
  var gridOptions = shell.querySelector("[data-synticore-grid-options]");
  var consoleSection = shell.querySelector("[data-synticore-console-section]");
  var consoleOptionsToggle = shell.querySelector("[data-synticore-console-options-toggle]");
  var consoleOptions = shell.querySelector("[data-synticore-console-options]");
  var gridSizeInput = shell.querySelector("[data-synticore-grid-size]");
  var gridUnitSelect = shell.querySelector("[data-synticore-grid-unit]");
  var gridColorInput = shell.querySelector("[data-synticore-grid-color]");
  var gridAlphaInput = shell.querySelector("[data-synticore-grid-alpha]");
  var gridAnchorXSelect = shell.querySelector("[data-synticore-grid-anchor-x]");
  var gridAnchorYSelect = shell.querySelector("[data-synticore-grid-anchor-y]");
  var browsersyncUiRow = shell.querySelector("[data-synticore-browsersync-ui-row]");
  var browsersyncUiLink = shell.querySelector("[data-synticore-browsersync-ui-link]");
  var browsersyncUiLinkText = shell.querySelector("[data-synticore-browsersync-ui-link-text]");
  var consoleLog = shell.querySelector("[data-synticore-dev-console-log]");
  var consoleEmpty = shell.querySelector("[data-synticore-dev-console-empty]");
  var consoleFilterInputs = Array.prototype.slice.call(shell.querySelectorAll("[data-synticore-dev-console-filter]"));
  var consoleSearchInput = shell.querySelector("[data-synticore-dev-console-search]");
  var consoleCopyButton = shell.querySelector("[data-synticore-dev-console-copy]");
  var consoleClearButton = shell.querySelector("[data-synticore-dev-console-clear]");

  if (
    !panel ||
    !dockToggle ||
    !header ||
    !tabButtons.length ||
    !tabViews.length ||
    !checkbox ||
    !gridToggle ||
    !gridSection ||
    !gridOptionsToggle ||
    !gridOptions ||
    !consoleSection ||
    !consoleOptionsToggle ||
    !consoleOptions ||
    !gridSizeInput ||
    !gridUnitSelect ||
    !gridColorInput ||
    !gridAlphaInput ||
    !gridAnchorXSelect ||
    !gridAnchorYSelect ||
    !browsersyncUiRow ||
    !browsersyncUiLink ||
    !browsersyncUiLinkText ||
    !consoleLog ||
    !consoleEmpty ||
    !consoleFilterInputs.length ||
    !consoleSearchInput ||
    !consoleCopyButton ||
    !consoleClearButton
  ) return;

  var state = {
    dockSide: defaultPanelState.dockSide,
    hidden: defaultPanelState.hidden,
    x: null,
    y: null,
    yProgress: defaultPanelState.yProgress,
    dragOffsetX: 0,
    dragOffsetY: 0,
    isDragging: false,
    activePointerId: null,
    rafId: 0,
    motionX: 0,
    motionY: 0,
    motionVx: 0,
    motionVy: 0,
    motionTime: 0,
    samples: [],
    activeTab: defaultPanelState.activeTab,
    consoleEntries: [],
    consoleLevelVisibility: {
      log: true,
      info: true,
      warn: true,
      error: true
    },
    consoleSearchQuery: "",
    consoleStickToBottom: true,
    consoleScrollTop: 0,
    persistedConsoleTimestampFormat: DEFAULT_LOG_TIMESTAMP_FORMAT,
    lastDockToggleTouchAt: 0,
    resizeTimerId: 0,
    layoutBounds: null,
    layoutRefreshQueued: false
  };

  var clamp = function (value, min, max) {
    return Math.min(max, Math.max(min, value));
  };

  var clampMagnitude = function (value, max) {
    return clamp(value, -max, max);
  };

  var parseLegacyGridSize = function (value) {
    var text = typeof value === "string" ? value.trim() : "";
    var match = text.match(/^([0-9]*\.?[0-9]+)\s*(rem|px|em|%|vw|vh)$/i);

    if (!match) {
      return null;
    }

    return {
      number: match[1],
      unit: match[2].toLowerCase()
    };
  };

  var sanitizeGridSizeNumber = function (value) {
    var number = Number.parseFloat(value);

    if (!Number.isFinite(number) || number <= 0) {
      return "1";
    }

    return String(number);
  };

  var sanitizeGridUnit = function (value) {
    return sanitizeGridAnchor(value, ["rem", "px", "em", "%", "vw", "vh"], "rem");
  };

  var sanitizeGridColor = function (value) {
    var text = typeof value === "string" ? value.trim() : "";

    return /^#[0-9a-f]{6}$/i.test(text) ? text.toLowerCase() : "#60fa68";
  };

  var sanitizeGridAlpha = function (value) {
    var number = Number.parseFloat(value);

    if (!Number.isFinite(number)) {
      return "0.25";
    }

    return String(clamp(number, 0, 1));
  };

  var hexToRgb = function (hex) {
    return {
      r: Number.parseInt(hex.slice(1, 3), 16),
      g: Number.parseInt(hex.slice(3, 5), 16),
      b: Number.parseInt(hex.slice(5, 7), 16)
    };
  };

  var sanitizeGridAnchor = function (value, allowedValues, fallback) {
    return allowedValues.indexOf(value) !== -1 ? value : fallback;
  };

  var sanitizePanelTab = function (value) {
    return ["tools", "console"].indexOf(value) !== -1 ? value : "tools";
  };

  var sanitizeConsoleTimestampFormat = function (value) {
    var text = readPersistedString(value, DEFAULT_LOG_TIMESTAMP_FORMAT);

    if (!text) {
      return DEFAULT_LOG_TIMESTAMP_FORMAT;
    }

    return text.toLowerCase() === "iso" ? "iso" : text;
  };

  var formatConsoleTimestamp = function (value, format) {
    var date = value instanceof Date ? value : new Date(value);

    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return "Invalid DateTime";
    }

    var outputFormat = sanitizeConsoleTimestampFormat(format);
    if (outputFormat.toLowerCase() === "iso") {
      return date.toISOString();
    }

    var pad = function (number, width) {
      var text = String(number);

      while (text.length < width) {
        text = "0" + text;
      }

      return text;
    };

    var hours24 = date.getHours();
    var hours12 = hours24 % 12 || 12;
    var meridiemUpper = hours24 >= 12 ? "PM" : "AM";
    var meridiemLower = meridiemUpper.toLowerCase();
    var timezoneShort = "";
    var timezoneLong = "";

    try {
      var timezoneShortPart = new Intl.DateTimeFormat("en-US", {
        timeZoneName: "short"
      }).formatToParts(date).find(function (part) {
        return part.type === "timeZoneName";
      });
      timezoneShort = timezoneShortPart ? timezoneShortPart.value || "" : "";
    } catch (error) {
      timezoneShort = "";
    }

    try {
      var timezoneLongPart = new Intl.DateTimeFormat("en-US", {
        timeZoneName: "long"
      }).formatToParts(date).find(function (part) {
        return part.type === "timeZoneName";
      });
      timezoneLong = timezoneLongPart ? timezoneLongPart.value || "" : "";
    } catch (error) {
      timezoneLong = timezoneShort;
    }

    var timezoneOffsetMinutes = -date.getTimezoneOffset();
    var timezoneSign = timezoneOffsetMinutes >= 0 ? "+" : "-";
    var timezoneOffsetAbs = Math.abs(timezoneOffsetMinutes);
    var timezoneOffsetHours = Math.floor(timezoneOffsetAbs / 60);
    var timezoneOffsetRemainder = timezoneOffsetAbs % 60;
    var replacements = {
      YYYY: String(date.getFullYear()),
      YY: pad(date.getFullYear() % 100, 2),
      MMMM: MONTH_NAMES_LONG[date.getMonth()],
      MMM: MONTH_NAMES_SHORT[date.getMonth()],
      MM: pad(date.getMonth() + 1, 2),
      M: String(date.getMonth() + 1),
      dddd: WEEKDAY_NAMES_LONG[date.getDay()],
      ddd: WEEKDAY_NAMES_SHORT[date.getDay()],
      DD: pad(date.getDate(), 2),
      D: String(date.getDate()),
      HH: pad(hours24, 2),
      H: String(hours24),
      hh: pad(hours12, 2),
      h: String(hours12),
      mm: pad(date.getMinutes(), 2),
      m: String(date.getMinutes()),
      ss: pad(date.getSeconds(), 2),
      s: String(date.getSeconds()),
      SSS: pad(date.getMilliseconds(), 3),
      A: meridiemUpper,
      a: meridiemLower,
      ZZ: timezoneSign + pad(timezoneOffsetHours, 2) + pad(timezoneOffsetRemainder, 2),
      Z: timezoneSign + pad(timezoneOffsetHours, 2) + ":" + pad(timezoneOffsetRemainder, 2),
      zzzz: String(timezoneLong || timezoneShort || "").trim(),
      z: String(timezoneShort || "").trim()
    };
    var tokenPattern = /\[[^\]]*]|YYYY|YY|MMMM|MMM|MM|M|dddd|ddd|DD|D|HH|H|hh|h|mm|m|ss|s|SSS|A|a|ZZ|Z|zzzz|z/g;

    return outputFormat.replace(tokenPattern, function (token) {
      if (token.charAt(0) === "[" && token.charAt(token.length - 1) === "]") {
        return token.slice(1, -1);
      }

      return Object.prototype.hasOwnProperty.call(replacements, token)
        ? replacements[token]
        : token;
    });
  };

  var getConsoleTimestamp = function () {
    return formatConsoleTimestamp(
      new Date(),
      state && state.persistedConsoleTimestampFormat
        ? state.persistedConsoleTimestampFormat
        : DEFAULT_LOG_TIMESTAMP_FORMAT
    );
  };

  var formatConsoleValue = function (value, seen) {
    var nextSeen = seen || [];

    if (value instanceof Error) {
      return value.stack || (value.name + ": " + value.message);
    }

    if (typeof value === "string") {
      return value;
    }

    if (value === null) {
      return "null";
    }

    if (value === undefined) {
      return "undefined";
    }

    if (typeof value === "function") {
      return "[Function " + (value.name || "anonymous") + "]";
    }

    if (typeof value !== "object") {
      return String(value);
    }

    if (nextSeen.indexOf(value) !== -1) {
      return "[Circular]";
    }

    nextSeen = nextSeen.concat([value]);

    try {
      return JSON.stringify(value, function (key, innerValue) {
        if (innerValue instanceof Error) {
          return {
            name: innerValue.name,
            message: innerValue.message,
            stack: innerValue.stack
          };
        }

        if (typeof innerValue === "function") {
          return "[Function " + (innerValue.name || "anonymous") + "]";
        }

        if (innerValue && typeof innerValue === "object") {
          if (nextSeen.indexOf(innerValue) !== -1 && innerValue !== value) {
            return "[Circular]";
          }

          nextSeen.push(innerValue);
        }

        return innerValue;
      }, 2);
    } catch (error) {
      return Object.prototype.toString.call(value);
    }
  };

  var buildConsoleMessage = function (args) {
    return args.map(function (arg) {
      return formatConsoleValue(arg);
    }).join(" ");
  };

  var buildConsoleExportText = function () {
    var visibleEntries = getVisibleConsoleEntries();

    if (!visibleEntries.length) {
      return "";
    }

    return visibleEntries.map(function (entry) {
      return "[" + formatConsoleTimestamp(
        entry.timestampValue,
        state.persistedConsoleTimestampFormat
      ) + "] " + entry.level.toUpperCase() + " " + entry.message;
    }).join("\n\n");
  };

  var copyTextToClipboard = function (text) {
    if (!text) {
      return Promise.resolve(false);
    }

    if (
      navigator &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function" &&
      window.isSecureContext
    ) {
      return navigator.clipboard.writeText(text).then(function () {
        return true;
      }).catch(function () {
        return false;
      });
    }

    try {
      var textarea = doc.createElement("textarea");

      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      textarea.style.left = "-9999px";
      doc.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      var copied = typeof doc.execCommand === "function" && doc.execCommand("copy");

      doc.body.removeChild(textarea);
      return Promise.resolve(!!copied);
    } catch (error) {
      return Promise.resolve(false);
    }
  };

  var flashConsoleActionLabel = function (button, idleText, nextText) {
    var resetLabel = function () {
      button.textContent = idleText;
    };

    button.textContent = nextText;
    window.setTimeout(resetLabel, 1200);
  };

  var isConsoleNearBottom = function () {
    var threshold = 16;
    var remaining = consoleLog.scrollHeight - consoleLog.scrollTop - consoleLog.clientHeight;

    return remaining <= threshold;
  };

  var getVisibleConsoleEntries = function () {
    var query = state.consoleSearchQuery.toLowerCase();

    return state.consoleEntries.filter(function (entry) {
      var isLevelVisible = !!state.consoleLevelVisibility[entry.level];
      var matchesQuery = !query || entry.message.toLowerCase().indexOf(query) !== -1;

      return isLevelVisible && matchesQuery;
    });
  };

  var renderConsoleEntries = function () {
    var consoleIsVisible = state.activeTab === "console";
    var previousScrollTop = consoleIsVisible ? consoleLog.scrollTop : state.consoleScrollTop;
    var wasNearBottom = consoleIsVisible && isConsoleNearBottom();
    var shouldStickToBottom = state.consoleStickToBottom || wasNearBottom;
    var visibleEntries = getVisibleConsoleEntries();

    consoleLog.replaceChildren();

    if (!visibleEntries.length) {
      consoleEmpty.textContent = state.consoleEntries.length
        ? "No console entries match the current filters."
        : "Console output will appear here.";
      consoleEmpty.classList.toggle("synticore-dev-panel__log-empty--filtered", !!state.consoleEntries.length);
      consoleLog.appendChild(consoleEmpty);
      state.consoleScrollTop = consoleIsVisible ? consoleLog.scrollTop : 0;
      return;
    }

    visibleEntries.forEach(function (entry) {
      var row = doc.createElement("article");
      var meta = doc.createElement("div");
      var level = doc.createElement("span");
      var time = doc.createElement("time");
      var message = doc.createElement("pre");
      var messageLines = entry.message.split(/\r?\n/);

      row.className = "synticore-dev-panel__log-entry synticore-dev-panel__log-entry--" + entry.level;
      meta.className = "synticore-dev-panel__log-meta";
      level.className = "synticore-dev-panel__log-level";
      time.className = "synticore-dev-panel__log-time";
      message.className = "synticore-dev-panel__log-message";

      level.textContent = entry.level;
      time.textContent = formatConsoleTimestamp(
        entry.timestampValue,
        state.persistedConsoleTimestampFormat
      );
      messageLines.forEach(function (line, index) {
        var lineNode = doc.createElement("span");
        var isStackLine = /^\s*at\b/.test(line);

        lineNode.className = isStackLine
          ? "synticore-dev-panel__log-line synticore-dev-panel__log-line--stack"
          : "synticore-dev-panel__log-line";
        lineNode.textContent = line;
        message.appendChild(lineNode);

        if (index < messageLines.length - 1) {
          message.appendChild(doc.createTextNode("\n"));
        }
      });

      meta.append(level, time);
      row.append(meta, message);
      consoleLog.appendChild(row);
    });

    if (shouldStickToBottom) {
      consoleLog.scrollTop = consoleLog.scrollHeight;
      state.consoleScrollTop = consoleLog.scrollTop;
      return;
    }

    if (consoleIsVisible) {
      consoleLog.scrollTop = previousScrollTop;
    }

    state.consoleScrollTop = previousScrollTop;
  };

  var pushConsoleEntry = function (entry) {
    state.consoleEntries.push(entry);

    if (state.consoleEntries.length > DEV_CONSOLE_MAX_ENTRIES) {
      state.consoleEntries.splice(0, state.consoleEntries.length - DEV_CONSOLE_MAX_ENTRIES);
    }

    renderConsoleEntries();
  };

  var syncConsoleFilterInputs = function () {
    consoleFilterInputs.forEach(function (input) {
      var level = input.getAttribute("data-synticore-dev-console-filter");
      input.checked = !!state.consoleLevelVisibility[level];
    });

    consoleSearchInput.value = state.consoleSearchQuery;
  };

  var emitConsoleEntry = function (level, args) {
    window.dispatchEvent(new window.CustomEvent(DEV_CONSOLE_EVENT_NAME, {
      detail: {
        level: level,
        message: buildConsoleMessage(args),
        timestampValue: Date.now()
      }
    }));
  };

  var installConsoleCapture = function () {
    if (window.__synticoreDevConsoleCaptureInstalled) {
      return;
    }

    window.__synticoreDevConsoleCaptureInstalled = true;

    ["log", "info", "warn", "error"].forEach(function (level) {
      var original = console[level];

      if (typeof original !== "function") {
        return;
      }

      console[level] = function () {
        var args = Array.prototype.slice.call(arguments);

        try {
          emitConsoleEntry(level, args);
        } catch (error) {
          // Ignore capture failures and preserve original console behavior.
        }

        return original.apply(console, args);
      };
    });

    window.addEventListener("error", function (event) {
      var detail = event && event.error ? event.error : (event.message || "Unknown error");
      emitConsoleEntry("error", [detail]);
    });

    window.addEventListener("unhandledrejection", function (event) {
      var reason = event ? event.reason : "Unhandled promise rejection";
      emitConsoleEntry("error", ["Unhandled promise rejection", reason]);
    });
  };

  var normalizePersistedState = function (raw) {
    var source = raw && typeof raw === "object" ? raw : {};
    var sourceGrid = source.grid && typeof source.grid === "object" ? source.grid : {};
    var sourceLog = source.log && typeof source.log === "object" ? source.log : {};
    var legacyGridSize = parseLegacyGridSize(readPersistedString(sourceGrid.size, defaultPersistedState.grid.size));

    return {
      grid: {
        size: legacyGridSize
          ? sanitizeGridSizeNumber(legacyGridSize.number)
          : sanitizeGridSizeNumber(readPersistedString(sourceGrid.size, defaultPersistedState.grid.size)),
        unit: legacyGridSize
          ? sanitizeGridUnit(legacyGridSize.unit)
          : sanitizeGridUnit(readPersistedString(sourceGrid.unit, defaultPersistedState.grid.unit)),
        color: sanitizeGridColor(readPersistedString(sourceGrid.color, defaultPersistedState.grid.color)),
        alpha: sanitizeGridAlpha(readPersistedString(sourceGrid.alpha, defaultPersistedState.grid.alpha)),
        anchorX: sanitizeGridAnchor(
          readPersistedString(sourceGrid.anchorX, defaultPersistedState.grid.anchorX),
          ["left", "center", "right"],
          defaultPersistedState.grid.anchorX
        ),
        anchorY: sanitizeGridAnchor(
          readPersistedString(sourceGrid.anchorY, defaultPersistedState.grid.anchorY),
          ["top", "center", "bottom"],
          defaultPersistedState.grid.anchorY
        )
      },
      log: {
        filters: {
          log: readPersistedBool(sourceLog.filters && sourceLog.filters.log, true),
          info: readPersistedBool(sourceLog.filters && sourceLog.filters.info, true),
          warn: readPersistedBool(sourceLog.filters && sourceLog.filters.warn, true),
          error: readPersistedBool(sourceLog.filters && sourceLog.filters.error, true)
        },
        searchText: typeof sourceLog.searchText === "string" ? sourceLog.searchText.trim() : "",
        timestampFormat: sanitizeConsoleTimestampFormat(sourceLog.timestampFormat)
      }
    };
  };

  var buildSharedLogStateSnapshot = function () {
    return {
      filters: {
        log: !!state.consoleLevelVisibility.log,
        info: !!state.consoleLevelVisibility.info,
        warn: !!state.consoleLevelVisibility.warn,
        error: !!state.consoleLevelVisibility.error
      },
      searchText: String(state.consoleSearchQuery || "").trim()
    };
  };

  var hasSharedLogStateOverride = function (sharedLogState) {
    if (!sharedLogState || typeof sharedLogState !== "object") {
      return false;
    }

    return sharedLogState.searchText !== defaultPersistedState.log.searchText
      || sharedLogState.filters.log !== defaultPersistedState.log.filters.log
      || sharedLogState.filters.info !== defaultPersistedState.log.filters.info
      || sharedLogState.filters.warn !== defaultPersistedState.log.filters.warn
      || sharedLogState.filters.error !== defaultPersistedState.log.filters.error;
  };

  var applySharedLogState = function (sharedLogState) {
    state.consoleLevelVisibility = {
      log: !!sharedLogState.filters.log,
      info: !!sharedLogState.filters.info,
      warn: !!sharedLogState.filters.warn,
      error: !!sharedLogState.filters.error
    };
    state.consoleSearchQuery = sharedLogState.searchText;
  };

  var normalizePanelState = function (raw) {
    var source = raw && typeof raw === "object" ? raw : {};

    return {
      dockSide: source.dockSide === "left" ? "left" : "right",
      hidden: readPersistedBool(source.hidden, defaultPanelState.hidden),
      heatmap: readPersistedBool(source.heatmap, defaultPanelState.heatmap),
      gridEnabled: readPersistedBool(source.gridEnabled, defaultPanelState.gridEnabled),
      gridOptionsExpanded: readPersistedBool(
        source.gridOptionsExpanded,
        defaultPanelState.gridOptionsExpanded
      ),
      consoleOptionsExpanded: readPersistedBool(
        source.consoleOptionsExpanded,
        defaultPanelState.consoleOptionsExpanded
      ),
      activeTab: sanitizePanelTab(readPersistedString(source.activeTab, defaultPanelState.activeTab)),
      yProgress: clampUnitInterval(
        readPersistedNumber(source.yProgress, defaultPanelState.yProgress),
        defaultPanelState.yProgress
      )
    };
  };

  var getPanelYProgress = function (bounds) {
    var panelBounds = bounds || getBounds();
    return clampUnitInterval(
      getAxisProgress(state.y, panelBounds.minY, panelBounds.maxY),
      defaultPanelState.yProgress
    );
  };

  var buildPersistedStateSnapshot = function () {
    return {
      grid: {
        size: sanitizeGridSizeNumber(gridSizeInput.value),
        unit: sanitizeGridUnit(gridUnitSelect.value),
        color: sanitizeGridColor(gridColorInput.value),
        alpha: sanitizeGridAlpha(gridAlphaInput.value),
        anchorX: sanitizeGridAnchor(gridAnchorXSelect.value, ["left", "center", "right"], "center"),
        anchorY: sanitizeGridAnchor(gridAnchorYSelect.value, ["top", "center", "bottom"], "top")
      },
      log: {
        filters: buildSharedLogStateSnapshot().filters,
        searchText: buildSharedLogStateSnapshot().searchText
      }
    };
  };

  var buildPanelStateSnapshot = function () {
    return normalizePanelState({
      dockSide: state.dockSide,
      hidden: state.hidden,
      heatmap: !!checkbox.checked,
      gridEnabled: !!gridToggle.checked,
      gridOptionsExpanded: gridOptionsToggle.getAttribute("aria-expanded") === "true",
      consoleOptionsExpanded: consoleOptionsToggle.getAttribute("aria-expanded") === "true",
      activeTab: state.activeTab,
      yProgress: getPanelYProgress()
    });
  };

  var persistSharedState = function () {
    return savePersistedState(buildPersistedStateSnapshot());
  };

  var persistPanelState = function () {
    savePanelState(buildPanelStateSnapshot());
  };

  var applyPersistedState = function (persistedState) {
    gridSizeInput.value = persistedState.grid.size;
    gridUnitSelect.value = persistedState.grid.unit;
    gridColorInput.value = persistedState.grid.color;
    gridAlphaInput.value = persistedState.grid.alpha;
    gridAnchorXSelect.value = persistedState.grid.anchorX;
    gridAnchorYSelect.value = persistedState.grid.anchorY;
    applySharedLogState(persistedState.log);
    state.persistedConsoleTimestampFormat = persistedState.log.timestampFormat;
  };

  var applyPanelState = function (panelState) {
    state.dockSide = panelState.dockSide;
    state.hidden = panelState.hidden;
    state.yProgress = panelState.yProgress;
    checkbox.checked = panelState.heatmap;
    gridToggle.checked = panelState.gridEnabled;
    state.activeTab = panelState.activeTab;
    state.x = null;
    state.y = null;
  };

  var applyActiveTab = function (tabName, shouldPersist) {
    var nextTab = sanitizePanelTab(tabName);

    state.activeTab = nextTab;

    tabButtons.forEach(function (button) {
      var isActive = button.getAttribute("data-synticore-dev-tab") === nextTab;
      button.classList.toggle("synticore-dev-panel__tab--active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    tabViews.forEach(function (view) {
      view.hidden = view.getAttribute("data-synticore-dev-view") !== nextTab;
    });

    if (nextTab === "console") {
      queueFrame(function () {
        if (state.activeTab !== "console") {
          return;
        }

        if (state.consoleStickToBottom) {
          consoleLog.scrollTop = consoleLog.scrollHeight;
          state.consoleScrollTop = consoleLog.scrollTop;
          return;
        }

        consoleLog.scrollTop = state.consoleScrollTop;
      });
    }

    if (shouldPersist !== false) {
      persistPanelState();
      refreshPositionForLayoutChange();
    }
  };

  var getDefaultPort = function (protocol) {
    return protocol === "https:" ? 443 : 80;
  };

  var applyBrowserSyncUiLink = function () {
    if (!window.location || !window.location.hostname) {
      browsersyncUiRow.hidden = true;
      return;
    }

    var protocol = window.location.protocol === "https:" ? "https:" : "http:";
    var currentPort = Number.parseInt(window.location.port, 10);
    var basePort = Number.isFinite(currentPort) ? currentPort : getDefaultPort(protocol);

    if (!Number.isFinite(basePort) || basePort <= 0) {
      browsersyncUiRow.hidden = true;
      return;
    }

    var uiUrl = protocol + "//" + window.location.hostname + ":" + String(basePort + 1) + "/";
    var uiLabel = window.location.hostname + ":" + String(basePort + 1);

    browsersyncUiLink.href = uiUrl;
    browsersyncUiLinkText.textContent = uiLabel;
    browsersyncUiLink.setAttribute("aria-label", "Open Browsersync Controls at " + uiLabel);
    browsersyncUiLink.title = "Open Browsersync Controls at " + uiLabel;
    browsersyncUiRow.hidden = false;
  };

  var getSectionOptionsLabel = function (toggle) {
    var label = toggle.getAttribute("data-synticore-options-label");

    return label && label.trim() ? label.trim() : "Section";
  };

  var applySectionOptionsExpanded = function (section, toggle, body, expanded, shouldPersist) {
    var isExpanded = expanded !== false;
    var label = getSectionOptionsLabel(toggle);

    section.classList.toggle("synticore-dev-panel__section--collapsed", !isExpanded);
    body.hidden = !isExpanded;
    toggle.setAttribute("aria-expanded", isExpanded ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      (isExpanded ? "Collapse" : "Expand") + " " + label + " Options"
    );
    toggle.title = (isExpanded ? "Collapse" : "Expand") + " " + label + " Options";

    if (shouldPersist !== false) {
      persistPanelState();
      refreshPositionForLayoutChange();
    }
  };

  var applyGridOptionsExpanded = function (expanded, shouldPersist) {
    applySectionOptionsExpanded(
      gridSection,
      gridOptionsToggle,
      gridOptions,
      expanded,
      shouldPersist
    );
  };

  var applyConsoleOptionsExpanded = function (expanded, shouldPersist) {
    applySectionOptionsExpanded(
      consoleSection,
      consoleOptionsToggle,
      consoleOptions,
      expanded,
      shouldPersist
    );
  };

  var applyGridOverlay = function (shouldPersist) {
    var gridEnabled = !!gridToggle.checked;
    var gridSizeNumber = sanitizeGridSizeNumber(gridSizeInput.value);
    var gridUnit = sanitizeGridUnit(gridUnitSelect.value);
    var gridColor = sanitizeGridColor(gridColorInput.value);
    var gridAlpha = sanitizeGridAlpha(gridAlphaInput.value);
    var gridAnchorX = sanitizeGridAnchor(gridAnchorXSelect.value, ["left", "center", "right"], "left");
    var gridAnchorY = sanitizeGridAnchor(gridAnchorYSelect.value, ["top", "center", "bottom"], "top");
    var gridSize = gridSizeNumber + gridUnit;
    var gridRgb = hexToRgb(gridColor);
    var gridColorWithAlpha = "rgba(" + gridRgb.r + ", " + gridRgb.g + ", " + gridRgb.b + ", " + gridAlpha + ")";

    gridSizeInput.value = gridSizeNumber;
    gridUnitSelect.value = gridUnit;
    gridColorInput.value = gridColor;
    gridAlphaInput.value = gridAlpha;
    gridAnchorXSelect.value = gridAnchorX;
    gridAnchorYSelect.value = gridAnchorY;

    root.classList.toggle("synticore-dev-grid-overlay", gridEnabled);
    root.classList.remove(
      "synticore-dev-grid-anchor-x-left",
      "synticore-dev-grid-anchor-x-center",
      "synticore-dev-grid-anchor-x-right"
    );
    root.classList.remove(
      "synticore-dev-grid-anchor-y-top",
      "synticore-dev-grid-anchor-y-center",
      "synticore-dev-grid-anchor-y-bottom"
    );
    root.classList.add("synticore-dev-grid-anchor-x-" + gridAnchorX);
    root.classList.add("synticore-dev-grid-anchor-y-" + gridAnchorY);
    root.style.setProperty("--synticore-dev-grid-size", gridSize);
    root.style.setProperty("--synticore-dev-grid-line-color", gridColorWithAlpha);

    if (shouldPersist !== false) {
      persistSharedState();
      persistPanelState();
    }
  };

  var getAxisProgress = function (value, min, max) {
    var range = max - min;

    if (range <= 0) return 0;

    return clamp((value - min) / range, 0, 1);
  };

  var getValueFromProgress = function (progress, min, max) {
    var range = max - min;

    if (range <= 0) return min;

    return min + range * clamp(progress, 0, 1);
  };

  var getViewportSize = function () {
    var viewportElement = doc.documentElement || body;

    return {
      width: viewportElement && viewportElement.clientWidth ? viewportElement.clientWidth : window.innerWidth,
      height: viewportElement && viewportElement.clientHeight ? viewportElement.clientHeight : window.innerHeight
    };
  };

  var getBounds = function () {
    var viewport = getViewportSize();
    var width = shell.offsetWidth;
    var height = shell.offsetHeight;
    var maxX = Math.max(PANEL_MARGIN, viewport.width - width - PANEL_MARGIN);
    var maxY = Math.max(PANEL_MARGIN, viewport.height - height - PANEL_MARGIN);

    return {
      width: width,
      height: height,
      minX: PANEL_MARGIN,
      maxX: maxX,
      minY: PANEL_MARGIN,
      maxY: maxY
    };
  };

  var getDragBounds = function () {
    var bounds = getBounds();
    var viewport = getViewportSize();

    return {
      minX: -bounds.width,
      maxX: viewport.width,
      minY: bounds.minY,
      maxY: bounds.maxY
    };
  };

  var applyPosition = function () {
    shell.style.left = state.x + "px";
    shell.style.top = state.y + "px";
  };

  var updateLayoutBounds = function () {
    state.layoutBounds = getBounds();
    return state.layoutBounds;
  };

  var remapPositionToBounds = function (previousBounds, nextBounds) {
    state.x = getValueFromProgress(
      getAxisProgress(state.x, previousBounds.minX, previousBounds.maxX),
      nextBounds.minX,
      nextBounds.maxX
    );

    state.y = getValueFromProgress(
      getAxisProgress(state.y, previousBounds.minY, previousBounds.maxY),
      nextBounds.minY,
      nextBounds.maxY
    );
  };

  var refreshPositionForLayoutChange = function () {
    if (typeof state.x !== "number" || typeof state.y !== "number") {
      return;
    }

    if (state.isDragging || state.layoutRefreshQueued) {
      return;
    }

    state.layoutRefreshQueued = true;

    var previousBounds = state.layoutBounds || getBounds();

    queueFrame(function () {
      state.layoutRefreshQueued = false;
      var nextBounds = updateLayoutBounds();

      remapPositionToBounds(previousBounds, nextBounds);
      syncDockSide();
      applyPosition();
      persistPanelState();
    });
  };

  var updateDockSideClass = function () {
    shell.classList.toggle("synticore-dev-shell--left", state.dockSide === "left");
    shell.classList.toggle("synticore-dev-shell--right", state.dockSide === "right");
  };

  var updateDockToggle = function () {
    var actionLabel = state.hidden ? "Show" : "Hide";
    var sideLabel = state.dockSide === "left" ? "left" : "right";

    dockToggle.textContent = actionLabel;
    dockToggle.setAttribute("aria-label", actionLabel + " Dev Panel on the " + sideLabel + " side");
  };

  var applyHiddenState = function () {
    panel.classList.toggle("synticore-dev-panel--hidden", state.hidden);
    updateDockToggle();
  };

  var stopMotion = function () {
    if (state.rafId) {
      window.cancelAnimationFrame(state.rafId);
      state.rafId = 0;
    }

    state.motionTime = 0;
    state.motionVx = 0;
    state.motionVy = 0;
  };

  var clearSettling = function () {
    shell.classList.remove("synticore-dev-shell--settling");
    shell.classList.remove("synticore-dev-shell--in-motion");
  };

  var setResizeActive = function (active) {
    shell.classList.toggle("synticore-dev-shell--resizing", active !== false);
  };

  var scheduleClearSettling = function () {
    window.setTimeout(clearSettling, SETTLE_MS);
  };

  var resolveDockSide = function () {
    var bounds = getBounds();
    var viewport = getViewportSize();
    var midpoint = state.x + bounds.width / 2;

    return midpoint <= viewport.width / 2 ? "left" : "right";
  };

  var syncDockSide = function () {
    var previousDockSide = state.dockSide;

    state.dockSide = resolveDockSide();

    if (previousDockSide !== state.dockSide) {
      shell.classList.add("synticore-dev-shell--side-switching");
      queueFrame(function () {
        shell.classList.remove("synticore-dev-shell--side-switching");
      });
    }

    updateDockSideClass();
    updateDockToggle();
  };

  var setDraggedPosition = function (x, y, allowSideOvershoot) {
    var bounds = allowSideOvershoot ? getDragBounds() : getBounds();

    state.x = clamp(x, bounds.minX, bounds.maxX);
    state.y = clamp(y, bounds.minY, bounds.maxY);

    syncDockSide();
    applyPosition();
  };

  var hidePanelToSide = function (side, velocity) {
    var bounds = getBounds();
    var targetX = side === "left" ? bounds.minX : bounds.maxX;
    var projectedY = state.y + ((velocity && velocity.y) || 0) * SETTLE_MS * HIDE_Y_MOMENTUM_FACTOR;
    var targetY = clamp(projectedY, bounds.minY, bounds.maxY);

    stopMotion();
    clearSettling();
    state.dockSide = side === "left" ? "left" : "right";
    state.hidden = true;

    updateDockSideClass();
    applyHiddenState();
    shell.classList.add("synticore-dev-shell--settling");
    state.x = targetX;
    state.y = targetY;
    applyPosition();
    scheduleClearSettling();
    persistPanelState();
  };

  var recordSample = function (x, y, time) {
    state.samples.push({ x: x, y: y, time: time });

    while (state.samples.length > 2 && time - state.samples[0].time > SAMPLE_WINDOW_MS) {
      state.samples.shift();
    }
  };

  var computeReleaseVelocity = function (releaseTime) {
    if (state.samples.length < 2) {
      return { x: 0, y: 0 };
    }

    var first = state.samples[0];
    var last = state.samples[state.samples.length - 1];

    if (releaseTime - last.time > RELEASE_IDLE_MS) {
      return { x: 0, y: 0 };
    }

    var elapsed = Math.max(1, last.time - first.time);

    return {
      x: clampMagnitude((last.x - first.x) / elapsed, MAX_SPEED),
      y: clampMagnitude((last.y - first.y) / elapsed, MAX_SPEED)
    };
  };

  var finishMotion = function () {
    stopMotion();
    clearSettling();
    syncDockSide();
    persistPanelState();
  };

  var stepMotion = function (time) {
    if (!state.motionTime) {
      state.motionTime = time;
    }

    var delta = Math.max(1, time - state.motionTime);
    var bounds = getBounds();
    var distanceToLeft = Math.abs(state.motionX - bounds.minX);
    var distanceToRight = Math.abs(bounds.maxX - state.motionX);
    var nearestSideDirection = distanceToLeft <= distanceToRight ? -1 : 1;
    var nearestSideDistance = Math.min(distanceToLeft, distanceToRight);
    var sideMagnetRange = Math.max((bounds.maxX - bounds.minX) / 2, 1);
    var sideMagnetStrength = clamp(1 - nearestSideDistance / sideMagnetRange, 0, 1);
    var isSlidingOnSide = state.motionX <= bounds.minX || state.motionX >= bounds.maxX;

    if (!isSlidingOnSide && sideMagnetStrength > 0) {
      state.motionVx += nearestSideDirection * SIDE_MAGNET_ACCEL * sideMagnetStrength * delta;
      state.motionVx = clampMagnitude(state.motionVx, SIDE_MAGNET_MAX_VX);
    }

    state.motionX += state.motionVx * delta;
    state.motionY += state.motionVy * delta;

    if (state.motionX <= bounds.minX) {
      state.motionX = bounds.minX;
      state.motionVx = 0;
    } else if (state.motionX >= bounds.maxX) {
      state.motionX = bounds.maxX;
      state.motionVx = 0;
    }

    if (state.motionY <= bounds.minY) {
      state.motionY = bounds.minY;
      state.motionVy = 0;
    } else if (state.motionY >= bounds.maxY) {
      state.motionY = bounds.maxY;
      state.motionVy = 0;
    }

    isSlidingOnSide = state.motionX <= bounds.minX || state.motionX >= bounds.maxX;

    if (!isSlidingOnSide && Math.abs(state.motionVx) < WALL_CAPTURE_MIN_VX) {
      state.motionVx = nearestSideDirection * WALL_CAPTURE_MIN_VX;
    }

    if (state.motionX <= bounds.minX || state.motionX >= bounds.maxX) {
      state.motionVy *= Math.pow(SIDE_FRICTION, delta / FRAME_MS);
    }

    state.motionTime = time;
    state.x = state.motionX;
    state.y = state.motionY;

    syncDockSide();
    applyPosition();

    if (isSlidingOnSide && Math.hypot(state.motionVx, state.motionVy) <= MIN_SPEED) {
      finishMotion();
      return;
    }

    state.rafId = window.requestAnimationFrame(stepMotion);
  };

  var startMotion = function (velocity) {
    var bounds = getBounds();
    var isSlidingOnSide = state.x <= bounds.minX || state.x >= bounds.maxX;

    if (Math.hypot(velocity.x, velocity.y) <= MIN_SPEED) {
      if (!isSlidingOnSide) {
        var distanceToLeft = Math.abs(state.x - bounds.minX);
        var distanceToRight = Math.abs(bounds.maxX - state.x);

        velocity = {
          x: (distanceToLeft <= distanceToRight ? -1 : 1) * WALL_CAPTURE_MIN_VX,
          y: 0
        };
      } else {
        finishMotion();
        return;
      }
    }

    if (Math.hypot(velocity.x, velocity.y) <= MIN_SPEED) {
      finishMotion();
      return;
    }

    stopMotion();
    clearSettling();
    shell.classList.add("synticore-dev-shell--in-motion");

    state.motionX = state.x;
    state.motionY = state.y;
    state.motionVx = velocity.x;
    state.motionVy = velocity.y;
    state.motionTime = 0;
    state.rafId = window.requestAnimationFrame(stepMotion);
  };

  var initializePosition = function () {
    updateDockSideClass();

    var bounds = updateLayoutBounds();

    state.x = state.dockSide === "left" ? bounds.minX : bounds.maxX;
    state.y = getValueFromProgress(
      clampUnitInterval(state.yProgress, defaultPanelState.yProgress),
      bounds.minY,
      bounds.maxY
    );

    syncDockSide();
    applyPosition();
    clearSettling();

    if (state.hidden) {
      var panelTransition = panel.style.transition;
      var dockToggleTransition = dockToggle.style.transition;

      panel.style.transition = "none";
      dockToggle.style.transition = "none";
      applyHiddenState();
      panel.offsetHeight;

      queueFrame(function () {
        panel.style.transition = panelTransition;
        dockToggle.style.transition = dockToggleTransition;
      });
      return;
    }

    applyHiddenState();
  };

  var handleResize = function () {
    stopMotion();
    clearSettling();
    setResizeActive(true);

    if (state.resizeTimerId) {
      window.clearTimeout(state.resizeTimerId);
    }

    state.resizeTimerId = window.setTimeout(function () {
      state.resizeTimerId = 0;
      var previousBounds = state.layoutBounds || getBounds();

      queueFrame(function () {
        var nextBounds = updateLayoutBounds();

        remapPositionToBounds(previousBounds, nextBounds);
        syncDockSide();
        applyPosition();
        setResizeActive(false);
        persistPanelState();
      });
    }, RESIZE_DEBOUNCE_MS);
  };

  var onPointerMove = function (event) {
    if (!state.isDragging || event.pointerId !== state.activePointerId) return;

    setDraggedPosition(
      event.clientX - state.dragOffsetX,
      event.clientY - state.dragOffsetY,
      true
    );
    recordSample(state.x, state.y, event.timeStamp);
  };

  var endDrag = function (event) {
    if (!state.isDragging || event.pointerId !== state.activePointerId) return;

    state.isDragging = false;
    state.activePointerId = null;
    shell.classList.remove("synticore-dev-shell--dragging");

    try {
      header.releasePointerCapture(event.pointerId);
    } catch (error) {
      // Ignore release failures for browsers that already dropped capture.
    }

    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", endDrag);
    window.removeEventListener("pointercancel", endDrag);
    var releaseVelocity = computeReleaseVelocity(event.timeStamp);

    var bounds = getBounds();

    if (state.x <= bounds.minX - PANEL_HIDE_DRAG_THRESHOLD) {
      hidePanelToSide("left", releaseVelocity);
      return;
    }

    if (state.x >= bounds.maxX + PANEL_HIDE_DRAG_THRESHOLD) {
      hidePanelToSide("right", releaseVelocity);
      return;
    }

    state.x = clamp(state.x, bounds.minX, bounds.maxX);
    state.y = clamp(state.y, bounds.minY, bounds.maxY);
    syncDockSide();
    applyPosition();
    startMotion(releaseVelocity);
  };

  var onPointerDown = function (event) {
    if (event.button !== undefined && event.button !== 0) return;

    stopMotion();
    clearSettling();
    state.hidden = false;
    applyHiddenState();

    state.isDragging = true;
    state.activePointerId = event.pointerId;
    state.dragOffsetX = event.clientX - state.x;
    state.dragOffsetY = event.clientY - state.y;
    state.samples = [];
    shell.classList.add("synticore-dev-shell--dragging");
    shell.classList.add("synticore-dev-shell--in-motion");
    recordSample(state.x, state.y, event.timeStamp);

    try {
      header.setPointerCapture(event.pointerId);
    } catch (error) {
      // Ignore capture failures and continue with window-level listeners.
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    event.preventDefault();
  };

  var toggleHiddenState = function () {
    if (state.isDragging) return;

    state.hidden = !state.hidden;
    applyHiddenState();
    persistPanelState();
  };

  var onDockToggleTouchEnd = function (event) {
    state.lastDockToggleTouchAt = Date.now();
    toggleHiddenState();
    event.preventDefault();
    event.stopPropagation();
  };

  var onDockToggleClick = function (event) {
    if (Date.now() - state.lastDockToggleTouchAt < 500) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    toggleHiddenState();
  };

  installConsoleCapture();

  loadPersistedState().then(function (rawPersistedState) {
    var persistedState = normalizePersistedState(rawPersistedState);
    var localSharedLogState = normalizePersistedState({ log: loadSharedLogState() }).log;
    var panelState = normalizePanelState(loadPanelState());
    var effectiveSharedLogState = hasSharedLogStateOverride(localSharedLogState)
      ? localSharedLogState
      : persistedState.log;

    persistedState.log = effectiveSharedLogState;
    applyPersistedState(persistedState);
    applyPanelState(panelState);
    root.classList.toggle("synticore-dev-heatmap", checkbox.checked);
    applyBrowserSyncUiLink();
    applyGridOptionsExpanded(panelState.gridOptionsExpanded, false);
    applyConsoleOptionsExpanded(panelState.consoleOptionsExpanded, false);
    applyGridOverlay(false);
    applyActiveTab(panelState.activeTab, false);
    syncConsoleFilterInputs();
    renderConsoleEntries();

    if (!hasSharedLogStateOverride(localSharedLogState)) {
      saveSharedLogState(buildSharedLogStateSnapshot());
    } else {
      persistSharedState();
    }

    checkbox.addEventListener("change", function () {
      root.classList.toggle("synticore-dev-heatmap", checkbox.checked);
      persistPanelState();
    });

    gridToggle.addEventListener("change", function () {
      applyGridOverlay();
    });
    gridSizeInput.addEventListener("change", function () {
      applyGridOverlay();
    });
    gridUnitSelect.addEventListener("change", function () {
      applyGridOverlay();
    });
    gridColorInput.addEventListener("input", function () {
      applyGridOverlay(false);
    });
    gridColorInput.addEventListener("change", function () {
      applyGridOverlay();
    });
    gridAlphaInput.addEventListener("input", function () {
      applyGridOverlay(false);
    });
    gridAlphaInput.addEventListener("change", function () {
      applyGridOverlay();
    });
    gridAnchorXSelect.addEventListener("change", function () {
      applyGridOverlay();
    });
    gridAnchorYSelect.addEventListener("change", function () {
      applyGridOverlay();
    });
    gridOptionsToggle.addEventListener("click", function () {
      applyGridOptionsExpanded(gridOptionsToggle.getAttribute("aria-expanded") !== "true");
    });
    consoleOptionsToggle.addEventListener("click", function () {
      applyConsoleOptionsExpanded(consoleOptionsToggle.getAttribute("aria-expanded") !== "true");
    });
    tabButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        applyActiveTab(button.getAttribute("data-synticore-dev-tab"));
      });
    });
    window.addEventListener(DEV_CONSOLE_EVENT_NAME, function (event) {
      var detail = event && event.detail ? event.detail : null;

      if (!detail || typeof detail.message !== "string") {
        return;
      }

      pushConsoleEntry({
        level: sanitizeGridAnchor(detail.level, ["log", "info", "warn", "error"], "log"),
        message: detail.message,
        timestampValue: detail.timestampValue || Date.now()
      });
    });
    consoleLog.addEventListener("scroll", function () {
      state.consoleScrollTop = consoleLog.scrollTop;
      state.consoleStickToBottom = isConsoleNearBottom();
    });
    consoleFilterInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        var level = input.getAttribute("data-synticore-dev-console-filter");

        state.consoleLevelVisibility[level] = !!input.checked;
        saveSharedLogState(buildSharedLogStateSnapshot());
        persistSharedState();
        renderConsoleEntries();
      });
    });
    consoleSearchInput.addEventListener("input", function () {
      state.consoleSearchQuery = String(consoleSearchInput.value || "").trim();
      saveSharedLogState(buildSharedLogStateSnapshot());
      persistSharedState();
      renderConsoleEntries();
    });
    consoleClearButton.addEventListener("click", function () {
      state.consoleEntries = [];
      state.consoleStickToBottom = true;
      syncConsoleFilterInputs();
      renderConsoleEntries();
    });
    consoleCopyButton.addEventListener("click", function () {
      var exportText = buildConsoleExportText();

      copyTextToClipboard(exportText).then(function (copied) {
        flashConsoleActionLabel(
          consoleCopyButton,
          "Copy",
          copied ? "Copied" : (exportText ? "Failed" : "Empty")
        );
      });
    });

    header.addEventListener("pointerdown", onPointerDown);
    dockToggle.addEventListener("touchend", onDockToggleTouchEnd, { passive: false });
    dockToggle.addEventListener("click", onDockToggleClick);

    window.addEventListener("resize", handleResize);

    if (typeof window.ResizeObserver === "function") {
      var lastObservedPanelSize = {
        width: 0,
        height: 0
      };
      var panelResizeObserver = new window.ResizeObserver(function (entries) {
        if (!entries || !entries.length) {
          return;
        }

        var entry = entries[0];
        var width = entry && entry.contentRect ? entry.contentRect.width : shell.offsetWidth;
        var height = entry && entry.contentRect ? entry.contentRect.height : shell.offsetHeight;

        if (
          Math.abs(width - lastObservedPanelSize.width) < 0.5 &&
          Math.abs(height - lastObservedPanelSize.height) < 0.5
        ) {
          return;
        }

        lastObservedPanelSize.width = width;
        lastObservedPanelSize.height = height;
        refreshPositionForLayoutChange();
      });

      panelResizeObserver.observe(shell);
    }

    waitForShadowStylesheet.then(function () {
      initializePosition();
      queueFrame(function () {
        shell.setAttribute("data-synticore-dev-state", "ready");
      });
    });
  });
})();
