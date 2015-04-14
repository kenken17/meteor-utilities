MUtilities = MUtilities || {};

UI.registerHelper('should', function(verb, x, y) {
	if (y) {
		return x === y ? verb : '';
	} else {
		return x ? verb : '';
	}

	return x === y ? verb : '';
});

UI.registerHelper('not', function(verb, x, y) {
	if (y) {
		return x === y ? '': verb;
	} else {
		return x ? '' : verb;
	}
});