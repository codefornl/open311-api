var request = require('supertest'),
  server = require('../server.js'),
  assert = require('assert');
var models = require('../models');
server.app.set('env', 'test');
var Open311 = require('open311');

describe('Open311-api', function() {
  describe('Georeport v2 testSuite', function() {
    var open311;

    before(function(done) {
      models.sequelize.sync({
          force: true,
          logging: null
        })
        .then(function(err) {
          //create user
          models.account.create({ first_name: 'Regular', last_name: 'User', email: 'user@open311.com', token: 'usertoken', role: 'user' });
          //create admin
          models.account.create({ first_name: 'Admin', last_name: 'User', email: 'admin@open311.com', token: 'admintoken', role: 'admin' });
          //open311
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
    it('Post to jurisdiction as regular user should fail', function(done){
      request(server.app).post('/api/jurisdiction.json')
        .set('authorization', 'token usertoken')
        .send({ jurisdiction_id: 'eindhoven.nl'})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(403, done);
    });
    it('Post to jurisdiction as administrator should succeed', function(done){
      request(server.app).post('/api/jurisdiction.json')
        .set('authorization', 'token admintoken')
        .send({ jurisdiction_id: 'eindhoven.nl'})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
    it('Main url should return page not found', function(done) {
      // See that we get a status 200 on retrieving the Index
      request(server.app).get('/')
        .expect(404, done);
    });

    it('Get Services should pass', function(done) {
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
