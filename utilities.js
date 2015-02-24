// common classes
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

UI.registerHelper('shouldHide', function(x, y) {
	return x == y ? 'hide' : '';
});

UI.registerHelper('notHide', function(x, y) {
	return x == y ? '' : 'hide';
});

MUtil = {
	dataInput: function($target) {
		var inputValues = {};

		$target.find('input, select, textarea').each(function() {
			var $this = $(this);

			if ($this.attr('data-name')) {
				var name = $this.data('name'),
					value = $this.val();

				if ($this.attr('type') === 'number') {
					inputValues[name] = _.isNaN(parseFloat(value)) ? value : parseFloat(value);
				} else {
					inputValues[name] = value;
				}

				inputValues[name] = value;
			}
		});

		return inputValues;
	}
};