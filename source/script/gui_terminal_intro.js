'use strict';

const MODULE_COMPILER_INTRO = require('../node_modules_custom/compiler-intro');

const HELP_COLOR = '\x1b[38;5;111m';
const RESET_COLOR = '\x1b[0m';

function _pathToPosix(value) {
    return String(value || '').replace(/\\/g, '/');
}

async function printIntro() {
    try {
        const banner = await MODULE_COMPILER_INTRO.getIntroString(false, true);
        if (banner) {
            process.stdout.write(`${banner}\n`);
        }
    } catch {}

    const isWindows = process.platform === 'win32';
    const clearCommand = isWindows ? 'cls' : 'clear';
    const workingDirectory = _pathToPosix(process.cwd());
    const lines = [
        'Welcome to the Synticore Website Compiler terminal (SCRIPT ROOT / TOOL ROOT)!',
        `Working Directory: ${workingDirectory}`,
        '',
        'Useful Commands:',
        '- Execute Task:   `npm run gulp task_name -- --project "<project_path>"`',
        `- Clear Terminal: \`${clearCommand}\``,
        '- Exit Terminal:  `exit`'
    ];

    for (const line of lines) {
        process.stdout.write(`${HELP_COLOR}${line}${RESET_COLOR}\n`);
    }
}

printIntro().catch(() => {
    process.exitCode = 0;
});
