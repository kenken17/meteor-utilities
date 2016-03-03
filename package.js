Package.describe({
	name: 'kenken:meteor-utilities',
	summary: 'A collection of common utilities for general app development.',
	version: '2.10.2',
	git: 'https://github.com/kenken17/meteor-utilities'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	// Meteor dependencies
	api.use('ui');
	api.use('templating');
	api.use('spacebars');
	api.use('underscore');

	// Both client and server file
	api.addFiles('lib/helpers_format.js');

	// Client
	api.addFiles('client/helpers_utilities.js');
	api.addFiles('client/helpers_class.js');
	api.addFiles('client/helpers_format.js');

	if (api.export) {
		api.export('MUtilities');
	}
});

Package.onTest(function(api) {
	api.use(['mike:mocha-package@0.5.9', "practicalmeteor:chai"]);
	api.use('kenken:meteor-utilities');

	api.addFiles('tests/utilities-tests.js');
});
