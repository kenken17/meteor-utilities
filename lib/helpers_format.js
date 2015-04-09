MUtilities = MUtilities || {};

MUtilities.dateFormat = function(date) {
	if (!date) return;

	var dd = Meteor.utilities.numberFormat(date.getDate(), '0', 2),
		mm = Meteor.utilities.numberFormat(date.getMonth() + 1, '0', 2);

	return date.getFullYear() + '-' + mm + '-' + dd;
};

MUtilities.datetimeFormat = function(date) {
	if (!date) return;

	var dd = Meteor.utilities.numberFormat(date.getDate(), '0', 2),
		mm = Meteor.utilities.numberFormat(date.getMonth() + 1, '0', 2),
		hours = date.getHours(),
		minutes = date.getMinutes(),
		ampm = hours >= 12 ? 'PM' : 'AM';

	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;

	var time = hours + ':' + minutes + ' ' + ampm;

	return date.getFullYear() + '-' + mm + '-' + dd + ' ' + time;
};