describe('MUtilities', function() {
	it('should export the MUtilities module.', function() {
		expect(MUtilities).to.be.an('object');
	});

	describe('Utilities Methods - Client', function() {
		if (Meteor.isClient) {
			describe('readyProps', function() {
				it('should show readyProps is a function', function() {
					expect(MUtilities.readyProps).to.be.a('function');
				});

				it('should result data from a form, with data-name (on string).', function() {
					var $form = $('<form>' +
						'<input type="text" data-name="dataString" value="a string" />' +
						'</form>'),
						result = {
							dataString: 'a string'
						},
						input = MUtilities.readyProps($form);

					assert.deepEqual(input, result);
				});

				it('should result data from a form, with data-name (on string & number).', function() {
					var $form = $('<form>' +
						'<input type="text" data-name="dataString" value="a string" />' +
						'<input type="number" data-name="dataNumber" value="1" />' +
						'</form>'),
						result = {
							dataString: 'a string',
							dataNumber: 1
						},
						input = MUtilities.readyProps($form);

					assert.deepEqual(input, result);
				});

				it('should result data from a form, with data-name (with nested naming on string).', function() {
					var $form = $('<form>' +
						'<input type="text" data-name="level.dataString" value="a string" />' +
						'</form>'),
						result = {
							level: {
								dataString: 'a string'
							}
						},
						input = MUtilities.readyProps($form);

					assert.deepEqual(input, result);
				});

				it('should result data from a form, with data-name (with nested naming on string & number).', function() {
					var $form = $('<form>' +
						'<input type="text" data-name="level.dataString" value="a string" />' +
						'<input type="number" data-name="level.dataNumber" value="1" />' +
						'</form>'),
						result = {
							level: {
								dataString: 'a string',
								dataNumber: 1
							}
						},
						input = MUtilities.readyProps($form);

					assert.deepEqual(input, result);
				});

				it('should result data from a form, with data-name (on string & boolean).', function() {
					var $form = $('<form>' +
						'<input type="text" data-name="dataString" value="a string" />' +
						'<input type="text" class="boolean" data-name="dataBoolean" value="true" />' +
						'<input type="checkbox" class="boolean" data-name="dataBooleanCheckboxTrue" value="yes" checked />' +
						'<input type="radio" class="boolean" data-name="dataBooleanRadioTrue" value="yes" checked />' +
						'<input type="checkbox" class="boolean" data-name="dataBooleanCheckboxFalse" value="no" />' +
						'<input type="radio" class="boolean" data-name="dataBooleanRadioFalse" value="no" />' +
						'</form>'),
						result = {
							dataString: 'a string',
							dataBoolean: true,
							dataBooleanCheckboxTrue: true,
							dataBooleanRadioTrue: true,
							dataBooleanCheckboxFalse: false,
							dataBooleanRadioFalse: false
						},
						input = MUtilities.readyProps($form);

					assert.deepEqual(input, result);
				});

				it('should result data from a form, with data-name (with nested naming on string & boolean).', function() {
					var $form = $('<form>' +
						'<input type="text" data-name="level.dataString" value="a string" />' +
						'<input type="text" class="boolean" data-name="level.dataBoolean" value="true" />' +
						'<input type="checkbox" class="boolean" data-name="level.dataBooleanCheckboxTrue" value="yes" checked />' +
						'<input type="radio" class="boolean" data-name="level.dataBooleanRadioTrue" value="yes" checked />' +
						'<input type="checkbox" class="boolean" data-name="level.dataBooleanCheckboxFalse" value="no" />' +
						'<input type="radio" class="boolean" data-name="level.dataBooleanRadioFalse" value="no" />' +
						'</form>'),
						result = {
							level: {
								dataString: 'a string',
								dataBoolean: true,
								dataBooleanCheckboxTrue: true,
								dataBooleanRadioTrue: true,
								dataBooleanCheckboxFalse: false,
								dataBooleanRadioFalse: false
							}
						},
						input = MUtilities.readyProps($form);

					assert.deepEqual(input, result);
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
		}
	});

	describe('Helper Methods', function() {
		describe('dateFormat', function() {
			it('should output `2015-04-26` when input: MUtilities.datetimeFormat(new Date(2015, 3, 26))', function() {
				expect(MUtilities.dateFormat(new Date(2015, 3, 26))).equal('2015-04-26');
			});

			it('should output `2015-04-26` when input: MUtilities.datetimeFormat(new Date(2015, 3, 26, 1, 20))', function() {
				expect(MUtilities.dateFormat(new Date(2015, 3, 26, 1, 20))).equal('2015-04-26');
			});

			it('should output `2015-04-26` when input: MUtilities.datetimeFormat(new Date("2015-04-26T00:00:00"))', function() {
				expect(MUtilities.dateFormat(new Date('2015-04-26T00:00:00'))).equal('2015-04-26');
			});

			it('should be `undefined` when input: MUtilities.datetimeFormat(new Date("invalid date string"))', function() {
				expect(MUtilities.dateFormat('invalid date string')).to.be.an('undefined');
			});

			it('should be `undefined` when input: MUtilities.datetimeFormat("something else")', function() {
				expect(MUtilities.dateFormat('something else')).to.be.an('undefined');
			});
		});

		describe('datetimeFormat', function() {
			it('should output `2015-04-26 12:00 AM` when input: MUtilities.datetimeFormat(new Date(2015, 3, 26))', function() {
				expect(MUtilities.datetimeFormat(new Date(2015, 3, 26))).equal('2015-04-26 12:00 AM');
			});

			it('should output `2015-04-26 01:20 AM` when input: MUtilities.datetimeFormat(new Date(2015, 3, 26, 1, 20))', function() {
				expect(MUtilities.datetimeFormat(new Date(2015, 3, 26, 1, 20))).equal('2015-04-26 01:20 AM');
			});

			it('should output `2015-04-26 12:00 AM` when input: MUtilities.datetimeFormat(new Date(2015, 3, 26, 0, 0))', function() {
				expect(MUtilities.datetimeFormat(new Date(2015, 3, 26, 0, 0))).equal('2015-04-26 12:00 AM');
			});

			it('should output `2015-04-26 11:59 PM` when input: MUtilities.datetimeFormat(new Date(2015, 3, 26, 23, 59))', function() {
				expect(MUtilities.datetimeFormat(new Date(2015, 3, 26, 23, 59))).equal('2015-04-26 11:59 PM');
			});

			it('should output `2015-04-26 09:20 AM` when input: MUtilities.datetimeFormat(new Date("2015-04-26T01:20:00")), SGT+8', function() {
				expect(MUtilities.datetimeFormat(new Date('2015-04-26T01:20:00'))).equal('2015-04-26 09:20 AM');
			});

			it('should be `undefined` when input: MUtilities.datetimeFormatnew Date("invalid date string"))', function() {
				expect(MUtilities.datetimeFormat('invalid date string')).to.be.an('undefined');
			});

			it('should be `undefined` when input: MUtilities.datetimeFormat("something else")', function() {
				expect(MUtilities.datetimeFormat('something else')).to.be.an('undefined');
			});
		});

		describe('currencyFormat', function() {
			it('should output `23.00` when input: MUtilities.currencyFormat(23)', function() {
				expect(MUtilities.currencyFormat(23)).equal('23.00');
			});

			it('should output `$23.00` when input: MUtilities.currencyFormat(23, "$")', function() {
				expect(MUtilities.currencyFormat(23, '$')).equal('$23.00');
			});

			it('should output `$23.0000` when input: MUtilities.currencyFormat(23, "$", 4)', function() {
				expect(MUtilities.currencyFormat(23, '$', 4)).equal('$23.0000');
			});

			it('should output `23.46` when input: MUtilities.currencyFormat(23.4567)', function() {
				expect(MUtilities.currencyFormat(23.4567)).equal('23.46');
			});

			it('should output `$23` when input: MUtilities.currencyFormat(23.4567, "$", 0)', function() {
				expect(MUtilities.currencyFormat(23.4567, '$', 0)).equal('$23');
			});

			it('should output `$0` when input: MUtilities.currencyFormat(0, "$", 0, false)', function() {
				expect(MUtilities.currencyFormat(0, '$', 0, false)).equal('$0');
			});

			it('should output `` when input: MUtilities.currencyFormat(0, "$", 0, true)', function() {
				expect(MUtilities.currencyFormat(0, '$', 0, true)).equal('');
			});

			it('should output `` when input: MUtilities.currencyFormat(null, "$", 0, true)', function() {
				expect(MUtilities.currencyFormat(null, '$', 0, true)).equal('');
			});

			it('should be `0.00` when input: MUtilities.currencyFormat("something else")', function() {
				expect(MUtilities.currencyFormat('something else')).equal('0.00');
			});
		});
	});
});