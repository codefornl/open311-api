var js2xmlparser = require('js2xmlparser');
var env = process.env.NODE_ENV || "development";

exports.catchError = function(req, res, e) {
  var format = req.params.format || 'xml';
  res.status(400);
  result = [{"code": 400, "description": e.name + " -- " + e.message}];
  switch (format) {
      case 'json':
        res.json(result);
        break;
      default:
        var xmlResult = result;
        var xmlServiceRequests = [];
        for (var x in xmlResult) {
          xmlServiceRequests.push(xmlResult[x]);
        }
        var final = js2xmlparser.parse("error", xmlServiceRequests, {
          arrayMap: {
            errors: "error"
          }
        });
        res.set('Content-Type', 'text/xml');
        res.send(final);
    }
};
