(function () {
    'use strict';

    const GUI = window.SynticoreGui;
    const {
        STATE,
        UI,
        api,
        clone,
        escapeHtml,
        logEvent,
        normalizePath,
        syncRawEditor
    } = GUI;
    GUI.LOCALE_SUGGESTIONS = ["auto","aa","aa-DJ","aa-ER","aa-ET","af","af-NA","af-ZA","agq","agq-CM","ak","ak-GH","am","am-ET","ar","ar-001","ar-AE","ar-BH","ar-DJ","ar-DZ","ar-EG","ar-ER","ar-IL","ar-IQ","ar-JO","ar-KM","ar-KW","ar-LB","ar-LY","ar-MA","ar-MR","arn","arn-CL","ar-OM","ar-PS","ar-QA","ar-SA","ar-SD","ar-SO","ar-SS","ar-SY","ar-TD","ar-TN","ar-YE","as","asa","asa-TZ","as-IN","ast","ast-ES","az","az-Cyrl","az-Cyrl-AZ","az-Latn","az-Latn-AZ","ba","ba-RU","bas","bas-CM","be","be-BY","bem","bem-ZM","bez","bez-TZ","bg","bg-BG","bin","bin-NG","bm","bm-Latn","bm-Latn-ML","bn","bn-BD","bn-IN","bo","bo-CN","bo-IN","br","br-FR","brx","brx-IN","bs","bs-Cyrl","bs-Cyrl-BA","bs-Latn","bs-Latn-BA","byn","byn-ER","ca","ca-AD","ca-ES","ca-ES-valencia","ca-FR","ca-IT","ccp","ccp-Cakm","ccp-Cakm-BD","ccp-Cakm-IN","ce","ceb","ceb-Latn","ceb-Latn-PH","ce-RU","cgg","cgg-UG","chr","chr-Cher","chr-Cher-US","co","co-FR","cs","cs-CZ","cu","cu-RU","cy","cy-GB","da","da-DK","da-GL","dav","dav-KE","de","de-AT","de-BE","de-CH","de-DE","de-IT","de-LI","de-LU","dje","dje-NE","doi","doi-Deva","doi-Deva-IN","dsb","dsb-DE","dua","dua-CM","dv","dv-MV","dyo","dyo-SN","dz","dz-BT","ebu","ebu-KE","ee","ee-GH","ee-TG","el","el-CY","el-GR","en","en-001","en-029","en-150","en-AE","en-AG","en-AI","en-AS","en-AT","en-AU","en-BB","en-BE","en-BI","en-BM","en-BS","en-BW","en-BZ","en-CA","en-CC","en-CH","en-CK","en-CM","en-CX","en-CY","en-DE","en-DK","en-DM","en-ER","en-FI","en-FJ","en-FK","en-FM","en-GB","en-GD","en-GG","en-GH","en-GI","en-GM","en-GU","en-GY","en-HK","en-ID","en-IE","en-IL","en-IM","en-IN","en-IO","en-JE","en-JM","en-KE","en-KI","en-KN","en-KY","en-LC","en-LR","en-LS","en-MG","en-MH","en-MO","en-MP","en-MS","en-MT","en-MU","en-MW","en-MY","en-NA","en-NF","en-NG","en-NL","en-NR","en-NU","en-NZ","en-PG","en-PH","en-PK","en-PN","en-PR","en-PW","en-RW","en-SB","en-SC","en-SD","en-SE","en-SG","en-SH","en-SI","en-SL","en-SS","en-SX","en-SZ","en-TC","en-TK","en-TO","en-TT","en-TV","en-TZ","en-UG","en-UM","en-US","en-VC","en-VG","en-VI","en-VU","en-WS","en-ZA","en-ZM","en-ZW","eo","eo-001","es","es-419","es-AR","es-BO","es-BR","es-BZ","es-CL","es-CO","es-CR","es-CU","es-DO","es-EC","es-ES","es-GQ","es-GT","es-HN","es-MX","es-NI","es-PA","es-PE","es-PH","es-PR","es-PY","es-SV","es-US","es-UY","es-VE","et","et-EE","eu","eu-ES","ewo","ewo-CM","fa","fa-AF","fa-IR","ff","ff-Adlm","ff-Adlm-BF","ff-Adlm-CM","ff-Adlm-GH","ff-Adlm-GM","ff-Adlm-GN","ff-Adlm-GW","ff-Adlm-LR","ff-Adlm-MR","ff-Adlm-NE","ff-Adlm-NG","ff-Adlm-SL","ff-Adlm-SN","ff-Latn","ff-Latn-BF","ff-Latn-CM","ff-Latn-GH","ff-Latn-GM","ff-Latn-GN","ff-Latn-GW","ff-Latn-LR","ff-Latn-MR","ff-Latn-NE","ff-Latn-NG","ff-Latn-SL","ff-Latn-SN","fi","fi-FI","fil","fil-PH","fo","fo-DK","fo-FO","fr","fr-029","fr-BE","fr-BF","fr-BI","fr-BJ","fr-BL","fr-CA","fr-CD","fr-CF","fr-CG","fr-CH","fr-CI","fr-CM","fr-DJ","fr-DZ","fr-FR","fr-GA","fr-GF","fr-GN","fr-GP","fr-GQ","fr-HT","fr-KM","fr-LU","fr-MA","fr-MC","fr-MF","fr-MG","fr-ML","fr-MQ","fr-MR","fr-MU","fr-NC","fr-NE","fr-PF","fr-PM","fr-RE","fr-RW","fr-SC","fr-SN","fr-SY","fr-TD","fr-TG","fr-TN","fr-VU","fr-WF","fr-YT","fur","fur-IT","fy","fy-NL","ga","ga-GB","ga-IE","gd","gd-GB","gl","gl-ES","gn","gn-PY","gsw","gsw-CH","gsw-FR","gsw-LI","gu","gu-IN","guz","guz-KE","gv","gv-IM","ha","ha-Latn","ha-Latn-GH","ha-Latn-NE","ha-Latn-NG","haw","haw-US","he","he-IL","hi","hi-IN","hr","hr-BA","hr-HR","hsb","hsb-DE","hu","hu-HU","hy","hy-AM","ia","ia-001","ibb","ibb-NG","id","id-ID","ig","ig-NG","ii","ii-CN","is","is-IS","it","it-CH","it-IT","it-SM","it-VA","iu","iu-Cans","iu-Cans-CA","iu-Latn","iu-Latn-CA","ja","ja-JP","jgo","jgo-CM","jmc","jmc-TZ","jv","jv-Java","jv-Java-ID","jv-Latn","jv-Latn-ID","ka","kab","kab-DZ","ka-GE","kam","kam-KE","kde","kde-TZ","kea","kea-CV","khq","khq-ML","ki","ki-KE","kk","kkj","kkj-CM","kk-KZ","kl","kl-GL","kln","kln-KE","km","km-KH","kn","kn-IN","ko","kok","kok-IN","ko-KP","ko-KR","kr","kr-Latn","kr-Latn-NG","ks","ks-Arab","ks-Arab-IN","ksb","ksb-TZ","ks-Deva","ks-Deva-IN","ksf","ksf-CM","ksh","ksh-DE","ku","ku-Arab","ku-Arab-IQ","ku-Arab-IR","kw","kw-GB","ky","ky-KG","la","lag","lag-TZ","la-VA","lb","lb-LU","lg","lg-UG","lkt","lkt-US","ln","ln-AO","ln-CD","ln-CF","ln-CG","lo","lo-LA","lrc","lrc-IQ","lrc-IR","lt","lt-LT","lu","lu-CD","luo","luo-KE","luy","luy-KE","lv","lv-LV","mai","mai-IN","mas","mas-KE","mas-TZ","mer","mer-KE","mfe","mfe-MU","mg","mgh","mgh-MZ","mg-MG","mgo","mgo-CM","mi","mi-NZ","mk","mk-MK","ml","ml-IN","mn","mn-Cyrl","mni","mni-Beng","mni-IN","mn-MN","mn-Mong","mn-Mong-CN","mn-Mong-MN","moh","moh-CA","mr","mr-IN","ms","ms-BN","ms-ID","ms-MY","ms-SG","mt","mt-MT","mua","mua-CM","my","my-MM","mzn","mzn-IR","naq","naq-NA","nb","nb-NO","nb-SJ","nd","nds","nds-DE","nds-NL","nd-ZW","ne","ne-IN","ne-NP","nl","nl-AW","nl-BE","nl-BQ","nl-CW","nl-NL","nl-SR","nl-SX","nmg","nmg-CM","nn","nnh","nnh-CM","nn-NO","no","nqo","nqo-GN","nr","nr-ZA","nso","nso-ZA","nus","nus-SS","nyn","nyn-UG","oc","oc-FR","om","om-ET","om-KE","or","or-IN","os","os-GE","os-RU","pa","pa-Arab","pa-Arab-PK","pa-Guru","pa-IN","pap","pap-029","pcm","pcm-Latn","pcm-Latn-NG","pl","pl-PL","prg","prg-001","ps","ps-AF","ps-PK","pt","pt-AO","pt-BR","pt-CH","pt-CV","pt-GQ","pt-GW","pt-LU","pt-MO","pt-MZ","pt-PT","pt-ST","pt-TL","quc","quc-Latn","quc-Latn-GT","quz","quz-BO","quz-EC","quz-PE","rm","rm-CH","rn","rn-BI","ro","rof","rof-TZ","ro-MD","ro-RO","ru","ru-BY","ru-KG","ru-KZ","ru-MD","ru-RU","ru-UA","rw","rwk","rwk-TZ","rw-RW","sa","sah","sah-RU","sa-IN","saq","saq-KE","sat","sat-Olck","sat-Olck-IN","sbp","sbp-TZ","sd","sd-Arab","sd-Arab-PK","sd-Deva","sd-Deva-IN","se","se-FI","seh","seh-MZ","se-NO","ses","se-SE","ses-ML","sg","sg-CF","shi","shi-Latn","shi-Latn-MA","shi-Tfng","shi-Tfng-MA","si","si-LK","sk","sk-SK","sl","sl-SI","sma","sma-NO","sma-SE","smj","smj-NO","smj-SE","smn","smn-FI","sms","sms-FI","sn","sn-Latn","sn-Latn-ZW","so","so-DJ","so-ET","so-KE","so-SO","sq","sq-AL","sq-MK","sq-XK","sr","sr-Cyrl","sr-Cyrl-BA","sr-Cyrl-ME","sr-Cyrl-RS","sr-Cyrl-XK","sr-Latn","sr-Latn-BA","sr-Latn-ME","sr-Latn-RS","sr-Latn-XK","ss","ss-SZ","ssy","ssy-ER","ss-ZA","st","st-LS","st-ZA","su","su-Latn","su-Latn-ID","sv","sv-AX","sv-FI","sv-SE","sw","sw-CD","sw-KE","sw-TZ","sw-UG","syr","syr-SY","ta","ta-IN","ta-LK","ta-MY","ta-SG","te","te-IN","teo","teo-KE","teo-UG","tg","tg-Cyrl","tg-Cyrl-TJ","th","th-TH","ti","ti-ER","ti-ET","tig","tig-ER","tk","tk-TM","tn","tn-BW","tn-ZA","to","to-TO","tr","tr-CY","tr-TR","ts","ts-ZA","tt","tt-RU","twq","twq-NE","tzm","tzm-Arab","tzm-Arab-MA","tzm-Latn","tzm-Latn-DZ","tzm-Latn-MA","tzm-Tfng","tzm-Tfng-MA","ug","ug-CN","uk","uk-UA","ur","ur-IN","ur-PK","uz","uz-Arab","uz-Arab-AF","uz-Cyrl","uz-Cyrl-UZ","uz-Latn","uz-Latn-UZ","vai","vai-Latn","vai-Latn-LR","vai-Vaii","vai-Vaii-LR","ve","ve-ZA","vi","vi-VN","vo","vo-001","vun","vun-TZ","wae","wae-CH","wal","wal-ET","wo","wo-SN","xh","xh-ZA","xog","xog-UG","yav","yav-CM","yi","yi-001","yo","yo-BJ","yo-NG","zgh","zgh-Tfng","zgh-Tfng-MA","zh","zh-CHS","zh-CHT","zh-CN","zh-Hans","zh-Hans-HK","zh-Hans-MO","zh-Hant","zh-HK","zh-MO","zh-SG","zh-TW","zu","zu-ZA"];

    GUI.findSchemaEntry = function findSchemaEntry(path) {
        const normalized = normalizePath(path);
        const entries = (STATE.configModel && Array.isArray(STATE.configModel.schemaEntries))
            ? STATE.configModel.schemaEntries
            : [];
        const projectExact = typeof GUI.findProjectSchemaEntry === 'function'
            ? (GUI.findProjectSchemaEntry(normalized) || null)
            : null;

        const exact = entries.find((entry) => String(entry.key || '') === normalized);
        const matched = entries.find((entry) => GUI.matchSchemaPath(String(entry && entry.key || ''), normalized).matched) || null;
        const baseEntry = exact || matched || null;
        if (!baseEntry && !projectExact) return null;
        return Object.assign({}, baseEntry || {}, projectExact || {});
    };

    GUI.tokenizeSchemaPath = function tokenizeSchemaPath(schemaKey) {
        return String(schemaKey || '').trim().split('.').filter(Boolean).flatMap((part) => {
            if (!part) return [];

            const tokens = [];
            let remainder = part;
            while (remainder.endsWith('[]')) {
                remainder = remainder.slice(0, -2);
                tokens.unshift('[]');
            }
            if (remainder) tokens.unshift(remainder);
            return tokens;
        });
    };

    GUI.matchSchemaPath = function matchSchemaPath(schemaKey, path) {
        const schemaParts = GUI.tokenizeSchemaPath(schemaKey);
        const pathParts = normalizePath(path).split('.').filter(Boolean);
        const wildcardValues = [];

        const match = (schemaIndex, pathIndex) => {
            if (schemaIndex >= schemaParts.length && pathIndex >= pathParts.length) return true;
            if (schemaIndex >= schemaParts.length || pathIndex >= pathParts.length) return false;

            const schemaPart = schemaParts[schemaIndex];

            if (schemaPart === '[]') {
                if (!/^\d+$/.test(pathParts[pathIndex])) return false;
                return match(schemaIndex + 1, pathIndex + 1);
            }

            if (schemaPart === '*') {
                const remainingSchema = schemaParts.length - (schemaIndex + 1);
                const maxWildcardLength = pathParts.length - pathIndex - remainingSchema;
                for (let wildcardLength = 1; wildcardLength <= maxWildcardLength; wildcardLength += 1) {
                    wildcardValues.push(pathParts.slice(pathIndex, pathIndex + wildcardLength).join('.'));
                    if (match(schemaIndex + 1, pathIndex + wildcardLength)) {
                        return true;
                    }
                    wildcardValues.pop();
                }
                return false;
            }

            if (schemaPart !== pathParts[pathIndex]) return false;
            return match(schemaIndex + 1, pathIndex + 1);
        };

        return {
            matched: match(0, 0),
            wildcardValues: clone(wildcardValues)
        };
    };

    GUI.getSchemaKind = function getSchemaKind(path) {
        const schema = GUI.findSchemaEntry(path) || {};
        return String(schema && schema.structure && schema.structure.kind || '').trim().toLowerCase();
    };

    GUI.getUnionKinds = function getUnionKinds(path) {
        const schema = GUI.findSchemaEntry(path) || {};
        const oneOf = schema && schema.structure && Array.isArray(schema.structure.oneOf)
            ? schema.structure.oneOf
            : [];
        return oneOf
            .map((entry) => String(entry && entry.kind || '').trim().toLowerCase())
            .filter(Boolean);
    };

    GUI.getUnionEntries = function getUnionEntries(path) {
        const schema = GUI.findSchemaEntry(path) || {};
        const oneOf = schema && schema.structure && Array.isArray(schema.structure.oneOf)
            ? schema.structure.oneOf
            : [];
        return oneOf
            .map((entry) => {
                const kind = String(entry && entry.kind || '').trim().toLowerCase();
                if (!kind) return null;
                const name = String(entry && entry.name || '').trim();
                return {
                    value: kind,
                    name,
                    label: name ? `${kind} (${name})` : kind
                };
            })
            .filter(Boolean);
    };

    GUI.normalizeHexColor = function normalizeHexColor(value) {
        const raw = String(value == null ? '' : value).trim();
        if (!raw) return '';
        const withHash = raw.startsWith('#') ? raw : `#${raw}`;
        if (/^#[0-9a-f]{3}$/i.test(withHash)) {
            const [, r, g, b] = withHash;
            return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
        }
        if (/^#[0-9a-f]{6}$/i.test(withHash)) {
            return withHash.toLowerCase();
        }
        return '';
    };

    GUI.isColorLikeField = function isColorLikeField(path, value) {
        const schema = GUI.findSchemaEntry(path) || {};
        const key = String(schema.key || normalizePath(path) || '').trim().toLowerCase();
        const leaf = key.split('.').slice(-1)[0] || '';
        if (GUI.normalizeHexColor(value)) return true;
        return /(^|[-_.])(color|colour|text_color|background_color|border_color|fill|stroke)$/.test(leaf);
    };

    GUI.isDirectoryLikePathField = function isDirectoryLikePathField(path) {
        const schema = GUI.findSchemaEntry(path) || {};
        const key = String(schema.key || normalizePath(path) || '').trim().toLowerCase();
        const leaf = key.split('.').slice(-1)[0] || '';
        return /(dir|directory|folder|location|root|include_path|output_path|input_path|path)$/.test(leaf)
            && !/(url|uri|image|file|cert|key)$/.test(leaf);
    };

    GUI.inferPrimitiveType = function inferPrimitiveType(path, value) {
        const schema = GUI.findSchemaEntry(path) || {};
        const schemaKind = GUI.getSchemaKind(path);
        const schemaType = String(schema.type || '').trim().toLowerCase();

        if (schemaKind === 'array') return 'array';
        if (schemaKind === 'object') return 'object';
        if (schemaType === 'path') return 'path';
        if (schemaType === 'color') return 'color';
        if (schemaType === 'enum') {
            const enumSuggestions = Array.isArray(schema.enum) ? schema.enum : GUI.getSchemaSuggestions(schema);
            if (Array.isArray(enumSuggestions) && enumSuggestions.length > 0) return 'enum';
        }
        if (schemaType === 'boolean' || typeof value === 'boolean') return 'boolean';
        if (schemaType === 'integer') return 'integer';
        if (schemaType === 'number' || typeof value === 'number') {
            return Number.isInteger(value) && schemaType !== 'number' ? 'integer' : 'number';
        }
        if (value === null || schemaType === 'null') return 'null';
        if (Array.isArray(value)) return 'array';
        if (value && typeof value === 'object') return 'object';
        if (GUI.isColorLikeField(path, value)) return 'color';
        if (GUI.isDirectoryLikePathField(path)) return 'path';
        return 'string';
    };

    GUI.createDefaultValue = function createDefaultValue(path) {
        const schemaEntry = GUI.findSchemaEntry(path) || {};
        return GUI.createDefaultValueFromSchemaEntry(schemaEntry, path);
    };

    GUI.valueMatchesKind = function valueMatchesKind(value, kind) {
        const normalizedKind = String(kind || '').trim().toLowerCase();
        switch (normalizedKind) {
        case 'null':
            return value === null;
        case 'array':
            return Array.isArray(value);
        case 'object':
            return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
        case 'boolean':
            return typeof value === 'boolean';
        case 'integer':
            return typeof value === 'number' && Number.isInteger(value);
        case 'number':
            return typeof value === 'number';
        case 'string':
        case 'path':
        case 'color':
        case 'enum':
            return typeof value === 'string';
        default:
            return false;
        }
    };

    GUI.rememberUnionBranchValue = function rememberUnionBranchValue(path, kind, value) {
        const normalizedPath = normalizePath(path);
        const normalizedKind = String(kind || '').trim().toLowerCase();
        if (!normalizedPath || !normalizedKind) return;
        if (!STATE.configUnionBranchMemory || typeof STATE.configUnionBranchMemory !== 'object') {
            STATE.configUnionBranchMemory = {};
        }
        const branchState = STATE.configUnionBranchMemory[normalizedPath] && typeof STATE.configUnionBranchMemory[normalizedPath] === 'object'
            ? STATE.configUnionBranchMemory[normalizedPath]
            : {};
        branchState[normalizedKind] = clone(value);
        STATE.configUnionBranchMemory[normalizedPath] = branchState;
    };

    GUI.getRememberedUnionBranchValue = function getRememberedUnionBranchValue(path, kind) {
        const normalizedPath = normalizePath(path);
        const normalizedKind = String(kind || '').trim().toLowerCase();
        const branchState = STATE.configUnionBranchMemory && STATE.configUnionBranchMemory[normalizedPath];
        if (!branchState || typeof branchState !== 'object') return undefined;
        if (!Object.prototype.hasOwnProperty.call(branchState, normalizedKind)) return undefined;
        return clone(branchState[normalizedKind]);
    };

    GUI.createDefaultValueFromSchemaEntry = function createDefaultValueFromSchemaEntry(schemaEntry, path = '') {
        const entry = schemaEntry && typeof schemaEntry === 'object' ? schemaEntry : {};
        const schemaKind = String(entry && entry.structure && entry.structure.kind || '').trim().toLowerCase()
            || GUI.getSchemaKind(path);
        const schemaType = String(entry.type || '').trim().toLowerCase();

        if (typeof entry.default !== 'undefined') return clone(entry.default);
        if (schemaType === 'enum' && Array.isArray(entry.enum) && entry.enum.length > 0) return clone(entry.enum[0]);

        if (schemaKind === 'union') {
            const oneOf = Array.isArray(entry.structure && entry.structure.oneOf)
                ? entry.structure.oneOf
                : [];
            const preferredType = schemaType || String(oneOf[0] && oneOf[0].kind || '').trim().toLowerCase();
            const selected = oneOf.find((item) => String(item && item.kind || '').trim().toLowerCase() === preferredType)
                || oneOf[0]
                || {};
            return GUI.createDefaultValueFromSchemaEntry({
                key: entry.key,
                type: preferredType,
                enum: entry.enum,
                structure: selected.kind ? Object.assign({}, selected, { kind: selected.kind }) : {}
            }, path);
        }

        if (schemaKind === 'object') {
            const objectValue = {};
            const propertyKeys = Array.isArray(entry.structure && entry.structure.properties_keys)
                ? entry.structure.properties_keys
                : [];
            const baseKey = String(entry.key || '').trim();
            propertyKeys.forEach((propertyKey) => {
                const childKey = String(propertyKey || '').trim();
                if (!childKey || childKey.includes('.*')) return;
                if (!baseKey || !childKey.startsWith(`${baseKey}.`)) return;
                const suffix = childKey.slice(baseKey.length + 1).split('.').filter(Boolean);
                if (suffix.length !== 1) return;
                if (suffix[0].includes('[')) return;
                objectValue[suffix[0]] = GUI.createDefaultValue(childKey);
            });
            return objectValue;
        }

        if (schemaKind === 'array') return [];
        if (schemaType === 'boolean') return false;
        if (schemaType === 'integer' || schemaType === 'number') return 0;
        if (schemaType === 'null') return null;
        if (schemaType === 'object') return {};
        if (schemaType === 'array') return [];
        return '';
    };

    GUI.getValue = function getValue(path) {
        const parts = normalizePath(path).split('.').filter(Boolean);
        let cursor = STATE.configData;
        for (const part of parts) {
            if (cursor === null || typeof cursor !== 'object') return undefined;
            cursor = cursor[part];
        }
        return cursor;
    };

    GUI.setValue = function setValue(path, value, options = {}) {
        const parts = normalizePath(path).split('.').filter(Boolean);
        const normalizedOptions = options && typeof options === 'object' ? options : {};
        const uiStateOverride = normalizedOptions.uiStateOverride || null;
        const shouldRender = !Object.prototype.hasOwnProperty.call(normalizedOptions, 'render') || normalizedOptions.render !== false;
        if (parts.length <= 0) {
            STATE.configData = value;
            GUI.markConfigDirty();
            syncRawEditor();
            if (shouldRender) {
                GUI.renderConfigForm(uiStateOverride);
            }
            return;
        }

        let cursor = STATE.configData;
        for (let index = 0; index < parts.length - 1; index += 1) {
            const part = parts[index];
            if (cursor[part] === null || typeof cursor[part] !== 'object') {
                cursor[part] = {};
            }
            cursor = cursor[part];
        }

        cursor[parts[parts.length - 1]] = value;
        GUI.markConfigDirty();
        syncRawEditor();
        if (shouldRender) {
            GUI.renderConfigForm(uiStateOverride);
        }
    };

    GUI.deleteValue = function deleteValue(path) {
        const parts = normalizePath(path).split('.').filter(Boolean);
        if (parts.length <= 0) return;

        let cursor = STATE.configData;
        for (let index = 0; index < parts.length - 1; index += 1) {
            const part = parts[index];
            if (cursor === null || typeof cursor !== 'object') return;
            cursor = cursor[part];
        }

        const leaf = parts[parts.length - 1];
        if (Array.isArray(cursor) && /^\d+$/.test(leaf)) {
            cursor.splice(Number.parseInt(leaf, 10), 1);
        } else if (cursor && typeof cursor === 'object') {
            delete cursor[leaf];
        }

        GUI.markConfigDirty();
        syncRawEditor();
        GUI.renderConfigForm();
    };

    GUI.getNodeTitle = function getNodeTitle(path) {
        const schema = GUI.findSchemaEntry(path) || {};
        if (schema.label) return String(schema.label);
        const normalized = normalizePath(path);
        const schemaKey = String(schema.key || '').trim();
        if (schemaKey.endsWith('.*')) {
            const match = GUI.matchSchemaPath(schemaKey, normalized);
            if (match.matched && Array.isArray(match.wildcardValues) && match.wildcardValues.length > 0) {
                return match.wildcardValues[match.wildcardValues.length - 1];
            }
        }
        const leaf = normalized.split('.').slice(-1)[0] || 'root';
        return /^\d+$/.test(leaf) ? `Item ${leaf}` : leaf;
    };

    GUI.getArraySchemaInfo = function getArraySchemaInfo(path, value) {
        const schema = GUI.findSchemaEntry(path) || {};
        const directStructure = schema && schema.structure && typeof schema.structure === 'object'
            ? schema.structure
            : {};
        const unionBranches = Array.isArray(directStructure.oneOf) ? directStructure.oneOf : [];
        const selectedStructure = String(directStructure.kind || '').trim().toLowerCase() === 'union'
            ? (unionBranches.find((entry) => String(entry && entry.kind || '').trim().toLowerCase() === 'array') || {})
            : directStructure;
        const itemsKey = selectedStructure && selectedStructure.items_key
            ? String(selectedStructure.items_key).trim()
            : '';
        const itemsKind = selectedStructure && selectedStructure.items_kind
            ? String(selectedStructure.items_kind).trim().toLowerCase()
            : '';
        const itemSchema = itemsKey ? (GUI.findSchemaEntry(itemsKey) || {}) : {};
        return { itemsKey, itemsKind, itemSchema };
    };

    GUI.getArrayItemSchema = function getArrayItemSchema(path, value, index = 0) {
        const arraySchema = GUI.getArraySchemaInfo(path, value);
        if (arraySchema.itemSchema && Object.keys(arraySchema.itemSchema).length > 0) {
            return arraySchema.itemSchema;
        }
        if (!arraySchema.itemsKind) {
            return {};
        }
        return {
            key: `${normalizePath(path)}.${index}`,
            type: arraySchema.itemsKind,
            structure: ['object', 'array'].includes(arraySchema.itemsKind)
                ? { kind: arraySchema.itemsKind }
                : {}
        };
    };

    GUI.getArrayItemTypeLabel = function getArrayItemTypeLabel(path, value) {
        const arraySchema = GUI.getArraySchemaInfo(path, value);
        const schemaItemType = arraySchema.itemsKind || GUI.inferPrimitiveType(arraySchema.itemsKey || `${normalizePath(path)}.0`, undefined);
        const getDisplayItemType = (itemValue, index = 0, explicitType = '') => {
            const itemPath = arraySchema.itemsKey
                ? arraySchema.itemsKey.replace(/\[\]$/, `.${index}`)
                : `${normalizePath(path)}.${index}`;
            return GUI.getDisplayTypeLabel(itemPath, itemValue, arraySchema.itemSchema, explicitType);
        };

        if (Array.isArray(value) && value.length > 0) {
            const inferredTypes = Array.from(new Set(value.map((item, index) => getDisplayItemType(item, index)).filter(Boolean)));
            if (inferredTypes.length === 1) {
                return inferredTypes[0];
            }
            if (inferredTypes.length > 1) {
                return 'mixed';
            }
        }

        if (arraySchema.itemsKind) {
            return arraySchema.itemsKind;
        }

        if (arraySchema.itemSchema && Object.keys(arraySchema.itemSchema).length > 0) {
            return getDisplayItemType(undefined, 0, schemaItemType);
        }

        return 'unknown';
    };

    GUI.getDisplayTypeLabel = function getDisplayTypeLabel(path, value, schema = null, explicitType = '') {
        const entry = schema && typeof schema === 'object' ? schema : (GUI.findSchemaEntry(path) || {});
        const type = String(explicitType || GUI.inferPrimitiveType(path, value)).trim().toLowerCase();
        const formatKind = GUI.getSchemaFormatKind(entry);
        const suggestionsKind = String(entry.suggestions_kind || entry.suggestionsKind || '').trim().toLowerCase();
        const presetsKind = String(entry.presets_kind || entry.presetsKind || '').trim().toLowerCase();

        if (type === 'path') return 'string (path)';
        if (type === 'string' && (suggestionsKind === 'task' || presetsKind === 'task')) return 'string (task)';
        if (type === 'string' && formatKind === 'regex-pattern') return 'string (regex)';
        if (type === 'string' && formatKind === 'glob-pattern') return 'string (glob)';
        return type;
    };

    GUI.getNodeTypeLabel = function getNodeTypeLabel(path, value, explicitType = '') {
        const normalizedExplicitType = String(explicitType || '').trim().toLowerCase();
        const schema = GUI.findSchemaEntry(path) || {};
        const type = normalizedExplicitType || (Array.isArray(value)
            ? 'array'
            : value && typeof value === 'object'
                ? 'object'
                : GUI.inferPrimitiveType(path, value));
        const formatItemCount = (count) => `${count} item${count === 1 ? '' : 's'}`;

        if (type === 'array' && Array.isArray(value)) {
            return `array (${GUI.getArrayItemTypeLabel(path, value)}, ${formatItemCount(value.length)})`;
        }

        if (type === 'object' && value && typeof value === 'object' && !Array.isArray(value)) {
            return `object (${formatItemCount(Object.keys(value).length)})`;
        }

        return GUI.getDisplayTypeLabel(path, value, schema, type);
    };

    GUI.applyFieldHelp = function applyFieldHelp(targets, path, schema) {
        const normalizedPath = normalizePath(path) || '(root)';
        const heading = GUI.getNodeTitle(path) || normalizedPath;
        const description = String(schema && schema.description || '').trim();
        const text = description || `Edit ${normalizedPath}.`;

        (Array.isArray(targets) ? targets : [targets]).filter(Boolean).forEach((target) => {
            if (!(target instanceof HTMLElement)) return;
            if (target.dataset.tooltipHeading && target.dataset.tooltip) return;
            target.dataset.tooltipHeading = heading;
            target.dataset.tooltip = text;
        });
    };

    GUI.setConfigClickTooltip = function setConfigClickTooltip(target, heading, text) {
        if (!target) return target;
        target.dataset.tooltipHeading = String(heading || '').trim();
        target.dataset.tooltip = String(text || '').trim();
        return target;
    };

    GUI.getConfigToggleTooltipText = function getConfigToggleTooltipText(path, enabled) {
        const normalizedPath = normalizePath(path) || '(root)';
        return enabled
            ? `Disable ${normalizedPath}.`
            : `Enable ${normalizedPath}.`;
    };

    GUI.getConfigDropdownToggleTooltipText = function getConfigDropdownToggleTooltipText(path, noun = 'choices') {
        const normalizedPath = normalizePath(path) || '(root)';
        return `Open ${String(noun || 'choices').trim() || 'choices'} for ${normalizedPath}.`;
    };

    GUI.getConfigDropdownOptionTooltipText = function getConfigDropdownOptionTooltipText(path, value) {
        const normalizedPath = normalizePath(path) || '(root)';
        return `Select ${String(value == null ? '' : value)} for ${normalizedPath}.`;
    };

    GUI.getConfigTokenTooltipText = function getConfigTokenTooltipText(tokenValue) {
        return `Insert ${String(tokenValue || '').trim()} into the format string.`;
    };

    GUI.normalizeConfigDropdownEntry = function normalizeConfigDropdownEntry(entry) {
        if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
            const value = String(entry.value == null ? '' : entry.value).trim();
            if (!value) return null;
            const name = String(entry.name == null ? '' : entry.name).trim();
            const label = String(entry.label == null ? '' : entry.label).trim() || (name ? `${value} (${name})` : value);
            return { value, name, label };
        }

        const value = String(entry == null ? '' : entry).trim();
        if (!value) return null;
        return { value, name: '', label: value };
    };

    GUI.getConfigDropdownLabel = function getConfigDropdownLabel(entries, value, fallback = '') {
        const normalizedValue = String(value == null ? '' : value).trim();
        const normalizedEntries = Array.isArray(entries)
            ? entries.map((entry) => GUI.normalizeConfigDropdownEntry(entry)).filter(Boolean)
            : [];
        const match = normalizedEntries.find((entry) => entry.value === normalizedValue);
        if (match) return match.label;
        return normalizedValue || String(fallback || '');
    };

    GUI.getPrimitiveMetaType = function getPrimitiveMetaType(path, value, schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        const schemaKind = String(entry && entry.structure && entry.structure.kind || '').trim().toLowerCase()
            || GUI.getSchemaKind(path);
        const type = schemaKind === 'union'
            ? GUI.getCustomValueType(value, entry)
            : GUI.inferPrimitiveType(path, value);
        return GUI.getDisplayTypeLabel(path, value, schema, type);
    };

    GUI.createConfigMetaPillMarkup = function createConfigMetaPillMarkup(kind, value, extraClassName = '') {
        const normalizedKind = String(kind || '').trim().toLowerCase();
        const normalizedValue = String(value == null ? '' : value).trim() || '(root)';
        const pillClass = normalizedKind === 'path'
            ? 'config-primitive__tag config-primitive__tag--path'
            : 'config-primitive__tag';
        return `<span class="${[pillClass, String(extraClassName || '').trim()].filter(Boolean).join(' ')}">${escapeHtml(`${normalizedKind}: ${normalizedValue}`)}</span>`;
    };

    GUI.getSchemaSuggestions = function getSchemaSuggestions(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        const directSuggestions = Array.isArray(entry.suggestions)
            ? entry.suggestions
                .map((value) => GUI.normalizeConfigDropdownEntry(value))
                .filter(Boolean)
            : [];
        if (directSuggestions.length > 0) {
            const seen = new Set();
            return directSuggestions.filter((suggestion) => {
                if (seen.has(suggestion.value)) return false;
                seen.add(suggestion.value);
                return true;
            });
        }

        const suggestionKind = String(entry.suggestions_kind || entry.suggestionsKind || '').trim().toLowerCase();
        if (suggestionKind === 'locale') {
            return Array.isArray(GUI.LOCALE_SUGGESTIONS) ? GUI.LOCALE_SUGGESTIONS.slice() : [];
        }
        if (suggestionKind === 'task') {
            const tasksByCategory = STATE.bootstrap && Array.isArray(STATE.bootstrap.tasksByCategory)
                ? STATE.bootstrap.tasksByCategory
                : [];
            const seen = new Set();
            return tasksByCategory.flatMap((category) => {
                const tasks = category && Array.isArray(category.tasks) ? category.tasks : [];
                return tasks.map((task) => {
                    const value = String(task && task.name || '').trim();
                    if (!value || seen.has(value)) return null;
                    seen.add(value);
                    const name = String(task && task.comment || '').trim() || GUI.formatTaskLabel(value);
                    return GUI.normalizeConfigDropdownEntry({ value, name });
                }).filter(Boolean);
            });
        }

        return [];
    };

    GUI.getSchemaPresets = function getSchemaPresets(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        const directPresets = Array.isArray(entry.presets)
            ? entry.presets
                .map((preset) => GUI.normalizeConfigDropdownEntry(preset))
                .filter(Boolean)
            : [];
        const seen = new Set();
        const uniqueDirectPresets = directPresets.filter((preset) => {
            if (seen.has(preset.value)) return false;
            seen.add(preset.value);
            return true;
        });
        if (uniqueDirectPresets.length > 0) return uniqueDirectPresets;

        const presetsKind = String(entry.presets_kind || entry.presetsKind || '').trim().toLowerCase();
        if (presetsKind === 'task') {
            const tasksByCategory = STATE.bootstrap && Array.isArray(STATE.bootstrap.tasksByCategory)
                ? STATE.bootstrap.tasksByCategory
                : [];
            return tasksByCategory.flatMap((category) => {
                const tasks = category && Array.isArray(category.tasks) ? category.tasks : [];
                return tasks.map((task) => {
                    const value = String(task && task.name || '').trim();
                    if (!value || seen.has(value)) return null;
                    seen.add(value);
                    const name = String(task && task.comment || '').trim() || GUI.formatTaskLabel(value);
                    return GUI.normalizeConfigDropdownEntry({ value, name });
                }).filter(Boolean);
            });
        }

        return [];
    };

    GUI.getSchemaEnumNames = function getSchemaEnumNames(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        const source = entry.enum_names || entry.enumNames;
        if (!source || typeof source !== 'object' || Array.isArray(source)) return {};
        return Object.fromEntries(
            Object.entries(source)
                .map(([key, value]) => [String(key || '').trim(), String(value == null ? '' : value).trim()])
                .filter(([key, value]) => key && value)
        );
    };

    GUI.getLocaleOptionName = function getLocaleOptionName(value) {
        const normalizedValue = String(value == null ? '' : value).trim();
        if (!normalizedValue || normalizedValue.toLowerCase() === 'auto') return '';
        try {
            const locale = typeof Intl.Locale === 'function'
                ? new Intl.Locale(normalizedValue)
                : null;
            const displayLocale = GUI.getDateTimePreviewLocale() || 'en-US';
            const languageNames = typeof Intl.DisplayNames === 'function'
                ? new Intl.DisplayNames([displayLocale], { type: 'language' })
                : null;
            const regionNames = typeof Intl.DisplayNames === 'function'
                ? new Intl.DisplayNames([displayLocale], { type: 'region' })
                : null;
            const scriptNames = typeof Intl.DisplayNames === 'function'
                ? new Intl.DisplayNames([displayLocale], { type: 'script' })
                : null;

            const parts = [];
            if (locale && languageNames && locale.language) {
                const language = languageNames.of(locale.language);
                if (language) parts.push(language);
            }
            if (locale && scriptNames && locale.script) {
                const script = scriptNames.of(locale.script);
                if (script) parts.push(script);
            }
            if (locale && regionNames && locale.region) {
                const region = regionNames.of(locale.region);
                if (region) parts.push(region);
            }
            if (parts.length > 0) {
                return parts.join(', ');
            }
        } catch {}
        return '';
    };

    GUI.getSchemaEnumName = function getSchemaEnumName(schema, value) {
        const normalizedValue = String(value == null ? '' : value).trim();
        if (!normalizedValue) return '';

        const directNames = GUI.getSchemaEnumNames(schema);
        if (directNames[normalizedValue]) {
            return directNames[normalizedValue];
        }

        const entry = schema && typeof schema === 'object' ? schema : {};
        const namesKind = String(entry.enum_names_kind || entry.enumNamesKind || '').trim().toLowerCase();
        if (namesKind === 'locale') {
            return GUI.getLocaleOptionName(normalizedValue);
        }

        return '';
    };

    GUI.getSchemaEnumOptions = function getSchemaEnumOptions(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        const values = Array.isArray(entry.enum) && entry.enum.length > 0
            ? entry.enum
            : GUI.getSchemaSuggestions(entry);
        const seen = new Set();

        return values
            .map((rawValue) => String(rawValue == null ? '' : rawValue).trim())
            .filter((value) => {
                if (!value || seen.has(value)) return false;
                seen.add(value);
                return true;
            })
            .map((value) => {
                const name = GUI.getSchemaEnumName(entry, value);
                return {
                    value,
                    name,
                    label: name ? `${value} (${name})` : value
                };
            });
    };

    GUI.getSchemaFormatKind = function getSchemaFormatKind(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        return String(entry.format_kind || entry.formatKind || '').trim().toLowerCase();
    };

    GUI.getSchemaRegexMode = function getSchemaRegexMode(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        return String(entry.regex_mode || entry.regexMode || '').trim().toLowerCase();
    };

    GUI.getSchemaTestInput = function getSchemaTestInput(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        return String(entry.test_input || entry.testInput || '').trim();
    };

    GUI.getSchemaPreviewMode = function getSchemaPreviewMode(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        return String(entry.preview_mode || entry.previewMode || '').trim().toLowerCase();
    };

    GUI.getSchemaPreviewLabel = function getSchemaPreviewLabel(schema, fallback = 'Preview') {
        const entry = schema && typeof schema === 'object' ? schema : {};
        return String(entry.preview_label || entry.previewLabel || fallback).trim() || fallback;
    };

    GUI.getSchemaPreviewJoiner = function getSchemaPreviewJoiner(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        return String(entry.preview_joiner || entry.previewJoiner || ' ');
    };

    GUI.globPatternToRegExp = function globPatternToRegExp(pattern) {
        const raw = String(pattern || '').trim();
        if (!raw) {
            throw new Error('Pattern is empty.');
        }

        const source = raw.replace(/^!/, '');
        let regex = '^';
        for (let index = 0; index < source.length; index += 1) {
            const char = source[index];
            const next = source[index + 1];

            if (char === '*') {
                if (next === '*') {
                    regex += '.*';
                    index += 1;
                } else {
                    regex += '[^/]*';
                }
                continue;
            }

            if (char === '?') {
                regex += '[^/]';
                continue;
            }

            if (char === '[') {
                const closingIndex = source.indexOf(']', index + 1);
                if (closingIndex <= index + 1) {
                    throw new Error('Unclosed character class.');
                }
                const classBody = source.slice(index + 1, closingIndex);
                regex += `[${classBody}]`;
                index = closingIndex;
                continue;
            }

            if (/[-/\\^$+?.()|{}]/.test(char)) {
                regex += `\\${char}`;
                continue;
            }

            regex += char;
        }

        regex += '$';
        return new RegExp(regex);
    };

    GUI.globPatternMatches = function globPatternMatches(pattern, sample) {
        const regex = GUI.globPatternToRegExp(pattern);
        const normalizedSample = String(sample || '').trim().replace(/\\/g, '/');
        const isNegated = String(pattern || '').trim().startsWith('!');
        const matched = regex.test(normalizedSample);
        return isNegated ? !matched : matched;
    };

    GUI.normalizeSchemaTokenDefinition = function normalizeSchemaTokenDefinition(token) {
        if (token && typeof token === 'object' && !Array.isArray(token)) {
            const value = String(token.value || token.token || '').trim();
            if (!value) return null;
            return {
                value,
                name: String(token.name || '').trim(),
                preview: String(token.preview || '').trim()
            };
        }

        const value = String(token == null ? '' : token).trim();
        if (!value) return null;
        return {
            value,
            name: '',
            preview: ''
        };
    };

    GUI.getSchemaTokenDefinitions = function getSchemaTokenDefinitions(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        return Array.isArray(entry.tokens)
            ? entry.tokens.map((token) => GUI.normalizeSchemaTokenDefinition(token)).filter(Boolean)
            : [];
    };

    GUI.getSchemaTokens = function getSchemaTokens(schema) {
        return GUI.getSchemaTokenDefinitions(schema).map((token) => token.value);
    };

    GUI.getSchemaPartDefinitions = function getSchemaPartDefinitions(schema) {
        const entry = schema && typeof schema === 'object' ? schema : {};
        return Array.isArray(entry.parts)
            ? entry.parts.map((part) => GUI.normalizeSchemaTokenDefinition(part)).filter(Boolean)
            : [];
    };

    GUI.getDateTimePreviewLocale = function getDateTimePreviewLocale() {
        const rawLocale = String(GUI.getValue('timestamp.locale') || 'auto').trim();
        if (!rawLocale || rawLocale.toLowerCase() === 'auto') {
            try {
                return Intl.DateTimeFormat().resolvedOptions().locale || 'en-US';
            } catch {
                return 'en-US';
            }
        }
        return rawLocale;
    };

    GUI.getDateTimePreviewZone = function getDateTimePreviewZone() {
        return String(GUI.getValue('timestamp.zone') || 'local').trim().toLowerCase() === 'utc' ? 'utc' : 'local';
    };

    GUI.getDateTimePreviewParts = function getDateTimePreviewParts(date, zone) {
        const useUtc = String(zone || '').trim().toLowerCase() === 'utc';
        return {
            year: useUtc ? date.getUTCFullYear() : date.getFullYear(),
            month: (useUtc ? date.getUTCMonth() : date.getMonth()) + 1,
            day: useUtc ? date.getUTCDate() : date.getDate(),
            weekday: useUtc ? date.getUTCDay() : date.getDay(),
            hour24: useUtc ? date.getUTCHours() : date.getHours(),
            minute: useUtc ? date.getUTCMinutes() : date.getMinutes(),
            second: useUtc ? date.getUTCSeconds() : date.getSeconds(),
            ms: useUtc ? date.getUTCMilliseconds() : date.getMilliseconds()
        };
    };

    GUI.getDateTimeFormatReference = function getDateTimeFormatReference() {
        return new Date('2026-04-03T17:08:09.123Z');
    };

    GUI.getDateTimePreviewTimeZone = function getDateTimePreviewTimeZone(zone) {
        return String(zone || '').trim().toLowerCase() === 'utc' ? 'UTC' : undefined;
    };

    GUI.getDateTimePreviewOffsetMinutes = function getDateTimePreviewOffsetMinutes(date, zone) {
        if (String(zone || '').trim().toLowerCase() === 'utc') return 0;
        return -date.getTimezoneOffset();
    };

    GUI.getDateTimePreviewOffsetText = function getDateTimePreviewOffsetText(offsetMinutes, withColon) {
        if (!Number.isFinite(offsetMinutes) || offsetMinutes === 0) {
            return withColon ? 'Z' : 'Z';
        }
        const sign = offsetMinutes >= 0 ? '+' : '-';
        const absolute = Math.abs(offsetMinutes);
        const hours = String(Math.floor(absolute / 60)).padStart(2, '0');
        const minutes = String(absolute % 60).padStart(2, '0');
        return withColon ? `${sign}${hours}:${minutes}` : `${sign}${hours}${minutes}`;
    };

    GUI.getDateTimePreviewName = function getDateTimePreviewName(date, locale, zone, width) {
        try {
            const formatter = new Intl.DateTimeFormat(locale || 'en-US', {
                timeZone: GUI.getDateTimePreviewTimeZone(zone),
                timeZoneName: width
            });
            const part = formatter.formatToParts(date).find((entry) => entry.type === 'timeZoneName');
            return part ? part.value : (String(zone || '').trim().toLowerCase() === 'utc' ? 'UTC' : '');
        } catch {
            return String(zone || '').trim().toLowerCase() === 'utc' ? 'UTC' : '';
        }
    };

    GUI.getDateTimePreviewMonthName = function getDateTimePreviewMonthName(date, locale, zone, width) {
        try {
            return new Intl.DateTimeFormat(locale || 'en-US', {
                timeZone: GUI.getDateTimePreviewTimeZone(zone),
                month: width
            }).format(date);
        } catch {
            const fallback = GUI.getDateTimePreviewParts(date, zone).month;
            return String(fallback);
        }
    };

    GUI.getDateTimePreviewWeekdayName = function getDateTimePreviewWeekdayName(date, locale, zone, width) {
        try {
            return new Intl.DateTimeFormat(locale || 'en-US', {
                timeZone: GUI.getDateTimePreviewTimeZone(zone),
                weekday: width
            }).format(date);
        } catch {
            return '';
        }
    };

    GUI.tokenizeDateTimeFormat = function tokenizeDateTimeFormat(format, tokens) {
        const source = String(format == null ? '' : format);
        const sortedTokens = (Array.isArray(tokens) ? tokens : [])
            .map((token) => String(token))
            .sort((left, right) => right.length - left.length);
        const out = [];
        let index = 0;
        while (index < source.length) {
            const hit = sortedTokens.find((token) => source.slice(index, index + token.length) === token);
            if (hit) {
                out.push({ type: 'token', value: hit });
                index += hit.length;
                continue;
            }
            out.push({ type: 'literal', value: source[index] });
            index += 1;
        }
        return out;
    };

    GUI.formatDateTimePreview = function formatDateTimePreview(format, schema) {
        const rawFormat = String(format == null ? '' : format).trim();
        if (!rawFormat || rawFormat.toLowerCase() === 'iso') {
            return GUI.getDateTimeFormatReference().toISOString();
        }

        const tokens = GUI.getSchemaTokens(schema);
        const entries = GUI.tokenizeDateTimeFormat(rawFormat, tokens);
        const date = GUI.getDateTimeFormatReference();
        const zone = GUI.getDateTimePreviewZone();
        const locale = GUI.getDateTimePreviewLocale();
        const parts = GUI.getDateTimePreviewParts(date, zone);
        const hour12 = (parts.hour24 % 12) || 12;
        const meridiemUpper = parts.hour24 >= 12 ? 'PM' : 'AM';
        const meridiemLower = meridiemUpper.toLowerCase();
        const offsetMinutes = GUI.getDateTimePreviewOffsetMinutes(date, zone);

        return entries.map((entry) => {
            if (entry.type === 'literal') return entry.value;
            switch (entry.value) {
            case 'YYYY': return String(parts.year).padStart(4, '0');
            case 'YY': return String(parts.year % 100).padStart(2, '0');
            case 'MMMM': return GUI.getDateTimePreviewMonthName(date, locale, zone, 'long');
            case 'MMM': return GUI.getDateTimePreviewMonthName(date, locale, zone, 'short');
            case 'MM': return String(parts.month).padStart(2, '0');
            case 'M': return String(parts.month);
            case 'DD': return String(parts.day).padStart(2, '0');
            case 'D': return String(parts.day);
            case 'dddd': return GUI.getDateTimePreviewWeekdayName(date, locale, zone, 'long');
            case 'ddd': return GUI.getDateTimePreviewWeekdayName(date, locale, zone, 'short');
            case 'HH': return String(parts.hour24).padStart(2, '0');
            case 'H': return String(parts.hour24);
            case 'hh': return String(hour12).padStart(2, '0');
            case 'h': return String(hour12);
            case 'mm': return String(parts.minute).padStart(2, '0');
            case 'm': return String(parts.minute);
            case 'ss': return String(parts.second).padStart(2, '0');
            case 's': return String(parts.second);
            case 'SSS': return String(parts.ms).padStart(3, '0');
            case 'A': return meridiemUpper;
            case 'a': return meridiemLower;
            case 'ZZ': return GUI.getDateTimePreviewOffsetText(offsetMinutes, false);
            case 'Z': return GUI.getDateTimePreviewOffsetText(offsetMinutes, true);
            case 'zzzz': return GUI.getDateTimePreviewName(date, locale, zone, 'long');
            case 'z': return GUI.getDateTimePreviewName(date, locale, zone, 'short');
            default: return entry.value;
            }
        }).join('');
    };

    GUI.getDateTimeTokenPreview = function getDateTimeTokenPreview(token, schema) {
        const tokenDefinition = GUI.normalizeSchemaTokenDefinition(token);
        if (!tokenDefinition) return '';
        if (tokenDefinition.preview) return tokenDefinition.preview;
        return GUI.formatDateTimePreview(tokenDefinition.value, schema);
    };

    GUI.getDateTimeTokenPreviewShort = function getDateTimeTokenPreviewShort(token, schema) {
        return GUI.getDateTimeTokenPreview(token, schema);
    };
    GUI.createPrimitiveHint = function createPrimitiveHint(path, type, schema, options = {}) {
        const normalizedPath = normalizePath(path) || '(root)';
        const hint = document.createElement('div');
        hint.className = ['config-inline-grid', String(options.className || '').trim()].filter(Boolean).join(' ');
        hint.innerHTML = `
            <div class="config-primitive__tags">
                ${GUI.createConfigMetaPillMarkup('path', normalizedPath)}
                ${GUI.createConfigMetaPillMarkup('type', type)}
                ${schema && schema.task_chain && schema.task_chain.length ? `<span class="config-primitive__tag">tasks: ${escapeHtml(schema.task_chain.join(', '))}</span>` : ''}
            </div>
            ${schema && schema.description ? `<div class="config-primitive__hint">${escapeHtml(schema.description)}</div>` : '<div class="config-primitive__hint"></div>'}
        `;
        const applyTooltip = !Object.prototype.hasOwnProperty.call(options, 'applyTooltip') || Boolean(options.applyTooltip);
        if (applyTooltip) {
            GUI.applyFieldHelp(hint, path, schema || {});
        }
        return hint;
    };

    GUI.createPrimitiveHeaderMeta = function createPrimitiveHeaderMeta(path, type, schema, options = {}) {
        const normalizedPath = normalizePath(path) || '(root)';
        const classPrefix = String(options.classPrefix || 'config-object-entry').trim();

        const meta = document.createElement('div');
        meta.className = `${classPrefix}__meta config-primitive__tags`;
        meta.innerHTML = `
            ${GUI.createConfigMetaPillMarkup('path', normalizedPath)}
            ${GUI.createConfigMetaPillMarkup('type', type)}
            ${schema && schema.task_chain && schema.task_chain.length ? `<span class="config-primitive__tag">tasks: ${escapeHtml(schema.task_chain.join(', '))}</span>` : ''}
        `;

        const hint = schema && schema.description
            ? (() => {
                const node = document.createElement('div');
                node.className = `${classPrefix}__hint config-primitive__hint`;
                node.textContent = String(schema.description || '');
                return node;
            })()
            : null;

        return { meta, hint };
    };

    GUI.appendPrimitiveField = function appendPrimitiveField(wrapper, path, type, schema, nodes = [], options = {}) {
        if (!wrapper) return;
        const includeMeta = !Object.prototype.hasOwnProperty.call(options, 'includeMeta') || Boolean(options.includeMeta);
        if (includeMeta) {
            wrapper.appendChild(GUI.createPrimitiveHint(path, type, schema, {
                applyTooltip: !Object.prototype.hasOwnProperty.call(options, 'metaTooltip') || Boolean(options.metaTooltip)
            }));
        }
        (Array.isArray(nodes) ? nodes : [nodes]).filter(Boolean).forEach((node) => wrapper.appendChild(node));
    };

    GUI.bindPrimitiveField = function bindPrimitiveField(target, path, role, options = {}) {
        if (!target || options.bindField === false) return;
        GUI.bindConfigField(target, path, role);
    };

    GUI.shouldApplyPrimitiveFieldHelp = function shouldApplyPrimitiveFieldHelp(options = {}) {
        return !Object.prototype.hasOwnProperty.call(options, 'applyHelp') || Boolean(options.applyHelp);
    };

    GUI.commitPrimitiveValue = function commitPrimitiveValue(path, value, options = {}) {
        if (typeof options.onChange === 'function') {
            options.onChange(value);
            return;
        }
        GUI.setValue(path, value);
    };

    GUI.setConfigNodeCollapseTooltip = function setConfigNodeCollapseTooltip(header, title, collapsed) {
        return;
    };

    GUI.getConfigSectionStateKey = function getConfigSectionStateKey(sectionKey) {
        return `tree:${String(sectionKey || '').trim()}`;
    };

    GUI.isConfigSectionCollapsed = function isConfigSectionCollapsed(sectionKey) {
        const state = STATE.configSectionState && typeof STATE.configSectionState === 'object'
            ? STATE.configSectionState
            : {};
        const key = GUI.getConfigSectionStateKey(sectionKey);
        if (Object.prototype.hasOwnProperty.call(state, key)) {
            return Boolean(state[key]);
        }
        const normalizedSectionKey = String(sectionKey || '').trim();
        return Boolean(normalizedSectionKey);
    };

    GUI.saveConfigSectionState = async function saveConfigSectionState() {
        if (!STATE.activeTopTab || STATE.activeTopTab !== 'config') {
            STATE.configSectionStateSavePromise = null;
            return;
        }

        const snapshot = clone(STATE.configSectionState || {});
        const request = api('/api/config-ui-cache', {
            method: 'POST',
            body: {
                mode: STATE.configMode,
                dir: STATE.selectedProject,
                cache: {
                    version: 1,
                    config_sections: snapshot
                }
            }
        });

        STATE.configSectionStateSavePromise = request
            .catch((error) => {
                throw error;
            })
            .finally(() => {
                if (STATE.configSectionStateSavePromise === request || STATE.configSectionStateSavePromise === wrappedRequest) {
                    STATE.configSectionStateSavePromise = null;
                }
            });

        const wrappedRequest = STATE.configSectionStateSavePromise;
        await wrappedRequest;
    };

    GUI.setConfigSectionCollapsed = function setConfigSectionCollapsed(sectionKey, collapsed) {
        const state = STATE.configSectionState && typeof STATE.configSectionState === 'object'
            ? clone(STATE.configSectionState)
            : {};
        state[GUI.getConfigSectionStateKey(sectionKey)] = Boolean(collapsed);
        STATE.configSectionState = state;
        GUI.saveConfigSectionState().catch(() => {});
    };

    GUI.setConfigSectionsCollapsed = function setConfigSectionsCollapsed(sectionKeys, collapsed) {
        const keys = Array.from(new Set((Array.isArray(sectionKeys) ? sectionKeys : [sectionKeys])
            .map((sectionKey) => String(sectionKey || '').trim())
            .filter(Boolean)));
        if (keys.length <= 0) return;

        const state = STATE.configSectionState && typeof STATE.configSectionState === 'object'
            ? clone(STATE.configSectionState)
            : {};
        keys.forEach((sectionKey) => {
            state[GUI.getConfigSectionStateKey(sectionKey)] = Boolean(collapsed);
        });
        STATE.configSectionState = state;
        GUI.saveConfigSectionState().catch(() => {});
    };

    GUI.applyConfigNodeCollapsed = function applyConfigNodeCollapsed(node, collapsed) {
        if (!node || !(node instanceof HTMLElement)) return;
        const nextCollapsed = Boolean(collapsed);
        node.dataset.collapsed = nextCollapsed ? 'true' : 'false';
        const body = node.querySelector(':scope > .config-node__body');
        if (body) {
            body.hidden = nextCollapsed;
        }
        const toggle = node.querySelector(':scope > .config-node__header .config-node__toggle');
        if (toggle) {
            toggle.setAttribute('aria-expanded', nextCollapsed ? 'false' : 'true');
        }
    };

    GUI.toggleConfigNodeCollapsed = function toggleConfigNodeCollapsed(node, options = {}) {
        if (!node || !(node instanceof HTMLElement)) return;
        const nextCollapsed = !Boolean(node.dataset.collapsed === 'true');
        const includeDescendants = Boolean(options.includeDescendants);
        const targets = includeDescendants
            ? [node, ...Array.from(node.querySelectorAll('.config-node[data-collapsible=\"true\"]'))]
            : [node];
        const sectionKeys = targets
            .map((target) => String(target.dataset.configSection || '').trim())
            .filter(Boolean);

        targets.forEach((target) => {
            GUI.applyConfigNodeCollapsed(target, nextCollapsed);
        });
        GUI.setConfigSectionsCollapsed(sectionKeys, nextCollapsed);
    };

    GUI.expandConfigSection = function expandConfigSection(sectionKey) {
        const normalizedSectionKey = String(sectionKey || '').trim();
        if (!normalizedSectionKey) return;
        GUI.setConfigSectionCollapsed(normalizedSectionKey, false);
    };

    GUI.bindConfigField = function bindConfigField(node, path, role = '') {
        if (!node) return node;
        node.dataset.configPath = normalizePath(path);
        if (role) {
            node.dataset.configFocusRole = String(role);
        }
        if (node instanceof HTMLTextAreaElement) {
            node.spellcheck = false;
        } else if (node instanceof HTMLInputElement) {
            const normalizedType = String(node.type || 'text').trim().toLowerCase();
            if (!['checkbox', 'radio', 'color', 'number', 'range', 'file', 'hidden'].includes(normalizedType)) {
                node.spellcheck = false;
            }
        }
        return node;
    };

    GUI.captureConfigUiState = function captureConfigUiState() {
        const activeElement = document.activeElement;
        const state = {
            scrollTop: document.scrollingElement ? document.scrollingElement.scrollTop : 0,
            focus: null
        };

        if (!activeElement) return state;

        if (activeElement === UI.configEditor) {
            state.focus = {
                kind: 'raw',
                selectionStart: typeof activeElement.selectionStart === 'number' ? activeElement.selectionStart : null,
                selectionEnd: typeof activeElement.selectionEnd === 'number' ? activeElement.selectionEnd : null
            };
            return state;
        }

        const boundTarget = activeElement.closest('[data-config-path]');
        if (!boundTarget) return state;

        state.focus = {
            kind: 'field',
            path: String(boundTarget.dataset.configPath || ''),
            role: String(boundTarget.dataset.configFocusRole || ''),
            selectionStart: typeof boundTarget.selectionStart === 'number' ? boundTarget.selectionStart : null,
            selectionEnd: typeof boundTarget.selectionEnd === 'number' ? boundTarget.selectionEnd : null
        };
        return state;
    };

    GUI.restoreConfigUiState = function restoreConfigUiState(previousState) {
        if (!previousState || typeof previousState !== 'object') return;

        window.requestAnimationFrame(() => {
            try {
                if (document.scrollingElement && Number.isFinite(previousState.scrollTop)) {
                    document.scrollingElement.scrollTop = previousState.scrollTop;
                }
            } catch {}

            const focus = previousState.focus;
            if (!focus || typeof focus !== 'object') return;

            let target = null;
            if (focus.kind === 'raw') {
                target = UI.configEditor;
            } else if (focus.kind === 'field') {
                target = Array.from(document.querySelectorAll('[data-config-path]')).find((node) => {
                    if (String(node.dataset.configPath || '') !== String(focus.path || '')) return false;
                    if (focus.role && String(node.dataset.configFocusRole || '') !== String(focus.role || '')) return false;
                    return true;
                }) || null;
            }

            if (!target || typeof target.focus !== 'function') return;
            try {
                target.focus({ preventScroll: true });
            } catch {
                try {
                    target.focus();
                } catch {}
            }
            if (typeof focus.selectionStart === 'number' && typeof target.setSelectionRange === 'function') {
                try {
                    target.setSelectionRange(
                        focus.selectionStart,
                        typeof focus.selectionEnd === 'number' ? focus.selectionEnd : focus.selectionStart
                    );
                } catch {}
            }
        });
    };

    GUI.createNodeShell = function createNodeShell(path, title, description, bodyNode, actionsNode, options = {}) {
        const wrapper = document.createElement('section');
        wrapper.className = 'config-node';
        const sectionKey = String(options.sectionKey || path || '(root)').trim() || '(root)';
        const collapsible = Boolean(options.collapsible);
        const collapsed = collapsible ? GUI.isConfigSectionCollapsed(sectionKey) : false;
        const typeLabel = String(options.typeLabel || '').trim().toLowerCase();

        const header = document.createElement('header');
        header.className = 'config-node__header';
        const heading = document.createElement('div');
        heading.className = 'config-node__heading';
        let body = null;
        if (collapsible) {
            header.classList.add('config-node__header--collapsible');
            wrapper.dataset.collapsible = 'true';
            wrapper.dataset.configSection = sectionKey;
            wrapper.dataset.collapsed = collapsed ? 'true' : 'false';
            GUI.setConfigNodeCollapseTooltip(header, title, collapsed);

            const toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'config-node__toggle';
            toggle.innerHTML = `
                <span class="config-node__toggle-chevron" aria-hidden="true"></span>
                <span class="config-node__toggle-copy">
                    <h3 class="config-node__title">${escapeHtml(title)}</h3>
                    <span class="config-node__meta">
                        ${GUI.createConfigMetaPillMarkup('path', path || '(root)', 'config-node__path')}
                        ${typeLabel ? GUI.createConfigMetaPillMarkup('type', typeLabel, 'config-node__type') : ''}
                    </span>
                    ${description ? `<p class="config-node__description">${escapeHtml(description)}</p>` : ''}
                </span>
            `;
            toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
            toggle.addEventListener('click', (event) => {
                event.stopPropagation();
                GUI.toggleConfigNodeCollapsed(wrapper, {
                    includeDescendants: event.ctrlKey || event.shiftKey || event.altKey
                });
            });
            heading.appendChild(toggle);

            header.addEventListener('click', (event) => {
                const target = event.target;
                if (!(target instanceof Element)) return;
                if (target.closest('.config-node__actions')) return;
                if (target.closest('.config-node__toggle')) return;
                GUI.toggleConfigNodeCollapsed(wrapper, {
                    includeDescendants: event.ctrlKey || event.shiftKey || event.altKey
                });
            });
        } else {
            heading.innerHTML = `
                <h3 class="config-node__title">${escapeHtml(title)}</h3>
                <span class="config-node__meta">
                    ${GUI.createConfigMetaPillMarkup('path', path || '(root)', 'config-node__path')}
                    ${typeLabel ? GUI.createConfigMetaPillMarkup('type', typeLabel, 'config-node__type') : ''}
                </span>
                ${description ? `<p class="config-node__description">${escapeHtml(description)}</p>` : ''}
            `;
        }
        header.appendChild(heading);

        body = document.createElement('div');
        body.className = 'config-node__body';
        body.hidden = collapsed;
        if (bodyNode) body.appendChild(bodyNode);

        if (actionsNode && actionsNode.childNodes.length > 0) {
            const actions = document.createElement('div');
            actions.className = 'config-node__actions';
            actions.appendChild(actionsNode);
            header.appendChild(actions);
        }

        wrapper.append(header, body);
        return wrapper;
    };

    GUI.createConfigSubpanelShell = function createConfigSubpanelShell(title, bodyNode, options = {}) {
        const wrapper = document.createElement('section');
        wrapper.className = 'config-node';
        const sectionKey = String(options.sectionKey || title || 'subpanel').trim() || 'subpanel';
        const description = String(options.description || '').trim();
        const titleClassName = String(options.titleClassName || '').trim();
        const collapsible = !Object.prototype.hasOwnProperty.call(options, 'collapsible') || Boolean(options.collapsible);
        const collapsed = collapsible ? GUI.isConfigSectionCollapsed(sectionKey) : false;

        const header = document.createElement('header');
        header.className = 'config-node__header';
        const heading = document.createElement('div');
        heading.className = 'config-node__heading';

        if (collapsible) {
            header.classList.add('config-node__header--collapsible');
            wrapper.dataset.collapsible = 'true';
            wrapper.dataset.configSection = sectionKey;
            wrapper.dataset.collapsed = collapsed ? 'true' : 'false';
            GUI.setConfigNodeCollapseTooltip(header, title, collapsed);

            const toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'config-node__toggle';
            toggle.innerHTML = `
                <span class="config-node__toggle-chevron" aria-hidden="true"></span>
                <span class="config-node__toggle-copy">
                    <h3 class="config-node__title ${escapeHtml(titleClassName)}">${escapeHtml(title)}</h3>
                    ${description ? `<p class="config-node__description">${escapeHtml(description)}</p>` : ''}
                </span>
            `;
            toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
            toggle.addEventListener('click', (event) => {
                event.stopPropagation();
                GUI.toggleConfigNodeCollapsed(wrapper, {
                    includeDescendants: event.ctrlKey || event.shiftKey || event.altKey
                });
            });
            heading.appendChild(toggle);

            header.addEventListener('click', (event) => {
                const target = event.target;
                if (!(target instanceof Element)) return;
                if (target.closest('.config-node__toggle')) return;
                GUI.toggleConfigNodeCollapsed(wrapper, {
                    includeDescendants: event.ctrlKey || event.shiftKey || event.altKey
                });
            });
        } else {
            heading.innerHTML = `
                <h3 class="config-node__title ${escapeHtml(titleClassName)}">${escapeHtml(title)}</h3>
                ${description ? `<p class="config-node__description">${escapeHtml(description)}</p>` : ''}
            `;
        }

        header.appendChild(heading);

        const body = document.createElement('div');
        body.className = 'config-node__body';
        body.hidden = collapsed;
        if (bodyNode) body.appendChild(bodyNode);

        wrapper.append(header, body);
        return wrapper;
    };

    GUI.appendNodeAction = function appendNodeAction(node, actionButton) {
        if (!node || !actionButton) return;
        const header = node.querySelector(':scope > .config-node__header');
        if (!header) return;
        let actions = header.querySelector(':scope > .config-node__actions');
        if (!actions) {
            actions = document.createElement('div');
            actions.className = 'config-node__actions';
            header.appendChild(actions);
        }
        actions.appendChild(actionButton);
    };

    GUI.createConfigActionButton = function createConfigActionButton(label, iconClass, options = {}) {
        const useSoloPattern = !Object.prototype.hasOwnProperty.call(options, 'solo') || Boolean(options.solo);
        const button = document.createElement('button');
        button.type = 'button';
        button.className = [
            'button',
            'button--small',
            'button--icon-action',
            'gui-icon-button',
            iconClass || '',
            iconClass && String(iconClass).includes('trashcan') ? 'button--danger' : '',
            options.primary ? 'button--primary' : '',
            useSoloPattern ? 'button--icon-action--solo' : '',
            String(options.className || '').trim()
        ].filter(Boolean).join(' ');
        if (options.tooltipHeading || options.tooltip) {
            GUI.setConfigClickTooltip(
                button,
                String(options.tooltipHeading || label || '').trim(),
                String(options.tooltip || '').trim()
            );
        }
        const labelNode = document.createElement('span');
        labelNode.className = 'button--icon-action__label';
        labelNode.textContent = String(label || '');
        button.appendChild(labelNode);
        if (options.disabled) {
            button.disabled = true;
        }
        return button;
    };

    GUI.moveArrayItem = function moveArrayItem(path, fromIndex, toIndex) {
        const current = GUI.getValue(path);
        if (!Array.isArray(current)) return;
        const from = Number(fromIndex);
        const to = Number(toIndex);
        if (!Number.isInteger(from) || !Number.isInteger(to)) return;
        if (from < 0 || to < 0 || from >= current.length || to >= current.length || from === to) return;

        const next = clone(current);
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        GUI.expandConfigSection(path);
        GUI.setValue(path, next);
    };

    GUI.createArrayItemActionButtons = function createArrayItemActionButtons(path, index, total, removeButton = null) {
        const actions = document.createElement('div');
        actions.className = 'config-array-entry__actions';

        const moveUpButton = GUI.createConfigActionButton('Move Up', 'font-icon--interface--arrow-down', {
            className: 'config-move-button config-move-button--up',
            tooltipHeading: 'Move Item Up',
            tooltip: `Move item ${index} up in ${normalizePath(path) || '(root)'}.`,
            disabled: index <= 0
        });
        moveUpButton.addEventListener('click', () => GUI.moveArrayItem(path, index, index - 1));

        const moveDownButton = GUI.createConfigActionButton('Move Down', 'font-icon--interface--arrow-down', {
            className: 'config-move-button config-move-button--down',
            tooltipHeading: 'Move Item Down',
            tooltip: `Move item ${index} down in ${normalizePath(path) || '(root)'}.`,
            disabled: index >= total - 1
        });
        moveDownButton.addEventListener('click', () => GUI.moveArrayItem(path, index, index + 1));

        actions.append(moveUpButton, moveDownButton);
        if (removeButton) {
            actions.appendChild(removeButton);
        }
        return actions;
    };

    GUI.isProjectConfigMode = function isProjectConfigMode() {
        return String(STATE.configMode || '').trim().toLowerCase() === 'project';
    };

    GUI.getProjectSchemaDocument = function getProjectSchemaDocument() {
        const model = STATE.configModel && typeof STATE.configModel === 'object'
            ? STATE.configModel
            : {};
        const documentValue = model.projectSchema && typeof model.projectSchema === 'object' && !Array.isArray(model.projectSchema)
            ? clone(model.projectSchema)
            : {};

        if (!Array.isArray(documentValue.keys)) {
            documentValue.keys = [];
        }

        return documentValue;
    };

    GUI.setProjectSchemaDocument = function setProjectSchemaDocument(nextDocument) {
        if (!STATE.configModel || typeof STATE.configModel !== 'object') {
            STATE.configModel = {};
        }

        const documentValue = nextDocument && typeof nextDocument === 'object' && !Array.isArray(nextDocument)
            ? clone(nextDocument)
            : {};
        if (!Array.isArray(documentValue.keys)) {
            documentValue.keys = [];
        }

        STATE.configModel.projectSchema = documentValue;
        if (typeof GUI.syncProjectSchemaEditor === 'function' && GUI.isProjectConfigMode()) {
            GUI.syncProjectSchemaEditor();
        }
        return documentValue;
    };

    GUI.markConfigDirty = function markConfigDirty() {
        STATE.configDirty = true;
    };

    GUI.getProjectSchemaEntries = function getProjectSchemaEntries() {
        return GUI.getProjectSchemaDocument().keys
            .filter((entry) => entry && typeof entry === 'object' && String(entry.key || '').trim());
    };

    GUI.findProjectSchemaEntry = function findProjectSchemaEntry(schemaKey) {
        const normalizedKey = String(schemaKey || '').trim();
        if (!normalizedKey) return null;
        return GUI.getProjectSchemaEntries().find((entry) => String(entry.key || '').trim() === normalizedKey) || null;
    };

    GUI.upsertProjectSchemaEntry = function upsertProjectSchemaEntry(entry) {
        const normalizedKey = String(entry && entry.key || '').trim();
        if (!normalizedKey) return null;

        const documentValue = GUI.getProjectSchemaDocument();
        const normalizedEntry = { key: normalizedKey };
        [
            'description',
            'type',
            'enum',
            'enum_editable',
            'enumEditable',
            'tags',
            'structure'
        ].forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(entry || {}, field)) {
                normalizedEntry[field] = clone(entry[field]);
            }
        });

        const existingIndex = documentValue.keys.findIndex((item) => String(item && item.key || '').trim() === normalizedKey);
        if (existingIndex >= 0) {
            documentValue.keys[existingIndex] = normalizedEntry;
        } else {
            documentValue.keys.push(normalizedEntry);
        }

        GUI.setProjectSchemaDocument(documentValue);
        GUI.markConfigDirty();
        return normalizedEntry;
    };

    GUI.removeProjectSchemaEntry = function removeProjectSchemaEntry(schemaKey) {
        const normalizedKey = String(schemaKey || '').trim();
        if (!normalizedKey) return false;

        const documentValue = GUI.getProjectSchemaDocument();
        const previousLength = documentValue.keys.length;
        documentValue.keys = documentValue.keys.filter((entry) => String(entry && entry.key || '').trim() !== normalizedKey);
        GUI.setProjectSchemaDocument(documentValue);
        if (documentValue.keys.length !== previousLength) {
            GUI.markConfigDirty();
        }
        return documentValue.keys.length !== previousLength;
    };

    GUI.removeProjectSchemaEntriesUnderPath = function removeProjectSchemaEntriesUnderPath(schemaPath, options = {}) {
        const normalizedPath = String(schemaPath || '').trim();
        if (!normalizedPath) return false;

        const includeSelf = !Object.prototype.hasOwnProperty.call(options, 'includeSelf') || Boolean(options.includeSelf);
        const documentValue = GUI.getProjectSchemaDocument();
        const previousLength = documentValue.keys.length;
        documentValue.keys = documentValue.keys.filter((entry) => {
            const key = String(entry && entry.key || '').trim();
            if (!key) return false;
            if (includeSelf && key === normalizedPath) return false;
            if (key.startsWith(`${normalizedPath}.`)) return false;
            return true;
        });
        GUI.setProjectSchemaDocument(documentValue);
        if (documentValue.keys.length !== previousLength) {
            GUI.markConfigDirty();
        }
        return documentValue.keys.length !== previousLength;
    };

    GUI.getCustomTypeOptions = function getCustomTypeOptions() {
        return ['string', 'number', 'boolean', 'path', 'color', 'object', 'array'];
    };

    GUI.getCustomArrayItemTypeOptions = function getCustomArrayItemTypeOptions() {
        return ['string', 'number', 'boolean', 'path', 'color', 'object', 'array'];
    };

    GUI.getCustomArrayItemKind = function getCustomArrayItemKind(schemaEntry) {
        const entry = schemaEntry && typeof schemaEntry === 'object' ? schemaEntry : {};
        const structure = entry.structure && typeof entry.structure === 'object' ? entry.structure : {};
        const oneOf = Array.isArray(structure.oneOf) ? structure.oneOf : [];
        const arrayBranch = String(structure.kind || '').trim().toLowerCase() === 'union'
            ? (oneOf.find((item) => String(item && item.kind || '').trim().toLowerCase() === 'array') || {})
            : structure;
        return String(arrayBranch.items_kind || arrayBranch.itemsKind || '').trim().toLowerCase();
    };

    GUI.getCustomValueType = function getCustomValueType(value, schemaEntry) {
        const schemaType = String(schemaEntry && schemaEntry.type || '').trim().toLowerCase();
        if (schemaType === 'path' || schemaType === 'color') return schemaType;
        if (typeof value === 'boolean') return 'boolean';
        if (typeof value === 'number') return 'number';
        if (Array.isArray(value)) return 'array';
        if (value && typeof value === 'object') return 'object';
        return 'string';
    };

    GUI.seedCustomValueForType = function seedCustomValueForType(type, existingValue, schemaEntry) {
        const normalizedType = String(type || 'string').trim().toLowerCase();
        if (normalizedType === 'boolean') return false;
        if (normalizedType === 'number') {
            if (typeof existingValue === 'number' && Number.isFinite(existingValue)) {
                return existingValue;
            }
            const raw = existingValue == null ? '' : String(existingValue).trim();
            if (raw) {
                const parsed = Number(raw);
                if (Number.isFinite(parsed)) {
                    return parsed;
                }
            }
            return 0;
        }
        if (normalizedType === 'object') return {};
        if (normalizedType === 'array') return [];
        if (normalizedType === 'color') {
            return GUI.normalizeHexColor(existingValue) || '#ffffff';
        }
        return existingValue == null ? '' : String(existingValue);
    };

    GUI.getUnionValueKind = function getUnionValueKind(value) {
        if (value === null) return 'null';
        if (Array.isArray(value)) return 'array';
        if (value && typeof value === 'object') return 'object';
        if (typeof value === 'boolean') return 'boolean';
        if (typeof value === 'number') return Number.isInteger(value) ? 'integer' : 'number';
        return 'string';
    };

    GUI.buildCustomSchemaEntry = function buildCustomSchemaEntry(schemaKey, type, arrayItemKind = '', previousEntry = null) {
        const normalizedType = String(type || 'string').trim().toLowerCase();
        const previous = previousEntry && typeof previousEntry === 'object' ? previousEntry : {};
        const normalizedArrayItemKind = String(arrayItemKind || GUI.getCustomArrayItemKind(previous) || '').trim().toLowerCase();
        const entry = {
            key: String(schemaKey || '').trim()
        };

        if (previous.description) {
            entry.description = previous.description;
        }

        entry.type = ['string', 'number', 'boolean', 'object', 'array', 'path', 'color'].includes(normalizedType)
            ? normalizedType
            : 'string';

        if (entry.type === 'object') {
            entry.structure = { kind: 'object' };
        } else if (entry.type === 'array') {
            entry.structure = normalizedArrayItemKind
                ? { kind: 'array', items_kind: normalizedArrayItemKind }
                : { kind: 'array' };
        }

        return entry;
    };

    GUI.updateCustomSchemaMetadata = function updateCustomSchemaMetadata(schemaKey, patch = {}) {
        const previousEntry = GUI.findProjectSchemaEntry(schemaKey) || {};
        const nextType = String(
            Object.prototype.hasOwnProperty.call(patch, 'type')
                ? patch.type
                : (previousEntry.type || GUI.getCustomValueType(GUI.getValue(schemaKey), previousEntry))
        ).trim().toLowerCase();
        const nextArrayItemKind = Object.prototype.hasOwnProperty.call(patch, 'items_kind')
            ? patch.items_kind
            : GUI.getCustomArrayItemKind(previousEntry);
        const nextEntry = GUI.buildCustomSchemaEntry(schemaKey, nextType, nextArrayItemKind, previousEntry);

        if (Object.prototype.hasOwnProperty.call(patch, 'description')) {
            const description = String(patch.description || '').trim();
            if (description) {
                nextEntry.description = description;
            } else {
                delete nextEntry.description;
            }
        }

        GUI.upsertProjectSchemaEntry(nextEntry);
        return nextEntry;
    };

    GUI.parseCustomValue = function parseCustomValue(type, rawValue) {
        const normalizedType = String(type || 'string').trim().toLowerCase();
        const raw = rawValue == null ? '' : String(rawValue);

        if (normalizedType === 'boolean') {
            return ['1', 'true', 'yes', 'on', 'y', 't'].includes(raw.trim().toLowerCase());
        }
        if (normalizedType === 'number') {
            const parsed = Number.parseFloat(raw.trim());
            return Number.isFinite(parsed) ? parsed : 0;
        }
        if (normalizedType === 'color') {
            return GUI.normalizeHexColor(raw) || raw;
        }
        if (normalizedType === 'object') {
            try {
                const parsed = JSON.parse(raw);
                return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
            } catch {
                return {};
            }
        }
        if (normalizedType === 'array') {
            try {
                const parsed = JSON.parse(raw);
                return Array.isArray(parsed) ? parsed : [];
            } catch {
                return [];
            }
        }
        if (normalizedType === 'null') {
            return null;
        }

        return raw;
    };

    GUI.getConfigCustomDraft = function getConfigCustomDraft() {
        if (!STATE.configCustomDraft || typeof STATE.configCustomDraft !== 'object') {
            STATE.configCustomDraft = {
                key: '',
                description: '',
                type: 'string',
                array_item_type: 'string',
                values: {
                    string: '',
                    number: '',
                    boolean: false,
                    path: '',
                    color: '#ffffff',
                    object: '',
                    array: ''
                }
            };
        }

        const draft = STATE.configCustomDraft;
        if (!draft.values || typeof draft.values !== 'object') {
            draft.values = {};
        }

        const defaults = {
            string: '',
            number: '',
            boolean: false,
            path: '',
            color: '#ffffff',
            object: '',
            array: ''
        };

        Object.keys(defaults).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(draft.values, key)) {
                draft.values[key] = defaults[key];
            }
        });

        draft.key = String(draft.key || '');
        draft.description = String(draft.description || '');
        draft.type = String(draft.type || 'string').trim().toLowerCase() || 'string';
        draft.array_item_type = String(draft.array_item_type || 'string').trim().toLowerCase() || 'string';
        if (draft.type === 'enum') {
            draft.type = 'string';
        }

        return draft;
    };

    GUI.getCustomConfigObject = function getCustomConfigObject() {
        const customValue = STATE.configData && typeof STATE.configData === 'object'
            ? STATE.configData.custom
            : null;
        return customValue && typeof customValue === 'object' && !Array.isArray(customValue)
            ? customValue
            : {};
    };

    GUI.flattenCustomEntries = function flattenCustomEntries(value, prefix = '') {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            if (prefix) {
                const schemaEntry = GUI.findProjectSchemaEntry(`custom.${prefix}`) || {};
                const schemaType = String(schemaEntry.type || '').trim().toLowerCase();
                if (schemaType === 'object' || Object.keys(value).length <= 0) {
                    return [{ key: prefix, value }];
                }
            }
            return Object.keys(value).sort((left, right) => left.localeCompare(right)).flatMap((key) => {
                const nextPrefix = prefix ? `${prefix}.${key}` : key;
                return GUI.flattenCustomEntries(value[key], nextPrefix);
            });
        }

        if (Array.isArray(value) && prefix) {
            return [{ key: prefix, value }];
        }

        return [{ key: prefix, value }];
    };

    GUI.isCustomSchemaEditablePath = function isCustomSchemaEditablePath(path) {
        if (!GUI.isProjectConfigMode()) return false;
        const normalizedPath = normalizePath(path);
        if (!normalizedPath.startsWith('custom.')) return false;

        const parts = normalizedPath.split('.').filter(Boolean);
        if (parts.length <= 1) return false;
        if (parts.slice(1).some((part) => /^\d+$/.test(part))) return false;

        return true;
    };

    GUI.deleteCustomValue = function deleteCustomValue(path) {
        const normalizedPath = normalizePath(path);
        if (!normalizedPath) return;

        GUI.removeProjectSchemaEntriesUnderPath(normalizedPath, { includeSelf: true });
        GUI.deleteValue(normalizedPath);

        const customValue = GUI.getCustomConfigObject();
        if (Object.keys(customValue).length <= 0 && STATE.configData && typeof STATE.configData === 'object') {
            delete STATE.configData.custom;
            syncRawEditor();
            GUI.renderConfigForm();
        }
    };

    GUI.createCustomSchemaPanel = function createCustomSchemaPanel(path, value) {
        const normalizedPath = normalizePath(path);
        if (!GUI.isCustomSchemaEditablePath(normalizedPath)) return null;

        const schemaEntry = GUI.findProjectSchemaEntry(normalizedPath) || {};
        const inferredType = GUI.getCustomValueType(value, schemaEntry);
        const grid = document.createElement('div');
        grid.className = 'config-custom-schema__body';
        grid.classList.toggle('config-custom-schema--has-item-type', inferredType === 'array');

        const fields = document.createElement('div');
        fields.className = 'config-custom-schema__grid';

        const descriptionField = document.createElement('label');
        descriptionField.className = 'field field--manual config-custom-schema__field config-custom-schema__field--description';
        descriptionField.innerHTML = '<span class="field__label">Description</span>';
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Optional schema description';
        descriptionInput.value = String(schemaEntry.description || '');
        GUI.bindConfigField(descriptionInput, normalizedPath, 'custom-description');
        GUI.applyFieldHelp(descriptionInput, normalizedPath, {
            description: `Edit the schema description shown for ${normalizedPath}.`
        });
        descriptionInput.addEventListener('change', () => {
            GUI.updateCustomSchemaMetadata(normalizedPath, {
                description: descriptionInput.value
            });
            GUI.renderConfigForm();
        });
        descriptionField.appendChild(descriptionInput);

        const typeField = document.createElement('div');
        typeField.className = 'field field--manual config-custom-schema__field';
        typeField.innerHTML = '<span class="field__label">Type</span>';
        const typePickerField = GUI.createConfigChoicePicker({
            path: normalizedPath,
            entries: GUI.getCustomTypeOptions(),
            value: inferredType,
            fieldRole: 'custom-type',
            rootClassName: 'config-picker config-picker--inline config-picker--compact dropdown',
            helpSchema: Object.assign({}, schemaEntry, {
                description: schemaEntry.description || 'Select the custom value datatype.'
            }),
            onSelect: (selectedValue) => {
                const nextType = String(selectedValue || 'string').trim().toLowerCase();
                const currentType = GUI.getCustomValueType(GUI.getValue(normalizedPath), schemaEntry);
                const nextValue = GUI.seedCustomValueForType(nextType, GUI.getValue(normalizedPath), schemaEntry);
                if (currentType !== nextType && currentType === 'object') {
                    GUI.removeProjectSchemaEntriesUnderPath(normalizedPath, { includeSelf: false });
                }
                GUI.updateCustomSchemaMetadata(normalizedPath, {
                    type: nextType,
                    items_kind: nextType === 'array' ? (GUI.getCustomArrayItemKind(schemaEntry) || 'string') : ''
                });
                GUI.setValue(normalizedPath, clone(nextValue));
            }
        });
        typeField.appendChild(typePickerField.picker);

        fields.appendChild(typeField);

        if (inferredType === 'array') {
            const itemTypeField = document.createElement('div');
            itemTypeField.className = 'field field--manual config-custom-schema__field';
            itemTypeField.innerHTML = '<span class="field__label">Item Type</span>';
            const itemTypePickerField = GUI.createConfigChoicePicker({
                path: normalizedPath,
                entries: GUI.getCustomArrayItemTypeOptions(),
                value: GUI.getCustomArrayItemKind(schemaEntry) || 'string',
                fieldRole: 'custom-array-item-type',
                rootClassName: 'config-picker config-picker--inline config-picker--compact dropdown',
                helpSchema: Object.assign({}, schemaEntry, {
                    description: `Select the seeded item type for ${normalizedPath}.`
                }),
                onSelect: (selectedValue) => {
                    GUI.updateCustomSchemaMetadata(normalizedPath, {
                        type: 'array',
                        items_kind: String(selectedValue || 'string').trim().toLowerCase()
                    });
                    GUI.renderConfigForm();
                }
            });
            itemTypeField.appendChild(itemTypePickerField.picker);
            fields.appendChild(itemTypeField);
        }

        fields.appendChild(descriptionField);
        grid.appendChild(fields);

        const panel = GUI.createConfigSubpanelShell('Custom Schema', grid, {
            sectionKey: `custom-schema:${normalizedPath}`,
            description: 'Edit the schema metadata for this custom key.',
            titleClassName: 'gui-icon-label font-icon--interface--tag'
        });
        panel.classList.add('config-custom-schema', 'panel', 'panel--section');
        panel.classList.toggle('config-custom-schema--has-item-type', inferredType === 'array');
        return panel;
    };

    GUI.appendCustomSchemaPanel = function appendCustomSchemaPanel(container, path, value) {
        if (!container) return;
        const panel = GUI.createCustomSchemaPanel(path, value);
        if (panel) {
            container.prepend(panel);
        }
    };

    GUI.getObjectPropertyKeys = function getObjectPropertyKeys(path) {
        const schema = GUI.findSchemaEntry(path) || {};
        return Array.isArray(schema && schema.structure && schema.structure.properties_keys)
            ? schema.structure.properties_keys.map((item) => String(item || '').trim()).filter(Boolean)
            : [];
    };

    GUI.isMapRootObject = function isMapRootObject(path) {
        const basePath = normalizePath(path);
        const propertyKeys = GUI.getObjectPropertyKeys(path);
        return propertyKeys.some((propertyKey) => {
            if (!basePath) return propertyKey === '*';
            return propertyKey === `${basePath}.*`;
        });
    };

    GUI.getMissingDirectObjectProperties = function getMissingDirectObjectProperties(path, value) {
        const basePath = normalizePath(path);
        const currentValue = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
        return GUI.getObjectPropertyKeys(path)
            .filter((propertyKey) => {
                if (!propertyKey || propertyKey.includes('.*') || propertyKey.includes('[]')) return false;
                if (basePath) {
                    if (!propertyKey.startsWith(`${basePath}.`)) return false;
                    const suffix = propertyKey.slice(basePath.length + 1).split('.').filter(Boolean);
                    return suffix.length === 1 && !Object.prototype.hasOwnProperty.call(currentValue, suffix[0]);
                }
                return !propertyKey.includes('.') && !Object.prototype.hasOwnProperty.call(currentValue, propertyKey);
            })
            .map((propertyKey) => basePath ? propertyKey.slice(basePath.length + 1) : propertyKey)
            .filter(Boolean)
            .sort((left, right) => left.localeCompare(right));
    };

    GUI.isDirectObjectProperty = function isDirectObjectProperty(path, key) {
        const basePath = normalizePath(path);
        const normalizedKey = String(key || '').trim();
        if (!basePath || !normalizedKey) return false;

        return GUI.getObjectPropertyKeys(path).some((propertyKey) => {
            if (!propertyKey || propertyKey.includes('.*') || propertyKey.includes('[]')) return false;
            if (!propertyKey.startsWith(`${basePath}.`)) return false;
            const suffix = propertyKey.slice(basePath.length + 1).split('.').filter(Boolean);
            return suffix.length === 1 && suffix[0] === normalizedKey;
        });
    };

    GUI.getOrderedObjectKeys = function getOrderedObjectKeys(path, value) {
        const currentValue = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
        const existingKeys = Object.keys(currentValue);
        const ordered = [];
        const seen = new Set();
        const basePath = normalizePath(path);

        GUI.getObjectPropertyKeys(path).forEach((propertyKey) => {
            if (!propertyKey || propertyKey.includes('.*') || propertyKey.includes('[]')) return;
            if (basePath) {
                if (!propertyKey.startsWith(`${basePath}.`)) return;
                const suffix = propertyKey.slice(basePath.length + 1).split('.').filter(Boolean);
                if (suffix.length !== 1) return;
                const key = suffix[0];
                if (Object.prototype.hasOwnProperty.call(currentValue, key) && !seen.has(key)) {
                    seen.add(key);
                    ordered.push(key);
                }
                return;
            }
            if (propertyKey.includes('.')) return;
            if (Object.prototype.hasOwnProperty.call(currentValue, propertyKey) && !seen.has(propertyKey)) {
                seen.add(propertyKey);
                ordered.push(propertyKey);
            }
        });

        existingKeys.forEach((key) => {
            if (seen.has(key)) return;
            seen.add(key);
            ordered.push(key);
        });

        return ordered;
    };

    GUI.getSectionRank = function getSectionRank(path) {
        const normalized = normalizePath(path);
        const head = normalized.split('.').filter(Boolean)[0] || '';
        if (head === 'require') return 0;
        if (head === 'option') return 1;
        if (head === 'custom') return 2;
        return 3;
    };

    GUI.sortConfigKeys = function sortConfigKeys(keys, parentPath = '') {
        return (Array.isArray(keys) ? keys : [])
            .map((key) => String(key || '').trim())
            .filter(Boolean)
            .sort((left, right) => {
                const leftPath = parentPath ? `${normalizePath(parentPath)}.${left}` : left;
                const rightPath = parentPath ? `${normalizePath(parentPath)}.${right}` : right;
                const rankDelta = GUI.getSectionRank(leftPath) - GUI.getSectionRank(rightPath);
                if (rankDelta !== 0) return rankDelta;
                return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' });
            });
    };

    GUI.canDeleteObjectChild = function canDeleteObjectChild(parentPath, key) {
        const normalizedParentPath = normalizePath(parentPath);
        if (!normalizedParentPath || !key) return false;
        if (normalizedParentPath === 'custom' || normalizedParentPath.startsWith('custom.')) return true;
        return GUI.isMapRootObject(normalizedParentPath) || GUI.isDirectObjectProperty(normalizedParentPath, key);
    };

    GUI.getObjectChildKeyValidationMessage = function getObjectChildKeyValidationMessage(parentPath, candidateKey, currentKey = '') {
        const normalizedParentPath = normalizePath(parentPath);
        const nextKey = String(candidateKey || '').trim();
        const previousKey = String(currentKey || '').trim();
        if (!normalizedParentPath) return '';
        if (!nextKey) return 'Enter a unique key.';

        const currentValue = GUI.getValue(parentPath);
        if (!currentValue || typeof currentValue !== 'object' || Array.isArray(currentValue)) {
            return '';
        }

        if (nextKey !== previousKey && Object.prototype.hasOwnProperty.call(currentValue, nextKey)) {
            return 'Key already exists.';
        }

        return '';
    };

    GUI.setConfigInputValidationState = function setConfigInputValidationState(input, messageNode, message) {
        if (!input || !messageNode) return;
        const normalizedMessage = String(message || '').trim();
        const hasMessage = Boolean(normalizedMessage);
        input.setAttribute('aria-invalid', hasMessage ? 'true' : 'false');
        if (hasMessage) {
            if (!messageNode.id) {
                GUI.__configValidationId = Number(GUI.__configValidationId || 0) + 1;
                messageNode.id = `config-validation-${GUI.__configValidationId}`;
            }
            input.setAttribute('aria-describedby', messageNode.id);
            messageNode.textContent = normalizedMessage;
            messageNode.hidden = false;
        } else {
            input.removeAttribute('aria-describedby');
            messageNode.textContent = '';
            messageNode.hidden = true;
        }
    };

    GUI.renameObjectChildKey = function renameObjectChildKey(parentPath, oldKey, nextKey) {
        const normalizedParentPath = normalizePath(parentPath);
        const previousKey = String(oldKey || '').trim();
        const replacementKey = String(nextKey || '').trim();
        if (!normalizedParentPath || !previousKey || !replacementKey || replacementKey === previousKey) {
            return false;
        }

        const currentValue = GUI.getValue(parentPath);
        if (!currentValue || typeof currentValue !== 'object' || Array.isArray(currentValue)) {
            return false;
        }

        if (Object.prototype.hasOwnProperty.call(currentValue, replacementKey)) {
            return false;
        }

        const nextValue = {};
        Object.keys(currentValue).forEach((key) => {
            if (key === previousKey) {
                nextValue[replacementKey] = clone(currentValue[key]);
                return;
            }
            nextValue[key] = clone(currentValue[key]);
        });

        GUI.expandConfigSection(parentPath);
        GUI.setValue(parentPath, nextValue);
        return true;
    };

    GUI.createEditableObjectKeyInput = function createEditableObjectKeyInput(parentPath, key) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-object-entry__key-edit';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'config-object-entry__key-input';
        input.value = String(key || '');
        input.spellcheck = false;
        GUI.bindConfigField(input, parentPath, `object-key-name:${String(key || '')}`);
        wrapper.appendChild(input);

        const message = document.createElement('div');
        message.className = 'config-validation-message';
        message.hidden = true;
        wrapper.appendChild(message);

        const stopHeaderToggle = (event) => {
            event.stopPropagation();
        };

        ['click', 'dblclick', 'mousedown'].forEach((eventName) => {
            input.addEventListener(eventName, stopHeaderToggle);
        });

        input.addEventListener('input', () => {
            GUI.setConfigInputValidationState(
                input,
                message,
                GUI.getObjectChildKeyValidationMessage(parentPath, input.value, key)
            );
        });

        input.addEventListener('keydown', (event) => {
            event.stopPropagation();
            if (event.key === 'Enter') {
                event.preventDefault();
                input.blur();
                return;
            }
            if (event.key === 'Escape') {
                event.preventDefault();
                input.value = String(key || '');
                input.blur();
            }
        });

        input.addEventListener('blur', () => {
            const validationMessage = GUI.getObjectChildKeyValidationMessage(parentPath, input.value, key);
            const applied = !validationMessage && GUI.renameObjectChildKey(parentPath, key, input.value);
            if (!applied) {
                input.value = String(key || '');
                GUI.setConfigInputValidationState(
                    input,
                    message,
                    validationMessage === 'Key already exists.'
                        ? 'Key already exists. Kept original name.'
                        : validationMessage
                );
                return;
            }
            GUI.setConfigInputValidationState(input, message, '');
        });

        return wrapper;
    };

    GUI.getDefaultMapObjectValue = function getDefaultMapObjectValue(path, keyName) {
        const normalizedPath = normalizePath(path);
        const objectValue = GUI.getValue(path);
        if (objectValue && typeof objectValue === 'object' && !Array.isArray(objectValue)) {
            const values = Object.values(objectValue);
            if (values.length > 0) {
                return clone(values[0]);
            }
        }

        const defaultRoot = STATE.configModel && STATE.configModel.defaultConfig;
        if (defaultRoot && typeof defaultRoot === 'object') {
            const targetPath = normalizedPath ? `${normalizedPath}.${keyName}` : keyName;
            const directDefault = GUI.getValueFromRoot(defaultRoot, targetPath);
            if (typeof directDefault !== 'undefined') {
                return clone(directDefault);
            }
            const defaultParent = GUI.getValueFromRoot(defaultRoot, normalizedPath);
            if (defaultParent && typeof defaultParent === 'object' && !Array.isArray(defaultParent)) {
                const defaultValues = Object.values(defaultParent);
                if (defaultValues.length > 0) {
                    return clone(defaultValues[0]);
                }
            }
        }

        const wildcardSchema = GUI.findSchemaEntry(normalizedPath ? `${normalizedPath}.${keyName}` : keyName) || {};
        return GUI.createDefaultValueFromSchemaEntry(wildcardSchema, normalizedPath ? `${normalizedPath}.${keyName}` : keyName);
    };

    GUI.getValueFromRoot = function getValueFromRoot(rootValue, path) {
        const parts = normalizePath(path).split('.').filter(Boolean);
        let cursor = rootValue;
        for (const part of parts) {
            if (cursor === null || typeof cursor !== 'object') return undefined;
            cursor = cursor[part];
        }
        return cursor;
    };

    GUI.renderBooleanField = function renderBooleanField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive';

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'button button--small button--icon-action gui-icon-button';
        GUI.setCheckboxButtonState(button, Boolean(value));
        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.setConfigClickTooltip(button, 'Toggle Setting', GUI.getConfigToggleTooltipText(path, Boolean(value)));
        }
        button.addEventListener('click', () => {
            const nextValue = !GUI.isCheckboxButtonChecked(button);
            GUI.setCheckboxButtonState(button, nextValue);
            if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
                GUI.setConfigClickTooltip(button, 'Toggle Setting', GUI.getConfigToggleTooltipText(path, nextValue));
            }
            GUI.commitPrimitiveValue(path, nextValue, options);
        });
        GUI.bindPrimitiveField(button, path, 'boolean', options);

        const text = document.createElement('span');
        text.className = 'button--icon-action__label';
        text.textContent = 'Enabled';
        button.append(text);

        GUI.appendPrimitiveField(wrapper, path, 'boolean', schema, [button], options);
        return wrapper;
    };

    GUI.renderJsonField = function renderJsonField(path, value, schema, expectedKind = 'object', options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive';

        const input = document.createElement('textarea');
        input.rows = expectedKind === 'array' ? 5 : 6;
        try {
            input.value = `${JSON.stringify(value, null, 4)}\n`;
        } catch {
            input.value = expectedKind === 'array' ? '[]\n' : '{}\n';
        }
        input.addEventListener('change', () => {
            try {
                const parsed = JSON.parse(input.value || (expectedKind === 'array' ? '[]' : '{}'));
                const valid = expectedKind === 'array'
                    ? Array.isArray(parsed)
                    : parsed && typeof parsed === 'object' && !Array.isArray(parsed);
                if (!valid) {
                    throw new Error(`Expected a JSON ${expectedKind}.`);
                }
                GUI.commitPrimitiveValue(path, parsed, options);
            } catch (error) {
                logEvent('warn', 'Custom JSON field parse failed.', {
                    path,
                    expectedKind,
                    message: String(error.message || error)
                });
            }
        });
        GUI.bindPrimitiveField(input, path, `json-${expectedKind}`, options);
        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp(input, path, schema);
        }

        GUI.appendPrimitiveField(wrapper, path, expectedKind, schema, [input], options);
        return wrapper;
    };

    GUI.renderEnumField = function renderEnumField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive';

        const enumValues = GUI.getSchemaEnumOptions(schema);

        const picker = GUI.createConfigDropdownPicker({
            path,
            panelAlign: 'center',
            buttonClassName: 'button button--icon-action button--disclosure-toggle gui-icon-button font-icon--interface--arrow-down config-picker__toggle',
            title: 'Option',
            titleClassName: 'gui-icon-label font-icon--interface--list',
            closeLabel: 'Close',
            getSelectedValue: () => String(GUI.getValue(path) == null ? '' : GUI.getValue(path))
        });

        const syncLabel = () => {
            const currentValue = value == null ? GUI.getValue(path) : GUI.getValue(path);
            const normalizedValue = String(currentValue == null ? '' : currentValue);
            picker.setLabel(GUI.getConfigDropdownLabel(enumValues, normalizedValue, 'Select'));
            picker.refreshOptions();
        };

        picker.setOptions(enumValues, (selectedValue) => {
            GUI.commitPrimitiveValue(path, selectedValue, options);
            picker.setLabel(GUI.getConfigDropdownLabel(enumValues, selectedValue, 'Select'));
            picker.refreshOptions();
        });

        GUI.bindPrimitiveField(picker.button, path, 'enum', options);
        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp(picker.button, path, schema);
        }
        syncLabel();

        GUI.appendPrimitiveField(wrapper, path, 'enum', schema, [picker.picker], options);
        return wrapper;
    };

    GUI.renderColorField = function renderColorField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive';

        const row = document.createElement('div');
        row.className = 'field-with-action';

        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = value == null ? '' : String(value);
        GUI.bindConfigField(textInput, path, 'color-text');

        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = GUI.normalizeHexColor(value) || '#000000';
        GUI.bindConfigField(colorInput, path, 'color-picker');

        colorInput.addEventListener('input', () => {
            textInput.value = colorInput.value;
            GUI.setValue(path, colorInput.value, Object.assign({}, options, { render: false }));
        });

        colorInput.addEventListener('change', () => {
            textInput.value = colorInput.value;
            GUI.commitPrimitiveValue(path, colorInput.value, options);
        });

        textInput.addEventListener('change', () => {
            const normalized = GUI.normalizeHexColor(textInput.value);
            if (normalized) {
                textInput.value = normalized;
                colorInput.value = normalized;
                GUI.commitPrimitiveValue(path, normalized, options);
                return;
            }
            GUI.commitPrimitiveValue(path, textInput.value, options);
        });

        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp([textInput, colorInput], path, schema);
        }
        row.append(textInput, colorInput);
        GUI.appendPrimitiveField(wrapper, path, 'color', schema, [row], options);
        return wrapper;
    };

    GUI.renderPathField = function renderPathField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive';

        const row = document.createElement('div');
        row.className = 'field-with-action';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = value == null ? '' : String(value);
        input.addEventListener('change', () => GUI.commitPrimitiveValue(path, input.value, options));
        GUI.bindPrimitiveField(input, path, 'path', options);

        const browseButton = document.createElement('button');
        browseButton.type = 'button';
        browseButton.className = 'button button--small button--icon-action button--icon-action--solo gui-icon-button font-icon--interface--magnifying-glass';
        browseButton.innerHTML = '<span class="button--icon-action__label">Browse</span>';
        browseButton.addEventListener('click', async () => {
            try {
                const result = await api('/api/browse/directory', {
                    method: 'POST',
                    body: {
                        initialDir: String(input.value || STATE.selectedProject || '')
                    }
                });
                const selected = String(result && result.dir || '').trim();
                if (!selected) return;
                input.value = selected;
                GUI.commitPrimitiveValue(path, selected, options);
            } catch (error) {
                logEvent('error', 'Config path browse failed.', {
                    path,
                    message: String(error.message || error)
                });
            }
        });

        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp([input, browseButton], path, schema);
        }
        row.append(input, browseButton);
        GUI.appendPrimitiveField(wrapper, path, 'path', schema, [row], options);
        return wrapper;
    };

    GUI.renderNumberField = function renderNumberField(path, value, schema, type, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive';

        const input = document.createElement('input');
        input.type = 'number';
        input.step = type === 'integer' ? '1' : 'any';
        input.value = Number.isFinite(value) ? String(value) : '0';
        GUI.bindPrimitiveField(input, path, type, options);
        input.addEventListener('change', () => {
            if (type === 'integer') {
                GUI.commitPrimitiveValue(path, Number.parseInt(input.value || '0', 10) || 0, options);
                return;
            }
            GUI.commitPrimitiveValue(path, Number.parseFloat(input.value || '0') || 0, options);
        });
        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp(input, path, schema);
        }

        GUI.appendPrimitiveField(wrapper, path, type, schema, [input], options);
        return wrapper;
    };

    GUI.createConfigDropdownPicker = function createConfigDropdownPicker(options = {}) {
        const optionList = document.createElement('div');
        optionList.className = 'config-picker__options floating-panel__body';

        const surface = GUI.createDropdownSurface({
            rootClassName: options.rootClassName || 'config-picker dropdown',
            align: options.align || 'end',
            panelAlign: options.panelAlign || options.align || 'center',
            buttonClassName: options.buttonClassName || 'button button--icon-action gui-icon-button font-icon--interface--arrow-down config-picker__toggle',
            title: options.title || 'Preset',
            titleClassName: options.titleClassName || 'gui-icon-label font-icon--interface--list',
            closeLabel: options.closeLabel || 'Close',
            bodyNode: optionList,
            bodyClassName: 'config-picker__options floating-panel__body',
            panelClassName: 'config-picker__panel floating-panel dropdown__panel overlay-surface overlay-surface--panel',
            rebuildPanel: true
        });
        const picker = surface.dropdown;
        const button = surface.toggle;
        const panel = surface.panel;
        GUI.setConfigClickTooltip(
            button,
            options.title || 'Option',
            GUI.getConfigDropdownToggleTooltipText(options.path, options.toggleTooltipNoun || 'choices')
        );

        button.addEventListener('mousedown', (event) => {
            event.preventDefault();
        });

        const buttonLabel = button.querySelector('.button--icon-action__label') || (() => {
            const label = document.createElement('span');
            label.className = 'button--icon-action__label';
            button.appendChild(label);
            return label;
        })();

        const setLabel = (label) => {
            buttonLabel.textContent = label == null ? '' : String(label);
        };

        const close = () => {
            if (typeof GUI.setDropdownOpen === 'function') {
                GUI.setDropdownOpen(picker, false);
            }
        };

        let currentEntries = [];
        let currentOnSelect = null;

        const renderOptions = () => {
            optionList.textContent = '';
            const selectedValue = typeof options.getSelectedValue === 'function'
                ? String(options.getSelectedValue() || '')
                : '';
            currentEntries.forEach((entry) => {
                const normalizedEntry = GUI.normalizeConfigDropdownEntry(entry);
                if (!normalizedEntry) return;
                const option = document.createElement('button');
                option.type = 'button';
                option.className = 'config-picker__option dropdown-option gui-icon-label';
                option.textContent = normalizedEntry.label;
                const isCurrent = normalizedEntry.value === selectedValue;
                option.classList.toggle('is-current', isCurrent);
                option.classList.toggle('font-icon--interface--radio-on', isCurrent);
                option.classList.toggle('font-icon--interface--radio-off', !isCurrent);
                option.addEventListener('mousedown', (event) => {
                    event.preventDefault();
                    if (typeof currentOnSelect === 'function') {
                        currentOnSelect(normalizedEntry.value, normalizedEntry);
                    }
                    close();
                });
                optionList.appendChild(option);
            });
        };

        const setOptions = (entries, onSelect) => {
            currentEntries = Array.isArray(entries) ? entries.map((entry) => GUI.normalizeConfigDropdownEntry(entry)).filter(Boolean) : [];
            currentOnSelect = typeof onSelect === 'function' ? onSelect : null;
            renderOptions();
        };

        return {
            picker,
            button,
            buttonLabel,
            panel,
            optionList,
            setLabel,
            setOptions,
            refreshOptions: renderOptions,
            close
        };
    };

    GUI.createConfigChoicePicker = function createConfigChoicePicker(options = {}) {
        const entries = Array.isArray(options.entries) ? options.entries : [];
        let currentValue = typeof options.getValue === 'function'
            ? String(options.getValue() == null ? '' : options.getValue())
            : String(options.value == null ? '' : options.value);

        const picker = GUI.createConfigDropdownPicker({
            path: options.path || '',
            panelAlign: options.panelAlign || 'center',
            rootClassName: options.rootClassName,
            buttonClassName: options.buttonClassName || 'button button--icon-action button--disclosure-toggle gui-icon-button font-icon--interface--arrow-down config-picker__toggle',
            title: options.title || 'Option',
            titleClassName: options.titleClassName || 'gui-icon-label font-icon--interface--list',
            closeLabel: options.closeLabel || 'Close',
            toggleTooltipNoun: options.toggleTooltipNoun || 'choices',
            getSelectedValue: () => currentValue
        });

        const getLabel = (value) => {
            if (typeof options.getLabel === 'function') return options.getLabel(value);
            return GUI.getConfigDropdownLabel(entries, value, options.emptyLabel || 'Select');
        };

        picker.setOptions(entries, (selectedValue, entry) => {
            currentValue = String(selectedValue == null ? '' : selectedValue);
            if (typeof options.onSelect === 'function') {
                options.onSelect(selectedValue, entry);
            }
            picker.setLabel(getLabel(currentValue));
            picker.refreshOptions();
        });
        picker.setLabel(getLabel(currentValue) || String(options.emptyLabel || 'Select'));

        if (options.path) {
            GUI.bindConfigField(picker.button, options.path, options.fieldRole || 'choice');
        }
        if (options.helpSchema) {
            GUI.applyFieldHelp(picker.button, options.path || '', options.helpSchema);
        }

        picker.getValue = () => currentValue;
        picker.setValue = (nextValue) => {
            currentValue = String(nextValue == null ? '' : nextValue);
            picker.setLabel(getLabel(currentValue) || String(options.emptyLabel || 'Select'));
            picker.refreshOptions();
        };
        return picker;
    };

    GUI.createConfigPresetPicker = function createConfigPresetPicker(options = {}) {
        return GUI.createConfigChoicePicker({
            ...options,
            rootClassName: options.rootClassName || 'config-picker config-picker--inline dropdown',
            emptyLabel: options.emptyLabel || 'Preset',
            title: options.title || 'Preset',
            toggleTooltipNoun: options.toggleTooltipNoun || 'presets',
            titleClassName: options.titleClassName || 'gui-icon-label font-icon--interface--bookmark',
            getLabel: () => 'Preset'
        });
    };

    GUI.createConfigChipInsertSection = function createConfigChipInsertSection(definitions, options = {}, contentNode) {
        const normalizedDefinitions = Array.isArray(definitions) ? definitions.filter(Boolean) : [];
        if (!contentNode || normalizedDefinitions.length <= 0) {
            return contentNode;
        }

        const section = document.createElement('div');
        section.className = String(options.sectionClassName || 'config-format-editor__token-section');

        const heading = document.createElement('div');
        heading.className = String(options.headingClassName || 'section-title gui-icon-label font-icon--interface--coin config-format-editor__token-heading');
        heading.textContent = String(options.heading || 'Tokens');

        section.append(heading, contentNode);
        return section;
    };

    GUI.createConfigTokenSection = function createConfigTokenSection(schema, contentNode) {
        return GUI.createConfigChipInsertSection(
            GUI.getSchemaTokenDefinitions(schema),
            {
                heading: 'Tokens',
                headingClassName: 'section-title gui-icon-label font-icon--interface--coin config-format-editor__token-heading'
            },
            contentNode
        );
    };

    GUI.createConfigPartSection = function createConfigPartSection(schema, contentNode) {
        return GUI.createConfigChipInsertSection(
            GUI.getSchemaPartDefinitions(schema),
            {
                heading: 'Parts',
                headingClassName: 'section-title gui-icon-label font-icon--interface--list config-format-editor__token-heading'
            },
            contentNode
        );
    };

    GUI.insertTextAtInputCursor = function insertTextAtInputCursor(input, insertedText, onCommit) {
        if (!input) return;
        const normalizedInsertedText = String(insertedText == null ? '' : insertedText);
        const start = typeof input.selectionStart === 'number' ? input.selectionStart : String(input.value || '').length;
        const end = typeof input.selectionEnd === 'number' ? input.selectionEnd : String(input.value || '').length;
        const current = String(input.value || '');
        const nextValue = `${current.slice(0, start)}${normalizedInsertedText}${current.slice(end)}`;
        const nextSelection = start + normalizedInsertedText.length;
        input.value = nextValue;
        try {
            input.focus({ preventScroll: true });
        } catch {
            input.focus();
        }
        try {
            input.setSelectionRange(nextSelection, nextSelection);
        } catch {}
        if (typeof onCommit === 'function') {
            onCommit(nextValue, nextSelection);
        }
    };

    GUI.renderDateTimeFormatField = function renderDateTimeFormatField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive config-format-editor';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = value == null ? '' : String(value);
        GUI.bindConfigField(input, path, 'datetime-format');

        const presets = GUI.getSchemaPresets(schema);
        const presetPicker = GUI.createConfigPresetPicker({
            path,
            entries: presets,
            fieldRole: 'datetime-format-preset',
            getValue: () => String(input.value || ''),
            onSelect: (selectedValue) => {
                input.value = String(selectedValue == null ? '' : selectedValue);
                GUI.setValue(path, input.value);
            }
        });

        const syncPresetButton = () => {
            presetPicker.setValue(input.value);
        };

        const preview = document.createElement('div');
        preview.className = 'config-format-editor__preview';

        const tokensWrap = document.createElement('div');
        tokensWrap.className = 'config-format-editor__tokens';
        GUI.getSchemaTokenDefinitions(schema).forEach((tokenDefinition) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'button button--small button--ghost config-format-editor__token';

            const tokenValue = document.createElement('span');
            tokenValue.className = 'config-format-editor__token-value';
            tokenValue.textContent = tokenDefinition.value;
            button.appendChild(tokenValue);

            if (tokenDefinition.name) {
                const tokenName = document.createElement('span');
                tokenName.className = 'config-format-editor__token-name';
                tokenName.textContent = tokenDefinition.name;
                button.appendChild(tokenName);
            }

            const tokenPreview = document.createElement('span');
            tokenPreview.className = 'config-format-editor__token-preview';
            tokenPreview.textContent = GUI.getDateTimeTokenPreviewShort(tokenDefinition, schema);
            button.appendChild(tokenPreview);

            const ariaParts = [tokenDefinition.value];
            if (tokenDefinition.name) {
                ariaParts.push(tokenDefinition.name);
            }
            const fullPreview = GUI.getDateTimeTokenPreview(tokenDefinition, schema);
            if (fullPreview) {
                ariaParts.push(fullPreview);
            }
            button.setAttribute('aria-label', ariaParts.join(': '));
            GUI.setConfigClickTooltip(button, 'Insert Token', GUI.getConfigTokenTooltipText(tokenDefinition.value));
            button.addEventListener('mousedown', (event) => {
                event.preventDefault();
            });
            button.addEventListener('click', () => {
                GUI.insertTextAtInputCursor(input, tokenDefinition.value, (nextValue, nextSelection) => {
                    GUI.setValue(path, nextValue, {
                        uiStateOverride: {
                            scrollTop: document.scrollingElement ? document.scrollingElement.scrollTop : 0,
                            focus: {
                                kind: 'field',
                                path: normalizePath(path),
                                role: 'datetime-format',
                                selectionStart: nextSelection,
                                selectionEnd: nextSelection
                            }
                        }
                    });
                });
            });
            tokensWrap.appendChild(button);
        });
        const tokenSection = GUI.createConfigTokenSection(schema, tokensWrap);

        const syncPreview = () => {
            const current = String(input.value || '');
            preview.textContent = `Preview: ${GUI.formatDateTimePreview(current, schema)}`;
            syncPresetButton();
        };

        input.addEventListener('input', () => {
            syncPreview();
        });
        input.addEventListener('change', () => {
            GUI.setValue(path, input.value);
            syncPreview();
        });
        syncPreview();

        const controls = document.createElement('div');
        controls.className = 'config-format-editor__controls';
        controls.append(input, presetPicker.picker);

        GUI.appendPrimitiveField(wrapper, path, 'string', schema, [controls, preview, tokenSection], options);
        return wrapper;
    };

    GUI.renderRegexField = function renderRegexField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive config-regex-editor';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = value == null ? '' : String(value);
        GUI.bindPrimitiveField(input, path, 'regex', options);
        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp(input, path, schema);
        }

        const controls = document.createElement('div');
        controls.className = 'config-regex-editor__controls';

        const presets = GUI.getSchemaPresets(schema);
        if (presets.length > 0) {
            const presetPicker = GUI.createConfigPresetPicker({
                path,
                entries: presets,
                fieldRole: 'regex-preset',
                getValue: () => String(input.value || ''),
                onSelect: (selectedValue) => {
                    input.value = String(selectedValue == null ? '' : selectedValue);
                    GUI.commitPrimitiveValue(path, input.value, options);
                    syncRegexState();
                }
            });
            input.addEventListener('input', () => {
                presetPicker.setValue(input.value);
            });
            input.addEventListener('change', () => {
                presetPicker.setValue(input.value);
            });
            controls.append(input, presetPicker.picker);
        } else {
            controls.appendChild(input);
        }

        const status = document.createElement('div');
        status.className = 'config-regex-editor__status';

        const sampleText = GUI.getSchemaTestInput(schema);
        const sampleInput = document.createElement('input');
        sampleInput.type = 'text';
        sampleInput.value = sampleText;
        sampleInput.placeholder = 'Sample text';
        sampleInput.className = 'config-regex-editor__sample-input';

        const sampleField = document.createElement('label');
        sampleField.className = 'field field--manual config-regex-editor__sample';
        sampleField.innerHTML = '<span class="section-title gui-icon-label font-icon--interface--eyedrop">Sample</span>';
        sampleField.appendChild(sampleInput);

        const partDefinitions = GUI.getSchemaPartDefinitions(schema);
        const partsWrap = document.createElement('div');
        partsWrap.className = 'config-format-editor__tokens';
        partDefinitions.forEach((partDefinition) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'button button--small button--ghost config-format-editor__token';

            const valueNode = document.createElement('span');
            valueNode.className = 'config-format-editor__token-value';
            valueNode.textContent = partDefinition.value;
            button.appendChild(valueNode);

            if (partDefinition.name) {
                const nameNode = document.createElement('span');
                nameNode.className = 'config-format-editor__token-name';
                nameNode.textContent = partDefinition.name;
                button.appendChild(nameNode);
            }

            GUI.setConfigClickTooltip(button, 'Insert Part', `Insert ${partDefinition.value} into ${normalizePath(path) || 'this field'}.`);
            button.addEventListener('mousedown', (event) => {
                event.preventDefault();
            });
            button.addEventListener('click', () => {
                GUI.insertTextAtInputCursor(input, partDefinition.value, (nextValue) => {
                    GUI.commitPrimitiveValue(path, nextValue, options);
                    syncRegexState();
                });
            });
            partsWrap.appendChild(button);
        });
        const partSection = GUI.createConfigPartSection(schema, partsWrap);

        const preview = document.createElement('div');
        preview.className = 'config-regex-editor__preview';

        const setRegexPreview = (labelText, content, usePill = true) => {
            preview.textContent = '';

            const label = document.createElement('span');
            label.className = 'config-regex-editor__preview-label';
            label.textContent = `${labelText}:`;
            preview.appendChild(label);

            const values = document.createElement('span');
            values.className = 'config-regex-editor__preview-values';

            if (String(content || '').trim()) {
                const pill = document.createElement('span');
                pill.className = usePill ? 'config-primitive__tag config-primitive__tag--path' : 'config-regex-editor__preview-empty';
                pill.textContent = String(content);
                values.appendChild(pill);
            } else {
                const empty = document.createElement('span');
                empty.className = 'config-regex-editor__preview-empty';
                empty.textContent = 'no tokens';
                values.appendChild(empty);
            }

            preview.appendChild(values);
        };

        const syncRegexState = () => {
            const source = String(input.value || '');
            const mode = GUI.getSchemaRegexMode(schema);
            if (!source) {
                status.textContent = 'Enter a regex pattern.';
                status.dataset.state = 'empty';
                preview.hidden = true;
                return;
            }

            try {
                const regex = new RegExp(source);
                status.textContent = 'Pattern is valid.';
                status.dataset.state = 'valid';

                if (!sampleText) {
                    preview.hidden = true;
                    return;
                }

                const sampleValue = String(sampleInput.value || '');
                if (mode === 'split') {
                    const parts = sampleValue
                        .split(regex)
                        .map((part) => String(part || '').trim())
                        .filter(Boolean);
                    const previewMode = GUI.getSchemaPreviewMode(schema);
                    const previewLabel = GUI.getSchemaPreviewLabel(
                        schema,
                        previewMode === 'joined-words' ? 'Result' : 'Split preview'
                    );
                    const previewValue = previewMode === 'joined-words'
                        ? parts.join(GUI.getSchemaPreviewJoiner(schema))
                        : parts.join(' | ');
                    setRegexPreview(previewLabel, previewValue, true);
                } else {
                    const matches = Array.from(sampleValue.matchAll(new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : `${regex.flags}g`)))
                        .map((match) => match[0])
                        .filter(Boolean);
                    setRegexPreview('Match preview', matches.join(' | '), true);
                }
                preview.hidden = false;
            } catch (error) {
                status.textContent = `Invalid regex: ${String(error.message || error)}`;
                status.dataset.state = 'invalid';
                preview.hidden = true;
            }
        };

        input.addEventListener('input', syncRegexState);
        input.addEventListener('change', () => {
            GUI.commitPrimitiveValue(path, input.value, options);
            syncRegexState();
        });
        sampleInput.addEventListener('input', syncRegexState);
        syncRegexState();

        const nodes = [controls, status];
        if (sampleText) {
            nodes.push(sampleField, preview);
        }
        if (partDefinitions.length > 0) {
            nodes.push(partSection);
        }

        GUI.appendPrimitiveField(wrapper, path, 'string', schema, nodes, options);
        return wrapper;
    };

    GUI.renderGlobField = function renderGlobField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive config-glob-editor';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = value == null ? '' : String(value);
        GUI.bindPrimitiveField(input, path, 'glob', options);
        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp(input, path, schema);
        }

        const controls = document.createElement('div');
        controls.className = 'config-glob-editor__controls';

        const presets = GUI.getSchemaPresets(schema);
        if (presets.length > 0) {
            const presetPicker = GUI.createConfigPresetPicker({
                path,
                entries: presets,
                fieldRole: 'glob-preset',
                getValue: () => String(input.value || ''),
                onSelect: (selectedValue) => {
                    input.value = String(selectedValue == null ? '' : selectedValue);
                    GUI.commitPrimitiveValue(path, input.value, options);
                    syncGlobState();
                }
            });
            input.addEventListener('input', () => {
                presetPicker.setValue(input.value);
            });
            input.addEventListener('change', () => {
                presetPicker.setValue(input.value);
            });
            controls.append(input, presetPicker.picker);
        } else {
            controls.appendChild(input);
        }

        const status = document.createElement('div');
        status.className = 'config-glob-editor__status';

        const sampleText = GUI.getSchemaTestInput(schema);
        const sampleInput = document.createElement('input');
        sampleInput.type = 'text';
        sampleInput.value = sampleText;
        sampleInput.placeholder = 'Sample path';
        sampleInput.className = 'config-glob-editor__sample-input';

        const sampleField = document.createElement('label');
        sampleField.className = 'field field--manual config-glob-editor__sample';
        sampleField.innerHTML = '<span class="section-title gui-icon-label font-icon--interface--file">Sample</span>';
        sampleField.appendChild(sampleInput);

        const partDefinitions = GUI.getSchemaPartDefinitions(schema);
        const partsWrap = document.createElement('div');
        partsWrap.className = 'config-format-editor__tokens';
        partDefinitions.forEach((partDefinition) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'button button--small button--ghost config-format-editor__token';

            const valueNode = document.createElement('span');
            valueNode.className = 'config-format-editor__token-value';
            valueNode.textContent = partDefinition.value;
            button.appendChild(valueNode);

            if (partDefinition.name) {
                const nameNode = document.createElement('span');
                nameNode.className = 'config-format-editor__token-name';
                nameNode.textContent = partDefinition.name;
                button.appendChild(nameNode);
            }

            GUI.setConfigClickTooltip(button, 'Insert Part', `Insert ${partDefinition.value} into ${normalizePath(path) || 'this field'}.`);
            button.addEventListener('mousedown', (event) => {
                event.preventDefault();
            });
            button.addEventListener('click', () => {
                GUI.insertTextAtInputCursor(input, partDefinition.value, (nextValue) => {
                    GUI.commitPrimitiveValue(path, nextValue, options);
                    syncGlobState();
                });
            });
            partsWrap.appendChild(button);
        });
        const partSection = GUI.createConfigPartSection(schema, partsWrap);

        const preview = document.createElement('div');
        preview.className = 'config-glob-editor__preview';

        const setPreview = (labelText, valueText, state = '', usePill = true) => {
            preview.textContent = '';
            preview.dataset.state = String(state || '').trim().toLowerCase();
            const label = document.createElement('span');
            label.className = 'config-glob-editor__preview-label';
            label.textContent = `${labelText}:`;
            preview.appendChild(label);

            const values = document.createElement('span');
            values.className = 'config-glob-editor__preview-values';

            const valueNode = document.createElement('span');
            valueNode.className = usePill ? 'config-primitive__tag config-primitive__tag--path' : 'config-glob-editor__preview-empty';
            valueNode.textContent = valueText;
            values.appendChild(valueNode);
            preview.appendChild(values);
        };

        const syncGlobState = () => {
            const source = String(input.value || '').trim();
            const previewLabel = GUI.getSchemaPreviewLabel(schema, 'Match');
            if (sampleText) {
                preview.hidden = false;
            }
            if (!source) {
                status.textContent = 'Enter a glob pattern.';
                status.dataset.state = 'empty';
                if (sampleText) {
                    setPreview(previewLabel, 'no glob pattern', 'warn', false);
                }
                return;
            }

            try {
                GUI.globPatternToRegExp(source);
                status.textContent = 'Pattern is valid.';
                status.dataset.state = 'valid';

                if (!sampleText) {
                    preview.hidden = true;
                    return;
                }

                const matched = GUI.globPatternMatches(source, sampleInput.value);
                setPreview(previewLabel, matched ? 'matches sample' : 'does not match sample', matched ? 'success' : 'error', true);
            } catch (error) {
                status.textContent = `Invalid glob: ${String(error.message || error)}`;
                status.dataset.state = 'invalid';
                if (sampleText) {
                    setPreview(previewLabel, 'invalid glob pattern', 'error', false);
                }
            }
        };

        input.addEventListener('input', syncGlobState);
        input.addEventListener('change', () => {
            GUI.commitPrimitiveValue(path, input.value, options);
            syncGlobState();
        });
        sampleInput.addEventListener('input', syncGlobState);
        syncGlobState();

        const nodes = [controls, status];
        if (sampleText) {
            nodes.push(sampleField, preview);
        }
        if (partDefinitions.length > 0) {
            nodes.push(partSection);
        }

        GUI.appendPrimitiveField(wrapper, path, 'string', schema, nodes, options);
        return wrapper;
    };

    GUI.renderStringField = function renderStringField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = value == null ? '' : String(value);
        GUI.bindPrimitiveField(input, path, 'string', options);
        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp(input, path, schema);
        }
        const presets = GUI.getSchemaPresets(schema);
        const suggestions = GUI.getSchemaSuggestions(schema);
        const nodes = [];
        if (presets.length > 0 || suggestions.length > 0) {
            const row = document.createElement('div');
            row.className = 'field-with-action';
            const entries = presets.length > 0 ? presets : suggestions;
            const pickerFactory = presets.length > 0 ? GUI.createConfigPresetPicker : GUI.createConfigChoicePicker;
            const picker = pickerFactory({
                path,
                entries,
                fieldRole: 'string-suggestion',
                emptyLabel: presets.length > 0 ? 'Preset' : 'Option',
                getLabel: presets.length > 0 ? undefined : (() => 'Option'),
                getValue: () => String(input.value || ''),
                onSelect: (selectedValue) => {
                    input.value = String(selectedValue == null ? '' : selectedValue);
                    GUI.commitPrimitiveValue(path, input.value, options);
                }
            });
            input.addEventListener('input', () => {
                picker.setValue(input.value);
            });
            input.addEventListener('change', () => {
                GUI.commitPrimitiveValue(path, input.value, options);
                picker.setValue(input.value);
            });
            row.append(input, picker.picker);
            nodes.push(row);
        } else {
            input.addEventListener('change', () => GUI.commitPrimitiveValue(path, input.value, options));
            nodes.push(input);
        }

        GUI.appendPrimitiveField(wrapper, path, 'string', schema, nodes, options);
        return wrapper;
    };

    GUI.renderNullField = function renderNullField(path, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive';

        const empty = document.createElement('p');
        empty.className = 'config-empty';
        empty.textContent = 'Value is null.';
        if (GUI.shouldApplyPrimitiveFieldHelp(options)) {
            GUI.applyFieldHelp(empty, path, schema);
        }

        GUI.appendPrimitiveField(wrapper, path, 'null', schema, [empty], options);
        return wrapper;
    };

    GUI.renderPrimitiveEditor = function renderPrimitiveEditor(path, value, schema, explicitType = '', options = {}) {
        const type = explicitType || GUI.inferPrimitiveType(path, value);
        const formatKind = GUI.getSchemaFormatKind(schema);

        if (type === 'string' && formatKind === 'datetime-token-pattern') {
            return GUI.renderDateTimeFormatField(path, value, schema, options);
        }
        if (type === 'string' && formatKind === 'regex-pattern') {
            return GUI.renderRegexField(path, value, schema, options);
        }
        if (type === 'string' && formatKind === 'glob-pattern') {
            return GUI.renderGlobField(path, value, schema, options);
        }

        switch (type) {
        case 'boolean':
            return GUI.renderBooleanField(path, value, schema, options);
        case 'enum':
            return GUI.renderEnumField(path, value, schema, options);
        case 'color':
            return GUI.renderColorField(path, value, schema, options);
        case 'path':
            return GUI.renderPathField(path, value, schema, options);
        case 'integer':
        case 'number':
            return GUI.renderNumberField(path, value, schema, type, options);
        case 'object':
            return GUI.renderJsonField(path, value, schema, 'object', options);
        case 'array':
            return GUI.renderJsonField(path, value, schema, 'array', options);
        case 'null':
            return GUI.renderNullField(path, schema, options);
        default:
            return GUI.renderStringField(path, value, schema, options);
        }
    };

    GUI.renderUnionField = function renderUnionField(path, value, schema, options = {}) {
        const wrapper = document.createElement('div');
        wrapper.className = 'config-primitive config-union';

        const controls = document.createElement('div');
        controls.className = 'config-union__controls';

        const unionEntries = GUI.getUnionEntries(path);
        const currentType = GUI.getUnionValueKind(value);
        const availableKinds = unionEntries.length > 0
            ? unionEntries
            : [{ value: currentType, label: currentType, name: '' }];
        const typePicker = GUI.createConfigChoicePicker({
            path,
            entries: availableKinds,
            value: availableKinds.some((entry) => String(entry && entry.value || '').trim().toLowerCase() === currentType)
                ? currentType
                : String(availableKinds[0] && availableKinds[0].value || currentType),
            fieldRole: 'union-type',
            rootClassName: 'config-picker config-picker--inline dropdown',
            helpSchema: Object.assign({}, schema, {
                description: schema.description || 'Select the active value type for this union field.'
            }),
            onSelect: (selectedValue) => {
                const nextType = String(selectedValue || currentType).trim().toLowerCase();
                const previousType = GUI.getUnionValueKind(GUI.getValue(path));
                if (previousType === nextType) return;
                GUI.rememberUnionBranchValue(path, previousType, GUI.getValue(path));
                const oneOf = schema && schema.structure && Array.isArray(schema.structure.oneOf)
                    ? schema.structure.oneOf
                    : [];
                const selected = oneOf.find((entry) => String(entry && entry.kind || '').trim().toLowerCase() === nextType)
                    || {};
                const rememberedValue = GUI.getRememberedUnionBranchValue(path, nextType);
                const defaultRoot = STATE.configModel && STATE.configModel.defaultConfig;
                const defaultValue = defaultRoot && typeof defaultRoot === 'object'
                    ? GUI.getValueFromRoot(defaultRoot, path)
                    : undefined;
                const nextValue = GUI.valueMatchesKind(rememberedValue, nextType)
                    ? rememberedValue
                    : GUI.valueMatchesKind(defaultValue, nextType)
                    ? clone(defaultValue)
                    : GUI.createDefaultValueFromSchemaEntry({
                        key: schema.key || path,
                        type: nextType,
                        enum: schema.enum,
                        structure: selected.kind ? Object.assign({}, selected, { kind: selected.kind }) : {}
                    }, path);
                GUI.setValue(path, nextValue);
            }
        });
        controls.appendChild(typePicker.picker);

        const selectedType = String(typePicker.getValue() || currentType).trim().toLowerCase();
        let editor;
        if (selectedType === 'array' && Array.isArray(value)) {
            const arrayEditor = GUI.buildArrayEditor(path, value);
            editor = document.createElement('div');
            editor.className = 'config-union__composite';
            arrayEditor.actions.classList.add('config-union__actions');
            controls.appendChild(arrayEditor.actions);
            editor.appendChild(arrayEditor.body);
        } else if (selectedType === 'object' && value && typeof value === 'object' && !Array.isArray(value)) {
            const objectEditor = GUI.buildObjectEditor(path, value);
            editor = document.createElement('div');
            editor.className = 'config-union__composite';
            if (objectEditor.actions) {
                objectEditor.actions.classList.add('config-union__actions');
                controls.appendChild(objectEditor.actions);
            }
            editor.appendChild(objectEditor.body);
        } else {
            editor = GUI.renderPrimitiveEditor(
                path,
                value,
                schema,
                selectedType,
                options
            );
        }
        wrapper.append(controls, editor);
        return wrapper;
    };

    GUI.renderLeafContent = function renderLeafContent(path, value, options = {}) {
        const schema = options && options.schemaOverride && typeof options.schemaOverride === 'object'
            ? options.schemaOverride
            : (GUI.findSchemaEntry(path) || {});
        const schemaKind = String(schema && schema.structure && schema.structure.kind || '').trim().toLowerCase()
            || GUI.getSchemaKind(path);
        const explicitType = String(options && options.explicitType || '').trim().toLowerCase();
        if (GUI.isCustomSchemaEditablePath(path)) {
            return GUI.renderPrimitiveEditor(
                path,
                value,
                schema,
                explicitType || GUI.getCustomValueType(value, schema),
                options
            );
        }
        return schemaKind === 'union'
            ? GUI.renderUnionField(path, value, schema, options)
            : GUI.renderPrimitiveEditor(path, value, schema, explicitType, options);
    };

    GUI.renderPrimitive = function renderPrimitive(path, value) {
        const schema = GUI.findSchemaEntry(path) || {};
        const body = GUI.renderLeafContent(path, value, { includeMeta: false });
        const node = GUI.createNodeShell(
            path,
            GUI.getNodeTitle(path),
            schema.description || '',
            body,
            null,
            {
                collapsible: false,
                typeLabel: GUI.getNodeTypeLabel(path, value)
            }
        );
        const nodeBody = node.querySelector(':scope > .config-node__body');
        GUI.appendCustomSchemaPanel(nodeBody, path, value);
        return node;
    };

    GUI.buildArrayEditor = function buildArrayEditor(path, value) {
        const schema = GUI.findSchemaEntry(path) || {};
        const arraySchema = GUI.getArraySchemaInfo(path, value);
        const body = document.createElement('div');
        body.className = 'config-children';
        const itemPathBase = normalizePath(path);

        value.forEach((item, index) => {
            const removeButton = GUI.createConfigActionButton('Remove', 'font-icon--interface--trashcan', {
                tooltipHeading: 'Remove Item',
                tooltip: `Remove array item ${index} from ${normalizePath(path) || '(root)'}.`
            });
            removeButton.addEventListener('click', () => GUI.deleteValue(`${itemPathBase}.${index}`));
            const actionButtons = GUI.createArrayItemActionButtons(path, index, value.length, removeButton);
            const childPath = `${itemPathBase}.${index}`;
            const childSchema = GUI.getArrayItemSchema(path, value, index);

            if (Array.isArray(item) || (item && typeof item === 'object')) {
                const childNode = GUI.renderNode(childPath, item);
                Array.from(actionButtons.children).forEach((button) => GUI.appendNodeAction(childNode, button));
                body.appendChild(childNode);
                return;
            }

            const entry = document.createElement('article');
            entry.className = 'config-array-entry';
            const header = document.createElement('div');
            header.className = 'config-array-entry__header';
            const headerCopy = document.createElement('div');
            headerCopy.className = 'config-array-entry__copy';
            headerCopy.innerHTML = `<strong class="config-array-entry__index">Item ${index}</strong>`;
            const headerMeta = GUI.createPrimitiveHeaderMeta(
                childPath,
                GUI.getPrimitiveMetaType(childPath, item, childSchema),
                childSchema,
                {
                    classPrefix: 'config-array-entry'
                }
            );
            headerCopy.appendChild(headerMeta.meta);
            if (headerMeta.hint) {
                headerCopy.appendChild(headerMeta.hint);
            }
            header.append(headerCopy, actionButtons);

            const content = document.createElement('div');
            content.className = 'config-array-entry__body';
            content.appendChild(GUI.renderLeafContent(childPath, item, {
                includeMeta: false,
                schemaOverride: childSchema,
                explicitType: arraySchema.itemsKind || ''
            }));
            GUI.appendCustomSchemaPanel(content, childPath, item);

            entry.append(header, content);
            body.appendChild(entry);
        });

        if (value.length <= 0) {
            const empty = document.createElement('p');
            empty.className = 'config-empty';
            empty.textContent = 'Array is empty.';
            body.appendChild(empty);
        }

        const actions = document.createElement('div');
        const addButton = GUI.createConfigActionButton('Add Item', 'font-icon--interface--add', {
            primary: true,
            tooltipHeading: 'Add Item',
            tooltip: `Add a new array item seeded from config defaults or schema to ${normalizePath(path) || '(root)'}.`
        });
        addButton.addEventListener('click', () => {
            const next = Array.isArray(GUI.getValue(path)) ? clone(GUI.getValue(path)) : [];
            let nextItemValue = '';
            if (arraySchema.itemsKey) {
                const itemsKey = String(arraySchema.itemsKey).replace(/\[\]$/, `.${next.length}`);
                nextItemValue = GUI.createDefaultValue(itemsKey);
            } else if (arraySchema.itemsKind) {
                nextItemValue = GUI.createDefaultValueFromSchemaEntry({
                    type: arraySchema.itemsKind,
                    structure: ['object', 'array'].includes(arraySchema.itemsKind)
                        ? { kind: arraySchema.itemsKind }
                        : {}
                }, `${itemPathBase}.${next.length}`);
            } else {
                nextItemValue = GUI.createDefaultValue(`${itemPathBase}.${next.length}`);
            }
            next.push(nextItemValue);
            GUI.expandConfigSection(path);
            GUI.setValue(path, next);
        });
        actions.appendChild(addButton);

        return { body, actions };
    };

    GUI.renderArray = function renderArray(path, value) {
        const schema = GUI.findSchemaEntry(path) || {};
        const editor = GUI.buildArrayEditor(path, value);
        const node = GUI.createNodeShell(path, GUI.getNodeTitle(path), schema.description || '', editor.body, editor.actions, {
            collapsible: true,
            typeLabel: GUI.getNodeTypeLabel(path, value, 'array')
        });
        const nodeBody = node.querySelector(':scope > .config-node__body');
        GUI.appendCustomSchemaPanel(nodeBody, path, value);
        return node;
    };

    GUI.buildObjectEditor = function buildObjectEditor(path, value) {
        const body = document.createElement('div');
        body.className = 'config-children';
        const isMapRoot = GUI.isMapRootObject(path);
        const keys = GUI.sortConfigKeys(GUI.getOrderedObjectKeys(path, value), path)
            .filter((key) => !(GUI.isProjectConfigMode() && !path && key === 'custom'))
            .filter(Boolean);

        keys.forEach((key) => {
            const childPath = path ? `${normalizePath(path)}.${key}` : key;
            const childValue = value[key];
            const childSchema = GUI.findSchemaEntry(childPath) || {};
            const removeButton = GUI.canDeleteObjectChild(path, key)
                ? GUI.createConfigActionButton('Remove', 'font-icon--interface--trashcan', {
                    tooltipHeading: 'Remove Property',
                    tooltip: `Remove ${childPath} from this dynamic section.`
                })
                : null;

            if (removeButton) {
                removeButton.addEventListener('click', () => {
                    if (GUI.isCustomSchemaEditablePath(childPath) || normalizePath(childPath).startsWith('custom.')) {
                        GUI.deleteCustomValue(childPath);
                        return;
                    }
                    GUI.deleteValue(childPath);
                });
            }

            if (Array.isArray(childValue) || (childValue && typeof childValue === 'object')) {
                const childNode = GUI.renderNode(childPath, childValue);
                if (isMapRoot) {
                    const titleNode = childNode.querySelector(':scope > .config-node__header .config-node__title');
                    if (titleNode && titleNode.parentNode) {
                        titleNode.replaceWith(GUI.createEditableObjectKeyInput(path, key));
                    }
                }
                if (removeButton) {
                    GUI.appendNodeAction(childNode, removeButton);
                }
                body.appendChild(childNode);
                return;
            }

            const entry = document.createElement('article');
            entry.className = 'config-object-entry';
            const header = document.createElement('div');
            header.className = 'config-object-entry__header';
            const headerCopy = document.createElement('div');
            headerCopy.className = 'config-object-entry__copy';
            if (isMapRoot) {
                headerCopy.appendChild(GUI.createEditableObjectKeyInput(path, key));
            } else {
                headerCopy.innerHTML = `<strong class="config-object-entry__key">${escapeHtml(key)}</strong>`;
            }
            header.setAttribute('aria-label', normalizePath(childPath) || key);
            const headerMeta = GUI.createPrimitiveHeaderMeta(
                childPath,
                GUI.getPrimitiveMetaType(childPath, childValue, childSchema),
                childSchema,
                {
                    classPrefix: 'config-object-entry'
                }
            );
            headerCopy.appendChild(headerMeta.meta);
            if (headerMeta.hint) {
                headerCopy.appendChild(headerMeta.hint);
            }
            header.appendChild(headerCopy);
            if (removeButton) {
                header.appendChild(removeButton);
            }

            const content = document.createElement('div');
            content.className = 'config-object-entry__body';
            content.appendChild(GUI.renderLeafContent(childPath, childValue, { includeMeta: false }));
            GUI.appendCustomSchemaPanel(content, childPath, childValue);
            entry.append(header, content);
            body.appendChild(entry);
        });

        if (keys.length <= 0) {
            const empty = document.createElement('p');
            empty.className = 'config-empty';
            empty.textContent = 'Object has no properties.';
            body.appendChild(empty);
        }

        const actions = document.createElement('div');
        actions.className = 'config-node__actions config-node__actions--object';

        const missingDirectProperties = GUI.getMissingDirectObjectProperties(path, value);
        const canAddManualProperty = isMapRoot;

        if (missingDirectProperties.length > 0) {
            const presetRow = document.createElement('div');
            presetRow.className = 'config-inline-add';

            let selectedProperty = missingDirectProperties[0] || '';
            const propertyPicker = GUI.createConfigChoicePicker({
                path: path || '(object)',
                entries: missingDirectProperties,
                value: selectedProperty,
                fieldRole: 'object-add-preset',
                onSelect: (nextValue) => {
                    selectedProperty = String(nextValue || '').trim();
                }
            });

            const addPresetButton = GUI.createConfigActionButton('Add Property', 'font-icon--interface--add', {
                primary: true,
                tooltipHeading: 'Add Property',
                tooltip: 'Add the selected schema-defined property to this object.'
            });
            addPresetButton.addEventListener('click', () => {
                const key = String(selectedProperty || '').trim();
                if (!key) return;
                const next = value && typeof value === 'object' ? clone(value) : {};
                next[key] = GUI.createDefaultValue(path ? `${normalizePath(path)}.${key}` : key);
                GUI.expandConfigSection(path);
                GUI.setValue(path, next);
            });

            presetRow.append(propertyPicker.picker, addPresetButton);
            actions.appendChild(presetRow);
        }

        if (canAddManualProperty) {
            const customRow = document.createElement('div');
            customRow.className = 'config-inline-add';

            const customInput = document.createElement('input');
            customInput.type = 'text';
            customInput.className = 'config-inline-add__input';
            customInput.placeholder = isMapRoot ? 'New item key' : 'New property name';
            GUI.bindConfigField(customInput, path || '(object)', isMapRoot ? 'map-add-key' : 'object-add-key');

            const addCustomButton = GUI.createConfigActionButton(
                isMapRoot ? 'Add Item' : 'Add Property',
                'font-icon--interface--add',
                {
                    primary: true,
                    tooltipHeading: isMapRoot ? 'Add Item' : 'Add Property',
                    tooltip: isMapRoot
                        ? `Add a new dynamic map item with this key to ${normalizePath(path) || '(root)'}.`
                        : 'Add a new property with this name.'
                }
            );
            const validationMessage = document.createElement('div');
            validationMessage.className = 'config-validation-message';
            validationMessage.hidden = true;
            const syncAddCustomButtonState = () => {
                const message = GUI.getObjectChildKeyValidationMessage(path, customInput.value);
                addCustomButton.disabled = Boolean(message);
                GUI.setConfigInputValidationState(customInput, validationMessage, message);
            };
            addCustomButton.addEventListener('click', () => {
                const key = String(customInput.value || '').trim();
                if (!key) return;

                const next = value && typeof value === 'object' ? clone(value) : {};
                if (Object.prototype.hasOwnProperty.call(next, key)) {
                    logEvent('warn', 'Property already exists in structured config editor.', {
                        path: path || 'root',
                        key
                    });
                    return;
                }

                next[key] = isMapRoot
                    ? GUI.getDefaultMapObjectValue(path, key)
                    : GUI.createDefaultValue(path ? `${normalizePath(path)}.${key}` : key);
                GUI.expandConfigSection(path);
                GUI.setValue(path, next);
            });
            customInput.addEventListener('input', syncAddCustomButtonState);
            customInput.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter') return;
                event.preventDefault();
                if (addCustomButton.disabled) return;
                addCustomButton.click();
            });
            syncAddCustomButtonState();

            customRow.append(customInput, addCustomButton);
            customRow.appendChild(validationMessage);
            actions.appendChild(customRow);
        }

        const effectiveActions = actions.childNodes.length > 0 ? actions : null;

        return { body, actions: effectiveActions };
    };

    GUI.renderObject = function renderObject(path, value) {
        const schema = GUI.findSchemaEntry(path) || {};
        const editor = GUI.buildObjectEditor(path, value);
        const node = GUI.createNodeShell(path, GUI.getNodeTitle(path), schema.description || '', editor.body, editor.actions, {
            collapsible: true,
            typeLabel: GUI.getNodeTypeLabel(path, value, 'object')
        });
        const nodeBody = node.querySelector(':scope > .config-node__body');
        GUI.appendCustomSchemaPanel(nodeBody, path, value);
        return node;
    };

    GUI.renderCustomSection = function renderCustomSection() {
        const addSchema = {
            key: 'custom',
            description: 'Project-only keys. Type metadata is stored in project config.schema.json so custom keys keep the correct editor widget.'
        };

        const addBody = document.createElement('div');
        addBody.className = 'config-custom__body';

        const addGrid = document.createElement('div');
        addGrid.className = 'config-custom__add-grid panel panel--section';

        const addHeading = document.createElement('div');
        addHeading.className = 'config-custom__add-heading section-title gui-icon-label font-icon--interface--add';
        addHeading.textContent = 'Add Custom Key';
        addGrid.appendChild(addHeading);

        const keyField = document.createElement('label');
        keyField.className = 'field field--manual config-custom__field';
        keyField.innerHTML = '<span class="field__label">Key</span>';
        const customDraft = GUI.getConfigCustomDraft();

        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.placeholder = 'example.flag or nested.value';
        keyInput.value = String(customDraft.key || '');
        keyField.appendChild(keyInput);
        const keyValidationMessage = document.createElement('div');
        keyValidationMessage.className = 'config-validation-message';
        keyValidationMessage.hidden = true;
        keyField.appendChild(keyValidationMessage);

        const draftSchemaPanel = document.createElement('section');
        draftSchemaPanel.className = 'config-custom-schema config-custom-schema--draft panel panel--section';

        const draftSchemaHeading = document.createElement('div');
        draftSchemaHeading.className = 'config-custom-schema__heading section-title gui-icon-label font-icon--interface--tag';
        draftSchemaHeading.textContent = 'Custom Schema';
        draftSchemaPanel.appendChild(draftSchemaHeading);

        const draftSchemaGrid = document.createElement('div');
        draftSchemaGrid.className = 'config-custom-schema__grid';
        draftSchemaPanel.appendChild(draftSchemaGrid);

        const typeField = document.createElement('div');
        typeField.className = 'field field--manual config-custom__field';
        typeField.innerHTML = '<span class="field__label">Type</span>';
        let selectedCustomType = String(customDraft.type || 'string').trim().toLowerCase() || 'string';
        const typePicker = GUI.createConfigChoicePicker({
            path: 'custom',
            entries: GUI.getCustomTypeOptions(),
            value: selectedCustomType,
            fieldRole: 'custom-add-type',
            rootClassName: 'config-picker config-picker--inline config-picker--compact dropdown',
            onSelect: (nextValue) => {
                selectedCustomType = String(nextValue || 'string').trim().toLowerCase();
                customDraft.type = selectedCustomType;
                syncEnumFieldVisibility();
            }
        });
        typeField.appendChild(typePicker.picker);
        draftSchemaGrid.appendChild(typeField);

        const descriptionField = document.createElement('label');
        descriptionField.className = 'field field--manual config-custom-schema__field config-custom-schema__field--description';
        descriptionField.innerHTML = '<span class="field__label">Description</span>';
        const descriptionInput = document.createElement('input');
        descriptionInput.type = 'text';
        descriptionInput.placeholder = 'Optional schema description';
        descriptionInput.value = String(customDraft.description || '');
        GUI.bindConfigField(descriptionInput, 'custom', 'custom-add-description');
        descriptionInput.addEventListener('input', () => {
            customDraft.description = descriptionInput.value;
        });
        descriptionField.appendChild(descriptionInput);
        draftSchemaGrid.appendChild(descriptionField);

        const itemTypeField = document.createElement('div');
        itemTypeField.className = 'field field--manual config-custom-schema__field';
        itemTypeField.innerHTML = '<span class="field__label">Item Type</span>';
        let selectedArrayItemType = String(customDraft.array_item_type || 'string').trim().toLowerCase() || 'string';
        const itemTypePicker = GUI.createConfigChoicePicker({
            path: 'custom',
            entries: GUI.getCustomArrayItemTypeOptions(),
            value: selectedArrayItemType,
            fieldRole: 'custom-array-item-type',
            rootClassName: 'config-picker config-picker--inline config-picker--compact dropdown',
            onSelect: (nextValue) => {
                selectedArrayItemType = String(nextValue || 'string').trim().toLowerCase();
                customDraft.array_item_type = selectedArrayItemType;
            }
        });
        itemTypeField.appendChild(itemTypePicker.picker);

        const valueField = document.createElement('div');
        valueField.className = 'field field--manual config-custom__field config-custom__field--value';
        valueField.innerHTML = '<span class="field__label">Value</span>';
        const valueControl = document.createElement('div');
        valueControl.className = 'config-custom__value-control';
        valueField.appendChild(valueControl);

        const addActions = document.createElement('div');
        addActions.className = 'config-custom__add-actions';
        const addButton = GUI.createConfigActionButton('Add', 'font-icon--interface--add', {
            primary: true,
            tooltipHeading: 'Add Custom Key',
            tooltip: 'Add the custom key and its schema metadata to the project config editor.'
        });
        addActions.appendChild(addButton);

        const customDraftState = customDraft.values;
        let readCustomDraftValue = () => customDraftState[String(selectedCustomType || 'string').trim().toLowerCase()] || '';

        const getCustomDraftPath = () => {
            const normalizedKey = String(keyInput.value || '').trim().replace(/\.+/g, '.').replace(/^\./, '').replace(/\.$/, '');
            return normalizedKey ? `custom.${normalizedKey}` : 'custom';
        };

        const getCustomDraftSchema = () => {
            const normalizedType = String(selectedCustomType || 'string').trim().toLowerCase();
            return GUI.buildCustomSchemaEntry(getCustomDraftPath(), normalizedType, normalizedType === 'array' ? selectedArrayItemType : '', {
                description: addSchema.description
            });
        };

        const renderCustomValueControl = () => {
            const normalizedType = String(selectedCustomType || 'string').trim().toLowerCase();
            valueControl.replaceChildren();
            if (normalizedType === 'object' || normalizedType === 'array') {
                const empty = document.createElement('p');
                empty.className = 'config-empty';
                empty.textContent = normalizedType === 'object'
                    ? 'Adds as an empty object. Add the key first, then edit its children below with the structured editor.'
                    : 'Adds as an empty array. Add the key first, then edit its items below with the structured editor.';
                valueControl.appendChild(empty);
                readCustomDraftValue = () => '';
                return;
            }
            const draftSchema = getCustomDraftSchema();
            const draftPath = getCustomDraftPath();
            const seededValue = GUI.parseCustomValue(normalizedType, customDraftState[normalizedType]);
            const initialValue = normalizedType === 'color'
                ? GUI.normalizeHexColor(customDraftState.color) || '#ffffff'
                : seededValue;
            const editor = GUI.renderPrimitiveEditor(draftPath, initialValue, draftSchema, normalizedType, {
                includeMeta: false,
                bindField: false,
                applyHelp: false,
                onChange: (nextValue) => {
                    if (normalizedType === 'boolean') {
                        customDraftState.boolean = Boolean(nextValue);
                        return;
                    }
                    if (normalizedType === 'number') {
                        customDraftState.number = String(nextValue == null ? '' : nextValue);
                        return;
                    }
                    if (normalizedType === 'object' || normalizedType === 'array') {
                        try {
                            customDraftState[normalizedType] = JSON.stringify(nextValue, null, 4);
                        } catch {
                            customDraftState[normalizedType] = normalizedType === 'array' ? '[]' : '{}';
                        }
                        return;
                    }
                    customDraftState[normalizedType] = nextValue == null ? '' : String(nextValue);
                }
            });
            valueControl.appendChild(editor);
            if (normalizedType === 'boolean') {
                readCustomDraftValue = () => String(Boolean(customDraftState.boolean));
                return;
            }
            readCustomDraftValue = () => String(customDraftState[normalizedType] || '');
        };

        const syncEnumFieldVisibility = () => {
            const shouldShowItemType = String(selectedCustomType || '').trim().toLowerCase() === 'array';
            draftSchemaPanel.classList.toggle('config-custom-schema--has-item-type', shouldShowItemType);
            if (shouldShowItemType) {
                if (!itemTypeField.parentNode) {
                    if (descriptionField.parentNode === draftSchemaGrid) {
                        draftSchemaGrid.insertBefore(itemTypeField, descriptionField);
                    }
                }
            } else if (itemTypeField.parentNode) {
                itemTypeField.remove();
            }
            renderCustomValueControl();
        };

        GUI.applyFieldHelp(typePicker.button, 'custom', Object.assign({}, addSchema, {
            description: 'Select the datatype for the new custom key.'
        }));
        keyInput.addEventListener('input', () => {
            customDraft.key = keyInput.value;
        });

        addButton.addEventListener('click', () => {
            const key = String(keyInput.value || '').trim();
            if (!key) return;

            const normalizedType = String(selectedCustomType || 'string').trim().toLowerCase();
            const value = GUI.parseCustomValue(normalizedType, readCustomDraftValue());
            const parts = key.split('.').map((item) => item.trim()).filter(Boolean);
            if (parts.length <= 0) return;

            const schemaKey = `custom.${parts.join('.')}`;
            const previousSchemaEntry = GUI.findProjectSchemaEntry(schemaKey) || {};

            const nextCustom = clone(GUI.getCustomConfigObject());
            let cursor = nextCustom;
            for (let index = 0; index < parts.length - 1; index += 1) {
                const part = parts[index];
                if (!cursor[part] || typeof cursor[part] !== 'object' || Array.isArray(cursor[part])) {
                    cursor[part] = {};
                }
                cursor = cursor[part];
            }
            cursor[parts[parts.length - 1]] = value;

            GUI.upsertProjectSchemaEntry(
                GUI.buildCustomSchemaEntry(schemaKey, normalizedType, normalizedType === 'array' ? selectedArrayItemType : '', {
                    description: String(customDraft.description || '').trim() || previousSchemaEntry.description || '',
                    type: previousSchemaEntry.type
                })
            );
            GUI.expandConfigSection('custom');
            customDraft.key = '';
            customDraft.description = '';
            if (normalizedType === 'boolean') {
                customDraftState.boolean = false;
            } else if (normalizedType === 'color') {
                customDraftState.color = '#ffffff';
            } else if (normalizedType === 'object') {
                customDraftState.object = '';
            } else if (normalizedType === 'array') {
                customDraftState.array = '';
            } else {
                customDraftState[normalizedType] = '';
            }
            keyInput.value = '';
            descriptionInput.value = '';
            GUI.setValue('custom', nextCustom);
        });
        const syncAddCustomSchemaButtonState = () => {
            const key = String(keyInput.value || '').trim();
            const parts = key.split('.').map((item) => item.trim()).filter(Boolean);
            const currentCustom = GUI.getCustomConfigObject();
            let cursor = currentCustom;
            let exists = false;
            let message = '';
            for (let index = 0; index < parts.length; index += 1) {
                const part = parts[index];
                if (!cursor || typeof cursor !== 'object' || Array.isArray(cursor) || !Object.prototype.hasOwnProperty.call(cursor, part)) {
                    exists = false;
                    break;
                }
                if (index === parts.length - 1) {
                    exists = true;
                    break;
                }
                cursor = cursor[part];
            }
            if (parts.length <= 0) {
                message = 'Enter a unique key.';
            } else if (exists) {
                message = 'Key already exists.';
            }
            GUI.setConfigInputValidationState(keyInput, keyValidationMessage, message);
            addButton.disabled = parts.length <= 0 || exists;
        };
        keyInput.addEventListener('input', syncAddCustomSchemaButtonState);
        syncAddCustomSchemaButtonState();

        addGrid.append(keyField, draftSchemaPanel, valueField, addActions);
        syncEnumFieldVisibility();
        addBody.append(addGrid);

        const customEditor = GUI.buildObjectEditor('custom', GUI.getCustomConfigObject());
        customEditor.body.classList.add('panel', 'panel--section', 'config-custom__children');
        const childrenHeading = document.createElement('div');
        childrenHeading.className = 'config-custom__children-heading section-title gui-icon-label font-icon--interface--list';
        childrenHeading.textContent = 'Custom Keys';
        customEditor.body.prepend(childrenHeading);
        addBody.appendChild(customEditor.body);
        return GUI.createNodeShell('custom', 'custom.*', addSchema.description, addBody, null, {
            collapsible: true,
            sectionKey: 'custom',
            typeLabel: 'object'
        });
    };

    GUI.renderNode = function renderNode(path, value) {
        if (GUI.isCustomSchemaEditablePath(path)) {
            if (Array.isArray(value)) return GUI.renderArray(path, value);
            if (value && typeof value === 'object') return GUI.renderObject(path, value);
        }
        if (GUI.getSchemaKind(path) === 'union') return GUI.renderPrimitive(path, value);
        if (Array.isArray(value)) return GUI.renderArray(path, value);
        if (value && typeof value === 'object') return GUI.renderObject(path, value);
        return GUI.renderPrimitive(path, value);
    };

    GUI.renderPrimaryConfigSections = function renderPrimaryConfigSections(value) {
        const fragment = document.createDocumentFragment();
        const currentValue = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
        const keys = GUI.sortConfigKeys(Object.keys(currentValue))
            .filter((key) => !(GUI.isProjectConfigMode() && key === 'custom'));

        keys.forEach((key) => {
            fragment.appendChild(GUI.renderNode(key, currentValue[key]));
        });

        return fragment;
    };

    GUI.renderConfigForm = function renderConfigForm(uiStateOverride = null) {
        const previousUiState = uiStateOverride && typeof uiStateOverride === 'object'
            ? uiStateOverride
            : GUI.captureConfigUiState();
        UI.configForm.replaceChildren();
        if (!STATE.configData || typeof STATE.configData !== 'object') {
            const empty = document.createElement('p');
            empty.className = 'config-empty';
            empty.textContent = 'No config data loaded.';
            UI.configForm.appendChild(empty);
            GUI.restoreConfigUiState(previousUiState);
            return;
        }

        UI.configForm.appendChild(GUI.renderPrimaryConfigSections(STATE.configData));
        if (GUI.isProjectConfigMode()) {
            UI.configForm.appendChild(GUI.renderCustomSection());
        }
        GUI.restoreConfigUiState(previousUiState);
    };
})();
