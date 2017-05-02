assert = require('assert');
var ts = require('tz-geo');
describe('Testing timezone', function() {

  it('Timezone Europe/Mariehamn should be returned for (30,50)', function(done) {
    ts.getTimezone({ type: 'Point', coordinates: [30, 50] }, function(err, result){
      if (err) throw err;
      assert.equal(result.name, "Europe/Mariehamn");
      done();
    });
  });

  it('Timezone Europe/Paris should be returned for (5.232168700000033, 51.48513770164579)', function(done) {
    ts.getTimezone({ type: 'Point', coordinates: [5.232168700000033, 51.48513770164579] }, function(err, result){
      if (err) throw err;
      assert.equal(result.name, "Europe/Paris");
      done();
    });
  });

  it('Timezone Asia/Riyadh should be returned for (51.48513770164579, 5.232168700000033)', function(done) {
    ts.getTimezone({ type: 'Point', coordinates: [51.48513770164579, 5.232168700000033 ] }, function(err, result){
      if (err) throw err;
      assert.equal(result.name, "Asia/Riyadh");
      done();
    });
  });

});