// =============================================================================
// # Synticore Website Compiler
// =============================================================================

// =============================================================================
// ## Document
// =============================================================================

/**
 * @function library*
 *
 * This prefix indicates that the function belongs to the `functionLibrary`
 * collection, which comprises utility functions designed to assist with
 * various operations within the codebase. Functions prefixed with
 * `library_` are meant to provide reusable and consistent
 * functionality for tasks such as variable manipulation, file operations,
 * caching, and error handling.
 *
 * These functions are intended to be utilized as part of larger workflows
 * or processing tasks, ensuring that common operations are handled
 * efficiently and maintainability. The prefix helps distinguish these
 * utility functions from other parts of the code, promoting clarity and
 * organization.
 */

/**
 * @function handle*
 *
 * This function acts as a processing handler designed to
 * be executed as part of the `primary*`
 * function. It is **not** intended to be run on its own.
 *
 * Always call the corresponding `primary*`
 * function to ensure that tasks are processed correctly and
 * in the appropriate context.
 */

/**
 * @function primary*
 *
 * This is the primary function for executing a specific task.
 * It serves as the main entry point that coordinates the workflow
 * and invokes necessary handler functions for processing.
 *
 * To accomplish the task effectively, use this function
 * rather than calling handler functions directly.
 */

/**
 * @function group*
 *
 * This prefix indicates that the function defines a *grouped* primary build
 * process. Each `group_*` combines multiple individual `primary*` tasks into
 * a coordinated sequence.
 *
 * These functions are responsible for organizing complex workflows where
 * multiple related steps must be executed together to complete a logical build
 * phase.
 *
 * Typical group tasks include:
 * - Resetting related caches or outputs.
 * - Executing all necessary build steps for a particular asset type.
 * - Rebuilding dependent files in the correct order.
 *
 * Always use these grouped functions instead of calling multiple primary
 * tasks individually to ensure that dependencies and order are respected.
 */

// =============================================================================
// ## Pre-Initialize
// =============================================================================

// const COMPILER_TITLE_SHORT = 'Synticore';
const COMPILER_TITLE_FULL = 'Synticore Website Compiler';

const LOG_TAG_PREINITIALIZE = '[🔧 Pre-Initialize]';

console.log(LOG_TAG_PREINITIALIZE, 'Starting setup...');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Node.js - Module Alias
// -----------------------------------------------------------------------------

const LOG_TAG_NODE_JS = '[⬢ Node.js]';

const LOG_TAG_PREINITIALIZE_NODE_JS = LOG_TAG_PREINITIALIZE + ' ' + LOG_TAG_NODE_JS;

console.log(LOG_TAG_PREINITIALIZE_NODE_JS, 'Preparing Node.js setup...');

const LOG_TAG_PREINITIALIZE_NODE_JS_MODULE_ALIAS = LOG_TAG_PREINITIALIZE_NODE_JS + ' [🪪 Module Alias]';

console.log(LOG_TAG_PREINITIALIZE_NODE_JS_MODULE_ALIAS, 'Registering module aliases so @custom imports work...');

// @ts-check
require('module-alias/register');

console.log(LOG_TAG_PREINITIALIZE_NODE_JS_MODULE_ALIAS, 'Module aliases are ready.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Node.js - Common
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_NODE_JS_COMMON = LOG_TAG_PREINITIALIZE_NODE_JS + ' [📚 Common]';

console.log(LOG_TAG_PREINITIALIZE_NODE_JS_COMMON, 'Loading built-in Node.js modules...');

const NODE_FS = require('fs');
const NODE_PATH = require('path');
const NODE_NET = require('net');

console.log(LOG_TAG_PREINITIALIZE_NODE_JS_COMMON, 'Built-in Node.js modules loaded.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Node.js - Module Alias - Add
// -----------------------------------------------------------------------------

console.log(LOG_TAG_PREINITIALIZE_NODE_JS_MODULE_ALIAS, 'Adding the @custom alias path...');

require('module-alias')
  .addAlias(
    '@custom',
    NODE_PATH.join(__dirname, 'source', 'node_modules_custom')
  );

console.log(LOG_TAG_PREINITIALIZE_NODE_JS_MODULE_ALIAS, '@custom alias path added.');

console.log(LOG_TAG_PREINITIALIZE_NODE_JS, 'Node.js setup complete.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Library (Pre Log)
// -----------------------------------------------------------------------------

const LOG_TAG_LIBRARY = '[📚 Library]';
const LOG_TAG_PREINITIALIZE_LIBRARY = LOG_TAG_PREINITIALIZE + ' ' + LOG_TAG_LIBRARY;

const LOG_TAG_PREINITIALIZE_LIBRARY_PRE_LOG = LOG_TAG_PREINITIALIZE_LIBRARY + ' (Pre Log)';

console.log(LOG_TAG_PREINITIALIZE_LIBRARY_PRE_LOG, 'Loading libraries needed before logger setup...');

const NODE_CURE_PATH = require('@custom/cure-path');
const NODE_CURE_FS = require('@custom/cure-fs');
const ANSI = new (require('@custom/cure-ansi')).ANSI();

console.log(LOG_TAG_PREINITIALIZE_LIBRARY_PRE_LOG, 'Pre-logger libraries loaded.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Variable
// -----------------------------------------------------------------------------

const LOG_TAG_VARIABLE = '[🔣 Variable]';
const LOG_TAG_PREINITIALIZE_VARIABLE = LOG_TAG_PREINITIALIZE + ' ' + LOG_TAG_VARIABLE;

console.log(LOG_TAG_PREINITIALIZE_VARIABLE, 'Setting up variables...');

// -----------------------------------------------------------------------------
// #### Pre-Initialize - Variable - Path
// -----------------------------------------------------------------------------

const LOG_TAG_PATH = '[🧭 Path]';

const LOG_TAG_PREINITIALIZE_VARIABLE_PATH = LOG_TAG_PREINITIALIZE_VARIABLE + ' ' + LOG_TAG_PATH;

console.log(LOG_TAG_PREINITIALIZE_VARIABLE_PATH, 'Defining common project paths...');

const PATH_DIR_ROOT = `${NODE_CURE_PATH.absolute(__dirname)}/`;
const PATH_DIR_ROOT_CONFIG = `${PATH_DIR_ROOT}config/`;
const PATH_DIR_ROOT_CONFIG_DEFAULT = `${PATH_DIR_ROOT_CONFIG}default/`;
const PATH_DIR_ROOT_CONFIG_DEFAULT_PROJECT = `${PATH_DIR_ROOT_CONFIG_DEFAULT}project/`;
const PATH_DIR_ROOT_SOURCE = `${PATH_DIR_ROOT}source/`;
const PATH_DIR_ROOT_SOURCE_PROJECT = `${PATH_DIR_ROOT_SOURCE}project/`;
const PATH_DIR_ROOT_SOURCE_RESOURCE = `${PATH_DIR_ROOT_SOURCE}resource/`;
const PATH_DIR_ROOT_SOURCE_NODE_MODULES_CUSTOM = `${PATH_DIR_ROOT_SOURCE}node_modules_custom/`;

console.log(LOG_TAG_PREINITIALIZE_VARIABLE_PATH, 'Project paths are ready.');

console.log(LOG_TAG_PREINITIALIZE_VARIABLE, 'Variable setup complete.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Utility
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_UTILITY = LOG_TAG_PREINITIALIZE + ' [🧰 Utility]';

console.log(LOG_TAG_PREINITIALIZE_UTILITY, 'Loading utility helpers...');

// -----------------------------------------------------------------------------
// #### Pre-Initialize - Utility - Cure Log
// -----------------------------------------------------------------------------

const LOG_TAG_LOG = '[📜 Log]';
const LOG_TAG_PREINITIALIZE_UTILITY_LOG = LOG_TAG_PREINITIALIZE_UTILITY + ' ' + LOG_TAG_LOG;

console.log(LOG_TAG_PREINITIALIZE_UTILITY_LOG, 'Creating logger instance...');

const NODE_CURE_LOG = require('@custom/cure-log');
let log = new NODE_CURE_LOG.Log({
  filePath: {
    log: `${PATH_DIR_ROOT}_log/gulpfile.log`
  }
});

// register hub log
const NODE_CURE_LOG_HUB = require('@custom/cure-log-hub');

// Make it the app-wide default (so any module that didn't get a per-ns injection uses it)
NODE_CURE_LOG_HUB.setRoot(log);

log.init(LOG_TAG_PREINITIALIZE_UTILITY_LOG, 'Instantiated.');

log.init(LOG_TAG_PREINITIALIZE, 'Continuing...');

// -----------------------------------------------------------------------------
// ##### Pre-Initialize - Utility - Cure Log - Gulp
// -----------------------------------------------------------------------------

const LOG_TAG_GULP = '[🥤 Gulp]';

const LOG_TAG_PREINITIALIZE_UTILITY_LOG_GULP = LOG_TAG_PREINITIALIZE_UTILITY_LOG + ' ' + LOG_TAG_GULP;

log.begin(LOG_TAG_PREINITIALIZE_UTILITY_LOG_GULP, 'Attaching...');

require('@custom/cure-log-gulp').attach();

log.end(LOG_TAG_PREINITIALIZE_UTILITY_LOG_GULP, 'Attached.');

log.end(LOG_TAG_PREINITIALIZE_UTILITY, 'Complete.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Library (Post Log)
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_LIBRARY_POST_LOG = LOG_TAG_PREINITIALIZE_LIBRARY + ' (Post Log)';

log.begin(LOG_TAG_PREINITIALIZE_LIBRARY_POST_LOG, 'Loading...');

const NODE_CURE_JSON = require('@custom/cure-json');

// -----------------------------------------------------------------------------
// #### Pre-Initialize - Library (Post Log) - Path
// -----------------------------------------------------------------------------

const LOG_TAG_PATH_EXIST = '[🔍 Path Exist]';

function libraryPathRelativeProjectRoot(path) {
  return NODE_CURE_PATH.relative(PATH_DIR_PROJECT, path)
}

/**
 * Check whether a given path points to an existing file on disk.
 *
 * @param {string} path
 * @returns {boolean} true if the path exists and is a regular file; false otherwise.
 */
function libraryPathIsFile(path) {
  log.debug(LOG_TAG_PATH_EXIST, 'Checking if path is file:', { path });

  /** @type {boolean} */
  let RESULT = false;

  try {
    const stat = NODE_FS.statSync(path); // or lstatSync if you care about symlinks separately
    RESULT = stat.isFile();
  } catch (error) {
    // ENOENT: path does not exist; anything else is worth logging.
    if (!error || error.code !== 'ENOENT') {
      log.warn(LOG_TAG_PATH_EXIST, 'Error while checking if path is file:', {
        path,
        code: error && error.code,
        message: error && error.message
      });
    }
    RESULT = false;
  }

  log.debug(LOG_TAG_PATH_EXIST, 'Checked if path is file:', { path, RESULT });

  return RESULT;
}

function libraryPathExists(path) {
  log.debug(LOG_TAG_PATH_EXIST, 'Checking path existence:', {path});

  if (!NODE_FS.existsSync(path)) {
    log.notice(LOG_TAG_PATH_EXIST, 'Path not found:', {path});
    return false;
    // return Readable({ objectMode: true }).push(null); // returns an empty pipeline, for use in a pipeline
  }

  log.debug(LOG_TAG_PATH_EXIST, 'Path found:', {path});

  return true;
}

log.end(LOG_TAG_PREINITIALIZE_LIBRARY_POST_LOG, 'Loaded.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Path
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_ENVIRONMENT = LOG_TAG_PREINITIALIZE + ' [🌱 Environment]';

// -----------------------------------------------------------------------------
// #### Pre-Initialize - Path - Node Module
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_ENVIRONMENT_NODE_JS = LOG_TAG_PREINITIALIZE_ENVIRONMENT + ' ' + LOG_TAG_NODE_JS;

log.begin(LOG_TAG_PREINITIALIZE_ENVIRONMENT_NODE_JS, 'Initializing...');

;(() => {
  const NODE_OS = require("os");

  // Determine the platform
  const PLATFORM_CURRENT = NODE_OS.platform(); // 'win32' for Windows, 'linux' for Linux

  // Define the custom node_modules path based on OS
  let PATH_DIR_ROOT_SOURCE_NODE_MODULES;
  if (PLATFORM_CURRENT === 'win32') {
    PATH_DIR_ROOT_SOURCE_NODE_MODULES = `${PATH_DIR_ROOT}source/node_modules/windows/`;
  } else if (PLATFORM_CURRENT === 'linux') {
    PATH_DIR_ROOT_SOURCE_NODE_MODULES = `${PATH_DIR_ROOT}source/node_modules/linux/`;
  } else {
    throw new Error(`Unsupported platform: ${PLATFORM_CURRENT}`);
  }

  // Update NODE_PATH
  process.env.NODE_PATH = [
    PATH_DIR_ROOT_SOURCE_NODE_MODULES,
    PATH_DIR_ROOT_SOURCE_NODE_MODULES_CUSTOM,
    ...(process.env.NODE_PATH ? process.env.NODE_PATH.split(NODE_PATH.delimiter) : [])
  ].filter(Boolean).join(NODE_PATH.delimiter);

  const NODE_MODULE = /** @type {any} */ (require('module'));
  if (typeof NODE_MODULE._initPaths === 'function') NODE_MODULE._initPaths();

  // TODO: find a safer alternative to NODE_MODULE._initPaths
  // // Replace any direct Module() or _initPaths() use with this pattern
  // const NODE_MODULE = require('module');
  // /** @type {(path: string) => NodeRequire} */
  // const createRequire =
  //   (NODE_MODULE.createRequire || NODE_MODULE.createRequireFromPath /* old Node */).bind(NODE_MODULE);
  // // Example: require as if from project root (choose a stable anchor file)
  // const requireFromProject = createRequire(PATH_DIR_PROJECT + 'package.json');
  // // use requireFromProject('some-local-module') as needed

  log.debug(LOG_TAG_PREINITIALIZE_ENVIRONMENT_NODE_JS, 'process.env.NODE_PATH:', (process.env.NODE_PATH || '').split(';'));
})();

log.end(LOG_TAG_PREINITIALIZE_ENVIRONMENT_NODE_JS, 'Complete.');

// -----------------------------------------------------------------------------
// #### Pre-Initialize - Path - Process Environment
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_ENVIRONMENT_PATH = LOG_TAG_PREINITIALIZE_ENVIRONMENT + ' ' + LOG_TAG_PATH;

log.begin(LOG_TAG_PREINITIALIZE_ENVIRONMENT_PATH, 'Initializing...');

;(() => {
  const NODE_OS = require('os');
  const NODE_PROCESS = require('process');

  // Determine platform-specific GraphicsMagick binary path
  const PLATFORM_CURRENT = NODE_OS.platform(); // 'win32' for Windows, 'linux' for Linux
  let pathDirGraphicsMagick = '';

  // Add GraphicsMagick path to the environment's PATH variable
  if (PLATFORM_CURRENT === 'win32') {
    pathDirGraphicsMagick = NODE_CURE_PATH.join(PATH_DIR_ROOT, './source/tool/graphicsmagick/windows');
  } else if (PLATFORM_CURRENT === 'linux') {
    // FIXME Issue: "Add static GraphicsMagick for Linux #81"
    // pathDirGraphicsMagick = NODE_CURE_PATH.join(PATH_DIR_ROOT, './source/tool/graphicsmagick/linux/bin');
  } else {
    throw new Error(ANSI.format(ANSI.fg.red, 'Unsupported platform. Only Windows and Linux are supported.'));
  }

  log.info(LOG_TAG_PREINITIALIZE_ENVIRONMENT_PATH, 'Looking for local GraphicsMagick for watermark support...');

  // Normalize path separators
  pathDirGraphicsMagick = pathDirGraphicsMagick.split(NODE_PATH.sep).join("/");

  if (pathDirGraphicsMagick) {
    // Check if the path exists before adding to PATH
    if (NODE_FS.existsSync(pathDirGraphicsMagick)) {
      const pathDelimiter = PLATFORM_CURRENT === "win32" ? ";" : ":";
      NODE_PROCESS.env.PATH = `${pathDirGraphicsMagick}${pathDelimiter}${NODE_PROCESS.env.PATH}`;
      log.success(LOG_TAG_PREINITIALIZE_ENVIRONMENT_PATH, 'GraphicsMagick local path added to process.env.PATH:', {pathDirGraphicsMagick});
    } else {
      log.notice(LOG_TAG_PREINITIALIZE_ENVIRONMENT_PATH, 'GraphicsMagick local path not found:', {pathDirGraphicsMagick});
    }
  } else {
    log.notice(LOG_TAG_PREINITIALIZE_ENVIRONMENT_PATH, 'No local GraphicsMagick path to add, will attempt to use a global installation for watermark support.');
  }

  log.debug(LOG_TAG_PREINITIALIZE_ENVIRONMENT_PATH, 'process.env.PATH:', (process.env.PATH || '').split(NODE_PATH.delimiter));
})();

log.end(LOG_TAG_PREINITIALIZE_ENVIRONMENT_PATH, 'Complete.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Default
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_DEFAULTS = LOG_TAG_PREINITIALIZE + ' [📝 Defaults]';

log.begin(LOG_TAG_PREINITIALIZE_DEFAULTS, 'Running...');

// Ensure config is initialized before anything else
(require('@custom/compiler-default')).configEnsure();

log.end(LOG_TAG_PREINITIALIZE_DEFAULTS, 'Complete.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - CLI
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_CLI = LOG_TAG_PREINITIALIZE + ' [💻 CLI]';

log.begin(LOG_TAG_PREINITIALIZE_CLI, 'Parsing...');

const GULP_CLI_ARGV = process.argv.slice(2);

function _stripMatchingOuterQuotes(value = '') {
  const text = String(value ?? '').trim();
  if (text.length < 2) return text;

  const first = text[0];
  const last = text[text.length - 1];
  if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
    return text.slice(1, -1).trim();
  }
  return text;
}

function _pathToForwardSlashes(value = '') {
  return String(value ?? '').replace(/\\/g, '/');
}

function _normalizeProjectPathValue(value = '') {
  return _pathToForwardSlashes(_stripMatchingOuterQuotes(value));
}

function _readPossiblyQuotedValue(argv = [], startIndex = 0) {
  const firstRaw = String(argv[startIndex] ?? '').trim();
  if (!firstRaw) {
    return { value: '', endIndex: startIndex };
  }

  const quote = firstRaw[0];
  const isQuoted = quote === '"' || quote === "'";
  if (!isQuoted) {
    return { value: _normalizeProjectPathValue(firstRaw), endIndex: startIndex };
  }

  const closesHere = firstRaw.length >= 2 && firstRaw[firstRaw.length - 1] === quote;
  if (closesHere) {
    return { value: _normalizeProjectPathValue(firstRaw), endIndex: startIndex };
  }

  let combined = firstRaw;
  let endIndex = startIndex;

  for (let i = startIndex + 1; i < argv.length; i += 1) {
    const piece = String(argv[i] ?? '');
    combined += ` ${piece}`;
    endIndex = i;

    const trimmed = piece.trim();
    if (trimmed.endsWith(quote)) break;
  }

  return { value: _normalizeProjectPathValue(combined), endIndex };
}

function _readInlineMaybeQuotedValue(argv = [], token = '', index = 0, prefix = '') {
  const initial = String(token ?? '').slice(prefix.length).trim();
  if (!initial) return { value: '', endIndex: index };

  const quote = initial[0];
  const isQuoted = quote === '"' || quote === "'";
  if (!isQuoted) {
    return { value: _normalizeProjectPathValue(initial), endIndex: index };
  }

  const closesHere = initial.length >= 2 && initial[initial.length - 1] === quote;
  if (closesHere) {
    return { value: _normalizeProjectPathValue(initial), endIndex: index };
  }

  let combined = initial;
  let endIndex = index;

  for (let i = index + 1; i < argv.length; i += 1) {
    const piece = String(argv[i] ?? '');
    combined += ` ${piece}`;
    endIndex = i;

    const trimmed = piece.trim();
    if (trimmed.endsWith(quote)) break;
  }

  return { value: _normalizeProjectPathValue(combined), endIndex };
}

function _parseProjectPathArg(argv = []) {
  const consumedIndices = new Set();
  let projectPathRaw = '';

  for (let i = 0; i < argv.length; i += 1) {
    const token = String(argv[i] ?? '');

    if (!token) continue;

    if (token === '--project' || token === '--project-dir') {
      consumedIndices.add(i);
      const { value: next, endIndex } = _readPossiblyQuotedValue(argv, i + 1);
      if (!next || next.startsWith('-')) {
        log.fatal(LOG_TAG_PREINITIALIZE_CLI, 'Missing path value for --project.', { argv });
      }
      projectPathRaw = next;
      for (let j = i + 1; j <= endIndex; j += 1) consumedIndices.add(j);
      i = endIndex;
      continue;
    }

    if (token.startsWith('--project=')) {
      consumedIndices.add(i);
      const { value, endIndex } = _readInlineMaybeQuotedValue(argv, token, i, '--project=');
      projectPathRaw = value;
      for (let j = i + 1; j <= endIndex; j += 1) consumedIndices.add(j);
      i = endIndex;
      continue;
    }

    if (token.startsWith('--project-dir=')) {
      consumedIndices.add(i);
      const { value, endIndex } = _readInlineMaybeQuotedValue(argv, token, i, '--project-dir=');
      projectPathRaw = value;
      for (let j = i + 1; j <= endIndex; j += 1) consumedIndices.add(j);
      i = endIndex;
      continue;
    }
  }

  return { projectPathRaw, consumedIndices };
}

const GULP_CLI_PROJECT = _parseProjectPathArg(GULP_CLI_ARGV);

// Remove project-path CLI fragments from process.argv so gulp-cli task parsing
// cannot misinterpret split quoted path tokens as task names.
const GULP_CLI_ARGV_SANITIZED = GULP_CLI_ARGV.filter((_, index) => {
  return !GULP_CLI_PROJECT.consumedIndices.has(index);
});
process.argv = [process.argv[0], process.argv[1], ...GULP_CLI_ARGV_SANITIZED];

log.debug(LOG_TAG_PREINITIALIZE_CLI, 'Parsed CLI args:', {
  argv: GULP_CLI_ARGV,
  argvSanitized: GULP_CLI_ARGV_SANITIZED,
  consumedIndices: Array.from(GULP_CLI_PROJECT.consumedIndices.values()),
  projectPathRaw: GULP_CLI_PROJECT.projectPathRaw || null
});

log.end(LOG_TAG_PREINITIALIZE_CLI, 'Parsed.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - Settings
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_SETTINGS = LOG_TAG_PREINITIALIZE + ' [⚙️ Settings]';

log.begin(LOG_TAG_PREINITIALIZE_SETTINGS, 'Loading...');

const PATH_FILE_ROOT_CONFIG_SETTINGS = NODE_CURE_PATH.join(PATH_DIR_ROOT_CONFIG, 'settings.json');

log.info(LOG_TAG_PREINITIALIZE_SETTINGS, 'Settings fallback file:', { file: PATH_FILE_ROOT_CONFIG_SETTINGS });

/** Holds `config/settings.json` content */
const configSettings = (() => {
  if (GULP_CLI_PROJECT.projectPathRaw) {
    log.notice(
      LOG_TAG_PREINITIALIZE_SETTINGS,
      'Skipping settings.json load because project path was provided by CLI.',
      { projectPathRaw: GULP_CLI_PROJECT.projectPathRaw }
    );
    return {};
  }

  try {
    log.info(LOG_TAG_PREINITIALIZE_SETTINGS, 'Reading settings file:', { file: PATH_FILE_ROOT_CONFIG_SETTINGS });
    // validator/loader (keeps error UX consistent)
    return NODE_CURE_JSON.load(PATH_FILE_ROOT_CONFIG_SETTINGS, { fatal: true });
  } catch (err) {
    log.fatal(
      LOG_TAG_PREINITIALIZE_SETTINGS,
      'Failed to load settings.json',
      { file: PATH_FILE_ROOT_CONFIG_SETTINGS, err: String(err?.message || err) }
    );
    return undefined; // In case log.fatal doesn't throw/exit
  }
})();

log.end(LOG_TAG_PREINITIALIZE_SETTINGS, 'Settings loaded.');

// -----------------------------------------------------------------------------
// #### Pre-Initialize - Settings - Get Project
// -----------------------------------------------------------------------------

const LOG_TAG_PROJECT = '[🏗️ Project]';

const LOG_TAG_PREINITIALIZE_SETTINGS_PROJECT = LOG_TAG_PREINITIALIZE_SETTINGS + ' ' + LOG_TAG_PROJECT;

log.begin(LOG_TAG_PREINITIALIZE_SETTINGS_PROJECT, 'Resolving project directory...');

// Inline resolution with no top-level temps (arrow IIFE)
const PATH_DIR_PROJECT = (() => {
  let dirPath = '';
  let source = '';

  if (GULP_CLI_PROJECT.projectPathRaw) {
    dirPath = String(GULP_CLI_PROJECT.projectPathRaw).trim();
    source = 'cli(--project)';

    // Resolve relative CLI paths from caller working directory.
    if (!NODE_PATH.isAbsolute(dirPath)) {
      dirPath = NODE_CURE_PATH.absolute(process.cwd(), dirPath);
    }
  } else {
    const recents = Array.isArray(configSettings?.dir_recent)
      ? configSettings.dir_recent.filter(Boolean)
      : [];

    if (recents.length === 0) {
      log.fatal(
        LOG_TAG_PREINITIALIZE_SETTINGS_PROJECT,
        'No recent project directories configured (settings.json -> dir_recent is empty).',
        { file: PATH_FILE_ROOT_CONFIG_SETTINGS }
      );
    }

    dirPath = String(recents[0] ?? '').trim();
    if (!dirPath) {
      log.fatal(
        LOG_TAG_PREINITIALIZE_SETTINGS_PROJECT,
        'dir_recent[0] is empty.',
        { file: PATH_FILE_ROOT_CONFIG_SETTINGS }
      );
    }

    // Resolve settings relative to gulpfile directory
    if (!NODE_PATH.isAbsolute(dirPath)) {
      dirPath = NODE_CURE_PATH.absolute(__dirname, dirPath);
    }
    source = 'settings.json(dir_recent[0])';
  }

  // Validate existence
  if (!libraryPathExists(dirPath)) {
    log.fatal(
      LOG_TAG_PREINITIALIZE_SETTINGS_PROJECT,
      'Configured project path does not exist.',
      { resolved: dirPath, source }
    );
  }

  // Ensure trailing slash
  if (!/[\\/]$/.test(dirPath)) {
    dirPath += '/';
  }

  log.success(
    LOG_TAG_PREINITIALIZE_SETTINGS_PROJECT,
    'Found current project directory:',
    { path: dirPath, source }
  );

  return dirPath;
})();

log.success(
  LOG_TAG_PREINITIALIZE_SETTINGS_PROJECT,
  'Instantiated:',
  { PATH_DIR_PROJECT }
);

log.end(LOG_TAG_PREINITIALIZE_SETTINGS_PROJECT, 'Current project directory resolved.');

// -----------------------------------------------------------------------------
// #### Pre-Initialize - Project - Log
// -----------------------------------------------------------------------------

const LOG_TAG_PREINITIALIZE_PROJECT_LOG = LOG_TAG_PREINITIALIZE + ' ' + LOG_TAG_PROJECT + ' ' + LOG_TAG_LOG;

log.begin(LOG_TAG_PREINITIALIZE_PROJECT_LOG, 'Resolving project log file...');

const GULP_ARG_TASK = GULP_CLI_ARGV_SANITIZED.filter((arg) => {
  return !String(arg).startsWith('-');
});

log.debug(LOG_TAG_PREINITIALIZE_PROJECT_LOG, 'Gulp task arguments:', {
  GULP_ARG_TASK
});

/**
 * Joined task name and turn any potential path such as `C:\path\to\directory` into `C__path_to_directory`.
 * Colon and slashes each become `_` (so `C:\` → `C__`), spaces → `_`.
 */
const GULP_TASK_NAME = GULP_ARG_TASK.map((input) => {
  return String(input)
    .replace(/[:\\\/\.]/g, '_')   // each ":" "\" "/" "." → "_"
    .replace(/\s+/g, '_');        // spaces → "_"
}).join('_');

log.debug(LOG_TAG_PREINITIALIZE_PROJECT_LOG, 'Gulp task name formatted:', {
  GULP_TASK_NAME
});

const PATH_FILE_PROJECT_LOG = `${PATH_DIR_PROJECT}_log/task_${GULP_TASK_NAME}.log`;
// TODO: when able to run compiler tasks independent of project, choose final log destination based on createTask project boolean value (false = compiler root - this variable path value, true/default = project root)
// const PATH_FILE_ROOT_LOG = `${PATH_DIR_ROOT}_log/task_${GULP_TASK_NAME}.log`;

log.success(LOG_TAG_PREINITIALIZE_PROJECT_LOG, 'Project log file:', {
  PATH_FILE_PROJECT_LOG
});

log.end(LOG_TAG_PREINITIALIZE_PROJECT_LOG, 'Project log file resolved.');

// -----------------------------------------------------------------------------
// ### Pre-Initialize - End
// -----------------------------------------------------------------------------

log.init(LOG_TAG_PREINITIALIZE, 'Complete.');

log.shutdown(LOG_TAG_PREINITIALIZE, 'Switching to log in project:', {
  filepath: PATH_FILE_PROJECT_LOG
});

log.close({reason: 'Switching to log in project (see above).'});

// =============================================================================
// ## Initialize
// =============================================================================

const LOG_TAG_INITIALIZE = '[🔧 Initialize]';

console.log(LOG_TAG_INITIALIZE, 'Starting initialize phase...');

// -----------------------------------------------------------------------------
// ### Initialize - Project
// -----------------------------------------------------------------------------

const LOG_TAG_INITIALIZE_PROJECT = LOG_TAG_INITIALIZE + ' ' + LOG_TAG_PROJECT;

console.log(LOG_TAG_INITIALIZE_PROJECT, 'Initializing project context...');

// -----------------------------------------------------------------------------
// #### Initialize - Project - Log
// -----------------------------------------------------------------------------

const LOG_TAG_INITIALIZE_PROJECT_LOG = LOG_TAG_INITIALIZE_PROJECT + ' ' + LOG_TAG_LOG;

console.log(LOG_TAG_INITIALIZE_PROJECT_LOG, 'Creating project logger...');

const PATH_FILE_ROOT_CONFIG_DEFAULT_LOG = NODE_CURE_PATH.join(PATH_DIR_ROOT_CONFIG, 'default', 'log.json');
const PATH_FILE_ROOT_CONFIG_LOG = NODE_CURE_PATH.join(PATH_DIR_ROOT_CONFIG, 'log.json');
const PATH_FILE_PROJECT_CONFIG_LOG = NODE_CURE_PATH.join(PATH_DIR_PROJECT, 'log.json');
const USE_PROJECT_LOG_CONFIG = libraryPathIsFile(PATH_FILE_PROJECT_CONFIG_LOG);
const PATH_FILE_ACTIVE_CONFIG_LOG = USE_PROJECT_LOG_CONFIG
  ? PATH_FILE_PROJECT_CONFIG_LOG
  : PATH_FILE_ROOT_CONFIG_LOG;

// log = new NODE_CURE_LOG.Log();
log = new NODE_CURE_LOG.Log({
  filePath: {
    log: PATH_FILE_PROJECT_LOG,
    config: PATH_FILE_ACTIVE_CONFIG_LOG
  }
});

// Make it the app-wide default (so any module that didn't get a per-ns injection uses it)
NODE_CURE_LOG_HUB.setRoot?.(log);

log.init(LOG_TAG_INITIALIZE_PROJECT_LOG, 'Instantiated.');
log.info(LOG_TAG_INITIALIZE_PROJECT_LOG, 'Logger config selected:', {
  source: USE_PROJECT_LOG_CONFIG ? 'project log.json' : 'root config/log.json',
  path: PATH_FILE_ACTIVE_CONFIG_LOG
});

log.end(LOG_TAG_INITIALIZE_PROJECT, 'Complete.');

// -----------------------------------------------------------------------------
// ### Initialize - Continue
// -----------------------------------------------------------------------------

log.init(LOG_TAG_INITIALIZE, 'Continuing...');

// -----------------------------------------------------------------------------
// #### Initialize - Project - Continue
// -----------------------------------------------------------------------------

log.init(LOG_TAG_INITIALIZE_PROJECT, 'Continuing...');

// -----------------------------------------------------------------------------
// #### Initialize - Project - Path
// -----------------------------------------------------------------------------

const LOG_TAG_INITIALIZE_PROJECT_PATH = LOG_TAG_INITIALIZE_PROJECT + ' ' + LOG_TAG_PATH;

log.begin(LOG_TAG_INITIALIZE_PROJECT_PATH, 'Instantiating...');

const PATH_FILE_CONFIG_PROJECT = `${PATH_DIR_PROJECT}config.json`;
const PATH_DIR_PROJECT_IN = `${PATH_DIR_PROJECT}in/`;

const PATH_DIR_PROJECT_CACHE_PROJECT = `${PATH_DIR_PROJECT}_cache/project/`;
const PATH_FILE_PROJECT_CACHE_FILE = `${PATH_DIR_PROJECT_CACHE_PROJECT}file.json`;
const PATH_FILE_PROJECT_CACHE_IMAGE = `${PATH_DIR_PROJECT_CACHE_PROJECT}image_dimension.json`;

// HTML tag manifest used by sitemap/package
const PATH_FILE_PROJECT_HTML_TAG_MANIFEST = `${PATH_DIR_PROJECT_CACHE_PROJECT}manifest_html_tags.json`;

const PATH_DIR_PROJECT_CACHE_STATICUS = `${PATH_DIR_PROJECT}_cache/compiler/`;
const PATH_FILE_PROJECT_CACHE_STATICUS = `${PATH_DIR_PROJECT_CACHE_STATICUS}file.json`;

log.success(LOG_TAG_PATH, 'Instantiated:', {
  "PATH_FILE_CONFIG_PROJECT": PATH_FILE_CONFIG_PROJECT,
  "PATH_DIR_PROJECT_IN": PATH_DIR_PROJECT_IN
});

log.end(LOG_TAG_INITIALIZE_PROJECT_PATH, 'Instantiated.');

// -----------------------------------------------------------------------------
// #### Initialize - Project - Info
// -----------------------------------------------------------------------------

const LOG_TAG_INFO = '[🧾 Info]';
const LOG_TAG_INITIALIZE_PROJECT_INFO = LOG_TAG_INITIALIZE_PROJECT + ' ' + LOG_TAG_INFO;

log.begin(LOG_TAG_INITIALIZE_PROJECT_INFO, 'Loading...');

const LOG_TAG_PROJECT_INFO = LOG_TAG_PROJECT + ' ' + LOG_TAG_INFO;

const CONFIG_INFO = require(NODE_CURE_PATH.join(PATH_DIR_ROOT, `source/resource/info.json`));
const PATH_FILE_CONFIG_PROJECT_INFO = NODE_CURE_PATH.join(PATH_DIR_PROJECT, `info.json`);

let configProjectInfo = {};

function _updateProjectInfo() {
  log.begin(LOG_TAG_PROJECT_INFO, 'Update...');

  log.info(LOG_TAG_PROJECT_INFO, 'Updating project info:', {
    'Current': configProjectInfo || 'None',
    'New': CONFIG_INFO
  });

  NODE_CURE_JSON.save(
    PATH_FILE_CONFIG_PROJECT_INFO,
    CONFIG_INFO
  );

  configProjectInfo = CONFIG_INFO;

  log.success(LOG_TAG_PROJECT_INFO, 'Updated project info:', configProjectInfo);
  log.end(LOG_TAG_PROJECT_INFO, 'Update complete.');
}

;(() => {
  log.info(LOG_TAG_PROJECT_INFO, 'Checking project version...');

  if (!NODE_FS.existsSync(PATH_FILE_CONFIG_PROJECT_INFO)) {
    _updateProjectInfo();
  }
  else {
    configProjectInfo = require(PATH_FILE_CONFIG_PROJECT_INFO);
  }

  log.debug(LOG_TAG_PROJECT_INFO, {configProjectInfo});
})();

log.end(LOG_TAG_INITIALIZE_PROJECT_INFO, 'Loaded.');

// -----------------------------------------------------------------------------
// #### Initialize - Project - Config (Pre Version)
// -----------------------------------------------------------------------------

const LOG_TAG_CONFIG = '[⚙️ Config]';
const LOG_TAG_INITIALIZE_PROJECT_CONFIG = LOG_TAG_INITIALIZE_PROJECT + ' ' + LOG_TAG_CONFIG;
const LOG_TAG_INITIALIZE_PROJECT_CONFIG_PRE_VERSION = LOG_TAG_INITIALIZE_PROJECT + ' ' + LOG_TAG_INITIALIZE_PROJECT_CONFIG + ' (Pre Version)';

log.begin(LOG_TAG_INITIALIZE_PROJECT_CONFIG_PRE_VERSION, 'Running...');

// -----------------------------------------------------------------------------
// ##### Initialize - Project - Config (Pre Version) - Defaults
// -----------------------------------------------------------------------------

const LOG_TAG_DEFAULT = '[📝 Default]';
const LOG_TAG_INITIALIZE_PROJECT_CONFIG_PRE_VERSION_DEFAULT = LOG_TAG_INITIALIZE_PROJECT_CONFIG_PRE_VERSION + ' ' + LOG_TAG_DEFAULT;

log.begin(LOG_TAG_INITIALIZE_PROJECT_CONFIG_PRE_VERSION_DEFAULT, 'Loading...');

// Load default project config once
const CONFIG_PROJECT_DEFAULT = NODE_CURE_JSON.load(`${PATH_DIR_ROOT_CONFIG_DEFAULT_PROJECT}config.json`);

log.end(LOG_TAG_INITIALIZE_PROJECT_CONFIG_PRE_VERSION_DEFAULT, 'Loaded.');

// -----------------------------------------------------------------------------
// ##### Initialize - Project - Config (Pre Version) - End
// -----------------------------------------------------------------------------

log.end(LOG_TAG_INITIALIZE_PROJECT_CONFIG_PRE_VERSION, 'Complete.');

// -----------------------------------------------------------------------------
// #### Initialize - Project - Version
// -----------------------------------------------------------------------------

const LOG_TAG_VERSION = '[🔖 Version]'
const LOG_TAG_INITIALIZE_PROJECT_VERSION = LOG_TAG_INITIALIZE_PROJECT + ' ' + LOG_TAG_VERSION;

const LOG_TAG_PROJECT_VERSION = LOG_TAG_PROJECT + ' ' + LOG_TAG_VERSION;
const LOG_TAG_PROJECT_VERSION_CHECK = LOG_TAG_PROJECT_VERSION + ' [✅ Check]';
const LOG_TAG_PROJECT_VERSION_UPGRADE = LOG_TAG_PROJECT_VERSION + ' [🔼 Upgrade]';
const LOG_TAG_PROJECT_VERSION_MIGRATION = LOG_TAG_PROJECT_VERSION + ' [📦 Migration]';

log.begin(LOG_TAG_INITIALIZE_PROJECT_VERSION, 'Checking compatibility...');

// -------------------------------------
// Helpers
// -------------------------------------

const {
  VERSION_COMPARE,
  getVersionCompareObject: _getVersionCompareObject,
  compareVersions: _compareVersions,
  semverLt: _semverLt,
  semverLe: _semverLe,
  semverEq: _semverEq
} = require('@custom/compiler-version');

let versionInfo = {
  project: '0.0.0',
  current: CONFIG_INFO.version,
  status: _getVersionCompareObject(VERSION_COMPARE.EQUAL)
};

function _updateVersionInfo() {
  versionInfo.project = configProjectInfo.version;
  versionInfo.status = _getVersionCompareObject(_compareVersions(versionInfo.project, versionInfo.current));
}

// Persist project info version after each migration step
async function _persistProjectVersion(newVersion) {
  configProjectInfo.version = newVersion;
  const NODE_CURE_FS = require('@custom/cure-fs');
  await NODE_CURE_FS.writeFileAsync(PATH_FILE_CONFIG_PROJECT_INFO, JSON.stringify(configProjectInfo, null, 2));
  log.success(LOG_TAG_PROJECT_INFO, 'Project info updated:', { version: newVersion });
}

// // Create a timestamped backup dir for risky moves (optional but recommended)
// function makeBackupDir() {
//   const stamp = new Date().toISOString().replace(/[:.]/g, '-');
//   return NODE_CURE_PATH.join(PATH_DIR_PROJECT, `_backup/_upgrade_${stamp}`);
// }

/**
 * Move (rename) a file OR directory if it exists.
 *
 * Rules:
 * - If source does not exist: no-op.
 * - If destination exists: warn + no-op (prevents accidental merges/clobber).
 * - Handles EXDEV (cross-device) by fallback to copy+delete.
 *
 * @param {string} oldPath
 * @param {string} newPath
 * @param {{ kind?: 'file'|'dir'|'any' }} [options]
 */
async function _movePathIfExistsMigration(oldPath, newPath, options = {}) {
  const NODE_FS = require('fs');
  const NODE_PATH = require('path');

  const kind = options.kind || 'any';

  /** @returns {Promise<null|'file'|'dir'>} */
  async function statKind(p) {
    try {
      const st = await NODE_FS.promises.stat(p);
      if (st.isDirectory()) return 'dir';
      if (st.isFile()) return 'file';
      return null;
    } catch {
      return null;
    }
  }

  const srcKind = await statKind(oldPath);
  if (!srcKind) return;
  if (kind !== 'any' && srcKind !== kind) return;

  const dstKind = await statKind(newPath);
  if (dstKind) {
    log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Destination already exists; skipping move:', {
      oldPath,
      newPath,
      srcKind,
      dstKind
    });
    return;
  }

  // Ensure parent directory exists
  const parent = NODE_PATH.dirname(newPath);
  try {
    await NODE_FS.promises.mkdir(parent, { recursive: true });
  } catch (_) {}

  const label = (srcKind === 'dir') ? 'directory' : 'file';
  log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, `Moving ${label}:`, { oldPath, newPath });

  try {
    await NODE_FS.promises.rename(oldPath, newPath);
  } catch (err) {
    if (err && err.code === 'EXDEV') {
      // Cross-device fallback
      if (srcKind === 'file') {
        await NODE_FS.promises.copyFile(oldPath, newPath);
        await NODE_CURE_FS.deleteAsync([oldPath], { force: true });
      } else {
        // Directory EXDEV fallback: copy recursively then remove source
        await NODE_FS.promises.cp(oldPath, newPath, { recursive: true });
        await NODE_CURE_FS.deleteAsync([oldPath], { force: true });
      }
    } else {
      throw err;
    }
  }
}

/**
 * Back-compat wrapper: keep any existing call sites working.
 * @param {string} oldPath
 * @param {string} newPath
 */
async function _moveFileIfExistsMigration(oldPath, newPath) {
  await _movePathIfExistsMigration(oldPath, newPath, { kind: 'file' });
}

/**
 * Back-compat wrapper: keep any existing call sites working.
 * @param {string} oldPath
 * @param {string} newPath
 */
async function _moveDirIfExistsMigration(oldPath, newPath) {
  await _movePathIfExistsMigration(oldPath, newPath, { kind: 'dir' });
}

/**
 * Recursively collect files below `dir` that match one of the provided extensions.
 *
 * @param {string} dir
 * @param {string[]} exts
 * @param {string[]} [out]
 * @returns {Promise<string[]>}
 * @since 1.1.5
 */
async function _collectFilesByExtensionRecursive(dir, exts, out = []) {
  if (!NODE_FS.existsSync(dir)) return out;

  const extSet = new Set((exts || []).map((ext) => String(ext || '').toLowerCase()));
  const entries = await NODE_FS.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const abs = NODE_CURE_PATH.join(dir, entry.name);

    if (entry.isDirectory()) {
      await _collectFilesByExtensionRecursive(abs, exts, out);
      continue;
    }

    if (extSet.has(NODE_PATH.extname(entry.name).toLowerCase())) {
      out.push(abs);
    }
  }

  return out;
}

/**
 * Remove empty directories under a root, bottom-up.
 *
 * @param {string} dir
 * @returns {Promise<boolean>}
 * @since 1.1.5
 */
async function _removeEmptyDirectoriesRecursive(dir) {
  if (!NODE_FS.existsSync(dir)) return true;

  const entries = await NODE_FS.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    await _removeEmptyDirectoriesRecursive(NODE_CURE_PATH.join(dir, entry.name));
  }

  const remaining = await NODE_FS.promises.readdir(dir);
  if (remaining.length > 0) return false;

  await NODE_FS.promises.rmdir(dir);
  return true;
}

/**
 * Move legacy Handlebars files from `_html/config/template/` into `_html/config/`.
 *
 * Rules:
 * - Preserve nested relative paths below `template/`.
 * - If the destination file already exists with identical content, remove the legacy source.
 * - If the destination file exists with different content, keep the legacy source and log a warning.
 *
 * @returns {Promise<{ moved:number, deduped:number, conflicts:number }>}
 * @since 1.1.5
 */
async function _migrateHtmlConfigTemplateLayout_115() {
  const NODE_CURE_FS = require('@custom/cure-fs');

  const templateRoot = NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_HTML_INCLUDE, 'config', 'template');
  const configRoot = NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_HTML_INCLUDE, 'config');

  if (!NODE_FS.existsSync(templateRoot)) {
    return { moved: 0, deduped: 0, conflicts: 0 };
  }

  const hbsFiles = await _collectFilesByExtensionRecursive(templateRoot, ['.hbs']);
  const result = { moved: 0, deduped: 0, conflicts: 0 };

  for (const srcPath of hbsFiles) {
    const rel = NODE_CURE_PATH.relative(templateRoot, srcPath);
    const destPath = NODE_CURE_PATH.join(configRoot, rel);

    if (NODE_CURE_PATH.slashForward(srcPath) === NODE_CURE_PATH.slashForward(destPath)) {
      continue;
    }

    if (NODE_FS.existsSync(destPath)) {
      const srcBuf = NODE_FS.readFileSync(srcPath);
      const destBuf = NODE_FS.readFileSync(destPath);

      if (srcBuf.equals(destBuf)) {
        await NODE_CURE_FS.deleteAsync([srcPath], { force: true });
        result.deduped += 1;
        log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Removed duplicate legacy config template after confirming migrated copy exists.', {
          srcPath,
          destPath
        });
        continue;
      }

      result.conflicts += 1;
      log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Legacy config template migration conflict; destination already exists with different contents.', {
        srcPath,
        destPath
      });
      continue;
    }

    await _moveFileIfExistsMigration(srcPath, destPath);
    result.moved += 1;
  }

  try {
    await _removeEmptyDirectoriesRecursive(templateRoot);
  } catch (err) {
    log.debug(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Unable to remove one or more empty legacy config template directories.', {
      templateRoot,
      error: String(err?.message || err)
    });
  }

  return result;
}

/**
 * Rewrite legacy font-icon paths to 1.1.0 lower-hyphen versions.
 * NOTE: This is ONLY for path strings (cache keys), not namespaces.
 * Also canonicalizes path separators to slash-forward.
 * @param {string} p
 * @returns {string}
 */
function _rewriteFontIconPath_110(p) {
  if (!p || typeof p !== 'string') return p;

  // Canonical migration form: all cache path keys should use "/" separators.
  let out = NODE_CURE_PATH.slashForward(String(p));

  // Folder rename(s)
  out = out.replace(/(^|[\\/])font_icon([\\/])/g, '$1font-icon$2');

  // Template rename
  out = out.replace(/font_icon_template\.scss/g, 'font-icon-template.scss');

  // Variable CSS dir rename
  out = out.replace(/_variable_font_icon/g, '_variable-font-icon');

  // Output css folder rename (old FONT_ICON_NAME was "font_icon")
  out = out.replace(/(^|[\\/])css([\\/])font_icon([\\/])/g, '$1css$2font-icon$3');

  return out;
}

/**
 * Update cache.json keys that reference legacy font_icon paths and canonicalize
 * path separators (backslash -> slash-forward).
 * Works on per-namespace cache format (which 1.1.0 already upgrades to).
 * @param {string} cacheFilePath
 */
async function _migrateFontIconCacheEntries_110(cacheFilePath) {
  const NODE_CURE_FS = require('@custom/cure-fs');
  const NODE_CURE_JSON = require('@custom/cure-json');

  if (!(await NODE_CURE_FS.doesExistFileAsync(cacheFilePath))) return;

  let json;
  try {
    json = NODE_CURE_JSON.load(cacheFilePath);
  } catch (err) {
    log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Unable to load cache for font-icon migration; skipping.', {
      cacheFilePath,
      err: String(err?.message || err)
    });
    return;
  }

  if (!json || typeof json !== 'object') return;

  let changed = false;

  // Per-namespace structure: { namespace: { "path": {signature,...}, ... }, ... }
  for (const [ns, bucket] of Object.entries(json)) {
    if (!bucket || typeof bucket !== 'object') continue;

    const keys = Object.keys(bucket);
    for (const oldKey of keys) {
      const newKey = _rewriteFontIconPath_110(oldKey);
      if (newKey === oldKey) continue;

      // If target exists, keep the existing one and drop the legacy key (prevents clobber)
      if (bucket[newKey] === undefined) {
        bucket[newKey] = bucket[oldKey];
      } else {
        log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Cache key already exists; dropping legacy key:', {
          ns,
          oldKey,
          newKey
        });
      }

      delete bucket[oldKey];
      changed = true;
    }
  }

  if (changed) {
    NODE_CURE_JSON.save(cacheFilePath, json, { sort: true });
    log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Updated cache keys (font-icon rename + slash-forward path separators).', {
      cacheFilePath
    });
  }
}

/**
 * Detect stale font-icon template keys that were incorrectly stored in the
 * project file cache before template checksum tracking moved to compiler cache.
 * @param {string} key
 * @returns {boolean}
 * @since 1.1.1
 */
function _isFontIconTemplateCacheKey_111(key) {
  const k = NODE_CURE_PATH.slashForward(String(key || '')).toLowerCase();
  if (!k) return false;

  return (
    k === 'font-icon-template.scss'
    || k.endsWith('/font-icon-template.scss')
    || k === 'font_icon_template.scss'
    || k.endsWith('/font_icon_template.scss')
  );
}

/**
 * Move stale font-icon template checksum keys from project file cache to
 * compiler file cache under the canonical compiler-root key.
 * Only affects the `font_icon` namespace.
 * @param {string} projectCacheFilePath
 * @param {string} compilerCacheFilePath
 * @returns {Promise<{ removedKeys: string[], movedSignature: string|null }>}
 * @since 1.1.1
 */
async function _moveFontIconTemplateChecksumProjectToCompilerCache_111(projectCacheFilePath, compilerCacheFilePath) {
  const NODE_CURE_FS = require('@custom/cure-fs');
  const NODE_CURE_JSON = require('@custom/cure-json');
  const NODE_FS = require('fs');
  const NODE_PATH = require('path');

  if (!(await NODE_CURE_FS.doesExistFileAsync(projectCacheFilePath))) {
    return { removedKeys: [], movedSignature: null };
  }

  let projectJson;
  try {
    projectJson = NODE_CURE_JSON.load(projectCacheFilePath);
  } catch (err) {
    log.notice(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Unable to load project file cache for 1.1.1 font-icon template cleanup; skipping.', {
      cacheFilePath: projectCacheFilePath,
      err: String(err?.message || err)
    });
    return { removedKeys: [], movedSignature: null };
  }

  if (!projectJson || typeof projectJson !== 'object') {
    return { removedKeys: [], movedSignature: null };
  }

  const bucket = (projectJson[CACHE_NAMESPACE_FONT_ICON] && typeof projectJson[CACHE_NAMESPACE_FONT_ICON] === 'object')
    ? projectJson[CACHE_NAMESPACE_FONT_ICON]
    : null;

  if (!bucket) return { removedKeys: [], movedSignature: null };

  /** @type {string[]} */
  const removedKeys = [];
  /** @type {string|null} */
  let movedSignature = null;

  for (const key of Object.keys(bucket)) {
    if (!_isFontIconTemplateCacheKey_111(key)) continue;

    const entry = bucket[key];
    const signature = (entry && typeof entry === 'object' && typeof entry.signature === 'string')
      ? entry.signature
      : (entry && typeof entry === 'object' && typeof entry.checksum === 'string')
        ? entry.checksum
        : null;

    // Prefer first valid signature found. If multiple entries exist, they should
    // represent the same template content; we still remove all matched keys.
    if (!movedSignature && signature) {
      movedSignature = signature;
    }

    delete bucket[key];
    removedKeys.push(key);
  }

  if (removedKeys.length === 0) {
    return { removedKeys: [], movedSignature: null };
  }

  if (Object.keys(bucket).length === 0) {
    delete projectJson[CACHE_NAMESPACE_FONT_ICON];
  }

  // If a valid signature was found, persist it into compiler cache under the
  // canonical compiler-root key.
  if (movedSignature) {
    let compilerJson = {};
    try {
      if (await NODE_CURE_FS.doesExistFileAsync(compilerCacheFilePath)) {
        compilerJson = NODE_CURE_JSON.load(compilerCacheFilePath) || {};
      }
    } catch (err) {
      log.notice(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Unable to load compiler file cache for 1.1.1 font-icon template migration; continuing with empty cache object.', {
        cacheFilePath: compilerCacheFilePath,
        err: String(err?.message || err)
      });
      compilerJson = {};
    }

    if (!compilerJson || typeof compilerJson !== 'object') {
      compilerJson = {};
    }

    if (!compilerJson[CACHE_NAMESPACE_FONT_ICON] || typeof compilerJson[CACHE_NAMESPACE_FONT_ICON] !== 'object') {
      compilerJson[CACHE_NAMESPACE_FONT_ICON] = {};
    }

    compilerJson[CACHE_NAMESPACE_FONT_ICON]['config/default/project/font-icon-template.scss'] = {
      signature: movedSignature
    };

    try {
      await NODE_FS.promises.mkdir(NODE_PATH.dirname(compilerCacheFilePath), { recursive: true });
    } catch (_) {}

    NODE_CURE_JSON.save(compilerCacheFilePath, compilerJson, { sort: true });
    log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Moved font-icon template checksum to compiler file cache (1.1.1).', {
      cacheFilePath: compilerCacheFilePath,
      key: 'config/default/project/font-icon-template.scss',
      signature: movedSignature
    });
  } else {
    log.notice(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Matched font-icon template cache key(s) in project file cache, but no signature/checksum value was found; only removing stale keys (1.1.1).', {
      cacheFilePath: projectCacheFilePath,
      removedKeys
    });
  }

  NODE_CURE_JSON.save(projectCacheFilePath, projectJson, { sort: true });
  log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Removed stale font-icon template checksum key(s) from project file cache (1.1.1).', {
    cacheFilePath: projectCacheFilePath,
    removedKeys
  });

  return { removedKeys, movedSignature };
}

/**
 * Rename any on-disk project folders that used legacy font_icon naming.
 */
async function _migrateFontIconDirs_110() {
  // in/asset/font_icon -> in/asset/font-icon
  await _moveDirIfExistsMigration(
    `${PATH_DIR_PROJECT_IN_ASSET}font_icon/`,
    `${PATH_DIR_PROJECT_IN_ASSET}font-icon/`
  );

  // out/asset/font_icon -> out/asset/font-icon
  await _moveDirIfExistsMigration(
    `${PATH_DIR_PROJECT_OUT_ASSET}font_icon/`,
    `${PATH_DIR_PROJECT_OUT_ASSET}font-icon/`
  );

  // in/asset/css/_variable_font_icon -> in/asset/css/_variable-font-icon
  await _moveDirIfExistsMigration(
    `${PATH_DIR_PROJECT_IN_ASSET}css/_variable_font_icon/`,
    `${PATH_DIR_PROJECT_IN_ASSET}css/_variable-font-icon/`
  );

  // out/asset/css/font_icon -> out/asset/css/font-icon
  await _moveDirIfExistsMigration(
    `${PATH_DIR_PROJECT_OUT_ASSET}css/font_icon/`,
    `${PATH_DIR_PROJECT_OUT_ASSET}css/font-icon/`
  );
}

/**
 * Canonicalize font-icon CSS output filenames to `font-icon--<rest>.min.css`.
 *
 * Renames:
 * - `font_icon_<rest>.min.css` -> `font-icon--<rest>.min.css`
 * - `font-icon-<rest>.min.css` -> `font-icon--<rest>.min.css`
 *
 * This intentionally does NOT "lower-hyphen everything" — it only fixes the legacy prefix segment.
 *
 * Must run AFTER `_migrateFontIconDirs_110()` so the output dir already exists at `css/font-icon/`.
 *
 * @returns {Promise<void>}
 * @since 1.1.0
 */
async function _migrateFontIconOutMinCssNames_110() {
  const NODE_FS = require('fs');
  const NODE_PATH = require('path');

  const cssDir = `${PATH_DIR_PROJECT_OUT_ASSET}css/font-icon/`;

  if (!NODE_FS.existsSync(cssDir)) return;

  /** @type {import('fs').Dirent[]} */
  let entries = [];
  try {
    entries = await NODE_FS.promises.readdir(cssDir, { withFileTypes: true });
  } catch (err) {
    log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Unable to read font-icon css output dir; skipping css filename rename.', {
      cssDir,
      err: String(err?.message || err)
    });
    return;
  }

  for (const ent of entries) {
    if (!ent.isFile()) continue;

    const oldName = ent.name;

    // Legacy + canonicalization:
    // - font_icon_<rest>.min.css -> font-icon--<rest>.min.css
    // - font-icon-<rest>.min.css -> font-icon--<rest>.min.css
    // (leave already-canonical font-icon--<rest>.min.css unchanged)
    let rest = null;
    let fromLabel = null;

    {
      const mLegacy = /^font_icon_(.+)\.min\.css$/i.exec(oldName);
      if (mLegacy) {
        rest = mLegacy[1];
        fromLabel = 'font_icon_';
      }
    }
    if (!rest) {
      const mSingle = /^font-icon-(?!-)(.+)\.min\.css$/i.exec(oldName);
      if (mSingle) {
        rest = mSingle[1];
        fromLabel = 'font-icon-';
      }
    }
    if (!rest) continue;

    const newName = `font-icon--${rest}.min.css`;

    const oldPath = NODE_PATH.join(cssDir, oldName);
    const newPath = NODE_PATH.join(cssDir, newName);

    if (NODE_FS.existsSync(newPath)) {
      log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Target font-icon css already exists; skipping rename.', {
        oldPath,
        newPath
      });
      continue;
    }

    try {
      await NODE_FS.promises.rename(oldPath, newPath);
      log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, `Renamed font-icon css output file (${fromLabel} -> font-icon--).`, {
        oldPath,
        newPath
      });
    } catch (err) {
      log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Failed to rename font-icon css output file; continuing.', {
        oldPath,
        newPath,
        err: String(err?.message || err)
      });
    }
  }
}

/**
 * Canonicalize font files under out/asset/font-icon/<subdir>/ to `font-icon--<rest>`.
 *
 * Renames:
 * - `font_icon_<rest>` -> `font-icon--<rest>`
 * - `font-icon-<rest>` -> `font-icon--<rest>`
 *
 * This is required because `_migrateFontIconTextRefs_110()` rewrites `font_icon_`/`font-icon-` to `font-icon--`,
 * but prior builds may have already produced fonts with the legacy prefix.
 *
 * Must run AFTER `_migrateFontIconDirs_110()` so the output dir already exists at `font-icon/`.
 *
 * @returns {Promise<void>}
 * @since 1.1.0
 */
async function _migrateFontIconOutFontFileNames_110() {
  const NODE_FS = require('fs');
  const NODE_PATH = require('path');

  const rootDir = `${PATH_DIR_PROJECT_OUT_ASSET}font-icon/`;

  if (!NODE_FS.existsSync(rootDir)) return;

  /**
   * Recursively walk a directory, renaming any legacy/non-canonical font-icon file.
   * @param {string} dir
   * @returns {Promise<void>}
   */
  async function walk(dir) {
    /** @type {import('fs').Dirent[]} */
    let entries = [];
    try {
      entries = await NODE_FS.promises.readdir(dir, { withFileTypes: true });
    } catch (err) {
      log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Unable to read font-icon output dir; skipping subtree.', {
        dir,
        err: String(err?.message || err)
      });
      return;
    }

    for (const ent of entries) {
      const abs = NODE_PATH.join(dir, ent.name);

      if (ent.isDirectory()) {
        await walk(abs);
        continue;
      }

      if (!ent.isFile()) continue;

      const oldName = ent.name;

      // Legacy + canonicalization:
      // - font_icon_<rest> -> font-icon--<rest>
      // - font-icon-<rest> -> font-icon--<rest>
      // (leave already-canonical font-icon--<rest> unchanged)
      let rest = null;
      let fromLabel = null;

      {
        const mLegacy = /^font_icon_(.+)$/i.exec(oldName);
        if (mLegacy) {
          rest = mLegacy[1];
          fromLabel = 'font_icon_';
        }
      }
      if (!rest) {
        const mSingle = /^font-icon-(?!-)(.+)$/i.exec(oldName);
        if (mSingle) {
          rest = mSingle[1];
          fromLabel = 'font-icon-';
        }
      }
      if (!rest) continue;

      const newName = `font-icon--${rest}`;

      const newAbs = NODE_PATH.join(dir, newName);

      if (NODE_FS.existsSync(newAbs)) {
        log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Target font-icon file already exists; skipping rename.', {
          oldPath: abs,
          newPath: newAbs
        });
        continue;
      }

      try {
        await NODE_FS.promises.rename(abs, newAbs);
        log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, `Renamed font-icon output file (${fromLabel} -> font-icon--).`, {
          oldPath: abs,
          newPath: newAbs
        });
      } catch (err) {
        log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Failed to rename font-icon output file; continuing.', {
          oldPath: abs,
          newPath: newAbs,
          err: String(err?.message || err)
        });
      }
    }
  }

  await walk(rootDir);
}

/**
 * Rewrite legacy font_icon path references inside text files (HTML/CSS/etc).
 *
 * Why:
 * - 1.1.0 moves folders on disk, but older HTML/CSS may still point at:
 *   - /asset/font_icon/...  (old font output dir)
 *   - /asset/css/font_icon/... (old css output dir)
 *
 * Must run AFTER `_migrateFontIconDirs_110()` so moved folders exist.
 */
function _migrateFontIconTextRefs_110() {
  const escapeRegex = (s) => String(s || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const defaultFontIconSets = [
    'browser',
    'icon',
    'interface',
    'social',
    'synticore',
    'system',
    'module-photoswipe',
    'module-siema'
  ];

  /** @type {Set<string>} */
  const discoveredFontIconSets = new Set(defaultFontIconSets);
  for (const dir of [PATH_DIR_PROJECT_IN_ASSET_FONT_ICON, PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON]) {
    try {
      if (!dir || !NODE_FS.existsSync(dir)) continue;
      const ents = NODE_FS.readdirSync(dir, { withFileTypes: true });
      for (const ent of ents) {
        if (ent && ent.isDirectory && ent.isDirectory()) {
          discoveredFontIconSets.add(String(ent.name || '').trim());
        }
      }
    } catch (_) {
      // Best effort only; keep defaults.
    }
  }

  const fontIconSetAlt =
    Array.from(discoveredFontIconSets)
      .filter(Boolean)
      .sort((a, b) => b.length - a.length)
      .map(escapeRegex)
      .join('|');

  /** @type {Array<{from:string,to:string}>} */
  const mapping = [
    // Common absolute site paths
    { from: 'asset/css/font_icon/',   to: 'asset/css/font-icon/' },
    { from: 'asset/font_icon/',       to: 'asset/font-icon/' },

    // Common relative paths inside CSS, templates, etc.
    { from: 'css/font_icon/',         to: 'css/font-icon/' },

    // Variable directory rename (used by your CSS variable pipeline)
    { from: '_variable_font_icon/',   to: '_variable-font-icon/' },

    // Template file rename (if referenced by path in project text)
    { from: 'font_icon_template.scss', to: 'font-icon-template.scss' }
  ];

  /**
   * Scoped regex rewrites:
   * - Restrict `font_icon_` file-prefix rewrites to paths under font-icon directories.
   * - Rewrite token prefixes (`font_icon--` / `font_icon-`) without touching non-font-icon file names.
   */
  const regexRewrites = [
    // Path file-prefix: .../font-icon/.../font_icon__rest -> .../font-icon/.../font-icon--rest
    {
      regex: /((?:^|[\\/])(?:asset[\\/])?(?:css[\\/])?font(?:-|_)icon(?:[\\/][^"'()\s]+)*[\\/])font_icon__(?=[^"'()\s]+)/g,
      replace: (m) => `${m[1]}font-icon--`
    },
    // Path file-prefix: .../font-icon/.../font_icon_rest -> .../font-icon/.../font-icon--rest
    {
      regex: /((?:^|[\\/])(?:asset[\\/])?(?:css[\\/])?font(?:-|_)icon(?:[\\/][^"'()\s]+)*[\\/])font_icon_(?=[^"'()\s]+)/g,
      replace: (m) => `${m[1]}font-icon--`
    },
    // Path file-prefix: .../font-icon/.../font-icon_rest -> .../font-icon/.../font-icon--rest
    {
      regex: /((?:^|[\\/])(?:asset[\\/])?(?:css[\\/])?font(?:-|_)icon(?:[\\/][^"'()\s]+)*[\\/])font-icon_(?=[^"'()\s]+)/g,
      replace: (m) => `${m[1]}font-icon--`
    },
    // Path file-prefix: .../font-icon/.../font-icon-rest -> .../font-icon/.../font-icon--rest
    {
      regex: /((?:^|[\\/])(?:asset[\\/])?(?:css[\\/])?font(?:-|_)icon(?:[\\/][^"'()\s]+)*[\\/])font-icon-(?!-)(?=[^"'()\s]+)/g,
      replace: (m) => `${m[1]}font-icon--`
    },
    // Token prefixes in class/variable names: font_icon--* / font_icon-* -> font-icon--* / font-icon-*
    {
      regex: /(^|[^A-Za-z0-9])font_icon--/g,
      replace: (m) => `${m[1]}font-icon--`
    },
    {
      regex: /(^|[^A-Za-z0-9])font_icon-/g,
      replace: (m) => `${m[1]}font-icon-`
    },
    // New canonical delimiter migration:
    //   font-icon--<set>-<name>  -> font-icon--<set>--<name>
    //   font-icon--color--<set>-<name> -> font-icon--color--<set>--<name>
    // Also supports SCSS variable tokens prefixed with "$".
    {
      regex: new RegExp(`(\\$?font-icon--color--(?:${fontIconSetAlt}))-(?!-)([A-Za-z0-9_][A-Za-z0-9_-]*)`, 'g'),
      replace: (m) => `${m[1]}--${m[2]}`
    },
    {
      regex: new RegExp(`(\\$?font-icon--(?:${fontIconSetAlt}))-(?!-)([A-Za-z0-9_][A-Za-z0-9_-]*)`, 'g'),
      replace: (m) => `${m[1]}--${m[2]}`
    },
    // Legacy + canonical CSS declarations:
    //   font-family: "font_icon_interface" -> font-family: "font-icon--interface"
    //   font-family: "font-icon-interface" -> font-family: "font-icon--interface"
    // Keep scoped to explicit font-family property values.
    {
      regex: /(\bfont-family\s*:\s*["'])font_icon_([A-Za-z0-9_-]+)(["'])/gi,
      replace: (m) => `${m[1]}font-icon--${String(m[2] || '')}${m[3]}`
    },
    {
      regex: /(\bfont-family\s*:\s*["'])font-icon-(?!-)([A-Za-z0-9_-]+)(["'])/gi,
      replace: (m) => `${m[1]}font-icon--${String(m[2] || '')}${m[3]}`
    }
  ];

  log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Updating text references for font-icon rename (font_icon → font-icon).', {
    roots: [
      PATH_DIR_PROJECT_IN,
      PATH_DIR_PROJECT_OUT
    ],
    mapping: mapping.length
  });

  try {
    if (PATH_DIR_PROJECT_IN && NODE_FS.existsSync(PATH_DIR_PROJECT_IN)) {
      updateTextReferences(PATH_DIR_PROJECT_IN, mapping, {
        normalizeScssUseForward: false,
        scssUseForwardMode: 'mapping_only',
        normalizeJsModuleSpecifiers: false,
        normalizeFontIconTokens: false,
        normalizeCssUrlPaths: false,
        normalizeFileIncludeSpecifiers: false,
        normalizeIncludeOptionLiterals: false,
        segmentFlexAllowPrefixes: [
          'asset/css/font_icon',
          'asset/font_icon',
          'css/font_icon',
          '_variable_font_icon',
          'font_icon_template.scss'
        ],
        regexRewrites
      });
    }
  } catch (e) {
    log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Font-icon reference rewrite failed for in/ (continuing).', {
      error: String(e?.message || e)
    });
  }

  try {
    if (PATH_DIR_PROJECT_OUT && NODE_FS.existsSync(PATH_DIR_PROJECT_OUT)) {
      updateTextReferences(PATH_DIR_PROJECT_OUT, mapping, {
        normalizeScssUseForward: false,
        scssUseForwardMode: 'mapping_only',
        normalizeJsModuleSpecifiers: false,
        normalizeFontIconTokens: false,
        normalizeCssUrlPaths: false,
        normalizeFileIncludeSpecifiers: false,
        normalizeIncludeOptionLiterals: false,
        segmentFlexAllowPrefixes: [
          'asset/css/font_icon',
          'asset/font_icon',
          'css/font_icon',
          '_variable_font_icon',
          'font_icon_template.scss'
        ],
        regexRewrites
      });
    }
  } catch (e) {
    log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Font-icon reference rewrite failed for out/ (continuing).', {
      error: String(e?.message || e)
    });
  }
}

/**
 * @typedef {{ match: string|RegExp, replace: string|((t:string)=>string) }} TokenRule
 */

/** @type {TokenRule[]} */
const TOKEN_CONVERSIONS = [
  { match: 'AUTOMATIC_TITLE', replace: 'AUTOMATIC_TITLE_FULL' },

  // Add more rules here over time...
  // { match: /^AUTOMATIC_(DESCRIPTION)$/, replace: (t) => `${t}_FULL` },
];

/**
 * Apply the first matching rule; otherwise return original token.
 * @param {string} token
 * @returns {string}
 */
function _normalizeToken(token) {
  for (const rule of TOKEN_CONVERSIONS) {
    if (typeof rule.match === 'string') {
      if (token === rule.match) {
        return typeof rule.replace === 'function' ? rule.replace(token) : rule.replace;
      }
    } else {
      if (rule.match.test(token)) {
        return typeof rule.replace === 'function'
          ? rule.replace(token)
          : token.replace(rule.match, rule.replace);
      }
    }
  }
  return token;
}

/**
 * Returns true if the token at offset is already wrapped by the configured delimiters.
 * @param {string} str
 * @param {number} offset
 * @param {string} token
 */
function _isAlreadyWrapped(str, offset, token, delimiter) {
  const before = str.slice(Math.max(0, offset - delimiter.open.length), offset);
  const after = str.slice(offset + token.length, offset + token.length + delimiter.close.length);
  return before === delimiter.open && after === delimiter.close;
}

/**
 * Wrap bare CONFIG_* / AUTOMATIC_* tokens, skipping those already wrapped.
 * Also normalizes each token via _normalizeToken().
 * @param {string} content
 * @returns {string}
 */
function _wrapContent(content, delimiter) {
  return content.replace(/\b((?:CONFIG|AUTOMATIC)_[A-Z0-9_]+)\b/g, (fullMatch, token, offset, str) => {
    if (_isAlreadyWrapped(str, offset, token, delimiter)) {
      return fullMatch; // already wrapped → leave as-is
    }
    const normalized = _normalizeToken(token);
    return `${delimiter.open}${normalized}${delimiter.close}`;
  });
}

/**
 * Normalize tokens that are ALREADY wrapped.
 * This guarantees idempotence: running it multiple times produces the same result.
 * @param {string} content
 * @returns {string}
 */
function _contentNormalize(content, delimiter) {
  const NODE_CURE_REGEX = require('@custom/cure-regex');

  const openRx = NODE_CURE_REGEX.escape(delimiter.open);
  const closeRx = NODE_CURE_REGEX.escape(delimiter.close);

  // Match: <open> TOKEN <close> and replace TOKEN → _normalizeToken(TOKEN)
  const wrappedTokenRx = new RegExp(
    `${openRx}((?:CONFIG|AUTOMATIC)_[A-Z0-9_]+)${closeRx}`,
    'g'
  );

  return content.replace(wrappedTokenRx, (m, token) => {
    const normalized = _normalizeToken(token);
    // Only rewrite if normalization actually changed it
    return normalized === token ? m : `${delimiter.open}${normalized}${delimiter.close}`;
  });
}

/**
 * Convert a dot-path (e.g. "option.navigation.toc") to the generated CONFIG_* placeholder
 * format used by the project's flatten/replacement pipeline.
 *
 * Notes:
 * - This is used by migrations to rewrite *token names* in templates when config keys move.
 * - We intentionally keep it simple + deterministic: dots and non-alphanumerics become underscores.
 *
 * @param {string} path
 * @returns {string}
 * @since 1.1.0
 */
function _configPathToPlaceholder(path) {
  const cleaned = String(path ?? '')
    .replace(/\[\]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .toUpperCase();

  return `CONFIG_${cleaned}`;
}

/**
 * Convert a dot-path ("option.navigation.toc") into a placeholder token
 * ("CONFIG_OPTION_NAVIGATION_TOC").
 *
 * @param {string} path
 * @returns {string}
 * @since 1.1.0
 */
function _configPathToPlaceholder(path) {
  return `CONFIG_${String(path).trim().replace(/\.+/g, '.').replace(/\./g, '_').toUpperCase()}`;
}

/**
 * Ensure delimiter is always an object with { open, close }.
 * @param {{open?:string, close?:string}|string|undefined|null} delimiter
 * @returns {{open:string, close:string}}
 */
function _delimiterToObject(delimiter) {
  if (!delimiter) return { open: '[[', close: ']]' };

  if (typeof delimiter === 'string') {
    return { open: delimiter, close: delimiter };
  }

  return {
    open: delimiter.open ?? '[[',
    close: delimiter.close ?? ']]'
  };
}

/**
 * Convert a config dot-path into the CONFIG_* placeholder prefix used in content.
 *
 * Examples:
 * - "option.toc" => "CONFIG_OPTION_TOC"
 * - "option.navigation.toc" => "CONFIG_OPTION_NAVIGATION_TOC"
 * - "option.navigation.toc.collapsible" => "CONFIG_OPTION_NAVIGATION_TOC_COLLAPSIBLE"
 *
 * @param {string} path
 * @returns {string}
 */
function _configPathToTokenPrefix(path) {
  const cleaned = String(path ?? '')
    .replace(/\[\]/g, '')            // strip array markers
    .replace(/[^A-Za-z0-9.]+/g, '.') // normalize weird separators to dots
    .replace(/\.+/g, '.')            // collapse dots
    .replace(/^\.|\.$/g, '')         // trim dots
    .replace(/\./g, '_')             // dot-path => underscore-path
    .replace(/_+/g, '_')             // collapse underscores
    .replace(/^_+|_+$/g, '')         // trim underscores
    .toUpperCase();

  return `CONFIG_${cleaned}`;
}

/**
 * Rewrite moved CONFIG_* tokens (prefix-based), then wrap CONFIG_* and AUTOMATIC_* tokens.
 * CONFIG_* tokens are wrapped only when present in the post-move allowed token set.
 * AUTOMATIC_* tokens are always eligible for wrapping.
 *
 * This prevents false positives like IMG_*, UNMASKED_*_WEBGL, SWIPE_THRESHOLD, etc.
 *
 * @param {string} text
 * @param {{open:string, close:string}|string} delimiter
 * @param {{
 *   allowedTokens?: Set<string> | null,
 *   prefixMoves?: Array<{ fromPrefix: string, toPrefix: string }> | null
 * }} [options]
 * @returns {string}
 * @since 1.1.0
 */
function _normalizeAndWrap(text, delimiter, options = {}) {
  const delim = _delimiterToObject(delimiter);

  /** @type {Set<string> | null} */
  const allowedTokens = options.allowedTokens ?? null;

  /** @type {Array<{ fromPrefix: string, toPrefix: string }> | null} */
  const prefixMoves = options.prefixMoves ?? null;

  // Normalize tokens that are already wrapped (idempotence)
  let out = _contentNormalize(String(text ?? ''), delim);

  // Only CONFIG_* / AUTOMATIC_* candidates. (No generic ALLCAPS underscore tokens.)
  const rxCandidate = /\b(?:CONFIG|AUTOMATIC)_[A-Z0-9_]+\b/g;

  out = out.replace(rxCandidate, (token, offset, src) => {
    // Detect if this token is already wrapped (using current delimiter)
    const before = src.slice(Math.max(0, offset - delim.open.length), offset);
    const after  = src.slice(offset + token.length, offset + token.length + delim.close.length);
    const isWrapped = (before === delim.open && after === delim.close);

    // -----------------------------------------------------------------------
    // 1) Rewrite moved tokens (PREFIX-BASED, supports descendants)
    // -----------------------------------------------------------------------
    let rewritten = token;

    if (token.startsWith('CONFIG_') && prefixMoves && prefixMoves.length) {
      // Allow chained moves; cap to prevent infinite loops
      for (let guard = 0; guard < 8; guard++) {
        let changed = false;

        for (const mv of prefixMoves) {
          if (!mv?.fromPrefix || !mv?.toPrefix) continue;

          if (rewritten === mv.fromPrefix) {
            rewritten = mv.toPrefix;
            changed = true;
            continue;
          }

          const fromWithUnderscore = `${mv.fromPrefix}_`;
          if (rewritten.startsWith(fromWithUnderscore)) {
            rewritten = `${mv.toPrefix}${rewritten.slice(mv.fromPrefix.length)}`;
            changed = true;
          }
        }

        if (!changed) break;
      }
    }

    // Apply token alias normalization before any wrapping decision.
    rewritten = _normalizeToken(rewritten);

    // If it was already wrapped, return rewritten token only (wrapper stays)
    if (isWrapped) return rewritten;

    // -----------------------------------------------------------------------
    // 2) Wrap ONLY if it exists in post-move allowed set
    // -----------------------------------------------------------------------
    if (rewritten.startsWith('CONFIG_') && allowedTokens && allowedTokens.size && !allowedTokens.has(rewritten)) {
      return rewritten; // do not wrap unknown tokens
    }

    return `${delim.open}${rewritten}${delim.close}`;
  });

  return out;
}

/**
 * Recursively walk a directory and wrap placeholders in matching files.
 * @param {string} dir
 * @param {string[]} exts
 * @param {{open:string, close:string}|string} delimiter
 * @param {{
 *   allowedTokens?: Set<string> | null,
 *   prefixMoves?: Array<{ fromPrefix: string, toPrefix: string }> | null
 * }} [options]
 * @returns {Promise<void>}
 * @since 1.1.0
 */
async function _walkAndWrap(dir, exts, delimiter, options = {}) {
  const entries = await NODE_FS.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = NODE_CURE_PATH.join(dir, entry.name);

    if (entry.isDirectory()) {
      await _walkAndWrap(fullPath, exts, delimiter, options);
      continue;
    }

    if (!exts.includes(NODE_PATH.extname(entry.name))) continue;

    const text = NODE_FS.readFileSync(fullPath, 'utf8');
    const wrapped = _normalizeAndWrap(text, delimiter, options);

    if (wrapped !== text) {
      NODE_CURE_FS.writeFileSync(fullPath, wrapped);
      log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Wrapped placeholders', { file: fullPath });
    }
  }
}

/**
 * Escape a string for safe use inside a RegExp pattern.
 * @param {string} s
 * @returns {string}
 * @since 1.1.0
 */
function _escapeRegExp_110(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Apply a transform function only to text regions outside of single/double quotes.
 * This avoids rewriting string literals inside Handlebars expressions.
 *
 * @param {string} expr
 * @param {(plain: string) => string} transformPlain
 * @returns {string}
 * @since 1.1.0
 */
function _transformOutsideQuotes_110(expr, transformPlain) {
  let out = '';
  let plain = '';

  let inSingle = false;
  let inDouble = false;
  let esc = false;

  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];

    if (esc) {
      // Keep escape sequences intact inside quotes.
      if (inSingle || inDouble) out += ch;
      else plain += ch;
      esc = false;
      continue;
    }

    if ((inSingle || inDouble) && ch === '\\') {
      // Escape inside quotes.
      out += ch;
      esc = true;
      continue;
    }

    if (!inDouble && ch === "'") {
      // Toggle single quote.
      if (!inSingle) {
        // Entering quote: flush plain.
        if (plain) {
          out += transformPlain(plain);
          plain = '';
        }
        inSingle = true;
        out += ch;
      } else {
        // Leaving quote.
        inSingle = false;
        out += ch;
      }
      continue;
    }

    if (!inSingle && ch === '"') {
      // Toggle double quote.
      if (!inDouble) {
        // Entering quote: flush plain.
        if (plain) {
          out += transformPlain(plain);
          plain = '';
        }
        inDouble = true;
        out += ch;
      } else {
        // Leaving quote.
        inDouble = false;
        out += ch;
      }
      continue;
    }

    if (inSingle || inDouble) out += ch;
    else plain += ch;
  }

  if (plain) out += transformPlain(plain);

  return out;
}

/**
 * Rewrite one Handlebars mustache expression from "custom-root" paths to "project-root" paths:
 * - Prefix custom keys: `brand.*` -> `custom.brand.*`
 * - Remove parent hops for sibling roots: `../require.*` -> `require.*`, `../option.*` -> `option.*`
 *
 * NOTE: Only rewrites keys that exist at the TOP LEVEL of `configProjectMerge.custom`.
 *
 * @param {string} expr
 * @param {string[]} customTopKeys
 * @returns {string}
 * @since 1.1.0
 */
function _rewriteHandlebarsExprCustomRoot_110(expr, customTopKeys) {
  const keys = Array.isArray(customTopKeys) ? customTopKeys.filter(Boolean) : [];
  if (!keys.length) return expr;

  return _transformOutsideQuotes_110(expr, (plain) => {
    let out = plain;

    // Root shift: when templates previously ran with `custom` as root,
    // sibling roots were referenced with ../require / ../option.
    out = out.replace(/\.\.\/require\./g, 'require.');
    out = out.replace(/\.\.\/option\./g, 'option.');

    // Prefix custom top-level keys with `custom.` when they appear as path heads.
    // Avoid rewriting already-prefixed tokens by preventing matches preceded by '.' or '$' wordlike chains.
    // (e.g. `custom.brand` won't match because `brand` is preceded by '.')
    const sortedKeys = keys.slice().sort((a, b) => b.length - a.length);

    for (const k of sortedKeys) {
      const rx = new RegExp(`(^|[^A-Za-z0-9_$.])(${_escapeRegExp_110(k)})(?=\\b|\\.)`, 'g');
      out = out.replace(rx, `$1custom.$2`);
    }

    return out;
  });
}

/**
 * Rewrite all `{{ ... }}` and `{{{ ... }}}` mustache contents in Handlebars template text.
 *
 * Skips:
 * - Quad-stache raw blocks `{{{{ ... }}}}` (rare) by leaving them untouched.
 * - Handlebars comments `{{! ... }}` and `{{!-- ... --}}` by leaving them untouched.
 *
 * @param {string} text
 * @param {string[]} customTopKeys
 * @returns {string}
 * @since 1.1.0
 */
function _rewriteHandlebarsMustaches_110(text, customTopKeys) {
  if (!text || typeof text !== 'string') return text;

  const rx = /{{{[\s\S]*?}}}|{{[\s\S]*?}}/g;

  return text.replace(rx, (full) => {
    // Leave raw blocks alone if they appear (quad braces).
    if (full.startsWith('{{{{')) return full;

    const isTriple = full.startsWith('{{{');
    const open = isTriple ? '{{{' : '{{';
    const close = isTriple ? '}}}' : '}}';

    const inner = full.slice(open.length, full.length - close.length);

    // Leave comments alone.
    const innerTrim = inner.trimStart();
    if (innerTrim.startsWith('!') || innerTrim.startsWith('!--')) return full;

    const rewritten = _rewriteHandlebarsExprCustomRoot_110(inner, customTopKeys);
    if (rewritten === inner) return full;

    return `${open}${rewritten}${close}`;
  });
}

/**
 * Recursively walk a directory and rewrite Handlebars template mustache expressions so that:
 * - custom keys are referenced as `custom.<key>` rather than `<key>`
 * - sibling roots drop `../` (`../require.*` -> `require.*`, `../option.*` -> `option.*`)
 *
 * @param {string} dir
 * @param {string[]} customTopKeys
 * @param {string[]} [exts]
 * @returns {Promise<void>}
 * @since 1.1.0
 */
async function _migrateHandlebarsCustomRootRefs_110(dir, customTopKeys, exts = ['.hbs', '.handlebars']) {
  const entries = await NODE_FS.promises.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = NODE_CURE_PATH.join(dir, entry.name);

    if (entry.isDirectory()) {
      await _migrateHandlebarsCustomRootRefs_110(fullPath, customTopKeys, exts);
      continue;
    }

    if (!exts.includes(NODE_PATH.extname(entry.name))) continue;

    const text = NODE_FS.readFileSync(fullPath, 'utf8');
    const out = _rewriteHandlebarsMustaches_110(text, customTopKeys);

    if (out !== text) {
      NODE_CURE_FS.writeFileSync(fullPath, out);
      log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Rewrote handlebars refs (custom-root -> project-root)', { file: fullPath });
    }
  }
}

// =============================================================================
// Helpers (preserve top-level namespace keys)
// =============================================================================

// ---- [NEW] shape helpers ----------------------------------------------------

/** @since 1.1.0 */
function _looksLikeImageLeafLegacy(v) {
  return !!(
    v && typeof v === 'object' &&
    typeof v.checksum === 'string' &&
    v.dimensions && Number.isFinite(Number(v.dimensions.width)) && Number.isFinite(Number(v.dimensions.height))
  );
}

/** @since 1.1.0 */
function _looksLikeImageLeafNew(v) {
  return !!(v && typeof v === 'object' && typeof v.signature === 'string');
}

/** @since 1.1.0 */
function _isFlatImageLegacy(obj) {
  if (!obj || typeof obj !== 'object') return false;
  const entries = Object.entries(obj);
  if (entries.length === 0) return false;

  // Consider it "flat legacy" if a strong majority of values look like legacy image leaves.
  let legacyCount = 0, otherCount = 0;
  for (const [, v] of entries) {
    if (_looksLikeImageLeafLegacy(v)) legacyCount++;
    else otherCount++;
  }
  return legacyCount > 0 && legacyCount >= otherCount;
}

/** @since 1.1.0 */
function _isFlatImageNew(obj) {
  if (!obj || typeof obj !== 'object') return false;
  const vals = Object.values(obj);
  if (vals.length === 0) return false;
  return vals.every(_looksLikeImageLeafNew);
}

// ---- [UNCHANGED] but referenced: _normalizeImageBucket(bucket)
// returns { [path]: { signature, data:{width,height} } } from legacy/new mix

/**
 * Return a stable, asc-sorted copy of an object's own enumerable keys.
 * @param {Record<string, any>} obj
 * @returns {Record<string, any>}
 * @since 1.1.0
 */
function _sortObjectShallow(obj) {
  return Object.fromEntries(
    Object.keys(obj || {})
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map(k => [k, obj[k]])
  );
}

/**
 * Detect whether *every* namespace that has values appears to be in new format:
 * - new format leaf: { signature: string, data?: object }
 * @param {any} data
 * @returns {boolean}
 * @since 1.1.0
 */
function _isPerNamespaceNewFormat(data) {
  if (!data || typeof data !== 'object') return false;

  // Empty object is considered "not new" (so we try to normalize but it will no-op).
  const nsKeys = Object.keys(data);
  if (nsKeys.length === 0) return false;

  // If *all* non-empty namespaces look migrated, treat as new format.
  let sawAtLeastOneLeaf = false;
  for (const ns of nsKeys) {
    const bucket = data[ns];
    if (!bucket || typeof bucket !== 'object') continue;
    const vals = Object.values(bucket);
    if (vals.length === 0) continue;

    // If every leaf looks like { signature: string }
    const allLookNew = vals.every(v => v && typeof v === 'object' && typeof v.signature === 'string');
    if (!allLookNew) return false;

    sawAtLeastOneLeaf = true;
  }

  return sawAtLeastOneLeaf;
}

/**
 * Walk a legacy bucket (namespace value) and produce { path: { signature } } leaves.
 * Accepts shapes like:
 *   { "path": "sha" } OR { group: { "path": "sha" } } OR already-new leaves.
 * @param {any} bucket
 * @returns {Record<string, { signature: string }>}
 * @since 1.1.0
 */
function _normalizeFileBucket(bucket) {
  /** @type {Record<string,{signature:string}>} */
  const out = {};

  const push = (p, sha) => {
    if (typeof p === 'string' && typeof sha === 'string') {
      out[p] = { signature: sha };
    }
  };

  const visit = (node) => {
    if (!node || typeof node !== 'object') return;

    for (const [k, v] of Object.entries(node)) {
      if (typeof v === 'string') {
        // legacy leaf: { "path": "sha" }
        push(k, v);
      } else if (v && typeof v === 'object') {
        if (typeof v.signature === 'string') {
          // already-new leaf: { "path": { signature: "sha", ... } }
          out[k] = { signature: v.signature, ...(v.data ? { data: v.data } : {}) };
        } else {
          // nested legacy group: { group: { "path": "sha" } }
          visit(v);
        }
      }
    }
  };

  visit(bucket);
  return _sortObjectShallow(out);
}

/**
 * Normalize an entire legacy "file/compiler" cache while preserving namespaces.
 * Result:
 *   { [namespace]: { [path]: { signature } } }
 * @param {any} legacy
 * @returns {Record<string, Record<string, { signature: string }>>}
 * @since 1.1.0
 */
function _normalizeFileCachePreserveNS(legacy) {
  /** @type {Record<string, Record<string, { signature: string }>>} */
  const result = {};
  if (legacy && typeof legacy === 'object') {
    for (const [ns, bucket] of Object.entries(legacy)) {
      if (!bucket || typeof bucket !== 'object') continue;
      result[ns] = _normalizeFileBucket(bucket);
    }
  }
  return _sortObjectShallow(result);
}

/**
 * Convert one image bucket (namespace value) to new format per path:
 * Legacy leaf: { checksum: "sha", dimensions: { width, height } }
 * New leaf:    { signature: "sha", data: { width, height } }
 * Already-new leaves are preserved.
 * @param {any} bucket
 * @returns {Record<string, { signature: string, data?: { width:number, height:number } }>}
 * @since 1.1.0
 */
function _normalizeImageBucket(bucket) {
  /** @type {Record<string, { signature: string, data?: { width:number, height:number } }>} */
  const out = {};

  if (bucket && typeof bucket === 'object') {
    for (const [path, val] of Object.entries(bucket)) {
      if (val && typeof val === 'object') {
        if (typeof val.signature === 'string') {
          // already-new
          out[path] = { signature: val.signature, ...(val.data ? { data: val.data } : {}) };
          continue;
        }

        const sig = typeof val.checksum === 'string' ? val.checksum : undefined;
        const w = Number(val.dimensions?.width);
        const h = Number(val.dimensions?.height);
        if (sig && Number.isFinite(w) && Number.isFinite(h)) {
          out[path] = { signature: sig, data: { width: w, height: h } };
        }
      }
    }
  }

  return _sortObjectShallow(out);
}

/**
 * Normalize entire legacy "image" cache while preserving namespaces.
 * @param {any} legacy
 * @returns {Record<string, Record<string, { signature: string, data?: { width:number, height:number } }>>}
 * @since 1.1.0
 */
function _normalizeImageCachePreserveNS(legacy) {
  /** @type {Record<string, Record<string, { signature: string, data?: { width:number, height:number } }>>} */
  const result = {};
  if (legacy && typeof legacy === 'object') {
    for (const [ns, bucket] of Object.entries(legacy)) {
      if (!bucket || typeof bucket !== 'object') continue;
      result[ns] = _normalizeImageBucket(bucket);
    }
  }
  return _sortObjectShallow(result);
}

/**
 * @typedef {'file'|'compiler'|'image'} CacheKind
 * @since 1.1.0
 */

/**
 * Upgrade a cache file in-place if it is in a legacy shape.
 * - `image`: collapses all shapes (flat or namespaced) into a single namespace `"image-dimension"`.
 * - `file`/`compiler`: preserves existing namespaces; upgrades leaves to `{ signature }`.
 *
 * Idempotent: skips when already in target shape.
 *
 * @param {string} filePath
 * @param {CacheKind} kind
 * @param {(msg:string, details?:any)=>void} infoLogger
 * @param {(msg:string, details?:any)=>void} warnLogger
 * @since 1.1.0
 */
async function _upgradeCacheFileIfNeeded(filePath, kind, infoLogger, warnLogger) {
  try {
    if (!NODE_FS.existsSync(filePath)) return;

    const raw = NODE_FS.readFileSync(filePath, 'utf8');
    const json = raw.trim() ? JSON.parse(raw) : {};

    switch (kind) {
      // -----------------------------------------------------------------------
      // IMAGE: canonicalize to { "image-dimension": { [path]: { signature, data } } }
      // -----------------------------------------------------------------------
      case 'image': {
        /** @type {Record<string,{signature:string,data?:{width:number,height:number}}>} */
        let mergedBucket = {};

        const mergeIn = (bucket) => {
          // bucket: { [path]: { signature, data? } }
          for (const [p, v] of Object.entries(bucket || {})) {
            if (!v || typeof v.signature !== 'string') continue;
            mergedBucket[p] = v; // last write wins
          }
        };

        if (_isFlatImageNew(json)) {
          // Already new & flat → just adopt as the merged bucket
          mergedBucket = json;
        } else if (_isFlatImageLegacy(json)) {
          // Flat legacy → normalize whole object as one bucket
          mergeIn(_normalizeImageBucket(json));
        } else if (json && typeof json === 'object') {
          // Legacy or mixed per-namespace → normalize each bucket then merge
          for (const [, bucket] of Object.entries(json)) {
            if (!bucket || typeof bucket !== 'object') continue;
            mergeIn(_normalizeImageBucket(bucket)); // supports legacy/new leaves
          }
        }

        // Stable sort for clean diffs
        mergedBucket = _sortObjectShallow(mergedBucket);

        /** @type {{ 'image-dimension': Record<string,{signature:string,data?:{width:number,height:number}}>} } */
        const migratedNS =
          // Object.keys(mergedBucket).length === 0
          // ? mergedBucket
          // :
          { 'image-dimension': mergedBucket };

        const changed = JSON.stringify(migratedNS) !== JSON.stringify(json);
        if (changed) {
          NODE_CURE_JSON.save(filePath, migratedNS, { sort: true });
          infoLogger?.('Upgraded image cache to single-namespace "image-dimension"', { file: filePath });
        } else {
          infoLogger?.('No changes required for image cache', { file: filePath });
        }
        return;
      }

      // -----------------------------------------------------------------------
      // FILE / STATICUS: preserve namespaces; upgrade leaves to { signature }
      // -----------------------------------------------------------------------
      case 'file':
      case 'compiler': {
        if (_isPerNamespaceNewFormat(json)) {
          infoLogger?.('Cache already in new format (per-namespace); skipping', { file: filePath, kind });
          return;
        }

        const migrated = _normalizeFileCachePreserveNS(json);
        const changed = JSON.stringify(migrated) !== JSON.stringify(json);
        if (changed) {
          NODE_CURE_JSON.save(filePath, migrated, { sort: true });
          infoLogger?.('Upgraded cache to new format (per-namespace)', { file: filePath, kind });
        } else {
          infoLogger?.('No changes required after normalization', { file: filePath, kind });
        }
        return;
      }

      // Exhaustiveness guard for future kinds
      default: {
        /** @type {never} */ (kind);
        warnLogger?.('Unknown cache kind; no action taken', { file: filePath, kind });
        return;
      }
    }
  } catch (err) {
    warnLogger?.('Failed to upgrade cache file', { file: filePath, kind, err: String(err?.message || err) });
  }
}

/**
 * 1.1.3 highlight.syntax config migration.
 * - Convert legacy `theme.include` to `theme.bundle` when bundle is missing.
 *
 * @returns {{ changed: boolean, updates: string[] }}
 */
function _migrateHighlightSyntaxConfig_113() {
  const updates = [];

  if (!NODE_FS.existsSync(PATH_FILE_CONFIG_PROJECT)) {
    return { changed: false, updates };
  }

  const configData = NODE_CURE_JSON.load(PATH_FILE_CONFIG_PROJECT, { fatal: false }) || {};
  const syntax = configData?.option?.highlight?.syntax;
  if (!syntax || typeof syntax !== 'object') {
    return { changed: false, updates };
  }

  let changed = false;

  const theme = (syntax.theme && typeof syntax.theme === 'object') ? syntax.theme : null;
  if (theme) {
    const hasBundle = Object.prototype.hasOwnProperty.call(theme, 'bundle');
    const include = Array.from(new Set(libraryVariableEnsureIsArray(theme.include)
      .map(v => String(v || '').trim())
      .filter(Boolean)));
    if (!hasBundle && include.length) {
      theme.bundle = include.slice();
      changed = true;
      updates.push('option.highlight.syntax.theme.bundle added from include');
    }
  }

  if (changed) {
    NODE_CURE_JSON.save(
      PATH_FILE_CONFIG_PROJECT,
      configData,
      { sort: libraryConfigGet(configData, 'option.config.sort') }
    );
    _loadConfigProject();
  }

  return { changed, updates };
}

/**
 * Migration Registry.
 *
 * Each migration's `to` is the version AFTER it runs.
 *
 * They will run in ascending order for all where project < current.
 *
 * CONTRACT (MIGRATIONS, GLOBAL):
 * - Migrations are compatibility-focused upgrades, not general cleanup.
 * - Keep scope to the minimum required for the target version to work.
 * - Prefer targeted, version-specific rewrites over broad normalization.
 */
const MIGRATIONS = [
  // migration: 1.1.0
  {
    to: '1.1.0',
    // CONTRACT (1.1.0):
    // - Apply only compatibility changes needed for 1.1.0 runtime/build behavior.
    // - Font-icon migration here is prefix-focused (`font_icon` -> required `font-icon` forms).
    // - Do not run full normalize-paths behavior inside this migration.
    name: 'Project layout & config schema migration + cache upgrade',
    run: async (ctx) => {
      await _removePackageZipIgnore(
        `${PATH_DIR_PROJECT}.gitignore`,
        [
          '# Ignore packaged files #',
          '/package.zip'
        ]
      );

      await _ensureGitignoreRulesFromDefault(
        `${PATH_DIR_PROJECT}.gitignore`,
        `${PATH_DIR_ROOT_CONFIG_DEFAULT_PROJECT}gitignore.txt`
      );

      await _moveFileIfExistsMigration(
        `${PATH_DIR_PROJECT}package.zip`,
        `${PATH_DIR_PROJECT}_package/package.zip`
      );

      await _moveFileIfExistsMigration(
        `${PATH_DIR_PROJECT}cache.json`,
        PATH_FILE_PROJECT_CACHE_FILE
      );

      await _upgradeCacheFileIfNeeded(
        PATH_FILE_PROJECT_CACHE_FILE,
        'file',
        (m,d)=>log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, m, d),
        (m,d)=>log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, m, d)
      );

      await _upgradeCacheFileIfNeeded(
        PATH_FILE_PROJECT_CACHE_STATICUS,
        'compiler',
        (m,d)=>log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, m, d),
        (m,d)=>log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, m, d)
      );

      await _upgradeCacheFileIfNeeded(
        PATH_FILE_PROJECT_CACHE_IMAGE,
        'image',
        (m,d)=>log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, m, d),
        (m,d)=>log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, m, d)
      );

      // ---------------------------------------------------------------------
      // 1.1.0: brand foreground_wide → foreground-wide (input file + cache key)
      // ---------------------------------------------------------------------
      await _moveFileIfExistsMigration(
        `${PATH_DIR_PROJECT_IN_ASSET}brand/foreground_wide.png`,
        `${PATH_DIR_PROJECT_IN_ASSET}brand/foreground-wide.png`
      );

      // Keep cacheProjectFile keys in sync (root is PATH_DIR_PROJECT_IN, so keys are typically `asset/...`)
      libraryCacheRewritePathKeysFromNormalizeMapping(
        cacheProjectFile,
        [
          { from: 'asset/brand/foreground_wide.png', to: 'asset/brand/foreground-wide.png' }
        ],
        { label: 'project file cache', logTag: LOG_TAG_PROJECT_VERSION_MIGRATION }
      );

      // ---------------------------------------------------------------------
      // 1.1.0: font_icon → font-icon (dirs + css filenames + cache keys + reference rewrites)
      // ---------------------------------------------------------------------
      await _migrateFontIconDirs_110();

      // Rename any legacy out min.css filenames that still start with `font_icon_`
      await _migrateFontIconOutMinCssNames_110();

      // Rename any legacy font files under out/asset/font-icon/** that still start with `font_icon_`
      await _migrateFontIconOutFontFileNames_110();

      // IMPORTANT:
      // Must happen AFTER dirs/files are moved, otherwise refs could be rewritten to paths that
      // don't exist yet.
      _migrateFontIconTextRefs_110();

      await _migrateFontIconCacheEntries_110(PATH_FILE_PROJECT_CACHE_FILE);
      await _migrateFontIconCacheEntries_110(PATH_FILE_PROJECT_CACHE_STATICUS);
      await _migrateFontIconCacheEntries_110(PATH_FILE_PROJECT_CACHE_IMAGE);

      // ---------------------------------------------------------------------
      // 1.1.0: Handlebars refs now resolve from project config root (not custom root)
      // - brand.*   => custom.brand.*
      // - site.*    => custom.site.*
      // - ../require.* => require.*
      // - ../option.*  => option.*
      // ---------------------------------------------------------------------
      await _migrateHandlebarsCustomRootRefs_110(
        PATH_DIR_PROJECT_IN_HTML_PARTIAL,
        Object.keys(configProjectMerge?.custom || {})
      );

      const NODE_CURE_FS = require('@custom/cure-fs');

      let configData = {};
      let configDataBeforeMoves = {};
      let updated = false;

      const hasProjectConfig = await NODE_CURE_FS.doesExistFileAsync(PATH_FILE_CONFIG_PROJECT);

      try {
        if (hasProjectConfig) {
          configData = NODE_CURE_JSON.load(PATH_FILE_CONFIG_PROJECT);
          configDataBeforeMoves = NODE_CURE_JSON.clone(configData);
        } else {
          log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Project config.json not found; continuing with defaults for placeholder wrap.', {
            PATH_FILE_CONFIG_PROJECT
          });
        }

        /**
         * 1.1.0 Config Moves
         *
         * Single source-of-truth:
         * - Used to mutate config.json (when present)
         * - Used to rewrite placeholder prefixes during walk+wrap (always)
         *
         * @type {Array<{
         *   id: string;
         *   from: string;
         *   to: string;
         *   apply: (cfg: any) => boolean;
         * }>}
         */
        const CONFIG_MOVES = [
          {
            id: 'ignore_package_to_package_ignore',
            from: 'option.path.ignore_package',
            to: 'option.package.ignore',
            apply: (cfg) => {
              if (
                cfg?.option?.path?.ignore_package &&
                (!cfg.option.package || !cfg.option.package.ignore)
              ) {
                cfg.option.package = cfg.option.package || {};
                cfg.option.package.ignore = cfg.option.path.ignore_package;
                delete cfg.option.path.ignore_package;
                return true;
              }
              return false;
            }
          },
          {
            id: 'ignore_nav_to_navigation_ignore_patterns',
            from: 'option.path.ignore_nav',
            to: 'option.navigation.shared.ignore_patterns',
            apply: (cfg) => {
              if (cfg?.option?.path?.ignore_nav) {
                cfg.option.navigation = cfg.option.navigation || {};
                cfg.option.navigation.ignore_patterns = cfg.option.path.ignore_nav;
                delete cfg.option.path.ignore_nav;
                return true;
              }
              return false;
            }
          },
          {
            id: 'breadcrumb_to_navigation_breadcrumb',
            from: 'option.breadcrumb',
            to: 'option.navigation.breadcrumb',
            apply: (cfg) => {
              if (cfg?.option?.breadcrumb !== undefined) {
                cfg.option.navigation = cfg.option.navigation || {};
                cfg.option.navigation.breadcrumb = cfg.option.breadcrumb;
                delete cfg.option.breadcrumb;
                return true;
              }
              return false;
            }
          },
          {
            id: 'toc_to_navigation_toc',
            from: 'option.toc',
            to: 'option.navigation.toc',
            apply: (cfg) => {
              if (cfg?.option?.toc !== undefined) {
                cfg.option.navigation = cfg.option.navigation || {};
                cfg.option.navigation.toc = cfg.option.toc;
                delete cfg.option.toc;
                return true;
              }
              return false;
            }
          },

          // URL config rename (legacy -> standard):
          // - html_extension: true  => include ".html"
          // - clean:          false => include ".html"
          // So: clean = !html_extension
          {
            id: 'html_extension_to_clean',
            from: 'option.url.html_extension',
            to: 'option.url.clean',
            apply: (cfg) => {
              const hasLegacy = (typeof cfg?.option?.url?.html_extension === 'boolean');
              if (!hasLegacy) return false;

              cfg.option.url = cfg.option.url || {};

              // Only set clean if not already defined (do not clobber new config).
              if (typeof cfg.option.url.clean !== 'boolean') {
                cfg.option.url.clean = !cfg.option.url.html_extension;
              }

              delete cfg.option.url.html_extension;
              return true;
            }
          },

          {
            id: 'minify_js_to_js_minify',
            from: 'option.minify.js',
            to: 'option.js.minify',
            apply: (cfg) => {
              if (cfg?.option?.minify?.js !== undefined) {
                cfg.option.js = cfg.option.js || {};
                if (cfg.option.js.minify === undefined) {
                  cfg.option.js.minify = cfg.option.minify.js;
                }
                delete cfg.option.minify.js;
                return true;
              }
              return false;
            }
          },

          // ... other changes as entries here ...
        ];

        // -------------------------------------------------------------------------
        // Apply moves (when config is present). Still safe to run even if missing.
        // -------------------------------------------------------------------------
        for (const mv of CONFIG_MOVES) {
          const didMove = mv.apply(configData);
          if (didMove) {
            updated = true;
            log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, `Moved "${mv.from}" to "${mv.to}"`);
          }
        }

        // 1.1.0 compatibility:
        // - Empty arrays: restore legacy safety values.
        // - Non-empty arrays: keep legacy values, append "no-package" if missing, dedupe.
        // - Missing keys: do not create.
        if (hasProjectConfig) {
          const packageIgnore = configData?.option?.package?.ignore;
          if (Array.isArray(packageIgnore)) {
            if (packageIgnore.length === 0) {
              packageIgnore.push('example');
              updated = true;
              log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Added legacy "example" to empty option.package.ignore');
            } else {
              const next = Array.from(new Set([...packageIgnore, 'no-package']));
              if (next.length !== packageIgnore.length || next.some((v, i) => v !== packageIgnore[i])) {
                packageIgnore.splice(0, packageIgnore.length, ...next);
                updated = true;
                log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Added "no-package" to option.package.ignore (legacy values preserved, deduped)');
              }
            }
          }

          const packageHtmlIgnoreClass = configData?.option?.package?.html?.ignore_class;
          if (Array.isArray(packageHtmlIgnoreClass)) {
            if (packageHtmlIgnoreClass.length === 0) {
              packageHtmlIgnoreClass.push('package-ignore');
              updated = true;
              log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Added legacy "package-ignore" to empty option.package.html.ignore_class');
            } else {
              const next = Array.from(new Set([...packageHtmlIgnoreClass, 'no-package']));
              if (next.length !== packageHtmlIgnoreClass.length || next.some((v, i) => v !== packageHtmlIgnoreClass[i])) {
                packageHtmlIgnoreClass.splice(0, packageHtmlIgnoreClass.length, ...next);
                updated = true;
                log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Added "no-package" to option.package.html.ignore_class (legacy values preserved, deduped)');
              }
            }
          }
        }

        if (updated && hasProjectConfig) {
          NODE_CURE_JSON.save(
            PATH_FILE_CONFIG_PROJECT,
            configData,
            { sort: libraryConfigGet(configData, 'option.config.sort') }
          );
          log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Saved updated config.json');

          // Reload config into memory
          _loadConfigProject();
        } else if (updated && !hasProjectConfig) {
          // Should be rare (moves generally require source keys), but keep behavior explicit.
          log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Config moves would have applied, but config.json is missing; nothing saved.', {
            PATH_FILE_CONFIG_PROJECT
          });
        }

        // =====================================================================
        // Wrap CONFIG_* and AUTOMATIC_* placeholders in .html/.md/.webmanifest files (ALWAYS)
        // - First: rewrite moved CONFIG_* tokens (prefix-based; supports descendants)
        //   regardless of whether they exist in the project's config.json.
        // - Then: wrap only known CONFIG_* tokens from the post-move flat map (safety),
        //   while still wrapping AUTOMATIC_* tokens.
        // =====================================================================
        const exts = ['.html', '.md', '.webmanifest'];

        // Use the real merged config object (defaults + project config) that the rest of the compiler uses.
        // Clone so we can "virtually" apply CONFIG_MOVES even if config.json is missing (we still want wrapping to be correct).
        const mergedAfterAll = NODE_CURE_JSON.clone(configProjectMerge);

        // Ensure the allow-map reflects the post-move schema even if config.json is missing.
        // (Same move list = single source of truth.)
        for (const mv of CONFIG_MOVES) {
          try { mv.apply(mergedAfterAll); } catch {}
        }

        // Pull delimiter from the same merged config surface.
        const delimiter = libraryConfigGet(mergedAfterAll, 'option.replace.delimiter');

        // Build post-move flat map EXACTLY like the rest of the pipeline does.
        const flatAfterAll = NODE_CURE_JSON.flatten(mergedAfterAll, { prefix: 'CONFIG_' });

        // Allowed tokens = everything the flatten pipeline exposes.
        // Also add "base" tokens for index forms (…_0, …_1) by stripping a trailing _<number>.
        const allowedTokens = new Set(Object.keys(flatAfterAll));

        // Build prefixMoves from the SAME CONFIG_MOVES list (single source-of-truth).
        // NOTE: No allowedTokens check here — rewrite happens before wrapping.
        const prefixMoves = CONFIG_MOVES.map((mv) => ({
          fromPrefix: _configPathToTokenPrefix(mv.from),
          toPrefix:   _configPathToTokenPrefix(mv.to),
        }));

        await _walkAndWrap(PATH_DIR_PROJECT_IN, exts, delimiter, {
          allowedTokens,
          prefixMoves
        });

      } catch (err) {
        log.error(LOG_TAG_PROJECT_VERSION_MIGRATION, '1.1.0 migration:', { err });
      }

    }
  },
  // migration: 1.1.1
  {
    to: '1.1.1',
    name: 'Remove stale font-icon template checksum from project file cache',
    run: async () => {
      const result = await _moveFontIconTemplateChecksumProjectToCompilerCache_111(
        PATH_FILE_PROJECT_CACHE_FILE,
        PATH_FILE_PROJECT_CACHE_STATICUS
      );
      const removedKeys = Array.isArray(result?.removedKeys) ? result.removedKeys : [];
      const movedSignature = (typeof result?.movedSignature === 'string') ? result.movedSignature : null;

      if (!removedKeys.length) return;

      // Keep in-memory cache in sync for the current process so later saves do not restore removed keys.
      for (const key of removedKeys) {
        try {
          cacheProjectFile.clear(CACHE_NAMESPACE_FONT_ICON, key, false);
        } catch (_) {}
      }

      try {
        cacheProjectFile.save();
      } catch (err) {
        log.notice(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Failed saving in-memory project file cache after 1.1.1 cleanup.', {
          err: String(err?.message || err),
          removedKeys
        });
      }

      if (movedSignature) {
        try {
          const entriesRoot = (cacheRoot && cacheRoot.entries && typeof cacheRoot.entries === 'object')
            ? cacheRoot.entries
            : null;
          const ns = entriesRoot
            ? (entriesRoot[CACHE_NAMESPACE_FONT_ICON] || (entriesRoot[CACHE_NAMESPACE_FONT_ICON] = {}))
            : null;
          if (ns && typeof ns === 'object') {
            ns['config/default/project/font-icon-template.scss'] = { signature: movedSignature };
          }
          cacheRoot.save();
        } catch (err) {
          log.notice(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Failed saving in-memory compiler file cache after 1.1.1 font-icon template move.', {
            err: String(err?.message || err),
            signature: movedSignature
          });
        }
      }
    }
  },
  // migration: 1.1.2
  {
    to: '1.1.2',
    name: 'Merge legacy HTML-related project file cache namespaces into unified html namespace',
    run: async () => {
      const result = migrateProjectFileCacheNamespacesToUnifiedHtml();
      log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, '1.1.2 HTML cache namespace merge complete.', result);
    }
  },
  // migration: 1.1.3
  {
    to: '1.1.3',
    name: 'Convert legacy syntax highlight theme include to bundle fallback key',
    run: async () => {
      const result = _migrateHighlightSyntaxConfig_113();
      log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, '1.1.3 syntax highlight config migration complete.', result);
    }
  },
  // migration: 1.1.4
  {
    to: '1.1.4',
    name: 'Ensure dev panel shared state cache is ignored in project gitignore',
    run: async () => {
      const gitignorePath = `${PATH_DIR_PROJECT}.gitignore`;

      await _ensureGitignoreRulesFromDefault(
        gitignorePath,
        `${PATH_DIR_ROOT_CONFIG_DEFAULT_PROJECT}gitignore.txt`
      );

      await _ensureGitignoreRuleIfMissing(
        gitignorePath,
        '_cache/project/dev-panel.json',
        '# Ignore dev panel shared state #'
      );

      log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, '1.1.4 dev panel gitignore migration complete.', {
        gitignorePath
      });
    }
  },
  // migration: 1.1.5
  {
    to: '1.1.5',
    name: 'Move legacy _html/config/template Handlebars files into _html/config',
    run: async () => {
      const result = await _migrateHtmlConfigTemplateLayout_115();
      log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, '1.1.5 HTML config template layout migration complete.', result);
    }
  },
];

/** Filter & sort migrations to run (inclusive upper bound) */
function _getPendingMigrations(fromVersion, toVersion) {
  return MIGRATIONS
    .filter(m => _semverLt(fromVersion, m.to) && _semverLe(m.to, toVersion))
    .sort((a, b) => _compareVersions(a.to, b.to));
}

// ----------------------------------------
// Upgrade Runner
// ----------------------------------------
async function _runMigrations(fromVersion, toVersion, { dryRun = false } = {}) {
  const pending = _getPendingMigrations(fromVersion, toVersion);

  if (!pending.length) {
    log.notice(LOG_TAG_PROJECT_VERSION_UPGRADE, 'No migrations required.');
    return;
  }

  log.notice(LOG_TAG_PROJECT_VERSION_UPGRADE, 'Migrations to apply:', {
    from: fromVersion, to: toVersion,
    steps: pending.map(m => m.to)
  });

  // const backupDir = makeBackupDir();
  // if (!dryRun) {
  //   await ensureDir(backupDir);
  //   log.info(LOG_TAG_PROJECT_VERSION_UPGRADE, 'Backup dir ready:', { backupDir });
  // } else {
  //   log.warn(LOG_TAG_PROJECT_VERSION_UPGRADE, 'Dry run enabled — no files will be changed.');
  // }

  // // Optional: You can snapshot the current info.json into backup
  // const NODE_CURE_FS = require('@custom/cure-fs');
  // if (!dryRun && await NODE_CURE_FS.doesExistFileAsync(PATH_FILE_CONFIG_PROJECT_INFO)) {
  //   await safeCopy(PATH_FILE_CONFIG_PROJECT_INFO, NODE_CURE_PATH.join(backupDir, 'info.json.bak'));
  // }

  // Context passed to each migration in case you want shared utils/state
  const ctx = {};

  for (const m of pending) {
    log.begin(LOG_TAG_PROJECT_VERSION_MIGRATION, `to ${m.to} :: ${m.name}`);
    try {
      if (!dryRun) {
        await m.run(ctx);

        // Keep file cache signatures consistent with migration-made content changes.
        // Scope is limited to existing cache keys (no broad normalize-paths behavior).
        try {
          await libraryCacheRefreshStaleEntries(cacheProjectFile, {
            logTag: LOG_TAG_PROJECT_VERSION_MIGRATION,
            label: 'cacheProjectFile (post-migration)',
            reloadFromDisk: true
          });
        } catch (cacheErr) {
          log.warn(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Post-migration cache stale-entry refresh failed (continuing).', {
            to: m.to,
            error: String(cacheErr?.message || cacheErr)
          });
        }

        await _persistProjectVersion(m.to);   // write info.json after each step
      } else {
        log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, '(dry run) would execute:', { to: m.to, name: m.name });
      }
      log.success(LOG_TAG_PROJECT_VERSION_MIGRATION, `✓ Completed ${m.to}`);
    } catch (err) {
      log.error(LOG_TAG_PROJECT_VERSION_MIGRATION, `✗ Failed at ${m.to}`, err);
      log.warn(LOG_TAG_PROJECT_VERSION_UPGRADE, 'Upgrade halted. Project info remains at the last successful version.');
      throw err; // bubble up so caller can decide (abort, prompt, etc.)
    } finally {
      log.end(LOG_TAG_PROJECT_VERSION_MIGRATION, `Step ${m.to} complete.`);
    }
  }
}

async function _ensureGitignoreRulesFromDefault(filePath, defaultRulesPath) {
  const NODE_CURE_FS = require('@custom/cure-fs');
  if (!(await NODE_CURE_FS.doesExistFileAsync(defaultRulesPath))) return;

  const defaultContent = NODE_FS.readFileSync(defaultRulesPath, 'utf8');
  const existing = (await NODE_CURE_FS.doesExistFileAsync(filePath))
    ? NODE_FS.readFileSync(filePath, 'utf8').split(/\r?\n/)
    : [];

  const existingSet = new Set(existing.map(line => line.trim()));

  const result = [...existing]; // start with existing rules

  // Go through default file in order
  defaultContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) {
      // preserve blank lines from template if the previous result line isn't blank
      if (result.length && result[result.length - 1].trim() !== '') {
        result.push('');
      }
      return;
    }
    if (!existingSet.has(trimmed)) {
      result.push(line); // preserve indentation/comment marker
    }
  });

  NODE_CURE_FS.writeFileSync(filePath, result.join('\n').trim() + '\n');
  log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Updated .gitignore with default rules (template order)');
}

async function _removePackageZipIgnore(filePath, patternsToRemove) {
  const NODE_CURE_FS = require('@custom/cure-fs');
  if (!(await NODE_CURE_FS.doesExistFileAsync(filePath))) return;

  let contents = NODE_FS.readFileSync(filePath, 'utf8').split(/\r?\n/);

  // Filter out any lines matching the patterns
  contents = contents.filter(line => !patternsToRemove.includes(line.trim()));

  NODE_CURE_FS.writeFileSync(filePath, contents.join('\n').trim() + '\n');
  log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Removed packaged files ignore rule from .gitignore');
}

async function _ensureGitignoreRuleIfMissing(filePath, ruleLine, headerComment = '') {
  const NODE_CURE_FS = require('@custom/cure-fs');
  const rule = String(ruleLine || '').trim();
  const header = String(headerComment || '').trim();
  if (!rule) return;

  const existing = (await NODE_CURE_FS.doesExistFileAsync(filePath))
    ? NODE_FS.readFileSync(filePath, 'utf8').split(/\r?\n/)
    : [];

  const rulePresent = existing.some((line) => {
    const trimmed = line.trim();
    return (
      trimmed === rule ||
      trimmed === `#${rule}` ||
      trimmed === `# ${rule}`
    );
  });

  if (rulePresent) {
    log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, '.gitignore already contains target rule (active or commented).', {
      filePath,
      rule
    });
    return;
  }

  const next = [...existing];
  while (next.length && next[next.length - 1].trim() === '') {
    next.pop();
  }
  if (next.length) {
    next.push('');
  }
  if (header) {
    next.push(header);
  }
  next.push(rule);

  NODE_CURE_FS.writeFileSync(filePath, next.join('\n').trim() + '\n');
  log.info(LOG_TAG_PROJECT_VERSION_MIGRATION, 'Added missing .gitignore rule.', {
    filePath,
    rule
  });
}

/**
 * @param {any} fromVersion
 * @param {any} toVersion
 * @param {boolean} doDryRun // Optional extra confirmation here if you want (default = `false`).
 */
async function _projectUpgradePerform(fromVersion, toVersion, doDryRun = false) {
  log.begin(LOG_TAG_PROJECT_VERSION_UPGRADE, 'Running:', {
    'Version': {
      'From': fromVersion,
      'To': toVersion
    },
    'Dry': doDryRun
  });

  await _runMigrations(fromVersion, toVersion, { dryRun: doDryRun });

  _updateProjectInfo();
  _updateVersionInfo();

  log.end(LOG_TAG_PROJECT_VERSION_UPGRADE, 'Complete.');
}

async function update_project_full() {
  await _projectUpgradePerform('1.0.0', versionInfo.current);
}

/**
 * Standard project update task:
 * run the normal migration path only (upgrade current project version to the
 * current compiler version when needed), without full-reset maintenance extras
 * or manual version-range prompting.
 */
async function update_project_standard() {
  _updateVersionInfo();
  await _projectUpgrade();
}

/**
 * Maintenance task: prompt user for a directed upgrade range (start/end),
 * then perform the project upgrade steps for that range.
 *
 * Rules:
 * - 1.0.0 is always available and always the lowest option.
 * - End list is constrained to versions >= chosen start.
 */
async function project_update_manual() {
  const LOG_TAG_PROJECT_UPDATE = '[🛠️ Project Update]';
  const NODE_CURE_PROMPT = require('@custom/cure-prompt');

  // Build version list: always include 1.0.0, then all migration "to" versions,
  // and the compiler current (in case it diverges).
  const versionSet = new Set([
    '1.0.0',
    ...MIGRATIONS.map(m => m.to),
    versionInfo.current
  ]);

  /** @type {string[]} */
  const versions = Array.from(versionSet).sort((a, b) => _compareVersions(a, b));

  // Ensure 1.0.0 is present and first (even if sorting logic changes later)
  if (!versions.includes('1.0.0')) versions.unshift('1.0.0');
  versions.sort((a, b) => _compareVersions(a, b));
  if (versions[0] !== '1.0.0') {
    versions.splice(versions.indexOf('1.0.0'), 1);
    versions.unshift('1.0.0');
  }

  /**
   * @param {string} label
   * @param {string[]} options
   * @param {number} defaultIndex
   * @returns {Promise<string>}
   */
  async function promptPick(label, options, defaultIndex) {
    /** @type {Record<string, string>} */
    const versionList = options.reduce((acc, v, i) => {
      const suffix = (i === defaultIndex) ? ' (default)' : '';
      acc[String(i)] = `${v}${suffix}`;
      return acc;
    }, /** @type {Record<string, string>} */ ({}));

    log.info(LOG_TAG_PROJECT_UPDATE, `${label} versions available:`, versionList);

    while (true) {
      const answer = await NODE_CURE_PROMPT.promptUser(
        `${label} version - select an index from above or type version (default ${defaultIndex}): `
      );

      const raw = String(answer || '').trim();

      if (!raw) return options[defaultIndex];

      // Allow quick abort
      if (raw === 'q' || raw === 'quit' || raw === 'exit') {
        log.info(LOG_TAG_PROJECT_UPDATE, '[🛑 Aborted]', 'Process aborted by user.');
        process.exit(0);
      }

      // Index selection
      if (/^\d+$/.test(raw)) {
        const idx = Number(raw);
        if (idx >= 0 && idx < options.length) return options[idx];
      }

      // Direct version selection
      if (options.includes(raw)) return raw;

      log.warn(LOG_TAG_PROJECT_UPDATE, 'Invalid selection. Try again.', {
        input: raw
      });
    }
  }

  log.begin(LOG_TAG_PROJECT_UPDATE, 'Running directed project update...');

  const start = await promptPick('Start', versions, 0);

  // End options must be strictly > start (ONLY versions above start)
  const endOptions = versions.filter(v => _compareVersions(v, start) === VERSION_COMPARE.NEW);

  /** @type {string} */
  let end = start;

  // If start is already the newest version, there are no valid "end" choices.
  if (endOptions.length === 0) {
    log.notice(LOG_TAG_PROJECT_UPDATE, 'No end versions available above selected start; using start as end.', {
      start,
      end: start
    });
  } else {
    const endDefault = Math.max(0, endOptions.length - 1);
    end = await promptPick('End', endOptions, endDefault);
  }

  log.notice(LOG_TAG_PROJECT_UPDATE, 'Selected update range:', { from: start, to: end });

  // IMPORTANT: This runs migrations + gitignore + project/version info updates.
  await _projectUpgradePerform(start, end, false);

  log.end(LOG_TAG_PROJECT_UPDATE, 'Complete.');
}

async function _projectUpgrade() {
  if (versionInfo.status.value != VERSION_COMPARE.OLD) {
    log.notice(LOG_TAG_PROJECT_VERSION_UPGRADE, 'No project upgrade required, skipping...');
    return;
  }
  log.notice(LOG_TAG_PROJECT_VERSION_UPGRADE, 'versionInfo', {versionInfo});

  await _projectUpgradePerform(
    configProjectInfo.version,
    versionInfo.current
  );

  // Do NOT exit; allow the main task chain to proceed.
  log.success(LOG_TAG_PROJECT_VERSION_UPGRADE, 'Project successfully upgraded. Continuing...');
}

async function _handleVersionCheck(done) {
  log.begin(LOG_TAG_PROJECT_VERSION_CHECK, 'Running...');

  _updateVersionInfo();

  log[versionInfo.status.value == VERSION_COMPARE.EQUAL ? 'debug' : 'info'](LOG_TAG_PROJECT_VERSION_CHECK, 'Version Info:', versionInfo);

  switch (versionInfo.status.value) {
    case VERSION_COMPARE.NEW: // running might fail
      log.warn(LOG_TAG_PROJECT_VERSION_CHECK,
        `Project was built using a newer version of ${COMPILER_TITLE_FULL}, project may not be compatible...`
      );
      break;
    case VERSION_COMPARE.OLD: // update available
      log.info(LOG_TAG_PROJECT_VERSION_CHECK,
        `Project was built using a older version of ${COMPILER_TITLE_FULL}. An in-place upgrade will be performed to continue...`
      );
      break;
    default:
      log.success(LOG_TAG_PROJECT_VERSION_CHECK, 'Versions match. Proceeding with tasks.');
  }

  function userAbort() {
    log.info(LOG_TAG_PROJECT_VERSION_CHECK, '[🛑 Aborted]', 'Process aborted by user.');
    process.exit(0);
  }

  const autoYesRaw = String(
    process.env.SYNTICORE_MIGRATION_AUTO_Y
      ?? process.env.SYNTICORE_AUTO_Y
      ?? ''
  ).trim().toLowerCase();
  const migrationAutoYes = autoYesRaw === '1' || autoYesRaw === 'true' || autoYesRaw === 'yes' || autoYesRaw === 'y';

  if (versionInfo.status.value != VERSION_COMPARE.EQUAL) {
    const NODE_CURE_PROMPT = require('@custom/cure-prompt');

    const answer = migrationAutoYes
      ? 'y'
      : await NODE_CURE_PROMPT.promptUser('Would you like to continue anyway? [y/N]: ');
    if (!(answer === 'yes' || answer === 'y')) {
      userAbort();
    }

    if (versionInfo.status.value == VERSION_COMPARE.NEW) {
      const answer = migrationAutoYes
        ? 'y'
        : await NODE_CURE_PROMPT.promptUser('Project may not be compatible, are you absolutely sure? [y/N]: ');
      if (!(answer === 'yes' || answer === 'y')) {
        userAbort();
      }
    }

    log.info(
      LOG_TAG_PROJECT_VERSION_CHECK,
      migrationAutoYes ? 'Process continued by auto-confirm.' : 'Process continued by user.'
    );

    await _projectUpgrade();
  }

  log.end(LOG_TAG_PROJECT_VERSION_CHECK, 'Complete.');

  done();
}

log.end(LOG_TAG_INITIALIZE_PROJECT_VERSION, 'Complete.');

// -----------------------------------------------------------------------------
// #### Initialize - Project - Config (Post Version)
// -----------------------------------------------------------------------------

const LOG_TAG_INITIALIZE_PROJECT_CONFIG_POST_VERSION = LOG_TAG_INITIALIZE_PROJECT_CONFIG + ' (Post Version)';

log.begin(LOG_TAG_INITIALIZE_PROJECT_CONFIG_POST_VERSION, 'Loading...');

const LOG_TAG_CONFIG_PROJECT = LOG_TAG_CONFIG + ' ' + LOG_TAG_PROJECT;

let configProject = {};
let configProjectMerge = {};
let configProjectFlat = {};
let configProjectMergeSnapshot = {};

function _loadConfigProject(sortAndSave = false) {
  log.begin(LOG_TAG_CONFIG_PROJECT, 'Loading...');

  // Log the file being processed
  log.info(LOG_TAG_CONFIG_PROJECT, 'Processing file:', { PATH_FILE_CONFIG_PROJECT });

  // Reload the project config
  try {
    // log.debug('Config Reference Before:', configProject);
    configProject = NODE_CURE_JSON.load(PATH_FILE_CONFIG_PROJECT);

    if (sortAndSave) { // (configProject?.option?.config?.sort === true) {
      try {
        NODE_CURE_JSON.save(PATH_FILE_CONFIG_PROJECT, configProject, { sort: true });
        log.info(LOG_TAG_CONFIG_PROJECT, 'Project config sorted and saved.');
      } catch (err) {
        log.error(LOG_TAG_CONFIG_PROJECT, 'Failed to sort/save project config:', err);
      }
    }

    // log.debug('Config Reference After:', configProject);
    log.success(LOG_TAG_CONFIG_PROJECT, 'Project configuration loaded.');
  } catch (error) {
    log.warn(LOG_TAG_CONFIG_PROJECT, `Failed to load ${PATH_FILE_CONFIG_PROJECT}, using defaults.`, error);
    configProject = {};
  }

  // Ensure required variables exist in project config
  const requiredKeys = Object.keys(CONFIG_PROJECT_DEFAULT.require || {});
  let missingKeys = [];
  let duplicateKeys = [];
  let uniqueValueCheck = new Set();

  requiredKeys.forEach(key => {
    const projectValue = configProject.require?.[key];
    const defaultValue = CONFIG_PROJECT_DEFAULT.require[key];

    log.detail(LOG_TAG_CONFIG_PROJECT, 'Checking required key:', {
      key,
      projectValue,
      defaultValue,
      isMissing: projectValue === undefined || projectValue === null
    });

    if (projectValue === undefined || projectValue === null) {
      // If the required key is missing in project config, use the default
      configProject.require = configProject.require || {};
      configProject.require[key] = defaultValue;
      missingKeys.push(key);

      log.warn(LOG_TAG_CONFIG_PROJECT, `Missing required key, using default value:`, {
        key,
        defaultValue
      });
    }

    // Check for duplicate values across required fields
    if (uniqueValueCheck.has(projectValue)) {
      duplicateKeys.push(key);
      log.warn(LOG_TAG_CONFIG_PROJECT, `Duplicate value found for key:`, {
        key,
        value: projectValue
      });
    } else {
      uniqueValueCheck.add(projectValue);
    }
  });

  {
    const currentTitleRaw = configProject?.require?.site?.title;
    const currentTitle = (currentTitleRaw == null) ? '' : String(currentTitleRaw).trim();

    if (!currentTitle) {
      const requireSiteUrl = String(configProject?.require?.site?.url || '').trim();
      const suggestedTitle = requireSiteUrl || 'My Site';

      // Ensure path exists, then auto-fill so downstream title logic has *something*.
      configProject.require = configProject.require || {};
      configProject.require.site = configProject.require.site || {};
      configProject.require.site.title = suggestedTitle;

      log.warn(
        LOG_TAG_CONFIG_PROJECT,
        'Missing required key:',
        {
          key: 'require.site.title',
          value: {
            current: currentTitleRaw,
            using: suggestedTitle
          }
        },
        '\n> Update require.site.title to your preferred site title.'
      );
    }
  }

  // Log warnings for missing or duplicate keys
  if (missingKeys.length > 0) {
    log.warn(LOG_TAG_CONFIG_PROJECT, `Missing required keys in project config. Using defaults:`, missingKeys);
  }
  if (duplicateKeys.length > 0) {
    // Terminate execution if duplicates are found
    log.fatal(LOG_TAG_CONFIG_PROJECT, `Duplicate values detected in required config fields:`, duplicateKeys);
  }

  // Deep merge default config with project config (project config takes priority)
  configProjectMerge = NODE_CURE_JSON.merge(NODE_CURE_JSON.clone(CONFIG_PROJECT_DEFAULT), configProject);
  log.debug(LOG_TAG_CONFIG_PROJECT, 'Merged Config Values:', configProjectMerge);

  // Create a shallow copy of configProjectMerge without the 'option' property
  const { option, ...configProjectMergeWithoutOption } = configProjectMerge;

  // Flatten config without 'option'
  configProjectFlat = NODE_CURE_JSON.flatten(configProjectMergeWithoutOption);

  log.end(LOG_TAG_CONFIG_PROJECT, 'Loaded.');
}

_loadConfigProject();
configProjectMergeSnapshot = NODE_CURE_JSON.clone(configProjectMerge);

log.end(LOG_TAG_INITIALIZE_PROJECT_CONFIG_POST_VERSION, 'Loaded.');

log.init(LOG_TAG_INITIALIZE_PROJECT, 'Complete.');

// -----------------------------------------------------------------------------
// ### Initialize - Hardware
// -----------------------------------------------------------------------------

const LOG_TAG_INITIALIZE_HARDWARE = LOG_TAG_INITIALIZE + ' [🖥️ Hardware]';

log.init(LOG_TAG_INITIALIZE_HARDWARE, 'Detecting...');

// ;(() => {
const HARDWARE_CPU_CORES = (() => {
  try {
    const os = require('os');
    const list = typeof os.cpus === 'function' ? os.cpus() : null;
    return Array.isArray(list) && list.length > 0 ? list.length : 1;
  } catch {
    return 1;
  }
})();

// Prefer config value; else use (cores - 1), min 1
const HARDWARE_CPU_THREAD_COUNT =
  Math.max(
    1,
    Number(
      configProjectMerge?.option?.image?.threads ??
      (HARDWARE_CPU_CORES > 1 ? HARDWARE_CPU_CORES - 1 : 1)
    )
  );

process.env.OMP_NUM_THREADS      = String(HARDWARE_CPU_THREAD_COUNT); // GraphicsMagick / OpenMP
process.env.MAGICK_THREAD_LIMIT  = String(HARDWARE_CPU_THREAD_COUNT); // ImageMagick

log.info(LOG_TAG_INITIALIZE_HARDWARE, 'Detected:', {
  cores: HARDWARE_CPU_CORES,
  threads: HARDWARE_CPU_THREAD_COUNT,
  source: (configProjectMerge?.option?.image?.threads != null) ? 'config.option.image.threads' : 'auto(cores-1)'
});
// })();

log.init(LOG_TAG_INITIALIZE_HARDWARE, 'Complete.');

// -----------------------------------------------------------------------------
// ### Initialize - Library
// -----------------------------------------------------------------------------

function libraryConfigGet(configData, path, fallbackRoot = CONFIG_PROJECT_DEFAULT) {
  const segments = path.split('.');
  let val = configData;

  for (const seg of segments) {
    if (val && typeof val === 'object' && seg in val) {
      val = val[seg];
    } else {
      val = undefined;
      break;
    }
  }

  if (val !== undefined) return val;

  // fallback lookup
  let fallback = fallbackRoot;
  for (const seg of segments) {
    if (fallback && typeof fallback === 'object' && seg in fallback) {
      fallback = fallback[seg];
    } else {
      fallback = undefined;
      break;
    }
  }
  return fallback;
}

log.init(LOG_TAG_INITIALIZE, 'Complete.');

// =============================================================================
// ## Main
// =============================================================================

const LOG_TAG_MAIN = '[🏠 Main]';

log.init(LOG_TAG_MAIN, 'Running...');

// -----------------------------------------------------------------------------
// ### Main - Variable
// -----------------------------------------------------------------------------

const LOG_TAG_MAIN_VARIABLE = LOG_TAG_MAIN + ' ' + LOG_TAG_VARIABLE;

log.begin(LOG_TAG_MAIN_VARIABLE, 'Instantiating...');

const PATH_ROOT = './';
const PATH_ALL = `**/*`;

const PATH_DIR_PROJECT_OUT       = `${PATH_DIR_PROJECT}out/`;
const PATH_DIR_PROJECT_IN_ASSET  = `${PATH_DIR_PROJECT_IN}asset/`;
const PATH_DIR_PROJECT_OUT_ASSET = `${PATH_DIR_PROJECT_OUT}asset/`;

const PATH_DIR_OUT_SOURCEMAP = PATH_ROOT;

const getPathIgnorePrefix = () => configProjectMerge.option.path.ignore_prefix;

const createPathArray = (basePath = '', ignore = true, customPrefix = null) => {
  const prefix = customPrefix || getPathIgnorePrefix();
  const PATH_IGNORE_PREFIX_ALL = `**/${prefix}*`;
  const paths = [
    `${prefix}*`,                  // Top-level
    PATH_IGNORE_PREFIX_ALL,        // Deep match
    `${PATH_IGNORE_PREFIX_ALL}/**` // Deep match contents
  ];
  return paths.map(path => `${ignore ? '!' : ''}${NODE_PATH.posix.join(basePath, path)}`);
};

const PATH_DIR_IN_IGNORE_BASE_ROOT    = PATH_ROOT;
const PATH_DIR_IN_IGNORE_BASE_PROJECT = PATH_DIR_PROJECT_IN;

const PATH_DIR_IN_IGNORE         = createPathArray('', false, '');
const PATH_DIR_IN_IGNORE_ROOT    = createPathArray(PATH_DIR_IN_IGNORE_BASE_ROOT);
const PATH_DIR_IN_IGNORE_PROJECT = createPathArray(PATH_DIR_IN_IGNORE_BASE_PROJECT);

const PATH_DIR_IN_IGNORE_PROJECT_ASSET = `!${PATH_DIR_PROJECT_IN_ASSET}${PATH_ALL}`;

log.end(LOG_TAG_MAIN_VARIABLE, 'Instantiated.');

// -----------------------------------------------------------------------------
// ### Main - Node Modules
// -----------------------------------------------------------------------------

const LOG_TAG_MAIN_NODE_JS = LOG_TAG_MAIN + ' ' + LOG_TAG_NODE_JS;

log.begin(LOG_TAG_MAIN_NODE_JS, 'Loading...');

const NODE_GULP           = require('gulp');
const NODE_GULP_IF        = require('gulp-if');
const NODE_GULP_REPLACE   = require('gulp-replace');
const NODE_GULP_RENAME    = require('gulp-rename');
const NODE_GULP_SOURCEMAP = require('gulp-sourcemaps');
const NODE_GULP_TAP       = require('gulp-tap');
const NODE_CHOKIDAR       = require('chokidar');
const NODE_PICOMATCH      = require('picomatch');
const NODE_TIMERS         = require('timers');

log.end(LOG_TAG_MAIN_NODE_JS, 'Loaded.');

// -----------------------------------------------------------------------------
// ### Main - Library
// -----------------------------------------------------------------------------

const LOG_TAG_MAIN_LIBRARY = LOG_TAG_MAIN + ' ' + LOG_TAG_LIBRARY;

log.begin(LOG_TAG_MAIN_LIBRARY, 'Defining functions...');

// -----------------------------------------------------------------------------
// #### Main - Library - Brand
// -----------------------------------------------------------------------------

function libraryAppendBrandComment() {
  return NODE_GULP_TAP(file => {
    if (!Buffer.isBuffer(file.contents)) return;
    let content = decodeUtf8StrictFromBuffer(file.contents, file.path);
    let comment = "";
    const COMMENT_BODY = `Built with ${COMPILER_TITLE_FULL} ${CONFIG_INFO.version}`

    if (file.path.endsWith('.html') || file.path.endsWith('.xml')) {
      comment = `<!-- ${COMMENT_BODY} -->`;
    } else if (file.path.endsWith('.css') || file.path.endsWith('.js')) {
      comment = `/* ${COMMENT_BODY} */`;
    }
    // else if (file.path.endsWith('.txt')) || file.path.endsWith('.md')) {
    //   comment = ` (${COMMENT_BODY})`;
    // }

    file.contents = Buffer.from(content + comment, 'utf8');
  });
}

// -----------------------------------------------------------------------------
// #### Main - Library - Variable
// -----------------------------------------------------------------------------

function libraryVariableEnsureIsArray(value) {
  return Array.isArray(value) ? value : [value];
}

function libraryVariableAddReplaceDelimiters(name) {
  const CONFIG_REPLACE_DELIMITER = configProjectMerge.option.replace.delimiter || { open: "[[", close: "]]" };
  const NODE_CURE_REGEX = require('@custom/cure-regex');
  return NODE_CURE_REGEX.escape(CONFIG_REPLACE_DELIMITER.open)
    + name
    + NODE_CURE_REGEX.escape(CONFIG_REPLACE_DELIMITER.close);
}

// -----------------------------------------------------------------------------
// #### Main - Library - File
// -----------------------------------------------------------------------------

function libraryFileGetInfo(file) {
  return {
    path: libraryPathRelativeProjectRoot(file.path),
    size: `${(file.contents.length / 1024).toFixed(2)} KB`, // Calculate file size in KB
  };
}

function libraryFileIsDirectory(path) {
  return NODE_FS.lstatSync(path).isDirectory();
}

function libraryFileGetSubdirectories(path) {
  return NODE_FS.readdirSync(path, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

async function libraryFileCountFiles(path) {
  const entries = await NODE_FS.promises.readdir(path, { withFileTypes: true });
  let count = 0;
  for (const entry of entries) {
    if (entry.isDirectory()) {
      count += await libraryFileCountFiles(`${path}/${entry.name}`);
    } else {
      count++;
    }
  }
  return count;
}

async function libraryFileGetFilesFromPattern(pattern, pattern_ignore = PATH_DIR_IN_IGNORE, sort = true) {
  log.debug('[📁 File] [Get Files]', 'Arguments:', {
    pattern,
    pattern_ignore,
    sort
  });

  // Always treat pattern as array
  const patterns = libraryVariableEnsureIsArray(pattern);

  // Split includes and ignores from the pattern list
  const includes = patterns.filter(p => !p.startsWith('!'));
  const ignoresFromPattern = patterns
    .filter(p => p.startsWith('!'))
    .map(p => p.slice(1)); // remove the !

  // Combine with provided ignores and make unique
  const combinedIgnores = Array.from(new Set([
    ...(Array.isArray(pattern_ignore) ? pattern_ignore : [pattern_ignore]),
    ...ignoresFromPattern
  ]));

  // Expand relative ignores to absolute based on each include's directory
  const slash = p => p.replace(/\\/g, '/');

  const expandedIgnores = [];
  for (const ignore of combinedIgnores) {
    if (NODE_PATH.isAbsolute(ignore)) {
      expandedIgnores.push(slash(ignore));
    } else {
      for (const inc of includes) {
        const baseDir = inc.includes('*') ? inc.substring(0, inc.indexOf('*')) : NODE_PATH.dirname(inc);
        expandedIgnores.push(slash(NODE_PATH.join(baseDir, ignore)));
      }
    }
  }

  // Remove duplicates from expanded ignores
  const finalIgnores = Array.from(new Set(expandedIgnores));

  const GLOB_OPTION = {
    ignore: finalIgnores,
    nodir: true,
    absolute: true,
  };

  log.debug('[📁 File] [Get Files]', 'Glob pattern:', {
    "Pattern": pattern,
    "Option": GLOB_OPTION
  });

  const NODE_GLOB = require('glob');

  let files = await NODE_GLOB.glob(pattern, GLOB_OPTION);

  if (sort) {
    files.sort(new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare);
  }

  log.debug('[📁 File] [Get Files]', 'Matched:', files);

  return files
}

function libraryFileGetFilesFromPatternSync(pattern, pattern_ignore = PATH_DIR_IN_IGNORE, sort = true) {
  log.debug('[📁 File] [Get Files Sync]', 'Arguments:', {
    pattern,
    pattern_ignore,
    sort
  });

  const patterns = libraryVariableEnsureIsArray(pattern);
  const includes = patterns.filter(p => !p.startsWith('!'));
  const ignoresFromPattern = patterns
    .filter(p => p.startsWith('!'))
    .map(p => p.slice(1));

  const combinedIgnores = Array.from(new Set([
    ...(Array.isArray(pattern_ignore) ? pattern_ignore : [pattern_ignore]),
    ...ignoresFromPattern
  ]));

  const slash = p => p.replace(/\\/g, '/');
  const expandedIgnores = [];
  for (const ignore of combinedIgnores) {
    if (NODE_PATH.isAbsolute(ignore)) {
      expandedIgnores.push(slash(ignore));
    } else {
      for (const inc of includes) {
        const baseDir = inc.includes('*') ? inc.substring(0, inc.indexOf('*')) : NODE_PATH.dirname(inc);
        expandedIgnores.push(slash(NODE_PATH.join(baseDir, ignore)));
      }
    }
  }

  const finalIgnores = Array.from(new Set(expandedIgnores));
  const GLOB_OPTION = {
    ignore: finalIgnores,
    nodir: true,
    absolute: true,
  };

  log.debug('[📁 File] [Get Files Sync]', 'Glob pattern:', {
    "Pattern": pattern,
    "Option": GLOB_OPTION
  });

  const NODE_GLOB = require('glob');
  const includePatterns = includes.length ? includes : patterns;
  const files = new Set();

  for (const inc of includePatterns) {
    const matched = (typeof NODE_GLOB.globSync === 'function')
      ? NODE_GLOB.globSync(inc, GLOB_OPTION)
      : NODE_GLOB.sync(inc, GLOB_OPTION);
    for (const file of matched) {
      files.add(file);
    }
  }

  const out = Array.from(files);
  if (sort) {
    out.sort(new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' }).compare);
  }

  log.debug('[📁 File] [Get Files Sync]', 'Matched:', out);

  return out;
}

function libraryFileCountFilesFromPatternSync(pattern, pattern_ignore = PATH_DIR_IN_IGNORE) {
  const patterns = libraryVariableEnsureIsArray(pattern);
  const includes = patterns.filter(p => typeof p === 'string' && !p.startsWith('!'));
  const ignoresFromPattern = patterns
    .filter(p => typeof p === 'string' && p.startsWith('!'))
    .map(p => p.slice(1));

  const combinedIgnores = Array.from(new Set([
    ...(Array.isArray(pattern_ignore) ? pattern_ignore : [pattern_ignore]),
    ...ignoresFromPattern
  ].filter(Boolean)));

  const slash = p => String(p).replace(/\\/g, '/');
  const expandedIgnores = [];
  for (const ignore of combinedIgnores) {
    if (NODE_PATH.isAbsolute(ignore)) {
      expandedIgnores.push(slash(ignore));
      continue;
    }
    for (const inc of includes) {
      const baseDir = inc.includes('*') ? inc.substring(0, inc.indexOf('*')) : NODE_PATH.dirname(inc);
      expandedIgnores.push(slash(NODE_PATH.join(baseDir, ignore)));
    }
  }

  const GLOB_OPTION = {
    ignore: Array.from(new Set(expandedIgnores)),
    nodir: true,
    absolute: true
  };

  const NODE_GLOB = require('glob');
  if (typeof NODE_GLOB.globSync === 'function') {
    return NODE_GLOB.globSync(pattern, GLOB_OPTION).length;
  }

  const includePatterns = includes.length ? includes : patterns;
  const files = new Set();
  for (const inc of includePatterns) {
    for (const file of NODE_GLOB.sync(inc, GLOB_OPTION)) {
      files.add(file);
    }
  }
  return files.size;
}

const LOG_TAG_LIST_FILES = '[📄 List Files]';

async function libraryfile_listFiles(path, recursive = true, verbose = 0) {
  log.info(LOG_TAG_LIST_FILES, `${verbose ? 'Listing' : 'Counting'} files in \`${path}\` (recursive: ${recursive}):`)

  return new Promise((resolve, reject) => {
    let files = [];

    function readDirectory(dir) {
      let items;
      try {
        items = NODE_FS.readdirSync(dir, { withFileTypes: true });
      } catch (err) {
        log.error(LOG_TAG_LIST_FILES, 'Error reading directory contents:', err);
        reject(err);
        return;
      }

      items.forEach(item => {
        const fullPath = NODE_CURE_PATH.join(dir, item.name);
        if (recursive && item.isDirectory()) {
          readDirectory(fullPath);
        } else {
          files.push(fullPath);
        }
      });
    }

    try {
      // Check if directory exists before attempting to read it
      if (!NODE_FS.existsSync(path)) {
        log.error(LOG_TAG_LIST_FILES, 'Directory does not exist:', path);
        resolve([]);  // Return an empty array if directory doesn't exist
        return;
      }

      readDirectory(path);

      if (verbose) {
        log.detail(LOG_TAG_LIST_FILES, 'Files:', files);
      }

      log.detail(LOG_TAG_LIST_FILES, `${verbose ? 'Listing' : 'Counting'} files in:`, path, '(recursive:', recursive, ') complete, total:', files.length);

      resolve(files);
    } catch (err) {
      log.error(LOG_TAG_LIST_FILES, 'Reading matched files directory:', err);
      reject(err);
    }
  });
}

const VERBOSE_LISTFILES = {
  NONE: 0,
  BASIC: 1,
  DETAIL: 2
};

const LOG_TAG_LIST_FILES_MATCHED = '[📄 List Files Matched]';

async function libraryFileListFilesMatched(globPattern, globPatternIgnoreBase, verbose = VERBOSE_LISTFILES.NONE) {
  globPattern = libraryVariableEnsureIsArray(globPattern);

  log.begin(LOG_TAG_LIST_FILES_MATCHED, 'Begin...');

  const NODE_MINIMATCH = require('minimatch');

  try {
    await new Promise(async (resolve, reject) => {
      let files = [];
      let files_count_allowed = 0;
      let files_count_ignored = 0;

      log.info(LOG_TAG_LIST_FILES_MATCHED, 'Listing files matched with Glob Pattern:', globPattern);

      const glob_pattern_allow = globPattern.filter(pattern => typeof pattern === 'string' && !pattern.startsWith('!'));
      const glob_pattern_exclude = globPattern.filter(pattern => typeof pattern === 'string' && pattern.startsWith('!'));

      log.detail(LOG_TAG_LIST_FILES_MATCHED, '✅ Pattern Allow:',  glob_pattern_allow);
      log.detail(LOG_TAG_LIST_FILES_MATCHED, '⛔ Pattern Ignore:', glob_pattern_exclude);

      NODE_GULP.src(glob_pattern_allow, {encoding: false})
        .on('data', function(file) {
          files.push(file.path);
        })

        .on('end', async () => {
          for (const file of files) {
            // let relativePath = NODE_CURE_PATH.relative(process.cwd(), file);
            // log.info(LOG_TAG_LIST_FILES_MATCHED, 'Checking file:', relativePath);
            let normalizedPath = NODE_CURE_PATH.relative(process.cwd(), file);

            if (verbose > VERBOSE_LISTFILES.BASIC) {
              log.detail(LOG_TAG_LIST_FILES_MATCHED, 'Normalized Checking file:', normalizedPath);
            }

            const isDirectory = libraryFileIsDirectory(file);

            if (verbose > VERBOSE_LISTFILES.BASIC) {
              log.detail(LOG_TAG_LIST_FILES_MATCHED, 'isDirectory:', isDirectory ? '📁 Directory' : '📄 File');
            }

            let isDisallowed = glob_pattern_exclude.some(pattern => {
              // let adjustedPattern = pattern.replace('!', '');
              let adjustedPattern = NODE_CURE_PATH.slashForward(pattern.replace(`!${globPatternIgnoreBase}`, ''));

              if (verbose > VERBOSE_LISTFILES.BASIC) {
                log.detail(LOG_TAG_LIST_FILES_MATCHED, 'Against pattern:', adjustedPattern);
              }

              return NODE_MINIMATCH.minimatch(normalizedPath, adjustedPattern);
            });

            if (isDisallowed) {
              if (verbose > VERBOSE_LISTFILES.NONE) {
                log.detail(LOG_TAG_LIST_FILES_MATCHED, '⛔ Ignore:', NODE_CURE_PATH.relative(process.cwd(), file));
              }

              if (isDirectory) {
                let count = await libraryFileCountFiles(file);

                if (verbose > VERBOSE_LISTFILES.BASIC) {
                  log.detail(LOG_TAG_LIST_FILES_MATCHED, 'Directory contains:', count, 'files');
                }

                files_count_ignored += count;
              } else {
                files_count_ignored++;
              }

              if (verbose > VERBOSE_LISTFILES.BASIC) {
                log.detail(LOG_TAG_LIST_FILES_MATCHED, '▶️ files_count_ignored:', files_count_ignored);
              }
            } else {
              if (verbose > VERBOSE_LISTFILES.NONE) {
                log.detail(LOG_TAG_LIST_FILES_MATCHED, '✅ Allow:', NODE_CURE_PATH.relative(process.cwd(), file));
              }

              if (!isDirectory) {
                files_count_allowed++;
              }

              if (verbose > VERBOSE_LISTFILES.BASIC) {
                log.detail(LOG_TAG_LIST_FILES_MATCHED, '▶️ files_count_allowed:', files_count_allowed);
              }
            }
          }

          let logData = verbose > VERBOSE_LISTFILES.NONE
            ? { "globPattern": globPattern }
            : {};

          Object.assign(logData, {
            "Total ✅ allowed files listed:": files_count_allowed,
            "Total ⛔ ignored files:": files_count_ignored
          });

          log.end(LOG_TAG_LIST_FILES_MATCHED, "Complete:", logData);

          resolve();
        })

        .on('error', (err) => {
          log.error(LOG_TAG_LIST_FILES_MATCHED, 'Error during matching files:', err);
          reject(err);
        });
    });
  } catch (error) {
    log.error(LOG_TAG_LIST_FILES_MATCHED, 'Error listing matched files:', error);
  }
}

// -----------------------------------------------------------------------------
// #### Main - Library - Cache
// -----------------------------------------------------------------------------

const NODE_CURE_CACHE = require('@custom/cure-cache');

const _cacheGates = {
  enable: () => configProjectMerge?.option?.cache?.enable !== false,
  filter: () => configProjectMerge?.option?.cache?.filter !== false,
  store:  () => configProjectMerge?.option?.cache?.store  !== false,
  sort:   () => configProjectMerge?.option?.cache?.sort   === true
  // You can also layer CLI flags here, e.g.:
  // enable: () => argv['no-cache'] ? false : (configProjectMerge?.option?.cache?.enable !== false),
};

const cacheRoot = new NODE_CURE_CACHE.Cache({
  file: PATH_FILE_PROJECT_CACHE_STATICUS,
  root: PATH_DIR_ROOT,
  gates: _cacheGates
});

const cacheProjectFile = new NODE_CURE_CACHE.Cache({
  file: PATH_FILE_PROJECT_CACHE_FILE,
  root: PATH_DIR_PROJECT_IN,
  gates: _cacheGates
  // providers: default sha256 signature; no computeData (pure change filter)
});

const cacheProjectImage = new NODE_CURE_CACHE.Cache({
  file: PATH_FILE_PROJECT_CACHE_IMAGE,
  root: PATH_DIR_PROJECT_IN,
  gates: _cacheGates,
  providers: {
    // Optional: keep default sha256. Provide metadata via Sharp.
    async computeData(filePath) {
      if (!NODE_FS.existsSync(filePath) || !NODE_FS.statSync(filePath).isFile()) {
        return { width: Infinity, height: Infinity };
      }
      const SHARP = require('sharp');
      SHARP.simd(true);
      SHARP.concurrency(HARDWARE_CPU_THREAD_COUNT);
      const meta = await SHARP(filePath).metadata();
      return { width: meta.width, height: meta.height };
    }
  }
});

async function _getImageDimensionsCached(absPath) {
  // 1st: return cached if valid
  const hit = await cacheProjectImage.getValidEntry('image-dimension', absPath);
  if (hit && hit.data) return hit.data;

  // 2nd: compute via provider + store
  const entry = await cacheProjectImage.store('image-dimension', absPath, true);
  return entry?.data ?? { width: Infinity, height: Infinity };
}

/**
 * Merge legacy HTML-related project file cache namespaces into the unified
 * `html` namespace. Target entries win on conflicts.
 *
 * Legacy sources:
 * - `html_include`
 * - `html_config`
 *
 * @returns {{changed:boolean, moved:number, skipped:number, removedNamespaces:number}}
 */
function migrateProjectFileCacheNamespacesToUnifiedHtml() {
  const entries = cacheProjectFile && cacheProjectFile.entries;
  if (!entries || typeof entries !== 'object') {
    return { changed: false, moved: 0, skipped: 0, removedNamespaces: 0 };
  }

  const TARGET_NS = 'html';
  const LEGACY_SOURCES = ['html_include', 'html_config'];

  if (!entries[TARGET_NS] || typeof entries[TARGET_NS] !== 'object') {
    entries[TARGET_NS] = {};
  }

  const targetBucket = entries[TARGET_NS];
  let changed = false;
  let moved = 0;
  let skipped = 0;
  let removedNamespaces = 0;

  for (const sourceNs of LEGACY_SOURCES) {
    if (!Object.prototype.hasOwnProperty.call(entries, sourceNs)) continue;
    if (sourceNs === TARGET_NS) continue;

    const sourceBucket = entries[sourceNs];
    if (!sourceBucket || typeof sourceBucket !== 'object') {
      delete entries[sourceNs];
      changed = true;
      removedNamespaces += 1;
      continue;
    }

    for (const [key, value] of Object.entries(sourceBucket)) {
      if (!Object.prototype.hasOwnProperty.call(targetBucket, key)) {
        targetBucket[key] = value;
        moved += 1;
        changed = true;
      } else {
        skipped += 1;
      }
    }

    delete entries[sourceNs];
    changed = true;
    removedNamespaces += 1;
  }

  if (changed) {
    try {
      cacheProjectFile.save();
      log.info('[🗃️ Cache]', 'Merged legacy HTML cache namespaces into unified `html` namespace.', {
        moved,
        skipped,
        removedNamespaces
      });
    } catch (error) {
      log.warn('[🗃️ Cache]', 'Failed to persist merged HTML cache namespaces (continuing in-memory).', {
        error: String(error?.message || error),
        moved,
        skipped,
        removedNamespaces
      });
    }
  }

  return { changed, moved, skipped, removedNamespaces };
}


// -----------------------------------------------------------------------------
// #### Main - Library - Plumber
// -----------------------------------------------------------------------------

const LOG_TAG_PLUMBER = '[🚰 Plumber]';

function libraryPlumber(isActiveCallback = () => true) {
  log.info(LOG_TAG_PLUMBER, 'Running...');

  const NODE_GULP_PLUMBER = require('gulp-plumber');

  const STREAM = NODE_GULP_PLUMBER({
    errorHandler: function (error) {
      if (isActiveCallback()) {
        log.error(LOG_TAG_PLUMBER, 'Error occurred:', error);
      }
      /** @type {NodeJS.EventEmitter} */ (this).emit('end'); // Prevents calling the callback more than once
    }
  });

  let fileCount = 0;

  STREAM.on('data', (file) => {
    if (isActiveCallback() && !libraryFileIsDirectory(file.path)) {
      fileCount++;
      log.debug(LOG_TAG_PLUMBER, 'Processing:', {
        "File Count": fileCount,
        ...libraryFileGetInfo(file)
      });
    }
  });

  // Listen for the 'end' or 'finish' event
  STREAM.on('end', () => {
    log.info(LOG_TAG_PLUMBER, 'Files discovered:', fileCount);
    // log.debug(LOG_TAG_PLUMBER, 'Files processed count:', fileCount);
    log.info(LOG_TAG_PLUMBER, 'Complete.');
  });

  return STREAM;
}

/**
 * Creates a Gulp stream that filters out unchanged files based on cached checksums,
 * and logs processed file count and details.
 *
 * @param {string} cache_namespace - The cache namespace to use.
 * @param {object|null} cache - Optional cache object to use. Defaults to `cacheProjectFile`.
 * @returns {import('stream').Transform} - Gulp stream for filtering files.
 *
 * Usage:
 *   .pipe(libraryCacheFilter(namespace))
 */
function libraryCacheFilter(cache_namespace, cache = cacheProjectFile) {
  const LOG_TAG_CACHE_FILTER = NODE_CURE_CACHE.LOG_TAG_CACHE + ' [🔍 Filter]';
  let fileCount = 0;

  const stream = cache.pipe(cache_namespace, true); // filter=true

  stream.on('data', (file) => {
    if (!libraryFileIsDirectory(file.path)) {
      fileCount++;
      log.info(LOG_TAG_CACHE_FILTER, 'Processing:', {
        "File Count": fileCount,
        ...libraryFileGetInfo(file)
      });
    }
  });

  stream.on('end', () => {
    log.info(LOG_TAG_CACHE_FILTER, 'Files processed:', fileCount);
    log.info(LOG_TAG_CACHE_FILTER, 'Complete.');
  });

  return stream;
}

/**
 * Creates a Gulp stream that stores file checksums in cache after processing,
 * with detailed logging for each stored file.
 *
 * @param {string} cache_namespace - The namespace to use for storing.
 * @param {object|null} cache - Optional cache object. Defaults to `cacheProjectFile`.
 * @returns {import('stream').Transform} - Gulp stream that stores checksums.
 *
 * Usage:
 *   .pipe(libraryCacheStore(namespace))
 */
function libraryCacheStore(cache_namespace, cache = cacheProjectFile, savePerFile = true) {
  let fileCount = 0;

  const NODE_THROUGH2 = require('through2');

  return NODE_THROUGH2.obj(
    async function transform(file, enc, cb) {
      log.debug(NODE_CURE_CACHE.LOG_TAG_CACHE, 'Transform start:', {
        path: file.path,
        isDir: libraryFileIsDirectory(file.path),
        history: file.history
      });

      try {
        if (!libraryFileIsDirectory(file.path)) {
          const originalPath = file.history?.[0] || file.path;

          log.debug(NODE_CURE_CACHE.LOG_TAG_CACHE, 'Storing:', { originalPath });

          await cache.store(cache_namespace, originalPath, savePerFile);
          fileCount++;

          log.info(NODE_CURE_CACHE.LOG_TAG_CACHE, 'Stored in cache:', {
            "File Count": fileCount,
            ...libraryFileGetInfo(file)
          });
        }
      } catch (err) {
        log.error(NODE_CURE_CACHE.LOG_TAG_CACHE, 'Error during store:', err);
      }

      this.push(file);
      cb(); // Make absolutely sure this gets called no matter what
    },

    function flush(cb) {
      if (!savePerFile) {
        cache.save();
      }

      log.info(NODE_CURE_CACHE.LOG_TAG_CACHE, 'File Count:', { Stored: fileCount });
      log.info(NODE_CURE_CACHE.LOG_TAG_CACHE, 'Cache saved and complete.');
      cb(); // ✅ Important: triggers .on('end') reliably
    }
  );
}

function libraryPruneFromInput(opt = {}) {
  const LOG_TAG_PRUNE = (opt.logTag && String(opt.logTag).trim())
    ? `${String(opt.logTag).trim()} [🧹 Prune]`
    : '[🧹 Prune]';

  const namespaces = libraryVariableEnsureIsArray(opt.cacheNamespace).filter(Boolean);

  const pathInRoot = opt.pathInRoot ? String(opt.pathInRoot) : PATH_DIR_PROJECT_IN;
  const pathOutRoot = opt.pathOutRoot ? String(opt.pathOutRoot) : PATH_DIR_PROJECT_OUT;

  const removeOut = opt.removeOut !== false;
  const removeCache = opt.removeCache !== false;
  const pruneCacheWhenOutMissing = opt.pruneCacheWhenOutMissing === true;
  const forceMissingInput = opt.forceMissingInput === true;
  const resetOnAnyMissing = opt.resetOnAnyMissing === true;
  const resetTargets = Array.isArray(opt.resetTargets) ? opt.resetTargets : [];
  const dryRun = opt.dryRun === true;

  const keysProvided = Array.isArray(opt.keys) ? opt.keys : null;

  /** @type {number} */
  let cacheEntriesScanned = 0;
  /** @type {number} */
  let cacheEntriesCleared = 0;
  /** @type {number} */
  let outPathsDeleted = 0;
  /** @type {number} */
  let outPathsMissing = 0;
  /** @type {number} */
  let outPathsMissingTriggeredCacheClear = 0;
  /** @type {number} */
  let errors = 0;

  /** @type {string[]} */
  const missingKeys = [];

  log.begin(LOG_TAG_PRUNE, 'Running...', {
    namespaces,
    keysProvided: keysProvided ? keysProvided.length : null,
    pathInRoot,
    pathOutRoot,
    removeOut,
    removeCache,
    pruneCacheWhenOutMissing,
    forceMissingInput,
    resetOnAnyMissing,
    resetTargets: resetTargets.length,
    dryRun
  });

  /**
   * Default "related artifact" resolver.
   * - .scss/.css => .min.css + .min.css.map
   * - .js        => .min.js  + .min.js.map
   * - .md        => .html
   * - otherwise  => the given path
   *
   * @private
   * @param {string} outAbsPath
   * @returns {string[]}
   */
  function _getRelatedOutPathsDefault(outAbsPath) {
    const ext = NODE_PATH.extname(outAbsPath);
    const base = outAbsPath.replace(ext, '');

    if (ext === '.scss' || ext === '.css') {
      return [`${base}.min.css`, `${base}.min.css.map`];
    }

    if (ext === '.js') {
      return [`${base}.min.js`, `${base}.min.js.map`];
    }

    if (ext === '.md') {
      return [`${base}.html`];
    }

    return [outAbsPath];
  }

  /**
   * Out-path resolver (base paths) for a given key.
   * Override via `opt.outResolver({ ns, key, absIn, absOutBase }) => string[]`.
   *
   * @private
   * @param {{ ns: string, key: string, absIn: string, absOutBase: string }} ctx
   * @returns {string[]}
   */
  function _getOutAbsBaseList(ctx) {
    if (typeof opt.outResolver === 'function') {
      try {
        const v = opt.outResolver(ctx);
        return Array.isArray(v) ? v.filter(Boolean) : [];
      } catch (e) {
        errors++;
        log.error(LOG_TAG_PRUNE, 'outResolver threw:', { ns: ctx.ns, key: ctx.key, error: e });
        return [];
      }
    }
    return [ctx.absOutBase];
  }

  /**
   * Related-out resolver for a given base out path.
   * Override via `opt.relatedOutResolver({ ns, key, absIn, outAbsBase }) => string[]`.
   *
   * @private
   * @param {{ ns: string, key: string, absIn: string, outAbsBase: string }} ctx
   * @returns {string[]}
   */
  function _getRelatedOutList(ctx) {
    if (typeof opt.relatedOutResolver === 'function') {
      try {
        const v = opt.relatedOutResolver(ctx);
        return Array.isArray(v) ? v.filter(Boolean) : [];
      } catch (e) {
        errors++;
        log.error(LOG_TAG_PRUNE, 'relatedOutResolver threw:', { ns: ctx.ns, key: ctx.key, error: e });
        return [];
      }
    }
    return _getRelatedOutPathsDefault(ctx.outAbsBase);
  }

  /**
   * Delete (sync) with support for directory recursive wipe.
   *
   * @private
   * @param {string} absPath
   * @returns {{ deleted: boolean, missing: boolean }}
   */
  function _deletePathSync(absPath) {
    if (!absPath) return { deleted: false, missing: true };

    // We treat "already missing" as missing.
    const exists = libraryPathExists(absPath);
    if (!exists) {
      return { deleted: false, missing: true };
    }

    if (dryRun) {
      return { deleted: true, missing: false };
    }

    try {
      const deleted = NODE_CURE_FS.deleteSync([absPath], { force: true });
      if (Array.isArray(deleted) && deleted.length > 0) {
        return { deleted: true, missing: false };
      }
      // If deleteSync returns no deleted path, treat as missing.
      return { deleted: false, missing: true };
    } catch (e) {
      if (/** @type {any} */ (e)?.code === 'ENOENT') {
        return { deleted: false, missing: true };
      }
      throw e;
    }
  }

  /**
   * Delete patterns/targets (sync).
   * Targets may be file paths, dir paths, or globs.
   *
   * @private
   * @param {string[]} targets
   * @returns {{ deletedCount: number }}
   */
  function _deleteTargetsSync(targets) {
    if (!targets || !targets.length) return { deletedCount: 0 };
    if (dryRun) return { deletedCount: targets.length };
    const deleted = NODE_CURE_FS.deleteSync(targets, { force: true });
    return { deletedCount: Array.isArray(deleted) ? deleted.length : 0 };
  }

  const memoryWarm =
    (cacheProjectFile && cacheProjectFile.entries && Object.keys(cacheProjectFile.entries).length > 0);

  // Disk cache is our "source of truth" for persistence and for cold-start pruning.
  let cacheDisk = {};
  try {
    cacheDisk = NODE_FS.existsSync(PATH_FILE_PROJECT_CACHE_FILE)
      ? (NODE_CURE_JSON.load(PATH_FILE_PROJECT_CACHE_FILE, { fatal: false }) || {})
      : {};
  } catch (e) {
    cacheDisk = {};
  }

  /** @type {number} */
  let diskMutations = 0;

  /**
   * Clear an entry from disk + (if warm) in-memory cache.
   *
   * @private
   * @param {string} ns
   * @param {string} keyExact
   */
  function _clearCacheEntry(ns, keyExact) {
    if (cacheDisk?.[ns] && Object.prototype.hasOwnProperty.call(cacheDisk[ns], keyExact)) {
      delete cacheDisk[ns][keyExact];
      diskMutations++;
    }

    if (memoryWarm) {
      try {
        cacheProjectFile.clear(ns, keyExact);
      } catch (_) {
        // ignore
      }
    }
  }

  /**
   * Get the keys for a namespace (either explicit keys, or from disk cache).
   *
   * @private
   * @param {string} ns
   * @returns {string[]}
   */
  function _getKeysForNamespace(ns) {
    if (keysProvided) {
      return keysProvided.map(k => String(k || '').trim()).filter(Boolean);
    }

    const nsObj = cacheDisk?.[ns] && typeof cacheDisk[ns] === 'object'
      ? cacheDisk[ns]
      : {};

    return Object.keys(nsObj);
  }

  // Nothing to do if neither namespaces nor explicit keys were provided.
  if (!namespaces.length && !keysProvided) {
    log.notice(LOG_TAG_PRUNE, 'No namespaces or keys provided; nothing to prune.');
    const result0 = {
      namespacesProcessed: [],
      cacheEntriesScanned,
      cacheEntriesCleared,
      outPathsDeleted,
      outPathsMissing,
      outPathsMissingTriggeredCacheClear,
      missingKeys,
      errors
    };

    log.end(LOG_TAG_PRUNE, 'Complete.', result0);

    // thenable
    const thenable0 = /** @type {any} */ ({ ...result0 });
    thenable0.then = (onFulfilled, onRejected) => {
      try {
        return Promise.resolve(onFulfilled ? onFulfilled(result0) : result0);
      } catch (e) {
        return onRejected ? Promise.resolve(onRejected(e)) : Promise.reject(e);
      }
    };
    thenable0.catch = (onRejected) => thenable0.then(null, onRejected);
    thenable0.finally = (onFinally) => Promise.resolve().finally(onFinally).then(() => result0);
    return thenable0;
  }

  /** @type {boolean} */
  let anyMissingDetected = false;

  const namespacesToProcess = namespaces.length ? namespaces : ['']; // allow "keys-only" mode with blank ns

  for (const ns of namespacesToProcess) {
    const keys = _getKeysForNamespace(ns);

    log.info(LOG_TAG_PRUNE, 'Namespace scan:', { ns: ns || '(none)', entries: keys.length });

    for (const keyRaw of keys) {
      cacheEntriesScanned++;

      const keyExact = String(keyRaw || '').trim();
      const key = NODE_CURE_PATH.slashForward(keyExact);

      if (!key) continue;

      const absIn = NODE_CURE_PATH.absolute(pathInRoot, key);
      const absOutBase = NODE_CURE_PATH.absolute(pathOutRoot, key);

      const inputExists = forceMissingInput ? false : libraryPathExists(absIn);

      // Expand out base paths and related artifacts.
      const outBaseList = _getOutAbsBaseList({ ns, key, absIn, absOutBase });
      const outCandidates = [];

      for (const outAbsBaseItem of outBaseList) {
        const related = _getRelatedOutList({ ns, key, absIn, outAbsBase: String(outAbsBaseItem) });
        for (const p of related) {
          if (p && !outCandidates.includes(p)) {
            outCandidates.push(p);
          }
        }
      }

      // If input exists, optionally prune cache if expected outputs are missing (forces rebuild).
      if (inputExists) {
        if (pruneCacheWhenOutMissing && removeCache && ns) {
          const anyOutExists = outCandidates.some(p => libraryPathExists(p));
          if (!anyOutExists) {
            try {
              if (!dryRun) {
                _clearCacheEntry(ns, keyExact);
              }
              cacheEntriesCleared++;
              outPathsMissingTriggeredCacheClear += outCandidates.length;
              log.success(LOG_TAG_PRUNE, dryRun
                ? 'Would clear cache entry (outputs missing):'
                : 'Cleared cache entry (outputs missing):', {
                ns,
                key: keyExact,
                in: absIn,
                expectedOut: outCandidates
              });
            } catch (e) {
              errors++;
              log.error(LOG_TAG_PRUNE, 'Failed clearing cache entry (outputs missing):', { ns, key: keyExact, error: e });
            }
          }
        }
        continue;
      }

      // Missing input => prune
      anyMissingDetected = true;
      missingKeys.push(keyExact);

      log.detail(LOG_TAG_PRUNE, 'Missing input; pruning:', { ns: ns || '(none)', key: keyExact, inAbs: absIn });

      // 1) Delete mapped out paths (and known related artifacts)
      if (removeOut) {
        for (const outAbs of outCandidates) {
          try {
            const r = _deletePathSync(outAbs);
            if (r.deleted) {
              outPathsDeleted++;
              log.success(LOG_TAG_PRUNE, dryRun ? 'Would remove out path:' : 'Removed out path:', {
                ns: ns || '(none)',
                key: keyExact,
                out: outAbs
              });
            } else {
              outPathsMissing++;
              log.detail(LOG_TAG_PRUNE, dryRun ? 'Would skip missing out path:' : 'Out path already missing:', {
                ns: ns || '(none)',
                key: keyExact,
                out: outAbs
              });
            }
          } catch (e) {
            errors++;
            log.error(LOG_TAG_PRUNE, 'Failed removing out path:', { ns: ns || '(none)', key: keyExact, out: outAbs, error: e });
          }
        }
      }

      // 2) Clear cache entry (only when a namespace is provided)
      if (removeCache && ns) {
        try {
          if (!dryRun) {
            _clearCacheEntry(ns, keyExact);
          }
          cacheEntriesCleared++;
          log.success(LOG_TAG_PRUNE, dryRun ? 'Would clear cache entry:' : 'Cleared cache entry:', { ns, key: keyExact });
        } catch (e) {
          errors++;
          log.error(LOG_TAG_PRUNE, 'Failed clearing cache entry:', { ns, key: keyExact, error: e });
        }
      }
    }
  }

  // Optional "global reset" when *any* missing input is detected (brand-style behavior).
  if (resetOnAnyMissing && anyMissingDetected && resetTargets.length) {
    try {
      if (!dryRun) {
        _deleteTargetsSync(resetTargets);
      }
      log.success(LOG_TAG_PRUNE, dryRun ? 'Would reset targets (missing detected):' : 'Reset targets (missing detected):', {
        resetTargets
      });
    } catch (e) {
      errors++;
      log.error(LOG_TAG_PRUNE, 'Failed resetting targets:', { resetTargets, error: e });
    }
  }

  // Persist cache changes
  if (removeCache && !dryRun && diskMutations > 0) {
    try {
      NODE_CURE_JSON.save(PATH_FILE_PROJECT_CACHE_FILE, cacheDisk, { sort: true });
      log.detail(LOG_TAG_PRUNE, 'Cache file saved (disk).', { diskMutations });
    } catch (e) {
      errors++;
      log.error(LOG_TAG_PRUNE, 'Failed saving cache file (disk):', e);
    }

    // Only save via cacheProjectFile if it was warm (prevents overwriting disk with cold in-memory state).
    if (memoryWarm) {
      try {
        cacheProjectFile.save();
        log.detail(LOG_TAG_PRUNE, 'Cache saved (memoryWarm).');
      } catch (e) {
        errors++;
        log.error(LOG_TAG_PRUNE, 'Failed saving cache (memoryWarm):', e);
      }
    }
  }

  if (removeOut && !dryRun && outPathsDeleted > 0) {
    try {
      const outEmptyDirs = removeEmptyDirsUnderRoot(pathOutRoot, { skipPrefix: getPathIgnorePrefix() });
      log.detail(LOG_TAG_PRUNE, 'Out root empty directory cleanup complete.', {
        pathOutRoot,
        ...outEmptyDirs
      });
    } catch (e) {
      errors++;
      log.error(LOG_TAG_PRUNE, 'Failed out root empty directory cleanup:', { pathOutRoot, error: e });
    }
  }

  const result = {
    namespacesProcessed: namespaces,
    cacheEntriesScanned,
    cacheEntriesCleared,
    outPathsDeleted,
    outPathsMissing,
    outPathsMissingTriggeredCacheClear,
    missingKeys,
    errors
  };

  log.end(LOG_TAG_PRUNE, 'Complete.', result);

  return result;
}

log.end(LOG_TAG_MAIN_LIBRARY, 'Defined functions.');

// -----------------------------------------------------------------------------
// ### Main - Process Helper
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// #### Main - Process Helper - File Copy
// -----------------------------------------------------------------------------

async function handleFileCopy(logTag, cache_namespace, path_in, file_in, path_out, cache = cacheProjectFile, savePerFile = true, options = {}) {
  const LOG_TAG_FILE_COPY = '[📋 File Copy]';

  log.begin(LOG_TAG_FILE_COPY, 'Running...');

  log.debug(LOG_TAG_FILE_COPY, 'Arguments:', {
    cache_namespace,
    logTag,
    path_in,
    file_in,
    path_out,
    // cache,
    savePerFile,
    options
  });

  if (!path_in || !file_in || !path_out) {
    log.error(LOG_TAG_FILE_COPY, 'Missing required arguments:', { cache_namespace, path_in, file_in, path_out });
    log.end(LOG_TAG_FILE_COPY, 'Complete.');
    return;
  }
  /**
  * @typedef {(
  *   | { type: 'single'; to: string }
  *   | { type: 'glob'; pattern: string; matcher: any; to: string }
  *   | { type: 'regex'; regex: RegExp; to: string }
  * )} MirrorReplaceRule
   */

  /**
   * Normalize mirror rename config into a list of rules.
   *
   * Supported:
   * - rename: "index.md"                              (single-file shorthand)
   * - rename: [{pattern:"a.md",to:"b.md"}]            (glob match)
   * - rename: [{regex:"^a\\.md$",flags:"i",to:"b.md"}] (regex replace)
   *
   * Notes:
   * - Glob rules are first-match-wins and replace either basename or full relative path:
   *   - if `to` contains "/" => treated as full relative path
   *   - else => basename replaced, original directory preserved
   *
   * @param {any} renameOpt
   * @returns {MirrorReplaceRule[]}
   */
  function _mirrorNormalizeReplace(renameOpt) {
    if (!renameOpt) return [];

    // Single shorthand string.
    if (typeof renameOpt === 'string') {
      return [{ type: 'single', to: NODE_CURE_PATH.slashForward(renameOpt) }];
    }

    const arr = Array.isArray(renameOpt) ? renameOpt : [renameOpt];
    const out = /** @type {MirrorReplaceRule[]} */ ([]);

    for (const item of arr) {
      if (!item) continue;

      if (typeof item === 'object') {
        const to = String(item.to ?? '');
        if (!to) continue;

        if (item.regex) {
          const re = new RegExp(String(item.regex), String(item.flags ?? ''));
          out.push({ type: 'regex', regex: re, to: NODE_CURE_PATH.slashForward(to) });
          continue;
        }

        const pattern = String(item.pattern ?? '');
        if (!pattern) continue;
        const matcher = NODE_PICOMATCH(NODE_CURE_PATH.slashForward(pattern), { dot: true });
        out.push(/** @type {MirrorReplaceRule} */ ({ type: 'glob', pattern, matcher, to: NODE_CURE_PATH.slashForward(to) }));
        continue;
      }
    }

    return out;
  }

  /**
   * Apply rename rules to a relative path (POSIX slashes).
   *
   * @param {string} relPath
   * @param {boolean} isSourceSingleFile
   * @returns {string}
   */
  function _mirrorApplyReplace(relPath, isSourceSingleFile) {
    relPath = NODE_CURE_PATH.slashForward(relPath);

    const rules = _mirrorNormalizeReplace(options.rename);

    if (!rules.length) return relPath;

    // Single-file shorthand only makes sense when source is effectively one file.
    const singleRule = rules.find(r => r.type === 'single');
    if (singleRule && isSourceSingleFile) {
      const target = singleRule.to;

      // If target includes '/', treat as full relative path; else replace basename.
      if (target.includes('/')) return target;

      const dir = NODE_PATH.posix.dirname(relPath);
      return (dir && dir !== '.') ? `${dir}/${target}` : target;
    }

    for (const rule of rules) {
      if (rule.type === 'glob' && rule.matcher && rule.matcher(relPath)) {
        const target = rule.to;
        if (target.includes('/')) return target;

        const dir = NODE_PATH.posix.dirname(relPath);
        return (dir && dir !== '.') ? `${dir}/${target}` : target;
      }

      if (rule.type === 'regex' && rule.regex) {
        if (rule.regex.test(relPath)) {
          // regex replace supports $1 etc.
          return NODE_CURE_PATH.slashForward(relPath.replace(rule.regex, rule.to));
        }
      }
    }

    return relPath;
  }

  // If this is a mirror namespace, also store output file keys so reset is correct when rename is used.
  const mirrorOutNamespace = (typeof cache_namespace === 'string' && cache_namespace.startsWith('mirror__'))
    ? cache_namespace.replace(/^mirror__/, 'mirror_out__')
    : null;

  const pruneOptions = (options && typeof options.prune === 'object' && options.prune)
    ? options.prune
    : {};

  let pruneResult = null;

  try {
    pruneResult = libraryPruneFromInput({
      cacheNamespace: cache_namespace,
      logTag: logTag,
      ...pruneOptions
    });

  } catch (err) {
    log.error(logTag, 'During prune:', err);
    log.end(logTag, 'Complete.');
    return;
  }

  if (!libraryPathExists(path_in)) {
    log.notice(LOG_TAG_FILE_COPY, 'Input path does not exist:', path_in);
    log.end(LOG_TAG_FILE_COPY, 'Complete.');
    return;
  }

  /**
   * Resolve the output path for a source file using the same rename/flatten rules
   * as the actual copy step.
   *
   * @param {string} filePathIn
   * @returns {string}
   */
  function getExpectedOutputPath(filePathIn) {
    const isSourceSingleFile = options.flatten || NODE_FS.statSync(path_in).isFile();
    const filePathRelativeRaw = isSourceSingleFile
      ? NODE_PATH.basename(filePathIn)
      : NODE_CURE_PATH.relative(path_in, filePathIn);
    const filePathRelative = _mirrorApplyReplace(filePathRelativeRaw, isSourceSingleFile);
    return NODE_CURE_PATH.join(path_out, filePathRelative);
  }

  /**
   * Copy tasks are exact file publications. If the destination file exists but no longer
   * matches the source bytes (for example a later vendor task overwrote an overlay path),
   * the copy must run even when the source cache entry is unchanged.
   *
   * @param {string} filePathIn
   * @param {string} filePathOut
   * @returns {boolean}
   */
  function outputMatchesSource(filePathIn, filePathOut) {
    if (!NODE_FS.existsSync(filePathOut)) {
      return false;
    }

    const inputSignature = NODE_CURE_FS.computeFileChecksumSync(filePathIn, {
      algorithm: 'sha256',
      normalizeEol: true,
      textMode: 'auto'
    });
    const outputSignature = NODE_CURE_FS.computeFileChecksumSync(filePathOut, {
      algorithm: 'sha256',
      normalizeEol: true,
      textMode: 'auto'
    });

    return inputSignature === outputSignature;
  }

  // Discover all matching input files (pre-filter).
  const FILE_PATHS_ALL = await libraryFileGetFilesFromPattern(file_in);
  const counters = { filtered: 0, processed: 0 };

  log.debug(LOG_TAG_FILE_COPY, 'Discovered:', {
    "Pattern": file_in,
    "File Count": FILE_PATHS_ALL.length,   // all files that matched the pattern
    "File Paths": FILE_PATHS_ALL
  });

  // Pre-filter using cache.shouldProcessSync so we know the final count up front.
  log.info(LOG_TAG_FILE_COPY, 'Filtering files by cache...', {
    "File Count": FILE_PATHS_ALL.length
  });
  const FILE_PATHS_IN = [];
  for (const FILE_PATH_IN of FILE_PATHS_ALL) {
    let shouldProcess = cache.shouldProcessSync(cache_namespace, FILE_PATH_IN, counters);
    const FILE_PATH_OUT = getExpectedOutputPath(FILE_PATH_IN);

    if (!shouldProcess && !NODE_FS.existsSync(FILE_PATH_OUT)) {
      shouldProcess = true;

      if (typeof counters.filtered === 'number' && counters.filtered > 0) {
        counters.filtered -= 1;
      }
      if (typeof counters.processed === 'number') {
        counters.processed += 1;
      }

      log.debug(LOG_TAG_FILE_COPY, 'Forcing copy because cached output is missing:', {
        input: FILE_PATH_IN,
        output: FILE_PATH_OUT,
        cache_namespace
      });
    }

    if (!shouldProcess && !outputMatchesSource(FILE_PATH_IN, FILE_PATH_OUT)) {
      shouldProcess = true;

      if (typeof counters.filtered === 'number' && counters.filtered > 0) {
        counters.filtered -= 1;
      }
      if (typeof counters.processed === 'number') {
        counters.processed += 1;
      }

      log.debug(LOG_TAG_FILE_COPY, 'Forcing copy because cached output content differs from source:', {
        input: FILE_PATH_IN,
        output: FILE_PATH_OUT,
        cache_namespace
      });
    }

    if (!shouldProcess) {
      continue;
    }
    FILE_PATHS_IN.push(FILE_PATH_IN);
  }

  log.info(LOG_TAG_FILE_COPY, 'Processing queue:', {
    "File Count": FILE_PATHS_IN.length,
    "File Paths": FILE_PATHS_IN
  });

  let fileIndex = 0;

  for (const FILE_PATH_IN of FILE_PATHS_IN) {
    try {
      fileIndex += 1;

      const FILE_PATH_IN_RELATIVE = libraryPathRelativeProjectRoot(FILE_PATH_IN);

      log.info(LOG_TAG_FILE_COPY, 'Processing file:', {
        "File Current": fileIndex,
        "File Total": FILE_PATHS_IN.length,
        "File Path": FILE_PATH_IN_RELATIVE
      });

      const FILE_PATH_OUT = getExpectedOutputPath(FILE_PATH_IN);

      const FILE_PATH_OUT_RELATIVE = libraryPathRelativeProjectRoot(FILE_PATH_OUT);

      log.detail(LOG_TAG_FILE_COPY, 'Paths:', {
        From: FILE_PATH_IN,
        To: FILE_PATH_OUT,
        RelRaw: NODE_PATH.basename(FILE_PATH_IN),
        RelRenamed: NODE_CURE_PATH.relative(path_out, FILE_PATH_OUT)
      });

      await NODE_FS.promises.mkdir(NODE_PATH.dirname(FILE_PATH_OUT), { recursive: true });
      await NODE_FS.promises.copyFile(FILE_PATH_IN, FILE_PATH_OUT);

      // store INPUT key
      await cache.store(cache_namespace, FILE_PATH_IN, savePerFile);

      // store OUTPUT key for mirror reset correctness
      if (mirrorOutNamespace) {
        await cache.store(mirrorOutNamespace, FILE_PATH_OUT, savePerFile);
      }


      log.success(LOG_TAG_FILE_COPY, 'Copied:', {
        "File Current": fileIndex,
        "File Total": FILE_PATHS_IN.length,
        "File Path": FILE_PATH_IN_RELATIVE,
        "File Output Path": FILE_PATH_OUT_RELATIVE,
        "File Size": `${(NODE_FS.statSync(FILE_PATH_IN).size / 1024).toFixed(2)} KB`
      });

    } catch (err) {
      log.error(LOG_TAG_FILE_COPY, 'Error processing file:', { file: FILE_PATH_IN, error: err });
    }
  }

  if (!savePerFile) {
    cache.save();
  }


  log.info(LOG_TAG_FILE_COPY, 'File Count Cache Summary:', counters);

  log.end(LOG_TAG_FILE_COPY, 'Complete.');
}

// -----------------------------------------------------------------------------
// #### Main - Process Helper - Sass
// -----------------------------------------------------------------------------

const LOG_TAG_STYLESHEET = '[🎨 Stylesheet]';
const LOG_TAG_SASS = '[🧵 SASS]';
const LOG_TAG_STYLESHEET_SASS = LOG_TAG_STYLESHEET + ' ' + LOG_TAG_SASS;

/**
 * Gulp transform: compile SCSS using Dart Sass JS API and capture warnings via logger.
 *
 * One Sass warning => one logger.warn() call (no stderr parsing, no blank-line heuristics).
 *
 * Notes:
 * - Real `.scss` / `.sass` entry files compile by filesystem path so Sass owns path resolution
 *   and original source locations directly.
 * - In-memory or generated `.css` inputs still compile from string content with an explicit file URL.
 * - Sourcemaps are emitted via Dart Sass and attached to `file.sourceMap` for gulp-sourcemaps.
 *
 * @param {Object} opt
 * @param {string} opt.logTag
 * @param {'compressed'|'expanded'} [opt.style='compressed']
 * @param {string[]} [opt.loadPaths]
 * @returns {NodeJS.ReadWriteStream}
 */
function gulpDartSassWithLogger(opt) {
  const {
    logTag,
    style = 'compressed',
    loadPaths = [],
  } = opt || {};

  const NODE_THROUGH2 = require('through2');
  const NODE_SASS = require('sass');
  const NODE_PATH = require('path');
  const applySourceMap = require('vinyl-sourcemaps-apply');
  const { pathToFileURL, fileURLToPath } = require('url');

  return NODE_THROUGH2.obj(function (file, _enc, cb) {
    try {
      if (file.isNull()) return cb(null, file);
      if (file.isStream()) {
        return cb(new Error('gulpDartSassWithLogger: streams not supported (expected Buffer contents).'));
      }

      const ext = String(file.extname || NODE_PATH.extname(file.path || '') || '').toLowerCase();

      /** @type {'scss'|'indented'|'css'} */
      const syntax =
        ext === '.sass' ? 'indented' :
        ext === '.css'  ? 'css'  :
        'scss';

      const source = Buffer.isBuffer(file.contents)
        ? decodeUtf8StrictFromBuffer(file.contents, file.path)
        : String(file.contents ?? '');

      const sassOptions = {
        style,
        loadPaths,
        sourceMap: true,
        sourceMapIncludeSources: true,

        /**
         * Sass logger overrides default stderr printing.
         * This gives you clean, structured warning boundaries.
         */
        logger: {
          warn(message, warnOpt) {
            /** @type {any} */
            const safeSpan = (() => {
              const span = warnOpt?.span;
              if (!span) return null;

              let url = '';
              try {
                url = String(span.url || '');
              } catch (_) {}

              return {
                text: typeof span.text === 'string' ? span.text : '',
                start: span.start ? {
                  line: Number(span.start.line ?? 0),
                  column: Number(span.start.column ?? 0),
                  offset: Number(span.start.offset ?? 0),
                } : null,
                end: span.end ? {
                  line: Number(span.end.line ?? 0),
                  column: Number(span.end.column ?? 0),
                  offset: Number(span.end.offset ?? 0),
                } : null,
                url,
              };
            })();

            log.warn(logTag, message, {
              deprecation: !!warnOpt?.deprecation,
              span: safeSpan,
              stack: typeof warnOpt?.stack === 'string' ? warnOpt.stack : '',
            });
          },
          // debug(message, debugOpt) {
          //   // Uncomment if you want Sass debug output in Cure Log.
          //   // log.debug(logTag, message, debugOpt);
          // }
        }
      };

      const shouldCompileFromPath =
        (ext === '.scss' || ext === '.sass')
        && typeof file.path === 'string'
        && file.path.length > 0
        && NODE_PATH.isAbsolute(file.path)
        && file.history?.length === 1
        && NODE_FS.existsSync(file.path);

      const res = shouldCompileFromPath
        ? NODE_SASS.compile(file.path, sassOptions)
        : NODE_SASS.compileString(source, {
            ...sassOptions,
            syntax,

            /**
             * Critical for virtual/in-memory inputs: treat content as though it came from `file.path`
             * so relative imports and warning spans remain file-aware.
             */
            url: pathToFileURL(file.path),
          });

      // Write CSS into the vinyl file.
      file.contents = Buffer.from(res.css);

      // Convert .scss/.sass -> .css, leave .css as-is
      if (ext === '.scss' || ext === '.sass') {
        file.path = file.path.replace(/\.(s[ac]ss)$/i, '.css');
      }

      // Bridge Dart Sass map -> gulp-sourcemaps format.
      if (res.sourceMap && typeof res.sourceMap === 'object') {
        const sourceMap = JSON.parse(JSON.stringify(res.sourceMap));

        if (Array.isArray(sourceMap.sources)) {
          sourceMap.sources = sourceMap.sources.map(src => {
            if (typeof src !== 'string') return src;
            if (!src.startsWith('file://')) return src;
            try {
              return fileURLToPath(src);
            } catch (_) {
              return src;
            }
          });
        }

        sourceMap.file = NODE_PATH.basename(file.path);

        if (file.sourceMap) {
          applySourceMap(file, sourceMap);
        } else {
          file.sourceMap = sourceMap;
        }
      }

      return cb(null, file);
    } catch (error) {
      log.error(logTag, 'Compile failed:', error?.message || error);
      return cb(error instanceof Error ? error : new Error(String('Compile failed: ' + (error?.message || error))));
    }
  });
}

/**
 * Gulp transform: run Autoprefixer while preserving upstream source-map sources.
 *
 * `gulp-autoprefixer` rewrites all map sources to the generated CSS filename, which
 * collapses SCSS-origin mappings in DevTools. This wrapper passes the incoming map
 * to PostCSS as `prev` and writes the composed map back onto the vinyl file.
 *
 * @param {Object} [options]
 * @returns {NodeJS.ReadWriteStream}
 */
function gulpAutoprefixerPreserveSources(options = {}) {
  const NODE_THROUGH2 = require('through2');
  const NODE_POSTCSS = require('postcss');
  const NODE_AUTOPREFIXER = require('autoprefixer');

  return NODE_THROUGH2.obj(function (file, _enc, cb) {
    if (file.isNull()) return cb(null, file);
    if (file.isStream()) {
      return cb(new Error('gulpAutoprefixerPreserveSources: streams not supported (expected Buffer contents).'));
    }

    NODE_POSTCSS([NODE_AUTOPREFIXER(options)])
      .process(decodeUtf8StrictFromBuffer(file.contents, file.path), {
        from: file.path,
        to: file.path,
        map: file.sourceMap
          ? {
              annotation: false,
              inline: false,
              prev: file.sourceMap,
            }
          : false,
      })
      .then((result) => {
        file.contents = Buffer.from(result.css);

        if (result.map) {
          const map = result.map.toJSON();
          map.file = file.relative;
          file.sourceMap = map;
        }

        return cb(null, file);
      })
      .catch((error) => {
        if (error?.name === 'CssSyntaxError' && typeof error.showSourceCode === 'function') {
          error.message += error.showSourceCode();
          error.isPresentable = true;
        }
        return cb(error);
      });
  });
}

// -----------------------------------------------------------------------------
// ### Main - Process
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// #### Main - Process - About
// -----------------------------------------------------------------------------

const LOG_TAG_ABOUT = '[📘 About]';

function groupAbout(done) {
  log.begin(LOG_TAG_ABOUT, 'Initializing...');

  log.info(LOG_TAG_ABOUT, {
    "Compiler": CONFIG_INFO,
    "Selected Project": {
      PATH_DIR_PROJECT,
      PATH_FILE_CONFIG_PROJECT,
      ...configProjectInfo,
    }
  })

  log.end(LOG_TAG_ABOUT, 'Complete.');
  done();
}

// -----------------------------------------------------------------------------
// #### Main - Process - Audio
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_AUDIO = 'audio';

const PATH_DIR_PROJECT_IN_ASSET_AUDIO  =  `${PATH_DIR_PROJECT_IN_ASSET}audio/`;
const PATH_DIR_PROJECT_OUT_ASSET_AUDIO =  `${PATH_DIR_PROJECT_OUT_ASSET}audio/`;
const PATH_FILE_PROJECT_IN_ASSET_AUDIO = [
  `${PATH_DIR_PROJECT_IN_ASSET_AUDIO}${PATH_ALL}`,
  ...PATH_DIR_IN_IGNORE_PROJECT
];

async function primaryAudio(done) {
  const LOG_TAG_AUDIO = '[🎵 Audio]';

  log.begin(LOG_TAG_AUDIO, 'Running...');
  const op = logProcessingStart(LOG_TAG_AUDIO, 'audio copy');

  try {
    await handleFileCopy(
      LOG_TAG_AUDIO,
      CACHE_NAMESPACE_AUDIO,
      PATH_DIR_PROJECT_IN_ASSET_AUDIO,
      PATH_FILE_PROJECT_IN_ASSET_AUDIO,
      PATH_DIR_PROJECT_OUT_ASSET_AUDIO
    );
    logProcessingDone(LOG_TAG_AUDIO, op);
  } catch (error) {
    logProcessingFail(LOG_TAG_AUDIO, op, error);
    return done(error);
  }

  log.end(LOG_TAG_AUDIO, 'Complete.');

  done();
};

// -----------------------------------------------------------------------------
// #### Main - Process - Brand
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_BRAND = 'brand';

const PATH_DIR_PROJECT_IN_ASSET_BRAND = `${PATH_DIR_PROJECT_IN_ASSET}brand/`;
const PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS = {
  foreground:      `${PATH_DIR_PROJECT_IN_ASSET_BRAND}foreground.png`,
  foreground_wide: `${PATH_DIR_PROJECT_IN_ASSET_BRAND}foreground-wide.png`,
  background:      `${PATH_DIR_PROJECT_IN_ASSET_BRAND}background.png`
};
const PATH_FILE_PROJECT_IN_ASSET_BRAND = [
  ...Object.values(PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS),  // Extracts all icon paths
  ...PATH_DIR_IN_IGNORE_PROJECT
];
const PATH_DIR_PROJECT_IN_ASSET_BRAND_IMAGE  = `${PATH_DIR_PROJECT_IN_ASSET}image/favicon/`;
const PATH_FILE_PROJECT_IN_ASSET_BRAND_ICO   = `${PATH_DIR_PROJECT_IN}favicon.ico`;
const PATTERN_RESET_BRAND = [
  PATH_DIR_PROJECT_IN_ASSET_BRAND_IMAGE,
  PATH_FILE_PROJECT_IN_ASSET_BRAND_ICO
];

const PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS_PATHS = Object.values(PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS);

/**
 * Prune Brand cache + generated favicon outputs using `in/` as truth.
 * - Reads cache file from disk (does NOT depend on `cacheProjectFile.entries` being warm).
 * - If any cached brand icon key no longer exists in `in/`, clear that cache entry
 *   and wipe generated brand outputs (favicon folder + favicon.ico).
 *
 * @private
 * @param {object} opt
 * @param {string} opt.cacheNamespace
 * @param {string[]} opt.resetTargets Absolute paths/dirs to delete when prune triggers.
 * @param {string} [opt.logTag]
 * @returns {Promise<{ hadPrune: boolean, missingKeys: string[] }>}
 */
async function libraryPruneBrandFromInputTruth(opt) {
  const cacheNamespace = String(opt?.cacheNamespace || '').trim();
  const resetTargets = Array.isArray(opt?.resetTargets) ? opt.resetTargets : [];

  /** @type {string[]} */
  const missingKeys = [];

  if (!cacheNamespace) return { hadPrune: false, missingKeys };

  const pruneResult = libraryPruneFromInput({
    cacheNamespace: cacheNamespace,
    removeOut: false,              // brand outputs are NOT 1:1 out/ mappings
    removeCache: true,
    resetOnAnyMissing: true,       // brand behavior: wipe outputs if any input is missing
    resetTargets: resetTargets,    // favicon folder + favicon.ico
    logTag: opt.logTag
  });

  missingKeys.push(...(Array.isArray(pruneResult?.missingKeys) ? pruneResult.missingKeys : []));

  return {
    hadPrune: missingKeys.length > 0,
    missingKeys
  };
}

function primaryBrand(done) {
  const LOG_TAG_BRAND = '[🏷️ Brand]';
  const LOG_TAG_BRAND_CACHE = LOG_TAG_BRAND + ' ' + NODE_CURE_CACHE.LOG_TAG_CACHE;
  let hasChanges = false;

  log.begin(LOG_TAG_BRAND, 'Running...');
  const op = logProcessingStart(LOG_TAG_BRAND, 'brand build');

  (async () => {
    const prune = await libraryPruneBrandFromInputTruth({
      cacheNamespace: CACHE_NAMESPACE_BRAND,
      resetTargets: PATTERN_RESET_BRAND,
      logTag: LOG_TAG_BRAND
    });

    if (prune.hadPrune) {
      // We reset outputs; we should regenerate.
      hasChanges = true;
    }

    NODE_GULP.src(PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS_PATHS, { allowEmpty: true })
      .pipe(libraryPlumber())
      .pipe(libraryCacheFilter(CACHE_NAMESPACE_BRAND))
      .on('data', (file) => {
        hasChanges = true;
        log.info(LOG_TAG_BRAND_CACHE, `Change detected: ${file.path}`);
      })
      .on('end', () => {
        if (!hasChanges) {
          log.info(LOG_TAG_BRAND_CACHE, 'No changes detected. Skipping...');
          logProcessingDone(LOG_TAG_BRAND, op, { skipped: true });
          log.end(LOG_TAG_BRAND, 'Complete.');
          return done();
        }

        log.info(LOG_TAG_BRAND_CACHE, 'Changes found, updating cache and proceeding...');
        log.begin(LOG_TAG_BRAND, 'Generating icons...');

        const options = {
          inputForeground:     PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS.foreground,
          inputForegroundWide: PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS.foreground_wide,
          inputBackground:     PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS.background,
          outputImage:         PATH_DIR_PROJECT_IN_ASSET_BRAND_IMAGE,
          outputIco:           PATH_FILE_PROJECT_IN_ASSET_BRAND_ICO,
          setting:             configProjectMerge.option.brand,
        };

        const NODE_STATICUS_BRAND = require('@custom/compiler-brand');

        NODE_STATICUS_BRAND.processFavicon(options)
          .then(async () => {
            log.info(LOG_TAG_BRAND_CACHE, 'Updating cache...');

            for (const filePath of PATH_DIR_PROJECT_IN_ASSET_BRAND_ICONS_PATHS) {
              if (NODE_FS.existsSync(filePath)) {
                await cacheProjectFile.store(CACHE_NAMESPACE_BRAND, filePath);
              } else {
                log.debug(LOG_TAG_BRAND, 'Skipping non-existent file:', filePath);
              }
            }

            log.info(LOG_TAG_BRAND_CACHE, 'Update cache complete.');
            log.success(LOG_TAG_BRAND, 'Generating icons complete.');
            logProcessingDone(LOG_TAG_BRAND, op, { skipped: false });
            log.end(LOG_TAG_BRAND, 'Complete.');
            done();
          })
          .catch((err) => {
            logProcessingFail(LOG_TAG_BRAND, op, err);
            log.error(LOG_TAG_BRAND, 'Error processing favicon:', err);
            log.end(LOG_TAG_BRAND, 'Complete.');
            done(err);
          });
      });
  })().catch((err) => {
    logProcessingFail(LOG_TAG_BRAND, op, err);
    log.error(LOG_TAG_BRAND, 'Unhandled error:', err);
    log.end(LOG_TAG_BRAND, 'Complete.');
    done(err);
  });
}

// -----------------------------------------------------------------------------
// #### Main - Process - Config
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_CONFIG = 'config';

async function projectConfigCacheStore() {
  await cacheProjectFile.store(CACHE_NAMESPACE_CONFIG, PATH_FILE_CONFIG_PROJECT);
}

// For manual/standalone call
async function handleProjectConfigCacheStore(done) {
  await projectConfigCacheStore();
  done();
}

function handleConfig(done) {
  log.begin(LOG_TAG_CONFIG_PROJECT, 'Running...');

  log.info(LOG_TAG_CONFIG_PROJECT, 'Checking for changes...'); // Before loading the project config file

  let configProjectChangesFound = false; // Initialize a flag to track if changes are found

  // Used for debugging:
  // if (NODE_FS.existsSync(PATH_FILE_PROJECT_CACHE_FILE)) {
  //   const currentCache = JSON.parse(NODE_FS.readFileSync(PATH_FILE_PROJECT_CACHE_FILE, 'utf8'));
  //   log.debug(LOG_TAG_CONFIG_PROJECT, 'Cache before filter:', currentCache[CACHE_NAMESPACE_CONFIG]);
  // }

  let isSettled = false;
  const finishOnce = (err = null) => {
    if (isSettled) return;
    isSettled = true;
    done(err || undefined);
  };

  NODE_GULP.src(PATH_FILE_CONFIG_PROJECT)
    .pipe(libraryPlumber())

    .pipe(libraryCacheFilter(CACHE_NAMESPACE_CONFIG))

    .on('data', async (file) => {
      configProjectChangesFound = true; // Set the flag to true if data is found

      try {
        log.info(LOG_TAG_CONFIG_PROJECT, 'Changes found, loading:');

        _loadConfigProject();
        validateMirrorSources();
        configProjectMergeSnapshot = NODE_CURE_JSON.clone(configProjectMerge);

        await projectConfigCacheStore();

        primaryMirrorWatchReload();
        if (watchManager && typeof watchManager.reloadWatchTriggerWatchersIfConfigChanged === 'function') {
          watchManager.reloadWatchTriggerWatchersIfConfigChanged();
        }

        log.info(LOG_TAG_CONFIG_PROJECT, 'Memory has been updated.'); // Log the updated project config
      } catch (err) {
        log.error(LOG_TAG_CONFIG_PROJECT, 'During update:', {
          error: String(err?.message || err),
          invalidEntries: err?.invalidEntries || []
        });
        log.end(LOG_TAG_CONFIG_PROJECT, 'Complete.');
        finishOnce(err);
      }
    })

    .on('end', () => {
      if (isSettled) return;

      if (!configProjectChangesFound) { // Check if changes were found
        log.info(LOG_TAG_CONFIG_PROJECT, 'No changes found.'); // Report if no changes were found
      }

      log.end(LOG_TAG_CONFIG_PROJECT, 'Complete.');

      finishOnce();
    })

    .on('error', (err) => {
      if (isSettled) return;
      log.error(LOG_TAG_CONFIG_PROJECT, 'During update:', err); // Log the error
      finishOnce(err);
    });
}

function primaryConfigSort(done) {
  const LOG_TAG_CONFIG_SORT = '[⚙️ Config Sort]';
  const op = logProcessingStart(LOG_TAG_CONFIG_SORT, 'config sort');
  try {
    _loadConfigProject(true);
    logProcessingDone(LOG_TAG_CONFIG_SORT, op);
    done();
  } catch (error) {
    logProcessingFail(LOG_TAG_CONFIG_SORT, op, error);
    done(error);
  }
}

// -----------------------------------------------------------------------------
// #### Main - Process - Data
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_DATA = 'data';

const PATH_DIR_PROJECT_IN_DATA  = PATH_DIR_PROJECT_IN;
const PATH_DIR_PROJECT_OUT_DATA = PATH_DIR_PROJECT_OUT;

const DATA_FILES = ['manifest.webmanifest', 'browserconfig.xml'];

const PATH_FILE_PROJECT_IN_DATA = [
  ...DATA_FILES.map(file => `${PATH_DIR_PROJECT_IN_DATA}${file}`),
  ...PATH_DIR_IN_IGNORE_PROJECT
];

const PATTERN_RESET_DATA = DATA_FILES.map(file => `${PATH_DIR_PROJECT_OUT_DATA}${file}`);

function primaryData() {
  const LOG_TAG_DATA = '[💽 Data]';
  let pruneResult = null;
  let dataFilesSeen = 0;
  let dataTotalFiles = 0;
  log.begin(LOG_TAG_DATA, 'Running.');

  try {
    pruneResult = libraryPruneFromInput({
      cacheNamespace: CACHE_NAMESPACE_DATA,
      logTag: LOG_TAG_DATA
    });

    const dataFilesAll = libraryFileGetFilesFromPatternSync(PATH_FILE_PROJECT_IN_DATA);
    const dataFilesToProcess = dataFilesAll.filter((filePath) =>
      cacheProjectFile.shouldProcessSync(CACHE_NAMESPACE_DATA, filePath)
    );
    dataTotalFiles = dataFilesToProcess.length;
  } catch (err) {
    log.error(LOG_TAG_DATA, 'During prune:', err);
    log.end(LOG_TAG_DATA, 'Complete.');
    return Promise.reject(err);
  }

  /** @type {{ operation: string, startedAt: number, detail: object }} */
  const dataPipelineOp = logProcessingStart(LOG_TAG_DATA, 'data pipeline', {
    input: PATH_FILE_PROJECT_IN_DATA,
    output: PATH_DIR_PROJECT_OUT_DATA,
    total_files: dataTotalFiles
  });

  if (dataTotalFiles === 0) {
    logProcessingDone(LOG_TAG_DATA, dataPipelineOp, {
      files_seen: 0,
      total_files: dataTotalFiles,
      skipped: true
    });
    log.end(LOG_TAG_DATA, 'Complete.');
    return Promise.resolve();
  }

  /** @type {any} */
  let pipeline = NODE_GULP.src(PATH_FILE_PROJECT_IN_DATA, { allowEmpty: true })

    .pipe(libraryPlumber())

    .pipe(libraryCacheFilter(CACHE_NAMESPACE_DATA))

    .on('data', (file) => {
      dataFilesSeen++;
      log.info(LOG_TAG_DATA, 'Processing:', {
        "File Current": dataFilesSeen,
        "File Total": dataTotalFiles,
        "File Path": NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, file.path)
      });
    });

  // Keep one explicit completion contract for the whole stream lifecycle.
  Object.entries(configProjectFlat).forEach(([placeholder, value]) => {
    pipeline = pipeline.pipe(
      NODE_GULP_REPLACE(
        new RegExp(libraryVariableAddReplaceDelimiters(placeholder), 'g'),
        value
      )
    );
  });

  const pipelineFinal = pipeline
    .pipe(libraryAppendBrandComment()) // Append comment before output
    .pipe(NODE_GULP.dest(PATH_DIR_PROJECT_OUT_DATA)) // Output to the specified directory
    .pipe(libraryCacheStore(CACHE_NAMESPACE_DATA));

  const { finished } = require('stream/promises');

  return finished(pipelineFinal)
    .then(() => {
      logProcessingDone(LOG_TAG_DATA, dataPipelineOp, {
        files_seen: dataFilesSeen,
        total_files: dataTotalFiles
      });
      log.end(LOG_TAG_DATA, 'Complete.');
    })
    .catch((err) => {
      logProcessingFail(LOG_TAG_DATA, dataPipelineOp, err, {
        files_seen: dataFilesSeen,
        total_files: dataTotalFiles
      });
      log.error(LOG_TAG_DATA, 'During pipeline:', err);
      log.end(LOG_TAG_DATA, 'Complete.');
      throw err;
    });
};

// -----------------------------------------------------------------------------
// #### Main - Process - Favicon
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_FAVICON = 'favicon';

const PATH_DIR_PROJECT_IN_FAVICON  =    PATH_DIR_PROJECT_IN;
const PATH_DIR_PROJECT_OUT_FAVICON =    PATH_DIR_PROJECT_OUT;
const PATH_FILE_PROJECT_IN_FAVICON = `${PATH_DIR_PROJECT_IN_FAVICON}favicon.ico`;
const PATTERN_RESET_FAVICON        = `${PATH_DIR_PROJECT_OUT_FAVICON}favicon.ico`;

async function primaryFavicon(done) {
  const LOG_TAG_FAVICON = '[🪪 Favicon]';

  log.begin(LOG_TAG_FAVICON, 'Running...');
  const op = logProcessingStart(LOG_TAG_FAVICON, 'favicon copy');

  try {
    await handleFileCopy(
      LOG_TAG_FAVICON,
      CACHE_NAMESPACE_FAVICON,
      PATH_DIR_PROJECT_IN_FAVICON,
      PATH_FILE_PROJECT_IN_FAVICON,
      PATH_DIR_PROJECT_OUT_FAVICON
    );
    logProcessingDone(LOG_TAG_FAVICON, op);
  } catch (error) {
    logProcessingFail(LOG_TAG_FAVICON, op, error);
    return done(error);
  }

  log.end(LOG_TAG_FAVICON, 'Complete.');

  done();
};

// -----------------------------------------------------------------------------
// #### Main - Process - File
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_FILE = 'file';

const PATH_DIR_PROJECT_IN_ASSET_FILE  = `${PATH_DIR_PROJECT_IN_ASSET}file/`;
const PATH_DIR_PROJECT_OUT_ASSET_FILE = `${PATH_DIR_PROJECT_OUT_ASSET}file/`;
const PATH_FILE_PROJECT_IN_ASSET_FILE = [
  `${PATH_DIR_PROJECT_IN_ASSET_FILE}${PATH_ALL}`,
  ...PATH_DIR_IN_IGNORE_PROJECT
];

async function primaryFile(done) {
  const LOG_TAG_FILE = '[📄 File]';

  log.begin(LOG_TAG_FILE, 'Running...');
  const op = logProcessingStart(LOG_TAG_FILE, 'file copy');

  try {
    await handleFileCopy(
      LOG_TAG_FILE,
      CACHE_NAMESPACE_FILE,
      PATH_DIR_PROJECT_IN_ASSET_FILE,
      PATH_FILE_PROJECT_IN_ASSET_FILE,
      PATH_DIR_PROJECT_OUT_ASSET_FILE
    );
    logProcessingDone(LOG_TAG_FILE, op);
  } catch (error) {
    logProcessingFail(LOG_TAG_FILE, op, error);
    return done(error);
  }

  log.end(LOG_TAG_FILE, 'Complete.');

  done();
};

// -----------------------------------------------------------------------------
// #### Main - Process - Font
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_FONT = 'font';

const PATH_DIR_PROJECT_IN_ASSET_FONT  =  `${PATH_DIR_PROJECT_IN_ASSET}font/`;
const PATH_DIR_PROJECT_OUT_ASSET_FONT =  `${PATH_DIR_PROJECT_OUT_ASSET}font/`;
const PATH_FILE_PROJECT_IN_ASSET_FONT = [
  `${PATH_DIR_PROJECT_IN_ASSET_FONT}${PATH_ALL}.*`,
  ...PATH_DIR_IN_IGNORE_PROJECT
];

async function primaryFont(done) {
  const LOG_TAG_FONT = '[🔠 Font]';

  log.begin(LOG_TAG_FONT, 'Running...');
  const op = logProcessingStart(LOG_TAG_FONT, 'font copy');

  try {
    await handleFileCopy(
      LOG_TAG_FONT,
      CACHE_NAMESPACE_FONT,
      PATH_DIR_PROJECT_IN_ASSET_FONT,
      PATH_FILE_PROJECT_IN_ASSET_FONT,
      PATH_DIR_PROJECT_OUT_ASSET_FONT
    );
    logProcessingDone(LOG_TAG_FONT, op);
  } catch (error) {
    logProcessingFail(LOG_TAG_FONT, op, error);
    return done(error);
  }

  log.end(LOG_TAG_FONT, 'Complete.');

  done();
};

// -----------------------------------------------------------------------------
// #### Main - Process - Font Icon
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_FONT_ICON = 'font_icon';

const PATH_DIR_PROJECT_IN_ASSET_FONT_ICON  = `${PATH_DIR_PROJECT_IN_ASSET}font-icon/`;
const PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON = `${PATH_DIR_PROJECT_OUT_ASSET}font-icon/`;
const PATH_FILE_PROJECT_IN_ASSET_FONT_ICON_EXT = '.svg';
const PATH_FILE_PROJECT_IN_ASSET_FONT_ICON = [
  `${PATH_DIR_PROJECT_IN_ASSET_FONT_ICON}${PATH_ALL}${PATH_FILE_PROJECT_IN_ASSET_FONT_ICON_EXT}`,
  ...PATH_DIR_IN_IGNORE_PROJECT
];

const DIR_FONT_ICON_VARIABLE = '_variable-font-icon';

const LOG_TAG_FONT_ICON_TEMPLATE = '[🔣 Font Icon] [🧩 Template]';
const PATH_FILE_PROJECT_FONT_ICON_SCSS_TEMPLATE = `${PATH_DIR_PROJECT}font-icon-template.scss`;
const PATH_FILE_DEFAULT_FONT_ICON_SCSS_TEMPLATE = `${PATH_DIR_ROOT_CONFIG_DEFAULT_PROJECT}font-icon-template.scss`;
const PATH_DIR_PROJECT_IN_ASSET_CSS_FONT_ICON = `${PATH_DIR_PROJECT_IN_ASSET}css/${DIR_FONT_ICON_VARIABLE}/`;

const PATH_FILE_PROJECT_IN_ASSET_FONT_ICON_WATCH = [
  ...PATH_FILE_PROJECT_IN_ASSET_FONT_ICON,
  PATH_FILE_PROJECT_FONT_ICON_SCSS_TEMPLATE,
  PATH_FILE_DEFAULT_FONT_ICON_SCSS_TEMPLATE
];

const FONT_ICON_NAME = 'font-icon';
const FONT_ICON_FAMILY_SEPARATOR = '--';

/**
 * Canonical generated basename for a font-icon set.
 * Example: "font-icon--interface"
 * @param {string} subdir
 * @returns {string}
 * @since 1.1.0
 */
function _fontIconFamilyName(subdir) {
  return `${FONT_ICON_NAME}${FONT_ICON_FAMILY_SEPARATOR}${subdir}`;
}

const PATTERN_RESET_FONT_ICON = [
  PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON,
  `${PATH_DIR_PROJECT_OUT_ASSET}css/${FONT_ICON_NAME}/`,
  PATH_DIR_PROJECT_IN_ASSET_CSS_FONT_ICON
];

const FONT_ICON_FORMATS = ['ttf','eot','woff','woff2','svg']; // keep in sync with gulp-iconfont options

/**
 * Return absolute paths of all SVG inputs for a given subdir.
 * Uses the same ignore/sort behavior as elsewhere.
 * @param {string} subdir
 * @returns {Promise<string[]>}
 * @since 1.1.0
 */
async function _getFontIconSourceFiles(subdir) {
  return await libraryFileGetFilesFromPattern(
    [NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_ASSET_FONT_ICON, subdir, `*${PATH_FILE_PROJECT_IN_ASSET_FONT_ICON_EXT}`)],
    ['_*', '**/_*', '**/_*/**'], // TODO: maybe use the ignore pattern generator helper function, or a cached global variable, to get these
    /* sort */ true
  );
}

/**
 * Absolute path of the SCSS template used by gulp-iconfont-css.
 * @returns {string}
 * @since 1.1.0
 */
let _fontIconTemplatePathLast = '';
function _getFontIconTemplatePath() {
  const hasProjectTemplate = NODE_FS.existsSync(PATH_FILE_PROJECT_FONT_ICON_SCSS_TEMPLATE);
  const hasDefaultTemplate = NODE_FS.existsSync(PATH_FILE_DEFAULT_FONT_ICON_SCSS_TEMPLATE);
  const templatePath = hasProjectTemplate
    ? PATH_FILE_PROJECT_FONT_ICON_SCSS_TEMPLATE
    : PATH_FILE_DEFAULT_FONT_ICON_SCSS_TEMPLATE;

  if (_fontIconTemplatePathLast !== templatePath) {
    if (hasProjectTemplate) {
      log.notice(LOG_TAG_FONT_ICON_TEMPLATE, 'Using project font-icon template.', {
        path: templatePath
      });
    } else {
      log.notice(LOG_TAG_FONT_ICON_TEMPLATE, 'Project font-icon template not found; using default.', {
        project: PATH_FILE_PROJECT_FONT_ICON_SCSS_TEMPLATE,
        path: templatePath
      });
    }
    _fontIconTemplatePathLast = templatePath;
  }

  if (!hasProjectTemplate && !hasDefaultTemplate) {
    log.error(LOG_TAG_FONT_ICON_TEMPLATE, 'No font-icon template file found.', {
      project: PATH_FILE_PROJECT_FONT_ICON_SCSS_TEMPLATE,
      default: PATH_FILE_DEFAULT_FONT_ICON_SCSS_TEMPLATE
    });
  }

  return templatePath;
}

/**
 * Expected output files for a subdir (fonts + min.css) that signal a "built" state.
 * @param {string} subdir
 * @returns {string[]}
 * @since 1.1.0
 */
function _expectedFontIconOutputs(subdir) {
  // NOTE: Commented out fonts in case some fonts fail to generate
  // const dir  = NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON, subdir, '/');
  const name = _fontIconFamilyName(subdir);
  // const fonts = FONT_ICON_FORMATS.map(ext => NODE_CURE_PATH.join(dir, `${name}.${ext}`));
  const css   = NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT_ASSET_STYLESHEET, FONT_ICON_NAME, `${name}.min.css`);
  // return [...fonts, css];
  return [css];
}

/**
 * Decide whether a given font-icon subdir needs a rebuild.
 * Triggers:
 *  - Any SVG in subdir changed vs cache (project file cache).
 *  - The SCSS template changed.
 *  - Any expected output artifact is missing.
 * @param {string} subdir
 * @returns {Promise<boolean>}
 * @since 1.1.0
 */
async function _shouldBuildFontIconSubdir(subdir) {
  const LOG_TAG_FONT_ICON_DECIDE = '[🔣 Font Icon] [🗃️ Cache]';
  const inputCache = cacheProjectFile; // SVG inputs are project-scoped
  const templateCache = cacheRoot; // Template checksum belongs in _cache/compiler/file.json

  // 1) If any expected output is missing -> build
  const outputs = _expectedFontIconOutputs(subdir);
  const missing = outputs.some(p => !NODE_FS.existsSync(p));
  if (missing) {
    log.info(LOG_TAG_FONT_ICON_DECIDE, 'Missing output → build', { subdir, missing: outputs.filter(p => !NODE_FS.existsSync(p)) });
    return true;
  }

  // 2) If template changed -> build
  const templateAbs = _getFontIconTemplatePath();
  if (templateCache.shouldProcessSync(CACHE_NAMESPACE_FONT_ICON, templateAbs)) {
    log.info(LOG_TAG_FONT_ICON_DECIDE, 'Template changed → build', { subdir, templateAbs });
    return true;
  }

  // 3) If any input SVG changed -> build
  const svgs = await _getFontIconSourceFiles(subdir);
  if (svgs.length === 0) {
    // No inputs; treat as no-op (skip). We still want aggregator to include prior vars if present on disk.
    log.warn(LOG_TAG_FONT_ICON_DECIDE, 'No SVG inputs found; skipping build', { subdir });
    return false;
  }

  for (const svgAbs of svgs) {
    if (inputCache.shouldProcessSync(CACHE_NAMESPACE_FONT_ICON, svgAbs)) {
      log.info(LOG_TAG_FONT_ICON_DECIDE, 'Change detected → build', { subdir, file: svgAbs });
      return true;
    }
  }

  // No changes across inputs/template and outputs exist -> skip
  log.debug(LOG_TAG_FONT_ICON_DECIDE, 'Unchanged → skip', { subdir });
  return false;
}

/**
 * After a successful build, store all inputs involved so next runs can skip.
 * @param {string} subdir
 * @returns {Promise<void>}
 * @since 1.1.0
 */
async function _storeFontIconSubdirInputs(subdir) {
  const svgs = await _getFontIconSourceFiles(subdir);
  for (const svgAbs of svgs) {
    await cacheProjectFile.store(CACHE_NAMESPACE_FONT_ICON, svgAbs, /* doSave */ false);
  }
  await cacheRoot.store(CACHE_NAMESPACE_FONT_ICON, _getFontIconTemplatePath(), /* doSave */ false);
  cacheProjectFile.save();
  cacheRoot.save();
}

/**
 * Build the aggregator file from what actually exists on disk so
 * previously built-and-cached subdirs are still included.
 * Writes: in/asset/css/${DIR_FONT_ICON_VARIABLE}/_include-all.scss
 * @returns {void}
 * @since 1.1.0
 */
function _writeFontIconAggregatorFromDisk() {
  const LOG_TAG_AGG = '[🔣 Font Icon] [📦 Aggregate]';
  const dirVars = PATH_DIR_PROJECT_IN_ASSET_CSS_FONT_ICON; // e.g., in/asset/css/${DIR_FONT_ICON_VARIABLE}
  if (!NODE_FS.existsSync(dirVars)) {
    NODE_FS.mkdirSync(dirVars, { recursive: true });
  }

  // Collect all _<subdir>.scss present
  const files = (NODE_FS.existsSync(dirVars)
    ? NODE_FS.readdirSync(dirVars, { withFileTypes: true })
    : [])
    .filter((d) => {
      if (!d.isFile()) return false;
      const name = String(d.name || '');
      if (!name.startsWith('_') || !name.endsWith('.scss')) return false;
      // Exclude aggregator file itself in both legacy and normalized naming.
      return !/^_include[-_]all\.scss$/i.test(name);
    })
    .map(d => d.name);

  const lines = files
    .map(name => name.replace(/^_/, '').replace(/\.scss$/, ''))
    .sort()
    .map(sub => `@use "${DIR_FONT_ICON_VARIABLE}/_${sub}" as *;`);

  const outFile = NODE_CURE_PATH.join(dirVars, '_include-all.scss');
  NODE_CURE_FS.writeFileSync(outFile, lines.join('\n'));
  log.info(LOG_TAG_AGG, 'Main SCSS file generated:', { PATH_FILE_PROJECT_IN_ASSET_CSS_FONT_ICON_ALL: outFile });
}

/**
 * Try to derive a font-icon subdir name from a cache key.
 * Expected key shape (relative to project in-root): asset/font-icon/<subdir>/<file>.svg
 * @param {string} keyExact
 * @returns {string|null}
 * @since 1.1.0
 */
function _fontIconSubdirFromCacheKey(keyExact) {
  const key = NODE_CURE_PATH.slashForward(String(keyExact || '').trim());
  if (!key || !key.toLowerCase().endsWith(PATH_FILE_PROJECT_IN_ASSET_FONT_ICON_EXT)) return null;

  const absIn = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN, key);
  const relToFontRoot = NODE_CURE_PATH.slashForward(
    NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN_ASSET_FONT_ICON, absIn)
  );

  if (!relToFontRoot || relToFontRoot.startsWith('..')) return null;

  const parts = relToFontRoot.split('/').filter(Boolean);
  if (parts.length < 2) return null; // needs at least "<subdir>/<file>.svg"

  const subdir = parts[0];
  if (!subdir || subdir === '.' || subdir === '..' || subdir.includes('..')) return null;

  return subdir;
}

/**
 * Remove generated outputs for font-icon subdirs that no longer have any SVG input files.
 * @param {string[]} missingKeys
 * @param {string} logTag
 * @returns {Promise<{ removedSubdirs: string[] }>}
 * @since 1.1.0
 */
async function _pruneMissingFontIconSubdirOutputs(missingKeys, logTag) {
  const LOG_TAG_FONT_ICON_SUBDIR_PRUNE = `${logTag} [🧹 Subdir Output Prune]`;
  const subdirs = new Set();

  for (const key of (Array.isArray(missingKeys) ? missingKeys : [])) {
    const subdir = _fontIconSubdirFromCacheKey(key);
    if (subdir) subdirs.add(subdir);
  }

  if (subdirs.size === 0) {
    return { removedSubdirs: [] };
  }

  /** @type {string[]} */
  const removedSubdirs = [];

  for (const subdir of Array.from(subdirs).sort()) {
    const svgs = await _getFontIconSourceFiles(subdir);
    if (svgs.length > 0) {
      log.detail(LOG_TAG_FONT_ICON_SUBDIR_PRUNE, 'Subdir still has SVG inputs; skip output cleanup.', { subdir, count: svgs.length });
      continue;
    }

    const cssBase = NODE_CURE_PATH.join(
      PATH_DIR_PROJECT_OUT_ASSET_STYLESHEET,
      FONT_ICON_NAME,
      `${_fontIconFamilyName(subdir)}.min.css`
    );

    const targets = [
      NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON, subdir, '**'),
      NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON, subdir, '/'),
      cssBase,
      `${cssBase}.map`,
      NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_ASSET_CSS_FONT_ICON, `_${subdir}.scss`)
    ];

    try {
      await NODE_CURE_FS.deleteAsync(targets, { force: true });

      removedSubdirs.push(subdir);
      log.success(LOG_TAG_FONT_ICON_SUBDIR_PRUNE, 'Removed outputs for missing font-icon subdir.', { subdir, targets });
    } catch (err) {
      log.error(LOG_TAG_FONT_ICON_SUBDIR_PRUNE, 'Failed removing outputs for missing font-icon subdir.', {
        subdir,
        targets,
        err: String(err?.message || err)
      });
    }
  }

  return { removedSubdirs };
}

async function primaryFontIcon(done) {
  const LOG_TAG_FONT_ICON = '[🔣 Font Icon]';
  let fontIconOutputsPruned = false;
  /** @type {Set<string>} */
  let forceRebuildSubdirs = new Set();

  log.begin(LOG_TAG_FONT_ICON, 'Running...');
  const op = logProcessingStart(LOG_TAG_FONT_ICON, 'font icon build');

  try {
    const pruneResult = libraryPruneFromInput({
      cacheNamespace: CACHE_NAMESPACE_FONT_ICON,

      // Font-icon output is NOT a 1:1 mapping from in/ -> out/, so don't attempt auto out-path deletes.
      removeOut: false,
      removeCache: true,

      logTag: LOG_TAG_FONT_ICON
    });

    forceRebuildSubdirs = new Set(
      (pruneResult?.missingKeys || [])
        .map(_fontIconSubdirFromCacheKey)
        .filter(Boolean)
    );

    const { removedSubdirs } = await _pruneMissingFontIconSubdirOutputs(
      pruneResult?.missingKeys || [],
      LOG_TAG_FONT_ICON
    );

    fontIconOutputsPruned = removedSubdirs.length > 0;
  } catch (err) {
    logProcessingFail(LOG_TAG_FONT_ICON, op, err);
    log.error(LOG_TAG_FONT_ICON, 'During prune:', err);
    log.end(LOG_TAG_FONT_ICON, 'Complete.');
    return done(err);
  }

  // Check if the font-icon root directory exists
  if (!libraryPathExists(PATH_DIR_PROJECT_IN_ASSET_FONT_ICON)) {
    logProcessingDone(LOG_TAG_FONT_ICON, op, { skipped: true, reason: 'missing input dir' });
    log.end(LOG_TAG_FONT_ICON, 'Complete.');
    return done();
  }

  const PATH_DIR_PROJECT_IN_ASSET_FONT_ICON_SUB =
    libraryFileGetSubdirectories(PATH_DIR_PROJECT_IN_ASSET_FONT_ICON);

  log.detail(LOG_TAG_FONT_ICON, { PATH_DIR_PROJECT_IN_ASSET_FONT_ICON_SUB });

  // If no subdirectories are present, return `done` early
  if (PATH_DIR_PROJECT_IN_ASSET_FONT_ICON_SUB.length === 0) {
    if (fontIconOutputsPruned) {
      _writeFontIconAggregatorFromDisk();
    }
    log.error(LOG_TAG_FONT_ICON, 'No subdirectories in:', { PATH_DIR_PROJECT_IN_ASSET_FONT_ICON });
    logProcessingDone(LOG_TAG_FONT_ICON, op, { skipped: true, reason: 'no subdirs' });
    log.end(LOG_TAG_FONT_ICON, 'Complete.');
    return done();
  }

  const PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON_SCSS_DIR =
    NODE_PATH.dirname(PATH_DIR_PROJECT_IN_ASSET_CSS_FONT_ICON);

  // Ensure the output directory exists
  if (!NODE_FS.existsSync(PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON_SCSS_DIR)) {
    NODE_FS.mkdirSync(PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON_SCSS_DIR, { recursive: true });
    log.debug(LOG_TAG_FONT_ICON, 'Created missing directory:', {PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON_SCSS_DIR});
  }

  const NODE_GULP_ICONFONT_CSS = require('gulp-iconfont-css');
  const NODE_GULP_ICONFONT     = (await import('gulp-iconfont')).default;

  try {
    let fontIconHasChanges = false;
    // Collect promises for processing each subdirectory
    const TASKS_FONT_ICON = PATH_DIR_PROJECT_IN_ASSET_FONT_ICON_SUB.map(subdir => {
      return new Promise(async (resolve, reject) => {
        const FONT_ICON_NAME_SUBDIR = _fontIconFamilyName(subdir);

        // cache gate (per subdir)
        if (forceRebuildSubdirs.has(subdir)) {
          fontIconHasChanges = true;
          log.info(LOG_TAG_FONT_ICON, 'Input removed -> force rebuild.', { subdir });
        } else if (!(await _shouldBuildFontIconSubdir(subdir))) {
          // Nothing to do for this subdir; proceed without rebuilding.
          log.success(LOG_TAG_FONT_ICON, 'Subdirectory no changes:', { subdir });
          return resolve();
        } else {
          fontIconHasChanges = true;
        }

        log.detail(LOG_TAG_FONT_ICON, 'Processing subdirectory:', {subdir});
        const fontIconTemplatePath = _getFontIconTemplatePath();

        /**
         * @type {string[]}
         *
         * Array to store SASS variable declarations for each subdir.
         */
        let scssVariables = [];

        log.debug(LOG_TAG_FONT_ICON, 'fontName:', FONT_ICON_NAME_SUBDIR);

        NODE_GULP.src(NODE_CURE_PATH.join(
          PATH_DIR_PROJECT_IN_ASSET_FONT_ICON,
          subdir,
          `*${PATH_FILE_PROJECT_IN_ASSET_FONT_ICON_EXT}`
        ), {
          encoding: false
        })
          .pipe(libraryPlumber())

          .pipe(NODE_GULP_ICONFONT_CSS({
            fontName: FONT_ICON_NAME_SUBDIR,
            path: fontIconTemplatePath,
            targetPath: `./../../css/${FONT_ICON_NAME}/${FONT_ICON_NAME_SUBDIR}.css`, // FIXME: Dont use magic paths
            fontPath: `/asset/${FONT_ICON_NAME}/${subdir}/`, // FIXME: Dont use magic paths,
            // TODO: Validate these suggested key-value pairs are good to use:
            // cssClass:  `icon-${subdir}`,
            // // template can be injected if needed; we already cache-check it
            // cssTemplate: fontIconTemplatePath
          }))

          .pipe(NODE_GULP_ICONFONT({
            fontName: FONT_ICON_NAME_SUBDIR,
            // prependUnicode: true,
            formats: FONT_ICON_FORMATS,
            normalize: true,
            centerHorizontally: true,
            appendCodepoints: true,
            fontHeight: 1000
          }))
          .on('glyphs', (glyphs, options) => {
            log.detail(LOG_TAG_FONT_ICON, 'Glyphs emitted for:', {subdir}, ':', glyphs);

            glyphs.forEach(glyph => {
              let { name, unicode } = glyph;

              // Only treat a suffix as "hex color" if it is EXACTLY 6 hex chars (0-9, a-f).
              // This prevents false-positives like "-circle" or "-enable".
              const HEX_COLOR_SUFFIX_RE = /-([0-9a-fA-F]{6})$/;

              // Remove the hex color suffix from the name (format: 'name-RRGGBB')
              const nameWithoutHex = name.replace(HEX_COLOR_SUFFIX_RE, '');

              // Convert the first Unicode character to its hexadecimal value
              const hexUnicode = unicode[0].charCodeAt(0).toString(16).toUpperCase();

              // Extract the color from the file name (only if valid hex)
              const hexColorMatch = name.match(HEX_COLOR_SUFFIX_RE);
              const hexColor = hexColorMatch ? `#${hexColorMatch[1]}` : null;

              // Generate SASS variable for the glyph
              scssVariables.push(`$font-icon--${subdir}--${nameWithoutHex}: "\\${hexUnicode}";`);

              if (hexColor) {
                scssVariables.push(`$font-icon--color--${subdir}--${nameWithoutHex}: ${hexColor};`);
              }
            });

            // Log the generated SCSS variables for debugging
            log.detail(LOG_TAG_FONT_ICON, 'SCSS Variables:', {subdir, scssVariables});
          })

          .pipe(NODE_GULP_IF(
            file => file.extname === '.css',
            NODE_GULP_RENAME({ suffix: '.min' })
          ))  // Rename the output file with a .min suffix

          .pipe(NODE_GULP_IF(
            file => file.extname === '.css',
            gulpDartSassWithLogger({
              logTag: LOG_TAG_STYLESHEET_SASS,
              style: 'compressed',
              // NOTE: This is plain CSS output from gulp-iconfont-css, so loadPaths typically doesn't matter.
              // Keeping it aligned with your main stylesheet setup is harmless.
              loadPaths: [PATH_DIR_PROJECT_IN_ASSET_STYLESHEET],
            })
          ))

          .pipe(NODE_GULP_IF(
            file => file.extname === '.css',
            // TODO: move overrideBrowserslist (browsers) to .browserslistrc to share target browsers with Babel, ESLint and Stylelint.
            gulpAutoprefixerPreserveSources(/** @type {any} */({ overrideBrowserslist: ['last 2 versions', '> 5%'], remove: false }))
          ))  // Autoprefix CSS

          .pipe(NODE_GULP_IF(
            file => file.extname === '.css',
            libraryAppendBrandComment()
          )) // Append comment before output

          .pipe(NODE_GULP.dest(`${PATH_DIR_PROJECT_OUT_ASSET_FONT_ICON}${subdir}/`))

          .on('end', async () => {
            log.info(LOG_TAG_FONT_ICON, 'SCSS Variables: Finished processing:', {
              subdir,
              scssVariables
            });

            // Write SCSS variables file
            const PATH_FILE_PROJECT_IN_ASSET_CSS_FONT_ICON =
              NODE_CURE_PATH.join(
                PATH_DIR_PROJECT_IN_ASSET_CSS_FONT_ICON,
                `_${subdir}.scss`
              );

            // Ensure the directory exists
            if (!NODE_FS.existsSync(PATH_DIR_PROJECT_IN_ASSET_CSS_FONT_ICON)) {
              NODE_FS.mkdirSync(PATH_DIR_PROJECT_IN_ASSET_CSS_FONT_ICON, {
                recursive: true
              });
            }

            const SCSS_BODY = scssVariables.join('\n');
            NODE_CURE_FS.writeFileSync(PATH_FILE_PROJECT_IN_ASSET_CSS_FONT_ICON, SCSS_BODY);

            log.info(LOG_TAG_FONT_ICON, 'SCSS file generated:', {subdir, PATH_FILE_PROJECT_IN_ASSET_CSS_FONT_ICON});

            // Update cache after a successful build
            await _storeFontIconSubdirInputs(subdir);

            resolve();
          })

          .on('error', (err) => {
            const message = String(err?.message || err || '');
            const isTemplateError = /template/i.test(message)
              || message.includes(fontIconTemplatePath)
              || /font[-_]icon[-_]template\.scss/i.test(message);
            if (isTemplateError) {
              log.error(LOG_TAG_FONT_ICON_TEMPLATE, 'Font-icon template error (non-fatal).', {
                subdir,
                template: fontIconTemplatePath,
                error: message
              });
              return resolve();
            }
            log.error(LOG_TAG_FONT_ICON, {subdir, err});
            reject(err);
          });
      });
    });

    // Wait for all processing tasks to finish
    const TASKS_FONT_ICON_RESULTS = await Promise.allSettled(TASKS_FONT_ICON);

    log.debug(LOG_TAG_FONT_ICON, { TASKS_FONT_ICON_RESULTS });

    // Check for errors
    const TASKS_FONT_ICON_RESULTS_ERRORS =
      TASKS_FONT_ICON_RESULTS.filter(
        result => result.status === 'rejected'
      ).map(
        result => result.reason
      );

    if (TASKS_FONT_ICON_RESULTS_ERRORS.length > 0) {
      log.error('Errors occurred during subdirectory processing:', TASKS_FONT_ICON_RESULTS_ERRORS);
      throw new Error(`Errors occurred during subdirectory processing:\n${TASKS_FONT_ICON_RESULTS_ERRORS.map(err => err.message || err).join('\n')}`);
    }
    else {
      log.success(LOG_TAG_FONT_ICON, 'All subdirectory processed.');
    }

    if (fontIconHasChanges || fontIconOutputsPruned) {
      /**
       * After processing any subdirectories, aggregate the
       * main `${DIR_FONT_ICON_VARIABLE}.scss` `@use` file.
       */
      _writeFontIconAggregatorFromDisk();
    }

    logProcessingDone(LOG_TAG_FONT_ICON, op, { skipped: false });
    log.end(LOG_TAG_FONT_ICON, 'Complete.');
    done();
  } catch (error) {
    logProcessingFail(LOG_TAG_FONT_ICON, op, error);
    log.error(LOG_TAG_FONT_ICON, error);
    log.end(LOG_TAG_FONT_ICON, 'Complete.');
    done();
  }
};

// -----------------------------------------------------------------------------
// #### Main - Process - Highlight Syntax
// -----------------------------------------------------------------------------

// ------------------------------------------
// Prism Syntax Highlighting
// ------------------------------------------

const LOG_TAG_HIGHLIGHT_SYNTAX = '[✨ Highlight] [🖥️ Syntax]';
const CACHE_NAMESPACE_HIGHLIGHT_SYNTAX = 'highlight_syntax';

const PATH_DIR_ROOT_NODE_PRISM = `${PATH_DIR_ROOT}node_modules/prismjs/`;
const PATH_DIR_ROOT_NODE_PRISM_THEME = `${PATH_DIR_ROOT_NODE_PRISM}themes/`;
const PATH_DIR_ROOT_NODE_PRISM_COMPONENT = `${PATH_DIR_ROOT_NODE_PRISM}components/`;
const PATH_DIR_ROOT_NODE_PRISM_PLUGIN = `${PATH_DIR_ROOT_NODE_PRISM}plugins/`;
const PATH_DIR_ROOT_SOURCE_PROJECT_PRISM = `${PATH_DIR_ROOT_SOURCE_PROJECT}module/prism/`;
const PATH_DIR_ROOT_SOURCE_PROJECT_PRISM_LIVE = `${PATH_DIR_ROOT_SOURCE_PROJECT}module/prism-live/`;

const PATH_FILE_ROOT_HIGHLIGHT_SYNTAX_CORE = `${PATH_DIR_ROOT_NODE_PRISM}prism.js`;
const PATH_FILE_ROOT_HIGHLIGHT_SYNTAX_AUTOLOADER = `${PATH_DIR_ROOT_NODE_PRISM_PLUGIN}autoloader/prism-autoloader.js`;

// ------------------------------------------
// Dependency Expansion
// ------------------------------------------

function handleHighlightSyntaxDependencyList(initialList, autoload = false) {
  const PRISM_COMPONENTS = NODE_CURE_JSON.load(`${PATH_DIR_ROOT_NODE_PRISM}components.json`);
  const getLoader = require(`${PATH_DIR_ROOT_NODE_PRISM}dependencies.js`);
  const prismPath = PATH_DIR_ROOT_NODE_PRISM;

  let dependencyList = initialList;

  if (autoload) {
    const allLanguages = Object.keys(PRISM_COMPONENTS.languages || {}).filter(id => {
      const entry = PRISM_COMPONENTS.languages[id];
      return entry && typeof entry.title === 'string';
    });
    dependencyList = Array.from(new Set([
      ...initialList,
      ...allLanguages
    ]));
  }

  const loader = getLoader(PRISM_COMPONENTS, dependencyList);

  const expandedIds = loader.getIds();
  const sections = ['languages', 'plugins'];

  const resolved = expandedIds.map(id => {
    let sectionFound = null;
    for (const section of sections) {
      if (PRISM_COMPONENTS[section] && PRISM_COMPONENTS[section][id]) {
        sectionFound = section;
        break;
      }
    }

    if (!sectionFound) {
      throw new Error(`Unknown Prism component ID: ${id}`);
    }

    const metaPathTemplate = PRISM_COMPONENTS[sectionFound].meta.path;
    const pathRel = metaPathTemplate.replace(/\{id\}/g, id);
    const jsPath = NODE_CURE_PATH.absolute(prismPath, pathRel + '.js');

    let cssPath = null;
    const cssFile = NODE_CURE_PATH.absolute(prismPath, pathRel + '.css');
    const fs = require('fs');
    if (NODE_FS.existsSync(cssFile)) {
      cssPath = cssFile;
    }

    return {
      id,
      type: sectionFound.slice(0, -1), // 'language' or 'plugin'
      jsPath,
      cssPath
    };
  });

  return resolved;
}

// ------------------------------------------
// Copy Handlers
// ------------------------------------------

function handleHighlightSyntax(source_dir, source_file, destination_dir, cacheNamespace = CACHE_NAMESPACE_HIGHLIGHT_SYNTAX, copyOptions = {}) {
  return async function highlightSyntaxTask() {
    const LOG_TAG_HIGHLIGHT_SYNTAX_TASK = ' [📋 Task]';

    log.begin(LOG_TAG_HIGHLIGHT_SYNTAX_TASK, 'Running...', {source_dir, source_file, destination_dir});

    await handleFileCopy(
      LOG_TAG_HIGHLIGHT_SYNTAX_TASK,
      cacheNamespace,
      source_dir,
      source_file,
      destination_dir,
      cacheRoot,
      true,
      {
        flatten: true,
        ...copyOptions
      }
    );

    log.end(LOG_TAG_HIGHLIGHT_SYNTAX_TASK, 'Complete.');

    // done();
  };
}

function getHighlightSyntaxOverlayFiles(relativePattern) {
  if (!libraryPathExists(PATH_DIR_ROOT_SOURCE_PROJECT_PRISM)) {
    return [];
  }

  const NODE_GLOB = require('glob');
  const pattern = NODE_CURE_PATH.absolute(PATH_DIR_ROOT_SOURCE_PROJECT_PRISM, relativePattern).replace(/\\/g, '/');
  return NODE_GLOB.sync(pattern, { nodir: true, windowsPathsNoEscape: true });
}

function getHighlightSyntaxOverlayRelativePaths() {
  return new Set(
    getHighlightSyntaxOverlayFiles('**/*')
      .map(file => NODE_CURE_PATH.relative(PATH_DIR_ROOT_SOURCE_PROJECT_PRISM, file).replace(/\\/g, '/'))
  );
}

function getHighlightSyntaxComparableRelativePath(filePath, rootPath) {
  const normalized = String(filePath || '').replace(/\\/g, '/');
  const rootNormalized = String(rootPath || '').replace(/\\/g, '/');

  if (!normalized) {
    return '';
  }

  return normalized.startsWith(rootNormalized)
    ? NODE_CURE_PATH.relative(rootPath, filePath).replace(/\\/g, '/')
    : normalized;
}

// ------------------------------------------
// Path Task
// ------------------------------------------

function getHighlightSyntaxOutputBaseDirs(config) {
  return {
    css: NODE_CURE_PATH.join(`${PATH_DIR_PROJECT_IN_ASSET}${config.path.css}`, 'prism'),
    js: NODE_CURE_PATH.join(`${PATH_DIR_PROJECT_IN_ASSET}${config.path.js}`, 'prism')
  };
}

function getHighlightSyntaxLiveBasePath(config) {
  const rawLivePath = String(config?.live?.path || 'module/prism-live').trim().replace(/\\/g, '/');
  const livePath = rawLivePath || 'module/prism-live';
  return livePath
    .replace(/^(asset\/)?css\//i, '')
    .replace(/^(asset\/)?js\//i, '')
    .replace(/^asset\//i, '');
}

function getHighlightSyntaxLiveOutputDirs(config) {
  const basePath = getHighlightSyntaxLiveBasePath(config);
  return {
    css: NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_ASSET_STYLESHEET, basePath),
    js: NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_ASSET_JAVASCRIPT, basePath)
  };
}

function getHighlightSyntaxLiveLegacyOutputDirs(config) {
  const basePath = getHighlightSyntaxLiveBasePath(config);
  return {
    in: NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_ASSET, basePath),
    out: NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT_ASSET, basePath)
  };
}

// ------------------------------------------
// Index File Generation
// ------------------------------------------

function handleGenerateHighlightSyntaxIndex(config, syntaxIncludeFilesJS, syntaxIncludeFilesCSS) {
  if (!config.generateImports) {
    log.notice(LOG_TAG_HIGHLIGHT_SYNTAX, 'Index file generation disabled.');
    return function (done) { done(); };
  }

  return function (done) {
    log.begin(LOG_TAG_HIGHLIGHT_SYNTAX, 'Generating index files...');

    const { css: PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS, js: PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS } = getHighlightSyntaxOutputBaseDirs(config);

    const PATH_FILE_HIGHLIGHT_SYNTAX_INDEX_JS   = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS,  'prism.js');
    const PATH_FILE_HIGHLIGHT_SYNTAX_INDEX_SCSS = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS, 'prism.scss');

    // JS Imports
    const jsImportFiles = new Set(syntaxIncludeFilesJS);

    // Overlayed plugins still need runtime imports even when their source copy skips the vendored file.
    libraryVariableEnsureIsArray(config.plugin && config.plugin.include).forEach(pluginId => {
      jsImportFiles.add(`_plugin/prism-${pluginId}.js`);
    });

    // Diff Highlight needs the base diff grammar available even when the full language set is autoloaded.
    if (libraryVariableEnsureIsArray(config.plugin && config.plugin.include).includes('diff-highlight') &&
      libraryVariableEnsureIsArray(config.language && config.language.include).includes('diff')) {
      jsImportFiles.add(`${libraryVariableEnsureIsArray(config.plugin && config.plugin.include).includes('autoloader') ? 'language' : '_language'}/prism-diff.js`);
    }

    let jsImports = Array.from(jsImportFiles).map(file => {
      return `import './${file}';`;
    }).join('\n');

    // ➕ Add Autoloader Setup if needed
    if (config.language && config.language.enable && libraryVariableEnsureIsArray(config.plugin.include).includes('autoloader')) {
      jsImports += `

// Configure the Prism Autoloader
if (Prism.plugins.autoloader) {
  Prism.plugins.autoloader.languages_path = '/asset/${config.path.js}/prism/language/';
}
`;
    }

    NODE_CURE_FS.writeFileSync(PATH_FILE_HIGHLIGHT_SYNTAX_INDEX_JS, jsImports);

    log.success(LOG_TAG_HIGHLIGHT_SYNTAX, `Created: ${PATH_FILE_HIGHLIGHT_SYNTAX_INDEX_JS}`);

    const scssImports = syntaxIncludeFilesCSS.map(file => {
      // log.notice(LOG_TAG_HIGHLIGHT_SYNTAX, 'Path:', {file});
      return `@forward '${file}';`;
    }).join('\n');

    NODE_CURE_FS.writeFileSync(PATH_FILE_HIGHLIGHT_SYNTAX_INDEX_SCSS, scssImports);

    log.success(LOG_TAG_HIGHLIGHT_SYNTAX, `Created: ${PATH_FILE_HIGHLIGHT_SYNTAX_INDEX_SCSS}`);

    log.end(LOG_TAG_HIGHLIGHT_SYNTAX, 'Index files generation complete.');
    done();
  };
}

function getHighlightSyntaxThemeConfig(config) {
  const themeConfig = config && config.theme ? config.theme : {};
  const normalizeThemeArray = (value) => Array.from(new Set(
    libraryVariableEnsureIsArray(value)
      .map(theme => String(theme || '').trim())
      .filter(Boolean)
  ));

  const themeIncludeRaw = normalizeThemeArray(themeConfig.include);
  const themeBundleRaw = normalizeThemeArray(themeConfig.bundle);
  const themeDefaultRaw = String(themeConfig.default || '').trim();

  // Canonical fallback chain for compatibility:
  // include -> bundle -> default -> prism
  const fallbackSeed = themeIncludeRaw.length
    ? themeIncludeRaw
    : (themeBundleRaw.length
      ? themeBundleRaw
      : (themeDefaultRaw ? [themeDefaultRaw] : ['prism']));

  const themeIncludeNormalized = themeIncludeRaw.length
    ? themeIncludeRaw
    : fallbackSeed.slice();

  const themeBundleNormalized = themeBundleRaw.length
    ? themeBundleRaw
    : fallbackSeed.slice();

  const defaultTheme = themeDefaultRaw || fallbackSeed[0] || 'prism';

  return {
    include: themeIncludeNormalized,
    bundle: themeBundleNormalized,
    defaultTheme
  };
}

// ------------------------------------------
// Primary Task
// ------------------------------------------

function primaryHighlightSyntax(done) {
  log.begin(LOG_TAG_HIGHLIGHT_SYNTAX, 'Running...');
  const op = logProcessingStart(LOG_TAG_HIGHLIGHT_SYNTAX, 'highlight syntax build');

  const config = configProjectMerge.option.highlight.syntax;

  if (!config.enable) {
    log.notice(LOG_TAG_HIGHLIGHT_SYNTAX, 'Highlight syntax disabled, skipping.');
    logProcessingDone(LOG_TAG_HIGHLIGHT_SYNTAX, op, { skipped: true });
    done();
    return;
  }

  const { css: PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS, js: PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS } = getHighlightSyntaxOutputBaseDirs(config);
  let syntaxIncludeFilesJS = [];
  let syntaxIncludeFilesCSS = [];
  let syntaxTasks = [];
  const prismOverlayRelativePaths = getHighlightSyntaxOverlayRelativePaths();

  const PATH_DIR_SYNTAX_THEME = '_theme';
  const PATH_DIR_SYNTAX_THEME_PUBLIC = 'theme';
  const PATH_DIR_SYNTAX_PLUGIN = '_plugin';

  const PATH_DIR_SYNTAX_MAIN = '_main';
  const PATH_DIR_SYNTAX_LANGUAGE = libraryVariableEnsureIsArray(config.plugin.include).includes('autoloader') ? 'language' : '_language';

  const PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS_THEME = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS, PATH_DIR_SYNTAX_THEME);
  const PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS_THEME_PUBLIC = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS, PATH_DIR_SYNTAX_THEME_PUBLIC);

  const PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_MAIN = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS, PATH_DIR_SYNTAX_MAIN);
  const PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_PLUGIN = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS, PATH_DIR_SYNTAX_PLUGIN);
  const PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_LANGUAGE = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS, PATH_DIR_SYNTAX_LANGUAGE);

  // Always provide prism.js core
  if (!prismOverlayRelativePaths.has('prism.js')) {
    syntaxTasks.push(handleHighlightSyntax(
      PATH_DIR_ROOT_NODE_PRISM,
      PATH_FILE_ROOT_HIGHLIGHT_SYNTAX_CORE,
      PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_MAIN
    ));
  }
  syntaxIncludeFilesJS.push(`${PATH_DIR_SYNTAX_MAIN}/prism.js`);

  // Themes
  const themeConfig = getHighlightSyntaxThemeConfig(config);
  const themeIncludes = themeConfig.include;
  const themeBundles = themeConfig.bundle;

  if (!themeIncludes.length) {
    log.notice(LOG_TAG_HIGHLIGHT_SYNTAX, 'Themes not specified. Specify one unless you intend on using your own.');
  }

  themeBundles.forEach(theme => {
    syntaxIncludeFilesCSS.push(`${PATH_DIR_SYNTAX_THEME}/${theme}.css`);
  });

  const themeFiles = themeIncludes
    .map(theme => `${PATH_DIR_ROOT_NODE_PRISM_THEME}${theme}.css`)
    .filter(file => !prismOverlayRelativePaths.has(`themes/${getHighlightSyntaxComparableRelativePath(file, PATH_DIR_ROOT_NODE_PRISM_THEME)}`));
  if (themeFiles.length > 0) {
    syntaxTasks.push(handleHighlightSyntax(
      PATH_DIR_ROOT_NODE_PRISM_THEME,
      themeFiles,
      PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS_THEME
    ));

    syntaxTasks.push(handleHighlightSyntax(
      PATH_DIR_ROOT_NODE_PRISM_THEME,
      themeFiles,
      PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS_THEME_PUBLIC,
      `${CACHE_NAMESPACE_HIGHLIGHT_SYNTAX}_theme_public`
    ));

  }

  // Plugins + Languages
  const LOG_TAG_HIGHLIGHT_SYNTAX_DEPENDENCY = LOG_TAG_HIGHLIGHT_SYNTAX + ' [🧵 Dependency]';

  let dependencyList = [];

  if (config.plugin.enable) {
    const plugins = libraryVariableEnsureIsArray(config.plugin.include);
    dependencyList = dependencyList.concat(plugins);
  }

  if (config.language.enable) {
    const languages = libraryVariableEnsureIsArray(config.language.include);
    dependencyList = dependencyList.concat(languages);
  }

  log.debug(LOG_TAG_HIGHLIGHT_SYNTAX_DEPENDENCY, "Dependencies:", dependencyList);

  if (dependencyList.length > 0) {
    const resolvedDeps = handleHighlightSyntaxDependencyList(dependencyList, libraryVariableEnsureIsArray(config.plugin.include).includes('autoloader'));

    log.debug(LOG_TAG_HIGHLIGHT_SYNTAX_DEPENDENCY, "Dependencies Resolved:", resolvedDeps);

    const languageDeps = resolvedDeps.filter(dep => dep.type === 'language');
    const pluginDeps = resolvedDeps.filter(dep => dep.type === 'plugin');

    // JS - Language
    const languageJsIncludePaths = languageDeps
      .map(dep => dep.jsPath)
      .filter(Boolean);

    const languageJsPaths = languageJsIncludePaths
      .filter(jsPath => !prismOverlayRelativePaths.has(`components/${getHighlightSyntaxComparableRelativePath(jsPath, PATH_DIR_ROOT_NODE_PRISM_COMPONENT)}`));

    log.debug(LOG_TAG_HIGHLIGHT_SYNTAX_DEPENDENCY, "languageJsPaths:", languageJsPaths);

    if (languageJsPaths.length > 0) {
      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_NODE_PRISM_COMPONENT,
        languageJsPaths,
        PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_LANGUAGE
      ));

      if (config.language.enable && !libraryVariableEnsureIsArray(config.plugin.include).includes('autoloader')) {
        languageJsIncludePaths.forEach(jsPath => {
          const filename = NODE_PATH.basename(jsPath); // prism-xxx.js
          syntaxIncludeFilesJS.push(`${PATH_DIR_SYNTAX_LANGUAGE}/${filename}`);
        });
      }
    }

    // JS - Plugin
    const pluginJsIncludePaths = pluginDeps
      .map(dep => dep.jsPath)
      .filter(Boolean);

    const pluginJsPaths = pluginJsIncludePaths
      .filter(jsPath => !prismOverlayRelativePaths.has(`plugins/${getHighlightSyntaxComparableRelativePath(jsPath, PATH_DIR_ROOT_NODE_PRISM_PLUGIN)}`));

    log.debug(LOG_TAG_HIGHLIGHT_SYNTAX_DEPENDENCY, "pluginJsPaths:", pluginJsPaths);

    log.debug("handleHighlightSyntax PLUGIN", {
      PATH_DIR_ROOT_NODE_PRISM_PLUGIN,
      pluginJsPaths,
      PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_PLUGIN});

    if (pluginJsPaths.length > 0) {
      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_NODE_PRISM_PLUGIN,
        pluginJsPaths,
        PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_PLUGIN
      ));

      pluginJsIncludePaths.forEach(jsPath => {
        const filename = NODE_PATH.basename(jsPath); // prism-xxx.js
        // const filename = NODE_CURE_PATH.relative(PATH_DIR_ROOT_NODE_PRISM_PLUGIN, jsPath); // prism-xxx/prism-xxx.js
        syntaxIncludeFilesJS.push(`${PATH_DIR_SYNTAX_PLUGIN}/${filename}`);
      });
    }

    // CSS - Plugin
    const pluginCssPaths = pluginDeps
      .filter(dep => dep.cssPath)
      .map(dep => dep.cssPath)
      .filter(cssPath => !prismOverlayRelativePaths.has(`plugins/${getHighlightSyntaxComparableRelativePath(cssPath, PATH_DIR_ROOT_NODE_PRISM_PLUGIN)}`));

    log.debug(LOG_TAG_HIGHLIGHT_SYNTAX_DEPENDENCY, "pluginCssPaths:", pluginCssPaths);

    if (pluginCssPaths.length > 0) {
      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_NODE_PRISM_PLUGIN,
        pluginCssPaths,
        NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS, PATH_DIR_SYNTAX_PLUGIN)
      ));

      pluginCssPaths.forEach(cssPath => {
        const filename = NODE_PATH.basename(cssPath); // prism-xxx.css
        syntaxIncludeFilesCSS.push(`${PATH_DIR_SYNTAX_PLUGIN}/${filename}`);
      });
    }
  }

  // Repo-owned Prism overlay: copy source/project/module/prism over vendored output so local fixes survive rebuilds.
  if (libraryPathExists(PATH_DIR_ROOT_SOURCE_PROJECT_PRISM)) {
    const prismCoreOverlay = getHighlightSyntaxOverlayFiles('prism.js');
    if (prismCoreOverlay.length > 0) {
      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_SOURCE_PROJECT_PRISM,
        prismCoreOverlay,
        PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_MAIN,
        `${CACHE_NAMESPACE_HIGHLIGHT_SYNTAX}_overlay_core`
      ));
    }

    const prismLanguageOverlay = getHighlightSyntaxOverlayFiles('components/**/*.js');
    if (prismLanguageOverlay.length > 0) {
      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_SOURCE_PROJECT_PRISM,
        prismLanguageOverlay,
        PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_LANGUAGE,
        `${CACHE_NAMESPACE_HIGHLIGHT_SYNTAX}_overlay_language`
      ));
    }

    const prismPluginJsOverlay = getHighlightSyntaxOverlayFiles('plugins/**/*.js');
    if (prismPluginJsOverlay.length > 0) {
      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_SOURCE_PROJECT_PRISM,
        prismPluginJsOverlay,
        PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_JS_PLUGIN,
        `${CACHE_NAMESPACE_HIGHLIGHT_SYNTAX}_overlay_plugin_js`
      ));
    }

    const prismPluginCssOverlay = getHighlightSyntaxOverlayFiles('plugins/**/*.css');
    if (prismPluginCssOverlay.length > 0) {
      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_SOURCE_PROJECT_PRISM,
        prismPluginCssOverlay,
        NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS, PATH_DIR_SYNTAX_PLUGIN),
        `${CACHE_NAMESPACE_HIGHLIGHT_SYNTAX}_overlay_plugin_css`
      ));
    }

    const prismThemeOverlay = getHighlightSyntaxOverlayFiles('themes/*.css');
    if (prismThemeOverlay.length > 0) {
      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_SOURCE_PROJECT_PRISM,
        prismThemeOverlay,
        PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS_THEME,
        `${CACHE_NAMESPACE_HIGHLIGHT_SYNTAX}_overlay_theme`
      ));

      syntaxTasks.push(handleHighlightSyntax(
        PATH_DIR_ROOT_SOURCE_PROJECT_PRISM,
        prismThemeOverlay,
        PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_SYNTAX_CSS_THEME_PUBLIC,
        `${CACHE_NAMESPACE_HIGHLIGHT_SYNTAX}_overlay_theme_public`
      ));

    }
  }

  if (config.generateImports) {
    log.debug(LOG_TAG_HIGHLIGHT_SYNTAX, "Index file paths:", { syntaxIncludeFilesJS, syntaxIncludeFilesCSS });
    syntaxTasks.push(handleGenerateHighlightSyntaxIndex(config, syntaxIncludeFilesJS, syntaxIncludeFilesCSS));
  }

  // Prism Live (vendored assets)
  if (config.live && config.live.enable) {
    const PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_LIVE = getHighlightSyntaxLiveOutputDirs(config);

    if (!libraryPathExists(PATH_DIR_ROOT_SOURCE_PROJECT_PRISM_LIVE)) {
      const err = new Error(`Prism Live vendor directory missing: ${PATH_DIR_ROOT_SOURCE_PROJECT_PRISM_LIVE}`);
      log.error(LOG_TAG_HIGHLIGHT_SYNTAX, err);
      logProcessingFail(LOG_TAG_HIGHLIGHT_SYNTAX, op, err);
      done(err);
      return;
    }

    const liveLanguageInclude = libraryVariableEnsureIsArray(config.live.include)
      .map(v => String(v || '').trim().toLowerCase())
      .filter(Boolean);

    const liveCoreFiles = [
      'bliss.shy.min.js',
      'prism-live.min.js',
      'prism-live.min.css'
    ];

    const liveLanguageFiles = liveLanguageInclude.map(language => `prism-live-${language}.min.js`);
    const liveFiles = Array.from(new Set([...liveCoreFiles, ...liveLanguageFiles]));

    const liveSourceFiles = [];
    liveFiles.forEach(file => {
      const fileAbs = NODE_CURE_PATH.absolute(PATH_DIR_ROOT_SOURCE_PROJECT_PRISM_LIVE, file);
      if (libraryPathExists(fileAbs)) {
        liveSourceFiles.push(fileAbs);
      } else {
        log.notice(LOG_TAG_HIGHLIGHT_SYNTAX, `Prism Live include file not found, skipping: ${file}`);
      }
    });

    if (liveSourceFiles.length > 0) {
      const PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_LIVE_LEGACY = getHighlightSyntaxLiveLegacyOutputDirs(config);

      liveSourceFiles.forEach(filePath => {
        const isMinifiedAsset = /\.min\.(?:css|js)$/i.test(filePath);
        const outputDir = isMinifiedAsset
          ? PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_LIVE_LEGACY.in
          : (/\.css$/i.test(filePath)
            ? PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_LIVE.css
            : PATH_DIR_PROJECT_IN_ASSET_HIGHLIGHT_LIVE.js);
        const outputName = isMinifiedAsset
          ? NODE_PATH.basename(filePath)
          : NODE_PATH.basename(filePath).replace(/\.min(?=\.(?:css|js)$)/i, '');

        syntaxTasks.push(handleHighlightSyntax(
          PATH_DIR_ROOT_SOURCE_PROJECT_PRISM_LIVE,
          filePath,
          outputDir,
          CACHE_NAMESPACE_HIGHLIGHT_SYNTAX,
          { rename: outputName }
        ));
      });
    } else {
      log.notice(LOG_TAG_HIGHLIGHT_SYNTAX, 'Prism Live enabled, but no source files resolved to copy.');
    }
  }

  return NODE_GULP.series(...syntaxTasks)(function (err) {
    if (err) {
      logProcessingFail(LOG_TAG_HIGHLIGHT_SYNTAX, op, err);
      log.error(LOG_TAG_HIGHLIGHT_SYNTAX, 'Error:', err);
      done(err);
    } else {
      logProcessingDone(LOG_TAG_HIGHLIGHT_SYNTAX, op, { skipped: false });
      log.success(LOG_TAG_HIGHLIGHT_SYNTAX, 'Complete.');
      log.end(LOG_TAG_HIGHLIGHT_SYNTAX, 'Complete.');
      done();
    }
  });
}

function primaryHighlightSyntaxResetPaths() {
  const config = configProjectMerge.option.highlight.syntax;
  const { css, js } = getHighlightSyntaxOutputBaseDirs(config);
  const live = getHighlightSyntaxLiveOutputDirs(config);
  const liveLegacy = getHighlightSyntaxLiveLegacyOutputDirs(config);
  return Array.from(new Set([css, js, live.css, live.js, liveLegacy.in]));
}

// -----------------------------------------------------------------------------
// #### Main - Process - HTML
// -----------------------------------------------------------------------------

const LOG_TAG_HTML = '[📄 HTML]';

const CACHE_NAMESPACE_HTML = 'html';

const PATH_FILE_PROJECT_HANDLEBARS = `${PATH_DIR_PROJECT}handlebars.js`;
const PATH_DIR_PROJECT_IN_HTML_PARTIAL = `${PATH_DIR_PROJECT_IN}_html/`;

const PATH_DIR_PROJECT_IN_HTML  = PATH_DIR_PROJECT_IN;
const PATH_DIR_PROJECT_OUT_HTML = PATH_DIR_PROJECT_OUT;
const PATH_FILE_PROJECT_IN_HTML = [
  `${PATH_DIR_PROJECT_IN_HTML}${PATH_ALL}.html`,
  `${PATH_DIR_PROJECT_IN_HTML}${PATH_ALL}.md`,
  PATH_DIR_IN_IGNORE_PROJECT_ASSET,
  ...PATH_DIR_IN_IGNORE_PROJECT
];

const PATH_DIR_PROJECT_IN_HTML_INCLUDE  = `${PATH_DIR_PROJECT_IN}_html/`;
const PATH_FILE_PROJECT_IN_HTML_INCLUDE = [
  `${PATH_DIR_PROJECT_IN_HTML_INCLUDE}${PATH_ALL}.html`,
  `${PATH_DIR_PROJECT_IN_HTML_INCLUDE}${PATH_ALL}.hbs`,
  `${PATH_DIR_PROJECT_IN_HTML_INCLUDE}${PATH_ALL}.md`,
  `${PATH_DIR_PROJECT_IN_HTML_INCLUDE}${PATH_ALL}.json`
];
const MARKDOWN_FILE_INCLUDE_SENTINEL_ATAT = '__GFI_ATAT__';

const PATTERN_RESET_HTML = `${PATH_DIR_PROJECT_OUT_HTML}${PATH_ALL}.html`

function isGeneratedConfigIncludeOwnedByHandlebars(pathLike) {
  const path = NODE_CURE_PATH.slashForward(String(pathLike || ''));
  if (!path || !/\/_html\/config\/.+\.html$/i.test(path)) {
    return false;
  }

  const siblingHandlebarsPath = path.replace(/\.html$/i, '.hbs');
  return libraryPathExists(siblingHandlebarsPath);
}

function handleFilestreamMarkdownToHTML() {
  const NODE_THROUGH2 = require('through2');

  /**
   * Escape gulp-file-include token prefixes only inside markdown code contexts
   * so docs can show literal file-include directives without triggering parser errors.
   * Targets:
   *  - fenced code blocks (``` / ~~~)
   *  - inline code spans (`...`, ``...`` etc.)
   *
   * @param {string} markdown
   * @returns {string}
   */
  function escapeFileIncludeTokensInMarkdownCode(markdown) {
    const ESCAPED = MARKDOWN_FILE_INCLUDE_SENTINEL_ATAT;

    /**
     * Escape @@ inside inline code spans on a single line.
     * @param {string} line
     * @returns {string}
     */
    function escapeInlineCodeSpans(line) {
      if (!line || line.indexOf('`') === -1) return line;

      // Replace only @@ inside balanced inline code spans and leave all
      // non-@@ characters (including emoji and other unicode) untouched.
      return line.replace(/(`+)([\s\S]*?)\1/g, (m, ticks, inner) => {
        return `${ticks}${String(inner || '').replace(/@@/g, ESCAPED)}${ticks}`;
      });
    }

    const lines = String(markdown || '').split('\n');
    let inFence = false;
    let fenceChar = '';
    let fenceLen = 0;

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];

      if (!inFence) {
        const open = line.match(/^\s*(`{3,}|~{3,})/);
        if (open) {
          inFence = true;
          fenceChar = open[1][0];
          fenceLen = open[1].length;
          lines[idx] = line;
          continue;
        }

        lines[idx] = escapeInlineCodeSpans(line);
        continue;
      }

      const closeRx = new RegExp(`^\\s*${fenceChar}{${fenceLen},}\\s*$`);
      if (closeRx.test(line)) {
        inFence = false;
        fenceChar = '';
        fenceLen = 0;
        lines[idx] = line;
        continue;
      }

      lines[idx] = line.replace(/@@/g, ESCAPED);
    }

    return lines.join('\n');
  }

  return NODE_THROUGH2.obj(function(file, _, cb) {
    const FILE_RAW = decodeUtf8StrictFromBuffer(file.contents, file.path);
    const FILE_ESCAPED = escapeFileIncludeTokensInMarkdownCode(FILE_RAW);

    const PATH_DIR_PROJECT_IN_HTML_INCLUDE_MARKDOWN = configProjectMerge.option.markdown?.include_path
      ? NODE_CURE_PATH.absolute(PATH_DIR_PROJECT, configProjectMerge.option.markdown.include_path)
      : null;

    let headerHtml = '';
    let footerHtml = '';

    if (PATH_DIR_PROJECT_IN_HTML_INCLUDE_MARKDOWN) {
      const PATH_FILE_RELATIVE = NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, file.path)
        .replace(/\.md$/, ''); // strip .md

      const headerPathSpecific = NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_HTML_INCLUDE_MARKDOWN, `${PATH_FILE_RELATIVE}.header.html`);
      const footerPathSpecific = NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_HTML_INCLUDE_MARKDOWN, `${PATH_FILE_RELATIVE}.footer.html`);
      const headerPathDefault = NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_HTML_INCLUDE_MARKDOWN, `header.html`);
      const footerPathDefault = NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_HTML_INCLUDE_MARKDOWN, `footer.html`);

      if (NODE_FS.existsSync(headerPathSpecific)) {
        headerHtml = NODE_FS.readFileSync(headerPathSpecific, 'utf8');
      } else if (NODE_FS.existsSync(headerPathDefault)) {
        headerHtml = NODE_FS.readFileSync(headerPathDefault, 'utf8');
      }

      if (NODE_FS.existsSync(footerPathSpecific)) {
        footerHtml = NODE_FS.readFileSync(footerPathSpecific, 'utf8');
      } else if (NODE_FS.existsSync(footerPathDefault)) {
        footerHtml = NODE_FS.readFileSync(footerPathDefault, 'utf8');
      }
    }

    // const wrappedHtml = `${headerHtml}\n${html}\n${footerHtml}`;
    const wrappedHtml = `${headerHtml}\n${FILE_ESCAPED}\n${footerHtml}`;

    // log.warn("wrappedHtml:", wrappedHtml);

    file.contents = Buffer.from(wrappedHtml, 'utf8');
    file.extname = '.html';
    cb(null, file);
  });
}

/**
 * Restore markdown-only file-include token sentinels back to literal double-at markers
 * after gulp-file-include has completed parsing.
 */
function handle_filestream_markdown_restore_file_include_tokens() {
  const NODE_THROUGH2 = require('through2');
  return NODE_THROUGH2.obj(function(file, _, cb) {
    try {
      if (!file || !file.isBuffer()) return cb(null, file);
      let content = decodeUtf8StrictFromBuffer(file.contents, file.path);
      if (content.indexOf(MARKDOWN_FILE_INCLUDE_SENTINEL_ATAT) !== -1) {
        content = content.replace(new RegExp(MARKDOWN_FILE_INCLUDE_SENTINEL_ATAT, 'g'), '@@');
        file.contents = Buffer.from(content, 'utf8');
      }
      cb(null, file);
    } catch (err) {
      cb(err);
    }
  });
}

const handle_filestream_markdown_convert_blocks = () => {
  const NODE_THROUGH2 = require('through2');
  return NODE_THROUGH2.obj(function (file, _, cb) {
    let done = false;
    const safeDone = (err, f = file) => { if (!done) { done = true; cb(err, f); } };

    try {
      if (!file.isBuffer()) return safeDone(null, file);

      let content = decodeUtf8StrictFromBuffer(file.contents, file.path);

      // Fast bail: no markers, no work
      if (!/<!--\s*@md start\s*-->/.test(content)) {
        return safeDone(null, file);
      }

      // Lazy-load libs once per file (outside replace callback)
      const NODE_MARKDOWN_IT = require('markdown-it');
      const MARKDOWN = NODE_MARKDOWN_IT({ html: true });
      const NODE_CHEERIO = require('cheerio');

      content = content.replace(
        /<!--\s*@md start\s*-->([\s\S]*?)<!--\s*@md end\s*-->/gi,
        (match, mdContent) => {
          try {
            const html = MARKDOWN.render(String(mdContent || '').trim());
            const $ = (/** @type {any} */ (NODE_CHEERIO)).load(html, { decodeEntities: false });

            // Strip "Table of Contents" sections
            $('h1,h2,h3,h4,h5,h6').each(function () {
              const $h = $(this);
              if ($h.text().toLowerCase().includes('table of contents')) {
                const level = Number(this.name.slice(1));
                let next = $h.next();
                while (next.length && !(next[0].name === `h${level}`)) {
                  const tmp = next.next();
                  next.remove();
                  next = tmp;
                }
                $h.remove();
                return false; // exit after first match
              }
            });

            // Rewrite .md links -> ".html" (when clean is false) or remove extension (when clean is true)
            const urlOpt = configProjectMerge?.option?.url || {};
            const cleanUrls = (typeof urlOpt.clean === 'boolean')
              ? urlOpt.clean
              : true;

            $('a[href$=".md"]').each(function () {
              const $a = $(this);
              const href = $a.attr('href');
              if (href) {
                $a.attr('href', href.replace(/\.md$/, cleanUrls ? '' : '.html'));
              }
            });

            // Use full root html to preserve nested nodes as text
            const out = $.root().html();
            return (out == null) ? '' : out;
          } catch (e) {
            // If a single block blows up, leave the original block intact
            log.warn('[🧾 Markdown Blocks]', 'Block conversion failed; leaving block as-is.', { error: e?.message });
            return match;
          }
        }
      );

      file.contents = Buffer.from(content, 'utf8');
      return safeDone(null, file);
    } catch (err) {
      return safeDone(err);
    }
  });
};

async function handleHTML(done) {
  log.begin(LOG_TAG_HTML, 'Running...');
  let pruneResult = null;

  try {
    pruneResult = libraryPruneFromInput({
      cacheNamespace: CACHE_NAMESPACE_HTML,
      logTag: LOG_TAG_HTML
    });

  } catch (err) {
    log.error(LOG_TAG_HTML, 'During prune:', err);
    log.end(LOG_TAG_HTML, 'Complete.');
    return done(err);
  }

  const NODE_GULP_HTMLMIN           = require('gulp-htmlmin');
  const NODE_CUSTOM_GULP_HTML_TOC   = require('@custom/custom-gulp-html-toc');
  const NODE_GULP_COMPILE_HANDLEBARS = require('gulp-compile-handlebars');
  // CURE_FILE_INCLUDE_SWITCH: Toggle between stock and Cure fork by commenting/uncommenting the next two lines.
  // const NODE_GULP_FILE_INCLUDE      = require('gulp-file-include'); // STOCK
  const NODE_GULP_FILE_INCLUDE      = require('@custom/cure-gulp-file-include'); // CURE FORK
  const { titleCase }               = require('@custom/compiler-string');

  let handlebarsHelpersMain = {};
  const hasProjectHandlebarsMain = libraryPathExists(PATH_FILE_PROJECT_HANDLEBARS);

  if (hasProjectHandlebarsMain) {
    try {
      const NODE_HANDLEBARS = require('handlebars');
      delete require.cache[require.resolve(PATH_FILE_PROJECT_HANDLEBARS)];
      handlebarsHelpersMain = require(PATH_FILE_PROJECT_HANDLEBARS)(NODE_HANDLEBARS);
      log.info(LOG_TAG_HTML, 'Loaded Handlebars helpers for main HTML pipeline.', {
        file: PATH_FILE_PROJECT_HANDLEBARS
      });
    } catch (err) {
      log.notice(LOG_TAG_HTML, 'Proceeding without Handlebars helpers in main HTML pipeline. Failed to load project handlebars.js.', {
        file: PATH_FILE_PROJECT_HANDLEBARS,
        logfile: log.getFileLog()
      });
      log.debug(LOG_TAG_HTML, 'Main HTML Handlebars helper load error:', err);
    }
  }

  const handlebarsBatchMain = NODE_FS.existsSync(PATH_DIR_PROJECT_IN_HTML_INCLUDE)
    ? [PATH_DIR_PROJECT_IN_HTML_INCLUDE]
    : [];

  const HANDLEBARS_OPTIONS_MAIN = {
    batch: handlebarsBatchMain,
    helpers: handlebarsHelpersMain,
  };

  async function materializeConfigHandlebarsIncludes() {
    const configRoot = NODE_CURE_PATH.join(PATH_DIR_PROJECT_IN_HTML_INCLUDE, 'config');
    const legacyTemplateRoot = NODE_CURE_PATH.join(configRoot, 'template');

    if (!NODE_FS.existsSync(configRoot)) {
      return { compiled: 0 };
    }

    const hbsFiles = (await _collectFilesByExtensionRecursive(configRoot, ['.hbs']))
      .filter((abs) => {
        const normalized = NODE_CURE_PATH.slashForward(abs);
        return !normalized.startsWith(NODE_CURE_PATH.slashForward(legacyTemplateRoot) + '/');
      })
      .sort((a, b) => a.localeCompare(b));

    if (hbsFiles.length <= 0) {
      return { compiled: 0 };
    }

    const NODE_GULP_RENAME = require('gulp-rename');

    for (const srcPath of hbsFiles) {
      await new Promise((resolve, reject) => {
        NODE_GULP.src(srcPath, { base: configRoot })
          .pipe(NODE_GULP_COMPILE_HANDLEBARS(configProjectMerge, HANDLEBARS_OPTIONS_MAIN))
          .pipe(NODE_GULP_RENAME({ extname: '.html' }))
          .pipe(NODE_GULP.dest(configRoot))
          .on('end', resolve)
          .on('error', reject);
      });
    }

    return { compiled: hbsFiles.length };
  }

  // ===============================================================================================
  // Helpers - Begin
  // ===============================================================================================

  const HANDLEBARS_PRAGMA_REGEX = /<!--\s*x-hbs\s*-->/i;
  const HANDLEBARS_DISABLE_PRAGMA_REGEX = /<!--\s*x-hbs-off\s*-->/i;
  const INCLUDE_REF_REGEX = /@@(?:include|include_once|loop)\(\s*['"]([^'"]+)['"]/g;
  const hbsIncludeDetectionCache = new Map();
  const hbsDecisionBySourcePath = new Map();

  function fileHasHandlebarsPragma(file) {
    try {
      if (!file || !file.contents) return false;
      const text = Buffer.isBuffer(file.contents) ? file.contents.toString('utf8') : String(file.contents);
      return HANDLEBARS_PRAGMA_REGEX.test(text);
    } catch (err) {
      log.debug(LOG_TAG_HTML, 'Failed to inspect Handlebars pragma; skipping Handlebars pass for file.', {
        file: String(file?.relative || file?.path || ''),
        error: String(err?.message || err)
      });
      return false;
    }
  }

  function sourceTextHasHandlebarsPragma(text) {
    try {
      return HANDLEBARS_PRAGMA_REGEX.test(String(text || ''));
    } catch {
      return false;
    }
  }

  function sourceTextDisablesHandlebars(text) {
    try {
      return HANDLEBARS_DISABLE_PRAGMA_REGEX.test(String(text || ''));
    } catch {
      return false;
    }
  }

  function normalizeProjectIncludePathToAbs(includeRef, fromSourceAbs) {
    const ref = String(includeRef || '').trim();
    if (!ref) return null;

    // Current compiler uses project-root include basepath in main HTML pipeline.
    // Support both project-root refs (`_html/...`) and local-ish refs as fallback.
    let abs;
    if (/^[A-Za-z]:[\\/]/.test(ref) || ref.startsWith('/')) {
      abs = ref;
    } else {
      abs = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN, ref);
      if (!libraryPathExists(abs) && fromSourceAbs) {
        abs = NODE_CURE_PATH.absolute(NODE_PATH.dirname(fromSourceAbs), ref);
      }
    }

    return abs;
  }

  function sourceNeedsHandlebarsByIncludeTree(sourceAbs, sourceText, seen = new Set()) {
    try {
      const key = NODE_CURE_PATH.slashForward(String(sourceAbs || ''));
      if (key && hbsIncludeDetectionCache.has(key)) {
        return hbsIncludeDetectionCache.get(key);
      }

      if (!sourceAbs || seen.has(sourceAbs)) return false;
      seen.add(sourceAbs);

      const text = String(sourceText || '');
      let match;
      INCLUDE_REF_REGEX.lastIndex = 0;

      while ((match = INCLUDE_REF_REGEX.exec(text))) { // eslint-disable-line no-cond-assign
        const includeRef = String(match[1] || '');
        if (/\.hbs$/i.test(includeRef)) {
          if (key) hbsIncludeDetectionCache.set(key, true);
          return true;
        }

        // Recurse only into include-like text files likely to contain more @@include refs.
        if (!/\.(html|md)$/i.test(includeRef)) continue;

        const includeAbs = normalizeProjectIncludePathToAbs(includeRef, sourceAbs);
        if (!includeAbs || !libraryPathExists(includeAbs)) continue;

        let includeText = '';
        try {
          includeText = NODE_FS.readFileSync(includeAbs, 'utf8');
        } catch {
          continue;
        }

        if (sourceNeedsHandlebarsByIncludeTree(includeAbs, includeText, seen)) {
          if (key) hbsIncludeDetectionCache.set(key, true);
          return true;
        }
      }

      if (key) hbsIncludeDetectionCache.set(key, false);
      return false;
    } catch (err) {
      log.debug(LOG_TAG_HTML, 'Handlebars include-tree auto-detection failed; defaulting to disabled unless pragma is present.', {
        file: String(sourceAbs || ''),
        error: String(err?.message || err)
      });
      return false;
    }
  }

  function fileShouldCompileHandlebars(file) {
    try {
      if (!file) return false;
      const history0 = file.history && file.history.length ? String(file.history[0]) : '';
      const sourceKey = NODE_CURE_PATH.slashForward(history0 || String(file.path || ''));
      const decisionFromMap = sourceKey ? hbsDecisionBySourcePath.get(sourceKey) : null;

      const manualOn = (decisionFromMap && typeof decisionFromMap.manualOn === 'boolean')
        ? decisionFromMap.manualOn
        : !!(file.data && file.data.__hbsForceOn);
      const manualOff = (decisionFromMap && typeof decisionFromMap.manualOff === 'boolean')
        ? decisionFromMap.manualOff
        : !!(file.data && file.data.__hbsForceOff);
      const autoDetected = (decisionFromMap && typeof decisionFromMap.autoDetected === 'boolean')
        ? decisionFromMap.autoDetected
        : !!(file.data && file.data.__hbsAuto);
      if (manualOff) return false;
      if (manualOn) return true;
      return autoDetected;
    } catch {
      return false;
    }
  }

  function stripHandlebarsPragmaFromFile(file) {
    if (!file || !file.contents) return;
    const text = Buffer.isBuffer(file.contents) ? file.contents.toString('utf8') : String(file.contents);
    const next = text
      .replace(HANDLEBARS_PRAGMA_REGEX, '')
      .replace(HANDLEBARS_DISABLE_PRAGMA_REGEX, '')
      .replace(/^\s*\r?\n/, '');
    if (next === text) return;
    file.contents = Buffer.from(next, 'utf8');
  }

  function adaptTitleNameOptions(rawTitleRoot = {}) {
    const titleName = rawTitleRoot.name ? rawTitleRoot.name : rawTitleRoot;
    const word   = titleName.word || {};
    const casing = titleName.case || {};
    const sep    = titleName.separator || {};

    return {
      acronyms:        word.acronyms        || titleName.acronyms        || [],
      lowercaseWords:  word.lowercases      || titleName.lowercaseWords   || [],
      propercaseWords: word.propercases     || titleName.propercaseWords  || [],

      splitCamelCase:  ('enforceCamel' in (casing || {}))
                        ? !!casing.enforceCamel
                        : (titleName.splitCamelCase ?? false),
      preserveCasing:  ('preserve' in (casing || {}))
                        ? !!casing.preserve
                        : (titleName.preserveExistingCasing ?? titleName.preserveCasing ?? false),

      separatorsToSpace: sep.separatorsToSpace ?? titleName.separatorsToSpace ?? ['_', '-'],
      delimiter:         sep.wordSplitPattern  ?? titleName.wordSplitPattern  ?? titleName.splitPattern ?? '[\\s_\\-]+',
      joinSeparator:     sep.wordJoinSeparator ?? titleName.wordJoinSeparator ?? titleName.joinWith    ?? titleName.joinSeparator ?? ' ',

      stripPatterns:     sep.stripPatterns ?? titleName.stripLeadingPatterns ?? titleName.stripPatterns ?? []
    };
  }

  function adaptTitleComposeOptions(rawTitleRoot = {}) {
    const compose = rawTitleRoot.compose || {};
    let dirDepth = compose.dirDepth;
    if (dirDepth == null || Number(dirDepth) < 0) dirDepth = null; // null = "all"
    return {
      dirDepth,
      dirOrder:    compose.dirOrder    || 'leafToRoot', // 'leafToRoot' | 'rootToLeaf'
      dirJoiner:   compose.dirJoiner   || ' - ',
      titleJoiner: compose.titleJoiner || ' - '
    };
  }

  function stripLeadingPatterns(text, patterns = []) {
    let out = text;
    for (const p of patterns) {
      const rx = (p instanceof RegExp) ? p : new RegExp(p);
      out = out.replace(rx, '');
    }
    return out;
  }

  function cleanSegmentToTitle(seg, titleNameOptsRaw) {
    const opts = adaptTitleNameOptions(titleNameOptsRaw);
    let s = seg.replace(/\.[^.]+$/, '');

    if (Array.isArray(opts.stripPatterns) && opts.stripPatterns.length) {
      s = stripLeadingPatterns(s, opts.stripPatterns);
    }

    if (Array.isArray(opts.separatorsToSpace) && opts.separatorsToSpace.length) {
      const chars = opts.separatorsToSpace.map(c => c.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')).join('');
      if (chars) s = s.replace(new RegExp('[' + chars + ']+', 'g'), opts.joinSeparator || ' ');
    }

    return titleCase(s, opts);
  }

  function getHeaderTitle(rawHtml, titleNameOptsRaw) {
    // Get first <h1>...</h1>, strip tags, normalize spaces, optional titleCase
    const m = rawHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (!m) return null;
    let text = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!text) return null;

    const opts = adaptTitleNameOptions(titleNameOptsRaw);
    if (opts.preserveCasing) return text;
    return titleCase(text, opts);
  }

  // function takeRight(arr, n) {
  //   if (typeof n !== 'number' || n <= 0) return [];
  //   if (n >= arr.length) return arr.slice();
  //   return arr.slice(arr.length - n);
  // }

  function extractAndRemoveOverrideComment(raw) {
    const m = raw.match(/^<!--([\s\S]*?)-->/);
    if (!m) return { override: {}, cleaned: raw };
    const comment = m[1].trim();
    if (!/^x-compiler\b/.test(comment)) return { override: {}, cleaned: raw };

    let override = {};
    const jsonMatch = comment.match(/^x-compiler\s*:\s*([\s\S]+)$/);
    if (jsonMatch) {
      try { override = JSON.parse(jsonMatch[1]); } catch {}
    } else {
      const block = comment.replace(/^x-compiler\s*\n?/, '');
      const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      for (const line of lines) {
        const kv = line.match(/^([a-zA-Z0-9_.-]+)\s*:\s*([\s\S]+)$/);
        if (kv) {
          const k = kv[1].trim();
          let v = kv[2].trim();
          if (/^\d+$/.test(v)) v = Number(v);
          override[k] = v;
        }
      }
    }
    const cleaned = raw.replace(/^<!--[\s\S]*?-->\s*/, '');
    return { override, cleaned };
  }

  // function computeTitles(file, cfg) {
  //   const titleRoot = cfg.option.title || {};
  //   const titleNameOpts = titleRoot.name ? titleRoot.name : titleRoot;

  //   const relative = NODE_CURE_PATH.slashForward(file.relative);
  //   const parts = NODE_CURE_PATH.split(relative);
  //   const filename = parts.pop();

  //   const dirTitles = parts.map(p => cleanSegmentToTitle(p, titleNameOpts));
  //   const baseNameTitle = cleanSegmentToTitle(filename, titleNameOpts);

  //   return { baseNameTitle, dirTitles };
  // }

  // Build breadcrumb HTML from precomputed labels
  function renderBreadcrumbHTML(file, opts) {
    log.debug(LOG_TAG_HTML, 'Breadcrumb Processing...');

    const root_content   = opts.root_content || 'Home';
    // const basePath   = PATH_DIR_PROJECT_IN; // we used gulp.src({base}), so file.relative is already trimmed
    const pathPrefix = opts.pathPrefix || '';
    const pathSuffix = opts.pathSuffix || '';
    const container  = opts.containerElem;
    const containerProps = opts.containerElemProps || '';
    const linkProps  = opts.linkProps ? ' ' + opts.linkProps : '';

    const rel = NODE_CURE_PATH.slashForward(file.relative); // e.g. docs/guide/index.html
    const parts = rel.split('/');
    const dirs  = parts.slice(0, -1); // root->leaf dirs

    // Use precomputed labels/depth from file.__breadcrumb
    const pre = file.__breadcrumb || {};
    const dirLabels = Array.isArray(pre.dirLabels) ? pre.dirLabels : [];
    const pageLabel = pre.pageLabel || null;

    // Compute which dir parts to display (we already depth-limited labels; match lengths)
    const displayDirs = dirs.slice(-dirLabels.length);

    // Special-case index pages:
    // - root index: breadcrumb should just be "Home" (active), no extra trailing crumb
    // - directory index: the directory is the current page, not "Index"
    const relLower = String(rel || '').toLowerCase();
    const isRootIndex = (relLower === 'index.html');
    const isDirIndex  = (!isRootIndex && relLower.endsWith('/index.html'));

    // For directory index pages, make the leaf directory the active crumb and remove it from link list.
    let displayDirsForLinks = displayDirs;
    let activeLabel = pageLabel;

    if (isDirIndex) {
      const leafDirPart  = displayDirs[displayDirs.length - 1] || null;
      const leafDirLabel = dirLabels[dirLabels.length - 1] || leafDirPart || null;

      activeLabel = leafDirLabel || activeLabel;
      displayDirsForLinks = displayDirs.slice(0, -1);
    }

    let html = '';
    if (container) {
      html += `<${container}${containerProps ? ' ' + containerProps : ''}>`;
    }

    html += `<nav aria-label="breadcrumb"><ol class="breadcrumb">`;

    if (isRootIndex) {
      html += `<li class="breadcrumb-item active"><span>${root_content}</span></li>`;
    } else {
      html += `<li class="breadcrumb-item"><a${linkProps} href="/" title="Home">${root_content}</a></li>`;

      // Grow the URL using actual dir parts, label from precomputed list
      let breadcrumbPath = pathPrefix || '';
      for (let i = 0; i < displayDirsForLinks.length; i++) {
        const part = displayDirsForLinks[i];
        const label = dirLabels[i] || part;
        breadcrumbPath += `/${part}`;
        html += `<li class="breadcrumb-item"><a${linkProps} href="${breadcrumbPath}${pathSuffix}" title="${label}">${label}</a></li>`;
      }

      html += `<li class="breadcrumb-item active"><span>${activeLabel || ''}</span></li>`;
    }

    html += `</ol></nav>`;

    if (container) html += `</${container}>`;

    log.debug(LOG_TAG_HTML, 'Breadcrumb Processed.');

    return html;
  }

  function getNavIgnorePatterns(section = {}) {
    const navCfg = configProjectMerge.option.navigation || {};
    return libraryVariableEnsureIsArray(
      section.ignore_patterns ||
      navCfg.shared?.ignore_patterns ||
      []
    );
  }

  // ===============================================================================================
  // Helpers - End
  // ===============================================================================================

  // ===============================================================================================
  // Process - Begin
  // ===============================================================================================

  const counters = { filtered: 0, processed: 0 };
  /**
   * HTML tag manifest used by sitemap/package.
   * Tags supported:
   *  - <!--tag no-sitemap-->  => exclude from sitemap
   *  - <!--tag no-package-->  => exclude from package
   *
   * IMPORTANT:
   *  - Must preserve entries for cached / not-ran files (HTML cache means many files won't be reprocessed).
   *  - Must remove entries for files that no longer exist.
   */
  function ensureHtmlTagManifestDirSync() {
    const dir = NODE_PATH.dirname(PATH_FILE_PROJECT_HTML_TAG_MANIFEST);
    if (!NODE_FS.existsSync(dir)) {
      NODE_FS.mkdirSync(dir, { recursive: true });
    }
  }

  function readHtmlTagManifestSyncSafe() {
    try {
      if (!NODE_FS.existsSync(PATH_FILE_PROJECT_HTML_TAG_MANIFEST)) return null;
      return JSON.parse(NODE_FS.readFileSync(PATH_FILE_PROJECT_HTML_TAG_MANIFEST, 'utf8'));
    } catch (e) {
      log.warn(LOG_TAG_HTML, 'Failed to read HTML tag manifest (will recreate):', {
        path: PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
        error: String(e && e.message ? e.message : e)
      });
      return null;
    }
  }

  const htmlTagManifestPrev = readHtmlTagManifestSyncSafe();

  /** @type {{files:Record<string, {tags:Record<string, boolean>}>}} */
  const htmlTagManifest = {
    files: (htmlTagManifestPrev && htmlTagManifestPrev.files) ? htmlTagManifestPrev.files : {}
  };

  try {
    const configIncludeMaterializeResult = await materializeConfigHandlebarsIncludes();
    if (configIncludeMaterializeResult.compiled > 0) {
      log.info(LOG_TAG_HTML, 'Materialized Handlebars config includes to sibling HTML files.', configIncludeMaterializeResult);
    }
  } catch (err) {
    log.error(LOG_TAG_HTML, 'Failed while materializing Handlebars config includes.', err);
    throw err;
  }

  /**
   * Record <!--tag ...--> occurrences for this file into the manifest.
   * @param {import('vinyl')} file
   * @param {string} raw
   * @returns {void}
   */
  function recordHtmlTags(file, raw) {
    const rel = NODE_CURE_PATH.slashForward(String(file.relative || ''));

    // Always reset tags on each (re)process so removed tags don't "stick".
    htmlTagManifest.files[rel] = htmlTagManifest.files[rel] || { tags: {} };
    htmlTagManifest.files[rel].tags = {};

    const rx = /<!--\s*tag\s+([a-z0-9_-]+)\s*-->/gi;
    let m;
    while ((m = rx.exec(raw)) !== null) {
      const tag = String(m[1] || '').trim().toLowerCase();
      if (!tag) continue;
      htmlTagManifest.files[rel].tags[tag] = true;
    }
  }

  const FILE_PATHS_ALL = await libraryFileGetFilesFromPattern(PATH_FILE_PROJECT_IN_HTML);

  let forceProcessAllHtml = false;
  try {
    const htmlDependencyCounters = { filtered: 0, processed: 0 };
    const htmlDependencyPaths = [];

    const htmlIncludeDependencyPaths = await libraryFileGetFilesFromPattern(PATH_FILE_PROJECT_IN_HTML_INCLUDE);
    if (Array.isArray(htmlIncludeDependencyPaths) && htmlIncludeDependencyPaths.length) {
      htmlDependencyPaths.push(...htmlIncludeDependencyPaths);
    }

    if (libraryPathExists(PATH_FILE_PROJECT_HANDLEBARS)) {
      htmlDependencyPaths.push(PATH_FILE_PROJECT_HANDLEBARS);
    }

    for (const depPath of htmlDependencyPaths) {
      if (cacheProjectFile.shouldProcessSync(CACHE_NAMESPACE_HTML, depPath, htmlDependencyCounters)) {
        forceProcessAllHtml = true;
        break;
      }
    }

    if (forceProcessAllHtml) {
      log.info(LOG_TAG_HTML, 'Detected global HTML dependency change; forcing full HTML processing.', {
        dependencies_checked: htmlDependencyPaths.length
      });
    }
  } catch (err) {
    log.warn(LOG_TAG_HTML, 'Failed to evaluate HTML global dependency changes; continuing with normal filtering.', {
      error: String(err?.message || err)
    });
  }

  log.debug(LOG_TAG_HTML, 'Processing:', {
    "File Count": FILE_PATHS_ALL.length,
    "File Paths": FILE_PATHS_ALL
  });

  log.info(LOG_TAG_HTML, 'Filtering files by cache...', {
    "File Count": FILE_PATHS_ALL.length
  });

  const FILE_PATHS_IN = [];
  for (const FILE_PATH_IN of FILE_PATHS_ALL) {
    if (!forceProcessAllHtml && !cacheProjectFile.shouldProcessSync(CACHE_NAMESPACE_HTML, FILE_PATH_IN, counters)) {
      continue;
    }
    if (forceProcessAllHtml) {
      counters.processed += 1;
    }
    FILE_PATHS_IN.push(FILE_PATH_IN);
  }

  log.info(LOG_TAG_HTML, 'Processing queue:', {
    "File Count": FILE_PATHS_IN.length,
    "File Paths": FILE_PATHS_IN
  });

  let fileCurrent = 0;

  for (const FILE_PATH_IN of FILE_PATHS_IN) {
    fileCurrent += 1;

    let FILE_TEXT_IN_ORIGINAL = '';
    try {
      FILE_TEXT_IN_ORIGINAL = NODE_FS.readFileSync(FILE_PATH_IN, 'utf8');
    } catch (err) {
      // Best effort: keep build moving; post-include output still updates dependencies.
      log.debug(LOG_TAG_HTML, 'Unable to read source file for dependency capture.', {
        file: FILE_PATH_IN,
        error: String(err?.message || err)
      });
    }

    // const FILE_NAME = NODE_PATH.basename(FILE_PATH_IN);
    const FILE_PATH_IN_RELATIVE = NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN);
    const fileManualHbsOn = sourceTextHasHandlebarsPragma(FILE_TEXT_IN_ORIGINAL);
    const fileManualHbsOff = sourceTextDisablesHandlebars(FILE_TEXT_IN_ORIGINAL);
    const fileAutoHbs = !fileManualHbsOff && sourceNeedsHandlebarsByIncludeTree(FILE_PATH_IN, FILE_TEXT_IN_ORIGINAL);
    hbsDecisionBySourcePath.set(NODE_CURE_PATH.slashForward(String(FILE_PATH_IN)), {
      manualOn: fileManualHbsOn,
      manualOff: fileManualHbsOff,
      autoDetected: fileAutoHbs
    });

    log.info(LOG_TAG_HTML, 'Processing file:', {
      "File Current": fileCurrent,
      "File Total": FILE_PATHS_IN.length,
      "File Path": FILE_PATH_IN_RELATIVE
    });

    await new Promise((resolve, reject) => {
      // let pipeline = NODE_GULP.src(PATH_FILE_PROJECT_IN_HTML)
      let pipeline = NODE_GULP.src(FILE_PATH_IN, { base: PATH_DIR_PROJECT_IN })
        .pipe(NODE_GULP_TAP(file => {
          file.data = file.data || {};
          file.data.__hbsForceOn = fileManualHbsOn;
          file.data.__hbsForceOff = fileManualHbsOff;
          file.data.__hbsAuto = fileAutoHbs;

          log.detail(LOG_TAG_HTML, 'File Details:', {
            relative: file.relative,
            base: file.base,
            path: file.path,
            cwd: file.cwd,
            history: file.history,
            hbs: {
              manual_on: fileManualHbsOn,
              manual_off: fileManualHbsOff,
              auto: fileAutoHbs
            }
          });
        }))

        // .pipe(libraryPlumber())

        // .pipe(libraryCacheFilter(CACHE_NAMESPACE_HTML))

        .pipe(NODE_GULP_IF(file => file.extname === '.md', handleFilestreamMarkdownToHTML()))

        .pipe(NODE_GULP_FILE_INCLUDE({
          prefix: '@@',
          basepath: PATH_DIR_PROJECT_IN // '@file', '@root'
        }))

        // Restore markdown code-token sentinels after include parsing, so
        // rendered docs show literal @@ tokens instead of placeholders.
        .pipe(handle_filestream_markdown_restore_file_include_tokens())

        // Optional Handlebars pass for normal HTML compilation.
        // Opt-in per file via `<!-- x-hbs -->` to avoid breaking pages that
        // contain literal `{{ ... }}` examples/snippets.
        .pipe(NODE_GULP_IF(fileShouldCompileHandlebars, NODE_GULP_COMPILE_HANDLEBARS(configProjectMerge, HANDLEBARS_OPTIONS_MAIN)))
        .pipe(NODE_GULP_TAP((file) => {
          stripHandlebarsPragmaFromFile(file);
        }))

        .on('data', () => {
          log.debug(LOG_TAG_HTML, 'Included files');
        })

        .pipe(handle_filestream_markdown_convert_blocks())

        // Capture HTML tags for sitemap/package routing (after includes + md->html).
        .pipe(NODE_GULP_TAP((file) => {
          try {
            if (!Buffer.isBuffer(file.contents)) return;
            const raw = decodeUtf8StrictFromBuffer(file.contents, file.path);
            recordHtmlTags(file, raw);
          } catch (e) {
            log.warn(LOG_TAG_HTML, 'Tag capture failed:', {
              file: String(file.relative || ''),
              error: String(e && e.message ? e.message : e)
            });
          }
        }))

        // Capture URL + relative file path for token usage:
        //  - [[AUTOMATIC_FILE_PATH]] => always relative, no leading slash ("" for root index)
        //  - [[AUTOMATIC_PAGE_URL]]  => full URL (uses CONFIG_REQUIRE_SITE_URL value at runtime)
        .pipe(NODE_GULP_TAP((file) => {
          const urlOpt = configProjectMerge?.option?.url || {};

          // Industry-standard naming:
          // - clean: extensionless URLs (no ".html")
          // - trailing_slash: whether directory index pages end with "/"
          const cleanUrls = (typeof urlOpt.clean === 'boolean')
            ? urlOpt.clean
            : true;

          const includeHtmlExt = !cleanUrls;

          const trailingSlash = (typeof urlOpt.trailing_slash === 'boolean')
            ? urlOpt.trailing_slash
            : true;

          const baseUrl = String(configProjectMerge?.require?.site?.url || '').replace(/\/+$/, '');

          /** @type {string} */
          let relRaw = NODE_CURE_PATH.slashForward(String(file.relative || ''));

          // Normalize:
          // - .md -> .html (since we convert markdown earlier in the pipeline)
          // - index.html => root
          // - */index.html => folder path (with optional trailing slash)
          {
            const lower = relRaw.toLowerCase();

            if (lower.endsWith('.md')) {
              relRaw = relRaw.slice(0, -('.md'.length)) + '.html';
            }

            if (lower === 'index.html') {
              relRaw = '';
            } else if (lower.endsWith('/index.html')) {
              relRaw = relRaw.slice(0, -('/index.html'.length)) + (trailingSlash ? '/' : '');
            }
          }

          // AUTOMATIC_FILE_PATH: always keep extension behavior (do NOT strip .html)
          // Always-relative, no leading slash. Can be "" for root.
          file.automaticFilePath = relRaw;

          // AUTOMATIC_PAGE_URL:
          // - respect clean (strip ".html" when enabled)
          // - respect trailing_slash (strip trailing "/" when disabled)
          let relUrl = relRaw;

          if (!includeHtmlExt && relUrl.toLowerCase().endsWith('.html')) {
            relUrl = relUrl.slice(0, -('.html'.length));
          }

          if (!trailingSlash && relUrl.endsWith('/')) {
            relUrl = relUrl.slice(0, -1);
          }

          // Full URL for the page.
          const pageUrl = relUrl ? `${baseUrl}/${relUrl}` : baseUrl;

          log.debug(LOG_TAG_HTML, 'Generated page URL:', {
            filePath: file.path,
            automaticFilePath: file.automaticFilePath,
            pageUrl: pageUrl
          });

          file.pageUrl = pageUrl;
        }));

      // Dynamically add `NODE_GULP_REPLACE` pipes for each replacement
      Object.entries(configProjectFlat).forEach(([placeholder, value]) => {
        pipeline = pipeline.pipe(
          NODE_GULP_REPLACE(
            new RegExp(libraryVariableAddReplaceDelimiters(placeholder), 'g'),
            value
          )
        );
      });

      pipeline = pipeline.pipe(NODE_GULP_TAP((file) => {
        const siteTitle = configProjectMerge.require.site.title;
        if (!Buffer.isBuffer(file.contents)) return;

        // 1) Read + strip top-of-file override
        const raw0 = decodeUtf8StrictFromBuffer(file.contents, file.path);
        const { override, cleaned } = extractAndRemoveOverrideComment(raw0);

        // 2) Core config
        const titleRoot      = configProjectMerge.option.title || {};
        const titleNameOpts  = titleRoot.name ? titleRoot.name : titleRoot;
        const composeOpts    = adaptTitleComposeOptions(titleRoot);
        const sourcePref     = (titleRoot.source === 'header') ? 'header' : 'filename';

        const rel = NODE_CURE_PATH.slashForward(file.relative);
        const partsRTL = NODE_CURE_PATH.split(rel);           // root->leaf
        const filename = partsRTL[partsRTL.length - 1];
        const dirsRTL  = partsRTL.slice(0, -1);             // root->leaf dirs only

        const relLower = String(rel || '').toLowerCase();
        const filenameLower = String(filename || '').toLowerCase();

        const isRootIndex = (relLower === 'index.html');
        const isDirIndex  = (!isRootIndex && filenameLower === 'index.html');

        // Per-segment labels (full dir chain, including the leaf directory)
        const dirTitlesRTL = dirsRTL.map(p => cleanSegmentToTitle(p, titleNameOpts));

        // For directory index pages, treat the leaf directory as the "page name"
        let baseFromFile = cleanSegmentToTitle(filename, titleNameOpts);
        if (isDirIndex) {
          const leafDirTitle = dirTitlesRTL[dirTitlesRTL.length - 1];
          if (leafDirTitle) baseFromFile = leafDirTitle;
        }

        const headerTitle  = getHeaderTitle(cleaned, titleNameOpts);

        // Source selection with override > header/filename
        const pageLabelFromSource = (sourcePref === 'header' && headerTitle) ? headerTitle : baseFromFile;
        const pageNameTitle = override.title ? String(override.title) : pageLabelFromSource;

        // Depth handling
        const depthOverride   = (override.depth != null) ? Number(override.depth) : null;
        const effectiveDepth  = (depthOverride != null) ? depthOverride : composeOpts.dirDepth; // null => all

        // Breadcrumb: keep full directory chain (renderBreadcrumbHTML can decide to collapse index)
        const dirLabelsBreadcrumb = (typeof effectiveDepth === 'number')
          ? dirTitlesRTL.slice(-effectiveDepth)
          : dirTitlesRTL;

        // Document title dirs:
        // - For directory index pages, exclude the leaf directory to avoid:
        //   "Directory Index - Directory Index - Example - ..."
        const dirTitlesForDoc = isDirIndex ? dirTitlesRTL.slice(0, -1) : dirTitlesRTL.slice();

        const dirForDocOrder = (composeOpts.dirOrder === 'leafToRoot')
          ? dirTitlesForDoc.slice().reverse()
          : dirTitlesForDoc.slice();
        const dirForDocLimited = (typeof effectiveDepth === 'number')
          ? dirForDocOrder.slice(-effectiveDepth)
          : dirForDocOrder;
        const dirsJoinedForDoc = dirForDocLimited.join(composeOpts.dirJoiner);

        const fullTitle = isRootIndex
          ? siteTitle
          : [pageNameTitle, dirsJoinedForDoc, siteTitle].filter(Boolean).join(composeOpts.titleJoiner);

        // Expose for later steps if you want (e.g., other plugins)
        file.__docTitle = fullTitle;
        file.__breadcrumb = {
          dirLabels: dirLabelsBreadcrumb,                   // already depth-limited
          dirDepth: (typeof effectiveDepth === 'number') ? effectiveDepth : null,
          pageLabel: pageNameTitle
        };

        // Config
        const breadcrumbCfg = configProjectMerge.option.navigation?.breadcrumb;

        // Should we skip breadcrumb rendering?
        let skipBreadcrumb = false;
        if (breadcrumbCfg?.enable === false) skipBreadcrumb = true;
        if (!skipBreadcrumb) {
          const NODE_MICROMATCH = require('micromatch');
          if (NODE_MICROMATCH.isMatch(file.relative, getNavIgnorePatterns(configProjectMerge.option.navigation?.breadcrumb))) {
            skipBreadcrumb = true;
          }
        }

        let replaced = cleaned
          .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_TITLE_FULL"), "g"), fullTitle)
          .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_TITLE_PAGE"), "g"), pageNameTitle)
          .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_TITLE_SEPARATOR"), "g"), composeOpts.dirJoiner)
          .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_TITLE_BREADCRUMB"), "g"), dirLabelsBreadcrumb.join(composeOpts.dirJoiner))

          // URL helpers:
          // - [[AUTOMATIC_FILE_PATH]] => "docs/guide/" or "docs/page" etc ("" for root index)
          // - [[AUTOMATIC_PAGE_URL]]  => full page URL
          .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_FILE_PATH"), "g"), (file.automaticFilePath ?? ""))
          .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_PAGE_URL"),  "g"), (file.pageUrl ?? ""));

        const breadcrumbPlaceholder = breadcrumbCfg?.replace_text || '<!-- breadcrumb -->';

        if (!skipBreadcrumb) {
          const urlOpt = configProjectMerge?.option?.url || {};
          const cleanUrls = (typeof urlOpt.clean === 'boolean')
            ? urlOpt.clean
            : true;

          const breadcrumbHtml = renderBreadcrumbHTML(file, {
            root_content: breadcrumbCfg?.root_content || '<span class="font-icon--interface--home"></span> Home',
            pathPrefix: breadcrumbCfg?.base_path || '',
            pathSuffix: cleanUrls ? '' : '.html',
            containerElem: 'section',
            containerElemProps: 'id="breadcrumb"',
            linkProps: 'class="button"'
          });

          replaced = replaced.replace(breadcrumbPlaceholder, breadcrumbHtml);
        } else {
          // Remove breadcrumb placeholder entirely if skipping
          replaced = replaced.replace(breadcrumbPlaceholder, '');
        }

        // Replace version placeholders with real values:
        //
        //  - {{AUTOMATIC_VERSION_COMPILER}} → Compiler engine version from CONFIG_INFO
        //  - {{AUTOMATIC_VERSION_PROJECT}}  → Project's version from configProjectInfo (falls back to "")
        //
        // Notes:
        //  • libraryVariableAddReplaceDelimiters(name) wraps the token with the project's configured delimiters.
        //  • "g" ensures every instance in the file is replaced.
        //  • Optional chaining + nullish coalescing avoids "undefined" ending up in output.
        replaced = replaced
          .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_VERSION"), "g"), CONFIG_INFO.version)
          // .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_DATE"), "g"), value); // TODO
          // .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_VERSION_STATICUS"), "g"), CONFIG_INFO.version)
          // .replace(new RegExp(libraryVariableAddReplaceDelimiters("AUTOMATIC_VERSION_PROJECT"), "g"), (configProjectInfo?.version ?? ""));

        // --- fn-style tokens {{AUTOMATIC_MD5(path)}} and {{AUTOMATIC_DATE(path)}} ---

        // Small regex escaper (local so we don't depend on another scope)
        function rxEscape(str) { return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

        // Resolve a path given in the token to an absolute file on disk.
        // Priority: absolute-from-project-in ("/...") → relative-to-project-in → fallback project root.
        function resolveInputFilePath(tokenPath) {
          const p = String(tokenPath).trim().replace(/^['"]|['"]$/g, ''); // allow quoted args
          if (!p) return null;

          // If it starts with "/" treat it as relative to the input root
          const fromIn = NODE_CURE_PATH.absolute(
            PATH_DIR_PROJECT_OUT,
            p.startsWith('/') ? p.slice(1) : p
          );

          if (NODE_FS.existsSync(fromIn) && NODE_FS.lstatSync(fromIn).isFile()) {
            return fromIn;
          }

          // Fallback: try from project root (useful if caller passes "in/.../file.ext")
          const fromProject = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT, p.replace(/^\/+/, ''));
          if (NODE_FS.existsSync(fromProject) && NODE_FS.lstatSync(fromProject).isFile()) {
            return fromProject;
          }

          return null;
        }

        // Compute md5 for a file (hex). Return "" if not found (don't leak "undefined" into output).
        function computeFileMd5(absPath) {
          try {
            const NODE_CRYPTO = require('crypto');
            const buf = NODE_FS.readFileSync(absPath);
            return NODE_CRYPTO.createHash('md5').update(buf).digest('hex');
          } catch (e) {
            log.warn(LOG_TAG_HTML, 'MD5 failed:', { file: absPath, error: e?.message });
            return null;
          }
        }

        // Get file mtime using the active logger timestamp format. Return null if unavailable.
        function computeFileDate(absPath) {
          try {
            const st = NODE_FS.statSync(absPath);
            return formatDateTimeByLogConfig(new Date(st.mtimeMs));
          } catch (e) {
            log.warn(LOG_TAG_HTML, 'DATE failed:', { file: absPath, error: e?.message });
            return null;
          }
        }

        // Build delimiter-aware regexes like:  <open>AUTOMATIC_MD5(<path>)<close>
        const delimiter = (configProjectMerge?.option?.replace?.delimiter) || { open: '[[', close: ']]' };
        const openRx  = rxEscape(delimiter.open);
        const closeRx = rxEscape(delimiter.close);

        const RX_MD5  = new RegExp(`${openRx}\\s*AUTOMATIC_FILE_CHECKSUM\\(([^)]+)\\)\\s*${closeRx}`, 'g');
        const RX_DATE = new RegExp(`${openRx}\\s*AUTOMATIC_FILE_DATE\\(([^)]+)\\)\\s*${closeRx}`, 'g');

        replaced = replaced
          .replace(RX_MD5,  (m, pathArg) => {
            const abs = resolveInputFilePath(pathArg);
            if (!abs) {
              log.warn(LOG_TAG_HTML, 'AUTOMATIC_MD5: file not found', { token: pathArg });
              return '0';
            }
            return computeFileMd5(abs);
          })
          .replace(RX_DATE, (m, pathArg) => {
            const abs = resolveInputFilePath(pathArg);
            if (!abs) {
              log.warn(LOG_TAG_HTML, 'AUTOMATIC_DATE: file not found', { token: pathArg });
              return m;
            }
            return computeFileDate(abs);
          });

        // --- end fn-style tokens ---

        file.contents = Buffer.from(replaced, 'utf8');

      }));

      // // Dynamically add `NODE_GULP_REPLACE` pipes for each replacement
      // Object.entries(configProjectFlat).forEach(([placeholder, value]) => {
      //   pipeline = pipeline.pipe(
      //     NODE_GULP_REPLACE(
      //       new RegExp(libraryVariableAddReplaceDelimiters(placeholder), 'g'),
      //       value
      //     )
      //   );
      // });

      if (configProjectMerge?.option?.navigation?.toc?.enable !== false) {
        pipeline = pipeline
          .on('data', () => {
            log.debug(LOG_TAG_HTML, 'Table of Contents Processing...');
          })
          .pipe(NODE_CUSTOM_GULP_HTML_TOC(/** @type {any} */({
            selectors: configProjectMerge.option.navigation.toc.selectors,
            headerPrependSelectors: configProjectMerge.option.navigation.toc.header_prepend_selectors,
            ignore_patterns: getNavIgnorePatterns(configProjectMerge.option.navigation?.toc),
            ignore_class: configProjectMerge.option.navigation.toc.ignore_class,
            replaceTextTemplate: function() {
              const isCollapsible = configProjectMerge.option.navigation.toc.collapsible;
              return '<section id="section-toc">\n'
                  + '  <span id="toc-title">Table of Contents</span>\n'
                  + `  ${isCollapsible ? '<div id="toc"></div>' : '<ul id="toc"></ul>'}`
                  + '</section>';
            },
            headerPrepend: configProjectMerge.option.navigation.toc.header_prepend,
            anchorTemplate: function(id) {
              // return ' <a href="#' + id + '" name="' + id + '" class="anchor" onclick="return false;"><span class="font-icon--interface--link"></span></a>';
              return '<span> <a href="#' + id + '" name="' + id + '" class="anchor ignore--print"><span class="font-icon--interface--link"></span></a></span>';
            },
            replaceText: configProjectMerge.option.navigation.toc.replace_text,
            wrapEmoji: configProjectMerge.option.navigation.toc.wrap_emoji,
            collapsible: configProjectMerge.option.navigation.toc.collapsible,
            maxDepth: configProjectMerge.option.navigation.toc.depth, // configProjectMerge.option.navigation.toc.depth.link,
            anchorMaxDepth: 6, // configProjectMerge.option.navigation.toc.depth.anchor,
            // headerPrependMinDepth: 2,
            headerPrependMaxDepth: 6 // configProjectMerge.option.navigation.toc.depth.prepend
          })))
          .on('data', () => {
            log.debug(LOG_TAG_HTML, 'Table of Contents Processed.');
          });
      } else {
        log.debug(LOG_TAG_HTML, 'Table of Contents skipped (disabled).');
      }

      pipeline = pipeline.on('data', () => {
          log.debug(LOG_TAG_HTML, 'Minification Running...');
        })
        // (https://www.npmjs.com/package/html-minifier)
        .pipe(NODE_GULP_HTMLMIN(NODE_CURE_JSON.clone(configProjectMerge.option.html.minify)))
        .on('data', () => {
          log.debug(LOG_TAG_HTML, 'Minification Complete.');
        })

        .pipe(libraryAppendBrandComment()) // Append comment before output

        .pipe(NODE_GULP.dest(PATH_DIR_PROJECT_OUT_HTML))

        .on('data', async (file) => {
          await cacheProjectFile.store(CACHE_NAMESPACE_HTML, FILE_PATH_IN);
          log.success(LOG_TAG_HTML, 'Processed:', {
            "File Current": fileCurrent,
            "File Total": FILE_PATHS_IN.length,
            "File Path": FILE_PATH_IN_RELATIVE
          });
        })
        .on('end', resolve)
        .on('error', reject);
    });
  }

  log.info(LOG_TAG_HTML, 'File Summary:', {
    ...counters,
    total: FILE_PATHS_IN.length
  });

  // Write tag manifest for sitemap/package decisions.
  // - Preserve cached/not-ran file entries (merge behavior).
  // - Remove entries for files that no longer exist (prune behavior).
  try {
    ensureHtmlTagManifestDirSync();

    // Prune deleted files by scanning ALL current HTML/MD inputs (not cache-filtered).
    const FILE_PATHS_ALL = await libraryFileGetFilesFromPattern(PATH_FILE_PROJECT_IN_HTML);
    const aliveRelSet = new Set(
      FILE_PATHS_ALL.map(p => {
        const rel = NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, p);
        return NODE_CURE_PATH.slashForward(String(rel || ''));
      })
    );

    for (const rel of Object.keys(htmlTagManifest.files || {})) {
      if (!aliveRelSet.has(rel)) {
        delete htmlTagManifest.files[rel];
      }
    }

    NODE_CURE_FS.writeFileSync(
      PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
      JSON.stringify(htmlTagManifest, null, 2)
    );

    log.info(LOG_TAG_HTML, 'HTML Tag Manifest Saved:', {
      path: PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
      fileCount: Object.keys(htmlTagManifest.files || {}).length
    });
  } catch (e) {
    log.warn(LOG_TAG_HTML, 'HTML Tag Manifest write failed:', {
      path: PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
      error: String(e && e.message ? e.message : e)
    });
  }

  // Persist dependency signatures used for task-level HTML invalidation.
  try {
    const dependencyFiles = await libraryFileGetFilesFromPattern(PATH_FILE_PROJECT_IN_HTML_INCLUDE);
    const dependencyFilesToStore = dependencyFiles.slice();
    if (libraryPathExists(PATH_FILE_PROJECT_HANDLEBARS)) {
      dependencyFilesToStore.push(PATH_FILE_PROJECT_HANDLEBARS);
    }

    for (const abs of dependencyFilesToStore) {
      if (!libraryPathExists(abs)) continue;
      await cacheProjectFile.store(CACHE_NAMESPACE_HTML, abs, false);
    }
    cacheProjectFile.save();
  } catch (e) {
    log.warn(LOG_TAG_HTML, 'Failed to persist HTML dependency cache signatures (continuing).', {
      error: String(e?.message || e)
    });
  }


  log.end(LOG_TAG_HTML, 'Complete.');
  done();

  // ===============================================================================================
  // Process - End
  // ===============================================================================================
}

// -----------------------------------------------------------------------------
// #### Main - Process - Image
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_IMAGE = 'image';

const PATH_DIR_PROJECT_IN_ASSET_IMAGE  = `${PATH_DIR_PROJECT_IN_ASSET}image/`;
const PATH_DIR_PROJECT_OUT_ASSET_IMAGE = `${PATH_DIR_PROJECT_OUT_ASSET}image/`;
const PATH_FILE_PROJECT_IN_ASSET_IMAGE = `${PATH_DIR_PROJECT_IN_ASSET_IMAGE}${PATH_ALL}`;
const PATH_FILE_PROJECT_IN_ASSET_IMAGE_WATCH = [
  PATH_FILE_PROJECT_IN_ASSET_IMAGE,
  ...PATH_DIR_IN_IGNORE_PROJECT
];

function handleWatermarkConfigValidate(LOG_TAG, configs) {
  LOG_TAG = LOG_TAG + ' [⚙️ Config] [🔍 Validate]';

  log.begin(LOG_TAG, 'Running...');
  log.debug(LOG_TAG, 'Configs:', {
    "Input": configs
  });

  const validConfigs = [];

  configs.forEach((config, i) => {
    const entries = config.layers || [config];

    const pattern = config.pattern;
    if (!pattern) {
      log.error(LOG_TAG, 'Skipping config missing required key:', {
        index: i,
        missing: "pattern",
        config
      });
      return;
    }

    const validEntries = [];

    entries.forEach((entry, j) => {
      if (!entry.image) {
        log.error(LOG_TAG, 'Skipping config missing required key:', {
          index: i,
          missing: `layer[${j}].image`,
          config
        });
        return;
      }

      validEntries.push(entry);
    });

    if (validEntries.length > 0) {
      validConfigs.push({
        pattern,
        layers: validEntries
      });
    }
  });

  const CONFIG_INVALID_COUNT = configs.length - validConfigs.length;
  const CONFIGS_ISVALID = CONFIG_INVALID_COUNT === 0;

  if (CONFIGS_ISVALID) {
    log.success(LOG_TAG, 'Config valid!');
  } else {
    log.error(LOG_TAG, 'Config has errors, see above for more:', {
      "Error Count": CONFIG_INVALID_COUNT
    })
  }
  log.debug(LOG_TAG, 'Configs:', {
    "Input": configs,
    "Valid": validConfigs
  });

  log.end(LOG_TAG, 'Complete.');

  return {
    CONFIGS_ISVALID,
    validConfigs
  };
}

function handleWatermarkConfigMatch(LOG_TAG, filePath, configs) {
  LOG_TAG = LOG_TAG + ' [⚙️ Config] [📐 Match]';

  const op = logProcessingStart(LOG_TAG, 'watermark config match', {
    file: filePath,
    config_count: Array.isArray(configs) ? configs.length : 0
  });
  log.debug(LOG_TAG, 'Arguments:', { filePath, configs });

  const NODE_MINIMATCH = require('minimatch');

  const matches = configs
    .filter(config => NODE_MINIMATCH.minimatch(filePath, config.pattern))
    .flatMap(config => {
      const entries = config.layers || [config];
      return entries.map(entry => ({
        ...entry,
        pattern: config.pattern
      }));
    });

  log.debug(LOG_TAG, "Matches found:", matches);
  if (matches.length === 0) {
    log.debug(LOG_TAG, 'No watermark pattern applies to image:', { file: filePath });
  }
  logProcessingDone(LOG_TAG, op, {
    file: filePath,
    matched_count: matches.length
  });

  return matches;
}

async function handleWatermarkGetImageDimensions(LOG_TAG, path) {
  LOG_TAG = LOG_TAG + ' [📐 Get Image Dimensions]';

  const op = logProcessingStart(LOG_TAG, 'get image dimensions', { path });
  log.debug(LOG_TAG, 'Arguments:', { path });

  let dimensions = { width: Infinity, height: Infinity };

  try {
    dimensions = await _getImageDimensionsCached(path);

    log.debug(LOG_TAG, 'Loaded image dimensions:', {
      path,
      dimensions
    });
  } catch (err) {
    logProcessingFail(LOG_TAG, op, err, { path });
    log.error(LOG_TAG, 'Could not determine image dimensions:', {
      path,
      err
    });
    throw err;
  }

  logProcessingDone(LOG_TAG, op, {
    path,
    dimensions
  });

  return dimensions;
}

async function handleWatermarkConfigResolve(LOG_TAG, configs, filePathTarget, targetDimensionsOverride = null) {
  LOG_TAG = LOG_TAG + ' [⚙️ Config] [🔧 Resolve]';

  const op = logProcessingStart(LOG_TAG, 'watermark config resolve', {
    target: filePathTarget,
    config_count: Array.isArray(configs) ? configs.length : 0
  });
  log.debug(LOG_TAG, 'Arguments:', {
    configs, filePathTarget
  });

  try {
  // ---- Scan if target/watermark dimensions are needed ----
  let needsTargetSize = false;
  let needsWatermarkSize = true; // so far always need this

  for (const config of configs) {
    const resize = config.resize;
    if (resize && typeof resize === 'object') {
      for (const key of ['width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight']) {
        const raw = resize[key];
        const values = Array.isArray(raw) ? raw : [raw];

        for (const v of values) {
          if (typeof v !== 'string') continue;
          if (/%t$/.test(v)) needsTargetSize = true;
          if (/%w$/.test(v)) needsWatermarkSize = true;
        }
      }
    }
  }

  log.debug(LOG_TAG, 'Dimensions required:', {
    needsTargetSize,
    needsWatermarkSize
  });

  // ---- Grab target image dimensions if needed ----
  const dimensions = {
    target: { width: Infinity, height: Infinity },
    watermark: { width: Infinity, height: Infinity }
  };

  if (needsTargetSize) {
    const overrideWidth = Number(targetDimensionsOverride?.width);
    const overrideHeight = Number(targetDimensionsOverride?.height);
    if (Number.isFinite(overrideWidth) && Number.isFinite(overrideHeight)) {
      dimensions.target = { width: overrideWidth, height: overrideHeight };
      log.debug(LOG_TAG, 'Using provided target dimensions override:', {
        filePathTarget,
        dimensions: dimensions.target
      });
    } else {
      dimensions.target = await handleWatermarkGetImageDimensions(LOG_TAG, filePathTarget);
    }
  }

  let resolvedConfigs = await Promise.all(configs.map(async config => {
    const updatedConfig = { ...config };
    updatedConfig.image = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN_ASSET_IMAGE, config.image);

    if (needsWatermarkSize) {
      dimensions.watermark = await handleWatermarkGetImageDimensions(LOG_TAG, updatedConfig.image);
    }

    const resize = config.resize;
    if (resize && typeof resize === 'object') {
      const resolved = {};

      // --- Step 1: Parse width, minWidth, maxWidth as you already do ---

      for (const key of ['width', 'height']) {
        const basis = key === 'width' ? dimensions.target.width : dimensions.target.height;

        let value = resize[key];
        value = Array.isArray(value) ? value : [value];
        let finalValue = null;

        for (const v of value) {
          if (typeof v !== 'string') continue;
          const match = v.match(/^(\d+(?:\.\d+)?)%([tw])$/);
          if (match) {
            const num = parseFloat(match[1]);
            const basisType = match[2] === 'w' ? dimensions.watermark[key] : basis;
            if (Number.isFinite(basisType)) {
              const calculated = (num / 100) * basisType;
              if (Number.isFinite(calculated)) {
                finalValue = calculated;
                log.debug(LOG_TAG, 'Parsed smart size:', {
                  field: key,
                  input: v,
                  basisType: match[2],
                  basisValue: basisType,
                  result: finalValue
                });
                break;
              }
            }
          } else if (/px$/.test(v)) {
            finalValue = parseFloat(v);
            log.debug(LOG_TAG, 'Parsed pixel size:', {
              field: key,
              input: v,
              result: finalValue
            });
            break;
          } else {
            const n = Number(v);
            if (Number.isFinite(n)) {
              finalValue = n;
              log.debug(LOG_TAG, 'Parsed number size:', {
                field: key,
                input: v,
                result: finalValue
              });
              break;
            }
          }
        }

        resolved[key] = finalValue;
      }

      // --- Step 2: Apply min/max for width only now ---

      for (const key of ['minWidth', 'maxWidth']) {
        const shortKey = 'width'; // always width
        const basis = shortKey === 'width' ? dimensions.target.width : dimensions.target.height;

        let value = resize[key];
        value = Array.isArray(value) ? value : [value];
        const resolvedValues = [];

        for (const v of value) {
          if (typeof v === 'number' && Number.isFinite(v)) { resolvedValues.push(v); continue; }
          if (typeof v !== 'string') continue;

          // e.g. "50%w" or "25%t"
          const m = v.match(/^(\d+(?:\.\d+)?)%([tw])$/i);
          if (m) {
            const num = Number(m[1]);
            const basisRaw = m[2].toLowerCase() === 'w' ? dimensions.watermark[shortKey] : basis;
            const basisNum = Number(basisRaw);
            if (Number.isFinite(basisNum)) {
              resolvedValues.push((num / 100) * basisNum);
            }
            continue;
          }

          // e.g. "12px"
          if (v.endsWith('px')) {
            const n = Number(v.slice(0, -2));
            if (Number.isFinite(n)) resolvedValues.push(n);
            continue;
          }

          // bare numeric string, e.g. "12.5"
          const n = Number(v);
          if (Number.isFinite(n)) resolvedValues.push(n);
        }

        if (resolvedValues.length > 0) {
          const appliedValue = key.startsWith('min') ? Math.max(...resolvedValues) : Math.min(...resolvedValues);
          resolved[key] = appliedValue;
          log.debug(LOG_TAG, 'Applied constraint:', {
            field: key,
            values: resolvedValues,
            result: appliedValue
          });
        }
      }

      // --- Step 3: Enforce min/max Width ---
      if (Number.isFinite(resolved.minWidth)) resolved.width = Math.max(resolved.width, resolved.minWidth);
      if (Number.isFinite(resolved.maxWidth)) resolved.width = Math.min(resolved.width, resolved.maxWidth);

      // --- Step 4: Calculate proportional height ---
      const watermarkOriginalWidth = dimensions.watermark.width;
      const watermarkOriginalHeight = dimensions.watermark.height;

      if (Number.isFinite(resolved.width) && Number.isFinite(watermarkOriginalWidth) && Number.isFinite(watermarkOriginalHeight)) {
        resolved.height = (resolved.width / watermarkOriginalWidth) * watermarkOriginalHeight;

        log.debug(LOG_TAG, 'Calculated proportional height based on width:', {
          width: resolved.width,
          height: resolved.height,
          originalWidth: watermarkOriginalWidth,
          originalHeight: watermarkOriginalHeight
        });
      }

      // --- Step 5: Apply maxHeight / minHeight constraints ---

      log.debug(LOG_TAG, 'Target Dimensions:', dimensions.target);
      log.debug(LOG_TAG, 'Resize Block:', resize);

      // Handle maxHeight
      if (resize.maxHeight) {
        let maxHValues = Array.isArray(resize.maxHeight) ? resize.maxHeight : [resize.maxHeight];
        let maxHResolved = null;

        for (const v of maxHValues) {
          // accept raw numbers too (optional)
          if (typeof v === 'number' && Number.isFinite(v)) { maxHResolved = v; break; }
          if (typeof v !== 'string') continue;

          const s = v.trim();

          // e.g. "50%t" or "25%w" (height constraint uses target.height as basis)
          const m = s.match(/^(\d+(?:\.\d+)?)%([tw])$/i);
          if (m) {
            const pct = Number(m[1]);
            const basisNum = Number(dimensions.target.height);
            if (Number.isFinite(pct) && Number.isFinite(basisNum)) {
              maxHResolved = (pct / 100) * basisNum;
              break;
            }
            continue;
          }

          // e.g. "120px"
          if (s.endsWith('px')) {
            const n = Number(s.slice(0, -2));
            if (Number.isFinite(n)) { maxHResolved = n; break; }
            continue;
          }

          // bare numeric string, e.g. "120" or "120.5"
          const n = Number(s);
          if (Number.isFinite(n)) { maxHResolved = n; break; }
        }

        if (Number.isFinite(maxHResolved) && resolved.height > maxHResolved) {
          const scaleFactor = maxHResolved / resolved.height;
          resolved.width = resolved.width * scaleFactor;
          resolved.height = maxHResolved;

          log.debug(LOG_TAG, 'Adjusted for maxHeight constraint:', {
            scale: scaleFactor,
            newWidth: resolved.width,
            newHeight: resolved.height
          });
        }
      }

      // Handle minHeight
      if (resize.minHeight) {
        let minHValues = Array.isArray(resize.minHeight) ? resize.minHeight : [resize.minHeight];
        let minHResolved = null;

        for (const v of minHValues) {
          // (optional) allow raw numbers too
          if (typeof v === 'number' && Number.isFinite(v)) { minHResolved = v; break; }
          if (typeof v !== 'string') continue;

          const s = v.trim();

          // "%"-based value: e.g., "40%t" or "40%w" — for height constraints, basis is target.height
          const m = s.match(/^(\d+(?:\.\d+)?)%([tw])$/i);
          if (m) {
            const pct = Number(m[1]);
            const basisNum = Number(dimensions.target.height);
            if (Number.isFinite(pct) && Number.isFinite(basisNum)) {
              minHResolved = (pct / 100) * basisNum;
              break;
            }
            continue;
          }

          // "px" value: e.g., "120px"
          if (s.endsWith('px')) {
            const n = Number(s.slice(0, -2));
            if (Number.isFinite(n)) { minHResolved = n; break; }
            continue;
          }

          // bare numeric string: e.g., "120" or "120.5"
          const n = Number(s);
          if (Number.isFinite(n)) { minHResolved = n; break; }
        }

        if (Number.isFinite(minHResolved) && resolved.height < minHResolved) {
          const scaleFactor = minHResolved / resolved.height;
          resolved.width = resolved.width * scaleFactor;
          resolved.height = minHResolved;

          log.debug(LOG_TAG, 'Adjusted for minHeight constraint:', {
            scale: scaleFactor,
            newWidth: resolved.width,
            newHeight: resolved.height
          });
        }
      }

      // --- Step 6: Finalize resize string ---
      if (Number.isFinite(resolved.width) && Number.isFinite(resolved.height)) {
        updatedConfig.resize = `${Math.round(resolved.width)}x${Math.round(resolved.height)}`;
      } else if (Number.isFinite(resolved.width)) {
        updatedConfig.resize = `${Math.round(resolved.width)}x`;
      } else if (Number.isFinite(resolved.height)) {
        updatedConfig.resize = `x${Math.round(resolved.height)}`;
      }

      // log.detail(LOG_TAG, 'Final resize string:', {
      log.debug(LOG_TAG, 'Final resize string:', {
        path: updatedConfig.image,
        resize: updatedConfig.resize
      });
    }

    return updatedConfig;
  }));

  if (resolvedConfigs.length > 0) {
    // log.info(LOG_TAG, 'Matched watermark configs:', {
    log.debug(LOG_TAG, 'Matched watermark configs:', {
      path: libraryPathRelativeProjectRoot(filePathTarget),
      matchedCount: resolvedConfigs.length
    });
  } else {
    // log.notice(LOG_TAG, 'No watermark matched:', {
    log.debug(LOG_TAG, 'No watermark matched:', {
      path: libraryPathRelativeProjectRoot(filePathTarget),
      dimensions
    });
  }

  resolvedConfigs = libraryVariableEnsureIsArray(resolvedConfigs);

  log.debug(LOG_TAG, 'Configs:', {
    "Input": configs,
    "Resolved": resolvedConfigs
  });
  logProcessingDone(LOG_TAG, op, {
    target: filePathTarget,
    resolved_count: resolvedConfigs.length
  });

  return resolvedConfigs;
  } catch (err) {
    logProcessingFail(LOG_TAG, op, err, {
      target: filePathTarget
    });
    throw err;
  }
}

const GRAVITY_MAP = {
  Center:      "Center",
  top:         "North",
  TopLeft:     "NorthWest",
  TopRight:    "NorthEast",
  Bottom:      "South",
  BottomLeft:  "SouthWest",
  BottomRight: "SouthEast",
  Left:        "West",
  Right:       "East"
};

function handleWatermarkNormalizeLayerOptions(layer) {
  const normalized = { ...layer };

  // Normalize gravity (e.g., "top_left" to "NorthWest")
  if (typeof normalized.gravity === 'string') {
    const key = normalized.gravity;
    normalized.gravity = GRAVITY_MAP[key] || layer.gravity || 'Center';
  }

  // Convert human-friendly float resize (e.g., 0.5) to "50%"
  if (typeof normalized.resize === 'number') {
    normalized.resize = `${(normalized.resize * 100).toFixed(2)}%`;
  }

  // Rename "opacity" to "dissolve" internally (float 0–100)
  if (typeof normalized.opacity === 'number') {
    normalized.dissolve = normalized.opacity;
    delete normalized.opacity;
  }

  // Normalize background (e.g., "transparent" to "none")
  if (typeof normalized.background === 'string') {
    if (normalized.background.toLowerCase() === 'transparent') {
      normalized.background = 'none';
    }
  }

  return normalized;
}

function handleWatermarkApply(buffer, configs) {
  const NODE_GRAPHICSMAGICK = require('gm');

  return configs.reduce((prev, cfg) => {
    return prev.then(buf =>
      new Promise((resolve, reject) => {
        const layer = handleWatermarkNormalizeLayerOptions(cfg);

        /**
         * -gravity
         *   NorthWest,
         *   North,
         *   NorthEast,
         *   West,
         *   Center,
         *   East,
         *   SouthWest,
         *   South,
         *   SouthEast
         *
         * -resize
         *   Ex. 50%
         *
         * -dissolve
         *   Ex. 50
         */
        let gmPipeline = NODE_GRAPHICSMAGICK(buf, layer.image)
          .command('composite')
          .in('-gravity', layer.gravity || 'SouthEast')
          .in('-resize', layer.resize)
          .in('-dissolve', layer.dissolve)
          .in('-background', layer.background);

        if (layer.gmOptions) {
          layer.gmOptions.split(' ').forEach(opt => {
            gmPipeline = gmPipeline.in(opt);
          });
        }

        gmPipeline = gmPipeline.in(layer.image);
        gmPipeline.toBuffer((err, outBuf) => {
          if (err) reject(err);
          else resolve(outBuf);
        });
      })
    );
  }, Promise.resolve(buffer));
}

async function handleWatermark(
  LOG_TAG,
  buffer,
  countersProcessed,
  countersTotal,
  FILE_PATH_IN,
  FILE_PATH_IN_RELATIVE,
  WATERMARK_CONFIGS_VALID,
  targetDimensionsOverride = null
) {
  const WATERMARK_CONFIGS_MATCH = handleWatermarkConfigMatch(LOG_TAG, FILE_PATH_IN_RELATIVE, WATERMARK_CONFIGS_VALID);

  let wasApplied = false;

  if (WATERMARK_CONFIGS_MATCH.length > 0) {
    const watermarkProgress = {
      "File Current": countersProcessed,
      "File Path": NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN)
    };
    if (Number.isFinite(countersTotal)) {
      watermarkProgress["File Total"] = countersTotal;
    }
    log.info(LOG_TAG, 'Processing:', watermarkProgress);

    wasApplied = true;

    const resolvedConfigs = await handleWatermarkConfigResolve(
      LOG_TAG,
      WATERMARK_CONFIGS_MATCH,
      FILE_PATH_IN,
      targetDimensionsOverride
    );

    if (resolvedConfigs.length > 0) {
      const FILE_SIZE_IN = (buffer.length / 1024); // in KB

      buffer = await handleWatermarkApply(buffer, resolvedConfigs);

      const FILE_SIZE_OUT = (buffer.length / 1024); // in KB
      const MULTIPLIER = FILE_SIZE_IN > 0 ? (FILE_SIZE_OUT / FILE_SIZE_IN).toFixed(2) : 'N/A';

      const watermarkProcessed = {
        "File Current": countersProcessed,
        "File Path": NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN),
        "Before (KB)": FILE_SIZE_IN.toFixed(2),
        "After  (KB)": FILE_SIZE_OUT.toFixed(2),
        "Increase": `${MULTIPLIER}x`
      };
      if (Number.isFinite(countersTotal)) {
        watermarkProcessed["File Total"] = countersTotal;
      }

      log.success(LOG_TAG, 'Processed:', watermarkProcessed);
    }
  }

  return { buffer, wasApplied };
}

/**
 * Applies EXIF-based auto-orientation for JPEGs so that later metadata stripping
 * (e.g. jpegoptim.stripAll) cannot change the displayed rotation.
 *
 * @param {string} filePath
 * @param {Buffer} buffer
 * @returns {Promise<{ buffer: Buffer, mode: string }>}
 */
async function applyAutoOrient(filePath, buffer) {
  let mode = "None";

  const ext = NODE_PATH.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg'].includes(ext)) {
    return { buffer, mode };
  }

  // If GM is missing, we cannot bake EXIF orientation into pixels.
  if (!handleHasGraphicsMagick()) {
    // Keep "None" so behavior is unchanged; caller can add a debug log if desired.
    return { buffer, mode };
  }

  const NODE_GRAPHICSMAGICK = require('gm');

  const outBuffer = await new Promise((resolve, reject) => {
    // Passing filePath helps GM infer format when reading from a Buffer.
    NODE_GRAPHICSMAGICK(buffer, filePath)
      .autoOrient()
      .toBuffer(ext.replace('.', ''), (err, out) => {
        if (err) return reject(err);
        resolve(out);
      });
  });

  mode = "Auto";
  return { buffer: outBuffer, mode };
}

async function applyInterlace(filePath, buffer) {
  let mode = "None";

  // Only apply to supported formats
  const ext = NODE_PATH.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
    return { buffer, mode };
  }

  const interlaceRules = configProjectMerge.option.image?.interlace || [];

  // Normalize rules into consistent objects: { pattern, mode }
  const rules = interlaceRules.map(rule =>
    typeof rule === 'string'
      ? { pattern: rule, mode: 'Line' } // default to "Line"
      : rule
  );

  // Find the first matching rule
  const NODE_MINIMATCH = require('minimatch');

  // Collect all matches, pick the last one (override wins)
  const match = rules.filter(rule => NODE_MINIMATCH.minimatch(
    NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, filePath),
    rule.pattern)
  ).pop();
  if (!match) return { buffer, mode };

  mode = match.mode || 'Line';

  // If override is explicit "None", skip GraphicsMagick
  if (mode.toLowerCase() === 'none') {
    return { buffer, mode };
  }

  const NODE_GRAPHICSMAGICK = require('gm');
  const outBuffer = await new Promise((resolve, reject) => {
    NODE_GRAPHICSMAGICK(buffer, filePath)
      .interlace(mode) // PNG = Adam7, JPEG = progressive
      .toBuffer((err, out) => err ? reject(err) : resolve(out));
  });

  return { buffer: outBuffer, mode };
}

function handleImageVariantInsertSuffix(filePath, suffix = '.thumb') {
  const ext = NODE_PATH.extname(filePath);
  const base = NODE_PATH.basename(filePath, ext);
  const dir = NODE_PATH.dirname(filePath);
  return NODE_PATH.join(dir, `${base}${suffix}${ext}`);
}

function handleImageVariantConfigValidate(LOG_TAG, configs) {
  LOG_TAG = LOG_TAG + ' [⚙️ Config] [🔍 Validate Variant]';
  log.begin(LOG_TAG, 'Running...');

  const validConfigs = [];
  const normalizedConfigs = libraryVariableEnsureIsArray(configs);

  normalizedConfigs.forEach((config, index) => {
    const pattern = typeof config?.pattern === 'string' ? config.pattern.trim() : '';
    const size = config?.size;
    const rawSuffix = (typeof config?.suffix === 'string' && config.suffix.trim()) ? config.suffix.trim() : '.thumb';
    const suffix = rawSuffix.startsWith('.') ? rawSuffix : `.${rawSuffix}`;

    if (!pattern) {
      log.error(LOG_TAG, 'Skipping variant config missing required key:', {
        index,
        missing: 'pattern',
        config
      });
      return;
    }

    const sizeIsNumber = typeof size === 'number' && Number.isFinite(size) && size > 0;
    const sizeIsPercent = typeof size === 'string' && /^\s*\d+(?:\.\d+)?%\s*$/.test(size);
    if (!sizeIsNumber && !sizeIsPercent) {
      log.error(LOG_TAG, 'Skipping variant config with invalid size. Expected positive number or percentage string (e.g. "25%"):', {
        index,
        size,
        config
      });
      return;
    }

    if (suffix.includes('/') || suffix.includes('\\')) {
      log.error(LOG_TAG, 'Skipping variant config with invalid suffix (must be filename-safe, no path separators):', {
        index,
        suffix,
        config
      });
      return;
    }

    validConfigs.push({
      pattern,
      size,
      suffix
    });
  });

  const CONFIG_INVALID_COUNT = normalizedConfigs.length - validConfigs.length;
  const CONFIGS_ISVALID = CONFIG_INVALID_COUNT === 0;
  if (CONFIGS_ISVALID) {
    log.success(LOG_TAG, 'Variant config valid!');
  } else {
    log.error(LOG_TAG, 'Variant config has errors, see above for more:', {
      'Error Count': CONFIG_INVALID_COUNT
    });
  }

  log.debug(LOG_TAG, 'Configs:', {
    Input: normalizedConfigs,
    Valid: validConfigs
  });
  log.end(LOG_TAG, 'Complete.');

  return {
    CONFIGS_ISVALID,
    validConfigs
  };
}

function handleImageVariantConfigMatch(LOG_TAG, filePathRelative, configs) {
  LOG_TAG = LOG_TAG + ' [⚙️ Config] [📐 Match Variant]';

  const NODE_MINIMATCH = require('minimatch');
  const matches = libraryVariableEnsureIsArray(configs).filter(config =>
    NODE_MINIMATCH.minimatch(filePathRelative, config.pattern)
  );

  log.debug(LOG_TAG, 'Variant matches found:', {
    file: filePathRelative,
    matchCount: matches.length,
    matches
  });

  return matches;
}

function handleImageVariantResolveMaxBound(size, sourceDimensions) {
  if (typeof size === 'number' && Number.isFinite(size) && size > 0) {
    return size;
  }

  if (typeof size === 'string') {
    const m = size.trim().match(/^(\d+(?:\.\d+)?)%$/);
    if (m) {
      const pct = Number(m[1]);
      const basis = Math.max(
        Number(sourceDimensions?.width) || 0,
        Number(sourceDimensions?.height) || 0
      );
      if (Number.isFinite(pct) && pct > 0 && Number.isFinite(basis) && basis > 0) {
        return (pct / 100) * basis;
      }
    }
  }

  return null;
}

async function handleImageGetBufferDimensions(LOG_TAG, buffer, fallbackPath = null) {
  LOG_TAG = LOG_TAG + ' [📐 Buffer Dimensions]';

  try {
    const SHARP = require('sharp');
    SHARP.simd(true);
    SHARP.concurrency(HARDWARE_CPU_THREAD_COUNT);
    const metadata = await SHARP(buffer, { failOn: 'none' }).metadata();
    const width = Number(metadata?.width);
    const height = Number(metadata?.height);
    if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
      return { width, height };
    }
  } catch (err) {
    log.debug(LOG_TAG, 'Could not resolve buffer dimensions via sharp; falling back to path cache if possible.', {
      fallbackPath,
      err
    });
  }

  if (fallbackPath) {
    try {
      return await handleWatermarkGetImageDimensions(LOG_TAG, fallbackPath);
    } catch (_) { /* ignore and fallback below */ }
  }

  return { width: Infinity, height: Infinity };
}

async function handleImageVariantResizeBuffer(LOG_TAG, buffer, maxBound) {
  LOG_TAG = LOG_TAG + ' [🖼️ Resize Variant]';

  const SHARP = require('sharp');
  SHARP.simd(true);
  SHARP.concurrency(HARDWARE_CPU_THREAD_COUNT);

  const bound = Math.max(1, Math.round(Number(maxBound)));
  const resized = await SHARP(buffer, { failOn: 'none' })
    .resize({
      width: bound,
      height: bound,
      fit: 'inside',
      withoutEnlargement: true
    })
    .toBuffer();

  log.debug(LOG_TAG, 'Variant resized:', {
    maxBound: bound
  });

  return resized;
}

function handleHasGraphicsMagick() {
  const LOG_TAG_GRAPHICSMAGICK = '[🧙 GraphicsMagick]';
  const LOG_TAG_GRAPHICSMAGICK_SEARCH = LOG_TAG_GRAPHICSMAGICK + ' [🔍 Search]';

  log.begin(LOG_TAG_GRAPHICSMAGICK_SEARCH, "Running...");

  try {
    const NODE_GRAPHICSMAGICK = require('gm');
    const { execFileSync } = require('child_process');

    // Prefer subclass appPath if your build sets it; otherwise use 'gm'.
    // Note: using execFileSync(cmd, ['-version']) avoids quoting issues.
    const gmCmd =
      /** @type {any} */ (NODE_GRAPHICSMAGICK)?._options?.appPath || // tolerate private hint if present
      'gm';

    // Try to resolve an absolute path for logging (best-effort).
    // Windows: 'where gm', *nix: 'which gm'. Keep local to minimize churn.
    let resolvedPath = null;
    try {
      const whichTool = process.platform === 'win32' ? 'where' : 'which';
      const out = execFileSync(whichTool, [gmCmd], { encoding: 'utf8', windowsHide: true });
      const first = String(out).split(/\r?\n/).map(s => s.trim()).find(Boolean);
      if (first) resolvedPath = first;
    } catch { /* not fatal; gm may still run via direct cmd */ }

    const output = execFileSync(gmCmd, ['-version'], { encoding: 'utf8', windowsHide: true });
    const banner = String(output).split(/\r?\n/, 1)[0] || output.trim();

    log.success(LOG_TAG_GRAPHICSMAGICK_SEARCH, "Found.", {
      cmd: resolvedPath || gmCmd,
      banner
    });
    log.debug(LOG_TAG_GRAPHICSMAGICK_SEARCH, "Version (full):", output.trim());
    log.end(LOG_TAG_GRAPHICSMAGICK_SEARCH, "Complete.");
    return true;
  } catch (error) {
    const err = /** @type {Error & { code?: string|number }} */ (error);
    log.error(LOG_TAG_GRAPHICSMAGICK_SEARCH, "Not found or misconfigured:", {
      message: err?.message ?? String(error),
      code: err?.code ?? null
    });

    // -----------------------------------------------------------------------------
    // OS-aware install help (shown once at process exit)
    // -----------------------------------------------------------------------------
    /** @returns {string} */
    const buildInstallHelp = () => {
      const nl = '\n';
      const hdr = 'GraphicsMagick is required by image tasks. See related error in log above. Install with one of:' + nl;
      switch (process.platform) {
        case 'win32': {
          return [
            hdr,
            '• Winget:',
            '  winget install GraphicsMagick.GraphicsMagick',
            '• Chocolatey:',
            '  choco install graphicsmagick',
            '• Scoop:',
            '  scoop install graphicsmagick',
            '',
            'After install, restart your shell so PATH updates are picked up.'
          ].join(nl);
        }
        case 'darwin': {
          return [
            hdr,
            '• Homebrew:',
            '  brew update && brew install graphicsmagick',
            '• MacPorts (alternative):',
            '  sudo port selfupdate && sudo port install GraphicsMagick'
          ].join(nl);
        }
        default: {
          // Broad Linux guidance (cover major distros)
          return [
            hdr,
            '• Debian / Ubuntu:',
            '  sudo apt-get update && sudo apt-get install -y graphicsmagick',
            '• Fedora / RHEL / CentOS (DNF):',
            '  sudo dnf install -y GraphicsMagick',
            '  # or on older systems:',
            '  sudo yum install -y GraphicsMagick',
            '• Arch:',
            '  sudo pacman -Syu --noconfirm graphicsmagick',
            '• openSUSE:',
            '  sudo zypper install -y GraphicsMagick',
            '',
            'If your distro uses a different package name, search your package manager for "graphicsmagick".'
          ].join(nl);
        }
      }
    };

    // Queue a concise, OS-specific help block to be printed once on exit
    log.replayOnExit('notice', LOG_TAG_GRAPHICSMAGICK_SEARCH, buildInstallHelp());
    return false;
  }
}

async function primaryImage(done) {
  const LOG_TAG_IMAGE = '[🖼️ Image]';
  const LOG_TAG_IMAGE_WATERMARK = LOG_TAG_IMAGE + ' [💧 Watermark]';
  let pruneResult = null;

  log.begin(LOG_TAG_IMAGE, 'Running...');
  const op = logProcessingStart(LOG_TAG_IMAGE, 'image build');

  try {
    pruneResult = libraryPruneFromInput({
      cacheNamespace: CACHE_NAMESPACE_IMAGE,
      logTag: LOG_TAG_IMAGE
    });

  } catch (err) {
    log.error(LOG_TAG_IMAGE, 'During prune:', err);
    log.end(LOG_TAG_IMAGE, 'Complete.');
    return done(err);
  }

  const NODE_IMAGEMIN           = (await import('imagemin')).default;
  const NODE_IMAGEMIN_GIFSICLE  = (await import('imagemin-gifsicle')).default;
  const NODE_IMAGEMIN_JPEGOPTIM = (await import('imagemin-jpegoptim')).default;
  const NODE_IMAGEMIN_MOZJPEG   = (await import('imagemin-mozjpeg')).default;
  const NODE_IMAGEMIN_OPTIPNG   = (await import('imagemin-optipng')).default;
  const NODE_IMAGEMIN_PNGCRUSH  = (await import('imagemin-pngcrush')).default;
  const NODE_IMAGEMIN_SVGO      = (await import('imagemin-svgo')).default;

  // Clone minify options from config
  const CONFIG_PROJECT_OPTION_IMAGE_MINIFY = NODE_CURE_JSON.clone(configProjectMerge.option.image.minify || {});

  // Provide safe defaults if not present in config
  CONFIG_PROJECT_OPTION_IMAGE_MINIFY.gifsicle  = CONFIG_PROJECT_OPTION_IMAGE_MINIFY.gifsicle  || { interlaced: true };
  CONFIG_PROJECT_OPTION_IMAGE_MINIFY.jpegoptim = CONFIG_PROJECT_OPTION_IMAGE_MINIFY.jpegoptim || { progressive: true };
  CONFIG_PROJECT_OPTION_IMAGE_MINIFY.mozjpeg   = CONFIG_PROJECT_OPTION_IMAGE_MINIFY.mozjpeg   || { quality: 75, progressive: true };
  CONFIG_PROJECT_OPTION_IMAGE_MINIFY.optipng   = CONFIG_PROJECT_OPTION_IMAGE_MINIFY.optipng   || { optimizationLevel: 5 };
  CONFIG_PROJECT_OPTION_IMAGE_MINIFY.pngcrush  = CONFIG_PROJECT_OPTION_IMAGE_MINIFY.pngcrush  || { reduce: true, strip: true };
  CONFIG_PROJECT_OPTION_IMAGE_MINIFY.svgo      = CONFIG_PROJECT_OPTION_IMAGE_MINIFY.svgo      || { plugins: [{ name: 'removeViewBox', active: true }] };

  // Build SVGO plugin list directly from config
  const svgoPlugins = Array.isArray(CONFIG_PROJECT_OPTION_IMAGE_MINIFY.svgo.plugins)
    ? CONFIG_PROJECT_OPTION_IMAGE_MINIFY.svgo.plugins
    : [];

  const MINIFY_FILTER = CONFIG_PROJECT_OPTION_IMAGE_MINIFY.filter || {};
  const MINIFY_FILTER_INCLUDE = libraryVariableEnsureIsArray(MINIFY_FILTER.include).filter(v => typeof v === 'string' && v.trim());
  const MINIFY_FILTER_EXCLUDE = libraryVariableEnsureIsArray(MINIFY_FILTER.exclude).filter(v => typeof v === 'string' && v.trim());
  const MINIFY_FILTER_INCLUDE_EFFECTIVE = MINIFY_FILTER_INCLUDE.length > 0 ? MINIFY_FILTER_INCLUDE : ['**/*'];

  const NODE_IMAGEMIN_PLUGINS = [
    NODE_IMAGEMIN_GIFSICLE(CONFIG_PROJECT_OPTION_IMAGE_MINIFY.gifsicle),

    // JPEG: recompress first, then strip/optimize losslessly
    NODE_IMAGEMIN_MOZJPEG(CONFIG_PROJECT_OPTION_IMAGE_MINIFY.mozjpeg),
    NODE_IMAGEMIN_JPEGOPTIM(CONFIG_PROJECT_OPTION_IMAGE_MINIFY.jpegoptim),

    // Recommended order for PNGs:
    NODE_IMAGEMIN_PNGCRUSH(CONFIG_PROJECT_OPTION_IMAGE_MINIFY.pngcrush),
    NODE_IMAGEMIN_OPTIPNG(CONFIG_PROJECT_OPTION_IMAGE_MINIFY.optipng),

    NODE_IMAGEMIN_SVGO({ ...CONFIG_PROJECT_OPTION_IMAGE_MINIFY.svgo, plugins: svgoPlugins })
  ];

  const NODE_MINIMATCH = require('minimatch');
  function shouldMinifyImage(filePathSourceAbs) {
    const relativePath = NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, filePathSourceAbs);
    const includeMatch = MINIFY_FILTER_INCLUDE_EFFECTIVE.some(pattern =>
      NODE_MINIMATCH.minimatch(relativePath, pattern)
    );
    if (!includeMatch) {
      return false;
    }
    const excludeMatch = MINIFY_FILTER_EXCLUDE.some(pattern =>
      NODE_MINIMATCH.minimatch(relativePath, pattern)
    );
    return !excludeMatch;
  }

  const counters = { filtered: 0, processed: 0 };

  const WATERMARK_CONFIGS = libraryVariableEnsureIsArray(configProjectMerge.option.image?.watermark || []);
  const {
    CONFIGS_ISVALID: CONFIGS_INITIAL_ISVALID,
    validConfigs: WATERMARK_CONFIGS_VALID
  } = handleWatermarkConfigValidate(LOG_TAG_IMAGE_WATERMARK, WATERMARK_CONFIGS);

  const LOG_TAG_IMAGE_VARIANT = LOG_TAG_IMAGE + ' [🖼️ Variant]';
  const VARIANT_CONFIGS = libraryVariableEnsureIsArray(configProjectMerge.option.image?.variant || []);
  const {
    CONFIGS_ISVALID: VARIANT_CONFIGS_ISVALID,
    validConfigs: VARIANT_CONFIGS_VALID
  } = handleImageVariantConfigValidate(LOG_TAG_IMAGE_VARIANT, VARIANT_CONFIGS);

  let WATERMARK_CONFIGS_ISVALID = CONFIGS_INITIAL_ISVALID;

  if (!WATERMARK_CONFIGS_ISVALID) {
    log.error(LOG_TAG_IMAGE_WATERMARK, 'Watermarking skipped due to invalid configuration.');
  } else if (!handleHasGraphicsMagick()) {
    WATERMARK_CONFIGS_ISVALID = false;
    log.error(LOG_TAG_IMAGE_WATERMARK, 'Watermarking skipped due to missing GraphicsMagick.');
  }

  const FILE_PATHS_ALL = await libraryFileGetFilesFromPattern(PATH_FILE_PROJECT_IN_ASSET_IMAGE);

  if (!FILE_PATHS_ALL.length) {
    log.notice(LOG_TAG_IMAGE, 'No Images matched to process:', { path: PATH_FILE_PROJECT_IN_ASSET_IMAGE });
    done();
    return;
  }

  log.debug(LOG_TAG_IMAGE, 'Processing:', {
    "File Count": FILE_PATHS_ALL.length,
    "File Paths": FILE_PATHS_ALL
  });

  log.info(LOG_TAG_IMAGE, 'Filtering files by cache...', {
    "File Count": FILE_PATHS_ALL.length
  });

  const FILE_PATHS_IN = [];
  for (const FILE_PATH_IN of FILE_PATHS_ALL) {
    if (!cacheProjectFile.shouldProcessSync(CACHE_NAMESPACE_IMAGE, FILE_PATH_IN, counters)) {
      continue;
    }
    FILE_PATHS_IN.push(FILE_PATH_IN);
  }

  log.info(LOG_TAG_IMAGE, 'Processing queue:', {
    "File Count": FILE_PATHS_IN.length,
    "File Paths": FILE_PATHS_IN
  });

  const NODE_CURE_TIME = require('@custom/cure-time');
  let fileCurrent = 0;
  const buildImageProgressDetail = (filePathAbsolute) => ({
    "File Current": fileCurrent,
    "File Total": FILE_PATHS_IN.length,
    "File Path": NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, filePathAbsolute)
  });

  /**
   * @param {Buffer} bufferIn
   * @param {string} filePathSourceAbs
   * @param {string} filePathSourceRelative
   * @param {string} filePathOutAbs
   * @param {{width:number, height:number} | null} targetDimensionsOverride
   */
  const processImageOutput = async (
    bufferIn,
    filePathSourceAbs,
    filePathSourceRelative,
    filePathOutAbs,
    targetDimensionsOverride = null
  ) => {
    let workingBuffer = bufferIn;
    const progress = buildImageProgressDetail(filePathSourceAbs);
    const shouldMinify = shouldMinifyImage(filePathSourceAbs);

    const sizeBeforeKB = workingBuffer.length / 1024;

    let wasWatermarked = false;
    if (WATERMARK_CONFIGS_ISVALID) {
      const result = await handleWatermark(
        LOG_TAG_IMAGE_WATERMARK,
        workingBuffer,
        fileCurrent,
        FILE_PATHS_IN.length,
        filePathSourceAbs,
        filePathSourceRelative,
        WATERMARK_CONFIGS_VALID,
        targetDimensionsOverride
      );
      workingBuffer = result.buffer;
      wasWatermarked = result.wasApplied;
    }
    const sizeAfterWatermarkKB = workingBuffer.length / 1024;

    const resultInterlace = await applyInterlace(filePathSourceAbs, workingBuffer);
    workingBuffer = resultInterlace.buffer;
    const interlaceMode = resultInterlace.mode;
    const sizeAfterInterlaceKB = workingBuffer.length / 1024;

    let optimizedBuffer = workingBuffer;
    if (shouldMinify) {
      const optimizeOp = logProcessingStart(LOG_TAG_IMAGE, 'image optimize', {
        ...progress,
        "Step": "Optimize"
      });
      optimizedBuffer = Buffer.from(await NODE_IMAGEMIN.buffer(workingBuffer, {
        plugins: NODE_IMAGEMIN_PLUGINS
      }));
      const sizeAfterOptimizeKB = optimizedBuffer.length / 1024;
      logProcessingDone(LOG_TAG_IMAGE, optimizeOp, {
        ...progress,
        "Step": "Optimize",
        "Input (KB)": sizeAfterInterlaceKB.toFixed(2),
        "Output (KB)": sizeAfterOptimizeKB.toFixed(2)
      });
    } else {
      log.info(LOG_TAG_IMAGE, 'Skipped minify per filter:', {
        ...progress,
        "Step": "Optimize",
        "Input (KB)": sizeAfterInterlaceKB.toFixed(2)
      });
    }
    const sizeFinalKB = optimizedBuffer.length / 1024;

    const writeOp = logProcessingStart(LOG_TAG_IMAGE, 'image write output', {
      ...progress,
      "Step": "Write",
      "File Output Path": NODE_CURE_PATH.relative(PATH_DIR_PROJECT_OUT, filePathOutAbs)
    });
    await NODE_FS.promises.mkdir(NODE_PATH.dirname(filePathOutAbs), { recursive: true });
    await NODE_FS.promises.writeFile(filePathOutAbs, optimizedBuffer);
    logProcessingDone(LOG_TAG_IMAGE, writeOp, {
      ...progress,
      "Step": "Write",
      "File Output Path": NODE_CURE_PATH.relative(PATH_DIR_PROJECT_OUT, filePathOutAbs),
      "Output (KB)": sizeFinalKB.toFixed(2)
    });

    return {
      wasWatermarked,
      interlaceMode,
      minifyApplied: shouldMinify,
      sizeBeforeKB,
      sizeAfterWatermarkKB,
      sizeAfterInterlaceKB,
      sizeFinalKB
    };
  };

  for (const FILE_PATH_IN of FILE_PATHS_IN) {
    try {
      fileCurrent += 1;

      log.info(LOG_TAG_IMAGE, 'Processing file:', {
        "File Current": fileCurrent,
        "File Total": FILE_PATHS_IN.length,
        "File Path": NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN)
      });

      const TIME_FILE_BEGIN = process.hrtime.bigint(); // high precision start

      const FILE_PATH_IN_RELATIVE = NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN_ASSET_IMAGE, FILE_PATH_IN);
      const FILE_PATH_OUT = NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT_ASSET_IMAGE, FILE_PATH_IN_RELATIVE);

      let inputBuffer = await NODE_FS.promises.readFile(FILE_PATH_IN);

      const FILE_SIZE_ORIGINAL = inputBuffer.length / 1024; // in KB

      // 1) Bake EXIF orientation into pixels before any metadata stripping optimizers run.
      let autoOrientMode = "None";
      const resultAutoOrient = await applyAutoOrient(FILE_PATH_IN, inputBuffer);
      inputBuffer = resultAutoOrient.buffer;
      autoOrientMode = resultAutoOrient.mode;
      const FILE_SIZE_AFTER_AUTO_ORIENT = inputBuffer.length / 1024; // in KB

      const SOURCE_DIMENSIONS = await handleImageGetBufferDimensions(LOG_TAG_IMAGE_VARIANT, inputBuffer, FILE_PATH_IN);

      const mainResult = await processImageOutput(
        inputBuffer,
        FILE_PATH_IN,
        FILE_PATH_IN_RELATIVE,
        FILE_PATH_OUT,
        null
      );

      const variantOutputs = [];
      if (VARIANT_CONFIGS_ISVALID && VARIANT_CONFIGS_VALID.length > 0) {
        const matchedVariantConfigs = handleImageVariantConfigMatch(
          LOG_TAG_IMAGE_VARIANT,
          FILE_PATH_IN_RELATIVE,
          VARIANT_CONFIGS_VALID
        );

        const variantOutPathSeen = new Set([FILE_PATH_OUT]);
        const sourceExt = NODE_PATH.extname(FILE_PATH_IN).toLowerCase();
        const variantResizeSupported = ['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tif', '.tiff'].includes(sourceExt);

        for (const variantConfig of matchedVariantConfigs) {
          if (!variantResizeSupported) {
            log.warn(LOG_TAG_IMAGE_VARIANT, 'Skipping variant for unsupported source format.', {
              source: NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN),
              extension: sourceExt,
              suffix: variantConfig.suffix
            });
            continue;
          }

          const filePathVariantOut = handleImageVariantInsertSuffix(FILE_PATH_OUT, variantConfig.suffix);
          if (variantOutPathSeen.has(filePathVariantOut)) {
            log.warn(LOG_TAG_IMAGE_VARIANT, 'Skipping duplicate variant output path:', {
              source: NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN),
              variantOut: NODE_CURE_PATH.relative(PATH_DIR_PROJECT_OUT, filePathVariantOut),
              suffix: variantConfig.suffix
            });
            continue;
          }
          variantOutPathSeen.add(filePathVariantOut);

          const maxBound = handleImageVariantResolveMaxBound(variantConfig.size, SOURCE_DIMENSIONS);
          if (!Number.isFinite(maxBound) || maxBound <= 0) {
            log.warn(LOG_TAG_IMAGE_VARIANT, 'Skipping variant with unresolved size:', {
              source: NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN),
              variantConfig,
              sourceDimensions: SOURCE_DIMENSIONS
            });
            continue;
          }

          let variantBuffer = await handleImageVariantResizeBuffer(LOG_TAG_IMAGE_VARIANT, inputBuffer, maxBound);
          const variantDimensions = await handleImageGetBufferDimensions(
            LOG_TAG_IMAGE_VARIANT,
            variantBuffer,
            FILE_PATH_IN
          );

          const variantResult = await processImageOutput(
            variantBuffer,
            FILE_PATH_IN,
            FILE_PATH_IN_RELATIVE,
            filePathVariantOut,
            variantDimensions
          );

          variantOutputs.push({
            path: NODE_CURE_PATH.relative(PATH_DIR_PROJECT_OUT, filePathVariantOut),
            suffix: variantConfig.suffix,
            size: variantConfig.size,
            watermarked: variantResult.wasWatermarked,
            interlace: variantResult.interlaceMode,
            finalSizeKB: variantResult.sizeFinalKB.toFixed(2)
          });
        }
      }

      const cacheStoreOp = logProcessingStart(LOG_TAG_IMAGE, 'image cache store', {
        ...buildImageProgressDetail(FILE_PATH_IN),
        "Step": "Cache Store"
      });
      await cacheProjectFile.store(CACHE_NAMESPACE_IMAGE, FILE_PATH_IN);
      logProcessingDone(LOG_TAG_IMAGE, cacheStoreOp, {
        ...buildImageProgressDetail(FILE_PATH_IN),
        "Step": "Cache Store",
        "Namespace": CACHE_NAMESPACE_IMAGE
      });

      const TIME_FILE_END = process.hrtime.bigint();

      const logInfo = {
        "File Current": fileCurrent,
        "File Total": FILE_PATHS_IN.length,
        "File Path": NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN),
        "Applied": {
          "AutoOrient": autoOrientMode,
          "Watermark": mainResult.wasWatermarked ? "Applied": "None",
          "Interlace": mainResult.interlaceMode,
          "Minify": mainResult.minifyApplied ? "Applied" : "Skipped (Filter)"
        },
        "Size": {
          "Original": FILE_SIZE_ORIGINAL.toFixed(2) + ' KB'
        },
        "Time": NODE_CURE_TIME.formatDuration(Number(TIME_FILE_END - TIME_FILE_BEGIN)),
        "Variants": variantOutputs.length
      };

      if (autoOrientMode.toLowerCase() !== 'none') {
        logInfo["Size"]["After AutoOrient"] = FILE_SIZE_AFTER_AUTO_ORIENT.toFixed(2) + ' KB (' +
          (FILE_SIZE_AFTER_AUTO_ORIENT / FILE_SIZE_ORIGINAL).toFixed(2) + 'x)';
      }

      if (mainResult.wasWatermarked) {
        logInfo["Size"]["After Watermark"] = mainResult.sizeAfterWatermarkKB.toFixed(2) + ' KB (' +
          (mainResult.sizeAfterWatermarkKB / FILE_SIZE_ORIGINAL).toFixed(2) + 'x)';
      }

      if (mainResult.interlaceMode.toLowerCase() !== 'none') {
        logInfo["Size"]["After Interlace"] = mainResult.sizeAfterInterlaceKB.toFixed(2) + ' KB (' +
          (mainResult.sizeAfterInterlaceKB / FILE_SIZE_ORIGINAL).toFixed(2) + 'x)';
      }

      logInfo["Size"]["After Optimize"] = mainResult.sizeFinalKB.toFixed(2) + ' KB (' + (mainResult.sizeFinalKB / mainResult.sizeAfterWatermarkKB).toFixed(2) + 'x)';
      logInfo["Size"]["Total Change"] = (mainResult.sizeFinalKB / FILE_SIZE_ORIGINAL).toFixed(2) + 'x (' +
        (mainResult.sizeFinalKB < FILE_SIZE_ORIGINAL ? 'Saved' : 'Increased') +
        ` ${(Math.abs(1 - mainResult.sizeFinalKB / FILE_SIZE_ORIGINAL) * 100).toFixed(1)}%)`;

      if (variantOutputs.length > 0) {
        logInfo["Variant Output"] = variantOutputs;
      }

      log.success(LOG_TAG_IMAGE, 'Processed:', logInfo);

    } catch (err) {
      log.error(LOG_TAG_IMAGE, 'Error during file processing:', { path: FILE_PATH_IN, error: err });
    }
  }

  // cacheProjectFile.save();


  log.info(LOG_TAG_IMAGE, 'File Summary:', {
    ...counters,
    total: FILE_PATHS_IN.length
  });

  logProcessingDone(LOG_TAG_IMAGE, op);
  log.end(LOG_TAG_IMAGE, 'Complete.');
  done();
}

// -----------------------------------------------------------------------------
// #### Main - Process - JavaScript
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_JAVASCRIPT = 'javascript';

const PATH_DIR_PROJECT_IN_ASSET_JAVASCRIPT  = `${PATH_DIR_PROJECT_IN_ASSET}js/`;
const PATH_DIR_PROJECT_OUT_ASSET_JAVASCRIPT = `${PATH_DIR_PROJECT_OUT_ASSET}js/`;
const PATH_FILE_PROJECT_IN_ASSET_JAVASCRIPT = `${PATH_DIR_PROJECT_IN_ASSET_JAVASCRIPT}${PATH_ALL}.js`;
const PATH_FILE_PROJECT_IN_ASSET_JAVASCRIPT_WATCH = [
  PATH_FILE_PROJECT_IN_ASSET_JAVASCRIPT,
  ...PATH_DIR_IN_IGNORE_PROJECT
];
const PATH_FILE_PROJECT_IN_ASSET_JAVASCRIPT_WATCH_INCLUDE = createPathArray(PATH_DIR_PROJECT_IN_ASSET_JAVASCRIPT, false);

/**
 * Compute the emitted bundle path for a JavaScript entry file.
 *
 * @param {string} filePathIn
 * @returns {string}
 */
function getJavaScriptOutputPath(filePathIn) {
  const relativePath = NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN_ASSET_JAVASCRIPT, filePathIn);
  const parsed = NODE_PATH.parse(relativePath);
  return NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT_ASSET_JAVASCRIPT, parsed.dir, `${parsed.name}.min.js`);
}

/**
 * `build_highlight_syntax` generates Prism sources under `in/asset/js/module/prism/**`.
 * Treat the generated Prism entry as a synthetic bundle root and always rebuild it when
 * `build_javascript` runs. Its effective dependency set is generated and can change even
 * when the entry file checksum alone does not.
 *
 * @param {string} filePathIn
 * @returns {boolean}
 */
function shouldForceProcessJavaScriptEntry(filePathIn) {
  const highlightSyntaxConfig = configProjectMerge?.option?.highlight?.syntax;
  if (!highlightSyntaxConfig || !highlightSyntaxConfig.enable) {
    return false;
  }

  const prismEntryPath = NODE_PATH.resolve(getHighlightSyntaxOutputBaseDirs(highlightSyntaxConfig).js, 'prism.js');
  const entryPath = NODE_PATH.resolve(filePathIn);

  if (entryPath !== prismEntryPath) {
    return false;
  }
  return true;
}

async function primaryJavaScript(done) {
  const LOG_TAG_JAVASCRIPT = '[📟 JavaScript]';
  const LOG_TAG_JAVASCRIPT_BROWSERIFY = LOG_TAG_JAVASCRIPT + ' [🌐 Browserify]';
  let pruneResult = null;

  log.begin(LOG_TAG_JAVASCRIPT, 'Running...');
  const op = logProcessingStart(LOG_TAG_JAVASCRIPT, 'javascript build');

  try {
    pruneResult = libraryPruneFromInput({
      cacheNamespace: CACHE_NAMESPACE_JAVASCRIPT,
      logTag: LOG_TAG_JAVASCRIPT
    });

  } catch (err) {
    logProcessingFail(LOG_TAG_JAVASCRIPT, op, err);
    log.error(LOG_TAG_JAVASCRIPT, 'During prune:', err);
    log.end(LOG_TAG_JAVASCRIPT, 'Complete.');
    return done(err);
  }

  const NODE_GULP_STRIP_DEBUG    = (await import('gulp-strip-debug')).default;
  const NODE_GULP_UGLIFY_ES      = require('gulp-uglify-es').default;
  const NODE_BABELIFY            = require('babelify');
  const NODE_BROWSERIFY          = require('browserify');
  const NODE_VINYL_SOURCE_STREAM = require('vinyl-source-stream');
  const NODE_VINYL_BUFFER        = require('vinyl-buffer');
  // const NODE_GULP_SOURCEMAP      = require('gulp-sourcemaps');
  // const NODE_GULP_TAP            = require('gulp-tap');
  // const NODE_GULP_IF             = require('gulp-if');
  const NODE_GULP_OPTIONS        = require('gulp-options');

  const counters = { filtered: 0, processed: 0 };

  const FILE_PATHS_ALL = await libraryFileGetFilesFromPattern(PATH_FILE_PROJECT_IN_ASSET_JAVASCRIPT);

  log.debug(LOG_TAG_JAVASCRIPT, 'Processing:', {
    "File Count": FILE_PATHS_ALL.length,
    "File Paths": FILE_PATHS_ALL
  });

  log.info(LOG_TAG_JAVASCRIPT, 'Filtering files by cache...', {
    "File Count": FILE_PATHS_ALL.length
  });

  const FILE_PATHS_IN = [];
  for (const FILE_PATH_IN of FILE_PATHS_ALL) {
    let shouldProcess = cacheProjectFile.shouldProcessSync(CACHE_NAMESPACE_JAVASCRIPT, FILE_PATH_IN, counters);

    if (!shouldProcess && shouldForceProcessJavaScriptEntry(FILE_PATH_IN)) {
      shouldProcess = true;

      if (typeof counters.filtered === 'number' && counters.filtered > 0) {
        counters.filtered -= 1;
      }
      if (typeof counters.processed === 'number') {
        counters.processed += 1;
      }

      log.debug(LOG_TAG_JAVASCRIPT, 'Forcing rebuild because generated dependencies are newer than the bundle:', {
        entry: FILE_PATH_IN,
        output: getJavaScriptOutputPath(FILE_PATH_IN)
      });
    }

    if (!shouldProcess) {
      continue;
    }
    FILE_PATHS_IN.push(FILE_PATH_IN);
  }

  log.info(LOG_TAG_JAVASCRIPT, 'Processing queue:', {
    "File Count": FILE_PATHS_IN.length,
    "File Paths": FILE_PATHS_IN
  });

  let fileCurrent = 0;

  for (const FILE_PATH_IN of FILE_PATHS_IN) {
    fileCurrent += 1;

    const FILE_NAME = NODE_PATH.basename(FILE_PATH_IN);
    const FILE_PATH_IN_RELATIVE = NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN);

    log.info(LOG_TAG_JAVASCRIPT, 'Processing file:', {
      "File Current": fileCurrent,
      "File Total": FILE_PATHS_IN.length,
      "File Path": FILE_PATH_IN_RELATIVE
    });

    // `NODE_GULP_UGLIFY_ES.default` modifies it's argument, hence use of `NODE_CURE_JSON.clone`
    const NODE_GULP_UGLIFY_ES_OPTIONS = NODE_CURE_JSON.clone(configProjectMerge.option.js.minify);

    await new Promise((resolve, reject) => {
      NODE_BROWSERIFY({ entries: [FILE_PATH_IN], debug: true })
        .transform(NODE_BABELIFY, { presets: ['@babel/preset-env'] })
        .bundle()
        .on('error', (error) => {
          log.error(LOG_TAG_JAVASCRIPT_BROWSERIFY, 'Browserify error:', error);
          reject(error);
        })
        .pipe(NODE_VINYL_SOURCE_STREAM(FILE_NAME))
        .pipe(NODE_VINYL_BUFFER())
        .pipe(NODE_GULP_TAP(file => {
          file.base = PATH_DIR_PROJECT_IN_ASSET_JAVASCRIPT;
          file.path = FILE_PATH_IN;
        }))
        .pipe(NODE_GULP_SOURCEMAP.init({ loadMaps: true }))
        .pipe(NODE_GULP_IF(NODE_GULP_OPTIONS.has('production'), NODE_GULP_STRIP_DEBUG()))
        .pipe(NODE_GULP_UGLIFY_ES(NODE_GULP_UGLIFY_ES_OPTIONS))
        .pipe(libraryAppendBrandComment())
        .pipe(NODE_GULP_RENAME({ extname: '.min.js' }))
        .pipe(NODE_GULP_SOURCEMAP.write(PATH_DIR_OUT_SOURCEMAP))
        .pipe(NODE_GULP.dest(PATH_DIR_PROJECT_OUT_ASSET_JAVASCRIPT))
        .on('data', async (file) => {
          if (!file.path.endsWith('.map')) { // if is not sourcemap
            await cacheProjectFile.store(CACHE_NAMESPACE_JAVASCRIPT, FILE_PATH_IN);
            log.success(LOG_TAG_JAVASCRIPT, 'Processed:', {
              "File Current": fileCurrent,
              "File Total": FILE_PATHS_IN.length,
              "File Path": FILE_PATH_IN_RELATIVE
            });
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

  }


  log.info(LOG_TAG_JAVASCRIPT, 'File Summary:', {
    ...counters,
    total: FILE_PATHS_IN.length
  });

  logProcessingDone(LOG_TAG_JAVASCRIPT, op);
  log.end(LOG_TAG_JAVASCRIPT, 'Complete.');
  done();
}

// -----------------------------------------------------------------------------
// #### Main - Process - Mirror
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_MIRROR = 'mirror';
const PATH_DIR_MIRROR_ROOT = PATH_DIR_PROJECT;

function getMirrorCacheNamespace(source, destination) {
  const sourceKey = NODE_CURE_PATH.slashForward(
    NODE_CURE_PATH.relative(PATH_DIR_MIRROR_ROOT, source)
  );

  const destinationKey = NODE_CURE_PATH.slashForward(
    NODE_CURE_PATH.relative(PATH_DIR_MIRROR_ROOT, destination)
  );

  return `${CACHE_NAMESPACE_MIRROR}__${sourceKey}__${destinationKey}`;
}

function createNonRetryableBuildError(message, extra = {}) {
  const error = new Error(String(message || 'Build failed.'));
  error.noWatchRetry = true;
  Object.assign(error, extra);
  return error;
}

function validateMirrorSources(mirrorEntries = (configProjectMerge.option?.mirrors || []), pathDirRoot = PATH_DIR_MIRROR_ROOT) {
  const entries = Array.isArray(mirrorEntries) ? mirrorEntries : [];
  const invalidEntries = [];

  entries.forEach((entry, index) => {
    if (!entry || typeof entry !== 'object') {
      invalidEntries.push({
        index,
        reason: 'invalid-entry',
        entry
      });
      return;
    }

    const sourceRaw = String(entry.source || '');
    const destinationRaw = String(entry.destination || '');

    if (!sourceRaw || !destinationRaw) {
      invalidEntries.push({
        index,
        source: sourceRaw,
        destination: destinationRaw,
        reason: 'missing-source-or-destination'
      });
      return;
    }

    const sourceAbs = NODE_CURE_PATH.absolute(pathDirRoot, sourceRaw);
    if (!libraryPathExists(sourceAbs)) {
      invalidEntries.push({
        index,
        source: sourceRaw,
        resolved: sourceAbs,
        destination: destinationRaw,
        reason: 'source-missing'
      });
    }
  });

  if (invalidEntries.length === 0) return;

  throw createNonRetryableBuildError(
    `Mirror configuration has ${invalidEntries.length} invalid entr${invalidEntries.length === 1 ? 'y' : 'ies'}.`,
    {
      code: 'CONFIG_MIRROR_INVALID',
      invalidEntries
    }
  );
}

function primaryMirror(done) {
  const LOG_TAG_MIRROR = '[📁 Mirror]';
  log.begin(LOG_TAG_MIRROR, 'Running...');
  const op = logProcessingStart(LOG_TAG_MIRROR, 'mirror build');

  const CONFIG_OPTION_MIRRORS = configProjectMerge.option?.mirrors || [];

  if (CONFIG_OPTION_MIRRORS.length == 0) {
    log.notice(LOG_TAG_MIRROR, 'No mirror configuration found.');
    logProcessingDone(LOG_TAG_MIRROR, op, { skipped: true });
    log.end(LOG_TAG_MIRROR, 'Complete.');
    done();
    return;
  }

  try {
    validateMirrorSources(CONFIG_OPTION_MIRRORS, PATH_DIR_MIRROR_ROOT);
  } catch (error) {
    logProcessingFail(LOG_TAG_MIRROR, op, error, {
      invalidEntries: error?.invalidEntries || []
    });
    log.error(LOG_TAG_MIRROR, 'Mirror configuration validation failed.', {
      error: String(error?.message || error),
      invalidEntries: error?.invalidEntries || []
    });
    log.end(LOG_TAG_MIRROR, 'Complete.');
    done(error);
    return;
  }

  // Cleanup orphaned mirror cache namespaces (e.g., removed/renamed mirror sources).
  (function cleanupOrphanMirrorNamespaces() {
    const LOG_TAG_MIRROR_CLEAN = LOG_TAG_MIRROR + ' [🧹 Cache Cleanup]';

    /** @type {Set<string>} */
    const validNamespaces = new Set();

    for (const m of CONFIG_OPTION_MIRRORS) {
      if (!m || !m.source || !m.destination) continue;
      const sourceAbs = NODE_CURE_PATH.absolute(PATH_DIR_MIRROR_ROOT, m.source);
      const destAbs = NODE_CURE_PATH.absolute(PATH_DIR_MIRROR_ROOT, m.destination);
      const ns = getMirrorCacheNamespace(sourceAbs, destAbs);
      validNamespaces.add(ns);
      validNamespaces.add(ns.replace(/^mirror__/, 'mirror_out__'));
    }

    let cacheDisk = {};
    try {
      cacheDisk = NODE_FS.existsSync(PATH_FILE_PROJECT_CACHE_FILE)
        ? (NODE_CURE_JSON.load(PATH_FILE_PROJECT_CACHE_FILE, { fatal: false }) || {})
        : {};
    } catch (e) {
      cacheDisk = {};
    }

    const diskKeys = Object.keys(cacheDisk || {});
    const orphanNamespaces = diskKeys.filter(ns =>
      (ns.startsWith('mirror__') || ns.startsWith('mirror_out__')) && !validNamespaces.has(ns)
    );

    if (orphanNamespaces.length === 0) return;

    let removedNs = 0;
    let removedOutFiles = 0;

    for (const ns of orphanNamespaces) {
      // If this is a mirror_out__ namespace, remove recorded output files (best effort).
      if (ns.startsWith('mirror_out__')) {
        const entries = cacheDisk[ns] && typeof cacheDisk[ns] === 'object' ? cacheDisk[ns] : {};
        for (const [outRelRaw] of Object.entries(entries)) {
          const outRel = NODE_CURE_PATH.slashForward(String(outRelRaw || ''));
          if (!outRel) continue;
          const outAbs = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN, outRel);
          try {
            if (libraryPathExists(outAbs) && libraryPathIsFile(outAbs)) {
              NODE_CURE_FS.deleteSync([outAbs], { force: true });
              removeEmptyParentDirs(outAbs, PATH_DIR_PROJECT);
              removedOutFiles++;
            }
          } catch (_) {
            // ignore best-effort deletion failures
          }
        }
      }

      delete cacheDisk[ns];
      removedNs++;

      try {
        if (cacheProjectFile && cacheProjectFile.entries && cacheProjectFile.entries[ns]) {
          cacheProjectFile.clear(ns);
        }
      } catch (_) {}
    }

    try {
      NODE_CURE_JSON.save(PATH_FILE_PROJECT_CACHE_FILE, cacheDisk, { sort: true });
    } catch (e) {
      log.warn(LOG_TAG_MIRROR_CLEAN, 'Failed to save cache after cleanup; continuing.', {
        error: String(e?.message || e)
      });
      return;
    }

    log.info(LOG_TAG_MIRROR_CLEAN, 'Removed orphan mirror namespaces.', {
      namespaces: orphanNamespaces,
      removedOutFiles
    });
  })();

  const mirrorTasks = CONFIG_OPTION_MIRRORS.map(async (/** @type {{ source: string; destination: string; match_pattern: any; rename?: string | Array<{ pattern?: string; regex?: string; flags?: string; to?: string }>; }} */ CONFIG_OPTION_MIRROR) => {
    try {
      const CONFIG_OPTION_MIRROR_SOURCE      = NODE_CURE_PATH.absolute(PATH_DIR_MIRROR_ROOT, CONFIG_OPTION_MIRROR.source);
      const CONFIG_OPTION_MIRROR_DESTINATION = NODE_CURE_PATH.absolute(PATH_DIR_MIRROR_ROOT, CONFIG_OPTION_MIRROR.destination);
      const CONFIG_OPTION_MIRROR_SOURCE_IS_FILE = libraryPathIsFile(CONFIG_OPTION_MIRROR_SOURCE);

      // Determine match patterns
      let matchPatterns = CONFIG_OPTION_MIRROR.match_pattern;
      if (!matchPatterns) {
        matchPatterns = CONFIG_OPTION_MIRROR_SOURCE_IS_FILE
          ? NODE_PATH.basename(CONFIG_OPTION_MIRROR_SOURCE)
          : '**/*';
      }

      const MATCH_PATTERN = libraryVariableEnsureIsArray(matchPatterns)
        .filter(p => {
          if (typeof p === 'string') return true;
          log.error(LOG_TAG_MIRROR, 'Invalid mirror match pattern entry; expected string. Skipping pattern.', {
            source: CONFIG_OPTION_MIRROR.source,
            destination: CONFIG_OPTION_MIRROR.destination,
            pattern: p
          });
          return false;
        })
        .map(p => {
          const isNegated = p.startsWith('!');
          const patternCore = isNegated ? p.slice(1) : p;

          const fullPattern = CONFIG_OPTION_MIRROR_SOURCE_IS_FILE
            ? CONFIG_OPTION_MIRROR_SOURCE // file path, use as-is
            : NODE_CURE_PATH.absolute(CONFIG_OPTION_MIRROR_SOURCE, patternCore); // directory + pattern

          return isNegated ? `!${fullPattern}` : fullPattern;
        });

      if (!MATCH_PATTERN.length) {
        log.error(LOG_TAG_MIRROR, 'No valid mirror patterns resolved for entry. Skipping.', {
          source: CONFIG_OPTION_MIRROR.source,
          destination: CONFIG_OPTION_MIRROR.destination
        });
        return;
      }

      const CACHE_NAMESPACE_MIRROR_ENTRY = getMirrorCacheNamespace(CONFIG_OPTION_MIRROR_SOURCE, CONFIG_OPTION_MIRROR_DESTINATION);

      await handleFileCopy(
        LOG_TAG_MIRROR,
        CACHE_NAMESPACE_MIRROR_ENTRY,
        CONFIG_OPTION_MIRROR_SOURCE_IS_FILE ? NODE_PATH.dirname(CONFIG_OPTION_MIRROR_SOURCE) : CONFIG_OPTION_MIRROR_SOURCE,
        MATCH_PATTERN,
        CONFIG_OPTION_MIRROR_DESTINATION,
        cacheProjectFile,
        true,
        {
          rename: CONFIG_OPTION_MIRROR.rename,
          flatten: CONFIG_OPTION_MIRROR_SOURCE_IS_FILE
        }
      );
    } catch (err) {
      log.error(LOG_TAG_MIRROR, 'Mirror entry failed; continuing with next entry.', {
        source: CONFIG_OPTION_MIRROR?.source,
        destination: CONFIG_OPTION_MIRROR?.destination,
        error: err
      });
    }
  });

  Promise.all(mirrorTasks)
    .then(() => {
      logProcessingDone(LOG_TAG_MIRROR, op, { skipped: false, mirrors: CONFIG_OPTION_MIRRORS.length });
      log.end(LOG_TAG_MIRROR, 'Complete.');
      done();
    })
    .catch((err) => {
      logProcessingFail(LOG_TAG_MIRROR, op, err);
      log.error(LOG_TAG_MIRROR, 'Unexpected mirror Promise aggregation failure:', err);
      log.end(LOG_TAG_MIRROR, 'Complete.');
      done();
    });
}

function handleResetMirror(done) {
  const LOG_TAG_RESET_MIRROR = '[🧹 Mirror Reset]';
  log.begin(LOG_TAG_RESET_MIRROR, 'Running...');

  let mirrorPaths = [];
  /** @type {Set<string>} */
  const mirrorNamespaces = new Set();

  try {
    const cacheData =
      (cacheProjectFile && cacheProjectFile.entries && Object.keys(cacheProjectFile.entries).length)
        ? cacheProjectFile.entries
        : (
          NODE_FS.existsSync(PATH_FILE_PROJECT_CACHE_FILE)
            ? (NODE_CURE_JSON.load(PATH_FILE_PROJECT_CACHE_FILE, { fatal: false }) || {})
            : {}
        );

    let foundMirrorOut = false;

    // 1) Prefer mirror_out__ namespaces (these store exact output file keys)
    for (const [cacheKey, cacheEntries] of Object.entries(cacheData || {})) {
      if (!cacheKey.startsWith('mirror_out__')) continue;

      foundMirrorOut = true;
      mirrorNamespaces.add(cacheKey);

      for (const [outFileRelRaw] of Object.entries(cacheEntries || {})) {
        const outFileRel = NODE_CURE_PATH.slashForward(outFileRelRaw);
        const outFileAbs = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN, outFileRel);
        mirrorPaths.push(NODE_CURE_PATH.slashForward(outFileAbs));
      }
    }

    // 2) Always also clear mirror__ namespaces (input keys) and,
    //    if mirror_out__ wasn't available (older cache), use the old mapping fallback for deletions.
    for (const [cacheKey, cacheEntries] of Object.entries(cacheData || {})) {
      if (!cacheKey.startsWith('mirror__')) continue;

      mirrorNamespaces.add(cacheKey);

      if (foundMirrorOut) {
        // deletion list already built from mirror_out__
        continue;
      }

      // BACKWARD COMPAT: old behavior (no rename support)
      const [, sourceRel, destRel] = cacheKey.split('__');

      const resolvedSource = NODE_CURE_PATH.absolute(PATH_DIR_MIRROR_ROOT, sourceRel);
      const resolvedDest   = NODE_CURE_PATH.absolute(PATH_DIR_MIRROR_ROOT, destRel);

      for (const [sourceFileRelRaw] of Object.entries(cacheEntries || {})) {
        const sourceFileRel = NODE_CURE_PATH.slashForward(sourceFileRelRaw);
        const sourceFileAbs = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT_IN, sourceFileRel);

        const relativeFromSource = NODE_CURE_PATH.slashForward(
          NODE_CURE_PATH.relative(resolvedSource, sourceFileAbs)
        );

        const destinationFileAbs = relativeFromSource
          ? NODE_CURE_PATH.absolute(resolvedDest, relativeFromSource)
          : NODE_CURE_PATH.absolute(resolvedDest, NODE_PATH.basename(sourceFileAbs));

        mirrorPaths.push(NODE_CURE_PATH.slashForward(destinationFileAbs));
      }
    }

    // Filter out non-existent files so we only try to delete real files
    const [validPaths, removedPaths] = mirrorPaths.reduce(
      ([yes, no], p) =>
        libraryPathIsFile(p) ? [[...yes, p], no] : [yes, [...no, p]],
      [[], []]
    );

    mirrorPaths = validPaths;

    log.detail(LOG_TAG_RESET_MIRROR, '🗑️ Removed non-file paths:', removedPaths);
    log.notice(LOG_TAG_RESET_MIRROR, '🧹 Final destination files to remove:', { mirrorPaths });
  } catch (error) {
    log.error(LOG_TAG_RESET_MIRROR, '❌ Failed to compute mirror reset files:', error);
    return done(error);
  }

  // 1) Clear ALL mirror__* and mirror_out__* namespaces so the cache truly resets
  try {
    mirrorNamespaces.forEach(ns => {
      cacheProjectFile.clear(ns);
    });
  } catch (err) {
    log.error(LOG_TAG_RESET_MIRROR, '❌ Failed clearing mirror cache namespaces:', err);
    return done(err);
  }

  // 2) Delete the mirrored destination files
  try {
    mirrorPaths.forEach(p => {
      if (libraryPathExists(p)) {
        NODE_CURE_FS.deleteSync([p], { force: true });
        removeEmptyParentDirs(p, PATH_DIR_PROJECT);
        log.success(LOG_TAG_RESET_MIRROR, 'Deleted:', p);
      }
    });
  } catch (err) {
    log.error(LOG_TAG_RESET_MIRROR, '❌ Failed deleting mirrored files:', err);
    return done(err);
  }

  log.end(LOG_TAG_RESET_MIRROR, 'Complete.');
  done();
}

// -----------------------------------------------------------------------------
// #### Main - Process - Module
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_MODULE = 'module';

const PATH_DIR_PROJECT_IN_ASSET_MODULE  = `${PATH_DIR_PROJECT_IN_ASSET}module/`;
const PATH_DIR_PROJECT_OUT_ASSET_MODULE = `${PATH_DIR_PROJECT_OUT_ASSET}module/`;
const PATH_FILE_PROJECT_IN_ASSET_MODULE = [
  `${PATH_DIR_PROJECT_IN_ASSET_MODULE}${PATH_ALL}`,
  ...PATH_DIR_IN_IGNORE_PROJECT
];

async function primaryModule(done) {
  const LOG_TAG_MODULE = '[🗂️ Module]';

  log.begin(LOG_TAG_MODULE, 'Running...');
  const op = logProcessingStart(LOG_TAG_MODULE, 'module copy');

  try {
    await handleFileCopy(
      LOG_TAG_MODULE,
      CACHE_NAMESPACE_MODULE,
      PATH_DIR_PROJECT_IN_ASSET_MODULE,
      PATH_FILE_PROJECT_IN_ASSET_MODULE,
      PATH_DIR_PROJECT_OUT_ASSET_MODULE,
      cacheProjectFile,
      true,
      {
        prune: {
          // Module is a direct mirror copy task. Prune the mirrored out path itself.
          relatedOutResolver: ({ outAbsBase }) => [outAbsBase]
        }
      }
    );
    logProcessingDone(LOG_TAG_MODULE, op);
  } catch (error) {
    logProcessingFail(LOG_TAG_MODULE, op, error);
    return done(error);
  }

  log.end(LOG_TAG_MODULE, 'Complete.');

  done();
};

// -----------------------------------------------------------------------------
// #### Main - Process - Normalize Paths (lower-hyphen input dir + update references in text files)
// CONTRACT (NORMALIZE PATHS): best-effort broad normalization pass.
// - Goal is broad lower-hyphen normalization for paths and textual path references.
// - This task is intentionally wider in scope than migrations.
// -----------------------------------------------------------------------------

const LOG_TAG_NORMALIZE_PATHS = '[🔤 Normalize Paths]';

/**
 * Normalize a path segment to lowercase lower-hyphen.
 * - Preserves the extension (for files).
 * - Collapses illegal chars into hyphens.
 * @param {string} segment
 * @param {{preserveExtension?: boolean}} [opt]
 * @returns {string}
 */
function normalizePathSegment(segment, opt = {}) {
  const preserveExtension = opt.preserveExtension !== false;

  const s = String(segment || '');

  // Skip empties
  if (!s) return s;

  /**
   * Convert mixed/camel/pascal segment core into lower-hyphen.
   * Examples:
   * - "ArchitectsDaughter" -> "architects-daughter"
   * - "XMLHttpRequest"     -> "xml-http-request"
   *
   * @param {string} core
   * @returns {string}
   */
  const normalizeCore = (core) => {
    const ATAT_PLACEHOLDER = 'codexatatplaceholder987654321';
    return String(core || '')
      // Keep gulp-file-include style tokens stable through normalization.
      .replace(/@@/g, ATAT_PLACEHOLDER)
      .normalize('NFKD')
      .replace(/['"]/g, '')
      // Split acronym->word boundaries first: "XMLHttp" -> "XML-Http"
      .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
      // Split lower/digit->upper boundaries: "fooBar2X" -> "foo-Bar2-X"
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[^a-zA-Z0-9.]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()
      .replace(new RegExp(ATAT_PLACEHOLDER, 'g'), '@@');
  };

  /**
   * Preserve trailing "-RRGGBB" suffixes used by font-icon color naming.
   * Keep the suffix intact (no extra split), but normalize hex letters to lowercase.
   * Example: 00Ac47 -> 00ac47
   *
   * @param {string} core
   * @returns {{stem: string, hexSuffix: string}}
   */
  const splitTrailingHexColorSuffix = (core) => {
    const m = String(core || '').match(/-([0-9a-fA-F]{6})$/);
    if (!m) return { stem: String(core || ''), hexSuffix: '' };
    return {
      stem: String(core || '').slice(0, -m[0].length),
      hexSuffix: `-${m[1].toLowerCase()}`
    };
  };

  // If file-like, keep extension
  if (preserveExtension && s.includes('.')) {
    const ext = NODE_PATH.extname(s);
    const base = s.slice(0, -ext.length);
    const { stem, hexSuffix } = splitTrailingHexColorSuffix(base);
    const stemNorm = normalizeCore(stem);

    const extNorm = ext.toLowerCase();
    const normalizedWithExt = ((stemNorm || stem.toLowerCase()) + hexSuffix) + extNorm;
    // Dotfiles like ".keep" can have empty ext+base via path.extname; never collapse to empty.
    return normalizedWithExt || s.toLowerCase();
  }

  // Safety fallback: never collapse a non-empty segment to empty.
  // This prevents parent-collapsing renames that can create "-dupN" artifacts.
  const { stem, hexSuffix } = splitTrailingHexColorSuffix(s);
  const normalized = normalizeCore(stem);
  return (normalized || stem.toLowerCase()) + hexSuffix;
}

/**
 * Decide whether a segment should be skipped (to avoid breaking special folders like _html).
 * @param {string} segment
 * @param {string} skipPrefix
 * @returns {boolean}
 */
function shouldSkipSegment(segment, skipPrefix) {
  const s = String(segment || '');
  if (!s) return true;
  if (!skipPrefix) return false;
  return s.startsWith(skipPrefix);
}

/**
 * Decode buffer as UTF-8 and fail fast on invalid decode artifacts.
 * Also strips a leading BOM marker.
 *
 * @param {Buffer} buffer
 * @param {string} [filePath]
 * @returns {string}
 */
function decodeUtf8StrictFromBuffer(buffer, filePath = '') {
  const text = Buffer.isBuffer(buffer) ? buffer.toString('utf8') : String(buffer || '');
  if (text.includes('\uFFFD')) {
    throw new Error(`Invalid UTF-8 decode${filePath ? `: ${filePath}` : ''}`);
  }
  return text.replace(/^\uFEFF/, '');
}

/**
 * Very small "binary vs text" detector.
 * Reads up to N bytes; if it has NULs or too many control chars, treat as binary.
 * @param {Buffer} buf
 * @returns {boolean}
 */
function bufferLooksText(buf) {
  if (!buf || !buf.length) return true;

  let nul = 0;
  let ctrl = 0;

  const max = Math.min(buf.length, 8192);
  for (let i = 0; i < max; i++) {
    const b = buf[i];

    if (b === 0) nul++;
    // Count non-whitespace ASCII controls
    if (b < 32 && b !== 9 && b !== 10 && b !== 13) ctrl++;
  }

  if (nul > 0) return false;
  if ((ctrl / max) > 0.08) return false;

  return true;
}

/**
 * Read file as text if it appears to be text.
 * @param {string} abs
 * @returns {{ok:boolean, text:string}}
 */
function readTextFileIfText(abs) {
  try {
    const buf = NODE_FS.readFileSync(abs);
    if (!bufferLooksText(buf)) return { ok: false, text: '' };

    // Strict UTF-8 only: skip suspicious decodes to avoid mojibake rewrites.
    const text = decodeUtf8StrictFromBuffer(buf, abs);
    return { ok: true, text };
  } catch (e) {
    return { ok: false, text: '' };
  }
}

/**
 * Recursively walk a directory.
 * @param {string} dirAbs
 * @returns {{files:string[], dirs:string[]}}
 */
function walkDirRecursive(dirAbs) {
  /** @type {string[]} */
  const files = [];
  /** @type {string[]} */
  const dirs = [];

  /** @param {string} cur */
  function walk(cur) {
    const entries = NODE_FS.readdirSync(cur, { withFileTypes: true });
    for (const ent of entries) {
      const abs = NODE_PATH.join(cur, ent.name);
      if (ent.isDirectory()) {
        dirs.push(abs);
        walk(abs);
      } else if (ent.isFile()) {
        files.push(abs);
      }
    }
  }

  walk(dirAbs);
  return { files, dirs };
}

/**
 * @param {string} rootAbs
 * @param {string[]} absPaths
 * @param {{skipPrefix?:string, collisionMode?:'suffix'|'overwrite'}} opt
 * @returns {{
 *   mapOldRelToNewRel: Map<string,string>,
 *   aliasMappings: Array<{from:string,to:string}>,
 *   dropRels: string[],
 *   collisions: number
 * }} normalized mapping payload
 */
function buildNormalizeMapping(rootAbs, absPaths, opt) {
  const skipPrefix = (opt && opt.skipPrefix) ? opt.skipPrefix : '_';
  const collisionMode = (opt && opt.collisionMode) ? opt.collisionMode : 'overwrite';

  /** @type {Map<string, string[]>} desired->olds */
  const desiredToOlds = new Map();

  for (const abs of absPaths) {
    const relRaw = NODE_CURE_PATH.slashForward(NODE_CURE_PATH.relative(rootAbs, abs));
    const parts = relRaw.split('/').filter(Boolean);

    const normParts = parts.map((p, idx) => {
      const isLast = (idx === parts.length - 1);

      // If segment is skip-prefixed (e.g. "_html"), preserve the prefix but normalize the rest.
      const hasSkipPrefix = !!skipPrefix && String(p || '').startsWith(skipPrefix);
      if (hasSkipPrefix) {
        const rest = String(p || '').slice(skipPrefix.length);
        if (!rest) return p; // segment is ONLY the prefix; keep as-is
        const restNorm = normalizePathSegment(rest, { preserveExtension: isLast });
        return skipPrefix + restNorm;
      }

      return normalizePathSegment(p, { preserveExtension: isLast });
    });

    const desired = normParts.join('/');

    if (!desiredToOlds.has(desired)) desiredToOlds.set(desired, []);
    desiredToOlds.get(desired).push(relRaw);
  }

  /** @type {Map<string,string>} */
  const out = new Map();
  /** @type {Array<{from:string,to:string}>} */
  const aliasMappings = [];
  /** @type {string[]} */
  const dropRels = [];
  let collisions = 0;

  desiredToOlds.forEach((olds, desired) => {
    // Stable order for deterministic conflict handling.
    const oldsSorted = olds.slice().sort((a, b) => a.localeCompare(b));
    if (oldsSorted.length === 1) {
      out.set(oldsSorted[0], desired);
      return;
    }

    collisions += (oldsSorted.length - 1);
    const winnerOldRel = oldsSorted[0];
    out.set(winnerOldRel, desired);

    for (let i = 1; i < oldsSorted.length; i++) {
      const oldRel = oldsSorted[i];

      if (collisionMode === 'suffix') {
        const parts = desired.split('/');
        const leaf = parts.pop() || '';
        const ext = NODE_PATH.extname(leaf);
        const base = leaf.slice(0, -ext.length) || 'segment';

        const leaf2 = `${base}-dup${i + 1}${ext}`;
        parts.push(leaf2);
        out.set(oldRel, parts.join('/'));
        continue;
      }

      aliasMappings.push({ from: oldRel, to: desired });
      dropRels.push(oldRel);
    }
  });

  // Also avoid colliding with existing paths that are NOT being renamed (rare, but safe).
  // In suffix mode, append -dupN.
  // In overwrite mode, preserve first target and drop colliding sources.
  const newRelUsed = new Set();

  out.forEach((newRel0, oldRel) => {
    let newRel = newRel0;
    if (!newRelUsed.has(newRel)) {
      newRelUsed.add(newRel);
      return;
    }

    if (collisionMode === 'suffix') {
      const parts = newRel.split('/');
      const leaf = parts.pop() || '';
      const ext = NODE_PATH.extname(leaf);
      const base = leaf.slice(0, -ext.length) || 'segment';

      let n = 2;
      while (newRelUsed.has(`${parts.join('/')}/${base}-dup${n}${ext}`)) n++;
      newRel = `${parts.join('/')}/${base}-dup${n}${ext}`;

      out.set(oldRel, newRel);
      newRelUsed.add(newRel);
      return;
    }

    aliasMappings.push({ from: oldRel, to: newRel });
    dropRels.push(oldRel);
  });

  return { mapOldRelToNewRel: out, aliasMappings, dropRels, collisions };
}

/**
 * Apply renames to match the mapping.
 * Order: deepest first so children move before parents.
 * @param {string} rootAbs
 * @param {Map<string,string>} mapOldRelToNewRel
 * @param {{
 *   overwrite?:boolean,
 *   dropRels?:string[],
 *   appendMappings?:Array<{from:string,to:string}>
 * }} [opt]
 * @returns {{renamed:number, skipped:number, deleted:number, mapping:Array<{from:string,to:string}>}}
 */
function applyRenames(rootAbs, mapOldRelToNewRel, opt = {}) {
  const overwrite = !!opt.overwrite;
  const dropRels = Array.isArray(opt.dropRels) ? opt.dropRels : [];
  const appendMappings = Array.isArray(opt.appendMappings) ? opt.appendMappings : [];

  const items = Array.from(mapOldRelToNewRel.entries())
    .filter(([oldRel, newRel]) => oldRel !== newRel)
    .map(([oldRel, newRel]) => ({
      oldRel,
      newRel,
      oldAbs: NODE_PATH.join(rootAbs, ...oldRel.split('/')),
      newAbs: NODE_PATH.join(rootAbs, ...newRel.split('/')),
      depth: oldRel.split('/').length
    }))
    .sort((a, b) => b.depth - a.depth);

  // Do files first, then dirs (so dir renames don't break file abs paths mid-loop)
  const isDir = (abs) => {
    try { return NODE_FS.statSync(abs).isDirectory(); } catch { return false; }
  };

  const files = items.filter(x => !isDir(x.oldAbs));
  const dirs  = items.filter(x =>  isDir(x.oldAbs));

  let renamed = 0;
  let skipped = 0;
  let deleted = 0;

  /** @type {Array<{from:string,to:string}>} */
  const mapping = appendMappings.slice();

  // ---------------------------------------------------------------------------
  // Progress logging (rename phase)
  // ---------------------------------------------------------------------------

  const LOG_EVERY = 25;          // print every N successful/failed operations
  const SAMPLE_MAX = 25;         // always print first N successes (then throttle)
  let printed = 0;
  let processed = 0;

  log.info(LOG_TAG_NORMALIZE_PATHS, 'Renaming...', {
    root: rootAbs,
    total: files.length + dirs.length,
    files: files.length,
    dirs: dirs.length
  });

  const shouldPrint = () => {
    if (printed < SAMPLE_MAX) return true;
    if (processed % LOG_EVERY === 0) return true;
    return false;
  };

  const removeAbsPath = (abs) => {
    if (!NODE_FS.existsSync(abs)) return false;
    const st = NODE_FS.lstatSync(abs);
    if (st.isDirectory() && !st.isSymbolicLink()) {
      NODE_FS.rmSync(abs, { recursive: true, force: true });
      return true;
    }
    NODE_FS.unlinkSync(abs);
    return true;
  };

  const mergeDirIntoExisting = (fromDirAbs, toDirAbs) => {
    // Move each child from source dir into target dir.
    // If child target exists:
    // - dir+dir: recurse merge
    // - otherwise: overwrite according to current overwrite behavior
    if (!NODE_FS.existsSync(fromDirAbs)) return true;
    if (!NODE_FS.existsSync(toDirAbs)) {
      NODE_FS.mkdirSync(NODE_PATH.dirname(toDirAbs), { recursive: true });
      NODE_FS.renameSync(fromDirAbs, toDirAbs);
      return true;
    }

    const fromStat = NODE_FS.lstatSync(fromDirAbs);
    const toStat = NODE_FS.lstatSync(toDirAbs);
    if (!fromStat.isDirectory() || !toStat.isDirectory()) return false;

    const entries = NODE_FS.readdirSync(fromDirAbs, { withFileTypes: true });
    for (const ent of entries) {
      const childFrom = NODE_PATH.join(fromDirAbs, ent.name);
      const childTo = NODE_PATH.join(toDirAbs, ent.name);

      if (!NODE_FS.existsSync(childTo)) {
        NODE_FS.renameSync(childFrom, childTo);
        continue;
      }

      const fromChildStat = NODE_FS.lstatSync(childFrom);
      const toChildStat = NODE_FS.lstatSync(childTo);

      if (fromChildStat.isDirectory() && toChildStat.isDirectory()) {
        if (!mergeDirIntoExisting(childFrom, childTo)) return false;
        continue;
      }

      if (!overwrite) return false;
      removeAbsPath(childTo);
      NODE_FS.renameSync(childFrom, childTo);
    }

    // Remove source directory if now empty.
    try {
      const remaining = NODE_FS.readdirSync(fromDirAbs);
      if (remaining.length === 0) NODE_FS.rmdirSync(fromDirAbs);
    } catch (_) {}

    return true;
  };

  const doRename = (fromAbs, toAbs) => {
    if (!NODE_FS.existsSync(fromAbs)) return false;

    const toDir = NODE_PATH.dirname(toAbs);
    if (!NODE_FS.existsSync(toDir)) NODE_FS.mkdirSync(toDir, { recursive: true });

    const fromResolved = NODE_PATH.resolve(fromAbs);
    const toResolved   = NODE_PATH.resolve(toAbs);
    const isCaseOnlyRename =
      fromResolved !== toResolved &&
      fromResolved.toLowerCase() === toResolved.toLowerCase();

    if (NODE_FS.existsSync(toAbs) && !isCaseOnlyRename) {
      const fromStat = NODE_FS.lstatSync(fromAbs);
      const toStat = NODE_FS.lstatSync(toAbs);

      // Critical safety behavior:
      // when both sides are directories, merge instead of deleting destination.
      if (fromStat.isDirectory() && toStat.isDirectory()) {
        return mergeDirIntoExisting(fromAbs, toAbs);
      }

      if (!overwrite) return false;
      removeAbsPath(toAbs);
    }

    if (isCaseOnlyRename) {
      // Case-only rename on Windows requires a temporary hop.
      const tmpAbs = `${toAbs}.normalize-case-tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      NODE_FS.renameSync(fromAbs, tmpAbs);
      NODE_FS.renameSync(tmpAbs, toAbs);
      return true;
    }

    NODE_FS.renameSync(fromAbs, toAbs);
    return true;
  };

  if (dropRels.length > 0) {
    const uniqueDrops = Array.from(new Set(dropRels))
      .map((rel) => ({ rel, abs: NODE_PATH.join(rootAbs, ...String(rel || '').split('/')) }))
      .sort((a, b) => b.rel.split('/').length - a.rel.split('/').length);

    for (const d of uniqueDrops) {
      if (removeAbsPath(d.abs)) deleted++;
    }
  }

  for (const x of files) {
    processed++;

    const ok = doRename(x.oldAbs, x.newAbs);
    if (ok) {
      renamed++;
      mapping.push({ from: x.oldRel, to: x.newRel });

      if (shouldPrint()) {
        printed++;
        log.detail(LOG_TAG_NORMALIZE_PATHS, 'Rename (file):', {
          index: processed,
          total: files.length + dirs.length,
          from: x.oldRel,
          to: x.newRel
        });
      }
    } else {
      skipped++;

      if (shouldPrint()) {
        printed++;
        log.detail(LOG_TAG_NORMALIZE_PATHS, 'Rename skipped (file):', {
          index: processed,
          total: files.length + dirs.length,
          from: x.oldRel,
          to: x.newRel
        });
      }
    }
  }

  for (const x of dirs) {
    processed++;

    const ok = doRename(x.oldAbs, x.newAbs);
    if (ok) {
      renamed++;
      mapping.push({ from: x.oldRel, to: x.newRel });

      if (shouldPrint()) {
        printed++;
        log.detail(LOG_TAG_NORMALIZE_PATHS, 'Rename (dir):', {
          index: processed,
          total: files.length + dirs.length,
          from: x.oldRel,
          to: x.newRel
        });
      }
    } else {
      skipped++;

      if (shouldPrint()) {
        printed++;
        log.detail(LOG_TAG_NORMALIZE_PATHS, 'Rename skipped (dir):', {
          index: processed,
          total: files.length + dirs.length,
          from: x.oldRel,
          to: x.newRel
        });
      }
    }
  }

  log.info(LOG_TAG_NORMALIZE_PATHS, 'Renaming phase complete.', {
    renamed,
    skipped,
    deleted,
    mapping: mapping.length
  });

  return { renamed, skipped, deleted, mapping };
}

/**
 * Remove empty directories under `rootAbs` (deepest-first).
 * - Skips any directory that contains a skip-prefix segment (e.g. "_html").
 *
 * This is intentionally conservative: only removes directories that are truly empty.
 *
 * @param {string} rootAbs
 * @param {{skipPrefix?:string}} [opt]
 * @returns {{scanned:number, removed:number, skipped:number, passes:number}}
 */
function removeEmptyDirsUnderRoot(rootAbs, opt = {}) {
  // NOTE:
  // - We accept skipPrefix for API stability, but we DO NOT skip deletion based on it anymore.
  // - We do deepest-first AND repeat passes until stable, so parent dirs that become empty
  //   after child deletions also get removed.
  const _skipPrefix = (opt && opt.skipPrefix) ? opt.skipPrefix : '_';

  let removed = 0;
  let skipped = 0;

  let scanned = 0;
  let passes = 0;

  for (;;) {
    passes++;

    const { dirs } = walkDirRecursive(rootAbs);
    scanned += dirs.length;

    // Deepest-first so parents become eligible after children are removed.
    dirs.sort((a, b) => b.split(NODE_PATH.sep).length - a.split(NODE_PATH.sep).length);

    let removedThisPass = 0;

    for (const dirAbs of dirs) {
      try {
        // If already gone, ignore.
        if (!NODE_FS.existsSync(dirAbs)) continue;

        const contents = NODE_FS.readdirSync(dirAbs);
        if (contents.length === 0) {
          NODE_FS.rmdirSync(dirAbs);
          removed++;
          removedThisPass++;
        }
      } catch (_) {
        // Best-effort: ignore transient fs errors.
        skipped++;
      }
    }

    // Stable: nothing else became empty after removals.
    if (removedThisPass === 0) break;
  }

  return { scanned, removed, skipped, passes };
}

/**
 * Apply an existing {from,to} mapping (forward-slash rel paths) to another root (e.g. out/, _cache/).
 * - Only renames entries that currently exist under `rootAbs`.
 * - Deepest-first by rel length to avoid parent/child conflicts.
 * - Best-effort: skips if destination already exists.
 *
 * @param {string} rootAbs
 * @param {Array<{from:string,to:string}>} mapping
 * @returns {{renamed:number, skipped:number, missing:number, mapping:Array<{from:string,to:string}>}}
 */
function applyRelMappingToRoot(rootAbs, mapping) {
  const items = (Array.isArray(mapping) ? mapping : [])
    .slice()
    .filter(e => e && e.from && e.to && e.from !== e.to)
    .sort((a, b) => String(b.from || '').length - String(a.from || '').length);

  let renamed = 0;
  let skipped = 0;
  let missing = 0;
  /** @type {Array<{from:string,to:string}>} */
  const applied = [];

  for (const { from, to } of items) {
    try {
      const fromAbs = NODE_PATH.join(rootAbs, ...String(from).split('/'));
      const toAbs   = NODE_PATH.join(rootAbs, ...String(to).split('/'));

      if (!NODE_FS.existsSync(fromAbs)) {
        missing++;
        continue;
      }

      const fromResolved = NODE_PATH.resolve(fromAbs);
      const toResolved   = NODE_PATH.resolve(toAbs);
      const isCaseOnlyRename =
        fromResolved !== toResolved &&
        fromResolved.toLowerCase() === toResolved.toLowerCase();

      // If already normalized (or otherwise present), do not clobber.
      if (NODE_FS.existsSync(toAbs) && !isCaseOnlyRename) {
        skipped++;
        continue;
      }

      NODE_FS.mkdirSync(NODE_PATH.dirname(toAbs), { recursive: true });

      if (isCaseOnlyRename) {
        const tmpAbs = `${toAbs}.normalize-case-tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
        NODE_FS.renameSync(fromAbs, tmpAbs);
        NODE_FS.renameSync(tmpAbs, toAbs);
      } else {
        NODE_FS.renameSync(fromAbs, toAbs);
      }

      renamed++;
      applied.push({ from: String(from), to: String(to) });
    } catch (_) {
      skipped++;
    }
  }

  return { renamed, skipped, missing, mapping: applied };
}

/**
 * Merge + de-duplicate mapping arrays (later arrays override earlier by `from` key).
 *
 * @param {...Array<{from:string,to:string}>} lists
 * @returns {Array<{from:string,to:string}>}
 */
function normalizeMergeMappings(...lists) {
  /** @type {Map<string,string>} */
  const map = new Map();

  for (const list of lists) {
    for (const e of (Array.isArray(list) ? list : [])) {
      const from = NODE_CURE_PATH.slashForward(String(e?.from || ''));
      const to = NODE_CURE_PATH.slashForward(String(e?.to || ''));
      if (!from || !to || from === to) continue;
      map.set(from, to);
    }
  }

  return Array.from(map.entries()).map(([from, to]) => ({ from, to }));
}

/**
 * Normalize a path-like key with normalize-paths segment rules.
 * Intended for cache keys / sourcemap sources / manifest keys where we need a
 * fallback beyond exact rename mapping.
 *
 * Notes:
 * - Preserves leading "_" segment prefix behavior.
 * - Preserves drive/protocol first segment (e.g. "C:" / "https:").
 * - Preserves ".", "..", and glob-ish segments.
 *
 * @param {string} raw
 * @returns {string}
 */
function normalizePathKeyLike(raw) {
  let s = NODE_CURE_PATH.slashForward(String(raw || ''));
  if (!s) return s;

  let lead = '';
  if (s.startsWith('/')) {
    lead = '/';
    s = s.replace(/^\/+/, '');
  }

  const parts = s.split('/');
  const outParts = parts.map((seg, idx) => {
    if (seg === '' || seg === '.' || seg === '..') return seg;

    // Preserve first protocol/drive segment for absolute-ish paths.
    if (idx === 0 && (/^[a-zA-Z]:$/.test(seg) || /^[a-zA-Z][a-zA-Z0-9+.-]*:$/.test(seg))) {
      return seg;
    }

    // Leave glob-ish segments untouched.
    if (/[*?[\]{}]/.test(seg)) return seg;

    const hasSkipPrefix = seg.startsWith('_');
    const prefix = hasSkipPrefix ? '_' : '';
    const core = hasSkipPrefix ? seg.slice(1) : seg;
    if (!core) return seg;

    return prefix + normalizePathSegment(core, { preserveExtension: true });
  });

  return lead + outParts.join('/');
}


/**
 * Rewrite `_cache/project/manifest_html_tags.json` "files" object keys using
 * normalize-paths mapping + fallback path-key normalization.
 *
 * @param {Array<{from:string,to:string}>} mapping
 * @param {{logTag?:string}} [opt]
 * @returns {{touched:number,renamed:number,files:number}}
 */
function normalizeManifestHtmlTagCacheKeys(mapping, opt = {}) {
  const logTag = opt.logTag || LOG_TAG_NORMALIZE_PATHS;

  if (!NODE_FS.existsSync(PATH_FILE_PROJECT_HTML_TAG_MANIFEST)) {
    return { touched: 0, renamed: 0, files: 0 };
  }

  const mappingSorted = (Array.isArray(mapping) ? mapping : [])
    .map(e => ({
      from: NODE_CURE_PATH.slashForward(String(e?.from || '')),
      to: NODE_CURE_PATH.slashForward(String(e?.to || ''))
    }))
    .filter(e => e.from && e.to && e.from !== e.to)
    .sort((a, b) => b.from.length - a.from.length);

  const applyOne = (key) => {
    const k = NODE_CURE_PATH.slashForward(String(key || ''));
    if (!k) return k;
    for (const { from, to } of mappingSorted) {
      if (k === from) return to;
      if (k.startsWith(from + '/')) return to + k.slice(from.length);
    }
    const kNorm = normalizePathKeyLike(k);
    return kNorm || k;
  };

  /** @type {{files?:Record<string,any>}} */
  let json;
  try {
    json = NODE_CURE_JSON.load(PATH_FILE_PROJECT_HTML_TAG_MANIFEST, { fatal: false }) || {};
  } catch (e) {
    log.warn(logTag, 'Manifest html-tags cache load failed; skipping key rewrite.', {
      path: PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
      error: String(e?.message || e)
    });
    return { touched: 0, renamed: 0, files: 0 };
  }

  const oldFiles = (json && typeof json.files === 'object' && json.files) ? json.files : {};
  /** @type {Record<string, any>} */
  const nextFiles = {};

  let touched = 0;
  let renamed = 0;

  for (const [kRaw, v] of Object.entries(oldFiles)) {
    touched++;
    const kNew = applyOne(kRaw);
    if (kNew !== kRaw) renamed++;
    nextFiles[kNew] = v;
  }

  const oldJSON = JSON.stringify(oldFiles);
  const newJSONObj = _sortObjectShallow(nextFiles);
  const newJSON = JSON.stringify(newJSONObj);

  if (oldJSON !== newJSON) {
    json.files = newJSONObj;
    try {
      NODE_CURE_JSON.save(PATH_FILE_PROJECT_HTML_TAG_MANIFEST, json, { sort: true });
      log.info(logTag, 'Manifest html-tags key rewrite complete.', {
        path: PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
        files: Object.keys(newJSONObj).length,
        touched,
        renamed
      });
    } catch (e) {
      log.warn(logTag, 'Manifest html-tags save failed after key rewrite.', {
        path: PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
        error: String(e?.message || e)
      });
    }
  } else {
    log.detail(logTag, 'Manifest html-tags key rewrite: no changes.', {
      path: PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
      touched
    });
  }

  return { touched, renamed, files: Object.keys(nextFiles).length };
}

/**
 * Normalize sourcemap file references and sourceMappingURL comments in out/ artifacts.
 *
 * @param {string} rootAbs
 * @param {Array<{from:string,to:string}>} mapping
 * @param {{logTag?:string}} [opt]
 * @returns {{filesChanged:number,mapsChanged:number,commentsChanged:number}}
 */
function normalizeOutSourceMapReferences(rootAbs, mapping, opt = {}) {
  const logTag = opt.logTag || LOG_TAG_NORMALIZE_PATHS;
  if (!rootAbs || !NODE_FS.existsSync(rootAbs)) {
    return { filesChanged: 0, mapsChanged: 0, commentsChanged: 0 };
  }

  const mappingSorted = (Array.isArray(mapping) ? mapping : [])
    .map(e => ({
      from: NODE_CURE_PATH.slashForward(String(e?.from || '')),
      to: NODE_CURE_PATH.slashForward(String(e?.to || ''))
    }))
    .filter(e => e.from && e.to && e.from !== e.to)
    .sort((a, b) => b.from.length - a.from.length);

  if (mappingSorted.length === 0) {
    return { filesChanged: 0, mapsChanged: 0, commentsChanged: 0 };
  }

  /** @type {Map<string,string>} */
  const leafMap = new Map();
  for (const { from, to } of mappingSorted) {
    const oldLeaf = from.split('/').pop() || '';
    const newLeaf = to.split('/').pop() || '';
    if (oldLeaf && newLeaf && oldLeaf !== newLeaf) {
      leafMap.set(oldLeaf, newLeaf);
    }
  }

  const rxEscape = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const rewritePathString = (raw) => {
    let out = String(raw || '');
    if (!out) return out;

    // Exact/prefix rewrite first (for pure path keys).
    const outF0 = NODE_CURE_PATH.slashForward(out);
    for (const { from, to } of mappingSorted) {
      if (outF0 === from) return to;
      if (outF0.startsWith(from + '/')) return to + outF0.slice(from.length);
    }

    // Embedded path rewrite for free-form strings.
    for (const { from, to } of mappingSorted) {
      const fromF = from;
      const toF = to;
      const fromB = fromF.replace(/\//g, '\\');
      const toB = toF.replace(/\//g, '\\');

      out = out
        .replace(new RegExp(rxEscape('/' + fromF), 'g'), '/' + toF)
        .replace(new RegExp(rxEscape(fromF), 'g'), toF)
        .replace(new RegExp(rxEscape('\\' + fromB), 'g'), '\\' + toB)
        .replace(new RegExp(rxEscape(fromB), 'g'), toB);
    }

    // Fallback for stale snake_case path fragments not present in mapping.
    {
      const hashIdx = out.indexOf('#');
      const queryIdx = out.indexOf('?');
      let cut = -1;
      if (hashIdx >= 0 && queryIdx >= 0) cut = Math.min(hashIdx, queryIdx);
      else cut = Math.max(hashIdx, queryIdx);

      const pathPart = cut >= 0 ? out.slice(0, cut) : out;
      const tail = cut >= 0 ? out.slice(cut) : '';

      // Skip absolute protocol/drive forms.
      if (!/^(?:[a-z][a-z0-9+.-]*:|\/\/|[a-zA-Z]:\/)/i.test(pathPart)) {
        const pathNorm = normalizePathKeyLike(pathPart);
        out = (pathNorm || pathPart) + tail;
      }
    }

    return out;
  };

  const rewriteLeafInUrl = (urlRaw) => {
    const url = String(urlRaw || '');
    if (!url) return url;

    const hashIdx = url.indexOf('#');
    const queryIdx = url.indexOf('?');
    let cut = -1;
    if (hashIdx >= 0 && queryIdx >= 0) cut = Math.min(hashIdx, queryIdx);
    else cut = Math.max(hashIdx, queryIdx);

    const pathPart = cut >= 0 ? url.slice(0, cut) : url;
    const tail = cut >= 0 ? url.slice(cut) : '';
    const slash = Math.max(pathPart.lastIndexOf('/'), pathPart.lastIndexOf('\\'));
    const dir = slash >= 0 ? pathPart.slice(0, slash + 1) : '';
    const leaf = slash >= 0 ? pathPart.slice(slash + 1) : pathPart;
    const nextLeaf = leafMap.get(leaf) || leaf;
    return dir + nextLeaf + tail;
  };

  /**
   * Normalize a local JS/TS-like module specifier string.
   * Scoped for sourcemap `sourcesContent` rewrites.
   *
   * @param {string} raw
   * @returns {string}
   */
  const normalizeLocalModuleSpecifier = (raw) => {
    const original = String(raw ?? '');
    if (!original) return original;

    const leadWs = (original.match(/^\s*/) || [''])[0];
    const tailWs = (original.match(/\s*$/) || [''])[0];
    let s = original.trim();
    if (!s) return original;

    // Only local/absolute-like specifiers, skip package imports and URLs.
    if (!(/^(?:\.{1,2}\/|\/)/.test(s))) return original;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|[a-zA-Z]:[\\/])/i.test(s)) return original;
    if (/[${}]/.test(s)) return original;

    let tail = '';
    const tailIdx = s.search(/[?#]/);
    if (tailIdx !== -1) {
      tail = s.slice(tailIdx);
      s = s.slice(0, tailIdx);
    }

    // Preserve "./" / "../" prefixes.
    let lead = '';
    if (s.startsWith('/')) {
      lead = '/';
      s = s.replace(/^\/+/, '');
    } else {
      const m = s.match(/^(?:\.\.\/|\.\/)+/);
      if (m) {
        lead = m[0];
        s = s.slice(lead.length);
      }
    }

    const parts = s.split('/');
    const outParts = parts.map((seg, idx) => {
      if (seg === '' || seg === '.' || seg === '..') return seg;
      const hasSkipPrefix = String(seg || '').startsWith('_');
      const prefix = hasSkipPrefix ? '_' : '';
      const core = hasSkipPrefix ? String(seg || '').slice(1) : String(seg || '');
      if (!core) return seg;
      const isLast = (idx === parts.length - 1);
      return prefix + normalizePathSegment(core, { preserveExtension: isLast });
    });

    let outPath = lead + outParts.join('/') + tail;

    // Respect mapping (including collision suffixes), same behavior as text pass.
    for (const { from, to } of mappingSorted) {
      const fromF = NODE_CURE_PATH.slashForward(from);
      const toF   = NODE_CURE_PATH.slashForward(to);

      if (outPath === fromF) {
        outPath = toF;
        continue;
      }

      const rx = new RegExp(`(^|/)${rxEscape(fromF)}(?=$|/)`, 'g');
      outPath = outPath.replace(rx, (_, p1) => `${p1}${toF}`);
    }

    return leadWs + outPath + tailWs;
  };

  /**
   * Rewrite local module/include path literals inside sourcemap sourcesContent text.
   * This targets unresolved legacy snake_case module specifiers embedded in maps.
   *
   * @param {string} text
   * @returns {string}
   */
  const rewriteSourcesContentText = (text) => {
    let out = String(text || '');
    if (!out) return out;

    // import/export ... from '...'
    out = out.replace(/(from\s+)(['"])([^'"\n]+)\2/g, (m, p1, q, spec) => {
      const spec2 = normalizeLocalModuleSpecifier(spec);
      return spec2 === spec ? m : `${p1}${q}${spec2}${q}`;
    });

    // import '...'
    out = out.replace(/(import\s+)(['"])([^'"\n]+)\2/g, (m, p1, q, spec) => {
      const spec2 = normalizeLocalModuleSpecifier(spec);
      return spec2 === spec ? m : `${p1}${q}${spec2}${q}`;
    });

    // import('...')
    out = out.replace(/(import\s*\(\s*)(['"])([^'"\n]+)\2(\s*\))/g, (m, p1, q, spec, p4) => {
      const spec2 = normalizeLocalModuleSpecifier(spec);
      return spec2 === spec ? m : `${p1}${q}${spec2}${q}${p4}`;
    });

    // require('...')
    out = out.replace(/(require\s*\(\s*)(['"])([^'"\n]+)\2(\s*\))/g, (m, p1, q, spec, p4) => {
      const spec2 = normalizeLocalModuleSpecifier(spec);
      return spec2 === spec ? m : `${p1}${q}${spec2}${q}${p4}`;
    });

    // Browserify dependency map keys: {"./path/module_name.js": 1}
    out = out.replace(/([,{]\s*)(['"])(\.{1,2}\/[^'"\n]+)\2(\s*:)/g, (m, p1, q, spec, p4) => {
      const spec2 = normalizeLocalModuleSpecifier(spec);
      return spec2 === spec ? m : `${p1}${q}${spec2}${q}${p4}`;
    });

    // @@include('path', ...) first argument
    out = out.replace(/(@@include\s*\(\s*)(['"])([\s\S]*?)\2(\s*(?:,\s*[\s\S]*?)?\))/g, (m, p1, q, spec, p4) => {
      const spec2 = normalizeLocalModuleSpecifier(spec);
      return spec2 === spec ? m : `${p1}${q}${spec2}${q}${p4}`;
    });

    return out;
  };

  const { files } = walkDirRecursive(rootAbs);
  let filesChanged = 0;
  let mapsChanged = 0;
  let commentsChanged = 0;

  for (const abs of files) {
    const ext = String(NODE_PATH.extname(abs || '') || '').toLowerCase();

    if (ext === '.map') {
      try {
        const raw = NODE_FS.readFileSync(abs, 'utf8');
        const json = JSON.parse(raw);
        let changed = false;

        if (typeof json.file === 'string') {
          const next = rewritePathString(rewriteLeafInUrl(json.file));
          if (next !== json.file) {
            json.file = next;
            changed = true;
          }
        }

        if (typeof json.sourceRoot === 'string') {
          const next = rewritePathString(json.sourceRoot);
          if (next !== json.sourceRoot) {
            json.sourceRoot = next;
            changed = true;
          }
        }

        if (Array.isArray(json.sources)) {
          const nextSources = json.sources.map((s) => rewritePathString(rewriteLeafInUrl(s)));
          if (JSON.stringify(nextSources) !== JSON.stringify(json.sources)) {
            json.sources = nextSources;
            changed = true;
          }
        }

        if (Array.isArray(json.sourcesContent)) {
          const nextSourcesContent = json.sourcesContent.map((s) => rewriteSourcesContentText(String(s || '')));
          if (JSON.stringify(nextSourcesContent) !== JSON.stringify(json.sourcesContent)) {
            json.sourcesContent = nextSourcesContent;
            changed = true;
          }
        }

        if (changed) {
          NODE_CURE_FS.writeFileSync(abs, JSON.stringify(json));
          filesChanged++;
          mapsChanged++;
        }
      } catch (_) {
        // Best effort.
      }
      continue;
    }

    if (ext !== '.js' && ext !== '.css') continue;

    try {
      const raw = NODE_FS.readFileSync(abs, 'utf8');
      let changed = false;

      const next = raw.replace(/(sourceMappingURL=)([^\s*]+)(\s*\*\/|\s*$)/gm, (m, p1, p2, p3) => {
        const updated = rewriteLeafInUrl(rewritePathString(String(p2 || '')));
        if (updated !== p2) {
          changed = true;
          commentsChanged++;
        }
        return `${p1}${updated}${p3}`;
      });

      if (changed && next !== raw) {
        NODE_CURE_FS.writeFileSync(abs, next);
        filesChanged++;
      }
    } catch (_) {
      // Best effort.
    }
  }

  log.info(logTag, 'Sourcemap normalization complete.', {
    root: rootAbs,
    filesChanged,
    mapsChanged,
    commentsChanged
  });

  return { filesChanged, mapsChanged, commentsChanged };
}

/**
 * Update references inside all text files under rootAbs using the final mapping.
 * Replaces both forward/back slashes and with/without leading slash.
 *
 * Logging behavior:
 * - NO progress logs.
 * - Logs EACH replacement occurrence with:
 *   { file, line, char, from, to }
 *
 * @param {string} rootAbs
 * @param {Array<{from:string,to:string}>} mapping (forward-slash rel paths)
 * @returns {{touched:number, changed:number, changedFilesRel:string[]}}
 */
function updateTextReferences(rootAbs, mapping, opt = {}) {
  const { files } = walkDirRecursive(rootAbs);

  const normalizeScssUseForward = (opt && opt.normalizeScssUseForward !== false);
  const normalizeFileIncludeSpecifiers = (opt && opt.normalizeFileIncludeSpecifiers !== false);
  const normalizeIncludeOptionLiterals = (opt && opt.normalizeIncludeOptionLiterals !== false);
  const normalizeJsModuleSpecifiers = (opt && opt.normalizeJsModuleSpecifiers !== false);
  const normalizeFontIconTokens = (opt && opt.normalizeFontIconTokens !== false);
  const normalizeCssUrlPaths = (opt && opt.normalizeCssUrlPaths !== false);
  const regexRewrites = Array.isArray(opt?.regexRewrites) ? opt.regexRewrites : [];
  const segmentFlexAllowPrefixes = Array.isArray(opt?.segmentFlexAllowPrefixes)
    ? opt.segmentFlexAllowPrefixes
      .map(s => NODE_CURE_PATH.slashForward(String(s || '')).replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
    : null;
  const scssUseForwardMode = (() => {
    const modeRaw = String(opt?.scssUseForwardMode || '').trim().toLowerCase();
    if (modeRaw === 'full' || modeRaw === 'mapping_only' || modeRaw === 'off') return modeRaw;
    return normalizeScssUseForward ? 'full' : 'off';
  })();

  // Sort longest-first so nested paths replace before parent-ish substrings
  // Also expand mapping to cover common URL forms:
  // - ".html" omitted in href/src routes
  // - "/index.html" collapsed to directory routes (with + without trailing slash)
  const slashForward = (p) => String(p || '').replace(/\\/g, '/');

  const expandMappingForUrlForms = (arr) => {
    /** @type {Array<{from:string,to:string}>} */
    const out = [];
    const seen = new Set();

    const push = (from, to) => {
      const f = slashForward(from);
      const t = slashForward(to);
      if (!f || !t || f === t) return;

      const key = `${f}\u0000${t}`;
      if (seen.has(key)) return;

      seen.add(key);
      out.push({ from: f, to: t });
    };

    for (const e of (Array.isArray(arr) ? arr : [])) {
      if (!e || !e.from || !e.to) continue;

      const fromF = slashForward(e.from);
      const toF   = slashForward(e.to);

      push(fromF, toF);

      // Minified asset alias support:
      //   foo_bar.js  -> foo-bar.js
      // also rewrites:
      //   foo_bar.min.js -> foo-bar.min.js
      // Same behavior for same-extension file mappings (e.g. css).
      {
        const leafExtRx = /^(.*\/)?([^/]+)\.([a-z0-9]+)$/i;
        const mf = fromF.match(leafExtRx);
        const mt = toF.match(leafExtRx);

        if (mf && mt) {
          const fromDir = mf[1] || '';
          const toDir   = mt[1] || '';
          const fromLeaf = mf[2] || '';
          const toLeaf   = mt[2] || '';
          const fromExt = String(mf[3] || '').toLowerCase();
          const toExt   = String(mt[3] || '').toLowerCase();

          if (
            fromExt &&
            fromExt === toExt &&
            !/\.min$/i.test(fromLeaf) &&
            !/\.min$/i.test(toLeaf)
          ) {
            push(
              `${fromDir}${fromLeaf}.min.${fromExt}`,
              `${toDir}${toLeaf}.min.${toExt}`
            );
          }
        }
      }

      // Compiled stylesheet alias support:
      //   action_games.scss -> action-games.scss
      // should also rewrite:
      //   action_games.min.css -> action-games.min.css
      if (/\.(?:scss|sass)$/i.test(fromF) && /\.(?:scss|sass)$/i.test(toF)) {
        const fromStem = fromF.replace(/\.(?:scss|sass)$/i, '');
        const toStem   = toF.replace(/\.(?:scss|sass)$/i, '');
        push(`${fromStem}.min.css`, `${toStem}.min.css`);
      }

      // ".html" -> extensionless route alias (e.g. "/about.html" -> "/about")
      if (fromF.endsWith('.html') && toF.endsWith('.html')) {
        push(fromF.slice(0, -5), toF.slice(0, -5));
      }

      // "/index.html" -> directory route aliases (e.g. "/docs/index.html" -> "/docs" and "/docs/")
      if (fromF.endsWith('/index.html') && toF.endsWith('/index.html')) {
        const fromDir = fromF.slice(0, -('/index.html'.length));
        const toDir   = toF.slice(0, -('/index.html'.length));

        push(fromDir, toDir);
        push(`${fromDir}/`, `${toDir}/`);
      }
    }

    return out;
  };

  const mappingSorted = expandMappingForUrlForms(mapping)
    .sort((a, b) => b.from.length - a.from.length);

  let touched = 0;
  let changed = 0;
  /** @type {string[]} */
  const changedFilesRel = [];

  const rxEscape = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Pre-compile replacement rules once (instead of rebuilding RegExp per file).
  /** @type {Array<{needle:string, rx:RegExp, to:string}>} */
  const compiledLiteralRules = [];
  for (const { from, to } of mappingSorted) {
    const fromF = NODE_CURE_PATH.slashForward(from);
    const toF   = NODE_CURE_PATH.slashForward(to);
    const fromB = fromF.replace(/\//g, '\\');
    const toB   = toF.replace(/\//g, '\\');

    compiledLiteralRules.push(
      { needle: '/' + fromF,  rx: new RegExp(rxEscape('/' + fromF), 'g'),  to: '/' + toF },
      { needle: fromF,        rx: new RegExp(rxEscape(fromF), 'g'),        to: toF },
      { needle: '\\' + fromB, rx: new RegExp(rxEscape('\\' + fromB), 'g'), to: '\\' + toB },
      { needle: fromB,        rx: new RegExp(rxEscape(fromB), 'g'),        to: toB }
    );
  }

  /**
   * Build deterministic segment-flex alias rules by dropping leading path segments.
   *
   * Example:
   *   from: "asset/image/content/gallery/chicken/silkie_black"
   *   to:   "asset/image/content/gallery/chicken/silkie-black"
   *   aliases include:
   *   - "content/gallery/chicken/silkie_black" -> "content/gallery/chicken/silkie-black"
   *   - "gallery/chicken/silkie_black"         -> "gallery/chicken/silkie-black"
   *
   * Ambiguous aliases are skipped.
   *
   * @returns {Array<{from:string,to:string}>}
   */
  const buildSegmentFlexAliases = () => {
    /** @type {Map<string, Set<string>>} */
    const aliasToTargets = new Map();

    const isAllowedFrom = (fromNorm) => {
      if (!segmentFlexAllowPrefixes || segmentFlexAllowPrefixes.length === 0) return true;

      return segmentFlexAllowPrefixes.some(prefix => (
        fromNorm === prefix ||
        fromNorm.startsWith(prefix + '/')
      ));
    };

    for (const { from, to } of mappingSorted) {
      const fromNorm = NODE_CURE_PATH.slashForward(String(from || '')).replace(/^\/+|\/+$/g, '');
      const toNorm   = NODE_CURE_PATH.slashForward(String(to || '')).replace(/^\/+|\/+$/g, '');

      if (!fromNorm || !toNorm || fromNorm === toNorm) continue;
      if (!isAllowedFrom(fromNorm)) continue;

      const fromSegs = fromNorm.split('/').filter(Boolean);
      const toSegs = toNorm.split('/').filter(Boolean);

      if (fromSegs.length < 2 || toSegs.length < 2) continue;

      const maxDrop = Math.min(fromSegs.length, toSegs.length) - 1;
      for (let drop = 1; drop <= maxDrop; drop++) {
        const aliasFrom = fromSegs.slice(drop).join('/');
        const aliasTo = toSegs.slice(drop).join('/');

        if (!aliasFrom || !aliasTo || aliasFrom === aliasTo) continue;
        if (!aliasFrom.includes('/')) continue;

        if (!aliasToTargets.has(aliasFrom)) aliasToTargets.set(aliasFrom, new Set());
        aliasToTargets.get(aliasFrom).add(aliasTo);
      }
    }

    /** @type {Array<{from:string,to:string}>} */
    const out = [];
    for (const [from, targets] of Array.from(aliasToTargets.entries())) {
      if (!targets || targets.size !== 1) continue;
      const to = Array.from(targets)[0];
      if (!to || from === to) continue;
      out.push({ from, to });
    }

    out.sort((a, b) => b.from.length - a.from.length);
    return out;
  };

  const segmentFlexAliases = buildSegmentFlexAliases();
  /** @type {Array<{rx:RegExp,to:string}>} */
  const compiledSegmentFlexRules = [];
  for (const { from, to } of segmentFlexAliases) {
    const fromF = NODE_CURE_PATH.slashForward(from);
    const toF   = NODE_CURE_PATH.slashForward(to);
    const fromB = fromF.replace(/\//g, '\\');
    const toB   = toF.replace(/\//g, '\\');

    // Segment-flex rules use non-word boundary guards to avoid partial-token rewrites.
    compiledSegmentFlexRules.push(
      { rx: new RegExp(`(^|[^A-Za-z0-9_])(${rxEscape(fromF)})(?=$|[^A-Za-z0-9_])`, 'g'), to: toF },
      { rx: new RegExp(`(^|[^A-Za-z0-9_])(${rxEscape(fromB)})(?=$|[^A-Za-z0-9_])`, 'g'), to: toB }
    );
  }

  /**
   * Build strict, mapping-driven font-icon token rewrites.
   * Source of truth:
   * - set rename:  asset/font-icon/<set>
   * - icon rename: asset/font-icon/<set>/<icon>.svg
   *
   * Guarantees:
   * - Rewrites class/variable/data/font-family tokens only when a concrete
   *   set/icon rename exists in the normalize mapping.
   * - Avoids heuristic underscore/hyphen guessing for set/icon identities.
   *
   * @returns {{
   *   tokenRules: Array<{rx:RegExp,to:string}>,
   *   setRules: Array<{rx:RegExp,to:string}>,
   *   nameRules: Array<{rx:RegExp,to:string}>,
   *   fontFamilyRules: Array<{rx:RegExp,to:string}>
   * }}
   */
  const buildStrictFontIconRulesFromMapping = () => {
    /** @type {Map<string, Set<string>>} */
    const setTargets = new Map();
    /** @type {Map<string, Set<string>>} */
    const iconTargets = new Map();
    /** @type {Map<string, {oldSet:string, oldIcon:string, newSet:string, newIcon:string}>} */
    const pairMap = new Map();

    for (const e of (Array.isArray(mapping) ? mapping : [])) {
      const from = NODE_CURE_PATH.slashForward(String(e?.from || '')).replace(/^\/+|\/+$/g, '');
      const to = NODE_CURE_PATH.slashForward(String(e?.to || '')).replace(/^\/+|\/+$/g, '');
      if (!from || !to || from === to) continue;

      {
        const mFrom = /^asset\/font-icon\/([^/]+)$/i.exec(from);
        const mTo = /^asset\/font-icon\/([^/]+)$/i.exec(to);
        if (mFrom && mTo) {
          const oldSet = String(mFrom[1] || '');
          const newSet = String(mTo[1] || '');
          if (oldSet && newSet && oldSet !== newSet) {
            if (!setTargets.has(oldSet)) setTargets.set(oldSet, new Set());
            setTargets.get(oldSet).add(newSet);
          }
        }
      }

      {
        const mFrom = /^asset\/font-icon\/([^/]+)\/([^/]+)\.svg$/i.exec(from);
        const mTo = /^asset\/font-icon\/([^/]+)\/([^/]+)\.svg$/i.exec(to);
        if (mFrom && mTo) {
          const oldSet = String(mFrom[1] || '');
          const oldIcon = String(mFrom[2] || '');
          const newSet = String(mTo[1] || '');
          const newIcon = String(mTo[2] || '');
          if (!oldSet || !oldIcon || !newSet || !newIcon) continue;
          if (oldSet === newSet && oldIcon === newIcon) continue;

          if (!iconTargets.has(oldIcon)) iconTargets.set(oldIcon, new Set());
          iconTargets.get(oldIcon).add(newIcon);

          pairMap.set(`${oldSet}\u0000${oldIcon}`, { oldSet, oldIcon, newSet, newIcon });
        }
      }
    }

    /** @type {Map<string,string>} */
    const setRename = new Map();
    for (const [oldSet, targets] of Array.from(setTargets.entries())) {
      if (!targets || targets.size !== 1) continue;
      const only = Array.from(targets)[0];
      if (!only || oldSet === only) continue;
      setRename.set(oldSet, only);
    }

    /** @type {Map<string,string>} */
    const iconRename = new Map();
    for (const [oldIcon, targets] of Array.from(iconTargets.entries())) {
      if (!targets || targets.size !== 1) continue;
      const only = Array.from(targets)[0];
      if (!only || oldIcon === only) continue;
      iconRename.set(oldIcon, only);
    }

    /** @type {Array<{rx:RegExp,to:string}>} */
    const tokenRules = [];
    /** @type {Array<{rx:RegExp,to:string}>} */
    const setRules = [];
    /** @type {Array<{rx:RegExp,to:string}>} */
    const nameRules = [];
    /** @type {Array<{rx:RegExp,to:string}>} */
    const fontFamilyRules = [];

    const pushTokenRule = (fromToken, toToken) => {
      if (!fromToken || !toToken || fromToken === toToken) return;
      tokenRules.push({
        rx: new RegExp(`(^|[^A-Za-z0-9_\\-])(${rxEscape(fromToken)})(?=$|[^A-Za-z0-9_])`, 'g'),
        to: toToken
      });
    };

    for (const p of Array.from(pairMap.values())) {
      const canonicalFrom = `font-icon--${p.oldSet}--${p.oldIcon}`;
      const canonicalTo = `font-icon--${p.newSet}--${p.newIcon}`;
      const colorFrom = `font-icon--color--${p.oldSet}--${p.oldIcon}`;
      const colorTo = `font-icon--color--${p.newSet}--${p.newIcon}`;
      const singleFrom = `font-icon--${p.oldSet}-${p.oldIcon}`;
      const singleTo = canonicalTo;
      const colorSingleFrom = `font-icon--color--${p.oldSet}-${p.oldIcon}`;
      const colorSingleTo = colorTo;

      pushTokenRule(canonicalFrom, canonicalTo);
      pushTokenRule(colorFrom, colorTo);
      pushTokenRule(singleFrom, singleTo);
      pushTokenRule(colorSingleFrom, colorSingleTo);
    }

    for (const [oldSet, newSet] of Array.from(setRename.entries())) {
      setRules.push({
        rx: new RegExp(`(data-font-icon-set=['"])${rxEscape(oldSet)}(['"])`, 'g'),
        to: `$1${newSet}$2`
      });

      fontFamilyRules.push({
        rx: new RegExp(`(\\bfont-family\\s*:\\s*["'])font-icon--${rxEscape(oldSet)}(["'])`, 'gi'),
        to: `$1font-icon--${newSet}$2`
      });
      fontFamilyRules.push({
        rx: new RegExp(`(\\bfont-family\\s*:\\s*["'])font-icon-${rxEscape(oldSet)}(["'])`, 'gi'),
        to: `$1font-icon--${newSet}$2`
      });
      fontFamilyRules.push({
        rx: new RegExp(`(\\bfont-family\\s*:\\s*["'])font_icon_${rxEscape(oldSet)}(["'])`, 'gi'),
        to: `$1font-icon--${newSet}$2`
      });
    }

    for (const [oldIcon, newIcon] of Array.from(iconRename.entries())) {
      nameRules.push({
        rx: new RegExp(`(data-font-icon-name=['"])${rxEscape(oldIcon)}(['"])`, 'g'),
        to: `$1${newIcon}$2`
      });
    }

    tokenRules.sort((a, b) => b.to.length - a.to.length);
    setRules.sort((a, b) => String(b.rx?.source || '').length - String(a.rx?.source || '').length);
    nameRules.sort((a, b) => String(b.rx?.source || '').length - String(a.rx?.source || '').length);
    fontFamilyRules.sort((a, b) => String(b.rx?.source || '').length - String(a.rx?.source || '').length);

    return { tokenRules, setRules, nameRules, fontFamilyRules };
  };

  const strictFontIconRules = buildStrictFontIconRulesFromMapping();

  /**
   * Build line-start indices for fast index -> (line,char) mapping.
   * - Line numbers are 1-based.
   * - Char positions are 1-based (within the line).
   *
   * @param {string} text
   * @returns {number[]} lineStarts
   */
  const buildLineStarts = (text) => {
    /** @type {number[]} */
    const starts = [0];

    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) === 10) { // '\n'
        starts.push(i + 1);
      }
    }

    return starts;
  };

  /**
   * Convert an absolute string index into {line,char} (both 1-based).
   *
   * @param {number[]} lineStarts
   * @param {number} index
   * @returns {{line:number, char:number}}
   */
  const indexToLineChar = (lineStarts, index) => {
    // Binary search: last lineStart <= index
    let lo = 0;
    let hi = lineStarts.length - 1;

    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (lineStarts[mid] <= index) lo = mid + 1;
      else hi = mid - 1;
    }

    const lineIdx = Math.max(0, lo - 1);
    const lineStart = lineStarts[lineIdx] || 0;

    return {
      line: lineIdx + 1,
      char: (index - lineStart) + 1
    };
  };

  /**
   * Replace all matches of rx with `to`, logging each replacement occurrence.
   *
   * @param {string} text
   * @param {RegExp} rx
   * @param {string} to
   * @param {{fileRel:string}} meta
   * @returns {string}
   */
  const replaceAllWithLogging = (text, rx, to, meta) => {
    // Ensure global, otherwise exec loop would stall.
    if (!rx.global) {
      rx = new RegExp(rx.source, (rx.flags || '') + 'g');
    }

    rx.lastIndex = 0;
    const first = rx.exec(text);
    if (!first) return text;

    const lineStarts = buildLineStarts(text);

    /** @type {string[]} */
    const outParts = [];
    let last = 0;

    /** @type {RegExpExecArray|null} */
    let m = first;

    while (m !== null) {
      const from = m[0];
      const start = m.index;

      // Guard: zero-length matches can infinite-loop
      if (from.length === 0) {
        rx.lastIndex++;
        m = rx.exec(text);
        continue;
      }

      outParts.push(text.slice(last, start));
      outParts.push(to);

      const pos = indexToLineChar(lineStarts, start);

      log.detail(LOG_TAG_NORMALIZE_PATHS, 'Text reference updated:', {
        file: meta.fileRel,
        line: pos.line,
        char: pos.char,
        from,
        to
      });

      last = start + from.length;
      m = rx.exec(text);
    }

    outParts.push(text.slice(last));
    return outParts.join('');
  };

  for (const abs of files) {
    const { ok, text } = readTextFileIfText(abs);
    if (!ok) continue;

    touched++;

    const fileRel = NODE_CURE_PATH.slashForward(NODE_CURE_PATH.relative(rootAbs, abs));

    let out = text;

    /**
     * Replace all matches of rx using a dynamic replacer, logging each replacement occurrence.
     *
     * @param {string} text
     * @param {RegExp} rx
     * @param {(m:RegExpExecArray)=>string} replacer
     * @param {{fileRel:string}} meta
     * @returns {string}
     */
    const replaceAllWithLoggingDynamic = (text, rx, replacer, meta) => {
      if (!rx.global) {
        rx = new RegExp(rx.source, (rx.flags || '') + 'g');
      }

      rx.lastIndex = 0;
      const first = rx.exec(text);
      if (!first) return text;

      const lineStarts = buildLineStarts(text);

      /** @type {string[]} */
      const outParts = [];
      let last = 0;

      /** @type {RegExpExecArray|null} */
      let m = first;

      while (m !== null) {
        const from = m[0];
        const start = m.index;

        if (from.length === 0) {
          rx.lastIndex++;
          m = rx.exec(text);
          continue;
        }

        const to = replacer(m);

        // No change -> keep original match and do not log.
        if (to === from) {
          m = rx.exec(text);
          continue;
        }

        outParts.push(text.slice(last, start));
        outParts.push(to);

        const pos = indexToLineChar(lineStarts, start);

        log.detail(LOG_TAG_NORMALIZE_PATHS, 'Text reference updated:', {
          file: meta.fileRel,
          line: pos.line,
          char: pos.char,
          from,
          to
        });

        last = start + from.length;
        m = rx.exec(text);
      }

      // If we never replaced anything, avoid rebuilding the whole string.
      if (outParts.length === 0) return text;

      outParts.push(text.slice(last));
      return outParts.join('');
    };

    /**
     * Normalize SCSS module specifiers used in @use/@forward strings.
     * - Applies lower-hyphen segment normalization similar to normalize-paths behavior.
     * - Leaves `sass:*` untouched (built-in Sass modules).
     *
     * @param {string} raw
     * @returns {string}
     */
    const normalizeScssModuleSpecifier = (raw) => {
      const original = String(raw ?? '');
      if (!original) return original;

      const leadWs = (original.match(/^\s*/) || [''])[0];
      const tailWs = (original.match(/\s*$/) || [''])[0];

      let s = original.trim();
      if (!s) return original;

      // Do NOT touch Sass built-in modules.
      if (/^sass:/i.test(s)) return original;

      // Preserve query/hash tails (rare, but harmless).
      let tail = '';
      const tailIdx = s.search(/[?#]/);
      if (tailIdx !== -1) {
        tail = s.slice(tailIdx);
        s = s.slice(0, tailIdx);
      }

      // Preserve leading "~" (webpack-style).
      let tilde = '';
      if (s.startsWith('~')) {
        tilde = '~';
        s = s.slice(1);
      }

      // Normalize slashes for stable splitting.
      s = NODE_CURE_PATH.slashForward(s);

      // Preserve leading "./" and leading "/".
      // (Do not strip "../" because it's meaningful in SCSS relative imports.)
      let lead = '';
      if (s.startsWith('./')) {
        lead = './';
        s = s.slice(2);
      } else if (s.startsWith('/')) {
        lead = '/';
        s = s.replace(/^\/+/, '');
      }

      const parts = s.split('/');

      const outParts = parts.map((seg, idx) => {
        if (seg === '' || seg === '.' || seg === '..') return seg;

        // Preserve a leading "_" (skipPrefix behavior) but normalize the remainder.
        const hasSkipPrefix = String(seg || '').startsWith('_');
        const prefix = hasSkipPrefix ? '_' : '';
        const core = hasSkipPrefix ? String(seg || '').slice(1) : String(seg || '');

        if (!core) return seg;

        const isLast = (idx === parts.length - 1);
        return prefix + normalizePathSegment(core, { preserveExtension: isLast });
      });

      return leadWs + tilde + lead + outParts.join('/') + tail + tailWs;
    };

    /**
     * Normalize local CSS url(...) paths.
     * - Keeps protocol/data/hash/external URLs untouched.
     * - Keeps query/hash suffixes.
     * - Preserves ".", "..", and leading "_" segment prefix behavior.
     *
     * @param {string} raw
     * @returns {string}
     */
    const normalizeLocalCssUrlPath = (raw) => {
      const original = String(raw ?? '');
      if (!original) return original;

      const trimmed = original.trim();
      if (!trimmed) return original;

      // Ignore protocol/external/hash-only URLs.
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(trimmed)) return original;

      // Ignore interpolated/dynamic values.
      if (/[${}]/.test(trimmed)) return original;

      let s = NODE_CURE_PATH.slashForward(trimmed);

      let tail = '';
      const tailIdx = s.search(/[?#]/);
      if (tailIdx !== -1) {
        tail = s.slice(tailIdx);
        s = s.slice(0, tailIdx);
      }

      let lead = '';
      if (s.startsWith('/')) {
        lead = '/';
        s = s.replace(/^\/+/, '');
      }

      const parts = s.split('/');

      const outParts = parts.map((seg, idx) => {
        if (seg === '' || seg === '.' || seg === '..') return seg;

        const hasSkipPrefix = String(seg || '').startsWith('_');
        const prefix = hasSkipPrefix ? '_' : '';
        const core = hasSkipPrefix ? String(seg || '').slice(1) : String(seg || '');
        if (!core) return seg;

        const isLast = (idx === parts.length - 1);
        return prefix + normalizePathSegment(core, { preserveExtension: isLast });
      });

      return lead + outParts.join('/') + tail;
    };

    /**
     * Normalize local JS/TS module specifiers used by:
     * - import ... from '...'
     * - import '...'
     * - import('...')
     * - require('...')
     *
     * @param {string} raw
     * @returns {string}
     */
    const normalizeJsModuleSpecifier = (raw) => {
      const original = String(raw ?? '');
      if (!original) return original;

      const leadWs = (original.match(/^\s*/) || [''])[0];
      const tailWs = (original.match(/\s*$/) || [''])[0];

      let s = original.trim();
      if (!s) return original;

      // Keep protocol, protocol-relative, fragment, and template-like imports unchanged.
      if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(s)) return original;
      if (/[${}]/.test(s)) return original;

      // Only normalize local paths; package imports should stay untouched.
      if (!(s.startsWith('./') || s.startsWith('../') || s.startsWith('/'))) return original;

      let tail = '';
      const tailIdx = s.search(/[?#]/);
      if (tailIdx !== -1) {
        tail = s.slice(tailIdx);
        s = s.slice(0, tailIdx);
      }

      s = NODE_CURE_PATH.slashForward(s);

      let lead = '';
      if (s.startsWith('/')) {
        lead = '/';
        s = s.replace(/^\/+/, '');
      } else {
        const m = s.match(/^(?:\.\.\/|\.\/)+/);
        if (m) {
          lead = m[0];
          s = s.slice(lead.length);
        }
      }

      const parts = s.split('/');

      const outParts = parts.map((seg, idx) => {
        if (seg === '' || seg === '.' || seg === '..') return seg;

        const hasSkipPrefix = String(seg || '').startsWith('_');
        const prefix = hasSkipPrefix ? '_' : '';
        const core = hasSkipPrefix ? String(seg || '').slice(1) : String(seg || '');
        if (!core) return seg;

        const isLast = (idx === parts.length - 1);
        return prefix + normalizePathSegment(core, { preserveExtension: isLast });
      });

      return leadWs + lead + outParts.join('/') + tail + tailWs;
    };

    /**
     * Apply mapping entries as plain literal replacements to a specifier string.
     * Intended for migration-safe rewrites where only explicit {from,to} rules should apply.
     *
     * @param {string} raw
     * @returns {string}
     */
    const applyMappingLiteralToSpecifier = (raw) => {
      let outSpec = String(raw ?? '');
      if (!outSpec) return outSpec;

      for (const { from, to } of mappingSorted) {
        const fromF = NODE_CURE_PATH.slashForward(from);
        const toF   = NODE_CURE_PATH.slashForward(to);
        const fromB = fromF.replace(/\//g, '\\');
        const toB   = toF.replace(/\//g, '\\');

        outSpec = outSpec
          .split('/' + fromF).join('/' + toF)
          .split(fromF).join(toF)
          .split('\\' + fromB).join('\\' + toB)
          .split(fromB).join(toB);
      }

      return outSpec;
    };

    /**
     * Normalize the static file path used as the first file-include argument.
     * - Accepts whitespace/newlines around path separators.
     * - Skips dynamic include paths (e.g. "+context.scripts[i]+").
     *
     * @param {string} raw
     * @returns {string}
     */
    const normalizeFileIncludeSpecifier = (raw) => {
      const original = String(raw ?? '');
      if (!original) return original;

      const leadWs = (original.match(/^\s*/) || [''])[0];
      const tailWs = (original.match(/\s*$/) || [''])[0];

      let s = original.trim();
      if (!s) return original;

      // Keep dynamic/template-like include paths untouched.
      if (/[${}]/.test(s)) return original;
      if (/\+\s*context\.[A-Za-z_$][\w$]*(?:\[[^\]]+\])?\s*\+/i.test(s)) return original;
      if (/^\+\s*context\./i.test(s)) return original;

      s = NODE_CURE_PATH.slashForward(s);
      s = s.replace(/\\\r?\n/g, '');
      s = s.replace(/\s*\/\s*/g, '/');

      let tail = '';
      const tailIdx = s.search(/[?#]/);
      if (tailIdx !== -1) {
        tail = s.slice(tailIdx);
        s = s.slice(0, tailIdx);
      }

      let lead = '';
      if (s.startsWith('/')) {
        lead = '/';
        s = s.replace(/^\/+/, '');
      } else {
        const m = s.match(/^(?:\.\.\/|\.\/)+/);
        if (m) {
          lead = m[0];
          s = s.slice(lead.length);
        }
      }

      const parts = s.split('/');

      const outParts = parts.map((seg, idx) => {
        if (seg === '' || seg === '.' || seg === '..') return seg;

        const hasSkipPrefix = String(seg || '').startsWith('_');
        const prefix = hasSkipPrefix ? '_' : '';
        const core = hasSkipPrefix ? String(seg || '').slice(1) : String(seg || '');
        if (!core) return seg;

        const isLast = (idx === parts.length - 1);
        return prefix + normalizePathSegment(core, { preserveExtension: isLast });
      });

      let outPath = lead + outParts.join('/') + tail;

      // Respect resolved rename mapping (including collision suffixes).
      for (const { from, to } of mappingSorted) {
        const fromF = NODE_CURE_PATH.slashForward(from);
        const toF   = NODE_CURE_PATH.slashForward(to);

        if (outPath === fromF) {
          outPath = toF;
          continue;
        }

        const rx = new RegExp(`(^|/)${rxEscape(fromF)}(?=$|/)`, 'g');
        outPath = outPath.replace(rx, (_, p1) => `${p1}${toF}`);
      }

      return leadWs + outPath + tail + tailWs;
    };

    /**
     * Rewrite the first file-include argument, supporting multiline/whitespace formatting.
     *
     * @param {string} text
     * @param {{fileRel:string}} meta
     * @returns {string}
     */
    const rewriteFileIncludeSpecifiers = (text, meta) => {
      const RX_FILE_INCLUDE = /(@@include\s*\(\s*)(['"])([\s\S]*?)\2(\s*(?:,\s*[\s\S]*?)?\))/g;

      /**
       * Normalize a quoted literal found inside a file-include options payload.
       * Only local path-like literals are transformed.
       *
       * @param {string} raw
       * @returns {string}
       */
      const normalizeIncludeOptionLiteral = (raw) => {
        const original = String(raw ?? '');
        if (!original) return original;

        const s = original.trim();
        if (!s) return original;

        // Skip dynamic/template-like values.
        if (/[${}]/.test(s)) return original;
        if (/\+\s*context\.[A-Za-z_$][\w$]*(?:\[[^\]]+\])?\s*\+/i.test(s)) return original;
        if (/^\+\s*context\./i.test(s)) return original;

        // Skip external URLs and non-path-like literals.
        if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(s)) return original;
        if (!s.includes('/')) return original;

        return normalizeFileIncludeSpecifier(original);
      };

      return replaceAllWithLoggingDynamic(
        text,
        RX_FILE_INCLUDE,
        (m) => {
          const pathRaw = m[3];
          const tailRaw = m[4] || '';

          const pathNorm = normalizeFileIncludeSpecifiers
            ? normalizeFileIncludeSpecifier(pathRaw)
            : pathRaw;

          const tailNorm = normalizeIncludeOptionLiterals
            ? tailRaw.replace(/(['"])([^'"]+)\1/g, (m0, q, value) => {
                const normalized = normalizeIncludeOptionLiteral(value);
                if (normalized === value) return m0;
                return `${q}${normalized}${q}`;
              })
            : tailRaw;

          if (pathNorm === pathRaw && tailNorm === tailRaw) return m[0];

          return `${m[1]}${m[2]}${pathNorm}${m[2]}${tailNorm}`;
        },
        meta
      );
    };

        /** @type {Array<{oldNs:string, newNs:string}>} */
    const scssNsRenames = [];

    /**
     * Derive Sass implicit namespace from a @use specifier.
     * - last path segment
     * - drop extension
     * - drop leading "_" (partials)
     *
     * @param {string} spec
     * @returns {string}
     */
    const getImplicitSassNamespaceFromSpecifier = (spec) => {
      let s = String(spec || '').trim();
      if (!s) return '';

      // Remove query/hash
      const tailIdx = s.search(/[?#]/);
      if (tailIdx !== -1) s = s.slice(0, tailIdx);

      s = NODE_CURE_PATH.slashForward(s);

      const leaf = (s.split('/').pop() || '').trim();
      if (!leaf) return '';

      // Drop extension (e.g., ".scss", ".sass", ".css")
      const leafNoExt = leaf.replace(/\.[^.]+$/, '');

      // Drop leading "_" (partials)
      const ns = leafNoExt.startsWith('_') ? leafNoExt.slice(1) : leafNoExt;

      return ns;
    };

    /**
     * SCSS-only rewrite: normalize @use/@forward module strings (leave sass:* alone).
     *
     * @param {string} text
     * @param {{fileRel:string}} meta
     * @returns {string}
     */
    const rewriteScssUseForwardSpecifiers = (text, meta) => {
      if (scssUseForwardMode === 'off') return text;

      // Accept "@forwards" too (common typo).
      // Capture:
      //  1) kw, 2) ws, 3) quote, 4) spec, 5) tail (e.g. " as foo"), 6) optional semicolon
      const RX = /@(use|forward|forwards)(\s+)(['"])([^'"]+)\3([^;\n]*)(;?)/g;

      return replaceAllWithLoggingDynamic(
        text,
        RX,
        (m) => {
          const kw = m[1];
          const ws = m[2];
          const q  = m[3];
          const spec = m[4];
          const tail = m[5] || '';
          const semi = m[6] || '';

          const spec2 = (scssUseForwardMode === 'mapping_only')
            ? applyMappingLiteralToSpecifier(spec)
            : normalizeScssModuleSpecifier(spec);
          if (spec2 === spec) return m[0];

          // If there's NO explicit "as <alias>", Sass uses implicit namespace from the filename.
          // When we normalize the spec (underscore -> hyphen), we must also update those refs.
          const hasExplicitAs = /\bas\s+/i.test(tail);

          if (scssUseForwardMode === 'full' && !hasExplicitAs) {
            const oldNs = getImplicitSassNamespaceFromSpecifier(spec);
            const newNs = getImplicitSassNamespaceFromSpecifier(spec2);

            if (oldNs && newNs && oldNs !== newNs) {
              scssNsRenames.push({ oldNs, newNs });
            }
          }

          return `@${kw}${ws}${q}${spec2}${q}${tail}${semi}`;
        },
        meta
      );
    };

    /**
     * JS/TS-only rewrite: normalize local module specifiers.
     *
     * @param {string} text
     * @param {{fileRel:string}} meta
     * @returns {string}
     */
    const rewriteJsModuleSpecifiers = (text, meta) => {
      let outText = text;

      // import/export ... from '...'
      outText = replaceAllWithLoggingDynamic(
        outText,
        /(from\s+)(['"])([^'"\n]+)\2/g,
        (m) => {
          const spec = m[3];
          const spec2 = normalizeJsModuleSpecifier(spec);
          if (spec2 === spec) return m[0];
          return `${m[1]}${m[2]}${spec2}${m[2]}`;
        },
        meta
      );

      // import '...'
      outText = replaceAllWithLoggingDynamic(
        outText,
        /(import\s+)(['"])([^'"\n]+)\2/g,
        (m) => {
          const spec = m[3];
          const spec2 = normalizeJsModuleSpecifier(spec);
          if (spec2 === spec) return m[0];
          return `${m[1]}${m[2]}${spec2}${m[2]}`;
        },
        meta
      );

      // import('...')
      outText = replaceAllWithLoggingDynamic(
        outText,
        /(import\s*\(\s*)(['"])([^'"\n]+)\2(\s*\))/g,
        (m) => {
          const spec = m[3];
          const spec2 = normalizeJsModuleSpecifier(spec);
          if (spec2 === spec) return m[0];
          return `${m[1]}${m[2]}${spec2}${m[2]}${m[4]}`;
        },
        meta
      );

      // require('...')
      outText = replaceAllWithLoggingDynamic(
        outText,
        /(require\s*\(\s*)(['"])([^'"\n]+)\2(\s*\))/g,
        (m) => {
          const spec = m[3];
          const spec2 = normalizeJsModuleSpecifier(spec);
          if (spec2 === spec) return m[0];
          return `${m[1]}${m[2]}${spec2}${m[2]}${m[4]}`;
        },
        meta
      );

      // Browserify dependency map keys:
      //   {"./path/to/module.js": 1, ...}
      // Keep this scoped to local-like keys ("./" or "../") to avoid broad object-key rewrites.
      outText = replaceAllWithLoggingDynamic(
        outText,
        /([,{]\s*)(['"])(\.{1,2}\/[^'"\n]+)\2(\s*:)/g,
        (m) => {
          const spec = m[3];
          const spec2 = normalizeJsModuleSpecifier(spec);
          if (spec2 === spec) return m[0];
          return `${m[1]}${m[2]}${spec2}${m[2]}${m[4]}`;
        },
        meta
      );

      return outText;
    };

    // Handle @@include path arg rewriting first (supports odd whitespace/newlines).
    if (normalizeFileIncludeSpecifiers || normalizeIncludeOptionLiterals) {
      out = rewriteFileIncludeSpecifiers(out, { fileRel });
    }

    // Optional context-aware regex rewrites (used by migrations for scoped behavior).
    for (const rw of regexRewrites) {
      const rx = (rw && rw.regex instanceof RegExp) ? rw.regex : null;
      if (!rx) continue;

      out = replaceAllWithLoggingDynamic(
        out,
        rx,
        (m) => {
          const from = m[0];
          if (typeof rw.replace === 'function') {
            const next = rw.replace(m);
            return (typeof next === 'string') ? next : from;
          }
          return from;
        },
        { fileRel }
      );
    }

    for (const rule of compiledLiteralRules) {
      if (!out.includes(rule.needle)) continue;
      out = replaceAllWithLogging(out, rule.rx, rule.to, { fileRel });
    }

    // Segment-flex path rewrites:
    // - always enabled
    // - migration can internally scope via `segmentFlexAllowPrefixes`
    // - normalize-paths uses full mapping by default
    for (const rule of compiledSegmentFlexRules) {
      out = replaceAllWithLoggingDynamic(
        out,
        rule.rx,
        (m) => `${m[1]}${rule.to}`,
        { fileRel }
      );
    }

    // -------------------------------------------------------------------------
    // Font Icon token fixup (HTML/CSS/JS/etc):
    //
    // Normalize font-icon class/name tokens that are NOT paths and therefore
    // will never be touched by the {from,to} mapping.
    //
    // Example (from font-icon.html):
    //   font-icon--interface-home         -> font-icon--interface--home
    //   data-font-icon-name="arrow_down" -> data-font-icon-name="arrow_down"
    //
    // This is intentionally scoped to "font-icon--" and data-font-icon-* tokens
    // to avoid global underscore -> hyphen changes.
    // IMPORTANT: keep set/icon identifiers as-authored (including underscores).
    // -------------------------------------------------------------------------
    if (normalizeFontIconTokens) {
      for (const rule of strictFontIconRules.tokenRules) {
        out = replaceAllWithLoggingDynamic(
          out,
          rule.rx,
          (m) => `${m[1]}${rule.to}`,
          { fileRel }
        );
      }

      for (const rule of strictFontIconRules.setRules) {
        out = replaceAllWithLogging(
          out,
          rule.rx,
          rule.to,
          { fileRel }
        );
      }

      for (const rule of strictFontIconRules.nameRules) {
        out = replaceAllWithLogging(
          out,
          rule.rx,
          rule.to,
          { fileRel }
        );
      }

      for (const rule of strictFontIconRules.fontFamilyRules) {
        out = replaceAllWithLogging(
          out,
          rule.rx,
          rule.to,
          { fileRel }
        );
      }

      const fontIconSetAlt = '(?:browser|icon|interface|social|synticore|system|module-photoswipe|module-siema)';

      // 0) Canonical class delimiter:
      //    font-icon--<set>-<name> -> font-icon--<set>--<name>
      //    font-icon--color--<set>-<name> -> font-icon--color--<set>--<name>
      out = replaceAllWithLoggingDynamic(
        out,
        new RegExp(`(\\$?font-icon--color--${fontIconSetAlt})-(?!-)([A-Za-z0-9_][A-Za-z0-9_-]*)`, 'g'),
        (m) => `${m[1]}--${m[2]}`,
        { fileRel }
      );

      out = replaceAllWithLoggingDynamic(
        out,
        new RegExp(`(\\$?font-icon--${fontIconSetAlt})-(?!-)([A-Za-z0-9_][A-Za-z0-9_-]*)`, 'g'),
        (m) => `${m[1]}--${m[2]}`,
        { fileRel }
      );

      // 1) font-icon palette/color classes:
      //    font-icon--color--<set>--<name>[--suffix]
      out = replaceAllWithLoggingDynamic(
        out,
        /(font-icon--color--)([A-Za-z0-9_-]+)/g,
        (m) => `${m[1]}${m[2]}`,
        { fileRel }
      );

      // 2) icon glyph classes (avoid double-normalizing color prefix handled above):
      //    font-icon--<set>--<name>[--suffix]
      out = replaceAllWithLoggingDynamic(
        out,
        /(font-icon--)(?!color--)([A-Za-z0-9_-]+)/g,
        (m) => `${m[1]}${m[2]}`,
        { fileRel }
      );

      // 3) data attributes used by your browser page:
      //    data-font-icon-set="..." / data-font-icon-name="..."
      out = replaceAllWithLoggingDynamic(
        out,
        /(data-font-icon-(?:set|name)=['"])([^'"]+)(['"])/g,
        (m) => `${m[1]}${m[2]}${m[3]}`,
        { fileRel }
      );

      // 4) module icon classes used by example pages:
      //    Preserve module_<name> (do not force underscores to hyphens).
      out = replaceAllWithLoggingDynamic(
        out,
        /(icon-)(module_[A-Za-z0-9_-]+)/g,
        (m) => `${m[1]}${m[2]}`,
        { fileRel }
      );

      // 5) module font-family / css filename tokens:
      //    Preserve module_<name> (do not force underscores to hyphens).
      out = replaceAllWithLoggingDynamic(
        out,
        /(font-icon-)(module_[A-Za-z0-9_-]+)/g,
        (m) => `${m[1]}${m[2]}`,
        { fileRel }
      );

      // 6) legacy + canonical CSS font-family values:
      //    font-family: "font_icon_interface" -> font-family: "font-icon--interface"
      //    font-family: "font-icon-interface" -> font-family: "font-icon--interface"
      // Keep this scoped to CSS-like files and font-family declarations only.
      if (/\.(?:css|scss|sass)$/i.test(fileRel)) {
        out = replaceAllWithLoggingDynamic(
          out,
          /(\bfont-family\s*:\s*["'])font_icon_([A-Za-z0-9_-]+)(["'])/gi,
          (m) => `${m[1]}font-icon--${m[2]}${m[3]}`,
          { fileRel }
        );

        out = replaceAllWithLoggingDynamic(
          out,
          /(\bfont-family\s*:\s*["'])font-icon-(?!-)([A-Za-z0-9_-]+)(["'])/gi,
          (m) => `${m[1]}font-icon--${m[2]}${m[3]}`,
          { fileRel }
        );
      }
    }

    // -------------------------------------------------------------------------
    // SCSS fixup: prevent "font-icon-_<name>" aliases.
    //
    // Desired:
    //   font_icon_interface        -> font-icon-interface
    //   font_icon_module_photoswipe -> font-icon-module_photoswipe
    //
    // Specifically: if we ever end up with "as font-icon-_<name>", remove ONLY
    // the underscore immediately after "font-icon-".
    // -------------------------------------------------------------------------
    if (/\.(?:scss|sass)$/i.test(fileRel)) {
      out = replaceAllWithLoggingDynamic(
        out,
        /(@(?:use|forward|forwards)\s+['"][^'"]+['"]\s+as\s+)font-icon-_([A-Za-z0-9_]+)/g,
        (m) => `${m[1]}font-icon-${m[2]}`,
        { fileRel }
      );
    }

    // CSS/SCSS/SASS: normalize local asset paths inside url(...), e.g.
    // "../font/roman_font_7/roman_font_7.ttf" -> "../font/roman-font-7/roman-font-7.ttf"
    if (normalizeCssUrlPaths && /\.(?:css|scss|sass)$/i.test(fileRel)) {
      out = replaceAllWithLoggingDynamic(
        out,
        /(url\(\s*)(['"]?)([^"'()]+)\2(\s*\))/gi,
        (m) => {
          const pathRaw = m[3];
          const pathNorm = normalizeLocalCssUrlPath(pathRaw);
          if (pathNorm === pathRaw) return m[0];

          return `${m[1]}${m[2]}${pathNorm}${m[2]}${m[4]}`;
        },
        { fileRel }
      );
    }

    // SCSS: normalize @use/@forward module specifiers too (but do NOT touch sass:*).
    // NOTE: This is great for normalize-paths, but migrations may want to disable it.
    if (scssUseForwardMode !== 'off' && /\.(?:scss|sass)$/i.test(fileRel)) {
      scssNsRenames.length = 0;

      out = rewriteScssUseForwardSpecifiers(out, { fileRel });

      // Apply implicit-namespace renames AFTER specifier normalization.
      // Example: @use 'variable-frame'; => namespace becomes "variable-frame"
      // so rewrite: variable_frame.$x -> variable-frame.$x
      if (scssUseForwardMode === 'full') {
        for (const { oldNs, newNs } of scssNsRenames) {
          const rx = new RegExp(`\\b${rxEscape(oldNs)}\\.`, 'g');

          out = replaceAllWithLoggingDynamic(
            out,
            rx,
            () => `${newNs}.`,
            { fileRel }
          );
        }
      }
    }

    // JS/TS: normalize local module paths in import/require specifiers.
    if (normalizeJsModuleSpecifiers && /\.(?:[cm]?[jt]sx?)$/i.test(fileRel)) {
      out = rewriteJsModuleSpecifiers(out, { fileRel });
    }

    if (out !== text) {
      NODE_CURE_FS.writeFileSync(abs, out);
      changed++;
      changedFilesRel.push(fileRel);
    }

  }

  return { touched, changed, changedFilesRel };
}

/**
 * Rewrite cache entry keys (path strings) using the normalize-paths mapping.
 *
 * Why:
 * - Our caches are keyed by file paths (relative to cache.root).
 * - Normalize Paths renames files/dirs, but cache keys remain on the old names.
 * - This causes missed hits + stale entries until a full reset.
 *
 * Behavior:
 * - For each namespace bucket in cache.entries, renames keys where:
 *   - key === from
 *   - key startsWith(from + '/')
 * - Longest `from` first, so nested paths rewrite before parent-ish prefixes.
 *
 * Notes:
 * - Uses cache.entries + cache.save() when available.
 * - Falls back to NODE_CURE_JSON load/save if needed.
 *
 * @param {any} cache
 * @param {Array<{from:string,to:string}>} mapping
 * @param {{
 *   label?: string,
 *   logTag?: string,
 *   rootPrefixRel?: string
 * }} [opt]
 * @returns {{touched:number, renamed:number, namespaces:number}}
 */
function libraryCacheRewritePathKeysFromNormalizeMapping(cache, mapping, opt = {}) {
  const logTag = opt.logTag || LOG_TAG_NORMALIZE_PATHS;
  const label  = opt.label || 'cache';
  const rootPrefixRelRaw = String(opt.rootPrefixRel || '');

  /** @type {Array<{from:string,to:string}>} */
  const mappingList = Array.isArray(mapping) ? mapping : [];

  // Nothing to do
  if (!cache || mappingList.length === 0) {
    return { touched: 0, renamed: 0, namespaces: 0 };
  }

  // Normalize prefix (used for caches whose root differs from PATH_DIR_PROJECT_IN)
  const rootPrefixRel = NODE_CURE_PATH
    .slashForward(rootPrefixRelRaw)
    .replace(/\/+$/g, '');

  // Longest-first so nested rewrites happen before parents
  const mappingSorted = mappingList
    .slice()
    .map(({ from, to }) => ({
      from: NODE_CURE_PATH.slashForward(String(from || '')),
      to:   NODE_CURE_PATH.slashForward(String(to   || ''))
    }))
    .filter(m => m.from && m.to && m.from !== m.to)
    .sort((a, b) => b.from.length - a.from.length)
    .map(m => {
      if (!rootPrefixRel) return m;
      return {
        from: `${rootPrefixRel}/${m.from}`,
        to:   `${rootPrefixRel}/${m.to}`
      };
    });

  // Load entries (prefer cache.entries; fallback to file load)
  /** @type {any} */
  let entries = (cache && cache.entries && typeof cache.entries === 'object')
    ? cache.entries
    : null;

  try {
    if (!entries && cache.file && NODE_FS.existsSync(cache.file)) {
      entries = NODE_CURE_JSON.load(cache.file) || {};
      cache.entries = entries;
    }
  } catch (e) {
    log.warn(logTag, 'Cache load failed; skipping cache path rewrite.', {
      label,
      file: cache?.file,
      error: String(e?.message || e)
    });
    return { touched: 0, renamed: 0, namespaces: 0 };
  }

  if (!entries || typeof entries !== 'object') {
    return { touched: 0, renamed: 0, namespaces: 0 };
  }

  const applyOne = (key) => {
    const k = NODE_CURE_PATH.slashForward(String(key || ''));
    if (!k) return k;

    for (const { from, to } of mappingSorted) {
      if (k === from) return to;
      if (k.startsWith(from + '/')) return to + k.slice(from.length);
    }

    // Fallback for stale legacy keys not covered by this run's explicit map.
    const kNorm = normalizePathKeyLike(k);
    return kNorm || k;
  };

  let touched = 0;
  let renamed = 0;
  let namespaces = 0;

  for (const ns of Object.keys(entries)) {
    const bucket = entries[ns];

    if (!bucket || typeof bucket !== 'object' || Array.isArray(bucket)) continue;

    namespaces++;

    /** @type {Record<string, any>} */
    const nextBucket = {};

    for (const [kRaw, v] of Object.entries(bucket)) {
      touched++;

      const kNew = applyOne(kRaw);

      if (kNew !== kRaw) renamed++;

      // Collision is unlikely (mapping should be 1:1), but guard anyway.
      if (Object.prototype.hasOwnProperty.call(nextBucket, kNew)) {
        log.warn(logTag, 'Cache key collision while rewriting paths (keeping latest).', {
          label,
          namespace: ns,
          key: kNew
        });
      }

      nextBucket[kNew] = v;
    }

    // Keep stable ordering for diffs
    entries[ns] = _sortObjectShallow(nextBucket);
  }

  if (renamed > 0) {
    try {
      if (typeof cache.save === 'function') {
        cache.save();
      } else if (cache.file) {
        NODE_CURE_JSON.save(cache.file, entries, { sort: true });
      }
      log.info(logTag, 'Cache path-key rewrite complete.', {
        label,
        file: cache?.file,
        rootPrefixRel: rootPrefixRel || null,
        namespaces,
        touched,
        renamed
      });
    } catch (e) {
      log.warn(logTag, 'Cache save failed after path-key rewrite.', {
        label,
        file: cache?.file,
        error: String(e?.message || e)
      });
    }
  } else {
    log.detail(logTag, 'Cache path-key rewrite: no changes.', {
      label,
      namespaces,
      touched
    });
  }

  return { touched, renamed, namespaces };
}

/**
 * Refresh cache entries (signature/data) for changed `in/` files after normalize-paths.
 * This keeps `project/_cache/project/file.json` content in sync after text rewrites.
 *
 * Scope:
 * - Only updates namespaces/keys that already exist in cache entries.
 * - Does NOT create new namespace-key pairs.
 *
 * @param {any} cache
 * @param {string[]} absFilesChanged
 * @param {{logTag?:string, label?:string}} [opt]
 * @returns {Promise<{files:number, stored:number, namespacesTouched:number}>}
 */
async function libraryCacheRefreshChangedFiles(cache, absFilesChanged, opt = {}) {
  const logTag = opt.logTag || LOG_TAG_NORMALIZE_PATHS;
  const label = opt.label || 'cache';

  if (!cache || !Array.isArray(absFilesChanged) || absFilesChanged.length === 0) {
    return { files: 0, stored: 0, namespacesTouched: 0 };
  }

  const entries = (cache.entries && typeof cache.entries === 'object')
    ? cache.entries
    : {};

  const namespaces = Object.keys(entries);
  if (namespaces.length === 0) {
    return { files: 0, stored: 0, namespacesTouched: 0 };
  }

  const absUnique = Array.from(new Set(
    absFilesChanged
      .map(p => String(p || '').trim())
      .filter(Boolean)
      .map(p => NODE_PATH.resolve(p))
  ));

  let files = 0;
  let stored = 0;
  /** @type {Set<string>} */
  const namespacesTouched = new Set();

  for (const abs of absUnique) {
    if (!NODE_FS.existsSync(abs)) continue;
    let stat = null;
    try { stat = NODE_FS.statSync(abs); } catch (_) { stat = null; }
    if (!stat || !stat.isFile()) continue;

    files++;

    const keyRaw = String(cache.getKey(abs) || '');
    const keyNorm = NODE_CURE_PATH.slashForward(keyRaw);

    for (const ns of namespaces) {
      const bucket = entries[ns];
      if (!bucket || typeof bucket !== 'object' || Array.isArray(bucket)) continue;

      if (!Object.prototype.hasOwnProperty.call(bucket, keyRaw) &&
          !Object.prototype.hasOwnProperty.call(bucket, keyNorm)) {
        continue;
      }

      await cache.store(ns, abs, false);
      stored++;
      namespacesTouched.add(ns);
    }
  }

  if (stored > 0 && typeof cache.save === 'function') {
    cache.save();
  }

  log.info(logTag, 'Cache content refresh complete.', {
    label,
    files,
    stored,
    namespacesTouched: namespacesTouched.size
  });

  return { files, stored, namespacesTouched: namespacesTouched.size };
}

/**
 * Refresh stale cache signatures by validating every existing cache key against disk.
 *
 * Why:
 * - Targeted refresh (rename/text-changed list) can miss files that were already dirty
 *   before normalize-paths started.
 * - This sweep guarantees cache signatures reflect current file contents for existing keys.
 *
 * Scope:
 * - Only existing namespace/key pairs are considered.
 * - Missing files are skipped.
 *
 * @param {any} cache
 * @param {{logTag?:string, label?:string, reloadFromDisk?:boolean}} [opt]
 * @returns {Promise<{checked:number, refreshed:number, missing:number, namespaces:number}>}
 */
async function libraryCacheRefreshStaleEntries(cache, opt = {}) {
  const logTag = opt.logTag || LOG_TAG_NORMALIZE_PATHS;
  const label = opt.label || 'cache';
  const reloadFromDisk = opt.reloadFromDisk === true;

  if (!cache) {
    return { checked: 0, refreshed: 0, missing: 0, namespaces: 0 };
  }

  if (reloadFromDisk && cache.file && NODE_FS.existsSync(cache.file)) {
    try {
      cache.entries = NODE_CURE_JSON.load(cache.file, { fatal: false }) || {};
    } catch (e) {
      log.warn(logTag, 'Cache reload from disk failed before stale-entry refresh (continuing with in-memory entries).', {
        label,
        file: cache.file,
        error: String(e?.message || e)
      });
    }
  }

  if (!cache.entries || typeof cache.entries !== 'object') {
    return { checked: 0, refreshed: 0, missing: 0, namespaces: 0 };
  }

  const cacheRoot = String(cache.pathRoot || cache.root || '');
  if (!cacheRoot) {
    log.warn(logTag, 'Cache stale-entry refresh skipped (missing cache root).', { label });
    return { checked: 0, refreshed: 0, missing: 0, namespaces: 0 };
  }

  const namespaces = Object.keys(cache.entries).filter(ns => {
    const bucket = cache.entries[ns];
    return !!bucket && typeof bucket === 'object' && !Array.isArray(bucket);
  });

  let checked = 0;
  let refreshed = 0;
  let missing = 0;

  for (const ns of namespaces) {
    const bucket = cache.entries[ns];
    for (const keyRaw of Object.keys(bucket)) {
      const keyNorm = NODE_CURE_PATH.slashForward(String(keyRaw || ''));
      if (!keyNorm) continue;

      const abs = NODE_PATH.resolve(cacheRoot, ...keyNorm.split('/'));
      checked++;

      if (!NODE_FS.existsSync(abs)) {
        missing++;
        continue;
      }

      let stat = null;
      try { stat = NODE_FS.statSync(abs); } catch (_) { stat = null; }
      if (!stat || !stat.isFile()) continue;

      const valid = await cache.getValidEntry(ns, abs);
      if (valid) continue;

      await cache.store(ns, abs, false);
      refreshed++;
    }
  }

  if (refreshed > 0 && typeof cache.save === 'function') {
    cache.save();
  }

  log.info(logTag, 'Cache stale-entry refresh complete.', {
    label,
    namespaces: namespaces.length,
    checked,
    refreshed,
    missing
  });

  return { checked, refreshed, missing, namespaces: namespaces.length };
}

/**
 * Gulp task: normalize all file/dir names in PATH_DIR_PROJECT_IN to lower-hyphen,
 * then update references inside any detected text file.
 *
 * @param {(err?:any)=>void} done
 * @returns {void}
 */
function primaryNormalizePaths(done) {
  // CONTRACT: this task may perform broad rewrites; keep migration logic separate/minimal.
  const op = logProcessingStart(LOG_TAG_NORMALIZE_PATHS, 'normalize paths');
  (async () => {
    log.begin(LOG_TAG_NORMALIZE_PATHS, 'Running...');

    const skipPrefix = getPathIgnorePrefix() || '_';

    const rootAbs = PATH_DIR_PROJECT_IN;

    const { files, dirs } = walkDirRecursive(rootAbs);

    log.info(LOG_TAG_NORMALIZE_PATHS, 'Scan complete.', {
      root: rootAbs,
      skipPrefix,
      dirs: dirs.length,
      files: files.length
    });

    // Include BOTH dirs + files in mapping (so folder renames are reflected)
    const absAll = dirs.concat(files);

    log.info(LOG_TAG_NORMALIZE_PATHS, 'Building rename mapping...', {
      totalPaths: absAll.length
    });

    const normalizeIn = buildNormalizeMapping(rootAbs, absAll, {
      skipPrefix,
      collisionMode: 'overwrite'
    });
    const mapOldRelToNewRel = normalizeIn.mapOldRelToNewRel;

    log.info(LOG_TAG_NORMALIZE_PATHS, 'Rename mapping built.', {
      entries: mapOldRelToNewRel.size,
      collisions: normalizeIn.collisions
    });

    const resultRename = applyRenames(rootAbs, mapOldRelToNewRel, {
      overwrite: true,
      dropRels: normalizeIn.dropRels,
      appendMappings: normalizeIn.aliasMappings
    });

    log.info(LOG_TAG_NORMALIZE_PATHS, 'Removing empty directories (post-normalize)...', {
      root: rootAbs,
      skipPrefix
    });

    const resultEmptyDirs = removeEmptyDirsUnderRoot(rootAbs, { skipPrefix });

    log.info(LOG_TAG_NORMALIZE_PATHS, 'Empty directory cleanup complete.', resultEmptyDirs);

    /** @type {{touched:number, changed:number, changedFilesRel:string[]}} */
    let resultTextIn = { touched: 0, changed: 0, changedFilesRel: [] };
    /** @type {{touched:number, changed:number, changedFilesRel:string[]}} */
    let resultTextOut = { touched: 0, changed: 0, changedFilesRel: [] };
    /** @type {{renamed:number, skipped:number, missing:number, mapping:Array<{from:string,to:string}>}} */
    let resultOutMirror = { renamed: 0, skipped: 0, missing: 0, mapping: [] };
    /** @type {{renamed:number, skipped:number, mapping:Array<{from:string,to:string}>}} */
    let resultRenameOut = { renamed: 0, skipped: 0, mapping: [] };
    /** @type {Array<{from:string,to:string}>} */
    let mergedMapping = Array.isArray(resultRename.mapping) ? resultRename.mapping.slice() : [];
    /** @type {{filesChanged:number,mapsChanged:number,commentsChanged:number}} */
    let resultSourceMapNormalize = { filesChanged: 0, mapsChanged: 0, commentsChanged: 0 };
    /** @type {{touched:number,renamed:number,dependents:number}} */
    /** @type {{touched:number,renamed:number,files:number}} */
    let resultManifestRewrite = { touched: 0, renamed: 0, files: 0 };

    // ---------------------------------------------------------------------------
    // Apply in/ rename mapping to out/ + cache roots (rename + empty-dir cleanup).
    // ---------------------------------------------------------------------------

    if (PATH_DIR_PROJECT_OUT && NODE_FS.existsSync(PATH_DIR_PROJECT_OUT)) {
      log.info(LOG_TAG_NORMALIZE_PATHS, 'Applying in/ mapping to out/...', {
        root: PATH_DIR_PROJECT_OUT
      });

      resultOutMirror = applyRelMappingToRoot(PATH_DIR_PROJECT_OUT, resultRename.mapping);

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Out mirror rename pass complete.', resultOutMirror);

      const outMirrorEmpty = removeEmptyDirsUnderRoot(PATH_DIR_PROJECT_OUT, { skipPrefix });
      log.info(LOG_TAG_NORMALIZE_PATHS, 'Out mirror empty directory cleanup complete.', outMirrorEmpty);
    }

    /** @type {Array<{label:string, rootAbs:string}>} */
    const EXTRA_ROOTS = [
      { label: 'cache_project', rootAbs: PATH_DIR_PROJECT_CACHE_PROJECT },
      { label: 'cache_compiler',rootAbs: PATH_DIR_PROJECT_CACHE_STATICUS }
    ];

    for (const r of EXTRA_ROOTS) {
      if (!r.rootAbs || !NODE_FS.existsSync(r.rootAbs)) continue;

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Applying normalize mapping to extra root...', {
        label: r.label,
        root: r.rootAbs
      });

      const rRename = applyRelMappingToRoot(r.rootAbs, resultRename.mapping);

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Extra root rename pass complete.', {
        label: r.label,
        ...rRename
      });

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Removing empty directories (extra root)...', {
        label: r.label,
        root: r.rootAbs
      });

      const rEmpty = removeEmptyDirsUnderRoot(r.rootAbs, { skipPrefix });

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Extra root empty directory cleanup complete.', {
        label: r.label,
        ...rEmpty
      });

    }

    // ---------------------------------------------------------------------------
    // Normalize out/ by its own actual artifact names (generated outputs + maps).
    // ---------------------------------------------------------------------------
    if (PATH_DIR_PROJECT_OUT && NODE_FS.existsSync(PATH_DIR_PROJECT_OUT)) {
      const outRootAbs = PATH_DIR_PROJECT_OUT;
      const { files: outFiles, dirs: outDirs } = walkDirRecursive(outRootAbs);
      const outAbsAll = outDirs.concat(outFiles);

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Building out/ native rename mapping...', {
        root: outRootAbs,
        totalPaths: outAbsAll.length
      });

      const normalizeOut = buildNormalizeMapping(outRootAbs, outAbsAll, {
        skipPrefix,
        collisionMode: 'overwrite'
      });
      const mapOutOldRelToNewRel = normalizeOut.mapOldRelToNewRel;
      resultRenameOut = applyRenames(outRootAbs, mapOutOldRelToNewRel, {
        overwrite: true,
        dropRels: normalizeOut.dropRels,
        appendMappings: normalizeOut.aliasMappings
      });

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Out native rename pass complete.', {
        root: outRootAbs,
        renamed: resultRenameOut.renamed,
        skipped: resultRenameOut.skipped,
        mapping: Array.isArray(resultRenameOut.mapping) ? resultRenameOut.mapping.length : 0
      });

      const outEmpty = removeEmptyDirsUnderRoot(outRootAbs, { skipPrefix });
      log.info(LOG_TAG_NORMALIZE_PATHS, 'Out native empty directory cleanup complete.', {
        root: outRootAbs,
        ...outEmpty
      });
    }

    mergedMapping = normalizeMergeMappings(
      resultRename.mapping,
      resultOutMirror.mapping,
      resultRenameOut.mapping
    );

    // ---------------------------------------------------------------------------
    // Update caches (rewrite cache entry keys so caches still hit after renames)
    // ---------------------------------------------------------------------------

    try {
      // cacheProjectFile/cacheProjectImage are rooted at PATH_DIR_PROJECT_IN (mapping is already correct)
      libraryCacheRewritePathKeysFromNormalizeMapping(cacheProjectFile, resultRename.mapping, {
        label: 'cacheProjectFile',
        logTag: LOG_TAG_NORMALIZE_PATHS
      });

      libraryCacheRewritePathKeysFromNormalizeMapping(cacheProjectImage, resultRename.mapping, {
        label: 'cacheProjectImage',
        logTag: LOG_TAG_NORMALIZE_PATHS
      });

      // cacheRoot is rooted at PATH_DIR_ROOT, so prefix mapping with root-relative path to PATH_DIR_PROJECT_IN
      const prefixRootRel = NODE_CURE_PATH
        .slashForward(NODE_PATH.relative(PATH_DIR_ROOT, PATH_DIR_PROJECT_IN))
        .replace(/\/+$/g, '');

      if (prefixRootRel) {
        libraryCacheRewritePathKeysFromNormalizeMapping(cacheRoot, resultRename.mapping, {
          label: 'cacheRoot',
          logTag: LOG_TAG_NORMALIZE_PATHS,
          rootPrefixRel: prefixRootRel
        });
      }

    } catch (e) {
      log.warn(LOG_TAG_NORMALIZE_PATHS, 'Cache rewrite phase failed (continuing).', {
        error: String(e?.message || e)
      });
    }

    // ---------------------------------------------------------------------------
    // Rewrite html-tag manifest cache keys.
    // ---------------------------------------------------------------------------
    try {
      resultManifestRewrite = normalizeManifestHtmlTagCacheKeys(mergedMapping, {
        logTag: LOG_TAG_NORMALIZE_PATHS
      });
    } catch (e) {
      log.warn(LOG_TAG_NORMALIZE_PATHS, 'Manifest html-tags cache key rewrite failed (continuing).', {
        error: String(e?.message || e)
      });
    }

    // ---------------------------------------------------------------------------
    // Update references in text files AFTER path + cache key rewrites.
    // ---------------------------------------------------------------------------
    log.info(LOG_TAG_NORMALIZE_PATHS, 'Updating references in text files...', {
      mapping: Array.isArray(mergedMapping) ? mergedMapping.length : 0
    });

    log.info(LOG_TAG_NORMALIZE_PATHS, 'Processing text references (in/)...', {
      root: PATH_DIR_PROJECT_IN
    });
    const textInStartedAt = Date.now();
    resultTextIn = updateTextReferences(PATH_DIR_PROJECT_IN, mergedMapping);
    log.success(LOG_TAG_NORMALIZE_PATHS, 'Processed text references (in/).', {
      root: PATH_DIR_PROJECT_IN,
      touched: resultTextIn.touched,
      changed: resultTextIn.changed,
      Time: formatDurationMsHuman(Date.now() - textInStartedAt)
    });

    if (PATH_DIR_PROJECT_OUT && NODE_FS.existsSync(PATH_DIR_PROJECT_OUT)) {
      log.info(LOG_TAG_NORMALIZE_PATHS, 'Processing text references (out/)...', {
        root: PATH_DIR_PROJECT_OUT
      });
      const textOutStartedAt = Date.now();
      resultTextOut = updateTextReferences(PATH_DIR_PROJECT_OUT, mergedMapping);
      log.success(LOG_TAG_NORMALIZE_PATHS, 'Processed text references (out/).', {
        root: PATH_DIR_PROJECT_OUT,
        touched: resultTextOut.touched,
        changed: resultTextOut.changed,
        Time: formatDurationMsHuman(Date.now() - textOutStartedAt)
      });

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Processing source map normalization (out/)...', {
        root: PATH_DIR_PROJECT_OUT
      });
      const sourceMapStartedAt = Date.now();
      resultSourceMapNormalize = normalizeOutSourceMapReferences(PATH_DIR_PROJECT_OUT, mergedMapping, {
        logTag: LOG_TAG_NORMALIZE_PATHS
      });
      log.success(LOG_TAG_NORMALIZE_PATHS, 'Processed source map normalization (out/).', {
        root: PATH_DIR_PROJECT_OUT,
        filesChanged: resultSourceMapNormalize.filesChanged,
        mapsChanged: resultSourceMapNormalize.mapsChanged,
        commentsChanged: resultSourceMapNormalize.commentsChanged,
        Time: formatDurationMsHuman(Date.now() - sourceMapStartedAt)
      });
    }

    // ---------------------------------------------------------------------------
    // Refresh project file cache entries for changed `in/` files (content/signature).
    // ---------------------------------------------------------------------------
    try {
      const changedFilesFromRenameAbs = (Array.isArray(resultRename.mapping) ? resultRename.mapping : [])
        .map(m => NODE_PATH.join(PATH_DIR_PROJECT_IN, ...String(m?.to || '').split('/')))
        .filter(abs => {
          try { return NODE_FS.existsSync(abs) && NODE_FS.statSync(abs).isFile(); }
          catch (_) { return false; }
        });

      const changedFilesFromTextAbs = (Array.isArray(resultTextIn.changedFilesRel) ? resultTextIn.changedFilesRel : [])
        .map(rel => NODE_PATH.join(PATH_DIR_PROJECT_IN, ...String(rel || '').split('/')));

      log.info(LOG_TAG_NORMALIZE_PATHS, 'Processing cache refresh for changed files...', {
        label: 'cacheProjectFile',
        renameTouched: changedFilesFromRenameAbs.length,
        textTouched: changedFilesFromTextAbs.length
      });
      const cacheRefreshStartedAt = Date.now();
      await libraryCacheRefreshChangedFiles(
        cacheProjectFile,
        changedFilesFromRenameAbs.concat(changedFilesFromTextAbs),
        {
          logTag: LOG_TAG_NORMALIZE_PATHS,
          label: 'cacheProjectFile'
        }
      );
      log.success(LOG_TAG_NORMALIZE_PATHS, 'Processed cache refresh for changed files.', {
        label: 'cacheProjectFile',
        Time: formatDurationMsHuman(Date.now() - cacheRefreshStartedAt)
      });
    } catch (e) {
      log.warn(LOG_TAG_NORMALIZE_PATHS, 'Project file cache refresh failed (continuing).', {
        error: String(e?.message || e)
      });
    }

    // ---------------------------------------------------------------------------
    // Update project config.json (paths + glob patterns)
    // ---------------------------------------------------------------------------

    log.info(LOG_TAG_NORMALIZE_PATHS, 'Updating config.json (paths + patterns).', {
      path: PATH_FILE_CONFIG_PROJECT
    });

    const configUpdateStartedAt = Date.now();
    log.info(LOG_TAG_NORMALIZE_PATHS, 'Processing config.json update (paths + patterns).', {
      path: PATH_FILE_CONFIG_PROJECT
    });
    const resultConfig = (() => {
      /** @type {Array<{from:string,to:string}>} */
      const mapping = Array.isArray(resultRename.mapping) ? resultRename.mapping : [];

      // Sort longest-first so nested paths replace before parent-ish substrings
      const mappingSorted = mapping
        .slice()
        .sort((a, b) => String(b.from || '').length - String(a.from || '').length);

      const rxEscape = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      const looksLikeUrl = (s) => {
        const v = String(s || '').trim();
        if (!v) return false;
        if (v.includes('://')) return true;
        if (/^(?:https?:)?\/\//i.test(v)) return true;
        if (/^(?:mailto:|tel:|data:)/i.test(v)) return true;
        return false;
      };

      const looksLikeAbsoluteFsPath = (s) => {
        const v = String(s || '').trim();
        if (!v) return false;
        // Windows drive, UNC, or unix root
        if (/^[a-zA-Z]:[\\/]/.test(v)) return true;
        if (/^\\\\/.test(v)) return true;
        if (v.startsWith('/')) return true;
        return false;
      };

      const hasGlobMeta = (s) => /[*?\[\]{}]/.test(String(s || ''));

      const PATH_FILE_CONFIG_SCHEMA_DEFAULT =
        NODE_CURE_PATH.join(PATH_DIR_ROOT_CONFIG_DEFAULT_PROJECT, 'config.schema.json');

      /**
       * Compile schema keys tagged as "path" (or otherwise path-ish) into regex matchers.
       *
       * Schema key format:
       * - Dot-delimited key paths (e.g. "option.path.ignore_sitemap[]")
       * - "*" matches exactly ONE dot-segment (e.g. "option.navigation.*.ignore_patterns[]")
       * - "[]" denotes array-element level (e.g. "option.image.watermark[].pattern")
       *
       * @returns {{matchers:RegExp[], loaded:boolean, sourcePath:string}}
       */
      const loadSchemaPathMatchers = () => {
        const sourcePath = PATH_FILE_CONFIG_SCHEMA_DEFAULT;

        try {
          if (!NODE_FS.existsSync(sourcePath)) {
            log.warn(LOG_TAG_NORMALIZE_PATHS, 'Config schema not found; config update will be conservative.', {
              schema: sourcePath
            });
            return { matchers: [], loaded: false, sourcePath };
          }

          /** @type {any} */
          const schema = NODE_CURE_JSON.load(sourcePath);

          const entries = Array.isArray(schema?.keys) ? schema.keys : [];
          if (entries.length === 0) {
            log.warn(LOG_TAG_NORMALIZE_PATHS, 'Config schema has no keys; config update will be conservative.', {
              schema: sourcePath
            });
            return { matchers: [], loaded: false, sourcePath };
          }

          /** @param {any} e */
          const schemaEntryIsPathy = (e) => {
            // Primary: current schema uses "type": "path"
            const type = String(e?.type || '').toLowerCase();
            if (type === 'path') return true;

            const dt = String(e?.datatype || '').toLowerCase();
            const purpose = String(e?.purpose || '').toLowerCase();

            // Fallback: tolerate older schema shapes where "type" wasn't present/consistent.
            return /(?:path|filepath|filename|dir|directory|glob|pattern)/i.test(dt)
              || /(?:path|filepath|filename|dir|directory|glob|pattern)/i.test(purpose);
          };

          const escapeRx = (s) => String(s).replace(/[|\\{}()[\]^$+?.]/g, '\\$&');

          /** @param {string} keyPattern */
          const schemaKeyToRegex = (keyPattern) => {
            // "*" is a single-segment wildcard (no dots)
            const parts = String(keyPattern || '').split('*').map(escapeRx);
            const body = parts.join('[^.]+');
            return new RegExp('^' + body + '$');
          };

          const matchers = entries
            .filter(schemaEntryIsPathy)
            .map(e => String(e?.key || '').trim())
            .filter(Boolean)
            .map(schemaKeyToRegex);

          log.info(LOG_TAG_NORMALIZE_PATHS, 'Loaded config schema path keys for normalization.', {
            schema: sourcePath,
            keys: matchers.length
          });

          return { matchers, loaded: true, sourcePath };

        } catch (err) {
          log.warn(LOG_TAG_NORMALIZE_PATHS, 'Failed to load config schema; config update will be conservative.', {
            schema: sourcePath,
            error: String(err?.message || err)
          });
          return { matchers: [], loaded: false, sourcePath };
        }
      };

      const SCHEMA_PATH_MATCHERS = loadSchemaPathMatchers();

      /**
       * True if the given keyPath matches a schema entry typed as path-ish.
       * @param {string} keyPathStr
       * @returns {boolean}
       */
      const keyPathIsSchemaPath = (keyPathStr) => {
        const k = String(keyPathStr || '');
        if (!k) return false;
        return SCHEMA_PATH_MATCHERS.matchers.some(rx => rx.test(k));
      };

      /**
       * Apply the computed rename mapping (oldRel -> newRel) to a single string.
       * @param {string} text
       * @returns {string}
       */
      const applyRenameMappingToString = (text) => {
        let out = String(text || '');
        if (!out) return out;

        for (const { from, to } of mappingSorted) {
          const fromF = NODE_CURE_PATH.slashForward(from);
          const toF   = NODE_CURE_PATH.slashForward(to);

          const fromB = fromF.replace(/\//g, '\\');
          const toB   = toF.replace(/\//g, '\\');

          out = out
            .replace(new RegExp(rxEscape('/' + fromF), 'g'), '/' + toF)
            .replace(new RegExp(rxEscape(fromF), 'g'), toF)
            .replace(new RegExp(rxEscape('\\' + fromB), 'g'), '\\' + toB)
            .replace(new RegExp(rxEscape(fromB), 'g'), toB);
        }

        return out;
      };

      /**
       * Normalize a single path/pattern string to slash-forward + lower-hyphen segments.
       * Preserves "skipPrefix" segments (e.g. _html) and glob meta.
       *
       * @param {string} raw
       * @returns {string}
       */
      const normalizePathOrPatternString = (raw) => {
        let s = String(raw || '');
        if (!s) return s;

        // Preserve leading "!" for negated glob patterns.
        let bang = '';
        if (s.startsWith('!')) {
          bang = '!';
          s = s.slice(1);
        }

        // Normalize slashes early for stable segment splitting.
        s = NODE_CURE_PATH.slashForward(s);

        // Preserve leading "./" and leading "/" (but we generally won't touch absolute paths anyway).
        let lead = '';
        if (s.startsWith('./')) {
          lead = './';
          s = s.slice(2);
        } else if (s.startsWith('/')) {
          lead = '/';
          s = s.replace(/^\/+/, '');
        }

        const parts = s.split('/');
        const outParts = parts.map((seg, idx) => {
          if (seg === '' || seg === '.' || seg === '..') return seg;

          // If skip-prefixed (ignored), preserve ONLY the prefix and normalize the remainder.
          const hasSkipPrefix = !!skipPrefix && String(seg || '').startsWith(skipPrefix);
          const prefix = hasSkipPrefix ? skipPrefix : '';
          const core   = hasSkipPrefix ? String(seg || '').slice(skipPrefix.length) : String(seg || '');

          // Segment is ONLY the prefix (e.g. "_") -> keep as-is.
          if (!core) return seg;

          // Preserve wildcard-only segments (including skip-prefixed variants like "_*")
          if (core === '*' || core === '**') return prefix + core;

          // Pattern segment with glob meta: normalize only literal chunks (conservative).
          if (hasGlobMeta(core)) {
            const metaRx = /([*?]|\[[^\]]*\]|\{[^}]*\})/g;
            const tokens = String(core).split(metaRx).filter(t => t !== '');

            const normTokens = tokens.map(t => {
              if (t === '*' || t === '?' || /^\[[^\]]*\]$/.test(t) || /^\{[^}]*\}$/.test(t)) return t;

              // Pure extension token (e.g. ".PNG") should remain an extension.
              if (/^\.[A-Za-z0-9]+$/.test(t)) {
                return '.' + t.slice(1).toLowerCase();
              }

              // Treat literal token as a segment fragment. Preserve ".ext" by splitting on last dot.
              const dot = t.lastIndexOf('.');
              if (dot > 0 && dot < t.length - 1) {
                const base = t.slice(0, dot);
                const ext  = t.slice(dot).toLowerCase();
                const baseNorm = normalizePathSegment(base, { preserveExtension: false });
                return (baseNorm || base.toLowerCase()) + ext;
              }

              return normalizePathSegment(t, { preserveExtension: false });
            });

            return prefix + normTokens.join('');
          }

          const isLast = (idx === parts.length - 1);
          return prefix + normalizePathSegment(core, { preserveExtension: isLast });
        });

        return bang + lead + outParts.join('/');
      };

      // -------------------------------------------------------------------------
      // Progress logging (config update phase)
      // -------------------------------------------------------------------------

      const PROGRESS_EVERY = 250;
      const CHANGE_SAMPLE_MAX = 25;

      let progressTouched = 0;
      let progressChanged = 0;
      let progressPrintedSamples = 0;

      const truncate = (s, max = 180) => {
        const v = String(s || '');
        if (v.length <= max) return v;
        return v.slice(0, max) + '…';
      };

      const maybeLogProgress = () => {
        if (progressTouched % PROGRESS_EVERY !== 0) return;
        log.detail(LOG_TAG_NORMALIZE_PATHS, 'Config update progress:', {
          touched: progressTouched,
          changed: progressChanged
        });
      };

      const maybeLogChangeSample = (key, from, to) => {
        if (progressPrintedSamples >= CHANGE_SAMPLE_MAX) return;
        progressPrintedSamples++;

        log.detail(LOG_TAG_NORMALIZE_PATHS, 'Config updated value:', {
          key: String(key),
          from: truncate(from),
          to: truncate(to)
        });
      };

      // Gate helpers (shared)
      const looksLikeHexColor = (s) => {
        const v = String(s || '').trim();
        // colors: #rgb, #rrggbb, #rrggbbaa (+ allow missing leading #)
        return /^#?(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(v);
      };

      const looksLikePhone = (s) => {
        const v = String(s || '').trim();
        // conservative: lots of digits with optional punctuation (avoids most false positives)
        const digits = v.replace(/[^\d]/g, '');
        return digits.length >= 10 && /^[+()\-\s.\d]+$/.test(v);
      };

      /**
       * Walk and update the config object in-place.
       *
       * Key-path rules for schema matching:
       * - Arrays are represented as "<key>[]"
       * - Array indices are NOT included in schema path strings
       *
       * Examples:
       *   option.path.ignore_sitemap[]              (array of strings)
       *   option.image.watermark[].pattern          (array of objects -> string field)
       *   option.navigation.*.ignore_patterns[]     (wildcard namespace + array)
       *
       * @param {any} node
       * @param {string[]} keyPath
       * @returns {{touched:number, changed:number, stringsChanged:number}}
       */
      const walk = (node, keyPath) => {
        let touched = 0;
        let changed = 0;
        let stringsChanged = 0;

        if (Array.isArray(node)) {
          // NOTE: keyPath already includes "[]"" at the array's owning property segment.
          const schemaKeyStr = keyPath.join('.');

          for (let i = 0; i < node.length; i++) {
            const v = node[i];

            if (typeof v === 'string') {
              const raw = v;

              // Schema gate: ONLY keys tagged path-ish are eligible.
              if (!keyPathIsSchemaPath(schemaKeyStr)) continue;

              // Skip obvious non-path values even if schema says "path" (defensive).
              if (looksLikeUrl(raw)) continue;
              if (looksLikeHexColor(raw)) continue;
              if (looksLikePhone(raw)) continue;
              if (looksLikeAbsoluteFsPath(raw)) continue;

              touched++;
              progressTouched++;
              maybeLogProgress();

              let next = applyRenameMappingToString(raw);
              next = normalizePathOrPatternString(next);

              if (next !== raw) {
                node[i] = next;
                changed++;
                stringsChanged++;

                progressChanged++;
                // Display includes index for readability; schema matching does not.
                const displayKey = schemaKeyStr ? `${schemaKeyStr}[${i}]` : `[${i}]`;
                maybeLogChangeSample(displayKey, raw, next);
              }

            } else if (Array.isArray(v)) {
              // Nested array (rare). Add another "[]".
              const r = walk(v, keyPath.concat('[]'));
              touched += r.touched;
              changed += r.changed;
              stringsChanged += r.stringsChanged;

            } else if (v && typeof v === 'object') {
              // Array element object does NOT add an index to schema path.
              const r = walk(v, keyPath);
              touched += r.touched;
              changed += r.changed;
              stringsChanged += r.stringsChanged;
            }
          }

          return { touched, changed, stringsChanged };
        }

        if (!node || typeof node !== 'object') return { touched, changed, stringsChanged };

        for (const [kRaw, v] of Object.entries(node)) {
          const k = String(kRaw);

          if (typeof v === 'string') {
            const schemaPath = keyPath.concat(k);
            const schemaKeyStr = schemaPath.join('.');
            const raw = v;

            // Schema gate: ONLY keys tagged path-ish are eligible.
            if (!keyPathIsSchemaPath(schemaKeyStr)) continue;

            // Skip obvious non-path values even if schema says "path" (defensive).
            if (looksLikeUrl(raw)) continue;
            if (looksLikeHexColor(raw)) continue;
            if (looksLikePhone(raw)) continue;
            if (looksLikeAbsoluteFsPath(raw)) continue;

            touched++;
            progressTouched++;
            maybeLogProgress();

            let next = applyRenameMappingToString(raw);
            next = normalizePathOrPatternString(next);

            if (next !== raw) {
              node[k] = next;
              changed++;
              stringsChanged++;

              progressChanged++;
              maybeLogChangeSample(schemaKeyStr, raw, next);
            }

          } else if (Array.isArray(v)) {
            // Arrays become "<key>[]"
            const r = walk(v, keyPath.concat(`${k}[]`));
            touched += r.touched;
            changed += r.changed;
            stringsChanged += r.stringsChanged;

          } else if (v && typeof v === 'object') {
            const r = walk(v, keyPath.concat(k));
            touched += r.touched;
            changed += r.changed;
            stringsChanged += r.stringsChanged;
          }
        }

        return { touched, changed, stringsChanged };
      };

      // Load + update + save.
      try {
        if (!NODE_FS.existsSync(PATH_FILE_CONFIG_PROJECT)) {
          log.error(LOG_TAG_NORMALIZE_PATHS, 'Config update skipped (missing config.json).', {
            path: PATH_FILE_CONFIG_PROJECT
          });
          return { touched: 0, changed: 0, stringsChanged: 0 };
        }

        /** @type {any} */
        const cfg = NODE_CURE_JSON.load(PATH_FILE_CONFIG_PROJECT);
        const before = JSON.stringify(cfg);

        const stats = walk(cfg, []);

        const after = JSON.stringify(cfg);
        if (after !== before) {
          // Respect "option.config.sort" if present; default to sorting for stable diffs.
          const sortEnabled =
            (cfg && cfg.option && cfg.option.config && Object.prototype.hasOwnProperty.call(cfg.option.config, 'sort'))
              ? (cfg.option.config.sort !== false)
              : true;

          NODE_CURE_JSON.save(PATH_FILE_CONFIG_PROJECT, cfg, { sort: sortEnabled });

        }

        log.info(LOG_TAG_NORMALIZE_PATHS, 'Config update phase complete.', {
          touched: progressTouched,
          changed: progressChanged,
          samplePrinted: progressPrintedSamples
        });

        return stats;

      } catch (e) {
        log.error(LOG_TAG_NORMALIZE_PATHS, 'Config update skipped (failed to read/write config.json):', {
          path: PATH_FILE_CONFIG_PROJECT,
          error: String(e && e.message ? e.message : e)
        });
        return { touched: 0, changed: 0, stringsChanged: 0 };
      }
    })();
    log.success(LOG_TAG_NORMALIZE_PATHS, 'Processed config.json update (paths + patterns).', {
      path: PATH_FILE_CONFIG_PROJECT,
      touched: resultConfig.touched,
      changed: resultConfig.changed,
      Time: formatDurationMsHuman(Date.now() - configUpdateStartedAt)
    });

    // ---------------------------------------------------------------------------
    // Final cache sweep: refresh stale signatures for any existing cache key.
    // This guarantees modified files are reflected even if they were already dirty
    // before normalize-paths started.
    // ---------------------------------------------------------------------------
    try {
      log.info(LOG_TAG_NORMALIZE_PATHS, 'Processing final cache stale-entry refresh...', {
        label: 'cacheProjectFile'
      });
      const staleRefreshStartedAt = Date.now();
      await libraryCacheRefreshStaleEntries(cacheProjectFile, {
        logTag: LOG_TAG_NORMALIZE_PATHS,
        label: 'cacheProjectFile'
      });
      log.success(LOG_TAG_NORMALIZE_PATHS, 'Processed final cache stale-entry refresh.', {
        label: 'cacheProjectFile',
        Time: formatDurationMsHuman(Date.now() - staleRefreshStartedAt)
      });
    } catch (e) {
      log.warn(LOG_TAG_NORMALIZE_PATHS, 'Final cache stale-entry refresh failed (continuing).', {
        error: String(e?.message || e)
      });
    }

    log.info(LOG_TAG_NORMALIZE_PATHS, 'Summary:', {
      renamedIn: resultRename.renamed,
      skippedIn: resultRename.skipped,
      renamedOutMirror: resultOutMirror.renamed,
      skippedOutMirror: resultOutMirror.skipped,
      missingOutMirror: resultOutMirror.missing,
      renamedOutNative: resultRenameOut.renamed,
      skippedOutNative: resultRenameOut.skipped,
      mergedMapping: Array.isArray(mergedMapping) ? mergedMapping.length : 0,
      textFilesTouchedIn: resultTextIn.touched,
      textFilesChangedIn: resultTextIn.changed,
      textFilesTouchedOut: resultTextOut.touched,
      textFilesChangedOut: resultTextOut.changed,
      sourceMapFilesChangedOut: resultSourceMapNormalize.filesChanged,
      sourceMapJsonChangedOut: resultSourceMapNormalize.mapsChanged,
      sourceMapCommentChangedOut: resultSourceMapNormalize.commentsChanged,
      manifestFilesTouched: resultManifestRewrite.touched,
      manifestFilesRenamed: resultManifestRewrite.renamed,
      textFilesTouchedTotal: resultTextIn.touched + resultTextOut.touched,
      textFilesChangedTotal: resultTextIn.changed + resultTextOut.changed,
      configValuesTouched: resultConfig.touched,
      configValuesChanged: resultConfig.changed
    });

    logProcessingDone(LOG_TAG_NORMALIZE_PATHS, op);
    log.end(LOG_TAG_NORMALIZE_PATHS, 'Complete.');
    return done();
  })().catch((e) => {
    logProcessingFail(LOG_TAG_NORMALIZE_PATHS, op, e);
    log.error(LOG_TAG_NORMALIZE_PATHS, 'Failed:', { error: String(e && e.message ? e.message : e) });
    return done(e);
  });
}

// -----------------------------------------------------------------------------
// #### Main - Process - Package
// -----------------------------------------------------------------------------

function primaryPackage(done) {
  const LOG_TAG_PACKAGE = '[📦 Package]';

  log.begin(LOG_TAG_PACKAGE, 'Running...');
  const op = logProcessingStart(LOG_TAG_PACKAGE, 'package');

  const NODE_STATICUS_PACKAGE = require('@custom/compiler-package');

  NODE_STATICUS_PACKAGE.processPackage()
    .then(() => {
      logProcessingDone(LOG_TAG_PACKAGE, op);
      log.success(LOG_TAG_PACKAGE, 'Packaging complete.');
      log.end(LOG_TAG_PACKAGE, 'Complete.');
      done();
    })
    .catch((error) => {
      logProcessingFail(LOG_TAG_PACKAGE, op, error);
      log.error(LOG_TAG_PACKAGE, 'Packaging failed:', error);
      done(error);
    });
}

// -----------------------------------------------------------------------------
// #### Main - Process - Sitemap
// -----------------------------------------------------------------------------

function handleSitemap() {
  const sitemapOutputPath = NODE_PATH.join(PATH_DIR_PROJECT_OUT_HTML, 'sitemap.xml');
  const LOG_TAG_SITEMAP = '[🗺️ Sitemap]';

  log.begin(LOG_TAG_SITEMAP, 'Generating...');
  const op = logProcessingStart(LOG_TAG_SITEMAP, 'sitemap generation', {
    input_root: PATH_DIR_PROJECT_IN,
    output_root: PATH_DIR_PROJECT_OUT_HTML,
    output_file: sitemapOutputPath
  });

  const NODE_GULP_SITEMAP = require('gulp-sitemap');

  const generateIgnorePatterns = (ignoreArray) => {
    return ignoreArray.flatMap(item => [
      `!${PATH_DIR_PROJECT_IN}**/${item}.html`,
      `!${PATH_DIR_PROJECT_IN}**/${item}/${PATH_ALL}.html`
    ]);
  }

  /**
   * Exact-file ignore patterns for pages (avoid the "directory wildcard" behavior).
   * @param {string[]} relNoExtArray - paths relative to in/ without extension (slashes OK)
   * @returns {string[]}
   */
  const generateIgnorePatternsExact = (relNoExtArray) => {
    return relNoExtArray.flatMap(p => [
      `!${PATH_DIR_PROJECT_IN}${p}.html`,
      `!${PATH_DIR_PROJECT_IN}${p}.md`
    ]);
  };

  /**
   * Read HTML tag manifest from disk (if present).
   * @returns {any|null}
   */
  const readHtmlTagManifestSync = () => {
    try {
      if (!NODE_FS.existsSync(PATH_FILE_PROJECT_HTML_TAG_MANIFEST)) return null;
      return JSON.parse(NODE_FS.readFileSync(PATH_FILE_PROJECT_HTML_TAG_MANIFEST, 'utf8'));
    } catch (e) {
      log.warn(LOG_TAG_SITEMAP, 'Failed to read HTML tag manifest:', {
        path: PATH_FILE_PROJECT_HTML_TAG_MANIFEST,
        error: String(e && e.message ? e.message : e)
      });
      return null;
    }
  };

  // Gather all ignore patterns
  const ignoreSitemap = configProjectMerge.option?.path?.ignore_sitemap || [];
  const ignorePackageGlobal = configProjectMerge.option?.package?.ignore || [];

  // Collect all per-path ignore values from targets[].paths[].ignore
  const ignorePackageTargets = (
    configProjectMerge.option?.package?.targets || []
  ).flatMap(target =>
    (target.paths || []).flatMap(path => path.ignore || [])
  );

  // Combine and deduplicate
  const ignoreAll = Array.from(new Set([
    ...ignoreSitemap,
    ...ignorePackageGlobal,
    ...ignorePackageTargets
  ]));

  // Add ignore-exact paths from <!--tag no-sitemap-->
  const tagManifest = readHtmlTagManifestSync();

  /** @type {string[]} */
  const ignoreExactNoSitemap = [];

  if (tagManifest && tagManifest.files) {
    for (const [rel, meta] of Object.entries(tagManifest.files)) {
      const tags = (meta && meta.tags) ? meta.tags : {};
      if (!tags || !tags['no-sitemap']) continue;

      // rel is like "docs/My Page.md" or "index.html"
      const relNorm = NODE_CURE_PATH.slashForward(String(rel || ''));
      const relNoExt = relNorm.replace(/\.[^.]+$/, '');
      if (relNoExt) ignoreExactNoSitemap.push(relNoExt);
    }
  }

  const urlOpt = configProjectMerge?.option?.url || {};
  const cleanUrls = (typeof urlOpt.clean === 'boolean')
    ? urlOpt.clean
    : true;

  const trailingSlash = (typeof urlOpt.trailing_slash === 'boolean')
    ? urlOpt.trailing_slash
    : true;

  /**
   * Classify filesystem-ish errors so Windows open failures are easier to interpret in logs.
   * @param {any} error
   * @returns {string}
   */
  const classifySitemapError = (error) => {
    const code = String(error?.code || '').toUpperCase();
    const syscall = String(error?.syscall || '').toLowerCase();
    const message = String(error?.message || '').toLowerCase();

    if ((code === 'UNKNOWN' || code === 'EPERM' || code === 'EBUSY') && syscall === 'open') {
      return 'likely_windows_file_handle_conflict';
    }

    if (code === 'ENOENT') {
      return 'path_missing';
    }

    if (code === 'EACCES') {
      return 'access_denied';
    }

    if ((code === 'EPERM' || code === 'EBUSY') && (syscall === 'rename' || syscall === 'unlink')) {
      return 'rename_or_replace_conflict';
    }

    if (message.includes('unknown error, open')) {
      return 'unknown_open_failure';
    }

    return 'unclassified';
  };

  /**
   * Capture lightweight file diagnostics for the sitemap target at failure time.
   * @param {string} targetPath
   * @returns {object}
   */
  const getSitemapTargetDiagnostics = (targetPath) => {
    const parentDir = NODE_PATH.dirname(targetPath);
    const diagnostics = {
      target_path: targetPath,
      target_path_relative: NODE_CURE_PATH.relative(PATH_DIR_ROOT, targetPath),
      parent_dir: parentDir,
      parent_dir_exists: NODE_FS.existsSync(parentDir),
      exists: false,
      direct_open_probe: {
        attempted: false,
        ok: false,
        code: null,
        errno: null,
        syscall: null,
        message: null
      }
    };

    try {
      if (NODE_FS.existsSync(targetPath)) {
        diagnostics.exists = true;
        const stat = NODE_FS.statSync(targetPath);
        diagnostics.is_file = stat.isFile();
        diagnostics.size = stat.size;
        diagnostics.mtime = stat.mtime instanceof Date ? stat.mtime.toISOString() : stat.mtime;
        diagnostics.ctime = stat.ctime instanceof Date ? stat.ctime.toISOString() : stat.ctime;
      }
    } catch (statError) {
      diagnostics.stat_error = {
        code: statError?.code || null,
        errno: statError?.errno || null,
        syscall: statError?.syscall || null,
        message: String(statError?.message || statError)
      };
    }

    let fd = null;
    diagnostics.direct_open_probe.attempted = true;
    try {
      fd = NODE_FS.openSync(targetPath, diagnostics.exists ? 'r+' : 'r');
      diagnostics.direct_open_probe.ok = true;
    } catch (openError) {
      diagnostics.direct_open_probe.code = openError?.code || null;
      diagnostics.direct_open_probe.errno = openError?.errno || null;
      diagnostics.direct_open_probe.syscall = openError?.syscall || null;
      diagnostics.direct_open_probe.message = String(openError?.message || openError);
    } finally {
      if (typeof fd === 'number') {
        try {
          NODE_FS.closeSync(fd);
        } catch (closeError) {
          diagnostics.direct_open_probe.close_error = String(closeError?.message || closeError);
        }
      }
    }

    return diagnostics;
  };

  /**
   * Normalize the stream error into a structured payload for log output.
   * @param {any} err
   * @returns {object}
   */
  const buildSitemapErrorDiagnostics = (err) => {
    const stackRaw = Array.isArray(err?.stack)
      ? err.stack
      : String(err?.stack || '')
        .split('\n')
        .map(line => line.trim())
        .filter(Boolean);
    const targetDiagnostics = getSitemapTargetDiagnostics(sitemapOutputPath);
    const classification = classifySitemapError(err);
    const hint = (
      classification === 'likely_windows_file_handle_conflict'
      && targetDiagnostics?.direct_open_probe?.ok
    )
      ? 'The file became openable immediately after the failure. This usually means a transient Windows shell/process handle conflict, commonly Explorer preview/details/metadata inspection. Close Explorer windows showing the out/ folder or restart explorer.exe and try again.'
      : null;

    return {
      classification,
      name: err?.name || 'Error',
      message: String(err?.message || err),
      code: err?.code || null,
      errno: err?.errno || null,
      syscall: err?.syscall || null,
      path: err?.path || null,
      dest: err?.dest || null,
      source_globs: PATH_FILE_PROJECT_IN_HTML,
      ignore_globs: [
        ...generateIgnorePatterns(ignoreAll),
        ...generateIgnorePatternsExact(ignoreExactNoSitemap)
      ],
      clean_urls: cleanUrls,
      trailing_slash: trailingSlash,
      site_url: configProjectMerge.require.site.url,
      target: targetDiagnostics,
      hint,
      stack: stackRaw
    };
  };

  log.info(LOG_TAG_SITEMAP, {
    "Site URL": configProjectMerge.require.site.url,
    "Clean URLs": cleanUrls,
    "Trailing Slash": trailingSlash,
    "Ignore (Combined)": ignoreAll,
    "Output File": sitemapOutputPath
  });

  return new Promise((resolve, reject) => {
    /** @type {boolean} */
    let settled = false;

    /**
     * Resolve the task exactly once.
     * @returns {void}
     */
    const resolveOnce = () => {
      if (settled) return;
      settled = true;
      logProcessingDone(LOG_TAG_SITEMAP, op);
      log.end(LOG_TAG_SITEMAP, 'Generated.');
      resolve();
    };

    /**
     * Reject the task exactly once.
     * @param {unknown} err
     * @returns {void}
     */
    const rejectOnce = (err) => {
      if (settled) return;
      settled = true;
      const diagnostics = buildSitemapErrorDiagnostics(err);
      logProcessingFail(LOG_TAG_SITEMAP, op, err, diagnostics);
      log.error(LOG_TAG_SITEMAP, 'Error generating sitemap:', diagnostics);
      reject(err);
    };

    NODE_GULP.src([
      ...PATH_FILE_PROJECT_IN_HTML,
      ...generateIgnorePatterns(ignoreAll),
      ...generateIgnorePatternsExact(ignoreExactNoSitemap)
    ], {
      read: false
    })
      .pipe(NODE_GULP_SITEMAP({
        siteUrl: configProjectMerge.require.site.url,
        getLoc: (siteUrl, fileOrLoc) => {
          const urlOpt = configProjectMerge?.option?.url || {};

          const cleanUrls = (typeof urlOpt.clean === 'boolean')
            ? urlOpt.clean
            : true;

          const includeHtml = !cleanUrls;

          const trailingSlash = (typeof urlOpt.trailing_slash === 'boolean')
            ? urlOpt.trailing_slash
            : true;

          const baseUrl = String(siteUrl || '').replace(/\/+$/, '');

          /** @type {string} */
          let rel = '';

          // gulp-sitemap versions differ: sometimes arg2 is a Vinyl file, sometimes it's a string loc.
          if (typeof fileOrLoc === 'string') {
            rel = fileOrLoc;
          } else if (fileOrLoc && typeof fileOrLoc.relative === 'string' && fileOrLoc.relative) {
            rel = fileOrLoc.relative;
          } else if (fileOrLoc && typeof fileOrLoc.path === 'string') {
            const fb = String(fileOrLoc.base || '');
            const fp = String(fileOrLoc.path || '');
            rel = (fb && fp) ? NODE_PATH.relative(fb, fp) : fp;
          }

          rel = NODE_CURE_PATH.slashForward(String(rel || ''));

          // If we were given an absolute URL already, strip the site prefix.
          if (rel.startsWith(baseUrl)) {
            rel = rel.slice(baseUrl.length);
          }

          rel = rel
            .replace(/^\.\//, '')
            .replace(/^\/+/, '');

          // Never allow .md in sitemap output. Map .md -> .html first.
          {
            const lower = rel.toLowerCase();
            if (lower.endsWith('.md')) {
              rel = rel.slice(0, -('.md'.length)) + '.html';
            }
          }

          // index.html maps to folder/root always.
          {
            const lower = rel.toLowerCase();

            if (lower === 'index.html') {
              rel = '';
            } else if (lower.endsWith('/index.html')) {
              rel = rel.slice(0, -('/index.html'.length)) + (trailingSlash ? '/' : '');
            } else if (!includeHtml && lower.endsWith('.html')) {
              rel = rel.slice(0, -('.html'.length));
            }
          }

          // If trailing slashes are disabled, strip any remaining trailing "/" (except root, which is empty rel anyway).
          if (!trailingSlash && rel.endsWith('/')) {
            rel = rel.slice(0, -1);
          }

          return rel ? `${baseUrl}/${rel}` : baseUrl;
        }

      }))
      .pipe(libraryAppendBrandComment()) // Append comment before output
      .pipe(NODE_GULP.dest(PATH_DIR_PROJECT_OUT_HTML))
      .on('finish', resolveOnce)
      .on('end', resolveOnce)
      .on('error', rejectOnce);
  });
}

// -----------------------------------------------------------------------------
// #### Main - Process - Stylesheet
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_STYLESHEET = `stylesheet`;

const PATH_DIR_PROJECT_IN_ASSET_STYLESHEET        = `${PATH_DIR_PROJECT_IN_ASSET}css/`;
const PATH_DIR_PROJECT_OUT_ASSET_STYLESHEET       = `${PATH_DIR_PROJECT_OUT_ASSET}css/`;
const PATH_DIR_PROJECT_IN_ASSET_STYLESHEET_CONFIG = `${PATH_DIR_PROJECT_IN_ASSET_STYLESHEET}_config/`;

const PATH_FILE_PROJECT_IN_ASSET_STYLESHEET = [
  `${PATH_DIR_PROJECT_IN_ASSET_STYLESHEET}${PATH_ALL}.scss`,
  `${PATH_DIR_PROJECT_IN_ASSET_STYLESHEET}${PATH_ALL}.css`
];
const PATH_FILE_PROJECT_IN_ASSET_STYLESHEET_WATCH = [
  ...PATH_FILE_PROJECT_IN_ASSET_STYLESHEET,
  ...PATH_DIR_IN_IGNORE_PROJECT,
  `!${PATH_DIR_PROJECT_IN_ASSET_STYLESHEET_CONFIG}${PATH_ALL}`
];
const PATH_FILE_PROJECT_IN_ASSET_STYLESHEET_CONFIG = `${PATH_DIR_PROJECT_IN_ASSET_STYLESHEET_CONFIG}_variable.scss`

const PATH_FILE_PROJECT_IN_ASSET_STYLESHEET_WATCH_INCLUDE = [
  ...createPathArray(PATH_DIR_PROJECT_IN_ASSET_STYLESHEET, false),
  `!${PATH_FILE_PROJECT_IN_ASSET_STYLESHEET_CONFIG}`
];

const PATTERN_RESET_STYLESHEET = [
  `${PATH_DIR_PROJECT_OUT_ASSET_STYLESHEET}${PATH_ALL}.css`,
  `${PATH_DIR_PROJECT_OUT_ASSET_STYLESHEET}${PATH_ALL}.map`,
  `!${PATH_DIR_PROJECT_OUT_ASSET_STYLESHEET}font-icon/${PATH_ALL}`
]

function handleStylesheetConfig(done) {
  const LOG_TAG_STYLESHEET_CONFIG = LOG_TAG_STYLESHEET + ' [📜 Config]';

  log.begin(LOG_TAG_STYLESHEET_CONFIG, 'Running...');

  // Accept #RGB, #RGBA, #RRGGBB, #RRGGBBAA and rgb()/rgba()/hsl()/hsla()
  const HEX_COLOR_REGEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
  const RGB_FUNC_REGEX = /^rgba?\(\s*(?:\d{1,3}\s*,\s*){2}\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i;
  const HSL_FUNC_REGEX = /^hsla?\(\s*\d{1,3}(?:deg|grad|rad|turn)?\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i;

  /**
   * Returns true if the string looks like a CSS color value.
   * Supports 3/4/6/8-digit hex, rgb/rgba, hsl/hsla.
   */
  const isColor = (value) =>
    typeof value === 'string' && (
      HEX_COLOR_REGEX.test(value) ||
      RGB_FUNC_REGEX.test(value) ||
      HSL_FUNC_REGEX.test(value)
    );

  const CONFIG_PROJECT_FLAT_SCSS_BODY = Object.entries(NODE_CURE_JSON.flatten(configProjectMerge, { prefix: '$CONFIG_' }))
    .filter(([key, value]) => {
      // Only keep simple types
      return typeof value === 'string' || typeof value === 'number';
    })
    .map(([key, value]) => {
      // Colors: emit as-is (don't quote), including alpha-capable hex
      if (isColor(value)) {
        return `${key}: ${value};`;
      }
      // Check if the value is a number
      if (typeof value === 'number') {
        return `${key}: ${value};`;
      }
      // Fallback for basic strings
      if (typeof value === 'string') {
        return `${key}: "${value}";`;
      }
      return null; // don't emit
    })
    .filter(Boolean) // remove nulls
    .join('\n');

  // Ensure the output directory exists
  if (!NODE_FS.existsSync(PATH_DIR_PROJECT_IN_ASSET_STYLESHEET_CONFIG)) {
      NODE_FS.mkdirSync(PATH_DIR_PROJECT_IN_ASSET_STYLESHEET_CONFIG, { recursive: true });
  }

  // Write the SCSS content to the specified output file
  NODE_CURE_FS.writeFileSync(PATH_FILE_PROJECT_IN_ASSET_STYLESHEET_CONFIG, CONFIG_PROJECT_FLAT_SCSS_BODY);
  log.info(LOG_TAG_STYLESHEET_CONFIG, 'SCSS variables file created at:', PATH_FILE_PROJECT_IN_ASSET_STYLESHEET_CONFIG);

  log.end(LOG_TAG_STYLESHEET_CONFIG, 'Complete.');

  done();
}

async function handleStylesheet(done) {
  log.begin(LOG_TAG_STYLESHEET, 'Running...');
  let pruneResult = null;

  try {
    pruneResult = libraryPruneFromInput({
      cacheNamespace: CACHE_NAMESPACE_STYLESHEET,
      logTag: LOG_TAG_STYLESHEET
    });

  } catch (err) {
    log.error(LOG_TAG_STYLESHEET, 'During prune:', err);
    log.end(LOG_TAG_STYLESHEET, 'Complete.');
    return done(err);
  }

  const counters = { filtered: 0, processed: 0 };

  const FILE_PATHS_ALL = await libraryFileGetFilesFromPattern(PATH_FILE_PROJECT_IN_ASSET_STYLESHEET);

  log.debug(LOG_TAG_STYLESHEET, 'Processing:', {
    "File Count": FILE_PATHS_ALL.length,
    "File Paths": FILE_PATHS_ALL
  });

  log.info(LOG_TAG_STYLESHEET, 'Filtering files by cache...', {
    "File Count": FILE_PATHS_ALL.length
  });

  const FILE_PATHS_IN = [];
  for (const FILE_PATH_IN of FILE_PATHS_ALL) {
    if (!cacheProjectFile.shouldProcessSync(CACHE_NAMESPACE_STYLESHEET, FILE_PATH_IN, counters)) {
      continue;
    }
    FILE_PATHS_IN.push(FILE_PATH_IN);
  }

  log.info(LOG_TAG_STYLESHEET, 'Processing queue:', {
    "File Count": FILE_PATHS_IN.length,
    "File Paths": FILE_PATHS_IN
  });

  let fileCurrent = 0;

  for (const FILE_PATH_IN of FILE_PATHS_IN) {
    fileCurrent += 1;

    const FILE_PATH_IN_RELATIVE = NODE_CURE_PATH.relative(PATH_DIR_PROJECT_IN, FILE_PATH_IN);

    log.info(LOG_TAG_STYLESHEET, 'Processing file:', {
      "File Current": fileCurrent,
      "File Total": FILE_PATHS_IN.length,
      "File Path": FILE_PATH_IN_RELATIVE
    });

    await new Promise((resolve, reject) => {
      // TEMP TEST (option 3): disable global process.stderr capture for Sass and rely on
      // `gulpDartSassWithLogger(...).logger.warn(...)` + compile error handling instead.
      // Keeping old capture approach commented for easy rollback if Sass diagnostics regress.
      // TODO: Delete old stderr capture block if this no-capture approach proves reliable.
      const restoreStderrCapture = () => {};
      // const restoreStderrCapture =
      //   _captureProcessStderrToLog({
      //     logTag: LOG_TAG_STYLESHEET_SASS,
      //     level: 'warn',
      //     mode: 'block',
      //     swallow: false,
      //   });

      const finalize = (fn) => (arg) => {
        try { restoreStderrCapture(); } catch (_) {}
        return fn(arg);
      };

      NODE_GULP.src(FILE_PATH_IN, { allowEmpty: true })
        .pipe(NODE_GULP_TAP(file => {
          file.base = PATH_DIR_PROJECT_IN_ASSET_STYLESHEET;
          file.path = FILE_PATH_IN;
        }))
        .pipe(NODE_GULP_SOURCEMAP.init())
        .pipe(
          gulpDartSassWithLogger({
            logTag: LOG_TAG_STYLESHEET_SASS,
            style: 'compressed',
            loadPaths: [PATH_DIR_PROJECT_IN_ASSET_STYLESHEET],
          })
        )
        // TODO: move overrideBrowserslist (browsers) to .browserslistrc to share target browsers with Babel, ESLint and Stylelint.
        .pipe(gulpAutoprefixerPreserveSources(/** @type {any} */({ overrideBrowserslist: ['last 2 versions', '> 5%'], remove: false })))
        .pipe(NODE_GULP_RENAME({ suffix: '.min' }))
        .pipe(libraryAppendBrandComment())
        .pipe(NODE_GULP_SOURCEMAP.write(PATH_DIR_OUT_SOURCEMAP))
        .pipe(NODE_GULP.dest(PATH_DIR_PROJECT_OUT_ASSET_STYLESHEET))
        .on('data', async (file) => {
          if (!file.path.endsWith('.map')) { // if is not sourcemap
            await cacheProjectFile.store(CACHE_NAMESPACE_STYLESHEET, FILE_PATH_IN);
            log.success(LOG_TAG_STYLESHEET, 'Processed:', {
              "File Current": fileCurrent,
              "File Total": FILE_PATHS_IN.length,
              "File Path": FILE_PATH_IN_RELATIVE
            });
          }
        })
        .on('end', finalize(resolve))
        .on('error', finalize(reject));
    });

  }


  log.info(LOG_TAG_STYLESHEET, 'File Summary:', {
    ...counters,
    total: FILE_PATHS_IN.length
  });

  log.end(LOG_TAG_STYLESHEET, 'Complete.');
  done();
}

function primaryStylesheet(done) {
  const op = logProcessingStart(LOG_TAG_STYLESHEET, 'stylesheet build pipeline');
  NODE_GULP.series(handleStylesheetConfig, handleStylesheet)((err) => {
    if (err) {
      logProcessingFail(LOG_TAG_STYLESHEET, op, err);
      done(err);
      return;
    }
    logProcessingDone(LOG_TAG_STYLESHEET, op);
    done();
  });
}

// -----------------------------------------------------------------------------
// #### Main - Process - Video
// -----------------------------------------------------------------------------

const CACHE_NAMESPACE_VIDEO = 'video';

const PATH_DIR_PROJECT_IN_ASSET_VIDEO  =  `${PATH_DIR_PROJECT_IN_ASSET}video/`;
const PATH_DIR_PROJECT_OUT_ASSET_VIDEO =  `${PATH_DIR_PROJECT_OUT_ASSET}video/`;
const PATH_FILE_PROJECT_IN_ASSET_VIDEO = [
  `${PATH_DIR_PROJECT_IN_ASSET_VIDEO}${PATH_ALL}.*`,
  ...PATH_DIR_IN_IGNORE_PROJECT
];

async function primaryVideo(done) {
  const LOG_TAG_VIDEO = '[🎬 Video]';

  log.begin(LOG_TAG_VIDEO, 'Running...');
  const op = logProcessingStart(LOG_TAG_VIDEO, 'video copy');

  try {
    await handleFileCopy(
      LOG_TAG_VIDEO,
      CACHE_NAMESPACE_VIDEO,
      PATH_DIR_PROJECT_IN_ASSET_VIDEO,
      PATH_FILE_PROJECT_IN_ASSET_VIDEO,
      PATH_DIR_PROJECT_OUT_ASSET_VIDEO
    );
    logProcessingDone(LOG_TAG_VIDEO, op);
  } catch (error) {
    logProcessingFail(LOG_TAG_VIDEO, op, error);
    return done(error);
  }

  log.end(LOG_TAG_VIDEO, 'Complete.');

  done();
};

// -----------------------------------------------------------------------------
// #### Main - Process - Component
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// ##### Main - Process - Component - Browserslist DB
// -----------------------------------------------------------------------------

/**
 * Spawn a command and route stdout/stderr into Cure-Log line-by-line.
 *
 * Purpose:
 * - Centralize child_process usage so update tasks don't duplicate spawn plumbing.
 * - Ensure Windows-safe execution (shell=true) and consistent stream routing.
 *
 * @function _spawnCommandRouted
 * @since 1.1.1
 *
 * @param {string} command The executable to run (e.g. "npx", "npm").
 * @param {string[]} args Command arguments (e.g. ["update-browserslist-db@latest", "--yes"]).
 * @param {string} logTag Cure-Log tag to prefix routed output with.
 * @param {Object} [options]
 * @param {boolean} [options.shell=true] Run via shell for Windows compatibility.
 * @param {NodeJS.ProcessEnv} [options.env=process.env] Environment variables.
 * @param {string} [options.cwd] Working directory.
 * @returns {Promise<void>} Resolves on exit code 0, rejects otherwise.
 */
function _spawnCommandRouted(command, args, logTag, options = {}) {
  const NODE_CHILD_PROCESS = require('child_process');

  const {
    shell = true,
    env = process.env,
    cwd = undefined,
  } = options;

  return new Promise((resolve, reject) => {
    const child = NODE_CHILD_PROCESS.spawn(command, args, {
      shell,
      stdio: ['ignore', 'pipe', 'pipe'],
      env,
      cwd,
    });

    // Stream routing (Cure-Log already handles per-line splitting)
    log.routeStream(child.stdout, 'stdout', logTag);
    log.routeStream(child.stderr, 'stderr', logTag);

    child.on('error', (err) => {
      log.error(logTag, 'Spawn failed:', err);
      reject(err);
    });

    child.on('close', (code) => {
      if (code === 0) return resolve();

      const err = new Error(`${logTag} exited with code ${code}`);
      log.error(logTag, err.message);
      reject(err);
    });
  });
}

/**
 * Capture `process.stderr` output and forward into Cure-Log.
 *
 * Supports:
 * - mode "line": forwards each stderr line as a log entry
 * - mode "block": buffers multi-line chunks (ideal for Sass deprecation blocks)
 *
 * @function _captureProcessStderrToLog
 *
 * @param {Object} opt
 * @param {string} opt.logTag Cure-Log tag to use when forwarding.
 * @param {'debug'|'info'|'warn'|'error'} [opt.level='warn'] Log level for forwarded lines/blocks.
 * @param {string} [opt.streamLabel='stderr'] Label included in forwarded message.
 * @param {'line'|'block'} [opt.mode='block'] Forwarding mode.
 * @param {number} [opt.flushMs=25] Idle time (ms) after which a partial block is flushed.
 * @param {number} [opt.maxBlockChars=20000] Safety cap; flush if block grows beyond this.
 * @param {boolean} [opt.swallow=false] If true, suppress writing to the real process.stderr while still capturing and forwarding output to Cure-Log.
 * @returns {() => void} Restore function (must be called to stop capturing).
 */
function _captureProcessStderrToLog(opt) {
  const {
    logTag,
    level = 'warn',
    streamLabel = 'stderr',
    mode = 'block',
    flushMs = 25,
    maxBlockChars = 20000
  } = opt || {};

  const stderr = process.stderr;
  const writeOrig = stderr.write.bind(stderr);

  /** @type {string} */
  let carry = '';

  /** @type {string[]} */
  let blockLines = [];

  /** @type {NodeJS.Timeout|null} */
  let flushTimer = null;

  const isBoundaryBlank = (line) => !String(line ?? '').trim();

  const isStartOfNewSassWarn = (line) => {
    const s = String(line ?? '');
    // Covers Dart Sass formats like:
    // "Deprecation Warning [user-authored]:" and "WARNING:"-style prefixes.
    return (
      s.startsWith('Deprecation Warning') ||
      s.startsWith('WARNING') ||
      s.startsWith('Warning') ||
      s.startsWith('Error')
    );
  };

  const clearFlushTimer = () => {
    if (flushTimer) {
      clearTimeout(flushTimer);
      flushTimer = null;
    }
  };

  const scheduleFlush = () => {
    if (mode !== 'block') return;
    clearFlushTimer();
    flushTimer = setTimeout(() => {
      flushTimer = null;
      flushBlock('idle');
    }, Math.max(0, flushMs));
  };

  const forwardText = (text) => {
    const s = String(text ?? '');
    if (!s.trim()) return;

    // Avoid recursion: temporarily restore original writer while logging.
    stderr.write = writeOrig;
    try {
      log[level](logTag, `[${streamLabel}]`, s);
    } finally {
      /** @type {any} */ (stderr).write = /** @type {any} */ (writeWrapped);
    }
  };

  const flushBlock = (_reason) => {
    clearFlushTimer();
    if (!blockLines.length) return;

    // Trim trailing blank lines.
    while (blockLines.length && isBoundaryBlank(blockLines[blockLines.length - 1])) {
      blockLines.pop();
    }

    const text = blockLines.join('\n');
    blockLines = [];

    if (text.trim()) forwardText(text);
  };

  const pushLine = (line) => {
    const s = String(line ?? '').replace(/\r$/, '');

    if (mode === 'line') {
      if (s.trim()) forwardText(s);
      return;
    }

    // mode === 'block'
    // If we see a new warning start and we already have content, flush previous block first.
    if (blockLines.length && isStartOfNewSassWarn(s) && !isBoundaryBlank(s)) {
      flushBlock('new-warning');
    }

    blockLines.push(s);

    // Flush on blank line boundary (Sass blocks usually have blank lines).
    if (isBoundaryBlank(s)) {
      flushBlock('blank-boundary');
      return;
    }

    // Safety cap flush.
    const approxChars = blockLines.reduce((a, b) => a + b.length + 1, 0);
    if (approxChars >= maxBlockChars) {
      flushBlock('max-chars');
      return;
    }

    scheduleFlush();
  };

  /**
   * Wrapped stderr.write
   * @param {any} chunk
   * @param {any} encoding
   * @param {any} cb
   * @returns {boolean}
   */
  function writeWrapped(chunk, encoding, cb) {
    const swallow = !!(opt && opt.swallow === true);

    // Node allows write(chunk, cb) (encoding omitted)
    let _encoding = encoding;
    let _cb = cb;
    if (typeof _encoding === 'function') {
      _cb = _encoding;
      _encoding = undefined;
    }

    // If swallowing, do NOT write to real stderr.
    // Still invoke cb so callers expecting it don't stall.
    const ok = swallow ? true : writeOrig(chunk, _encoding, _cb);
    if (swallow && typeof _cb === 'function') {
      try { _cb(); } catch (_) { /* ignore */ }
    }

    try {
      const text = Buffer.isBuffer(chunk) ? chunk.toString('utf8') : String(chunk);
      carry += text;

      // Split into lines, keep trailing partial line in `carry`.
      const parts = carry.split(/\r?\n/);
      carry = parts.pop() ?? '';

      for (const line of parts) pushLine(line);
    } catch (_) {
      // Never break stderr if parsing fails.
    }

    return ok;
  }

  // Enable capture
  /** @type {any} */ (stderr).write = /** @type {any} */ (writeWrapped);

  // Return restore
  return () => {
    try {
      // Flush any remaining partial line.
      if (carry) pushLine(carry);
      carry = '';
      flushBlock('restore');
    } finally {
      clearFlushTimer();
      /** @type {any} */ (stderr).write = /** @type {any} */ (writeOrig);
    }
  };
}

/**
 * Update Browserslist's caniuse-lite database and stream CLI output into Cure-Log.
 *
 * Behavior:
 * - Runs: `npx update-browserslist-db@latest --yes` (Windows-safe, shell=true).
 * - Routes stdout/stderr into Cure-Log using `_spawnCommandRouted`.
 *
 * @function update_component_browserslist_db
 * @since 1.0.2
 * @param {Function} done Gulp completion callback.
 * @returns {void}
 */
function update_component_browserslist_db(done) {
  const LOG_TAG_BROWSERLIST = '[🌐 Browserslist]';

  log.begin(LOG_TAG_BROWSERLIST, 'Updating caniuse-lite via update-browserslist-db@latest.');
  const op = logProcessingStart(LOG_TAG_BROWSERLIST, 'update browserslist db');

  _spawnCommandRouted(
    'npx',
    ['update-browserslist-db@latest', '--yes'],
    LOG_TAG_BROWSERLIST,
    { shell: true }
  )
    .then(() => {
      logProcessingDone(LOG_TAG_BROWSERLIST, op);
      log.end(LOG_TAG_BROWSERLIST, 'Complete.');
      done();
    })
    .catch((err) => {
      logProcessingFail(LOG_TAG_BROWSERLIST, op, err);
      log.error(LOG_TAG_BROWSERLIST, 'Unexpected error:', err);
      done(err);
    });
}

/**
 * Update baseline-browser-mapping (Baseline data) and stream npm output into Cure-Log.
 *
 * Behavior:
 * - Runs: `npm install baseline-browser-mapping@latest --save-dev`
 * - Routes stdout/stderr into Cure-Log using `_spawnCommandRouted`.
 *
 * @function update_component_baseline_browser_mapping
 * @since 1.1.1
 * @param {Function} done Gulp completion callback.
 * @returns {void}
 */
function update_component_baseline_browser_mapping(done) {
  const LOG_TAG_BASELINE = '[🧭 Baseline]';

  log.begin(LOG_TAG_BASELINE, 'Updating baseline-browser-mapping@latest.');
  const op = logProcessingStart(LOG_TAG_BASELINE, 'update baseline browser mapping');

  _spawnCommandRouted(
    'npm',
    ['install', 'baseline-browser-mapping@latest', '--save-dev'],
    LOG_TAG_BASELINE,
    { shell: true }
  )
    .then(() => {
      logProcessingDone(LOG_TAG_BASELINE, op);
      log.end(LOG_TAG_BASELINE, 'Complete.');
      done();
    })
    .catch((err) => {
      logProcessingFail(LOG_TAG_BASELINE, op, err);
      log.error(LOG_TAG_BASELINE, 'Unexpected error:', err);
      done(err);
    });
}

// -----------------------------------------------------------------------------
// #### Main - Process - Test
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// ##### Main - Process - Test - File Match
// -----------------------------------------------------------------------------

const path_in_test_file_match        = [`./source/test/file_match/${PATH_ALL}`].concat(PATH_DIR_IN_IGNORE_ROOT);

function primaryTestFileMatch(done) {
  const LOG_TAG_TEST_FILE_MATCH = '[🧪 Test File Match]';
  const op = logProcessingStart(LOG_TAG_TEST_FILE_MATCH, 'test file match');
  libraryFileListFilesMatched(path_in_test_file_match, PATH_ROOT, VERBOSE_LISTFILES.BASIC)
    .then(() => {
      logProcessingDone(LOG_TAG_TEST_FILE_MATCH, op);
      done();
    })
    .catch((err) => {
      logProcessingFail(LOG_TAG_TEST_FILE_MATCH, op, err);
      done(err);
    });
};

// -----------------------------------------------------------------------------
// ##### Main - Process - Test - Config
// -----------------------------------------------------------------------------

function primaryTestConfig(done) {
  const LOG_TAG_TEST_CONFIG = '[🧪 Test Config]';
  const op = logProcessingStart(LOG_TAG_TEST_CONFIG, 'test config refresh');
  handleConfig((err) => {
    if (err) {
      logProcessingFail(LOG_TAG_TEST_CONFIG, op, err);
      done(err);
      return;
    }
    logProcessingDone(LOG_TAG_TEST_CONFIG, op);
    done();
  });
}

// -----------------------------------------------------------------------------
// ##### Main - Process - Test - Browser Reload
// -----------------------------------------------------------------------------

// Browser reload is intentionally emitted by the watch queue-drain path only.

// -----------------------------------------------------------------------------
// ##### Main - Process - Test - Intro
// -----------------------------------------------------------------------------

const MODULE_INTRO = require('@custom/compiler-intro');
let introComplete = false;

function intro(done) {
  return MODULE_INTRO.getIntroString()
    .then(introString => {
      log.console(introString);
      introComplete = true;

      // MODULE_INTRO.getIntroString(true, true)
      // .then(introString => {
      //   log.console(introString);
      //   done();
      // });
      done();
    })
    .catch(error => {
      log.console(ANSI.fg.yellow + COMPILER_TITLE_FULL + ANSI.reset); // Fallback output
      console.error('Error displaying intro:', error);
    });
}

// -----------------------------------------------------------------------------
// ##### Main - Process - Test - Create Task
// -----------------------------------------------------------------------------

/**
 * Normalize mixed steps to Undertaker TaskFunctions.
 * Accepts task names (string) or functions; throws if a name is unknown.
 * @param {(string | Function)[]} steps
 * @returns {import('undertaker').TaskFunction[]}
 * @since 1.0.0
 */
function toTaskFunctions(steps) {
  return steps.map((s) => {
    if (typeof s === 'string') {
      const t = NODE_GULP.task(s); // Gulp 4 getter
      if (typeof t !== 'function') {
        throw new Error(`Unknown gulp task name: ${s}`);
      }
      return /** @type {import('undertaker').TaskFunction} */ (t);
    }
    // Assume caller passed a proper TaskFunction or compatible function.
    return /** @type {import('undertaker').TaskFunction} */ (s);
  });
}

/**
 * @typedef {Object} CreateTaskOptions
 * @property {boolean}  [project=true]   // skip project boot if false
 * @property {import('undertaker').TaskFunction[]} [tasks=[]]     // array of task functions
 */

/**
 * @function createTask
 * @description
 * Registers a named Gulp task that runs through a consistent "compiler pipeline":
 *
 * 1) **Session-gated intro + version check** (runs only once per Node process):
 *    - `intro` runs first when `introComplete === false`
 *    - `_handleVersionCheck` runs after `intro` when `project === true`
 *
 * 2) **Caller-provided steps**:
 *    - `options.tasks` is appended exactly in-order
 *
 * 3) **Project-scoped tail** (only when `project === true`):
 *    - `handleProjectConfigCacheStore`
 *
 * This ensures tasks consistently initialize required compiler state, enforce version constraints
 * for project-scoped runs, and persist caches at the end (when applicable).
 *
 * @param {string} taskName
 * The Gulp task name to register. Must be a non-empty string.
 *
 * @param {CreateTaskOptions} [options={}]
 * Task registration options.
 * - `options.project`: When `true`, the task is treated as **project-scoped** (intro/version check gating + tail steps).
 * - `options.tasks`: Ordered list of Gulp step functions to run as the core body of this task.
 *
 * @throws {Error}
 * Throws if:
 * - `taskName` is not a non-empty string
 * - `options` is not a plain object
 * - `options.tasks` is not an array of functions
 *
 * @returns {void}
 * Registers a task via `NODE_GULP.task(...)`. Does not return a pipeline; the Gulp runtime owns execution.
 *
 * @since 1.0.0
 *
 * @example
 * // Project-scoped task: includes intro/version check (once per session) + project tail steps.
 * createTask('build_html', {
 *   project: true,
 *   tasks: [handleHTML]
 * });
 *
 * @example
 * // Utility task: still runs intro once per session, but skips version check + project tail.
 * createTask('about', {
 *   project: false,
 *   tasks: [groupAbout]
 * });
 *
 * @example
 * // Defensive behavior: if tasks are missing, the registered task fails visibly.
 * createTask('broken_task', { tasks: [] });
 *
 * @notes
 * - The intro/version-check gating depends on shared session state: `introComplete`.
 * - If `introComplete` is reset during runtime, the intro/version check will run again on the next task call.
 * - The "tail steps" are intentionally appended for project tasks to keep cache behavior consistent.
 */
const TASK_DEFINITION_REGISTRY = new Map();

function createTask(taskName, options = {}) {
  const LOG_TAG_CREATE_TASK = '[🛠️ Create Task]';

  if (typeof taskName !== 'string' || !taskName.trim()) {
    throw new Error(`${LOG_TAG_CREATE_TASK} \`[[ANSI_OFF]]taskName[[ANSI_ON]]\` must be a non-empty string.`);
  }
  if (options == null || typeof options !== 'object' || Array.isArray(options)) {
    throw new Error(`${LOG_TAG_CREATE_TASK} \`[[ANSI_OFF]]options[[ANSI_ON]]\` must be an object.`);
  }

  /** @type {CreateTaskOptions} */
  const opts = options;

  const {
    project = true,
    tasks   = [],
  } = opts;

  if (!Array.isArray(tasks) || tasks.some(fn => typeof fn !== 'function')) {
    throw new Error(`${LOG_TAG_CREATE_TASK} \`[[ANSI_OFF]]options.tasks[[ANSI_ON]]\` must be an array of functions.`);
  }

  if (tasks.length === 0) {
    TASK_DEFINITION_REGISTRY.set(taskName, []);
    // Register a task that visibly fails so it's obvious during CI/local runs
    NODE_GULP.task(taskName, function noTasksProvided(done) {
      console.error(LOG_TAG_CREATE_TASK, 'No tasks to run:', { taskName });
      console.error(`  Provide functions via: \`[[ANSI_OFF]]createTask("${taskName}", { tasks: [fn1, fn2] })[[ANSI_ON]]\`\n`);
      done(new Error(`${LOG_TAG_CREATE_TASK} \`[[ANSI_OFF]]createTask("${taskName}")[[ANSI_ON]]\` registered without any tasks.`));
    });
    return;
  }

  // Index raw task steps by task name so schema-based resolution can reuse
  // registered definitions without hardcoded duplicate task chains.
  TASK_DEFINITION_REGISTRY.set(taskName, tasks.slice());

  NODE_GULP.task(taskName, function taskWrapper(done) {
    const steps = [];

    // 1) Intro + version check (only once per session)
    if (!introComplete) {
      // if (intro) steps.push(intro); // NOTICE: change func name if using this
      // if (project && versionCheck) steps.push(_handleVersionCheck);
      steps.push(intro);
      if (project) steps.push(_handleVersionCheck);
    }

    // 2) Caller-provided steps
    steps.push(...tasks);

    // 3) Project-scoped tail (skipped when project === false)
    if (project) {
      steps.push(handleProjectConfigCacheStore);
    }

    const pipeline = NODE_GULP.series(...steps);  // <-- spread
    return pipeline(done);
  });
}

// -----------------------------------------------------------------------------
// ##### Main - Process - Test - Test Hooks
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// ### Main - Group Process
// -----------------------------------------------------------------------------

function primaryHTML(done) {
  NODE_GULP.series(...CHAIN_GROUP_HTML)(done);
};

function groupConfig(done) {
  NODE_GULP.series(...resolveConfigTaskChainForChange('build'))(done);

}

const CHAIN_GROUP_HTML = [
  handleHTML,
  handleSitemap
];

const CHAIN_GROUP_CONFIG = [
  handleConfig,

  primaryResetHighlightSyntax,
  primaryHighlightSyntax,

  primaryResetStylesheet,
  primaryStylesheet,

  primaryResetMirror,
  primaryMirror,
  primaryResetHTML,
  ...CHAIN_GROUP_HTML,

  primaryResetData,
  primaryData
];

const PATH_FILE_CONFIG_SCHEMA_DEFAULT_PROJECT = NODE_CURE_PATH.join(
  PATH_DIR_ROOT_CONFIG_DEFAULT_PROJECT,
  'config.schema.json'
);
const PATH_FILE_CONFIG_SCHEMA_PROJECT = NODE_CURE_PATH.join(
  PATH_DIR_PROJECT,
  'config.schema.json'
);

function _isPlainObject(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function _schemaPatternToRegex(keyPattern) {
  const escapeRegex = (v) => String(v).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = String(keyPattern || '').trim();
  if (!pattern) return null;

  const parts = pattern.split('.');
  const rx = parts.map((segment) => {
    const seg = String(segment || '');
    if (!seg) return '';
    if (seg === '*') return '[^.]+';
    return escapeRegex(seg);
  }).join('\\.');

  try {
    return new RegExp(`^${rx}$`);
  } catch {
    return null;
  }
}

function _normalizeTaskIds(raw) {
  if (raw == null) return null;
  if (Array.isArray(raw)) {
    return raw
      .map(v => String(v || '').trim())
      .filter(Boolean);
  }
  const single = String(raw || '').trim();
  return single ? [single] : [];
}

function _loadMergedConfigSchemaKeys() {
  const schemaDocs = [];
  for (const schemaPath of [PATH_FILE_CONFIG_SCHEMA_DEFAULT_PROJECT, PATH_FILE_CONFIG_SCHEMA_PROJECT]) {
    try {
      if (!libraryPathExists(schemaPath)) continue;
      const doc = NODE_CURE_JSON.load(schemaPath);
      schemaDocs.push(doc);
    } catch (error) {
      log.warn(LOG_TAG_CONFIG_PROJECT, 'Failed to load config schema file for task chain resolution.', {
        schemaPath,
        error: String(error?.message || error)
      });
    }
  }

  const keyMap = new Map();
  for (const doc of schemaDocs) {
    const keys = Array.isArray(doc?.keys) ? doc.keys : [];
    for (const entry of keys) {
      const key = String(entry?.key || '').trim();
      if (!key) continue;
      const previous = keyMap.get(key) || {};
      keyMap.set(key, { ...previous, ...entry, key });
    }
  }

  return Array.from(keyMap.values());
}

function _buildConfigTaskChainSchemaIndex() {
  const entries = _loadMergedConfigSchemaKeys();
  const out = [];

  for (const entry of entries) {
    const key = String(entry?.key || '').trim();
    if (!key) continue;
    if (!(key === 'require' || key === 'option' || key.startsWith('require.') || key.startsWith('option.'))) {
      continue;
    }

    const taskChainRaw = entry?.task_chain;
    if (taskChainRaw === undefined) continue;

    const watchIds = (
      _isPlainObject(taskChainRaw) && Object.prototype.hasOwnProperty.call(taskChainRaw, 'watch')
    ) ? _normalizeTaskIds(taskChainRaw.watch) : (
      _isPlainObject(taskChainRaw) ? null : _normalizeTaskIds(taskChainRaw)
    );

    const buildIds = (
      _isPlainObject(taskChainRaw) && Object.prototype.hasOwnProperty.call(taskChainRaw, 'build')
    ) ? _normalizeTaskIds(taskChainRaw.build) : (
      _isPlainObject(taskChainRaw) ? null : _normalizeTaskIds(taskChainRaw)
    );

    const regex = _schemaPatternToRegex(key);
    if (!regex) continue;

    out.push({
      key,
      regex,
      task_chain: {
        watch: watchIds,
        build: buildIds
      }
    });
  }

  return out;
}

function _collectChangedConfigPaths(prevValue, nextValue, pathParts = [], outSet = new Set()) {
  if (NODE_CURE_JSON.equal(prevValue, nextValue)) {
    return outSet;
  }

  const currentPath = pathParts.reduce((acc, part) => {
    if (part === '[]') {
      return `${acc}[]`;
    }
    return acc ? `${acc}.${part}` : String(part);
  }, '');
  if (currentPath) {
    outSet.add(currentPath);
  }

  if (Array.isArray(prevValue) && Array.isArray(nextValue)) {
    const max = Math.max(prevValue.length, nextValue.length);
    for (let i = 0; i < max; i++) {
      _collectChangedConfigPaths(prevValue[i], nextValue[i], pathParts.concat('[]'), outSet);
    }
    return outSet;
  }

  if (_isPlainObject(prevValue) && _isPlainObject(nextValue)) {
    const keys = new Set([
      ...Object.keys(prevValue),
      ...Object.keys(nextValue)
    ]);
    for (const key of Array.from(keys)) {
      _collectChangedConfigPaths(prevValue[key], nextValue[key], pathParts.concat(key), outSet);
    }
  }

  return outSet;
}

function _isConfigPathPrefix(prefix, full) {
  const a = String(prefix || '');
  const b = String(full || '');
  return !!a && !!b && b !== a && b.startsWith(`${a}.`);
}

function _reduceToDeepestConfigPaths(paths) {
  const list = Array.from(new Set(
    libraryVariableEnsureIsArray(paths)
      .map(v => String(v || '').trim())
      .filter(Boolean)
  ));

  return list.filter(pathCandidate => !list.some(other => _isConfigPathPrefix(pathCandidate, other)));
}

function _schemaKeySpecificityScore(schemaKey) {
  const key = String(schemaKey || '').trim();
  if (!key) return -1;

  const parts = key.split('.').filter(Boolean);
  let score = 0;
  for (const part of parts) {
    if (part === '*') {
      score += 1;
      continue;
    }
    score += 4;
  }
  return score;
}

function _configPathAncestors(pathValue) {
  const pathSafe = String(pathValue || '').trim();
  if (!pathSafe) return [];

  const parts = pathSafe.split('.').filter(Boolean);
  const out = [];
  for (let i = parts.length; i >= 1; i--) {
    out.push(parts.slice(0, i).join('.'));
  }
  return out;
}

function _resolveTaskIdsForChangedPath(changedPath, schemaIndex, modeSafe) {
  const candidatePaths = _configPathAncestors(changedPath);
  for (const candidatePath of candidatePaths) {
    const matches = libraryVariableEnsureIsArray(schemaIndex).filter((entry) => {
      if (!entry || !(entry.regex instanceof RegExp)) return false;
      if (!entry.regex.test(candidatePath)) return false;
      const ids = entry.task_chain?.[modeSafe];
      return Array.isArray(ids);
    });

    if (!matches.length) continue;

    matches.sort((a, b) => {
      const scoreDelta = _schemaKeySpecificityScore(b.key) - _schemaKeySpecificityScore(a.key);
      if (scoreDelta !== 0) return scoreDelta;
      return String(b.key || '').length - String(a.key || '').length;
    });

    const winner = matches[0];
    const ids = winner?.task_chain?.[modeSafe];
    if (Array.isArray(ids)) {
      return ids;
    }
  }

  return null;
}

function _loadProjectConfigMergedSafe() {
  try {
    const projectRaw = NODE_CURE_JSON.load(PATH_FILE_CONFIG_PROJECT);
    return NODE_CURE_JSON.merge(NODE_CURE_JSON.clone(CONFIG_PROJECT_DEFAULT), projectRaw || {});
  } catch (error) {
    log.warn(LOG_TAG_CONFIG_PROJECT, 'Unable to load project config for schema task-chain diff; using full fallback chain.', {
      error: String(error?.message || error)
    });
    return null;
  }
}

function _configTaskIdToChain(taskId) {
  const id = String(taskId || '').trim();
  if (!id) return null;

  const chain = TASK_DEFINITION_REGISTRY.get(id);
  if (!Array.isArray(chain) || !chain.length) return null;

  return chain.slice();
}

function resolveConfigTaskChainForChange(mode = 'watch') {
  const modeSafe = String(mode || 'watch').toLowerCase() === 'build' ? 'build' : 'watch';
  const prevMerged = NODE_CURE_JSON.clone(configProjectMergeSnapshot || configProjectMerge || {});
  const nextMerged = _loadProjectConfigMergedSafe();
  if (!nextMerged) {
    return CHAIN_GROUP_CONFIG;
  }

  const changed = _collectChangedConfigPaths(prevMerged, nextMerged);
  const changedPaths = _reduceToDeepestConfigPaths(changed)
    .filter(key => key === 'require' || key === 'option' || key.startsWith('require.') || key.startsWith('option.'));

  if (!changedPaths.length) {
    return CHAIN_GROUP_CONFIG;
  }

  const schemaIndex = _buildConfigTaskChainSchemaIndex();
  if (!schemaIndex.length) {
    return CHAIN_GROUP_CONFIG;
  }

  const resolvedTaskIds = [];
  let hasSchemaModeMatch = false;

  for (const changedPath of changedPaths) {
    const ids = _resolveTaskIdsForChangedPath(changedPath, schemaIndex, modeSafe);
    if (!Array.isArray(ids)) continue;
    hasSchemaModeMatch = true;
    for (const id of ids) {
      if (!resolvedTaskIds.includes(id)) {
        resolvedTaskIds.push(id);
      }
    }
  }

  if (!hasSchemaModeMatch) {
    return CHAIN_GROUP_CONFIG;
  }

  const resolvedFunctions = [handleConfig];
  for (const taskId of resolvedTaskIds) {
    const chain = _configTaskIdToChain(taskId);
    if (!Array.isArray(chain) || !chain.length) {
      log.warn(LOG_TAG_CONFIG_PROJECT, 'Unknown config task_chain task id; skipping.', { mode: modeSafe, taskId });
      continue;
    }
    for (const fn of chain) {
      if (typeof fn !== 'function') continue;
      if (!resolvedFunctions.includes(fn)) {
        resolvedFunctions.push(fn);
      }
    }
  }

  log.info(LOG_TAG_CONFIG_PROJECT, 'Resolved config change task chain from schema.', {
    mode: modeSafe,
    changedPaths,
    tasks: resolvedFunctions.map(fn => fn.name || '<anonymous>')
  });

  return resolvedFunctions.length ? resolvedFunctions : CHAIN_GROUP_CONFIG;
}

function groupAll(done) {
  NODE_GULP.series(
    primaryMirror,
    primaryAudio,
    primaryBrand,
    primaryData,
    primaryFavicon,
    primaryFile,
    primaryFont,
    primaryFontIcon,
    primaryHighlightSyntax,
    primaryImage,
    primaryJavaScript,
    primaryModule,
    primaryStylesheet,
    primaryVideo,
    primaryHTML
  )(done);
}

// -----------------------------------------------------------------------------
// ### Main - Task Helper
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// #### Main - Task Helper - Watch Mirror
// -----------------------------------------------------------------------------

const LOG_TAG_WATCH_MIRROR = '[👁️ Watch Mirror]';

const WATCHERS = {};
let lastConfigHash = null;

const getMirrorConfig = () => (configProjectMerge.option?.mirrors || []);

function hashConfig(config) {
  const NODE_CRYPTO = require('crypto');
  return NODE_CRYPTO.createHash('sha1').update(JSON.stringify(config)).digest('hex');
}

function resolveMirrorEntry(entry, index) {
  log.detail(LOG_TAG_WATCH_MIRROR, `Resolving mirror entry #${index}:`, entry);

  const fromAbs = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT, entry.source);
  const toAbs = NODE_CURE_PATH.absolute(PATH_DIR_PROJECT, entry.destination);
  const isFile = NODE_FS.existsSync(fromAbs) && NODE_FS.lstatSync(fromAbs).isFile();

  log.detail(LOG_TAG_WATCH_MIRROR, "Path:", {
    From: fromAbs,
    To:   toAbs,
    Type: isFile ? 'File' : 'Directory'
  });

  const matchPatterns = Array.isArray(entry.match_pattern)
    ? entry.match_pattern
    : [entry.match_pattern || '**/*'];

  const ignoreGlobs = matchPatterns
    .filter(p => typeof p === 'string' && p.startsWith('!'))
    .map(p => '!' + NODE_CURE_PATH.absolute(fromAbs, p.slice(1)));

  if (ignoreGlobs.length > 0) {
    log.detail(LOG_TAG_WATCH_MIRROR, `Ignore patterns:`, ignoreGlobs);
  }

  const includeMatcher = NODE_PICOMATCH(
    matchPatterns
      .filter(p => !p.startsWith('!'))
      .map(p => NODE_CURE_PATH.slashForward(p))
  );

  // Cache namespaces (input + output)
  const cacheNamespaceIn = getMirrorCacheNamespace(fromAbs, toAbs);
  const cacheNamespaceOut = cacheNamespaceIn.replace(/^mirror__/, 'mirror_out__');

  return {
    from: fromAbs,
    to: toAbs,
    isFile,
    ignoreGlobs,
    includeMatcher,
    rename: entry.rename,
    cacheNamespaceIn,
    cacheNamespaceOut
  };
}

function createWatcher(id, mirror) {
  const { from, to, isFile, ignoreGlobs, includeMatcher, rename, cacheNamespaceIn, cacheNamespaceOut } = mirror;

  const watchTarget = isFile ? from : NODE_CURE_PATH.join(from, '/');
  const createWatcherLog = logProcessingStart(LOG_TAG_WATCH_MIRROR, 'mirror sub-watcher init', {
    id,
    watchTarget
  });

  const watcher = NODE_CHOKIDAR.watch(watchTarget, { ignoreInitial: true });

  /**
   * Minimal rename applier for watch mirror.
   * Mirrors the same behavior as handleFileCopy():
   * - string shorthand applies only for single-file mirrors
   * - array rules support {pattern,to} glob and {regex,flags,to} regex
   *
   * @param {string} relPathRaw
   * @returns {string}
   */
  function _applyWatchRename(relPathRaw) {
    let relPath = NODE_CURE_PATH.slashForward(relPathRaw);

    if (!rename) return relPath;

    // string shorthand
    if (typeof rename === 'string') {
      if (!isFile) return relPath; // shorthand is only for single-file mirrors
      const target = NODE_CURE_PATH.slashForward(rename);
      if (target.includes('/')) return target;

      const dir = NODE_PATH.posix.dirname(relPath);
      return (dir && dir !== '.') ? `${dir}/${target}` : target;
    }

    const rules = Array.isArray(rename) ? rename : [rename];

    for (const rule of rules) {
      if (!rule) continue;

      if (typeof rule === 'object') {
        const target = NODE_CURE_PATH.slashForward(String(rule.to ?? ''));
        if (!target) continue;

        if (rule.regex) {
          const re = new RegExp(String(rule.regex), String(rule.flags ?? ''));
          if (re.test(relPath)) {
            return NODE_CURE_PATH.slashForward(relPath.replace(re, target));
          }
          continue;
        }

        const pattern = NODE_CURE_PATH.slashForward(String(rule.pattern ?? ''));
        if (!pattern) continue;

        const m = NODE_PICOMATCH(pattern, { dot: true });
        if (!m(relPath)) continue;

        if (target.includes('/')) return target;

        const dir = NODE_PATH.posix.dirname(relPath);
        return (dir && dir !== '.') ? `${dir}/${target}` : target;
      }
    }

    return relPath;
  }

  watcher.on('all', async (event, changedPath) => {
    log.notice(LOG_TAG_WATCH_MIRROR, 'Event detected:', { event, changedPath });

    const relForMatch = mirror.isFile
      ? NODE_PATH.basename(changedPath)
      : NODE_CURE_PATH.relative(mirror.from, changedPath);

    if (!includeMatcher(NODE_CURE_PATH.slashForward(relForMatch))) {
      log.notice(LOG_TAG_WATCH_MIRROR, `Ignored (pattern mismatch): ${changedPath}`);
      return;
    }

    const relPathRaw = isFile ? NODE_PATH.basename(from) : NODE_CURE_PATH.relative(from, changedPath);
    const relPath = _applyWatchRename(relPathRaw);
    const destPath = NODE_CURE_PATH.join(to, relPath);

    try {
      if (event === 'unlink') {
        // delete output file if present
        if (libraryPathExists(destPath)) {
          await NODE_CURE_FS.deleteAsync([destPath], { force: true });
          removeEmptyParentDirs(destPath, PATH_DIR_PROJECT);
        }

        // clear caches (input + output)
        cacheProjectFile.clear(cacheNamespaceIn, changedPath);
        cacheProjectFile.clear(cacheNamespaceOut, destPath);

        log.success(LOG_TAG_WATCH_MIRROR, `Removed: ${destPath}`);
      } else {
        await NODE_FS.promises.mkdir(NODE_PATH.dirname(destPath), { recursive: true });
        await NODE_FS.promises.copyFile(changedPath, destPath);

        // store caches (input + output)
        await cacheProjectFile.store(cacheNamespaceIn, changedPath);
        await cacheProjectFile.store(cacheNamespaceOut, destPath);

        log.success(LOG_TAG_WATCH_MIRROR, `Copied: ${changedPath} -> ${destPath}`);
      }
    } catch (err) {
      log.error(LOG_TAG_WATCH_MIRROR, `Error handling ${event} for ${changedPath}:`, err);
    }
  });

  WATCHERS[id] = watcher;
  log.info(LOG_TAG_WATCH_MIRROR, "Watching:", { from, to });
  logProcessingDone(LOG_TAG_WATCH_MIRROR, createWatcherLog, {
    id,
    from,
    to
  });
}

function stopAllWatchers() {
  if (Object.keys(WATCHERS).length === 0) {
    log.info(LOG_TAG_WATCH_MIRROR, 'No active watchers to stop.');
    return;
  }

  log.begin(LOG_TAG_WATCH_MIRROR, 'Stopping all sub-watchers...');
  for (const id in WATCHERS) {
    log.detail(LOG_TAG_WATCH_MIRROR, `Stopping: ${id}`);
    WATCHERS[id].close();
  }
  Object.keys(WATCHERS).forEach(id => delete WATCHERS[id]);
  log.success(LOG_TAG_WATCH_MIRROR, 'All mirror watchers stopped.');
}

const MirrorWatchManager = {
  start(mirrorConfig = []) {
    const op = logProcessingStart(LOG_TAG_WATCH_MIRROR, 'mirror watcher manager start', {
      mirror_count: mirrorConfig.length
    });
    try {
      this.stop();
      lastConfigHash = hashConfig(mirrorConfig);
      log.detail(LOG_TAG_WATCH_MIRROR, `Config hash: ${lastConfigHash}`);
      log.info(LOG_TAG_WATCH_MIRROR, `Mirror count: ${mirrorConfig.length}`);

      mirrorConfig.forEach((entry, index) => {
        const id = `mirror_${index}`;
        const resolved = resolveMirrorEntry(entry, index);
        createWatcher(id, resolved);
      });

      logProcessingDone(LOG_TAG_WATCH_MIRROR, op, {
        mirror_count: mirrorConfig.length,
        active_watchers: Object.keys(WATCHERS).length
      });
    } catch (error) {
      logProcessingFail(LOG_TAG_WATCH_MIRROR, op, error, {
        mirror_count: mirrorConfig.length
      });
      throw error;
    }
  },

  stop() {
    stopAllWatchers();
  },

  reloadIfConfigChanged(newMirrorConfig = []) {
    const op = logProcessingStart(LOG_TAG_WATCH_MIRROR, 'mirror watcher config reload check', {
      mirror_count: newMirrorConfig.length
    });
    const newHash = hashConfig(newMirrorConfig);
    const oldHash = lastConfigHash;
    if (newHash !== lastConfigHash) {
      log.info(LOG_TAG_WATCH_MIRROR, `Config change detected. Old: ${lastConfigHash}, New: ${newHash}`);
      this.start(newMirrorConfig);
      logProcessingDone(LOG_TAG_WATCH_MIRROR, op, {
        reloaded: true,
        old_hash: oldHash,
        new_hash: newHash
      });
    } else {
      log.info(LOG_TAG_WATCH_MIRROR, 'No changes detected. Watchers are up to date.');
      logProcessingDone(LOG_TAG_WATCH_MIRROR, op, {
        reloaded: false,
        hash: newHash
      });
    }
  }
};

function primaryMirrorWatchStart() {
  const op = logProcessingStart(LOG_TAG_WATCH_MIRROR, 'mirror watch start');
  try {
    MirrorWatchManager.start(getMirrorConfig());
    logProcessingDone(LOG_TAG_WATCH_MIRROR, op, {
      active_watchers: Object.keys(WATCHERS).length
    });
  } catch (error) {
    logProcessingFail(LOG_TAG_WATCH_MIRROR, op, error);
    throw error;
  }
}

function primaryMirrorWatchStop() {
  const op = logProcessingStart(LOG_TAG_WATCH_MIRROR, 'mirror watch stop');
  try {
    MirrorWatchManager.stop();
    logProcessingDone(LOG_TAG_WATCH_MIRROR, op, {
      active_watchers: Object.keys(WATCHERS).length
    });
  } catch (error) {
    logProcessingFail(LOG_TAG_WATCH_MIRROR, op, error);
    throw error;
  }
}

function primaryMirrorWatchReload() {
  const op = logProcessingStart(LOG_TAG_WATCH_MIRROR, 'mirror watch reload');
  try {
    MirrorWatchManager.reloadIfConfigChanged(getMirrorConfig());
    logProcessingDone(LOG_TAG_WATCH_MIRROR, op, {
      active_watchers: Object.keys(WATCHERS).length
    });
  } catch (error) {
    logProcessingFail(LOG_TAG_WATCH_MIRROR, op, error);
    throw error;
  }
}

// -----------------------------------------------------------------------------
// #### Main - Task Helper - Watch
// -----------------------------------------------------------------------------

const LOG_TAG_BROWSER = '[🌐 Browser]';
const LOG_TAG_BROWSERSYNC = '[🧭 Browsersync]';
const LOG_TAG_BROWSERSYNC_UI = `${LOG_TAG_BROWSERSYNC} [UI]`;

// FIXME: Add browser button in future (needs to communicate with gui/cmd via a temp file likely)
// // Function to open the browser manually
// function openBrowser(url) {
//   // Detect the operating system and use the appropriate command
//   const platform = process.platform;

//   log.info(LOG_TAG_BROWSER, 'Open: Attempting Open Local URL:', url, '...');

//   if (platform === 'darwin') {
//     // macOS
//     NODE_CHILD_PROCESS.exec(`open ${url}`);
//   } else if (platform === 'win32') {
//     // Windows
//     NODE_CHILD_PROCESS.exec(`start ${url}`);
//   } else {
//     // Linux and other Unix-like systems
//     NODE_CHILD_PROCESS.exec(`xdg-open ${url}`);
//   }
// }

var browsersyncHandler = null;
// var localURL = null;
// const browsersyncConfig = `${PATH_DIR_PROJECT}browser.json`;

const BROWSERSYNC_DEBUG_OVERLAY_CSS_ROUTE = '/__synticore_source__/project/browser/out/asset/css/dev/dev-page.min.css';
const BROWSERSYNC_DEBUG_OVERLAY_JS_ROUTE = '/__synticore_source__/project/browser/out/asset/js/dev-overlay.min.js';
const BROWSERSYNC_DEBUG_OVERLAY_MARKER = 'data-synticore-browser-dev-overlay';
const BROWSERSYNC_DEV_PANEL_STATE_ROUTE = '/__synticore_dev_panel_state__';
const BROWSERSYNC_UI_CLIENT_JS_ROUTE = '/lib/client-js.js';
const BROWSERSYNC_UI_CUSTOM_CSS_ROUTE = '/__synticore_source__/project/browser/out/asset/css/dev/browsersync.min.css';
const BROWSERSYNC_UI_CUSTOM_CSS_MARKER = 'data-synticore-browsersync-ui-css';
const BROWSERSYNC_DEBUG_OVERLAY_HTML_PATH = NODE_CURE_PATH.join(
  PATH_DIR_ROOT_SOURCE,
  'project/browser/out/dev-panel.html'
);
const BROWSERSYNC_UI_CUSTOM_CSS_PATH = NODE_CURE_PATH.join(
  PATH_DIR_ROOT_SOURCE,
  'project/browser/out/asset/css/dev/browsersync.min.css'
);
const BROWSERSYNC_UI_TEMPLATE_INDEX_PATH = NODE_CURE_PATH.join(
  PATH_DIR_ROOT,
  'node_modules/browser-sync-ui/public/index.html'
);
const BROWSERSYNC_DEV_PANEL_STATE_PATH = NODE_CURE_PATH.join(
  PATH_DIR_PROJECT_CACHE_PROJECT,
  'dev-panel.json'
);
const BROWSERSYNC_DEV_PANEL_STATE_DEFAULT = {
  grid: {
    size: '1',
    unit: 'rem',
    color: '#60fa68',
    alpha: '0.25',
    anchorX: 'center',
    anchorY: 'top'
  },
  log: {
    filters: {
      log: true,
      info: true,
      warn: true,
      error: true
    },
    searchText: ''
  }
};

function browsersyncShouldInjectDebugOverlay(requestUrl = '') {
  const requestPath = String(requestUrl || '').split('?')[0];
  if (!requestPath || requestPath.startsWith('/__browser_sync__') || requestPath.startsWith('/__synticore_source__/')) {
    return false;
  }

  const leaf = requestPath.split('/').pop() || '';
  if (!leaf) return true;
  if (leaf.endsWith('.html')) return true;
  return !leaf.includes('.');
}

function browsersyncInjectDebugOverlay(htmlText) {
  if (typeof htmlText !== 'string' || !htmlText) return htmlText;
  if (htmlText.includes(BROWSERSYNC_DEBUG_OVERLAY_MARKER)) return htmlText;

  const cssTag = `<link rel="stylesheet" href="${BROWSERSYNC_DEBUG_OVERLAY_CSS_ROUTE}" ${BROWSERSYNC_DEBUG_OVERLAY_MARKER}>`;
  const panelMarkup = NODE_FS.existsSync(BROWSERSYNC_DEBUG_OVERLAY_HTML_PATH)
    ? NODE_FS.readFileSync(BROWSERSYNC_DEBUG_OVERLAY_HTML_PATH, 'utf8').trim()
    : '';
  const jsTag = `<script src="${BROWSERSYNC_DEBUG_OVERLAY_JS_ROUTE}" ${BROWSERSYNC_DEBUG_OVERLAY_MARKER}></script>`;

  let output = htmlText;

  if (output.includes('</head>')) {
    output = output.replace('</head>', `  ${cssTag}\n</head>`);
  } else {
    output = `${cssTag}\n${output}`;
  }

  if (output.includes('</body>')) {
    const bodyInjection = [panelMarkup, jsTag].filter(Boolean).join('\n  ');
    output = output.replace('</body>', `  ${bodyInjection}\n</body>`);
  } else {
    const bodyInjection = [panelMarkup, jsTag].filter(Boolean).join('\n');
    output = `${output}\n${bodyInjection}`;
  }

  return output;
}

function browsersyncInstallUiCssInjection(bs) {
  const uiApp = bs?.ui?.app;
  if (!uiApp) {
    log.warn(LOG_TAG_BROWSERSYNC_UI, 'UI CSS injection skipped; UI app is unavailable.');
    return;
  }

  const clientJsSnippet = [
    '(function () {',
    `  var href = ${JSON.stringify(BROWSERSYNC_UI_CUSTOM_CSS_ROUTE)};`,
    '  function injectLink() {',
    '    if (!document || !document.head) return;',
    '    var existing = document.querySelector(\'link[data-synticore-browsersync-ui-css]\');',
    '    if (existing) {',
      '      return;',
    '    }',
    '    var link = document.createElement(\'link\');',
    '    link.rel = \'stylesheet\';',
    '    link.href = href;',
    '    link.setAttribute(\'data-synticore-browsersync-ui-css\', \'true\');',
    '    link.addEventListener(\'error\', function () {',
    '      if (link.parentNode) {',
    '        link.parentNode.removeChild(link);',
    '      }',
    '    }, { once: true });',
    '    document.head.appendChild(link);',
    '  }',
    '  if (document.readyState === \'loading\') {',
    '    document.addEventListener(\'DOMContentLoaded\', injectLink, { once: true });',
    '  } else {',
    '    injectLink();',
    '  }',
    '  window.addEventListener(\'load\', injectLink, { once: true });',
    '  window.addEventListener(\'pageshow\', injectLink);',
    '}());'
  ].join('\n');

  const getInjectedClientJs = () => {
    const baseClientJs = typeof bs?.ui?.clientJs === 'string' ? bs.ui.clientJs : '';
    if (baseClientJs.includes(BROWSERSYNC_UI_CUSTOM_CSS_ROUTE)) {
      return baseClientJs;
    }
    return `${baseClientJs}\n;${clientJsSnippet}\n`;
  };

  const middleware = (req, res, next) => {
    const requestPath = String(req?.url || '').split('?')[0];

    if (requestPath === BROWSERSYNC_UI_CLIENT_JS_ROUTE) {
      try {
        const clientJsText = getInjectedClientJs();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.end(clientJsText);
      } catch (error) {
        log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed serving injected BrowserSync UI client JS.', {
          error: String(error?.message || error)
        });
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Internal Server Error');
      }
      return;
    }

    if (requestPath !== BROWSERSYNC_UI_CUSTOM_CSS_ROUTE) {
      next();
      return;
    }

    try {
      const cssText = NODE_FS.readFileSync(BROWSERSYNC_UI_CUSTOM_CSS_PATH, 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.end(cssText);
    } catch (error) {
      log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed serving BrowserSync UI stylesheet.', {
        path: BROWSERSYNC_UI_CUSTOM_CSS_PATH,
        error: String(error?.message || error)
      });
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Internal Server Error');
    }
  };

  if (Array.isArray(uiApp.stack)) {
    uiApp.stack.unshift({
      route: '',
      handle: middleware
    });
  } else if (typeof uiApp.use === 'function') {
    uiApp.use(middleware);
  }
}

function browsersyncInstallUiCssClientJs(bs) {
  const ui = bs?.ui;
  if (!ui || typeof ui.clientJs !== 'string') {
    log.warn(LOG_TAG_BROWSERSYNC_UI, 'UI client JS CSS injection skipped; UI client JS is unavailable.');
    return;
  }

  if (ui.clientJs.includes(BROWSERSYNC_UI_CUSTOM_CSS_ROUTE)) {
    return;
  }

  const clientJsSnippet = [
    '(function () {',
    `  var href = ${JSON.stringify(BROWSERSYNC_UI_CUSTOM_CSS_ROUTE)};`,
    `  var marker = ${JSON.stringify(BROWSERSYNC_UI_CUSTOM_CSS_MARKER)};`,
    '  function ensureLink() {',
    '    if (!document || !document.head) return;',
    '    if (document.querySelector("link[" + marker + "]")) return;',
    '    var link = document.createElement("link");',
    '    link.rel = "stylesheet";',
    '    link.href = href;',
    '    link.setAttribute(marker, "true");',
    '    document.head.appendChild(link);',
    '  }',
    '  if (document.readyState === "loading") {',
    '    document.addEventListener("DOMContentLoaded", ensureLink, { once: true });',
    '  } else {',
    '    ensureLink();',
    '  }',
    '  window.addEventListener("pageshow", ensureLink);',
    '}());'
  ].join('\n');

  ui.clientJs = `${ui.clientJs}\n;${clientJsSnippet}\n`;
}

function browsersyncPrepareUiIndexTemplate() {
  const cssTag = `<link rel="stylesheet" href="${BROWSERSYNC_UI_CUSTOM_CSS_ROUTE}" ${BROWSERSYNC_UI_CUSTOM_CSS_MARKER}="true"/>`;

  try {
    const currentHtml = NODE_FS.readFileSync(BROWSERSYNC_UI_TEMPLATE_INDEX_PATH, 'utf8');
    if (currentHtml.includes(BROWSERSYNC_UI_CUSTOM_CSS_MARKER) || currentHtml.includes(BROWSERSYNC_UI_CUSTOM_CSS_ROUTE)) {
      return;
    }

    const nextHtml = currentHtml.includes('</head>')
      ? currentHtml.replace('</head>', `    ${cssTag}\n</head>`)
      : `${cssTag}\n${currentHtml}`;

    NODE_FS.writeFileSync(BROWSERSYNC_UI_TEMPLATE_INDEX_PATH, nextHtml, 'utf8');
  } catch (error) {
    log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed preparing BrowserSync UI index template.', {
      path: BROWSERSYNC_UI_TEMPLATE_INDEX_PATH,
      error: String(error?.message || error)
    });
  }
}

function browsersyncInstallUiCssRoute(bs) {
  const uiApp = bs?.ui?.app;
  if (!uiApp) {
    log.warn(LOG_TAG_BROWSERSYNC_UI, 'UI CSS route install skipped; UI app is unavailable.');
    return;
  }

  const middleware = (req, res, next) => {
    const requestPath = String(req?.url || '').split('?')[0];

    if (requestPath !== BROWSERSYNC_UI_CUSTOM_CSS_ROUTE) {
      next();
      return;
    }

    try {
      const cssText = NODE_FS.readFileSync(BROWSERSYNC_UI_CUSTOM_CSS_PATH, 'utf8');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.end(cssText);
    } catch (error) {
      log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed serving BrowserSync UI stylesheet.', {
        path: BROWSERSYNC_UI_CUSTOM_CSS_PATH,
        error: String(error?.message || error)
      });
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.end('Internal Server Error');
    }
  };

  if (Array.isArray(uiApp.stack)) {
    uiApp.stack.unshift({
      route: '',
      handle: middleware
    });
  } else if (typeof uiApp.use === 'function') {
    uiApp.use(middleware);
  }
}

function browsersyncInstallUiCssHtmlInjection(bs) {
  const uiApp = bs?.ui?.app;
  if (!uiApp) {
    log.warn(LOG_TAG_BROWSERSYNC_UI, 'UI CSS HTML injection skipped; UI app is unavailable.');
    return;
  }

  const injectUiCssLink = (htmlText) => {
    const html = String(htmlText || '');
    if (!html) return html;
    if (html.includes(BROWSERSYNC_UI_CUSTOM_CSS_MARKER) || html.includes(BROWSERSYNC_UI_CUSTOM_CSS_ROUTE)) {
      return html;
    }

    const cssTag = `<link rel="stylesheet" href="${BROWSERSYNC_UI_CUSTOM_CSS_ROUTE}" ${BROWSERSYNC_UI_CUSTOM_CSS_MARKER}="true">`;

    if (html.includes('</head>')) {
      return html.replace('</head>', `  ${cssTag}\n</head>`);
    }

    return `${cssTag}\n${html}`;
  };

  const middleware = (req, res, next) => {
    const requestPath = String(req?.url || '').split('?')[0];

    if (requestPath === BROWSERSYNC_UI_CUSTOM_CSS_ROUTE) {
      try {
        const cssText = NODE_FS.readFileSync(BROWSERSYNC_UI_CUSTOM_CSS_PATH, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.end(cssText);
      } catch (error) {
        log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed serving BrowserSync UI stylesheet.', {
          path: BROWSERSYNC_UI_CUSTOM_CSS_PATH,
          error: String(error?.message || error)
        });
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Internal Server Error');
      }
      return;
    }

    if (String(req?.method || 'GET').toUpperCase() === 'GET') {
      const originalWrite = res.write.bind(res);
      const originalEnd = res.end.bind(res);
      /** @type {Buffer[]} */
      const chunks = [];

      res.write = function (chunk, encoding, callback) {
        if (chunk) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
        }

        if (typeof callback === 'function') callback();
        return true;
      };

      res.end = function (chunk, encoding, callback) {
        if (chunk) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding));
        }

        const bodyBuffer = chunks.length ? Buffer.concat(chunks) : null;
        const contentType = String(res.getHeader('Content-Type') || '').toLowerCase();
        const bodyText = bodyBuffer ? bodyBuffer.toString('utf8') : '';
        const looksLikeHtml =
          /^\s*<!doctype html/i.test(bodyText)
          || /^\s*<html\b/i.test(bodyText)
          || /<head\b/i.test(bodyText)
          || /<body\b/i.test(bodyText);
        const shouldInjectHtml =
          bodyBuffer
          && res.statusCode >= 200
          && res.statusCode < 300
          && (contentType.includes('text/html') || looksLikeHtml);

        if (!shouldInjectHtml) {
          if (bodyBuffer) {
            originalWrite(bodyBuffer);
          }
          return originalEnd(undefined, undefined, callback);
        }

        try {
          const injectedHtml = injectUiCssLink(bodyText);
          const injectedBuffer = Buffer.from(injectedHtml, 'utf8');
          res.setHeader('Content-Length', String(injectedBuffer.length));
          originalWrite(injectedBuffer);
          return originalEnd(undefined, undefined, callback);
        } catch (error) {
          log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed injecting BrowserSync UI stylesheet into HTML response.', {
            error: String(error?.message || error),
            path: requestPath
          });
          originalWrite(bodyBuffer);
          return originalEnd(undefined, undefined, callback);
        }
      };
    }

    next();
  };

  if (Array.isArray(uiApp.stack)) {
    uiApp.stack.unshift({
      route: '',
      handle: middleware
    });
  } else if (typeof uiApp.use === 'function') {
    uiApp.use(middleware);
  }
}

function browsersyncInstallUiCssHtmlInjectionStrong(bs) {
  const ui = bs?.ui;
  const uiApp = ui?.app;
  if (!ui || !uiApp) {
    log.warn(LOG_TAG_BROWSERSYNC_UI, 'Strong UI CSS injection skipped; UI app is unavailable.');
    return;
  }

  const uiPackageDir = NODE_PATH.join(PATH_DIR_ROOT, 'node_modules', 'browser-sync-ui');
  const uiPublicDir = NODE_PATH.join(uiPackageDir, 'public');
  const uiStaticDir = NODE_PATH.join(uiPackageDir, 'static');
  const uiIndexPath = NODE_PATH.join(uiPublicDir, 'index.html');
  const uiHeaderPath = NODE_PATH.join(uiStaticDir, 'components', 'header.html');
  const uiFooterPath = NODE_PATH.join(uiStaticDir, 'components', 'footer.html');
  const uiSvgPath = NODE_PATH.join(uiPublicDir, 'img', 'icons', 'icons.svg');

  const injectUiCssLink = (htmlText) => {
    const html = String(htmlText || '');
    if (!html) return html;
    if (html.includes(BROWSERSYNC_UI_CUSTOM_CSS_MARKER) || html.includes(BROWSERSYNC_UI_CUSTOM_CSS_ROUTE)) {
      return html;
    }

    const cssTag = `<link rel="stylesheet" href="${BROWSERSYNC_UI_CUSTOM_CSS_ROUTE}" ${BROWSERSYNC_UI_CUSTOM_CSS_MARKER}="true">`;

    if (html.includes('</head>')) {
      return html.replace('</head>', `  ${cssTag}\n</head>`);
    }

    return `${cssTag}\n${html}`;
  };

  const readFileUtf8Safe = (filePath) => {
    try {
      return NODE_FS.readFileSync(filePath, 'utf8');
    } catch (error) {
      log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed reading BrowserSync UI template asset.', {
        path: filePath,
        error: String(error?.message || error)
      });
      return '';
    }
  };

  const buildUiHtml = () => {
    const indexPage = readFileUtf8Safe(uiIndexPath);
    if (!indexPage) {
      return '';
    }

    const svg = readFileUtf8Safe(uiSvgPath);
    const header = readFileUtf8Safe(uiHeaderPath);
    const footer = readFileUtf8Safe(uiFooterPath);
    const pageMarkup = typeof ui.pageMarkup === 'string' ? ui.pageMarkup : '';
    const templates = typeof ui.templates === 'string' ? ui.templates : '';

    return injectUiCssLink(
      indexPage
        .replace('%pageMarkup%', pageMarkup)
        .replace('%templates%', templates)
        .replace('%svg%', svg)
        .replace('%header%', header)
        .replace(/%footer%/g, footer)
    );
  };

  const middleware = (req, res, next) => {
    const requestPath = String(req?.url || '').split('?')[0];
    const uiPages = (ui.pages && typeof ui.pages === 'object') ? ui.pages : {};
    const uiLeaf = requestPath.replace(/^\/+/, '');
    const isUiHtmlRequest = requestPath === '/' || !!uiPages[uiLeaf];

    if (requestPath === BROWSERSYNC_UI_CUSTOM_CSS_ROUTE) {
      try {
        const cssText = NODE_FS.readFileSync(BROWSERSYNC_UI_CUSTOM_CSS_PATH, 'utf8');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        res.end(cssText);
      } catch (error) {
        log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed serving BrowserSync UI stylesheet.', {
          path: BROWSERSYNC_UI_CUSTOM_CSS_PATH,
          error: String(error?.message || error)
        });
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Internal Server Error');
      }
      return;
    }

    if (String(req?.method || 'GET').toUpperCase() === 'GET' && isUiHtmlRequest) {
      try {
        const htmlText = buildUiHtml();
        if (!htmlText) {
          next();
          return;
        }

        require('zlib').gzip(Buffer.from(htmlText, 'utf8'), (error, zippedBuffer) => {
          if (error) {
            log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed gzipping BrowserSync UI HTML response.', {
              error: String(error?.message || error),
              path: requestPath
            });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.end(htmlText);
            return;
          }

          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.setHeader('Content-Encoding', 'gzip');
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          res.end(zippedBuffer);
        });
      } catch (error) {
        log.warn(LOG_TAG_BROWSERSYNC_UI, 'Failed building BrowserSync UI HTML response.', {
          error: String(error?.message || error),
          path: requestPath
        });
        next();
      }
      return;
    }

    next();
  };

  if (Array.isArray(uiApp.stack)) {
    uiApp.stack.unshift({
      route: '',
      handle: middleware
    });
  } else if (typeof uiApp.use === 'function') {
    uiApp.use(middleware);
  }
}

function browsersyncReadDevPanelState() {
  let raw = null;

  if (NODE_FS.existsSync(BROWSERSYNC_DEV_PANEL_STATE_PATH)) {
    raw = NODE_CURE_JSON.load(BROWSERSYNC_DEV_PANEL_STATE_PATH, { fatal: false });
  }

  const sharedState = (!raw || typeof raw !== 'object' || Array.isArray(raw))
    ? NODE_CURE_JSON.clone(BROWSERSYNC_DEV_PANEL_STATE_DEFAULT)
    : NODE_CURE_JSON.merge(NODE_CURE_JSON.clone(BROWSERSYNC_DEV_PANEL_STATE_DEFAULT), raw);
  const loggerTimestampFormat = browsersyncReadMergedLogTimestampFormat();

  return {
    grid: sharedState.grid,
    log: {
      filters: sharedState?.log?.filters || NODE_CURE_JSON.clone(BROWSERSYNC_DEV_PANEL_STATE_DEFAULT.log.filters),
      searchText: typeof sharedState?.log?.searchText === 'string' ? sharedState.log.searchText : '',
      timestampFormat: loggerTimestampFormat
    }
  };
}

function browsersyncWriteDevPanelState(value) {
  const source = (value && typeof value === 'object' && !Array.isArray(value)) ? value : {};
  const next = NODE_CURE_JSON.merge(
    NODE_CURE_JSON.clone(BROWSERSYNC_DEV_PANEL_STATE_DEFAULT),
    source?.grid && typeof source.grid === 'object'
      ? { grid: source.grid }
      : {},
    source?.log && typeof source.log === 'object'
      ? {
        log: {
          filters: source.log.filters,
          searchText: source.log.searchText
        }
      }
      : {}
  );

  NODE_FS.mkdirSync(NODE_PATH.dirname(BROWSERSYNC_DEV_PANEL_STATE_PATH), { recursive: true });
  NODE_CURE_JSON.save(BROWSERSYNC_DEV_PANEL_STATE_PATH, next, { sort: true, spacing: 2 });
  return next;
}

function browsersyncReadMergedLogTimestampFormat() {
  const loggerDefaults = {
    timestamp: {
      format: 'iso'
    }
  };
  const defaultConfig = NODE_CURE_JSON.load(PATH_FILE_ROOT_CONFIG_DEFAULT_LOG, { fatal: false }) || {};
  const activeConfig = NODE_CURE_JSON.load(PATH_FILE_ACTIVE_CONFIG_LOG, { fatal: false }) || {};
  const merged = NODE_CURE_JSON.merge(
    NODE_CURE_JSON.clone(loggerDefaults),
    defaultConfig,
    activeConfig
  );

  return typeof merged?.timestamp?.format === 'string' && merged.timestamp.format.trim()
    ? merged.timestamp.format.trim()
    : loggerDefaults.timestamp.format;
}

class BrowserSyncHandler {
  constructor(reloadDebouncDelay = 1000) {
    this.browsersyncInstance = null; // Delay instantiation
    this.reloadDebouncId = null;
    this.reloadDebouncDelay = reloadDebouncDelay;
    this.portPlan = null;
    this._missing404Warned = false;
    this._missing404SuppressedCount = 0;
  }

  start() {
    this._startAsync().catch((error) => {
      log.error(LOG_TAG_BROWSER, 'Failed to start Browsersync.', {
        error: String(error?.message || error)
      });
    });
  }

  _toPositiveInt(value, fallback) {
    const n = Number(value);
    if (!Number.isFinite(n)) return fallback;
    const out = Math.floor(n);
    return out > 0 ? out : fallback;
  }

  _getPortPolicy() {
    const browserOptRaw = configProjectMerge?.option?.browser;
    const browserOpt = (
      browserOptRaw &&
      typeof browserOptRaw === 'object' &&
      !Array.isArray(browserOptRaw)
    ) ? browserOptRaw : {};

    const basePort = this._toPositiveInt(browserOpt.port, 3000);
    const portCount = this._toPositiveInt(browserOpt.port_count, 2);
    const scanMax = this._toPositiveInt(browserOpt.scan_max, 200);

    return { basePort, portCount, scanMax };
  }

  _isPortAvailable(port) {
    return new Promise((resolve) => {
      const tester = NODE_NET.createServer();
      tester.unref();

      tester.once('error', () => resolve(false));
      tester.once('listening', () => {
        tester.close(() => resolve(true));
      });

      tester.listen(port);
    });
  }

  async _findAvailablePortPlan(basePort, portCount, scanMax) {
    const start = this._toPositiveInt(basePort, 3000);
    const width = this._toPositiveInt(portCount, 2);
    const max = this._toPositiveInt(scanMax, 200);

    for (let offset = 0; offset <= max; offset++) {
      const candidate = start + offset;
      let available = true;

      for (let i = 0; i < width; i++) {
        const port = candidate + i;
        const isFree = await this._isPortAvailable(port);
        if (!isFree) {
          available = false;
          break;
        }
      }

      if (available) {
        return {
          basePort: candidate,
          portCount: width,
          rangeStart: candidate,
          rangeEnd: candidate + width - 1
        };
      }
    }

    throw new Error(
      `No available contiguous port range found. start=${start}, width=${width}, scan_max=${max}`
    );
  }

  /**
   * Browsersync's published typings in this workspace model custom HTTPS `key`/`cert`
   * as strings, but the runtime accepts the raw Node buffers we pass here.
   *
   * @param {{ basePort?: number, portCount?: number }} portPlan
   * @returns {any}
   */
  _buildBrowserSyncOptions(portPlan) {
    const rangeCount = portPlan?.portCount || 2;
    const appPort = portPlan?.basePort || 3000;
    const uiEnabled = rangeCount >= 2;
    const browsersyncSourceRoutePrefix = '/__synticore_source__/';
    const browserOptRaw = configProjectMerge?.option?.browser;
    const browserOpt = (
      browserOptRaw &&
      typeof browserOptRaw === 'object' &&
      !Array.isArray(browserOptRaw)
    ) ? browserOptRaw : {};
    const httpsEnabled = (typeof browserOpt.https === 'boolean')
      ? browserOpt.https
      : true;
    const httpsKeyPath = (typeof browserOpt.key === 'string')
      ? browserOpt.key.trim()
      : '';
    const httpsCertPath = (typeof browserOpt.cert === 'string')
      ? browserOpt.cert.trim()
      : '';

    /** @type {boolean | { key: Buffer, cert: Buffer }} */
    let httpsOption = false;
    if (httpsEnabled) {
      // Default to Browsersync-managed self-signed cert when no custom pair is provided.
      httpsOption = true;

      if (httpsKeyPath && httpsCertPath) {
        const keyResolved = NODE_PATH.isAbsolute(httpsKeyPath)
          ? httpsKeyPath
          : NODE_CURE_PATH.join(PATH_DIR_PROJECT, httpsKeyPath);
        const certResolved = NODE_PATH.isAbsolute(httpsCertPath)
          ? httpsCertPath
          : NODE_CURE_PATH.join(PATH_DIR_PROJECT, httpsCertPath);

        httpsOption = {
          key: NODE_FS.readFileSync(keyResolved),
          cert: NODE_FS.readFileSync(certResolved)
        };
      }
    }

    const out = {
      port: appPort,
      ui: uiEnabled ? { port: appPort + 1 } : false,
      https: httpsOption,
      server: {
        baseDir: PATH_DIR_PROJECT_OUT,
        middleware: [
          (req, res, next) => {
            const requestPath = String(req?.url || '').split('?')[0];
            if (requestPath !== BROWSERSYNC_DEV_PANEL_STATE_ROUTE) {
              next();
              return;
            }

            if (req.method === 'GET') {
              try {
                const state = browsersyncReadDevPanelState();
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json; charset=utf-8');
                res.end(JSON.stringify(state, null, 2));
              } catch (error) {
                log.warn(LOG_TAG_BROWSERSYNC, 'Failed reading dev panel state.', {
                  error: String(error?.message || error),
                  path: BROWSERSYNC_DEV_PANEL_STATE_PATH
                });
                res.statusCode = 500;
                res.end('Internal Server Error');
              }

              return;
            }

            if (req.method === 'POST') {
              const chunks = [];

              req.on('data', (chunk) => {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
              });

              req.on('end', () => {
                try {
                  const bodyText = chunks.length ? Buffer.concat(chunks).toString('utf8') : '{}';
                  const bodyJSON = bodyText.trim() ? JSON.parse(bodyText) : {};
                  const saved = browsersyncWriteDevPanelState(bodyJSON);

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json; charset=utf-8');
                  res.end(JSON.stringify(saved, null, 2));
                } catch (error) {
                  log.warn(LOG_TAG_BROWSERSYNC, 'Failed writing dev panel state.', {
                    error: String(error?.message || error),
                    path: BROWSERSYNC_DEV_PANEL_STATE_PATH
                  });
                  res.statusCode = 400;
                  res.end('Bad Request');
                }
              });

              req.on('error', (error) => {
                log.warn(LOG_TAG_BROWSERSYNC, 'Dev panel state request stream failed.', {
                  error: String(error?.message || error)
                });
                res.statusCode = 500;
                res.end('Internal Server Error');
              });

              return;
            }

            res.statusCode = 405;
            res.setHeader('Allow', 'GET, POST');
            res.end('Method Not Allowed');
          },
          (req, res, next) => {
            const requestPath = String(req?.url || '').split('?')[0];
            if (!requestPath.startsWith(browsersyncSourceRoutePrefix)) {
              next();
              return;
            }

            try {
              const relRaw = decodeURIComponent(requestPath.slice(browsersyncSourceRoutePrefix.length));
              const relPosix = NODE_PATH.posix.normalize(relRaw).replace(/^(\.\.(\/|\\|$))+/, '');
              const rootResolved = NODE_PATH.resolve(PATH_DIR_ROOT_SOURCE);
              const fileResolved = NODE_PATH.resolve(rootResolved, relPosix);

              if (!fileResolved.startsWith(rootResolved + NODE_PATH.sep) && fileResolved !== rootResolved) {
                res.statusCode = 403;
                res.end('Forbidden');
                return;
              }

              const stat = NODE_FS.existsSync(fileResolved) ? NODE_FS.statSync(fileResolved) : null;
              if (!stat || !stat.isFile()) {
                res.statusCode = 404;
                res.end('Not Found');
                return;
              }

              const ext = NODE_PATH.extname(fileResolved).toLowerCase();
              const mimeByExt = {
                '.css': 'text/css; charset=utf-8',
                '.html': 'text/html; charset=utf-8',
                '.ico': 'image/x-icon',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.js': 'application/javascript; charset=utf-8',
                '.json': 'application/json; charset=utf-8',
                '.png': 'image/png',
                '.svg': 'image/svg+xml; charset=utf-8',
                '.txt': 'text/plain; charset=utf-8',
                '.webp': 'image/webp'
              };

              res.statusCode = 200;
              res.setHeader('Content-Type', mimeByExt[ext] || 'application/octet-stream');
              res.write(NODE_FS.readFileSync(fileResolved));
              res.end();
            } catch (error) {
              log.warn(LOG_TAG_BROWSERSYNC, 'Failed serving source route asset.', {
                url: req?.url || '',
                error: String(error?.message || error)
              });
              res.statusCode = 500;
              res.end('Internal Server Error');
            }
          },
          (req, res, next) => {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            {
              const urlOpt = configProjectMerge?.option?.url || {};

              const cleanUrls = (typeof urlOpt.clean === 'boolean')
                ? urlOpt.clean
                : true;

              const trailingSlash = (typeof urlOpt.trailing_slash === 'boolean')
                ? urlOpt.trailing_slash
                : true;

              // Split URL into path + query once
              const rawUrl = String(req.url || '/');
              const qIndex = rawUrl.indexOf('?');
              const pathOnly = (qIndex === -1) ? rawUrl : rawUrl.slice(0, qIndex);
              const queryTail = (qIndex === -1) ? '' : rawUrl.slice(qIndex);

              // ---------------------------------------------------------------------------
              // Trailing slash normalization (Browsersync itself won't do this for you)
              // ---------------------------------------------------------------------------
              if (!trailingSlash) {
                // 1) Redirect "/docs/" -> "/docs" (except root "/")
                if (pathOnly.length > 1 && pathOnly.endsWith('/')) {
                  const to = pathOnly.slice(0, -1) + queryTail;
                  log.debug(LOG_TAG_BROWSER, '🔗 Trailing slash: ➡️ Redirect:', { from: rawUrl, to });
                  res.statusCode = 301;
                  res.setHeader('Location', to);
                  res.end();
                  return;
                }

                // 2) Map "/docs" -> "/docs/index.html" if it exists (directory-index without slash)
                //    Only for extensionless routes (avoid touching "/file.ext").
                const lastSeg = pathOnly.split('/').pop() || '';
                const hasDot = lastSeg.includes('.');
                if (pathOnly.length > 1 && !hasDot) {
                  const indexHtmlPath = NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT, `${pathOnly}/index.html`);
                  if (NODE_FS.existsSync(indexHtmlPath)) {
                    req.url = `${pathOnly}/index.html${queryTail}`;
                    log.debug(LOG_TAG_BROWSER, '🔗 Index map: ✍️ Rewritten:', req.url);
                  }
                }
              }

              // ---------------------------------------------------------------------------
              // Clean URL rewrite: "/about" -> "/about.html" if present
              // ---------------------------------------------------------------------------
              if (cleanUrls) {
                log.debug(LOG_TAG_BROWSER, '🔗 Request URL: 📥 Incoming:', req.url);

                const originalPath = String(req.url || '/').split('?')[0];
                const htmlPath = `${originalPath}.html`;
                const fullHtmlPath = NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT, htmlPath);

                if (NODE_FS.existsSync(fullHtmlPath)) {
                  req.url = htmlPath + (String(req.url).includes('?') ? `?${String(req.url).split('?')[1]}` : '');
                  log.debug(LOG_TAG_BROWSER, '🔗 Request URL: ✍️ Rewritten:', req.url);
                }
              }
            }

            next();
          },
          (req, res, next) => {
            if (!browsersyncShouldInjectDebugOverlay(req?.url || '')) {
              next();
              return;
            }

            const chunks = [];
            const originalWrite = res.write.bind(res);
            const originalEnd = res.end.bind(res);

            res.write = (chunk, encoding, callback) => {
              if (chunk) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, typeof encoding === 'string' ? encoding : 'utf8'));
              }

              if (typeof callback === 'function') callback();
              return true;
            };

            res.end = (chunk, encoding, callback) => {
              if (chunk) {
                chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, typeof encoding === 'string' ? encoding : 'utf8'));
              }

              const bodyBuffer = chunks.length ? Buffer.concat(chunks) : Buffer.alloc(0);
              const bodyText = bodyBuffer.toString('utf8');
              const rewrittenText = browsersyncInjectDebugOverlay(bodyText);
              const outputBuffer = Buffer.from(rewrittenText, 'utf8');

              try {
                res.removeHeader('Content-Length');
              } catch (error) {
                // Ignore when the header cannot be removed.
              }

              res.setHeader('Content-Length', String(outputBuffer.length));
              originalWrite(outputBuffer);
              return originalEnd(null, null, callback);
            };

            next();
          }
        ]
      }
    };

    return out;
  }

  async _startAsync() {
    if (this.browsersyncInstance?.active) {
      log.notice(LOG_TAG_BROWSER, 'Already running.');
      return;
    }

    log.begin(LOG_TAG_BROWSER, 'Initializing...');

    // this.removeConfig();

    if (!this.browsersyncInstance) {
      this.browsersyncInstance = require('browser-sync').create(); // Create only when needed
    }

    const policy = this._getPortPolicy();
    this.portPlan = await this._findAvailablePortPlan(
      policy.basePort,
      policy.portCount,
      policy.scanMax
    );

    log.info(LOG_TAG_BROWSER, 'Port block allocated for Browsersync.', this.portPlan);

    const browsersyncOptions = this._buildBrowserSyncOptions(this.portPlan);

    const onInit = (err, bs) => {
      // bs is BrowserSyncInstance

      if (err) {
        if (err?.code === 'EADDRINUSE') {
          // Rare race: port became occupied after probing; retry from next candidate.
          log.warn(LOG_TAG_BROWSER, 'Port collision occurred after allocation; retrying.', {
            fromPort: this.portPlan?.basePort,
            error: String(err?.message || err)
          });

          const retryPolicy = this._getPortPolicy();
          const retryStart = (this.portPlan?.basePort || retryPolicy.basePort) + 1;
          this._findAvailablePortPlan(
            retryStart,
            retryPolicy.portCount,
            retryPolicy.scanMax
          )
            .then((nextPlan) => {
              this.portPlan = nextPlan;
              log.info(LOG_TAG_BROWSER, 'Port block re-allocated for Browsersync.', this.portPlan);
              this.browsersyncInstance.init(this._buildBrowserSyncOptions(this.portPlan), onInit);
            })
            .catch((retryError) => {
              log.error(LOG_TAG_BROWSER, 'Retry port allocation failed.', {
                error: String(retryError?.message || retryError)
              });
            });
          return;
        }

        log.error(LOG_TAG_BROWSER, err);
        return;
      }

      // If NOT error:

      browsersyncPrepareUiIndexTemplate();
      browsersyncInstallUiCssClientJs(bs);
      browsersyncInstallUiCssRoute(bs);

      // route can be '*' or a specific path
      const route = '*';
      const handler = (req, res) => {
        const notFoundPathOut = NODE_CURE_PATH.join(PATH_DIR_PROJECT_OUT, '404.html');
        const notFoundPathRootFallback = NODE_CURE_PATH.join(PATH_DIR_ROOT_SOURCE, 'browser/out/404.html');
        const hasOut404 = NODE_FS.existsSync(notFoundPathOut);
        const hasRootFallback404 = NODE_FS.existsSync(notFoundPathRootFallback);
        const notFoundPath = hasOut404 ? notFoundPathOut : (hasRootFallback404 ? notFoundPathRootFallback : null);

        res.statusCode = 404;

        if (notFoundPath) {
          if (this._missing404Warned) {
            log.info(LOG_TAG_BROWSERSYNC, '404 fallback recovered.', {
              file: NODE_CURE_PATH.relative(PATH_DIR_ROOT, notFoundPath),
              suppressed: this._missing404SuppressedCount
            });
            this._missing404Warned = false;
            this._missing404SuppressedCount = 0;
          }

          try {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.write(NODE_FS.readFileSync(notFoundPath));
          } catch (error) {
            log.warn(LOG_TAG_BROWSERSYNC, 'Failed reading 404 fallback; sending default text.', {
              file: notFoundPath,
              error: String(error?.message || error)
            });
            res.write('404 - Not Found');
          }
        } else {
          if (!this._missing404Warned) {
            log.warn(LOG_TAG_BROWSERSYNC, '404.html not found in out/ or source/project/browser/ — sending default text.', {
              out: notFoundPathOut,
              root_fallback: notFoundPathRootFallback,
              url: req?.url || '/'
            });
            this._missing404Warned = true;
            this._missing404SuppressedCount = 0;
          } else {
            this._missing404SuppressedCount++;
          }

          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.write('404 - Not Found');
        }
        res.end();
      };

      // Polite fallback chain (covers old/new types & runtimes)
      const bsAny = /** @type {any} */ (bs);
      if (typeof bsAny.addMiddleware === 'function') {
        bsAny.addMiddleware(route, handler);
      } else if (bsAny.app && typeof bsAny.app.use === 'function') {
        bsAny.app.use(route, handler);
      } else if (typeof bsAny.use === 'function') {
        bsAny.use(route, handler);
      } else {
        log.warn(LOG_TAG_BROWSERSYNC, 'No middleware API available on this Browsersync build.');
      }

      // this.createConfig(bs);
    };

    this.browsersyncInstance.init(browsersyncOptions, onInit);

    this.browsersyncInstance.emitter.on('init', () => {
      this.browsersyncInstance.reload(); // IMPORTANT: intentional reload on init to load correct favicon.

      logPauseBeforeWait(LOG_TAG_BROWSER, 'initial browser ready', configProjectMerge.option.watch.delay_browser);
      NODE_TIMERS.setTimeout(() => {
        log.status();
        log.resetStatusCounters();
        log.init(LOG_TAG_BROWSER, '▶️ [READY]');
      }, configProjectMerge.option.watch.delay_browser);
    });

    this.browsersyncInstance.emitter.on('change', (file) => {
      log.detail(LOG_TAG_BROWSER, '📄 File changed:', libraryFileGetInfo(file));
    });

    this.browsersyncInstance.emitter.on('reload', () => {
      log.detail(LOG_TAG_BROWSER, '🔄 Reload.');
    });

    this.browsersyncInstance.emitter.on('file:changed', (file) => {
      log.detail(LOG_TAG_BROWSER, '📄 Detailed file change:', libraryFileGetInfo(file));
    });
  }

  reload(emitStatus = true) {
    // if (this.reloadDebouncId) {
    //   clearTimeout(this.reloadDebouncId);
    // }

    // this.reloadDebouncId = NODE_TIMERS.setTimeout(() => {
      if (this.browsersyncInstance?.active) {
        log.info(LOG_TAG_BROWSER, '🔄 Reloading...');
        this.browsersyncInstance.reload();
      } else {
        log.error(LOG_TAG_BROWSER, 'Instance is not available for reload.');
      }
      if (emitStatus) {
        log.status();
        log.resetStatusCounters();
      }
    // }, configProjectMerge.option.watch.delay_browser);
  }

  // createConfig(bs) {
  //   if (!bs) {
  //     return;
  //   }

  //   // localURL = bs.options.get('urls').get('local');
  //   // NODE_CURE_FS.writeFileSync(browsersyncConfig, JSON.stringify({ localURL }));
  //   log.info(LOG_TAG_BROWSER, 'Config file created.');
  // }

  // removeConfig() {
  //   if (!NODE_FS.existsSync(browsersyncConfig)) {
  //     return;
  //   }

  //   NODE_FS.unlinkSync(browsersyncConfig);
  //   log.info(LOG_TAG_BROWSER, 'Config file deleted.');
  // }

  async stop() {
    log.begin(LOG_TAG_BROWSER, 'Begin...');
    const op = logProcessingStart(LOG_TAG_BROWSER, 'browser sync stop');

    if (!this.browsersyncInstance?.active) {
      logProcessingDone(LOG_TAG_BROWSER, op, { active: false });
      log.notice(LOG_TAG_BROWSER, 'Not running.');
      return;
    }

    // this.removeConfig();

    this.browsersyncInstance.exit();
    logProcessingDone(LOG_TAG_BROWSER, op, { active: false });

    log.end(LOG_TAG_BROWSER, 'Complete.');
  }
}

const PATH_WATCH_BROWSER = `${PATH_DIR_PROJECT_OUT}${PATH_ALL}`;

// function primarybrowserOpen(done) {
//   if (!localURL) {
//     if (NODE_FS.existsSync(browsersyncConfig)) {
//       log.info(LOG_TAG_BROWSER, '[Open] Reading Local URL from file...'));
//       const data = NODE_FS.readFileSync(browsersyncConfig, 'utf-8');
//       const config = JSON.parse(data);
//       localURL = config.localURL;
//     }
//   }

//   if (!localURL) {
//     log.error(LOG_TAG_BROWSER, '[Open] Local URL not set."));
//     done();
//     return;
//   }

//   log.info(LOG_TAG_BROWSER, '[Open] Opening Local URL.');
//   openBrowser(localURL);
//   done();
// }

const LOG_TAG_WATCH = '[👁️ Watch]';
const WATCH_PAUSE_LOG_THRESHOLD_MS = 1000;

function logProcessingStart(logTag, operation, detail = {}) {
  const startedAt = Date.now();
  const detailNormalized = normalizeProcessingDetail(detail);
  log.info(logTag, 'Processing:', {
    operation,
    ...detailNormalized
  });
  return { operation, startedAt, detail: detailNormalized };
}

function logProcessingDone(logTag, token, detail = {}) {
  const durationMs = Date.now() - token.startedAt;
  const detailNormalized = normalizeProcessingDetail(detail);
  log.success(logTag, 'Processed:', {
    operation: token.operation,
    Time: formatDurationMsHuman(durationMs),
    ...detailNormalized
  });
}

function logProcessingFail(logTag, token, error, detail = {}) {
  const durationMs = token?.startedAt ? (Date.now() - token.startedAt) : null;
  const detailNormalized = normalizeProcessingDetail(detail);
  log.error(logTag, 'Failed processing:', {
    operation: token?.operation,
    Time: formatDurationMsHuman(durationMs),
    error: String(error?.message || error),
    ...detailNormalized
  });
}

function formatDurationMsHuman(ms) {
  const msSafe = Number(ms);
  if (!Number.isFinite(msSafe) || msSafe < 0) {
    return null;
  }
  const NODE_CURE_TIME = require('@custom/cure-time');
  return NODE_CURE_TIME.formatDuration(Math.round(msSafe) * 1000000);
}

/**
 * @returns {{ outputFormat: string, zone: 'utc' | 'local', locale: string }}
 */
function getLogTimestampConfigForCureTime() {
  /** @type {{ outputFormat: string, zone: 'utc' | 'local', locale: string }} */
  const fallback = {
    outputFormat: 'iso',
    zone: 'utc',
    locale: 'auto'
  };

  try {
    /** @type {{ timestamp?: { format?: string, zone?: string, locale?: string } } | null} */
    const cfg = (typeof log?.getConfig === 'function') ? log.getConfig() : null;
    const ts = (cfg && cfg.timestamp && typeof cfg.timestamp === 'object') ? cfg.timestamp : {};
    /** @type {'utc' | 'local'} */
    const zone = String(ts.zone || fallback.zone).toLowerCase() === 'local' ? 'local' : 'utc';
    return {
      outputFormat: (typeof ts.format === 'string' && ts.format.trim()) ? ts.format.trim() : fallback.outputFormat,
      zone,
      locale: (typeof ts.locale === 'string' && ts.locale.trim()) ? ts.locale.trim() : fallback.locale
    };
  } catch (_) {
    return fallback;
  }
}

function formatDateTimeByLogConfig(inputDateLike) {
  const NODE_CURE_TIME = require('@custom/cure-time');
  const tsCfg = getLogTimestampConfigForCureTime();
  const out = NODE_CURE_TIME.formatDateTime(inputDateLike, {
    outputFormat: tsCfg.outputFormat,
    zone: tsCfg.zone,
    locale: tsCfg.locale,
    invalid: ''
  });
  return out || null;
}

function normalizeProcessingDetail(detail = {}) {
  if (!detail || typeof detail !== 'object' || Array.isArray(detail)) {
    return detail;
  }

  const normalized = { ...detail };

  const aliases = {
    count: ['File Count', 'file_count', 'fileCount', 'Count', 'count'],
    current: ['File Current', 'file_current', 'fileCurrent', 'Current', 'current', 'files_seen', 'templates_seen'],
    total: ['File Total', 'file_total', 'fileTotal', 'Total', 'total', 'total_files'],
    path: ['File Path', 'file_path', 'filePath', 'Path', 'path']
  };

  const pickValue = (keys) => {
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(normalized, key)) {
        return normalized[key];
      }
    }
    return undefined;
  };

  const count = pickValue(aliases.count);
  const current = pickValue(aliases.current);
  const total = pickValue(aliases.total);
  const path = pickValue(aliases.path);

  for (const group of Object.values(aliases)) {
    for (const key of group) {
      delete normalized[key];
    }
  }

  const out = {};
  if (current !== undefined) out['File Current'] = current;
  if (total !== undefined) out['File Total'] = total;
  if ((current === undefined && total === undefined) && count !== undefined) {
    out['File Count'] = count;
  }
  if (path !== undefined) {
    out['File Path'] = path;
  }

  return {
    ...out,
    ...normalized
  };
}

function logPauseBeforeWait(logTag, reason, delayMs, detail = {}) {
  if (!Number.isFinite(delayMs) || delayMs < WATCH_PAUSE_LOG_THRESHOLD_MS) {
    return;
  }

  log.info(logTag, '[PAUSE] Waiting before next step.', {
    Reason: reason,
    Time: formatDurationMsHuman(delayMs),
    ...detail
  });
}

const LOG_TAG_WATCH_SUB = LOG_TAG_WATCH + ' [📋 Subwatch]';

class SubWatcher {
  constructor(pathRoot, taskname, chain, cacheNamespace, watcherPatterns, initCallback, mainReady, isInput, enqueueChainCallback, unlinkCallback = null) {
    // this.debug = true;
    this.pathRoot = pathRoot;
    this.taskname = taskname;
    this.chain = Array.isArray(chain) ? chain : [];
    this.cacheNamespace = cacheNamespace;
    this.unlinkCallback = unlinkCallback;
    this.enqueueChainCallback = enqueueChainCallback;
    this.watcherPatterns = libraryVariableEnsureIsArray(watcherPatterns);
    this.callbackDebouncId = null;
    this.initCallback = initCallback;
    this.mainReady = mainReady;
    this.isInput = isInput;
    this.watcher = null; // chokidar watcher instance
    this.isReady = false;
    this.isTaskRunning = false;
    this.pendingEvents = new Map();

    // Compile separate matchers for inclusion and exclusion
    this.includeMatcher = NODE_PICOMATCH(this.watcherPatterns.filter(p => !p.startsWith('!')), { dot: true });
    this.excludeMatcher = NODE_PICOMATCH(this.watcherPatterns.filter(p => p.startsWith('!')).map(p => p.slice(1)), { dot: true });

    log.init(LOG_TAG_WATCH_SUB, 'initializing:', this.taskname, {
        pathRoot: this.pathRoot,
        watcherPatterns: this.watcherPatterns
      }
    );
  }

  start() {
    const options = {
      // alwaysStat: false,       // Avoid unnecessary stat calls to minimize locking
      // awaitWriteFinish: {
      //   stabilityThreshold: 500, // Reduce time to stabilize writes
      //   pollInterval: 100
      // },
      // cwd: __dirname,
      // cwd: this.pathRoot,
      // depth: undefined, // Recursive watcher by default
      // depth: 1,               // Limit depth to reduce unnecessary locking
      // followSymlinks: false,  // Prevent symlink following which may cause locks
      followSymlinks: true,
      ignoreInitial: !this.mainReady,
      interval: 1000,//configProjectMerge.option.watch.delay_change, // being used in async onchange()
      // persistent: false,
      persistent: true,
      // usePolling: false,      // Disable polling to avoid high CPU usage and locks
      usePolling: true,
    }
    this.watcher = NODE_CHOKIDAR.watch(
      this.pathRoot,
      // NODE_CURE_PATH.absolute(this.pathRoot),
      options
    );

    log.debug(LOG_TAG_WATCH_SUB, this.taskname, {mainReady: this.mainReady, options: options});

    this.watcher
      .on('all', (event, path) => log.debug(LOG_TAG_WATCH_SUB, this.taskname, {event, path}))

      .on('add', (path) => {
        try {
          path = NODE_CURE_PATH.slashForward(path);

          // Match against precompiled glob patterns
          if (!this.matcher(path)) {
            return;
          }

          // if (this.isReady || this.debugInit) {
            log.detail(LOG_TAG_WATCH_SUB, '[ADD] 📄 File:', {taskname: this.taskname, path: path});
          // }

          this.onchange('add', path);
        } catch (error) {
          log.error(LOG_TAG_WATCH_SUB, this.taskname, '[ADD] 📄 File:', error);
        }
      })
      .on('change', (path) => {
        try {
          path = NODE_CURE_PATH.slashForward(path);

          // Match against precompiled glob patterns
          if (!this.matcher(path)) {
            return;
          }

          log.detail(LOG_TAG_WATCH_SUB, '[CHANGE] 📄 File:', {taskname: this.taskname, path: path});
          this.onchange('change', path);
        } catch (error) {
          log.error(LOG_TAG_WATCH_SUB, this.taskname, '[CHANGE] 📄 File:', error);
        }
      })
      .on('error', (/** @type {NodeJS.ErrnoException | Error} */ error) => {
        if (/** @type {any} */ (error).code === 'EPERM') {
          log.notice(ANSI.format(ANSI.bc.fg.yellow, `👁️ Watcher \`${this.taskname}\`: EPERM Error: ${error.message}`));
        } else {
          log.error(LOG_TAG_WATCH_SUB, 'Unexpected:', error);
        }
      })
      .on('ready', () => {
        if (this.isReady) return;
        this.isReady = true;

        log.init([
          '[[NEWLINES]]',
          ['[[NORMAL]]', LOG_TAG_WATCH_SUB, 'Ready:', this.taskname],
          [ '[[LIST]]', 'All paths initialized.' ]
        ]);

        if (this.initCallback) {
          this.initCallback();
        }
      });

    if (this.isInput) {
      this.watcher
      .on('unlink', async (path) => {
        try {
          path = NODE_CURE_PATH.slashForward(path);

          // Match against precompiled glob patterns
          if (!this.matcher(path)) {
            return;
          }

          log.detail(LOG_TAG_WATCH_SUB, '[REMOVE] 📄 File:', {taskname: this.taskname, path: path});
          // Intentionally do not clear cache here.
          // Build-task prune uses cache entries as source-of-truth for missing-input detection.
          try {
            if (this.unlinkCallback) {
              log.begin(LOG_TAG_WATCH_SUB, 'Unlink Callback running:', { name: this.unlinkCallback.name });
              await this.unlinkCallback();
              log.end(LOG_TAG_WATCH_SUB, 'Unlink Callback complete:', { name: this.unlinkCallback.name });
            }
          } catch (error) {
            log.error(LOG_TAG_WATCH_SUB, 'Unlink Callback:', error);
          }

          // Trigger task run so prune logic handles output/cache cleanup consistently.
          this.onchange('unlink', path);
        } catch (error) {
          log.error(LOG_TAG_WATCH_SUB, this.taskname, '[REMOVE] 📄 File:', error);
        }
      })
      // .on('addDir', (path) => {
      //   try {
      //     path = NODE_CURE_PATH.slashForward(path);

      //     // Match against precompiled glob patterns
      //     if (!this.matcher(path)) {
      //       return;
      //     }

      //     // if (this.isReady || this.debugInit) {
      //       log.detail(LOG_TAG_WATCH_SUB, '[ADD] 📄 📂 Directory:', {taskname: this.taskname, path: path});
      //     // }
      //   } catch (error) {
      //     log.error(LOG_TAG_WATCH_SUB, this.taskname, '[ADD] 📄 📂 Directory:', error);
      //   }
      // })
      .on('unlinkDir', (path) => {
        try {
          path = NODE_CURE_PATH.slashForward(path);

          // // Match against precompiled glob patterns
          // if (!this.matcher(path)) {
          //   return;
          // }

          log.detail(LOG_TAG_WATCH_SUB, '[REMOVE] 📄 📂 Directory:', {taskname: this.taskname, path: path});
          // cacheProjectFile.purge handled already by unlink
          this.onchange('unlinkDir', path);
        } catch (error) {
          log.error(LOG_TAG_WATCH_SUB, this.taskname, '[ADD] 📄 📂 Directory:', error);
        }
      });
    }

    // log.init([
    //   '[[NEWLINES]]',
    //   ['[[NORMAL]]', LOG_TAG_WATCH_SUB, 'Ready:', this.taskname],
    //   ['[[LIST]]', 'All paths initialized.']
    // ], {
    //     pathRoot: this.pathRoot,
    //     watcherPatterns: this.watcherPatterns
    // });
    log.init([
      '[[NEWLINES]]',
      ['[[NORMAL]]', LOG_TAG_WATCH_SUB, 'Ready:', this.taskname],
      ['[[LIST]]', 'All paths initialized.']
    ]);

    if (this.mainReady) {
      this.onchange('init', this.pathRoot);
    }
  }

  matcher(path) {
    // Normalize incoming path
    const pathNormalized = NODE_CURE_PATH.slashForward(path);

    if (
      this.taskname === TASK_BUILD_HTML &&
      isGeneratedConfigIncludeOwnedByHandlebars(pathNormalized)
    ) {
      log.debug(LOG_TAG_WATCH_SUB, this.taskname, 'Ignored generated config include shadowed by sibling Handlebars source:', {
        path: pathNormalized
      });
      return false;
    }

    // Normalize root once
    const root = NODE_CURE_PATH.slashForward(this.pathRoot);

    // Ensure we can match whether chokidar gives us:
    // - absolute paths (your watcherPatterns are absolute)
    // - or root-relative paths (common if cwd/root behavior differs)
    let pathAbs = pathNormalized;

    const isWindowsAbs = /^[A-Za-z]:\//.test(pathAbs);
    const isPosixAbs = pathAbs.startsWith('/');
    const isAbs = isWindowsAbs || isPosixAbs;

    if (!isAbs) {
      // Convert relative -> absolute under this subwatcher's root
      pathAbs = NODE_CURE_PATH.slashForward(
        NODE_CURE_PATH.absolute(root, pathAbs)
      );
    }

    // Also compute root-relative (for safety if patterns ever become relative later)
    const pathRel = NODE_CURE_PATH.slashForward(
      NODE_CURE_PATH.relative(root, pathAbs)
    );

    // Check inclusion and exclusion against BOTH forms
    const isIncluded = this.includeMatcher(pathAbs) || this.includeMatcher(pathRel);
    const isExcluded = this.excludeMatcher(pathAbs) || this.excludeMatcher(pathRel);

    if (!isIncluded || isExcluded) {
      log.debug(LOG_TAG_WATCH_SUB, this.taskname, 'Ignored path:', {
        path,
        pathAbs,
        pathRel
      });
      return false;
    }

    return true;
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
      if (this.callbackDebouncId) {
        clearTimeout(this.callbackDebouncId);
        this.callbackDebouncId = null;
      }
      this.pendingEvents.clear();
      log.shutdown([
        '[[NEWLINES]]',
        ['[[NORMAL]]', LOG_TAG_WATCH_SUB, this.taskname],
        ['[[LIST]]', 'Stopped watching path:', this.pathRoot]
      ]);
    }
  }

  _eventPriority(type) {
    if (type === 'unlinkDir') return 4;
    if (type === 'unlink') return 3;
    if (type === 'change') return 2;
    if (type === 'add') return 1;
    return 0;
  }

  _enqueueChange(type, path) {
    const eventType = String(type || 'change');
    const eventPath = path ? NODE_CURE_PATH.slashForward(String(path)) : '';
    const key = eventPath || '__task__';
    const eventTime = Date.now();
    const existingEvent = this.pendingEvents.get(key);
    const existingType = existingEvent?.type;

    if (!existingType || this._eventPriority(eventType) >= this._eventPriority(existingType)) {
      this.pendingEvents.set(key, { type: eventType, time: eventTime });
    } else if (existingEvent && eventTime > existingEvent.time) {
      existingEvent.time = eventTime;
      this.pendingEvents.set(key, existingEvent);
    }
  }

  async _drainChanges() {
    if (this.isTaskRunning) {
      log.debug(LOG_TAG_WATCH_SUB, this.taskname, '[CHANGE] Drain skipped (already running).');
      return;
    }

    this.isTaskRunning = true;
    let drainBatchCount = 0;
    const MAX_DRAIN_BATCHES = 50;

    // Start-of-cycle reset: counters + timer should reflect this watch drain only.
    if (typeof log.resetStatusCounters === 'function') {
      log.resetStatusCounters();
    }
    if (typeof log.resetStartTime === 'function') {
      log.resetStartTime();
    }

    try {
      while (this.pendingEvents.size > 0) {
        drainBatchCount++;
        if (drainBatchCount > MAX_DRAIN_BATCHES) {
          log.error(LOG_TAG_WATCH_SUB, this.taskname, '[CHANGE] Drain aborted: exceeded max batches.', {
            max: MAX_DRAIN_BATCHES,
            pending: this.pendingEvents.size
          });
          this.pendingEvents.clear();
          break;
        }

        const pendingBatch = Array.from(this.pendingEvents.entries());
        this.pendingEvents.clear();

        const batchSummary = pendingBatch.reduce((acc, [, eventInfo]) => {
          const eventType = (eventInfo && typeof eventInfo.type === 'string') ? eventInfo.type : 'change';
          acc[eventType] = (acc[eventType] || 0) + 1;
          return acc;
        }, /** @type {Record<string, number>} */ ({}));

        log.debug(LOG_TAG_WATCH_SUB, this.taskname, '[CHANGE] Draining queue:', {
          size: pendingBatch.length,
          events: batchSummary
        });

        const changedAbsPaths = pendingBatch
          .map(([eventPath]) => eventPath)
          .filter(eventPath => eventPath && eventPath !== '__task__')
          .map(eventPath => NODE_CURE_PATH.slashForward(String(eventPath)));
        const batchEventTime = pendingBatch.reduce((latest, [, eventInfo]) => {
          const t = Number(eventInfo?.time || 0);
          return t > latest ? t : latest;
        }, 0) || Date.now();

        if (!this.taskname || !Array.isArray(this.chain) || !this.chain.length || typeof this.enqueueChainCallback !== 'function') {
          continue;
        }

        const chainToQueue = (this.taskname === TASK_BUILD_CONFIG)
          ? resolveConfigTaskChainForChange('watch')
          : this.chain;
        this.enqueueChainCallback(chainToQueue, batchEventTime, this.taskname);
      }

      // Status is emitted by the global watch scheduler after each chain.
    } catch (error) {
      log.error(LOG_TAG_WATCH_SUB, this.taskname, 'Callback:', error);
    } finally {
      this.isTaskRunning = false;

      // If events arrived while finalizing, schedule another pass.
      if (this.pendingEvents.size > 0) {
        this.onchange('drain-followup');
      }
    }
  }

  async onchange(type = 'change', path = null) {
    this._enqueueChange(type, path);

    const now = Date.now();

    if (this.callbackDebouncId) {
      const lastClearedDuration = now - (this.lastCallbackTime || now);
      log.debug(LOG_TAG_WATCH_SUB, this.taskname, '[CHANGE] Debounce: Remaining:', lastClearedDuration, 'ms');
      clearTimeout(this.callbackDebouncId);
    }

    const delay = configProjectMerge.option.watch.delay_change;
    logPauseBeforeWait(LOG_TAG_WATCH_SUB, 'change debounce drain', delay, {
      taskname: this.taskname,
      pending: this.pendingEvents.size
    });

    this.callbackDebouncId = NODE_TIMERS.setTimeout(async () => {
      this.callbackDebouncId = null;
      await this._drainChanges();
    }, delay);

    log.debug(LOG_TAG_WATCH_SUB, this.taskname, '[CHANGE] Queued:', {
      type,
      path,
      pending: this.pendingEvents.size
    });
    log.debug(LOG_TAG_WATCH_SUB, this.taskname, '[CHANGE] Debounce: Duration:', delay, 'ms');

    this.lastCallbackTime = now;
  }
}

const watchMainPaths = [
  PATH_DIR_PROJECT,
  PATH_DIR_PROJECT_IN,
  PATH_DIR_PROJECT_IN_ASSET,
  PATH_DIR_PROJECT_IN_FAVICON,
  PATH_DIR_PROJECT_IN_HTML_INCLUDE,
  PATH_DIR_PROJECT_OUT,
];

const TASK_BUILD                  = 'build';
const TASK_BUILD_AUDIO            = 'build_audio';
const TASK_BUILD_BRAND            = 'build_brand';
const TASK_BUILD_CONFIG           = 'build_config';
const TASK_BUILD_DATA             = 'build_data';
const TASK_BUILD_FAVICON          = 'build_favicon';
const TASK_BUILD_FILE             = 'build_file';
const TASK_BUILD_FONT             = 'build_font';
const TASK_BUILD_FONT_ICON        = 'build_font_icon';
const TASK_BUILD_HIGHLIGHT_SYNTAX = 'build_highlight_syntax';
const TASK_BUILD_HTML             = 'build_html';
const TASK_BUILD_IMAGE            = 'build_image';
const TASK_BUILD_JAVASCRIPT       = 'build_javascript';
const TASK_BUILD_MIRROR           = 'build_mirror';
const TASK_BUILD_MODULE           = 'build_module';
const TASK_BUILD_STYLESHEET       = 'build_stylesheet';
const TASK_BUILD_VIDEO            = 'build_video';

const LOG_TAG_WATCH_MAIN = LOG_TAG_WATCH + ' [🏛️ Main]';
const LOG_TAG_WATCH_TRIGGER = LOG_TAG_WATCH + ' [🎯 Trigger]';

const WATCH_TRIGGER_EVENTS_DEFAULT = ['add', 'change', 'unlink'];
const WATCH_TRIGGER_EVENTS_SUPPORTED = new Set(['add', 'change', 'unlink', 'adddir', 'unlinkdir']);

// Function to process ignore patterns and debug
function createWatchIgnoreFunction(watchMainPaths, ignorePatterns) {
  // Compile picomatch functions for ignore patterns (ONLY true ignore patterns)
  // NOTE: Patterns beginning with "!" are allow/negation patterns in your config world.
  // They MUST NOT become ignore matchers.
  const ignoreMatchers = ignorePatterns
    .filter(p => !String(p).startsWith('!'))
    .map(p => NODE_PICOMATCH(String(p), { dot: true }));

  // Treat "explicitly watched" as "under one of the watched roots"
  const watchRoots = watchMainPaths.map(p => {
    const s = String(p).replace(/\\/g, '/').replace(/\/+$/, '');
    return s + '/';
  });

  return (path) => {
    const normalizedPath = NODE_CURE_PATH.slashForward(path); // Normalize path for cross-platform consistency

    // Check if the path explicitly matches one of the watch paths
    const isExplicitlyWatched = watchRoots.some(root =>
      normalizedPath === root.slice(0, -1) || normalizedPath.startsWith(root)
    );

    // Check if the path matches any of the ignore patterns
    const isIgnoredByPattern = ignoreMatchers.some(matcher => matcher(normalizedPath));

    // Ignore the path if it doesn't match any watch path or matches an ignore pattern
    const shouldIgnore = isIgnoredByPattern && !isExplicitlyWatched;

    // Debug output (optional)
    // log.detail(`[DEBUG] Path: ${normalizedPath}, Ignored: ${shouldIgnore}`);
    if (shouldIgnore) {
      log.debug(LOG_TAG_WATCH_MAIN, '[SKIP] Ignored path:', {normalizedPath});
    }

    return shouldIgnore;
  };
}

class WatchManager {
  constructor(watchPaths, shutdownCallback, browsersyncHandler) {
    this.watchPaths = libraryVariableEnsureIsArray(watchPaths);
    this.watcher = null;
    this.subWatchers = new Map(); // Map of pathRoot -> SubWatcher instances
    this.shutdownCallback = shutdownCallback;
    this.countSubwatcher = 0;
    this.countSubwatcherReady = 0;
    this.isReady = false;
    this.browsersyncHandler = browsersyncHandler; // Instance of BrowserSyncHandler
    this.pathOut = PATH_DIR_PROJECT_OUT.replace(/\/+$/, '');
    this.activeChain = null;
    this.activeChainTaskCurrent = null;
    this.activeChainTaskDone = new Map();
    this.activeChainStartTime = null;
    this.activeChainSource = null;
    this.pendingChains = [];
    this.stickyRetryChains = []; // Array<{ chain:Function[], sourceTaskname:string, lastOutcome:object, updatedAt:number }>
    this.stickyRetrySourceTaskname = 'watch_retry:sticky';
    this.isChainRunning = false;
    this.watchTriggerConfigHash = null;
    this.watchTriggerWatchers = new Map();

    this.watchMainFunctionMap = [
      { path: PATH_DIR_PROJECT_IN_ASSET_AUDIO,                  taskname: TASK_BUILD_AUDIO,        chain: [primaryAudio],                              cacheNamespace: CACHE_NAMESPACE_AUDIO,       pattern: PATH_FILE_PROJECT_IN_ASSET_AUDIO },
      { path: PATH_DIR_PROJECT_IN_ASSET_BRAND,                  taskname: TASK_BUILD_BRAND,        chain: [primaryBrand],                              cacheNamespace: null,                        pattern: PATH_FILE_PROJECT_IN_ASSET_BRAND },
      { path: PATH_FILE_CONFIG_PROJECT,                         taskname: TASK_BUILD_CONFIG,       chain: CHAIN_GROUP_CONFIG,                          cacheNamespace: CACHE_NAMESPACE_CONFIG,      pattern: PATH_FILE_CONFIG_PROJECT },
      { path: PATH_DIR_PROJECT_IN_DATA,                         taskname: TASK_BUILD_DATA,         chain: [primaryData],                               cacheNamespace: CACHE_NAMESPACE_DATA,        pattern: PATH_FILE_PROJECT_IN_DATA },
      { path: PATH_FILE_PROJECT_IN_FAVICON,                     taskname: TASK_BUILD_FAVICON,      chain: [primaryFavicon],                            cacheNamespace: CACHE_NAMESPACE_FAVICON,     pattern: PATH_FILE_PROJECT_IN_FAVICON },
      { path: PATH_DIR_PROJECT_IN_ASSET_FILE,                   taskname: TASK_BUILD_FILE,         chain: [primaryFile],                               cacheNamespace: CACHE_NAMESPACE_FILE,        pattern: PATH_FILE_PROJECT_IN_ASSET_FILE },
      { path: PATH_DIR_PROJECT_IN_ASSET_FONT,                   taskname: TASK_BUILD_FONT,         chain: [primaryFont],                               cacheNamespace: CACHE_NAMESPACE_FONT,        pattern: PATH_FILE_PROJECT_IN_ASSET_FONT },
      { path: PATH_DIR_PROJECT_IN_ASSET_FONT_ICON,              taskname: TASK_BUILD_FONT_ICON,    chain: [primaryFontIcon],                           cacheNamespace: CACHE_NAMESPACE_FONT_ICON,   pattern: PATH_FILE_PROJECT_IN_ASSET_FONT_ICON_WATCH },
      { path: PATH_FILE_PROJECT_HANDLEBARS,                     taskname: TASK_BUILD_HTML,         chain: CHAIN_GROUP_HTML,                            cacheNamespace: null,                        pattern: PATH_FILE_PROJECT_HANDLEBARS },
      { path: PATH_DIR_PROJECT_IN_HTML,                         taskname: TASK_BUILD_HTML,         chain: CHAIN_GROUP_HTML,                            cacheNamespace: CACHE_NAMESPACE_HTML,        pattern: PATH_FILE_PROJECT_IN_HTML, unlinkCallback: handleSitemap },
      { path: PATH_DIR_PROJECT_IN_HTML_INCLUDE,                 taskname: TASK_BUILD_HTML,         chain: CHAIN_GROUP_HTML,                            cacheNamespace: null,                        pattern: PATH_FILE_PROJECT_IN_HTML_INCLUDE },
      { path: PATH_DIR_PROJECT_IN_ASSET_IMAGE,                  taskname: TASK_BUILD_IMAGE,        chain: [primaryImage],                              cacheNamespace: CACHE_NAMESPACE_IMAGE,       pattern: PATH_FILE_PROJECT_IN_ASSET_IMAGE_WATCH },
      { path: PATH_DIR_PROJECT_IN_ASSET_JAVASCRIPT,             taskname: TASK_BUILD_JAVASCRIPT,   chain: [primaryHighlightSyntax, primaryJavaScript],                         cacheNamespace: CACHE_NAMESPACE_JAVASCRIPT,  pattern: PATH_FILE_PROJECT_IN_ASSET_JAVASCRIPT_WATCH },
      { path: PATH_DIR_PROJECT_IN_ASSET_JAVASCRIPT,             taskname: 'rebuild_javascript',    chain: [primaryResetJavaScript, primaryHighlightSyntax, primaryJavaScript], cacheNamespace: null,                        pattern: PATH_FILE_PROJECT_IN_ASSET_JAVASCRIPT_WATCH_INCLUDE },
      { path: PATH_DIR_PROJECT_IN_ASSET_MODULE,                 taskname: TASK_BUILD_MODULE,       chain: [primaryModule],                             cacheNamespace: CACHE_NAMESPACE_MODULE,      pattern: PATH_FILE_PROJECT_IN_ASSET_MODULE },
      { path: PATH_DIR_PROJECT_IN_ASSET_STYLESHEET,             taskname: TASK_BUILD_STYLESHEET,   chain: [primaryStylesheet],                         cacheNamespace: CACHE_NAMESPACE_STYLESHEET,  pattern: PATH_FILE_PROJECT_IN_ASSET_STYLESHEET_WATCH },
      { path: PATH_DIR_PROJECT_IN_ASSET_STYLESHEET,             taskname: 'rebuild_stylesheet',    chain: [primaryResetStylesheet, primaryStylesheet], cacheNamespace: null,                        pattern: PATH_FILE_PROJECT_IN_ASSET_STYLESHEET_WATCH_INCLUDE },
      { path: PATH_DIR_PROJECT_IN_ASSET_VIDEO,                  taskname: TASK_BUILD_VIDEO,        chain: [primaryVideo],                              cacheNamespace: CACHE_NAMESPACE_VIDEO,       pattern: PATH_FILE_PROJECT_IN_ASSET_VIDEO }
    ];

    log.debug(LOG_TAG_WATCH_MAIN, {watchMainFunctionMap: this.watchMainFunctionMap});
    log.debug(LOG_TAG_WATCH_MAIN, {watchPaths: this.watchPaths});
  }

  _normalizeWatchTriggerPattern(patternRaw) {
    const raw = String(patternRaw || '').trim();
    if (!raw) return null;

    const isNegated = raw.startsWith('!');
    const normalizedRaw = NODE_CURE_PATH.slashForward(isNegated ? raw.slice(1) : raw);
    if (!normalizedRaw) return null;

    const isWindowsAbs = /^[A-Za-z]:\//.test(normalizedRaw);
    const isPosixAbs = normalizedRaw.startsWith('/');
    const abs = (isWindowsAbs || isPosixAbs)
      ? normalizedRaw
      : NODE_CURE_PATH.slashForward(NODE_CURE_PATH.absolute(PATH_DIR_PROJECT, normalizedRaw));

    return isNegated ? `!${abs}` : abs;
  }

  _getWatchTriggerRoots(patterns = []) {
    const roots = new Set();

    patterns.forEach((pattern) => {
      const normalizedPattern = String(pattern || '').trim();
      if (!normalizedPattern) return;

      const isNegated = normalizedPattern.startsWith('!');
      const patternBody = isNegated ? normalizedPattern.slice(1) : normalizedPattern;
      if (!patternBody) return;

      const scan = NODE_PICOMATCH.scan(patternBody);
      const base = NODE_CURE_PATH.slashForward(String(scan?.base || '').trim());
      const watchRoot = base || patternBody;

      roots.add(watchRoot);
    });

    return Array.from(roots);
  }

  _matchesWatchTriggerPath(patterns = [], changedPath = '') {
    const changedPathSafe = NODE_CURE_PATH.slashForward(String(changedPath || ''));
    if (!changedPathSafe) return false;

    let matched = false;

    patterns.forEach((pattern) => {
      const normalizedPattern = String(pattern || '').trim();
      if (!normalizedPattern) return;

      const isNegated = normalizedPattern.startsWith('!');
      const patternBody = isNegated ? normalizedPattern.slice(1) : normalizedPattern;
      if (!patternBody) return;

      if (NODE_PICOMATCH.isMatch(changedPathSafe, patternBody, { dot: true })) {
        matched = !isNegated;
      }
    });

    return matched;
  }

  _resolveWatchTriggerConfigs() {
    const triggerList = Array.isArray(configProjectMerge?.option?.watch?.triggers)
      ? configProjectMerge.option.watch.triggers
      : [];

    /** @type {Array<{id:string, patterns:string[], watchRoots:string[], eventSet:Set<string>, chain:Function[], sourceTaskname:string}>} */
    const resolved = [];

    triggerList.forEach((entry, index) => {
      const sourceTaskname = `watch_trigger:${index}`;

      const patternRawList = libraryVariableEnsureIsArray(entry?.match);
      const patterns = patternRawList
        .map(p => this._normalizeWatchTriggerPattern(p))
        .filter(Boolean);

      if (!patterns.length) {
        log.warn(LOG_TAG_WATCH_TRIGGER, 'Skipping trigger: no valid match patterns.', { index, match: entry?.match });
        return;
      }

      const eventsRaw = libraryVariableEnsureIsArray(entry?.events);
      const eventSet = new Set(
        (eventsRaw.length ? eventsRaw : WATCH_TRIGGER_EVENTS_DEFAULT)
          .map(v => String(v || '').trim().toLowerCase())
          .filter(v => WATCH_TRIGGER_EVENTS_SUPPORTED.has(v))
      );

      if (!eventSet.size) {
        log.warn(LOG_TAG_WATCH_TRIGGER, 'Skipping trigger: no supported events configured.', { index, events: entry?.events });
        return;
      }

      const taskIds = _normalizeTaskIds(entry?.tasks);
      if (!taskIds.length) {
        log.warn(LOG_TAG_WATCH_TRIGGER, 'Skipping trigger: no task ids configured.', { index, tasks: entry?.tasks });
        return;
      }

      /** @type {Function[]} */
      const chain = [];
      for (const taskId of taskIds) {
        const taskChain = _configTaskIdToChain(taskId);
        if (!Array.isArray(taskChain) || !taskChain.length) {
          log.warn(LOG_TAG_WATCH_TRIGGER, 'Skipping unknown task id in trigger.', { index, taskId });
          continue;
        }
        for (const fn of taskChain) {
          if (typeof fn === 'function' && !chain.includes(fn)) {
            chain.push(fn);
          }
        }
      }

      if (!chain.length) {
        log.warn(LOG_TAG_WATCH_TRIGGER, 'Skipping trigger: resolved task chain is empty.', { index, tasks: taskIds });
        return;
      }

      const watchRoots = this._getWatchTriggerRoots(patterns);
      if (!watchRoots.length) {
        log.warn(LOG_TAG_WATCH_TRIGGER, 'Skipping trigger: no watch roots could be derived.', { index, patterns });
        return;
      }

      resolved.push({
        id: `trigger_${index}`,
        patterns,
        watchRoots,
        eventSet,
        chain,
        sourceTaskname
      });
    });

    return resolved;
  }

  _stopWatchTriggerWatchers() {
    for (const [id, watcher] of Array.from(this.watchTriggerWatchers.entries())) {
      try {
        watcher.close();
      } catch (error) {
        log.warn(LOG_TAG_WATCH_TRIGGER, 'Failed closing trigger watcher; continuing.', {
          id,
          error: String(error?.message || error)
        });
      }
    }
    this.watchTriggerWatchers.clear();
  }

  _startWatchTriggerWatchers() {
    this._stopWatchTriggerWatchers();

    const triggerConfigs = this._resolveWatchTriggerConfigs();
    this.watchTriggerConfigHash = hashConfig(triggerConfigs);

    triggerConfigs.forEach((triggerConfig) => {
      const watcher = NODE_CHOKIDAR.watch(triggerConfig.watchRoots, {
        ignoreInitial: true,
        followSymlinks: true,
        persistent: true,
        usePolling: true,
        interval: 1000
      });

      watcher.on('all', (event, changedPath) => {
        const eventSafe = String(event || '').toLowerCase();
        if (!triggerConfig.eventSet.has(eventSafe)) {
          return;
        }

        const changedPathSafe = NODE_CURE_PATH.slashForward(String(changedPath || ''));
        if (!this._matchesWatchTriggerPath(triggerConfig.patterns, changedPathSafe)) {
          return;
        }

        log.detail(LOG_TAG_WATCH_TRIGGER, 'Trigger matched; enqueueing task chain.', {
          id: triggerConfig.id,
          event: eventSafe,
          path: changedPathSafe,
          sourceTaskname: triggerConfig.sourceTaskname
        });

        this.enqueueChain(triggerConfig.chain, Date.now(), triggerConfig.sourceTaskname);
      });

      watcher.on('error', (error) => {
        log.error(LOG_TAG_WATCH_TRIGGER, 'Trigger watcher error.', {
          id: triggerConfig.id,
          error: String(error instanceof Error ? error.message : error)
        });
      });

      this.watchTriggerWatchers.set(triggerConfig.id, watcher);
    });

    log.info(LOG_TAG_WATCH_TRIGGER, 'Trigger watchers initialized.', {
      count: this.watchTriggerWatchers.size
    });
  }

  reloadWatchTriggerWatchersIfConfigChanged() {
    const newConfig = this._resolveWatchTriggerConfigs();
    const newHash = hashConfig(newConfig);
    if (this.watchTriggerConfigHash === newHash) {
      log.info(LOG_TAG_WATCH_TRIGGER, 'No trigger watcher config changes detected.');
      return;
    }

    log.info(LOG_TAG_WATCH_TRIGGER, 'Trigger watcher config changed; reloading.', {
      oldHash: this.watchTriggerConfigHash,
      newHash
    });

    this._startWatchTriggerWatchers();
  }

  _chainsAreEqual(chainA, chainB) {
    if (!Array.isArray(chainA) || !Array.isArray(chainB) || chainA.length !== chainB.length) {
      return false;
    }
    for (let i = 0; i < chainA.length; i++) {
      if (chainA[i] !== chainB[i]) {
        return false;
      }
    }
    return true;
  }

  _chainsHaveSameTaskSet(chainA, chainB) {
    if (!Array.isArray(chainA) || !Array.isArray(chainB) || chainA.length !== chainB.length) {
      return false;
    }

    const setA = new Set(chainA);
    if (setA.size !== chainA.length) {
      return false;
    }

    return chainB.every(taskFn => setA.has(taskFn));
  }

  _isStrictSupersetChain(chainA, chainB) {
    if (!Array.isArray(chainA) || !Array.isArray(chainB) || chainA.length <= chainB.length) {
      return false;
    }

    const setA = new Set(chainA);
    if (setA.size !== chainA.length) {
      return false;
    }

    return chainB.every(taskFn => setA.has(taskFn));
  }

  _hasPendingPermutationMatch(chain) {
    return this.pendingChains.some(item =>
      !item?.isStickyRetry
      && !this._chainsAreEqual(item.chain, chain)
      && this._chainsHaveSameTaskSet(item.chain, chain)
    );
  }

  _hasAnyIncomingTaskCompletedOrInProgress(incomingChain) {
    if (!Array.isArray(this.activeChain) || !this.activeChain.length) {
      return false;
    }

    const activeTaskSet = new Set(this.activeChain);
    return incomingChain.some(taskFn => {
      if (!activeTaskSet.has(taskFn)) {
        return false;
      }
      if (this.activeChainTaskCurrent === taskFn) {
        return true;
      }
      const doneAt = this.activeChainTaskDone.get(taskFn);
      return typeof doneAt === 'number';
    });
  }

  _queueChainRequest(chain, eventTime, sourceTaskname) {
    const incomingTime = Number(eventTime || Date.now());
    const existing = this.pendingChains.find(item =>
      !item?.isStickyRetry
      && this._chainsAreEqual(item.chain, chain)
    );
    if (existing) {
      if (incomingTime > existing.eventTime) {
        existing.eventTime = incomingTime;
        existing.sourceTaskname = sourceTaskname;
      }
      return false;
    }

    this.pendingChains.push({
      chain,
      eventTime: incomingTime,
      sourceTaskname
    });
    return true;
  }

  _getLogStatusCounterSnapshot() {
    /** @type {{ _statusCounters?: { warn?: number, error?: number, fatal?: number } }} */
    const logWithCounters = (log && typeof log === 'object') ? log : {};
    const counters = (logWithCounters._statusCounters && typeof logWithCounters._statusCounters === 'object')
      ? logWithCounters._statusCounters
      : {};
    return {
      warn: Number(counters.warn || 0),
      error: Number(counters.error || 0),
      fatal: Number(counters.fatal || 0)
    };
  }

  _diffLogStatusCounterSnapshot(before, after) {
    const safeBefore = before || {};
    const safeAfter = after || {};
    return {
      warn: Math.max(0, Number(safeAfter.warn || 0) - Number(safeBefore.warn || 0)),
      error: Math.max(0, Number(safeAfter.error || 0) - Number(safeBefore.error || 0)),
      fatal: Math.max(0, Number(safeAfter.fatal || 0) - Number(safeBefore.fatal || 0))
    };
  }

  _getStickyRetryChainRequests() {
    return this.stickyRetryChains
      .map(item => {
        const chain = Array.isArray(item?.chain)
          ? item.chain.filter(taskFn => typeof taskFn === 'function')
          : [];
        if (!chain.length) return null;
        return {
          chain,
          eventTime: Date.now(),
          sourceTaskname: this.stickyRetrySourceTaskname,
          isStickyRetry: true
        };
      })
      .filter(Boolean);
  }

  _getPendingStickyRetryIndices() {
    /** @type {number[]} */
    const indices = [];
    for (let i = 0; i < this.pendingChains.length; i++) {
      if (this.pendingChains[i]?.isStickyRetry) {
        indices.push(i);
      }
    }
    return indices;
  }

  _dropPendingStickyRetryQueueMatches(chain) {
    const chainSafe = Array.isArray(chain) ? chain.filter(taskFn => typeof taskFn === 'function') : [];
    if (!chainSafe.length) return 0;

    let removed = 0;
    for (let i = this.pendingChains.length - 1; i >= 0; i--) {
      const item = this.pendingChains[i];
      if (!item?.isStickyRetry) continue;
      if (!this._chainsAreEqual(item.chain, chainSafe)) continue;
      this.pendingChains.splice(i, 1);
      removed++;
    }
    return removed;
  }

  _dropStickyRetryChainStateMatch(chain) {
    const chainSafe = Array.isArray(chain) ? chain.filter(taskFn => typeof taskFn === 'function') : [];
    if (!chainSafe.length) return false;

    const idx = this.stickyRetryChains.findIndex(item => this._chainsAreEqual(item?.chain, chainSafe));
    if (idx < 0) return false;
    this.stickyRetryChains.splice(idx, 1);
    return true;
  }

  _ensureStickyRetryTail(reason = 'unknown') {
    const stickyRequests = this._getStickyRetryChainRequests();
    const stickyIndices = this._getPendingStickyRetryIndices();

    if (!stickyRequests.length) {
      if (stickyIndices.length) {
        for (let i = stickyIndices.length - 1; i >= 0; i--) {
          this.pendingChains.splice(stickyIndices[i], 1);
        }
        log.debug(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Removed sticky retry tail (no sticky chains remain).', {
          reason,
          pending: this.pendingChains.length
        });
      }
      return;
    }

    const hasNonStickyPending = this.pendingChains.some(item => !item?.isStickyRetry);
    if (!hasNonStickyPending && !stickyIndices.length) {
      // Do not create sticky queue entries until a non-sticky chain arrives.
      return;
    }

    for (let i = stickyIndices.length - 1; i >= 0; i--) {
      this.pendingChains.splice(stickyIndices[i], 1);
    }

    for (const stickyRequest of stickyRequests) {
      this.pendingChains.push(stickyRequest);
    }

    log.debug(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Sticky retry tail positioned.', {
      reason,
      pending: this.pendingChains.length,
      stickyChains: stickyRequests.map(req => req.chain.map(fn => fn.name || '<anonymous>'))
    });
  }

  _upsertStickyRetryChain(chain, sourceTaskname, chainOutcome) {
    const chainSafe = Array.isArray(chain) ? chain.filter(taskFn => typeof taskFn === 'function') : [];
    if (!chainSafe.length) return;

    const now = Date.now();
    const existingIndex = this.stickyRetryChains.findIndex(item => this._chainsAreEqual(item?.chain, chainSafe));
    const entry = {
      chain: chainSafe.slice(),
      sourceTaskname: String(sourceTaskname || 'unknown'),
      lastOutcome: chainOutcome || {},
      updatedAt: now
    };

    if (existingIndex >= 0) {
      this.stickyRetryChains[existingIndex] = entry;
    } else {
      this.stickyRetryChains.push(entry);
    }

    log.warn(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Chain marked for sticky retry.', {
      sourceTaskname,
      stickyCount: this.stickyRetryChains.length,
      tasks: chainSafe.map(fn => fn.name || '<anonymous>'),
      outcome: entry.lastOutcome
    });
  }

  _clearStickyRetryChain(chain, sourceTaskname) {
    const chainSafe = Array.isArray(chain) ? chain.filter(taskFn => typeof taskFn === 'function') : [];
    if (!chainSafe.length) return;

    const existingIndex = this.stickyRetryChains.findIndex(item => this._chainsAreEqual(item?.chain, chainSafe));
    if (existingIndex < 0) return;

    const removed = this.stickyRetryChains.splice(existingIndex, 1)[0];
    log.success(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Sticky retry chain cleared.', {
      sourceTaskname,
      stickyCount: this.stickyRetryChains.length,
      tasks: (removed?.chain || chainSafe).map(fn => fn.name || '<anonymous>')
    });
  }

  enqueueChain(chain, eventTime = Date.now(), sourceTaskname = 'unknown') {
    const chainRaw = Array.isArray(chain) ? chain : [];
    const invalidTaskEntries = chainRaw.filter(taskFn => typeof taskFn !== 'function');
    if (invalidTaskEntries.length) {
      log.warn(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Incoming chain has invalid tasks; they were removed.', {
        sourceTaskname,
        invalidCount: invalidTaskEntries.length
      });
    }
    const chainSafe = chainRaw.filter(taskFn => typeof taskFn === 'function');
    const isStickyRetryRequest = sourceTaskname === this.stickyRetrySourceTaskname;

    if (!chainSafe.length) {
      log.debug(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Dropped empty chain request.', { sourceTaskname });
      return;
    }

    if (!isStickyRetryRequest) {
      const droppedStickyQueueMatches = this._dropPendingStickyRetryQueueMatches(chainSafe);
      const droppedStickyStateMatch = this._dropStickyRetryChainStateMatch(chainSafe);
      if (droppedStickyQueueMatches > 0 || droppedStickyStateMatch) {
        log.info(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Incoming chain consumed matching sticky retry chain.', {
          sourceTaskname,
          droppedStickyQueueMatches,
          droppedStickyStateMatch,
          stickyCount: this.stickyRetryChains.length,
          pending: this.pendingChains.length
        });
      }
    }

    if (this.activeChain) {
      const requiresProgressGate = this._isStrictSupersetChain(chainSafe, this.activeChain)
        || this._hasPendingPermutationMatch(chainSafe);

      if (requiresProgressGate && !this._hasAnyIncomingTaskCompletedOrInProgress(chainSafe)) {
        log.debug(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Dropped incoming chain request.', {
          sourceTaskname,
          reason: 'awaiting-active-progress',
          activeSource: this.activeChainSource,
          chainLength: chainSafe.length
        });
        return;
      }

      const queued = this._queueChainRequest(chainSafe, eventTime, sourceTaskname);
      if (queued) {
        log.info(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Queued chain request while active.', {
          sourceTaskname,
          reason: requiresProgressGate ? 'active-progress-confirmed' : 'not-already-queued',
          pending: this.pendingChains.length
        });
        if (!isStickyRetryRequest) {
          this._ensureStickyRetryTail('enqueue-while-active');
        }
      } else {
        log.debug(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Dropped incoming chain request.', {
          sourceTaskname,
          reason: 'already-queued',
          pending: this.pendingChains.length
        });
        if (!isStickyRetryRequest) {
          this._ensureStickyRetryTail('dedupe-while-active');
        }
      }
      return;
    }

    const queued = this._queueChainRequest(chainSafe, eventTime, sourceTaskname);
    if (queued) {
      log.info(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Queued chain request.', {
        sourceTaskname,
        pending: this.pendingChains.length
      });
      if (!isStickyRetryRequest) {
        this._ensureStickyRetryTail('enqueue-idle');
      }
    } else {
      log.debug(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Dropped incoming chain request.', {
        sourceTaskname,
        reason: 'already-queued',
        pending: this.pendingChains.length
      });
      if (!isStickyRetryRequest) {
        this._ensureStickyRetryTail('dedupe-idle');
      }
    }
    this._drainChainQueue();
  }

  async _runTaskFunction(taskFn) {
    await new Promise((resolve, reject) => {
      try {
        NODE_GULP.series(taskFn)((err) => {
          if (err) {
            reject(err);
            return;
          }
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async _runChain(request) {
    const { chain, sourceTaskname } = request;
    this.activeChain = chain;
    this.activeChainSource = sourceTaskname;
    this.activeChainStartTime = Date.now();
    this.activeChainTaskDone = new Map();
    for (const taskFn of chain) {
      this.activeChainTaskDone.set(taskFn, null);
    }
    this.activeChainTaskCurrent = null;

    log.info(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Running chain.', {
      sourceTaskname,
      startedAt: this.activeChainStartTime,
      tasks: chain.map(fn => fn.name || '<anonymous>')
    });

    let chainHasRetryWorthyError = false;
    /** @type {Array<{task:string, threw:boolean, counts:{warn:number,error:number,fatal:number}}>} */
    const chainTaskOutcomes = [];

    for (const taskFn of chain) {
      this.activeChainTaskCurrent = taskFn;
      const taskName = taskFn.name || '<anonymous>';
      const taskStartedAt = Date.now();
      const statusBeforeTask = this._getLogStatusCounterSnapshot();
      let taskRunError = null;
      log.info(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Processing task.', {
        sourceTaskname,
        task: taskName
      });
      try {
        await this._runTaskFunction(taskFn);
      } catch (error) {
        taskRunError = error;
      }
      const taskStatusDelta = this._diffLogStatusCounterSnapshot(statusBeforeTask, this._getLogStatusCounterSnapshot());
      const taskOutcome = {
        task: taskName,
        threw: !!taskRunError,
        counts: taskStatusDelta
      };
      chainTaskOutcomes.push(taskOutcome);
      if (taskOutcome.threw || Number(taskStatusDelta.error || 0) > 0 || Number(taskStatusDelta.fatal || 0) > 0) {
        chainHasRetryWorthyError = true;
      }
      if (taskRunError) {
        if (taskRunError?.noWatchRetry) {
          this._clearStickyRetryChain(chain, sourceTaskname);
          log.warn(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Chain failed without sticky retry.', {
            sourceTaskname,
            failedTask: taskName,
            reason: String(taskRunError?.message || taskRunError)
          });
        } else {
          this._upsertStickyRetryChain(chain, sourceTaskname, {
            threw: true,
            failedTask: taskName,
            tasks: chainTaskOutcomes.slice()
          });
        }
        throw taskRunError;
      }
      const taskFinishedAt = Date.now();
      this.activeChainTaskDone.set(taskFn, taskFinishedAt);
      log.success(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Processed task.', {
        sourceTaskname,
        task: taskName,
        Time: formatDurationMsHuman(taskFinishedAt - taskStartedAt)
      });
    }

    if (chainHasRetryWorthyError) {
      this._upsertStickyRetryChain(chain, sourceTaskname, {
        threw: false,
        tasks: chainTaskOutcomes.slice()
      });
    } else {
      this._clearStickyRetryChain(chain, sourceTaskname);
    }

    // Persist config cache after each chain so downstream runs see the latest state.
    const cacheStoreStartedAt = Date.now();
    log.info(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Processing task.', {
      sourceTaskname,
      task: 'handleProjectConfigCacheStore'
    });
    await this._runTaskFunction(handleProjectConfigCacheStore);
    log.success(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Processed task.', {
      sourceTaskname,
      task: 'handleProjectConfigCacheStore',
      Time: formatDurationMsHuman(Date.now() - cacheStoreStartedAt)
    });
  }

  async _drainChainQueue() {
    if (this.isChainRunning) {
      return;
    }

    this.isChainRunning = true;
    let ranAnyChain = false;
    let attemptedAnyChain = false;
    const queueDrainSummary = {
      chainsAttempted: [],
      chainsSuccessful: [],
      chainsFailed: [],
      totals: {
        attemptedChains: 0,
        attemptedTasks: 0,
        successfulChains: 0,
        successfulTasks: 0,
        failedChains: 0,
        failedTasks: 0
      }
    };

    try {
      while (this.pendingChains.length > 0) {
        const request = this.pendingChains.shift();
        attemptedAnyChain = true;
        const taskNames = Array.isArray(request?.chain)
          ? request.chain.map(fn => (typeof fn === 'function' ? (fn.name || '<anonymous>') : String(fn)))
          : [];
        const chainSummaryEntry = {
          sourceTaskname: request?.sourceTaskname || 'unknown',
          eventTime: Number(request?.eventTime || Date.now()),
          tasks: taskNames
        };
        queueDrainSummary.chainsAttempted.push(chainSummaryEntry);
        queueDrainSummary.totals.attemptedChains += 1;
        queueDrainSummary.totals.attemptedTasks += taskNames.length;
        try {
          await this._runChain(request);
          ranAnyChain = true;
          queueDrainSummary.chainsSuccessful.push(chainSummaryEntry);
          queueDrainSummary.totals.successfulChains += 1;
          queueDrainSummary.totals.successfulTasks += taskNames.length;
        } catch (error) {
          queueDrainSummary.chainsFailed.push({
            ...chainSummaryEntry,
            error: String(error?.message || error)
          });
          queueDrainSummary.totals.failedChains += 1;
          queueDrainSummary.totals.failedTasks += taskNames.length;
          log.error(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Chain run failed.', {
            sourceTaskname: request?.sourceTaskname,
            error: String(error?.message || error)
          });
        } finally {
          // Sticky retry chains should only be (re)armed by incoming non-sticky work,
          // not by sticky retries finishing and re-queuing themselves.
          if (!request?.isStickyRetry) {
            this._ensureStickyRetryTail('post-chain-finally');
          }
          this.activeChain = null;
          this.activeChainSource = null;
          this.activeChainStartTime = null;
          this.activeChainTaskCurrent = null;
          this.activeChainTaskDone = new Map();
        }
      }

      if (attemptedAnyChain) {
        const queueDrainSummaryForLog = {
          ...queueDrainSummary,
          chainsAttempted: queueDrainSummary.chainsAttempted.map(entry => ({
            ...entry,
            eventTime: formatDateTimeByLogConfig(new Date(entry.eventTime))
          })),
          chainsSuccessful: queueDrainSummary.chainsSuccessful.map(entry => ({
            ...entry,
            eventTime: formatDateTimeByLogConfig(new Date(entry.eventTime))
          })),
          chainsFailed: queueDrainSummary.chainsFailed.map(entry => ({
            ...entry,
            eventTime: formatDateTimeByLogConfig(new Date(entry.eventTime))
          }))
        };
        log.info(LOG_TAG_WATCH_MAIN, '[SCHEDULER] Queue drain summary:', queueDrainSummaryForLog);

        // Emit one regular Browsersync reload after the full queued chain batch completes,
        // even if the attempted chain batch ended in failure.
        if (browsersyncHandler?.browsersyncInstance?.active) {
          browsersyncHandler.reload();
        } else {
          log.error(LOG_TAG_BROWSER, 'Instance is not available for reload.');
        }
      }
    } finally {
      this.isChainRunning = false;
    }
  }

  initMainWatcher() {
    this.watcher = NODE_CHOKIDAR.watch(
      this.watchPaths,
      // this.watchPaths.map(p => NODE_CURE_PATH.absolute(p)),
      {
        // cwd: __dirname,
        depth: 0, // Non-recursive watcher for main paths
        followSymlinks: true,
        ignored: createWatchIgnoreFunction(this.watchPaths, createPathArray('')),
        persistent: true,
      }
    );

    this.watcher
      .on('all', (event, path) => log.debug(LOG_TAG_WATCH_MAIN, {event, path}))

      .on('add', (path) => {
        path = NODE_CURE_PATH.slashForward(path);

        if (this.isReady) {
          log.detail(LOG_TAG_WATCH_MAIN, '📄 [ADD] File:', {path});
        }

        this.setupSubWatcher(path);
      })
      .on('addDir', (path) => {
        path = NODE_CURE_PATH.slashForward(path);

        if (this.isReady) {
          log.detail(LOG_TAG_WATCH_MAIN, '📂 [ADD] Directory:', {path});
        }

        this.setupSubWatcher(path);
      })
      .on('unlinkDir', (path) => {
        path = NODE_CURE_PATH.slashForward(path);

        if (this.isReady) {
          log.detail(LOG_TAG_WATCH_MAIN, '📂 [REMOVE] Directory:', {path});
        }

        this.removeSubWatcher(path);

        if (path.startsWith(this.pathOut)) {
          return;
        }

        const matches = this.getMatchingEntries(path + '/'); // keep trailing slash compat

        if (!matches.length) {
          log.error(LOG_TAG_WATCH_MAIN, 'Error: Identity not found for path:', path);
          return;
        }

        // For each matching entry, stop matching subwatchers.
        // Cache cleanup is intentionally deferred to each build task's prune pass.
        matches.forEach(({ taskname, cacheNamespace, path: matchedKey }) => {
          // remove any subwatchers tied to this matchedKey + taskname
          const identity = `${matchedKey}:${taskname}`;
          const sw = this.subWatchers.get(identity);
          if (sw) {
            sw.stop();
            this.subWatchers.delete(identity);
          }

          log.debug(LOG_TAG_WATCH_MAIN, 'Stopped subwatcher identity after directory removal:', { matchedKey, taskname, cacheNamespace });
        });

      })
      .on('error', (/** @type {NodeJS.ErrnoException | Error} */ error) => {
        if (/** @type {any} */ (error).code === 'EPERM') {
          log.notice(LOG_TAG_WATCH_MAIN, '📂 Directory EPERM Error:', error, '\n  > This usually occurs when attempting to watch a deleted or inaccessible path, check if following log reports a deleted or inaccessible path.');
        } else {
          log.error(LOG_TAG_WATCH_MAIN, 'Unexpected:', error);
        }
      })
      .on('ready', () => {
        this.checkIsReady();
      });

      log.init(LOG_TAG_WATCH_MAIN, '▶️ Initializing...');
  }

  getMatchingEntries(path) {
    const normalizedRoot = NODE_CURE_PATH.slashForward(path).replace(/\/+$/, '');
    return this.watchMainFunctionMap.filter(entry => {
      const normalizedPath = NODE_CURE_PATH.slashForward(entry.path).replace(/\/+$/, '');
      // PRODUCTION: Comment out begin
      // log.debug(LOG_TAG_WATCH_MAIN, 'Exact match check', {
      //   normalizedRoot,
      //   normalizedPath,
      //   taskname: entry.taskname
      // });
      // PRODUCTION: Comment out end
      return normalizedRoot === normalizedPath; // exact match
    });
  }

  setupSubWatcher(pathRoot) {
    const matches = this.getMatchingEntries(pathRoot);

    if (!matches.length) {
      log.debug(LOG_TAG_WATCH_MAIN, 'Pre-Initialization: [SKIP] No matching pattern for path:', { pathRoot });
      return;
    }

    matches.forEach(config => {
      const matchedKey = config.path;
      const watcherConfigs = libraryVariableEnsureIsArray(config);
      const tasknames = watcherConfigs.map(c => c.taskname);

      // helpful log showing tasknames you asked for "from the entry itself";
      log.debug(LOG_TAG_WATCH_MAIN, 'Pre-Initialization: [SUCCESS] Match found:', { pathRoot, matchedKey, tasknames });

      watcherConfigs.forEach(({ taskname, chain, cacheNamespace, pattern, unlinkCallback }) => {
        // include matchedKey to avoid collisions if two keys share same pathRoot + taskname
        const identity = `${matchedKey}:${taskname}`;
        if (this.subWatchers.has(identity)) {
          log.debug(LOG_TAG_WATCH_MAIN, 'Pre-Initialization:', taskname, '[SKIP] Already watching:', { matchedKey });
          return;
        }

        this.countSubwatcher++;

        const subWatcher = new SubWatcher(
          pathRoot,
          taskname,
          chain,
          cacheNamespace,
          pattern,
          () => {
            logPauseBeforeWait(LOG_TAG_WATCH_MAIN, 'subwatcher ready settle', 1000, {
              taskname,
              pathRoot
            });
            NODE_TIMERS.setTimeout(() => {
              this.countSubwatcherReady++;
              this.checkIsReady();
            }, 1000);
          },
          this.isReady,
          pathRoot !== this.pathOut,
          (chainArg, eventTime, sourceTaskname) => this.enqueueChain(chainArg, eventTime, sourceTaskname),
          unlinkCallback
        );

        subWatcher.start();
        this.subWatchers.set(identity, subWatcher);
      });
    });
  }

  checkIsReady() {
    if (this.isReady || this.countSubwatcherReady != this.countSubwatcher) {
      return;
    }

    // startMirrorWatch();
    primaryMirrorWatchStart();
    this._startWatchTriggerWatchers();

    this.isReady = true;

    log.init([
      '[[NEWLINES]]',
      ['[[NORMAL]]', LOG_TAG_WATCH_MAIN, 'Ready:'],
      ['[[LIST]]', 'All paths initialized:', { subWatcherIdentities: Array.from(this.subWatchers.keys()) }]
    ]);

    // Start Browser after all paths are initialized
    if (this.browsersyncHandler) {
      this.browsersyncHandler.start();
    }
  }

  removeSubWatcher(path) {
    const keysToRemove = Array.from(this.subWatchers.keys()).filter(key => key.startsWith(`${path}:`));
    keysToRemove.forEach(key => {
      const subWatcher = this.subWatchers.get(key);
      if (subWatcher) {
        subWatcher.stop();
        this.subWatchers.delete(key);
      }
    });
  }

  async shutdown() {
    // Stop Browser during shutdown
    if (this.browsersyncHandler) {
      this.browsersyncHandler.stop();
    }

    log.detail(LOG_TAG_WATCH_MAIN, { subWatcherIdentities: Array.from(this.subWatchers.keys()) });

    primaryMirrorWatchStop();
    this._stopWatchTriggerWatchers();

    this.subWatchers.forEach((subWatcher) => subWatcher.stop());
    if (this.watcher) this.watcher.close();

    log.shutdown([
      '[[NEWLINES]]',
      LOG_TAG_WATCH_MAIN,
      [
        '[[LIST]]',
        'MAIN and all sub-watchers shut down.',
        'Press `Ctrl+C` to exit process...'
      ]
    ]);

    this.shutdownCallback();
  }
}

var watchManager = null;

// Attach cleanup function to process exit signals
const cleanup = () => {
  if(watchManager) {
    watchManager.shutdown();
  }
  process.exit(0);
};

process.on('SIGINT', cleanup); // Handle Ctrl+C
process.on('SIGTERM', cleanup); // Handle termination signals
process.on('exit', cleanup); // Handle normal process exit

function primaryWatch(done) {
  const op = logProcessingStart(LOG_TAG_WATCH, 'watch startup');
  return new Promise((resolve) => {
    browsersyncHandler = new BrowserSyncHandler();
    watchManager = new WatchManager(watchMainPaths, () => {
      logProcessingDone(LOG_TAG_WATCH, op, {
        watch_paths: watchMainPaths.length
      });
      done();
      resolve();
    },
    browsersyncHandler);
    watchManager.initMainWatcher();
  });
}

function primaryBrowser() {
  const op = logProcessingStart(LOG_TAG_BROWSER, 'browser-only startup');
  browsersyncHandler = new BrowserSyncHandler();
  browsersyncHandler.start();
  logProcessingDone(LOG_TAG_BROWSER, op);

  // Keep task alive like `watch` so Browsersync remains running until process exit.
  return new Promise(() => {});
}

function groupWatch(done) {
  // isWatching = true;

  NODE_GULP.series(
    groupAll,
    handleProjectConfigCacheStore,
    primaryWatch
  )(done);
}

// -----------------------------------------------------------------------------
// #### Main - Task Helper - Reset
// -----------------------------------------------------------------------------

function removeEmptyParentDirs(startPath, stopAtPath = PATH_DIR_PROJECT) {
  const LOG_TAG_REMOVE_EMPTY = '[📂 Empty Dir Cleanup]';

  log.begin(LOG_TAG_REMOVE_EMPTY, 'Running...');

  log.detail(LOG_TAG_REMOVE_EMPTY, 'Arguments:', { startPath, stopAtPath });

  function normalizePathForComparison(p) {
    return NODE_PATH.normalize(p).replace(/[\\/]+$/, ''); // remove trailing slashes
  }

  let dir = normalizePathForComparison(NODE_PATH.dirname(startPath));
  stopAtPath = normalizePathForComparison(stopAtPath);

  while (dir.startsWith(stopAtPath) && dir.length > stopAtPath.length) {
    try {
      const contents = NODE_FS.readdirSync(dir);
      if (contents.length === 0) {
        NODE_FS.rmdirSync(dir);
        log.success(LOG_TAG_REMOVE_EMPTY, 'Removed empty directory:', dir);
        dir = NODE_PATH.dirname(dir); // climb upward
      } else {
        log.debug(LOG_TAG_REMOVE_EMPTY, 'Directory not empty, stopping:', { dir, contents });
        break;
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        log.debug(LOG_TAG_REMOVE_EMPTY, 'Directory does not exist, skipping:', dir);
        dir = NODE_PATH.dirname(dir); // still climb upward
      } else {
        log.warn(LOG_TAG_REMOVE_EMPTY, 'Error checking directory:', { dir, error: err });
        break;
      }
    }
  }

  log.end(LOG_TAG_REMOVE_EMPTY, 'Complete.');
}

async function handleRemovePaths(pattern) {
  const LOG_TAG_REMOVE_PATTERNS = '[🗑️ Remove Patterns]';

  log.begin(LOG_TAG_REMOVE_PATTERNS, 'Initializing:', {pattern});
  const op = logProcessingStart(LOG_TAG_REMOVE_PATTERNS, 'remove paths', { pattern });

  try {
    const deletedPaths = await NODE_CURE_FS.deleteAsync(pattern, { force: true });

    if (deletedPaths.length === 0) {
      log.notice(LOG_TAG_REMOVE_PATTERNS, 'No matching files or directories found for deletion.');
    } else {
      log.success(LOG_TAG_REMOVE_PATTERNS, 'Deleted files and directories:', deletedPaths);

      for (const deletedPath of deletedPaths) {
        // Only do cleanup for files
        if (NODE_PATH.extname(deletedPath)) {
          removeEmptyParentDirs(deletedPath);
        }
      }
    }
    logProcessingDone(LOG_TAG_REMOVE_PATTERNS, op, {
      deleted_count: deletedPaths.length
    });
  } catch (error) {
    logProcessingFail(LOG_TAG_REMOVE_PATTERNS, op, error, { pattern });
    log.error(LOG_TAG_REMOVE_PATTERNS, error);
  }

  log.end(LOG_TAG_REMOVE_PATTERNS, 'Complete.');
}

async function handleReset(namespace = null, pattern = null, cache = null) {
  const LOG_TAG_RESET = '[🔄 Reset]';

  log.begin(LOG_TAG_RESET, 'Running:', {namespace, pattern});
  const op = logProcessingStart(LOG_TAG_RESET, 'reset', { namespace, pattern });
  // return;

  if (namespace) {
    const clearOp = logProcessingStart(LOG_TAG_RESET, 'reset cache namespace', { namespace });
    if (namespace === "all") {
      cacheProjectFile.clear(namespace);
      cacheProjectImage.clear();
      cacheRoot.clear(namespace);
    } else {
      (cache || cacheProjectFile).clear(namespace);
    }
    logProcessingDone(LOG_TAG_RESET, clearOp, { namespace });
  }

  if (pattern) {
    await handleRemovePaths(pattern);
  }

  logProcessingDone(LOG_TAG_RESET, op, { namespace, pattern });
  log.end(LOG_TAG_RESET, 'Complete.');
}

function runPrimaryReset(done, operation, namespace, pattern, cache = null, afterReset = null) {
  const LOG_TAG_RESET_TASK = '[🔄 Reset Task]';
  const op = logProcessingStart(LOG_TAG_RESET_TASK, operation, { namespace, pattern });
  handleReset(namespace, pattern, cache)
    .then(async () => {
      if (typeof afterReset === 'function') {
        await afterReset();
      }
      logProcessingDone(LOG_TAG_RESET_TASK, op, { namespace, pattern });
      done();
    })
    .catch((err) => {
      logProcessingFail(LOG_TAG_RESET_TASK, op, err, { namespace, pattern });
      done(err);
    });
}

function primaryReset(done)                 { runPrimaryReset(done, 'reset all',                 "all",                            PATH_DIR_PROJECT_OUT); };
function primaryResetAudio(done)           { runPrimaryReset(done, 'reset audio',               CACHE_NAMESPACE_AUDIO,            PATH_DIR_PROJECT_OUT_ASSET_AUDIO); };
function primaryResetBrand(done)           { runPrimaryReset(done, 'reset brand',               CACHE_NAMESPACE_BRAND,            PATTERN_RESET_BRAND); };
function primaryResetConfig(done)          { runPrimaryReset(done, 'reset config',              CACHE_NAMESPACE_CONFIG,           null); };
function primaryResetData(done)            { runPrimaryReset(done, 'reset data',                CACHE_NAMESPACE_DATA,             PATTERN_RESET_DATA); };
function primaryResetFavicon(done)         { runPrimaryReset(done, 'reset favicon',             CACHE_NAMESPACE_FAVICON,          PATTERN_RESET_FAVICON); };
function primaryResetFile(done)            { runPrimaryReset(done, 'reset file',                CACHE_NAMESPACE_FILE,             PATH_DIR_PROJECT_OUT_ASSET_FILE); };
function primaryResetFont(done)            { runPrimaryReset(done, 'reset font',                CACHE_NAMESPACE_FONT,             PATH_DIR_PROJECT_OUT_ASSET_FONT); };
function primaryResetFontIcon(done)        { runPrimaryReset(done, 'reset font icon',           CACHE_NAMESPACE_FONT_ICON,        PATTERN_RESET_FONT_ICON); };
function primaryResetHighlightSyntax(done) { runPrimaryReset(done, 'reset highlight syntax',    CACHE_NAMESPACE_HIGHLIGHT_SYNTAX, primaryHighlightSyntaxResetPaths(), cacheRoot); };
function primaryResetHTML(done)            { runPrimaryReset(done, 'reset html',                CACHE_NAMESPACE_HTML,             PATTERN_RESET_HTML); };
function primaryResetImage(done)           { runPrimaryReset(done, 'reset image',               CACHE_NAMESPACE_IMAGE,            PATH_DIR_PROJECT_OUT_ASSET_IMAGE, null, async () => { cacheProjectImage.clear(); }); };
function primaryResetJavaScript(done)      { runPrimaryReset(done, 'reset javascript',          CACHE_NAMESPACE_JAVASCRIPT,       PATH_DIR_PROJECT_OUT_ASSET_JAVASCRIPT); };
function primaryResetMirror(done)          { const op = logProcessingStart('[🔄 Reset Task]', 'reset mirror'); handleResetMirror((err) => { if (err) { logProcessingFail('[🔄 Reset Task]', op, err); done(err); return; } logProcessingDone('[🔄 Reset Task]', op); done(); }); };
function primaryResetModule(done)          { runPrimaryReset(done, 'reset module',              CACHE_NAMESPACE_MODULE,           PATH_DIR_PROJECT_OUT_ASSET_MODULE); };
function primaryResetStylesheet(done)      { runPrimaryReset(done, 'reset stylesheet',          CACHE_NAMESPACE_STYLESHEET,       PATTERN_RESET_STYLESHEET); };
function primaryResetVideo(done)           { runPrimaryReset(done, 'reset video',               CACHE_NAMESPACE_VIDEO,            PATH_DIR_PROJECT_OUT_ASSET_VIDEO); };

// -----------------------------------------------------------------------------
// ### Main - Task
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// #### Main - Task - General - User-facing entry points for common compiler runs.
// -----------------------------------------------------------------------------

createTask('default',     {                 tasks: [ groupAll ] });          // Run all `Build` tasks.
createTask('watch',       {                 tasks: [ groupWatch ] });        // Run full build once, then watch source paths and live-reload Browsersync on changes.
createTask('browser',     { project: false, tasks: [ primaryBrowser ] });    // Starts Browsersync only, without build or watch steps.
createTask('package',     { project: false, tasks: [ primaryPackage ] });    // Zip compiled output in the target directory.
createTask('sort_config', { project: false, tasks: [ primaryConfigSort ] }); // Normalize/sort the project `config.json` file.
createTask('about',       { project: false, tasks: [ groupAbout ] });        // Show compiler and selected project metadata.

// -----------------------------------------------------------------------------
// #### Main - Task - Build - Individual task that builds one asset group.
// -----------------------------------------------------------------------------

createTask(TASK_BUILD,                  { tasks: [ groupAll ] }); // Bulk task that runs every `Build` task.
createTask(TASK_BUILD_AUDIO,            { tasks: [ primaryAudio ] }); // Build audio assets.
createTask(TASK_BUILD_BRAND,            { tasks: [ primaryBrand ] }); // Build brand assets.
createTask(TASK_BUILD_CONFIG,           { tasks: [ groupConfig ] }); // Build and cache project config.
createTask(TASK_BUILD_DATA,             { tasks: [ primaryData ] }); // Build data files.
createTask(TASK_BUILD_FAVICON,          { tasks: [ primaryFavicon ] }); // Build favicon assets.
createTask(TASK_BUILD_FILE,             { tasks: [ primaryFile ] }); // Copy generic file assets.
createTask(TASK_BUILD_FONT,             { tasks: [ primaryFont ] }); // Build font assets.
createTask(TASK_BUILD_FONT_ICON,        { tasks: [ primaryFontIcon ] }); // Build icon-font assets.
createTask(TASK_BUILD_HIGHLIGHT_SYNTAX, { tasks: [ primaryHighlightSyntax ] }); // Build syntax-highlight assets.
createTask(TASK_BUILD_HTML,             { tasks: [ primaryHTML ] }); // Build HTML pages.
createTask(TASK_BUILD_IMAGE,            { tasks: [ primaryImage ] }); // Build image assets.
createTask(TASK_BUILD_JAVASCRIPT,       { tasks: [ primaryHighlightSyntax, primaryJavaScript ] }); // Build JavaScript assets after generated Prism sources are current.
createTask(TASK_BUILD_MIRROR,           { tasks: [ primaryMirror ] }); // Mirror passthrough files.
createTask(TASK_BUILD_MODULE,           { tasks: [ primaryModule ] }); // Build module assets.
createTask(TASK_BUILD_STYLESHEET,       { tasks: [ primaryStylesheet ] }); // Build stylesheet assets.
createTask(TASK_BUILD_VIDEO,            { tasks: [ primaryVideo ] }); // Build video assets.

// -----------------------------------------------------------------------------
// #### Main - Task - Rebuild - Reset cache and build for a specific asset group.
// -----------------------------------------------------------------------------

createTask('rebuild',                  { tasks: [ primaryReset,                groupAll ] }); // Reset all cache and runs every `Build` task.
createTask('rebuild_audio',            { tasks: [ primaryResetAudio,           primaryAudio ] }); // Reset audio cache/output, then rebuild audio.
createTask('rebuild_brand',            { tasks: [ primaryResetBrand,           primaryBrand ] }); // Reset brand cache/output, then rebuild brand.
createTask('rebuild_config',           { tasks: [ primaryResetConfig,          groupConfig ] }); // Reset config cache, then rebuild config.
createTask('rebuild_data',             { tasks: [ primaryResetData,            primaryData ] }); // Reset data cache/output, then rebuild data.
createTask('rebuild_favicon',          { tasks: [ primaryResetFavicon,         primaryFavicon ] }); // Reset favicon cache/output, then rebuild favicon.
createTask('rebuild_file',             { tasks: [ primaryResetFile,            primaryFile ] }); // Reset file cache/output, then rebuild files.
createTask('rebuild_font',             { tasks: [ primaryResetFont,            primaryFont ] }); // Reset font cache/output, then rebuild fonts.
createTask('rebuild_font_icon',        { tasks: [ primaryResetFontIcon,        primaryFontIcon ] }); // Reset icon-font cache/output, then rebuild icon fonts.
createTask('rebuild_highlight_syntax', { tasks: [ primaryResetHighlightSyntax, primaryHighlightSyntax ] }); // Reset syntax cache/output, then rebuild syntax assets.
createTask('rebuild_html',             { tasks: [ primaryResetHTML,            primaryHTML ] }); // Reset HTML cache/output, then rebuild HTML.
createTask('rebuild_image',            { tasks: [ primaryResetImage,           primaryImage ] }); // Reset image cache/output, then rebuild images.
createTask('rebuild_javascript',       { tasks: [ primaryResetJavaScript, primaryHighlightSyntax, primaryJavaScript ] }); // Reset JavaScript cache/output, refresh generated Prism sources, then rebuild JavaScript.
createTask('rebuild_mirror',           { tasks: [ primaryResetMirror,          primaryMirror ] }); // Reset mirror state, then rerun mirror copy.
createTask('rebuild_module',           { tasks: [ primaryResetModule,          primaryModule ] }); // Reset module cache/output, then rebuild modules.
createTask('rebuild_stylesheet',       { tasks: [ primaryResetStylesheet,      primaryStylesheet ] }); // Reset stylesheet cache/output, then rebuild stylesheets.
createTask('rebuild_video',            { tasks: [ primaryResetVideo,           primaryVideo ] }); // Reset video cache/output, then rebuild video.

// -----------------------------------------------------------------------------
// #### Main - Task - Reset - Empties cache & removes output so next `Build` task performs as new.
// -----------------------------------------------------------------------------

createTask('reset',                  { tasks: [ primaryReset ] }); // Empties entire cache & removes output so each unique future build task performs as new.
createTask('reset_audio',            { tasks: [ primaryResetAudio ] }); // Clear audio cache/output only.
createTask('reset_brand',            { tasks: [ primaryResetBrand ] }); // Clear brand cache/output only.
createTask('reset_config',           { tasks: [ primaryResetConfig ] }); // Clear config cache only.
createTask('reset_data',             { tasks: [ primaryResetData ] }); // Clear data cache/output only.
createTask('reset_favicon',          { tasks: [ primaryResetFavicon ] }); // Clear favicon cache/output only.
createTask('reset_file',             { tasks: [ primaryResetFile ] }); // Clear file cache/output only.
createTask('reset_font',             { tasks: [ primaryResetFont ] }); // Clear font cache/output only.
createTask('reset_font_icon',        { tasks: [ primaryResetFontIcon ] }); // Clear icon-font cache/output only.
createTask('reset_highlight_syntax', { tasks: [ primaryResetHighlightSyntax ] }); // Clear syntax cache/output only.
createTask('reset_html',             { tasks: [ primaryResetHTML ] }); // Clear HTML cache/output only.
createTask('reset_image',            { tasks: [ primaryResetImage ] }); // Clear image cache/output only.
createTask('reset_javascript',       { tasks: [ primaryResetJavaScript ] }); // Clear JavaScript cache/output only.
createTask('reset_mirror',           { tasks: [ primaryResetMirror ] }); // Clear mirror state/output only.
createTask('reset_module',           { tasks: [ primaryResetModule ] }); // Clear module cache/output only.
createTask('reset_stylesheet',       { tasks: [ primaryResetStylesheet ] }); // Clear stylesheet cache/output only.
createTask('reset_video',            { tasks: [ primaryResetVideo ] }); // Clear video cache/output only.

// -----------------------------------------------------------------------------
// #### Main - Task - Maintenance - Tasks used for project/compiler maintenance.
// -----------------------------------------------------------------------------

createTask('project_normalize_paths',  { tasks: [ primaryNormalizePaths ] }); // Normalizes `in/` paths to lowercase lower-hyphen and rewrites references in any detected text files (best effort, slightly destructive).
createTask('project_update',           { project: false, tasks: [ update_project_standard ] }); // Runs the standard project migration flow (upgrades to current compiler version if needed).
createTask('project_update_manual',    { project: false, tasks: [ project_update_manual ] }); // Performs a directed project update (migrations + update steps) between user-selected versions.
createTask('project_update_full',      { project: false, tasks: [ update_project_full ] }); // Performs a full project update cycle (migrations, git configurations, etc) from `1.0.0` to current compiler version.
createTask('compiler_update_caniuse',  { project: false, tasks: [ update_component_browserslist_db ] }); // Updates the browser compatibility data (caniuse-lite) used by stylesheet (css) build so autoprefixing/targets stay current.
createTask('compiler_update_baseline', { project: false, tasks: [ update_component_baseline_browser_mapping ] }); // Updates Baseline data (baseline-browser-mapping) to remove stale-data warnings.

// -----------------------------------------------------------------------------
// #### Main - Task - Test - Tasks used for testing during development.
// -----------------------------------------------------------------------------

createTask('test_config',     { project: false, tasks: [ primaryTestConfig ] }); // Run config behavior checks.
createTask('test_file_match', { project: false, tasks: [ primaryTestFileMatch ] }); // Run file-match pattern checks.

createTask('test_ansi_standard', { project: false, tasks: [ (done) => { ANSI.test.standard(); done(); } ] }); // Preview ANSI standard color output.
createTask('test_ansi_color256', { project: false, tasks: [ (done) => { ANSI.test.color256(); done(); } ] }); // Preview ANSI 256-color output.
createTask('test_ansi_screen',   { project: false, tasks: [ (done) => { ANSI.test.screen();   done(); } ] }); // Test ANSI screen control behavior.
createTask('test_ansi_cursor',   { project: false, tasks: [ (done) => { ANSI.test.cursor();   done(); } ] }); // Test ANSI cursor control behavior.
createTask('test_ansi_reveal',   { project: false, tasks: [ (done) => { ANSI.test.reveal();   done(); } ] }); // Test ANSI reveal/hide sequences.
createTask('test_ansi_clean',    { project: false, tasks: [ (done) => { ANSI.test.clean();    done(); } ] }); // Test ANSI screen-clean sequences.
createTask('test_ansi_all',      { project: false, tasks: [ (done) => { ANSI.test.all();      done(); } ] }); // Run all ANSI output tests.

createTask('test_log_type',      { project: false, tasks: [ (done) => { log.testType();       done(); } ] }); // Test log type formatting.

createTask('test_log_hook_console',                   { project: false, tasks: [ (done) => { log.testHookConsole();                 done(); } ] }); // Test console log hook behavior.
createTask('test_log_hook_process_warning',           { project: false, tasks: [ (done) => { log.testHookProcessWarning();          done(); } ] }); // Test process warning hook behavior.
createTask('test_log_hook_error_uncaught_exception',  { project: false, tasks: [ (done) => { log.testHookErrorUncaughtException();  done(); } ] }); // Test uncaught-exception hook handling.
createTask('test_log_hook_error_unhandled_rejection', { project: false, tasks: [ (done) => { log.testHookErrorUnhandledRejection(); done(); } ] }); // Test unhandled-rejection hook handling.
createTask('test_log_hook_error_async_throw',         { project: false, tasks: [ (done) => { log.testHookErrorAsyncThrow();         done(); } ] }); // Test async-throw hook handling.
createTask('test_log_hook_error_late_catch',          { project: false, tasks: [ (done) => { log.testHookErrorLateCatch();          done(); } ] }); // Test late-catch hook handling.
createTask('test_log_hook_error_next_tick',           { project: false, tasks: [ (done) => { log.testHookErrorNextTick();           done(); } ] }); // Test next-tick error hook handling.
createTask('test_log_hook_error_immediate',           { project: false, tasks: [ (done) => { log.testHookErrorImmediate();          done(); } ] }); // Test setImmediate error hook handling.
createTask('test_log_hook_signal_sigint',             { project: false, tasks: [ (done) => { log.testHookSignalSIGINT();            done(); } ] }); // Test SIGINT signal hook handling.
createTask('test_log_hook_signal_sigterm',            { project: false, tasks: [ (done) => { log.testHookSignalSIGTERM();           done(); } ] }); // Test SIGTERM signal hook handling.
