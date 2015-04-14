MUtilities = MUtilities || {};

UI.registerHelper('should', function(verb, x, y) {
	if (arguments.length <= 3) {
		return x ? verb : '';
	} else {
		return x === y ? verb : '';
	}
});

UI.registerHelper('not', function(verb, x, y) {
	if (arguments.length <= 3) {
		return x ? '' : verb;
	} else {
		return x === y ? '': verb;
	}
});