module.exports = () => {
  const TZ_OFFSETS = {
    EST: '-05:00',
    EDT: '-04:00',
    CST: '-06:00',
    CDT: '-05:00',
    MST: '-07:00',
    MDT: '-06:00',
    PST: '-08:00',
    PDT: '-07:00',
    UTC: 'Z',
    GMT: 'Z',
  };

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function normalizeOffset(token) {
    if (!token) return '';
    const raw = String(token).trim().toUpperCase();
    if (TZ_OFFSETS[raw]) return TZ_OFFSETS[raw];
    if (/^[+-]\d{2}:\d{2}$/.test(raw)) return raw;
    if (/^[+-]\d{4}$/.test(raw)) return `${raw.slice(0, 3)}:${raw.slice(3)}`;
    if (raw === 'Z') return 'Z';
    return '';
  }

  function parseInput(rawInput) {
    const raw = String(rawInput || '').trim();
    if (!raw) return null;

    const dateOnlyMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
      return {
        date: null,
        dateOnly: true,
        hasTime: false,
        year: Number(dateOnlyMatch[1]),
        month: Number(dateOnlyMatch[2]),
        day: Number(dateOnlyMatch[3]),
        attr: `${dateOnlyMatch[1]}-${dateOnlyMatch[2]}-${dateOnlyMatch[3]}`,
        zoneLabel: '',
      };
    }

    const ampmMatch = raw.match(
      /^(\d{4})-(\d{2})-(\d{2})[ T](\d{1,2}):(\d{2})(?::(\d{2}))?\s*([AP]M)(?:\s+([A-Za-z]{1,5}|[+-]\d{2}:?\d{2}|Z))?$/i
    );
    if (ampmMatch) {
      let hour = Number(ampmMatch[4]);
      const minute = Number(ampmMatch[5]);
      const second = Number(ampmMatch[6] || 0);
      const meridiem = ampmMatch[7].toUpperCase();
      const zoneToken = (ampmMatch[8] || '').toUpperCase();
      const offset = normalizeOffset(zoneToken);

      if (meridiem === 'PM' && hour < 12) hour += 12;
      if (meridiem === 'AM' && hour === 12) hour = 0;

      const isoBase = `${ampmMatch[1]}-${ampmMatch[2]}-${ampmMatch[3]}T${pad(hour)}:${pad(minute)}:${pad(second)}`;
      const iso = `${isoBase}${offset}`;
      const date = new Date(iso);
      if (!Number.isNaN(date.getTime())) {
        return {
          date,
          dateOnly: false,
          hasTime: true,
          attr: iso,
          zoneLabel: zoneToken && TZ_OFFSETS[zoneToken] ? zoneToken : '',
        };
      }
    }

    const date = new Date(raw);
    if (!Number.isNaN(date.getTime())) {
      const hasTime = /[t ]\d{1,2}:\d{2}/i.test(raw);
      const zoneMatch = raw.match(/\b([A-Z]{2,5}|[+-]\d{2}:?\d{2}|Z)\b$/);
      const zoneToken = zoneMatch ? zoneMatch[1].toUpperCase() : '';
      return {
        date,
        dateOnly: !hasTime,
        hasTime,
        attr: hasTime ? date.toISOString() : raw.slice(0, 10),
        zoneLabel: zoneToken && TZ_OFFSETS[zoneToken] ? zoneToken : '',
      };
    }

    return null;
  }

  function formatDateText(parsed) {
    if (parsed.dateOnly) {
      const date = new Date(Date.UTC(parsed.year, parsed.month - 1, parsed.day));
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date);
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(parsed.date);
  }

  function formatTimeText(parsed) {
    if (!parsed.hasTime) return '';
    const time = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(parsed.date);
    return parsed.zoneLabel ? `${time} ${parsed.zoneLabel}` : time;
  }

  return {
    datetimeAttr: (rawInput) => {
      const parsed = parseInput(rawInput);
      if (!parsed) return '';
      return parsed.attr;
    },

    datetimeText: (rawInput) => {
      const parsed = parseInput(rawInput);
      if (!parsed) return '';
      const dateText = formatDateText(parsed);
      if (!parsed.hasTime) return dateText;
      return `${dateText}, ${formatTimeText(parsed)}`;
    },

    datetimeTitle: (rawInput) => {
      const parsed = parseInput(rawInput);
      if (!parsed) return '';
      const dateText = formatDateText(parsed);
      if (!parsed.hasTime) return dateText;
      return `${dateText}, ${formatTimeText(parsed)}`;
    },
  };
};
