MUtilities = MUtilities || {};

var readyProps = function($form, skipEmpty) {
	var props = {},
		setValue = function($this) {
			var value;

			// if the element is not an input, use text() instead of default val()
			if ($this.is('input') || $this.is('select') || $this.is('textarea')) {
				value = $this.val();
			} else {
				value = $this.text();
			}

			// check if is number
			if ($this.attr('type') === 'number' || $this.hasClass('number')) {
				// since multiple select could be number in it
				if (_.isArray(value)) {
					return _.map(value, function(v) {
						return _.isNaN(Number(v)) ? v : Number(v);
					})
				} else {
					return _.isNaN(Number(value)) ? value : Number(value);
				}
			}

			// check if is boolean
			if ($this.hasClass('boolean')) {
				if ($this.is('input[type=checkbox]') || $this.is('input[type=radio]')) {
					return $this.is(':checked');
				} else {
					return value === 'true';
				}
			}

			return value;
		};

	$form.find('input, select, textarea, .input').each(function() {
		var $this = $(this),
			key = $this.data('name');

		// only prepare those have data-name attributes
		if (key) {
			if ($this.val() === '' && skipEmpty) {
				return true;	// skip this loop item
			} else {
				// split the key by '.'
				var tokens = key.split('.');

				if (tokens.length === 1) {
					props[key] = setValue($this);
				} else {
					var tmp;

					// reverse traversing the keys
					for (var x = tokens.length - 1; x >= 0; x--) {
						// if it is the last token, set the value, else just keep concatenate upwards
						if (x === tokens.length - 1) {
							tmp = setValue($this);
						}

						tmp = _.object([tokens[x]], [tmp]);
					}
				}

				// need to make sure this wont cause too much calculation
				$.extend(true, props, tmp);
			}
		}
	});

	return props;
};

/**
 *
 * Return the check for valid web url
 * Taken from https://gist.github.com/dperini/729294 by Diego Perini
 */
var isValidWebUrl = function(url) {
	var re_weburl = new RegExp(
		"^" +
			// protocol identifier
		"(?:(?:https?|ftp)://)" +
			// user:pass authentication
		"(?:\\S+(?::\\S*)?@)?" +
		"(?:" +
			// IP address exclusion
			// private & local networks
		"(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
		"(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
		"(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
			// IP address dotted notation octets
			// excludes loopback network 0.0.0.0
			// excludes reserved space >= 224.0.0.0
			// excludes network & broacast addresses
			// (first & last IP address of each class)
		"(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
		"(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
		"(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
		"|" +
			// host name
		"(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
			// domain name
		"(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
			// TLD identifier
		"(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
		")" +
			// port number
		"(?::\\d{2,5})?" +
			// resource path
		"(?:/\\S*)?" +
		"$", "i"
	);

	return re_weburl.test(url);
};

var setCookie = function(id, value, exp, path) {	// exp in milli second
	var d = new Date();

	d.setTime(d.getTime() + (exp || 24 * 60 * 60 * 1000));	// default 1 day to expire

	var expires = "expires=" + d.toUTCString();

	document.cookie = encodeURIComponent(id) + "=" + encodeURIComponent(value) + "; " + expires + (path ? "; path=" + path : "/");
};

var getCookie = function(id) {
	var found = null,
		cookieTokens = document.cookie.split(';');

	_.each(cookieTokens, function(cookie) {
		var matches = cookie.trim().match(new RegExp(id + '=(.*)'));

		found = matches ? decodeURIComponent(matches[1]) : null;
	});

	return found;
};

var removeCookie = function(id, path) {
	var found = null,
		cookieTokens = document.cookie.split(';');

	_.each(cookieTokens, function(cookie) {
		var matches = cookie.trim().match(new RegExp(id + '=(.*)'));

		found = matches ? decodeURIComponent(matches[1]) : null;

		if (found) {
			document.cookie = encodeURIComponent(id) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (path ? "; path=" + path : "/");
		}
	});
};

MUtilities.readyProps = readyProps;
MUtilities.isValidWebUrl = isValidWebUrl;
MUtilities.getCookie = getCookie;
MUtilities.setCookie = setCookie;
MUtilities.removeCookie = removeCookie;