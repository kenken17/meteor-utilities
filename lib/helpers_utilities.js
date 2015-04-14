MUtilities = MUtilities || {};

var readyProps = function($form) {
	var props = {},
		setValue = function($this) {
			var value = $this.val(),
				tmp;

			// check if is number
			if ($this.attr('type') === 'number' || $this.hasClass('number')) {
				tmp = _.isNaN(parseFloat(value)) ? value : parseFloat(value);
			} else {
				tmp = value;
			}

			return tmp;
		};

	$form.find('input, select, textarea, .input').each(function() {
		var $this = $(this),
			key = $this.data('name');

		// only prepare those have data-name attributes
		if (key && $this.val()) {
			// split the key by '.'
			var tokens = key.split('.');

			if (tokens.length === 1) {
				props[key] = setValue($this);
			} else {
				var tmp;

				// reverse traversing the keys
				for (var x = tokens.length-1; x >= 0 ; x--) {
					// if it is the last token, set the value, else just keep concatenate upwards
					if (x === tokens.length-1) {
						tmp = setValue($this);
					}

					tmp = _.object([tokens[x]], [tmp]);
				}
			}

			// need to make sure this wont cause too much calculation
			$.extend(true, props, tmp);
		}
	});

	return props;
};

MUtilities.readyProps = readyProps;