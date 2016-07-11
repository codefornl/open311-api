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
  it('Post Request without api_key should fail', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'This is a test message')
      .field('email', 'test@test.nl')
      .field('lat', 51.48513770164579)
      .field('long', 5.232168700000033)
      //.attach('image', 'some path')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(403).end(function(err, res) {
        if(err){
          return done(err);
        }
        done();
      });
  });
  it('Post Request with invalid api_key should fail', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', 'xxxxxxxxxx')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'This is a test message')
      .field('email', 'test@test.nl')
      .field('lat', 51.48513770164579)
      .field('long', 5.232168700000033)
      //.attach('image', 'some path')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(403).end(function(err, res) {
        if(err){
          return done(err);
        }
        done();
      });
  });
  it('Post Request without media should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'This is a test message')
      .field('email', 'test@test.nl')
      .field('lat', 51.48513770164579)
      .field('long', 5.232168700000033)
      //.attach('image', 'some path')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        done();
      });
  });
  it('Post Request with media should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'This is a test message with image')
      .field('email', 'test@test.nl')
      .field('lat', 51.48513770164579)
      .field('long', 5.232168700000033)
      .attach('media', 'test/assets/treefrog.jpg')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          console.log(res);
          return done(err);
        }
        done();
      });
  });
});
