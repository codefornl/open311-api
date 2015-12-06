var request = require('supertest'),
  server = require('../server.js'),
  assert = require('assert');
  var Open311 = require('open311');

  describe('Open311()', function() {
    describe('new Open311()', function() {
      var open311;

      before(function(done) {
        open311 = new Open311({
          endpoint: 'http://localhost:3000/api/',
          format: 'xml',
          jurisdiction: 'eindhoven.nl'
        });
        done();
      });

      it("should attach options to `this`", function(done) {
        assert.equal('http://localhost:3000/api/',open311.endpoint);
        assert.equal('xml',open311.format);
        assert.equal('eindhoven.nl',open311.jurisdiction);
        done();
      });
  });
});

server.app.set('env', 'test');

describe('Discovery', function() {
  it('GET /', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/')
      .expect(404, done);
  });

  it('GET /api/services.xml', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/services.xml')
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(200, done);
  });

  it('GET /api/discovery.xml', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/discovery.xml')
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(200, done);
  });
});
