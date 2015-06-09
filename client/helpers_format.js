MUtilities = MUtilities || {};

UI.registerHelper('numberFormat', function(value, padString, count) {
	return MUtilities.numberFormat(value, padString, count);
});

UI.registerHelper('dateFormat', function(value) {
	return MUtilities.dateFormat(new Date(value));
});

UI.registerHelper('datetimeFormat', function(value) {
	return MUtilities.datetimeFormat(new Date(value));
});

UI.registerHelper('currencyFormat', function(value, sign, decimal, skipZero) {
	return MUtilities.currencyFormat(value, sign, decimal, skipZero);
});
