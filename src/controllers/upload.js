var multer = require('multer');
var express = require('express');
var moment = require('moment-business-time');
var router = express.Router();
var m = multer({
  dest: 'media/tmp/'
});
var util = require('../helpers/util.js');
var path = require('path');
var errors = require('../helpers/errors.js');
var fs = require('fs-extra');
var async = require("async");

/**
 * Construct the media Url
 */
var getMediaUrl = function(req) {
  var port = util.getConfig('remote_port') || req.app.settings.port;
  return req.protocol +
    '://' +
    req.hostname +
    (port == 80 || port == 443 ? '' : ':' + port);
};

/**
 * move the uploaded file to the correct path (/media/year/month)
 */
var storeUpload = function(file, cb) {
  var curtime = moment();
  var ext = path.extname(file.originalname);
  var targetPath = './media/' + curtime.format('YYYY/M/D') + "/";
  var targetFile = file.filename + ext;
  fs.move(file.path, targetPath + targetFile, function(err) {
    if (err) {
      console.error(err);
      cb(err, null);
    } else {
      file.name = file.originalname;
      delete file.originalname;
      delete file.fieldname;
      delete file.encoding;
      delete file.destination;
      delete file.size;
      file.path = targetPath + targetFile;
      delete file.filename;
      cb(null, file);
    }
  });
};

var postUpload = function(req, res, next) {
  var final;
  req.params.format = 'json';
  if (req.files.length > 0) {
    async.map(req.files, storeUpload, function(err, results) {
      if (err) {
        errors.catchError(req, res, err, 400);
        exit();
      }
      if (results.length === 1) {
        results[0].path = getMediaUrl(req) + results[0].path.substring(1);
        final = results[0];
      } else if (results.length > 1) {
        for (var i in results) {
          results[i].path = getMediaUrl(req) + results[i].path.substring(1);
        }
        final = results;
      } else {
        errors.catchError(req, res, {
          "name": "UploadError",
          "message": "No files uploaded"
        }, 404);
      }
      res.json(final);
    });
  } else {
    errors.catchError(req, res, {
      "name": "UploadError",
      "message": "No files found"
    }, 404);
    // Todo try base64 detection, save it or them!
  }
};

router.route('/api/upload').post(m.any()).post(postUpload);
module.exports = router;
