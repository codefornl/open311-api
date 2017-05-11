var js2xmlparser = require('js2xmlparser');
var env = process.env.NODE_ENV || "development";

exports.catchError = function(req, res, e, code) {
  var format = req.params.format || 'xml';
  code = code || 400;
  res.status(code);
  result = [
    {
      "code": code,
      "description": e.name + " -- " + e.message,
      // "extended_attributes": {
      //   "system_error_code" :e.name
      // }
    }];
  console.error(result[0].code + ": " + result[0].description);
  switch (format) {
      case 'json':
        res.json(result);
        break;
      default:
        var final = js2xmlparser.parse("errors", {"error": result});
        res.set('Content-Type', 'text/xml');
        res.send(final);
    }
};
