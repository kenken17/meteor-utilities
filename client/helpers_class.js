MUtilities = MUtilities || {};

UI.registerHelper('should', function(verb, x, y) {
	return x === y ? verb : '';
});

UI.registerHelper('not', function(verb, x, y) {
	return x === y ? '': verb;
});

UI.registerHelper('shouldDisabled', function(state) {
	return state ? 'disabled' : '';
});

UI.registerHelper('notDisabled', function(state) {
	return state ? '' : 'disabled';
});

UI.registerHelper('shouldHide', function(state) {
	return state ? 'hide' : '';
});

UI.registerHelper('notHide', function(state) {
	return state ? '' : 'hide';
});