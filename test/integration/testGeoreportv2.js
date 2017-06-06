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
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        done();
      });
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
  it('Get ServiceDefinition as xml should pass as service_code 3 has meta', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/v2/services/3.xml')
      .query({"jurisdiction_id": "example.com"})
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(200, done);
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
      .expect(404, done);
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
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(403).end(function(err, res) {
        if(err){
          return done(err);
        }
        done();
      });
  });

  it('Anonymous Post Request with address_string should pass', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('description', 'Test Anonymous with address_string')
      .field('address_string', 'stadhuisplein 10 eindhoven')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        assert(typeof res.body, "object");
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
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with address_string')
      .field('email', 'test@test.nl')
      .field('address_string', 'stadhuisplein 10 eindhoven')
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
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 3)
      .field('first_name', 'Test User')
      .field('description', 'Test with address_string')
      .field('phone', '080-4320392')
      .field('address_string', 'stadhuisplein 10 eindhoven')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.4559)
      .field('long', 5.4320)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        service_request_id.push(res.body[0].service_request_id);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.458816382413765)
      .field('long', 5.452042389324555)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.453390031848123)
      .field('long', 5.450831550768585)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.449981745542431)
      .field('long', 5.460069800491911)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.454645716276538)
      .field('long', 5.473030257628031)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.454645716276538)
      .field('long', 5.473030257628031)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.455408096108073)
      .field('long', 5.475541626484858)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.440608958201778)
      .field('long', 5.474330787928888)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.438994506793819)
      .field('long', 5.471326114475185)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.44650080784146)
      .field('long', 5.407136794513102)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.447648515959379)
      .field('long', 5.409270354475908)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.448089942158582)
      .field('long', 5.408711214623586)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.445485527583294)
      .field('long', 5.411065487685992)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.439393846034321)
      .field('long', 5.41022677790751)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.4396439875472)
      .field('long', 5.414964752445601)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.447207089760177)
      .field('long', 5.414817610379201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.447346794851214)
      .field('long', 5.414635644098772)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.44745062851689)
      .field('long', 5.414642033862814)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });

  it('Post Request lat, long should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .field('service_code', 2)
      .field('first_name', 'Test User')
      .field('description', 'Test with lat and long')
      .field('email', 'test@test.nl')
      .field('lat', 51.447080022202478)
      .field('long', 5.415490275039327)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if(err){
          return done(err);
        }
        //check response text
        console.log(res.text);
        done();
      });
  });


  it('Post Request with base64 media should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
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
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
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
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
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

  it('Comma seperated media upload should pass', function(done) {
    request(server.app).post('/api/upload')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .attach('up_1', 'test/assets/treefrog.jpg')
      .attach('up_2', 'test/assets/test.mp3')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        } else {
          request(server.app).post('/api/v2/requests.json')
            .type('form')
            .field('jurisdiction_id','example.com')
            .field('api_key', '56b074c9495b1')
            .field('service_code', 3)
            .field('first_name', 'Test User')
            .field('description', 'Test with two files')
            .field('email', 'test@test.nl')
            .field('lat', 51.48513770164579)
            .field('long', 5.232168700000033)
            .field('media', res.body[0].path + " ," + res.body[1].path)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200).end(function(err, res) {
              if(err){
                return done(err);
              }
              service_request_id.push(res.body[0].service_request_id);
              done();
            });
        }
    });
  });
  it('Upload with multiple files should pass', function(done) {
    request(server.app).post('/api/upload')
      .type('form')
      .field('jurisdiction_id','example.com')
      .field('api_key', '56b074c9495b1')
      .attach('up_1', 'test/assets/treefrog.jpg')
      .attach('up_2', 'test/assets/test.mp3')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        } else {
          request(server.app).post('/api/v2/requests.json')
            .type('form')
            .field('jurisdiction_id','example.com')
            .field('api_key', '56b074c9495b1')
            .field('service_code', 3)
            .field('first_name', 'Test User')
            .field('description', 'Test with two files')
            .field('email', 'test@test.nl')
            .field('lat', 51.48513770164579)
            .field('long', 5.232168700000033)
            .field('media[0]', res.body[0].path)
            .field('media[1]', res.body[1].path)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200).end(function(err, res) {
              if(err){
                return done(err);
              }
              service_request_id.push(res.body[0].service_request_id);
              done();
            });
        }
    });
  });

  it('Post Request with multiple media urls should pass', function(done) {
    request(server.app).post('/api/v2/requests.json')
      .type('form')
      .field('jurisdiction_id','example.com')
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
    request(server.app).get('/api/v2/requests.json')
      .query({'jurisdiction_id': 'example.com', 'service_request_id' : service_request_id[0] })
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
    request(server.app).get('/api/v2/requests.json')
      .query({'jurisdiction_id': 'example.com', 'service_request_id' : service_request_id.join(',') })
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
