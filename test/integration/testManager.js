var request = require('supertest'),
  server = require('../../server.js'),
  assert = require('assert');
var models = require('../../models');
server.app.set('env', 'test');
var Open311 = require('open311');


describe('Testing Management api', function() {
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
  it('Post other jurisdiction as administrator should succeed', function(done) {
    request(server.app).post('/api/jurisdiction')
      .set('authorization', 'token admintoken')
      .send({
        jurisdiction_id: 'woz.eindhoven.nl'
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
        "service_code": "HGW1",
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
        "service_code": "ZVL1",
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
        "service_code": "FPV1",
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
  it('Post service attribute as administrator should succeed', function(done) {
    request(server.app).post('/api/service/ZVL1/attribute')
      .set('authorization', 'token admintoken')
      .send({
        "variable": true,
        "code": "WHISHETN",
        "datatype": "singlevaluelist",
        "required": true,
        "order": 1,
        "description": "Hoe ernstig is de vervuiling?",
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
  it('Post attribute value as administrator should succeed', function(done) {
    request(server.app).post('/api/service/WHISHETN/values')
      .set('authorization', 'token admintoken')
      .send({
        "key": 1,
        "name": "Klein, zelf verwijderd"
      })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
  it('Post attribute values as array as administrator should succeed', function(done) {
    request(server.app).post('/api/service/WHISHETN/values')
      .set('authorization', 'token admintoken')
      .send([{
        "key": 2,
        "name": "Matig, gemeentewerker gewenst"
      }, {
        "key": 3,
        "name": "Ernstig, reinigingsploeg nodig"
      }])
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
});
