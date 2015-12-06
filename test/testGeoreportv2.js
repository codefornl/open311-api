var request = require('supertest'),
  server = require('../server.js'),
  assert = require('assert');

server.app.set('env', 'test');
var Open311 = require('open311');

describe('Open311-api', function() {
  describe('Georeport v2 testSuite', function() {
    var open311;

    before(function(done) {
      require('../models').sequelize.sync({
          force: true,
          logging: null
        })
        .then(function(err) {
          open311 = new Open311({
            endpoint: 'http://localhost:3000/api/',
            format: 'xml',
            jurisdiction: 'eindhoven.nl'
          });
          done();
        });
    });

    it("open311 client should be initialized", function(done) {
      assert.equal('http://localhost:3000/api/', open311.endpoint);
      assert.equal('xml', open311.format);
      assert.equal('eindhoven.nl', open311.jurisdiction);
      done();
    });
    it('GET /', function(done) {
      // See that we get a status 200 on retrieving the Index
      request(server.app).get('/')
        .expect(404, done);
    });

    it('GET /api/services.json', function(done) {
      // See that we get a status 200 on retrieving the Index
      request(server.app).get('/api/services.json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });

    it('GET /api/services.xml', function(done) {
      // See that we get a status 200 on retrieving the Index
      request(server.app).get('/api/services.xml')
        .expect('Content-Type', 'text/xml; charset=utf-8')
        .expect(200, done);
    });
    it('GET /api/discovery.json', function(done) {
      // See that we get a status 200 on retrieving the Index
      request(server.app).get('/api/discovery.json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
    it('GET /api/discovery.xml', function(done) {
      // See that we get a status 200 on retrieving the Index
      request(server.app).get('/api/discovery.xml')
        .expect('Content-Type', 'text/xml; charset=utf-8')
        .expect(200, done);
    });
  });
});
