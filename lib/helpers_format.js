MUtilities = MUtilities || {};

MUtilities.numberFormat = function(value, padString, count) {
	var padding = '',
		x = 0,
		counter = parseInt(count, 10);

	if (!value) {
		return;
	}

	for (0; x < counter; x++) {
		padding += padString;
	}

	return (padding + value).slice(-counter);
};

MUtilities.dateFormat = function(date, format) {
	if (!_.isDate(date)) return;

	if (isNaN(date.getTime())) return;

	var dd = MUtilities.numberFormat(date.getDate(), '0', 2),
		mm = MUtilities.numberFormat(date.getMonth() + 1, '0', 2);

	switch (format) {
		case 'dd-mm-yyyy':
			return dd + '-' + mm + '-' + date.getFullYear();
			break;

		case 'dd/mm/yyyy':
			return dd + '/' + mm + '/' + date.getFullYear();
			break;

		case 'yyyy-mm-dd':
			return date.getFullYear() + '-' + mm + '-' + dd;
			break;

		case 'yyyy/mm/dd':
			return date.getFullYear() + '/' + mm + '/' + dd;
			break;

		default:
			return date.getFullYear() + '-' + mm + '-' + dd;
			break;
	}
};

MUtilities.datetimeFormat = function(date, format) {
	if (!_.isDate(date)) return;

	if (isNaN(date.getTime())) return;

	var dd = MUtilities.numberFormat(date.getDate(), '0', 2),
		mm = MUtilities.numberFormat(date.getMonth() + 1, '0', 2),
		hours = date.getHours(),
		minutes = date.getMinutes(),
		ampm = hours === 0 ? 'AM' : (hours >= 12 ? 'PM': 'AM');

	hours = hours ? hours : 12; // the hour '0' should be '12'

	if (hours > 12) hours = hours - 12;

	minutes = minutes < 10 ? '0' + minutes : minutes;

	var time = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ' ' + ampm;

	switch (format) {
		case 'dd-mm-yyyy':
			return dd + '-' + mm + '-' + date.getFullYear() + ' ' + time;
			break;

		case 'dd/mm/yyyy':
			return dd + '/' + mm + '/' + date.getFullYear() + ' ' + time;
			break;

		case 'yyyy-mm-dd':
			return date.getFullYear() + '-' + mm + '-' + dd + ' ' + time;
			break;

		case 'yyyy/mm/dd':
			return date.getFullYear() + '/' + mm + '/' + dd + ' ' + time;
			break;

		default:
			return date.getFullYear() + '-' + mm + '-' + dd + ' ' + time;
			break;
	}
};

MUtilities.currencyFormat = function(value, sign, decimal, skipZero) {
	var decimalPlace = 2,
		signPlace  = '';

	if (value === null || _.isNaN(parseFloat(value))) {
		if (skipZero) {
			return '';
		} else {
			value = '0';
		}
	}

	if (typeof decimal === 'number') {
		decimalPlace = decimal;
	}

	if (typeof sign === 'string') {
		signPlace = sign;
	}

	if (parseFloat(value) === 0 && skipZero === true) {
		return '';
	}

	// check for negative  number
	if (value < 0) {
		return '-' + signPlace + Number(Math.round(Math.abs(value) + 'e' + decimalPlace) + 'e-' + decimalPlace).toFixed(decimalPlace);
	} else {
		return signPlace + Number(Math.round(value + 'e' + decimalPlace) + 'e-' + decimalPlace).toFixed(decimalPlace);
	}
};

MUtilities.highlighter = function(str, keys, skipIgnore) {
	// key could only be string or array
	if (!_.isArray(keys) && !_.isString(keys)) return str;

	// don't entertain empty string or empty array
	if (keys === '' || keys.length === 0) return str;

	if (_.isArray(keys)) {
		var returnStr = str;

		_.each(keys, function(k) {
			var keywords = MUtilities._regExpEscape(k.trim()),
				re = new RegExp(keywords, 'g' + (skipIgnore ? '': 'i'));

			returnStr = returnStr.replace(re, function(str) {
				return '<span class="highlight">' + str + '</span>'
			});
		});

		return Spacebars.SafeString(returnStr);
	} else {
		var keywords = MUtilities._regExpEscape(keys.trim()),
			re = new RegExp(keywords, 'g' + (skipIgnore ? '' : 'i'));

		return Spacebars.SafeString(str.replace(re, function(str) {
			return '<span class="highlight">' + str + '</span>'
		}));
	}
};

MUtilities.nl2br = function(str) {
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
};

MUtilities.charLimit = function(str, limit, suffix) {
	var strLimit = 100,
		strSuffix = '...';

	if (typeof str !== 'string') return;

	if (typeof limit === 'number') {
		strLimit = limit;
	}

	if (typeof suffix === 'string') {
		strSuffix = suffix;
	}

	// Check if the string is shorter than the limit, then don't do anything
	if (str.length < strLimit) {
		return str;
	}

	// Find the character limit
	var limitStr = str.substr(0, strLimit);
	var spacePos = limitStr.lastIndexOf(' ');
	var finalStr = limitStr.substr(0, spacePos);

	// If the last position is a period. Add a space to it
	if (finalStr[spacePos - 1] == '.') {
		finalStr += ' ';
	}

	// Print out the truncated paragraph
	return finalStr + strSuffix;
};

MUtilities._regExpEscape = function(str) {
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};