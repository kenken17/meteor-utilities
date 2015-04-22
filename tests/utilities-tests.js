describe('MUtilities', function() {
	it('should export the MUtilities module.', function() {
		expect(MUtilities).to.be.an('object');
	});

	describe('Utilities Methods', function() {
		describe('readyProps', function() {
			it('should show readyProps is a function', function() {
				expect(MUtilities.readyProps).to.be.a('function');
			});
		});

		describe('isValidWebUrl', function() {
			it('should show isValidWebUrl is a function', function() {
				expect(MUtilities.isValidWebUrl).to.be.a('function');
			});

			describe('Test for different kind of urls', function() {
				it('should show `http://www.google.com` is TRUE.', function() {
					expect(MUtilities.isValidWebUrl('http://www.google.com')).equal(true);
				});

				it('should show `http://google.com` is TRUE.', function() {
					expect(MUtilities.isValidWebUrl('http://google.com')).equal(true);
				});

				it('should show `google.com` is FALSE.', function() {
					expect(MUtilities.isValidWebUrl('google.com')).equal(false);
				});

				it('should show `www.google.com` is FALSE.', function() {
					expect(MUtilities.isValidWebUrl('www.google.com')).equal(false);
				});

				it('should show `something else` is FALSE.', function() {
					expect(MUtilities.isValidWebUrl('something else')).equal(false);
				});
			});
		});
	});
});