'use strict';

const NODE_PATH = require('path');

const PATH_DIR_ROOT = NODE_PATH.resolve(__dirname, '..', '..');

require('module-alias/register');
require('module-alias').addAlias(
    '@custom',
    NODE_PATH.join(PATH_DIR_ROOT, 'source', 'node_modules_custom')
);

const MODULE_LOG_HUB = require('@custom/cure-log-hub');
const MODULE_GUI_BROWSER = require('@custom/compiler-gui-browser');
const LOG = MODULE_LOG_HUB.use();
const LOG_TAG = '[GUI Browser Launcher]';

async function launchGuiBrowser(options = {}) {
    return MODULE_GUI_BROWSER.startBrowserGui(options);
}

if (require.main === module) {
    launchGuiBrowser().then(({ url, localUrl, lanUrl, authRequired, networkToken, networkTrusted }) => {
        LOG.success(LOG_TAG, 'Synticore browser GUI running.', { url });
        if (localUrl && localUrl !== url) {
            LOG.info(LOG_TAG, 'Local URL.', { localUrl });
        }
        if (lanUrl) {
            LOG.info(LOG_TAG, 'LAN URL.', { lanUrl });
            if (networkTrusted) {
                LOG.info(LOG_TAG, 'LAN mode is trusted; token auth is disabled.');
            } else if (authRequired && networkToken) {
                LOG.warn(LOG_TAG, 'LAN token required for remote access.', { networkToken });
            }
        }
    }).catch((error) => {
        process.stderr.write(`${String(error && error.stack || error)}\n`);
        process.exitCode = 1;
    });
}

module.exports = {
    launchGuiBrowser
};
