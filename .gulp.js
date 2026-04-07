// .gulp.js
// Capture ALL gulp-cli output and publish to a global queue/bus.
// Fully defensive: hooks NEVER throw. Swallow toggle is LIVE.
// .gulp.js — DEBUG INSTRUMENTED

const LOG_DEBUG = false;

function logDebug(...args) {
  if (LOG_DEBUG) {
    console.log(args);
  }
}

(function initBus() {
  try {
    logDebug('[GLUE][.gulp.js] module loaded'); // ← proves this file is read

    const g = globalThis;
    if (!g.__GULPCLI_BUS__) {
      logDebug('[GLUE][.gulp.js] creating bus');
      const envDefault = process.env.GULP_CLI_SWALLOW === '1';
      g.__GULPCLI_BUS__ = {
        q: [],
        consumer: null,
        swallow: envDefault,
        push(ev) {
          try {
            const tag = ev && ev.tag;
            const sw = this.swallow ? 'ON' : 'OFF';
            if (typeof this.consumer === 'function') {
              logDebug(`[GLUE][.gulp.js] push(tag=${tag}) → deliver (swallow ${sw})`);
              this.consumer(ev);
            } else {
              logDebug(`[GLUE][.gulp.js] push(tag=${tag}) → queue (len=${this.q.length + 1}, swallow ${sw})`);
              this.q.push(ev);
            }
          } catch (e) { 
            logDebug('[GLUE][.gulp.js] push error:', e?.message); 
          }
        },
        attach(fn) {
          try {
            logDebug('[GLUE][.gulp.js] attach consumer');
            this.consumer = fn;
            const items = this.q.splice(0);
            logDebug(`[GLUE][.gulp.js] flush queued: ${items.length}`);
            for (const ev of items) {
              try { fn(ev); } catch (e) { 
                logDebug('[GLUE][.gulp.js] deliver error:', e?.message); 
              }
            }
          } catch (e) { 
            logDebug('[GLUE][.gulp.js] attach error:', e?.message); 
          }
        },
        setSwallow(v) { 
          this.swallow = !!v; 
          logDebug(`[GLUE][.gulp.js] swallow set → ${this.swallow ? 'ON' : 'OFF'}`); 
        },
        toggle() { 
          this.swallow = !this.swallow; 
          logDebug(`[GLUE][.gulp.js] swallow toggled → ${this.swallow ? 'ON' : 'OFF'}`); 
        }
      };
    } else {
      logDebug('[GLUE][.gulp.js] bus already exists');
    }
  } catch (e) {
    logDebug('[GLUE][.gulp.js] initBus error:', e?.message);
  }
})();

function safeTagName(tag) {
  try {
    const s = String(tag ?? '');
    return s.startsWith('Symbol(') ? s.slice(7, -1) : s;
  } catch (_) { return ''; }
}

module.exports = {
  flags: { silent: false },

  message(data) {
    try {
      const tag = safeTagName(data && data.tag);
      const bus = globalThis.__GULPCLI_BUS__;
      logDebug(`[GLUE][.gulp.js] message(tag=${tag}) bus=${!!bus}`);
      if (bus && typeof bus.push === 'function') {
        bus.push({ source: 'cli', tag, data });
        return bus.swallow ? false : undefined;
      }
      return undefined;
    } catch (e) {
      logDebug('[GLUE][.gulp.js] message error:', e?.message);
      return undefined;
    }
  },

  timestamp(data) {
    try {
      const bus = globalThis.__GULPCLI_BUS__;
      logDebug(`[GLUE][.gulp.js] timestamp bus=${!!bus}`);
      if (bus && typeof bus.push === 'function') {
        bus.push({ source: 'cli', tag: 'timestamp', data });
        return bus.swallow ? false : undefined;
      }
      return undefined;
    } catch (e) {
      logDebug('[GLUE][.gulp.js] timestamp error:', e?.message);
      return undefined;
    }
  },
};
