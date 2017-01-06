var request = require('supertest'),
  server = require('../../server.js'),
  assert = require('assert');
  server.app.set('env', 'test');
var models = require('../../models');

describe('Testing Management api', function() {

  it('Post to jurisdiction as regular user should fail', function(done) {
    request(server.app).post('/api/jurisdiction')
      .set('authorization', 'token usertoken')
      .send({
        jurisdiction_id: 'eindhoven.nl'
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(403, done);
  });
  it('Post default jurisdiction as administrator should succeed', function(done) {
    request(server.app).post('/api/jurisdiction')
      .set('authorization', 'token admintoken')
      .send({
        jurisdiction_id: 'eindhoven.nl',
        is_default: true
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

  it('Post service(1) as administrator should succeed', function(done) {
    request(server.app).post('/api/service')
      .set('authorization', 'token admintoken')
      .send({
        "service_name": "Huiselijk geweld",
        "description": "Vermoeden van huiselijk geweld. Zal worden voorgelegd aan hulpverleners.",
        "metadata": true,
        "type": "realtime",
        "keywords": "geweld, huiselijk, relationeel, overlast",
        "group": "overlast"
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
  it('Post service(2) as administrator should succeed', function(done) {
    request(server.app).post('/api/service')
      .set('authorization', 'token admintoken')
      .send({
        "metadata": true,
        "type": "realtime",
        "keywords": "vuil, rommel, smerig",
        "group": "omgeving",
        "service_name": "Zwerfvuil",
        "description": "Constatering van vervuiling in de openbare ruimte"
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
  it('Post service(3) as administrator should succeed', function(done) {
    request(server.app).post('/api/service')
      .set('authorization', 'token admintoken')
      .send({
        "metadata": true,
        "type": "realtime",
        "keywords": "parkeren, auto, stoep",
        "group": "omgeving",
        "service_name": "Foutief geparkeerde auto",
        "description": "Constatering van onjuist geplaatste voertuigen"
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
});
