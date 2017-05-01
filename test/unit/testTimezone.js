assert = require('assert');
describe('Testing timezone', function() {

  it('Not implemented should be returned', function(done) {
    var ts = require('../../helpers/timezone');
      assert.equal(ts.getTimezone({ type: 'Point', coordinates: [30, 50] })[0], "test_timezone_2");
      done();
  });
});