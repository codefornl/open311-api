var request = require('supertest'),
  server = require('../../server.js'),
  assert = require('assert');
var models = require('../../models');
server.app.set('env', 'test');
var Open311 = require('open311');

describe('testing Georeport v2', function() {
  var open311;

  before(function(done) {
    //open311
    open311 = new Open311({
      endpoint: 'http://localhost:3000/api/v2/',
      format: 'xml',
      jurisdiction: 'eindhoven.nl'
    });
    done();
  });

  it("open311 client should be initialized", function(done) {
    assert.equal('http://localhost:3000/api/v2/', open311.endpoint);
    assert.equal('xml', open311.format);
    assert.equal('eindhoven.nl', open311.jurisdiction);
    done();
  });

  // it('Main url should return discovery.xml', function(done) {
  //   // See that we get a status 200 on retrieving the Index
  //   request(server.app).get('/api/v2')
  //     .expect('Content-Type', 'text/xml; charset=utf-8')
  //     .expect(200, done);
  // });

  it('Get Services as json should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/services.json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });

  it('Get Services as xml should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/services.xml')
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(200, done);
  });
  it('Get Discovery for v2 as json should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/discovery.json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
  it('Get Discovery for v2 as xml should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/discovery.xml')
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(200, done);
  });
});
