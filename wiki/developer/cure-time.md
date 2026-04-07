# Synticore Developer Docs - Cure Time

`cure-time` is a small shared utility module for date/time formatting, date/time parsing, and duration formatting.

It lives at:

- `source/node_modules_custom/cure-time/index.js`

It is used directly by other custom packages such as `cure-log`, so this page documents the public behavior that other parts of the repo depend on.

## Exports

`cure-time` currently exports:

- `formatDuration(ns, options?)`
- `normalizeDurationToNs(input)`
- `parseDateTime(input, options?)`
- `formatDateTime(input, options?)`

## `formatDuration(...)`

Formats a duration expressed in nanoseconds into a readable string.

Examples:

```js
const { formatDuration } = require('@custom/cure-time');

formatDuration(3723045000000);
// "1h 2m 3s 45ms"

formatDuration(1290000, { style: 'compact', decimals: 2 });
// "1.29ms"

formatDuration(1500000, { long: true });
// "1 millisecond 500 microseconds"
```

Options:

- `long: boolean`
  - `true` uses long unit labels such as `milliseconds`
- `style: 'multi' | 'compact'`
  - `multi` returns a breakdown like `1h 2m 3s`
  - `compact` returns one best-fit unit like `1.29ms`
- `decimals: number`
  - used by compact mode

Notes:

- input is expected to be nanoseconds
- non-positive or invalid values format as `0ms` or `0 milliseconds`

## `normalizeDurationToNs(...)`

Normalizes mixed duration-like inputs into a single nanosecond number.

Accepted inputs include:

- `bigint`
  - already treated as nanoseconds
- `[seconds, nanoseconds]`
  - Node `process.hrtime()` tuple shape
- `number`
  - interpreted heuristically
- clock strings like `01:02:03.045`
- unit-suffixed strings like `250ms`, `3.2s`, `2m`, `250us`
- bare numeric strings

Examples:

```js
const { normalizeDurationToNs } = require('@custom/cure-time');

normalizeDurationToNs([1, 250000000]);
// 1250000000

normalizeDurationToNs('01:02:03.045');
// 3723045000000

normalizeDurationToNs('250ms');
// 250000000

normalizeDurationToNs('3.2s');
// 3200000000
```

Notes:

- decimal commas are normalized to dots when there is no dot already present
- invalid inputs return `0`

## `parseDateTime(...)`

Parses a value into a `Date`.

Inputs:

- `Date`
- `string`
- `number`
- `bigint`

Options:

- `inputFormat?: string | null`
- `zone?: 'local' | 'utc'`

Behavior:

- when `inputFormat` is omitted, parsing falls back to native date normalization rules in the helper
- when `inputFormat` is provided, parsing uses the token system described below

Example:

```js
const { parseDateTime } = require('@custom/cure-time');

parseDateTime('2026-03-22 05:11:57PM', {
  inputFormat: 'YYYY-MM-DD hh:mm:ssA',
  zone: 'local'
});
```

## `formatDateTime(...)`

Formats an input date/time using token-based output strings.

Signature:

```js
formatDateTime(input, {
  inputFormat = null,
  outputFormat = 'YYYY-MM-DD HH:mm:ss',
  zone = 'local',
  locale = 'auto',
  invalid = 'Invalid DateTime'
} = {})
```

Examples:

```js
const { formatDateTime } = require('@custom/cure-time');

formatDateTime(new Date(), {
  outputFormat: 'YYYY-MM-DD HH:mm:ss z',
  zone: 'local',
  locale: 'auto'
});
// "2026-03-22 17:11:57 EDT"

formatDateTime(new Date(), {
  outputFormat: 'dddd, MMMM D, YYYY [at] h:mm:ss A z'
});
// "Sunday, March 22, 2026 at 5:11:57 PM EDT"

formatDateTime(new Date(), {
  outputFormat: 'iso'
});
// "2026-03-22T21:11:57.000Z"
```

### Supported Output Tokens

| Token | Meaning | Example |
|---|---|---|
| `YYYY` | 4-digit year | `2026` |
| `YY` | 2-digit year | `26` |
| `MMMM` | Full month name | `March` |
| `MMM` | Short month name | `Mar` |
| `MM` | Month, zero-padded | `03` |
| `M` | Month, non-padded | `3` |
| `DD` | Day of month, zero-padded | `22` |
| `D` | Day of month, non-padded | `22` |
| `dddd` | Full weekday name | `Sunday` |
| `ddd` | Short weekday name | `Sun` |
| `HH` | 24-hour clock, zero-padded | `17` |
| `H` | 24-hour clock, non-padded | `17` |
| `hh` | 12-hour clock, zero-padded | `05` |
| `h` | 12-hour clock, non-padded | `5` |
| `mm` | Minutes, zero-padded | `11` |
| `m` | Minutes, non-padded | `11` |
| `ss` | Seconds, zero-padded | `57` |
| `s` | Seconds, non-padded | `57` |
| `SSS` | Milliseconds | `037` |
| `A` | Upper meridiem | `AM`, `PM` |
| `a` | Lower meridiem | `am`, `pm` |
| `Z` | UTC offset with colon | `-04:00` |
| `ZZ` | UTC offset without colon | `-0400` |
| `z` | Short timezone name | `EDT`, `UTC` |
| `zzzz` | Long timezone name | `Eastern Daylight Time` |

Literal text:

- wrap literal text in square brackets
- example: `YYYY-MM-DD [at] HH:mm:ss z`

Special format:

- `iso`
- `ISO`

Both return `Date#toISOString()`

## Parsing With Tokens

When `inputFormat` is provided, `parseDateTime(...)` and `formatDateTime(...)` support token-based parsing for:

- `YYYY`
- `YY`
- `MMMM`
- `MMM`
- `MM`
- `M`
- `DD`
- `D`
- `HH`
- `H`
- `hh`
- `h`
- `mm`
- `m`
- `ss`
- `s`
- `SSS`
- `A`
- `a`
- `Z`
- `ZZ`
- `dddd`
- `ddd`

Notes:

- weekday tokens are accepted as parse hints
- timezone tokens in parse mode support `Z`, `+05:30`, and `+0530` style offsets

## Zone And Locale

`zone`:

- `local`
- `utc`

`locale`:

- `auto`
- any locale string accepted by `Intl.DateTimeFormat`

Notes:

- `z` and `zzzz` come from runtime `Intl` timezone data
- exact timezone names may vary by platform or runtime
- with `locale: 'auto'`, the locale is resolved from `Intl.DateTimeFormat().resolvedOptions().locale`

## Relationship To `cure-log`

`cure-log` delegates timestamp formatting to `cure-time.formatDateTime(...)`.

If you are configuring:

- `config/log.json`
- project-level `log.json`
- browser dev-panel timestamp formats

then the timestamp format strings should follow the same token contract documented on this page.
