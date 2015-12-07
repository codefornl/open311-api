var request = require('supertest'),
  server = require('../server.js'),
  assert = require('assert');
var models = require('../models');
server.app.set('env', 'test');
var Open311 = require('open311');

describe('open311-api', function() {
  describe('Configuring this open311 setup via the management api', function() {
    before(function(done) {
      models.sequelize.sync({
          force: true,
          logging: null
        })
        .then(function(err) {
          //create user
          models.account.create({
            first_name: 'Regular',
            last_name: 'User',
            email: 'user@open311.com',
            token: 'usertoken',
            role: 'user'
          });
          //create admin
          models.account.create({
            first_name: 'Admin',
            last_name: 'User',
            email: 'admin@open311.com',
            token: 'admintoken',
            role: 'admin'
          });
          done();
        });
    });

    it('Post to jurisdiction as regular user should fail', function(done) {
      request(server.app).post('/api/jurisdiction')
        .set('authorization', 'token usertoken')
        .send({
          jurisdiction_id: 'eindhoven.nl'
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(403, done);
    });
    it('Post to jurisdiction as administrator should succeed', function(done) {
      request(server.app).post('/api/jurisdiction')
        .set('authorization', 'token admintoken')
        .send({
          jurisdiction_id: 'eindhoven.nl'
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
    it('Post discovery as administrator should succeed', function(done) {
      request(server.app).post('/api/discovery')
        .set('authorization', 'token admintoken')
        .send({
          contact: 'Send an e-mail to boss@eindhoven.nl',
          key_service: 'request your key at http://localhost:3000/signup',
          endpoints: [{
            url: 'http://localhost:3000/v2',
            type: 'production',
            specification: 'http://wiki.open311.org/geoReport_v2'
          }, {
            url: 'http://localhost:3000/v1',
            type: 'production',
            specification: 'http://wiki.open311.org/geoReport_v1'
          }]
        })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done);
    });
  });
  describe('Using Georeport v2 api', function() {
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

    it('Main url should return discovery.xml', function(done) {
      // See that we get a status 200 on retrieving the Index
      request(server.app).get('/')
        .expect('Content-Type', 'text/xml; charset=utf-8')
        .expect(200, done);
    });

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
});
