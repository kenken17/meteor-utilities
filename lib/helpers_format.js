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

MUtilities.dateFormat = function(date) {
	if (!_.isDate(date)) return;

	if (isNaN(date.getTime())) return;

	var dd = MUtilities.numberFormat(date.getDate(), '0', 2),
		mm = MUtilities.numberFormat(date.getMonth() + 1, '0', 2);

	return date.getFullYear() + '-' + mm + '-' + dd;
};

MUtilities.datetimeFormat = function(date) {
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

	return date.getFullYear() + '-' + mm + '-' + dd + ' ' + time;
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

	return signPlace + parseFloat(value).toFixed(decimalPlace);
};

MUtilities.highlighter = function(str, keys, skipIgnore) {
	// key could only be string or array
	if (!_.isArray(keys) && !_.isString(keys)) return str;

	// don't entertain empty string or empty array
	if (keys === '' || keys.length === 0) return str;

	if (_.isArray(keys)) {
		var returnStr = str;

		_.each(keys, function(k) {
			var keywords = k.trim(),
				re = new RegExp(keywords, 'g' + (skipIgnore ? '': 'i'));

			returnStr = returnStr.replace(re, '<span class="highlight">' + keywords + '</span>');
		});

		return Spacebars.SafeString(returnStr);
	} else {
		var keywords = keys.trim(),
			re = new RegExp(keywords, 'g' + (skipIgnore ? '' : 'i'));

		return Spacebars.SafeString(str.replace(re, '<span class="highlight">' + keywords + '</span>'));
	}
};

MUtilities.nl2br = function(str) {
	return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
};
