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

	// Main file
	api.addFiles('utilities.js');
});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('utilities');
	api.addFiles('utilities-tests.js');
});
