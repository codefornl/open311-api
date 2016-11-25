function clientErrorHandler(err, req, res, next) {
  var errobj = {};
  errobj.url = req.protocol + "://" + req.get('host') + req.url;
  errobj.body = req.body;
  errobj.query = req.query;
  errobj.params = req.params;
  res.status(500);
  res.json({
    type: 'error',
    request: JSON.stringify(errobj),
    error: err
  });
}

// To run in production: NODE_ENV=production
var i18next = require('i18next');
var middleware = require('i18next-express-middleware');
var Backend = require('i18next-node-fs-backend');
var express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  compress = require('compression');

var env = process.env.NODE_ENV || 'development';

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    lng: 'nl',
    debug: false,
    "fallbackLng": "en",
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json'
    }
  });

var app = express();
app.use(middleware.handle(i18next, {
  removeLngFromUrl: false
}));

app.enable('trust proxy');
app.use('/media', express.static(__dirname + '/media'));
app.set('port', process.env.PORT || 3000);
app.use(compress());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});
app.use(require('./controllers'));
app.use(function(req, res) {
  res.status(404).json({
    type: i18next.t('error'),
    message: req.method + ' ' + i18next.t('endpoint') + ' ' + i18next.t('messages.not_available')
  });
});

app.use(clientErrorHandler);
if ('development' == env) {
  app.locals.pretty = true;
}

if ('production' == env) {
  app.locals.pretty = false;
}

function start() {
  app.listen(app.get('port'), function() {
    console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
  });
}
exports.start = start;
exports.app = app;
