Package.describe({
	name: 'kenken:meteor-utilities',
	summary: 'A collection of common utilities for general app development.',
	version: '1.0.0',
	git: 'https://github.com/kenken17/meteor-utilities'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0');

	// Meteor dependencies
	api.use('ui');
	api.use('underscore', ['client', 'server']);

	// Main file
	api.addFiles('utilities.js');

	if (api.export) {
		api.export('MUtil');
	}
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('kenken:meteor-utilities');
	api.addFiles('utilities-tests.js');
});
