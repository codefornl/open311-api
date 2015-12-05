var request = require('supertest'),
  server = require('../server.js'),
  assert = require('assert');

server.app.set('env', 'test');

describe('Discovery', function() {
  it('GET /', function(done) {
    // See that we get a status 200 on retrieving the Index
    request(server.app).get('/api/discovery.xml')
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect(200, done);
  });
});
