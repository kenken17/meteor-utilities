MUtilities = MUtilities || {};

var readyProps = function($form) {
	var props = {};

	$form.find('input, select, textarea, .input').each(function() {
		var $this = $(this),
			key = $this.data('name');

		// only prepare those have data-name attributes
		if (key) {
			// check if is number
			if ($this.attr('type') === 'number' || $this.hasClass('number')) {
				props[key] = _.isNaN(parseFloat(value)) ? value : parseFloat(value);
			} else {
				props[key] = $this.val();
			}
		}
	});

	return props;
};

MUtilities.readyProps = readyProps;