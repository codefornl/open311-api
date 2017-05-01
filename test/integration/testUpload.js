var request = require('supertest'),
  server = require('../../server.js'),
  assert = require('assert'),
  models = require('../../models'),
  fs = require('fs');

server.app.set('env', 'test');

describe('testing Uploads', function() {
  it('Upload with image should pass', function(done) {
    request(server.app).post('/api/upload')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .attach('media', 'test/assets/treefrog.jpg')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('Upload with base64 file', function(done) {
    var data = Buffer(fs.readFileSync('test/assets/treefrog.jpg')).toString('base64');
    request(server.app).post('/api/upload')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .field('media', data)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404).end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });
  it('Upload with sound file should pass', function(done) {
    request(server.app).post('/api/upload')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .attach('media', 'test/assets/test.mp3')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });

  it('Upload with multiple files should pass', function(done) {
    request(server.app).post('/api/upload')
      .type('form')
      .field('api_key', '56b074c9495b1')
      .attach('up_1', 'test/assets/treefrog.jpg')
      .attach('up_2', 'test/assets/test.mp3')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200).end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
