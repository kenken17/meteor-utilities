MUtilities = MUtilities || {};

UI.registerHelper('shouldActive', function(x, y) {
	return x === y ? 'active' : '';
});

UI.registerHelper('notActive', function(x, y) {
	return x === y ? '' : 'active';
});

UI.registerHelper('shouldSelected', function(x, y) {
	return x == y ? 'selected' : '';
});

UI.registerHelper('notSelected', function(x, y) {
	return x == y ? '' : 'selected';
});

UI.registerHelper('shouldChecked', function(x, y) {
	return x == y ? 'checked' : '';
});

UI.registerHelper('notChecked', function(x, y) {
	return x == y ? '' : 'checked';
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