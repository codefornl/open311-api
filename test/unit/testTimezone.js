assert = require('assert');
describe('Testing timezone', function() {

  it('Timezone +2 should be returned for (30,50)', function(done) {
    var ts = require('../../helpers/timezone');
    ts.getTimezone({ type: 'Point', coordinates: [30, 50] }, function(err, result){
      if (err) throw err;
      assert.equal(result[0].tz_name, "Europe/Mariehamn");
      done();
    });
  });
});