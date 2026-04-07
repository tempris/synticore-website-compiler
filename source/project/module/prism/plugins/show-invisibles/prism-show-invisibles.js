(function () {

	if (typeof Prism === 'undefined') {
		return;
	}

	var invisibles = {
		'tab': /\t/,
		'crlf': /\r\n/,
		'lf': /\n/,
		'cr': /\r/,
		'space': / /
	};

	function isGrammarObject(value) {
		return value && Prism.util.type(value) === 'Object';
	}

	/**
	 * Handles the recursive calling of `addInvisibles` for one token.
	 *
	 * @param {Object|Array} tokens The grammar or array which contains the token.
	 * @param {string|number} name The name or index of the token in `tokens`.
	 */
	function handleToken(tokens, name) {
		var value = tokens[name];
		if (value == null) {
			return;
		}

		var type = Prism.util.type(value);
		switch (type) {
			case 'RegExp':
				var inside = {};
				tokens[name] = {
					pattern: value,
					inside: inside
				};
				addInvisibles(inside);
				break;

			case 'Array':
				for (var i = 0, l = value.length; i < l; i++) {
					handleToken(value, i);
				}
				break;

			case 'Object':
				if (value.pattern || value.inside || value.rest) {
					inside = value.inside;
					if (inside == null) {
						inside = value.inside = {};
					}
					addInvisibles(inside);
					if (value.rest) {
						addInvisibles(value.rest);
					}
					break;
				}

				addInvisibles(value);
				break;
		}
	}

	/**
	 * Recursively adds patterns to match invisible characters to the given grammar (if not added already).
	 *
	 * @param {Object} grammar
	 */
	function addInvisibles(grammar) {
		if (!isGrammarObject(grammar) || grammar['tab']) {
			return;
		}

		// assign invisibles here to "mark" the grammar in case of self references
		for (var name in invisibles) {
			if (invisibles.hasOwnProperty(name)) {
				grammar[name] = invisibles[name];
			}
		}

		for (name in grammar) {
			if (grammar.hasOwnProperty(name) && !invisibles[name]) {
				if (name === 'rest') {
					addInvisibles(grammar[name]);
				} else {
					handleToken(grammar, name);
				}
			}
		}
	}

	Prism.hooks.add('before-highlight', function (env) {
		var element = env && env.element;
		if (!element || !Prism.util.isActive(element, 'show-invisibles', false)) {
			return;
		}

		if (env.grammar) {
			env.grammar = Prism.util.clone(env.grammar);
		}

		addInvisibles(env.grammar);
	});
}());
