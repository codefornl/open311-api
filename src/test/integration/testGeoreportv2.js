var request = require('supertest'),
  server = require('../../server.js'),
  assert = require('assert');
var models = require('../../models');
server.app.set('env', 'test');

describe('testing Georeport v2', function() {
  var service_request_id = [];
  afterEach(function() {
    // runs after each test in this block
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
  it('Get ServiceDefinition as xml should fail as service_code 1 has no meta', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/services/1.xml')
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(400, done);
  });
  it('Get ServiceDefinition as xml should fail as service_code 999 does not exist', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/services/999.xml')
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(404, done);
  });
  it('Get ServiceDefinition as xml should fail as jurisdiction_id 999 does not exist', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/services/1.xml?jurisdiction_id=999')
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(400, done);
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
  /*CALL `SearchAtLocation`(0, 0, 1, 'Aletta Jacobsplein 5',10);*/
  it('Anonymous Post Request with address_string should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('description', 'Test Anonymous with address_string')
      .field('address_string', 'stadhuisplein 10')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });
  it('Post Request with address_string should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with address_string')
      .field('email', 'test@test.nl')
      .field('address_string', 'stadhuisplein 10')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });
  it('Post Request by user without email should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with address_string')
      .field('phone', '080-4320392')
      .field('address_string', 'stadhuisplein 10')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });
  /*CALL `DepartmentsAtLocation`(51.4440149847777, 5.47120548271545, 1, 10);*/
  it('Post Request lat, long should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.444014984777702)
      .field('long', 5.471205482715450)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });
  it('Post Request with base64 media should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with base64 image')
      .field('email', 'test@test.nl')
      .field('lat', 51.48513770164579)
      .field('long', 5.232168700000033)
      .attach('media', 'test/assets/treefrog.jpg')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });

  it('Post Request with media url should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with url image')
      .field('email', 'test@test.nl')
      .field('lat', 51.48513770164579)
      .field('long', 5.232168700000033)
      .field('media', 'http://lorempixel.com/output/technics-q-c-640-480-3.jpg')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });
  it('Post Request with sound file should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with url image')
      .field('email', 'test@test.nl')
      .field('lat', 51.48513770164579)
      .field('long', 5.232168700000033)
      .attach('media', 'test/assets/test.mp3')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });
  it('Post Request with multiple media urls should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with url image')
      .field('email', 'test@test.nl')
      .field('lat', 51.48513770164579)
      .field('long', 5.232168700000033)
      .field('media[0]', 'http://lorempixel.com/400/200/')
      .field('media[1]', 'http://d2436y6oj07al2.cloudfront.net/seff/downloads/elephant.wav')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });

  it('Get ServiceRequests should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/requests.json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        done();
      });
  });
  it('Get ServiceRequests with single id should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/requests.json')
      .query({ 'service_request_id' : service_request_id[0] })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function(res) {
        res.body.length = 1;
      })
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        done();
      });
  });
  it('Get ServiceRequests with all 3 new ids should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/requests.json')
      .query({ 'service_request_id' : service_request_id.join(',') })
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(function(res) {
        res.body.length = 3;
      })
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        done();
      });
  });
});
