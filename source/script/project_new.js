'use strict';

// =============================================================================
// # Synticore Project New (Standalone Scaffold Utility)
// =============================================================================

// This script intentionally does NOT load gulpfile.js.
// It must work before a project exists.

const NODE_FS = require('fs');
const NODE_PATH = require('path');

const PATH_DIR_ROOT = NODE_PATH.resolve(__dirname, '..', '..');

// ---------------------------------------------------------------------------
// Module alias bootstrap (matches compiler conventions)
// ---------------------------------------------------------------------------

require('module-alias/register');
require('module-alias').addAlias(
  '@custom',
  NODE_PATH.join(PATH_DIR_ROOT, 'source', 'node_modules_custom')
);

const NODE_CURE_LOG = require('@custom/cure-log');
const NODE_CURE_LOG_HUB = require('@custom/cure-log-hub');
const MODULE_COMPILER_INTRO = require('@custom/compiler-intro');

const LOG_TAG = '[Project New]';

const PATH_FILE_GUI = NODE_PATH.join(PATH_DIR_ROOT, 'config', 'gui.json');
const PATH_DIR_TEMPLATE_ROOT = NODE_PATH.join(PATH_DIR_ROOT, 'template');
const PATH_DIR_TEMPLATE_SHARED = NODE_PATH.join(PATH_DIR_TEMPLATE_ROOT, '_shared');
const PATH_FILE_COMPILER_INFO = NODE_PATH.join(PATH_DIR_ROOT, 'source', 'resource', 'info.json');

/** @type {InstanceType<typeof NODE_CURE_LOG.Log>} */
let log = new NODE_CURE_LOG.Log({
  filePath: {
    log: NODE_PATH.join(PATH_DIR_ROOT, '_log', 'project_new.log')
  }
});
NODE_CURE_LOG_HUB.setRoot(log);

// Require hub-logging modules only after root logger is set to avoid fallback logger noise.
const NODE_CURE_JSON = require('@custom/cure-json');
const MODULE_COMPILER_DEFAULT = require('@custom/compiler-default');

function parseCliFlags(argv = process.argv.slice(2)) {
  /** @type {Record<string, string | boolean>} */
  const flags = {};
  /** @type {string[]} */
  const positionals = [];

  for (let i = 0; i < argv.length; i += 1) {
    const token = String(argv[i] ?? '');
    if (!token.startsWith('--')) {
      positionals.push(token);
      continue;
    }

    const raw = token.slice(2);
    if (!raw) continue;

    const eqIndex = raw.indexOf('=');
    if (eqIndex >= 0) {
      const key = raw.slice(0, eqIndex).trim();
      const value = raw.slice(eqIndex + 1);
      if (key) flags[key] = value;
      continue;
    }

    const key = raw.trim();
    if (!key) continue;

    const next = argv[i + 1];
    if (typeof next === 'string' && !next.startsWith('--')) {
      flags[key] = next;
      i += 1;
    } else {
      flags[key] = true;
    }
  }

  return { flags, positionals };
}

function printHelp() {
  console.log(`
Synticore Project New

Usage:
  npm run project:new -- --dir "<target-dir>" [--template basic] [--force]
  node source/script/project_new.js --dir "<target-dir>" [--template basic] [--force]

Options:
  --dir        Target project directory (required)
  --template   Template folder under template/ (default: basic)
  --force      Allow copy into non-empty directory / overwrite existing files
  --help       Show this help
`);
}

function loadTemplateRegistry() {
  /** @type {{ id: string, pathRel: string, label: string, description: string, schemaPath: string }[]} */
  const entries = [];

  /** @type {string[]} */
  let dirNames = [];
  try {
    dirNames = NODE_FS.readdirSync(PATH_DIR_TEMPLATE_ROOT).sort((a, b) =>
      String(a).localeCompare(String(b), 'en', { sensitivity: 'base' })
    );
  } catch (_) {
    dirNames = [];
  }

  for (const dirName of dirNames) {
    const trimmed = String(dirName || '').trim();
    if (!trimmed || trimmed.startsWith('_')) continue;

    const templateDir = NODE_PATH.join(PATH_DIR_TEMPLATE_ROOT, trimmed);
    if (!NODE_FS.existsSync(templateDir) || !NODE_FS.statSync(templateDir).isDirectory()) {
      continue;
    }

    const schemaPath = NODE_PATH.join(templateDir, 'template.schema.json');
    if (!NODE_FS.existsSync(schemaPath) || !NODE_FS.statSync(schemaPath).isFile()) {
      continue;
    }

    const schema = NODE_CURE_JSON.load(schemaPath, { fatal: false }) || {};
    if (!schema || typeof schema !== 'object' || Array.isArray(schema)) continue;

    const id = String(schema.id || trimmed).trim();
    const pathRel = String(schema.path || trimmed).trim();
    const label = String(schema.label || id).trim();
    const description = String(schema.description || '').trim();
    if (!id || !pathRel) continue;

    entries.push({ id, pathRel, label, description, schemaPath });
  }

  return entries;
}

function resolveTemplateDirectory(templateName) {
  const requested = String(templateName || '').trim();
  const registry = loadTemplateRegistry();

  if (requested) {
    const match = registry.find(t => t.id === requested || t.pathRel === requested);
    if (match) {
      return {
        templateId: match.id,
        templateDir: NODE_PATH.join(PATH_DIR_TEMPLATE_ROOT, match.pathRel),
        registry,
      };
    }
  }

  // Fallback for local/dev use even if schema is missing or not yet updated.
  return {
    templateId: requested,
    templateDir: NODE_PATH.join(PATH_DIR_TEMPLATE_ROOT, requested),
    registry,
  };
}

function settingsPathPortableFromAbsolute(absDirPath) {
  const absolute = NODE_PATH.resolve(String(absDirPath || ''));
  const relative = NODE_PATH.relative(PATH_DIR_ROOT, absolute);

  if (!relative || relative === '.') {
    return '.';
  }

  if (!relative.startsWith('..') && !NODE_PATH.isAbsolute(relative)) {
    return `./${relative.replace(/\\/g, '/')}`;
  }

  return absolute;
}

function ensureDirectory(pathDir) {
  NODE_FS.mkdirSync(pathDir, { recursive: true });
}

function copyTemplateContents(templateDir, targetDir, { force = false } = {}) {
  for (const entryName of NODE_FS.readdirSync(templateDir)) {
    const sourcePath = NODE_PATH.join(templateDir, entryName);
    const destinationPath = NODE_PATH.join(targetDir, entryName);
    NODE_FS.cpSync(sourcePath, destinationPath, {
      recursive: true,
      force
    });
  }
}

function copySharedThenTemplateContents(templateDir, targetDir, { force = false } = {}) {
  if (NODE_FS.existsSync(PATH_DIR_TEMPLATE_SHARED)) {
    const stat = NODE_FS.statSync(PATH_DIR_TEMPLATE_SHARED);
    if (stat.isDirectory()) {
      copyTemplateContents(PATH_DIR_TEMPLATE_SHARED, targetDir, { force });
    }
  }

  copyTemplateContents(templateDir, targetDir, { force });
}

function syncProjectInfoFromCompiler(targetDir) {
  const targetInfoPath = NODE_PATH.join(targetDir, 'info.json');

  if (!NODE_FS.existsSync(PATH_FILE_COMPILER_INFO)) {
    log.warn(LOG_TAG, 'Compiler info.json not found; leaving project info.json as-is.', {
      compilerInfoPath: PATH_FILE_COMPILER_INFO,
      targetInfoPath
    });
    return;
  }

  NODE_FS.copyFileSync(PATH_FILE_COMPILER_INFO, targetInfoPath);
}

function updateGuiRecents(targetDirAbs) {
  /** @type {{dir_recent?: string[], dir_recent_max?: number, [k: string]: any}} */
  const settings = NODE_CURE_JSON.load(PATH_FILE_GUI, { fatal: false }) || {};

  const recentPath = settingsPathPortableFromAbsolute(targetDirAbs);
  const current = Array.isArray(settings.dir_recent)
    ? settings.dir_recent.filter(v => typeof v === 'string' && v.trim())
    : [];

  const nextRecents = [recentPath, ...current.filter(v => v !== recentPath)];
  const maxRaw = Number.parseInt(settings.dir_recent_max, 10);
  const hasLimit = Number.isFinite(maxRaw) ? maxRaw > 0 : true;
  const max = hasLimit ? maxRaw || 64 : Infinity;

  settings.dir_recent = hasLimit ? nextRecents.slice(0, max) : nextRecents;

  NODE_CURE_JSON.save(PATH_FILE_GUI, settings, { spacing: 4 });
  return settings;
}

function validateTargetDirectory(targetDirAbs, { force = false } = {}) {
  if (NODE_FS.existsSync(targetDirAbs)) {
    const stat = NODE_FS.statSync(targetDirAbs);
    if (!stat.isDirectory()) {
      throw new Error(`Target exists and is not a directory: ${targetDirAbs}`);
    }

    const entries = NODE_FS.readdirSync(targetDirAbs);
    if (entries.length > 0 && !force) {
      throw new Error(
        `Target directory is not empty (use --force to allow overwrite): ${targetDirAbs}`
      );
    }
    return;
  }

  ensureDirectory(targetDirAbs);
}

async function main() {
  log.init(LOG_TAG, 'Starting...');

  try {
    try {
      const intro = await MODULE_COMPILER_INTRO.getIntroString(false, true);
      if (intro) console.log(intro);
    } catch (error) {
      log.warn(LOG_TAG, 'Failed to render compiler intro banner.', error);
    }

    MODULE_COMPILER_DEFAULT.configEnsure();

    const { flags } = parseCliFlags();
    if (flags.help === true) {
      printHelp();
      return;
    }

    const rawDir = String(flags.dir || '').trim();
    const templateName = String(flags.template || 'basic').trim() || 'basic';
    const force = flags.force === true;

    if (!rawDir) {
      printHelp();
      throw new Error('Missing required `--dir` argument.');
    }

    const { templateId, templateDir, registry } = resolveTemplateDirectory(templateName);
    if (!NODE_FS.existsSync(templateDir) || !NODE_FS.statSync(templateDir).isDirectory()) {
      const available = registry.map(t => t.id).join(', ');
      throw new Error(
        `Template not found: ${templateName} (${templateDir})` +
        (available ? ` | Available: ${available}` : '')
      );
    }

    const targetDirAbs = NODE_PATH.isAbsolute(rawDir)
      ? NODE_PATH.resolve(rawDir)
      : NODE_PATH.resolve(PATH_DIR_ROOT, rawDir);

    log.begin(LOG_TAG, 'Creating project scaffold...');
    log.info(LOG_TAG, 'Arguments:', { rawDir, templateName, force, targetDirAbs });
    const matchedEntry = registry.find(t => t.id === templateId || t.pathRel === templateName);
    log.info(LOG_TAG, 'Template source:', {
      templateId,
      templateDir,
      schema: matchedEntry?.schemaPath || NODE_PATH.join(templateDir, 'template.schema.json')
    });

    validateTargetDirectory(targetDirAbs, { force });
    ensureDirectory(targetDirAbs);
    copySharedThenTemplateContents(templateDir, targetDirAbs, { force });
    syncProjectInfoFromCompiler(targetDirAbs);

    const settings = updateGuiRecents(targetDirAbs);

    log.success(LOG_TAG, 'Project scaffold created.', {
      targetDirAbs,
      templateDir,
      templateId,
      sharedTemplateDir: NODE_FS.existsSync(PATH_DIR_TEMPLATE_SHARED) ? PATH_DIR_TEMPLATE_SHARED : null,
      recentPath: settings.dir_recent?.[0] || '',
      settingsFile: PATH_FILE_GUI
    });
    log.end(LOG_TAG, 'Complete.');
  } catch (error) {
    log.error(LOG_TAG, 'Failed.', {
      error: String(error && error.message ? error.message : error)
    });
    process.exitCode = 1;
  } finally {
    try {
      log.shutdown?.(LOG_TAG, 'Exiting...');
      log.close?.({ reason: 'project_new script completed' });
    } catch (_) {
      // best effort
    }
  }
}

main();
