MUtilities = MUtilities || {};

UI.registerHelper('dateFormat', function(value) {
	return MUtilities.dateFormat(new Date(value));
});

UI.registerHelper('datetimeFormat', function(value) {
	return MUtilities.datetimeFormat(new Date(value));
});
