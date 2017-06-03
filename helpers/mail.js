var path = require('path');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var moment = require('tz-business-time');
var util = require('../helpers/util.js');
var EmailTemplate = require('email-templates').EmailTemplate;
var models = require('../models');

exports.newRequest = function(req, id){

  //First grab the request object from the database
  var options = {
    where: {
      id: id
    },
    attributes: [
      ['id', 'service_request_id'],
      ['service_id', 'service_code'],
      'status',
      ['location', 'address'],
      ['latitude', 'lat'],
      ['longitude', 'long'],
      ['enteredDate', 'requested_datetime'],
      ['lastModified', 'updated_datetime']
    ],
    include: [{
      model: models.service
    },{
      model: models.issue,
      attributes: ['description'],
      include: [{
        model: models.media
      }]
    },{
      model: models.person,
      attributes: ['name'],
      include: [{
        model: models.department,
        attributes: ['name']
      }]
    }
    ],
    order: [
      ['enteredDate', 'DESC']
    ]
  };
  models.request.findOne(options).then(function(result) {
    var env = process.env.NODE_ENV || "development";
    var templateDir = path.join(__dirname, '../templates/mail', 'request');
    var template = new EmailTemplate(templateDir);
    var _service = result.service.get_i18n(req.i18n.language);
    var request = {
      title: req.i18n.t("mail.request.title",
        {
          "service": _service.service_name
        }
      ),
      description: result.issues[0].description,
      user: result.person.name
    };
    var config = {
      from: util.getConfig('email'),
      to: req.to_open311.email,
      subject: req.i18n.t('mail.request.subject',
        {
          "service": _service.service_name
        }
      )
    };

    //Image?
    if(result.dataValues.issues[0].media.length > 0){
      var filename = result.dataValues.issues[0].media[0].internalFilename;
      var attachmentDir = path.join(__dirname, '../media', moment(result.dataValues.issues[0].media[0].uploaded).format('YYYY/M/D')) + "/";
      config.attachments = [{
        filename: filename,
        path: attachmentDir + filename,
        cid: 'image@meldloket.nl' //same cid value as in the html img src
      }];
    }

    template.render(request, function (err, results) {
      if (err) {
        return console.error(err);
      }
      config.html = results.html;
      config.text = results.text;
      var transport = nodemailer.createTransport(
        smtpTransport(util.getConfig('smtp'))
      );

      //read transport settings from the config
      transport.verify(function(error, success) {
        if (error) {
          return error;
        } else {
          transport.sendMail(config, function (err, responseStatus) {
            if (err) {
              return err;
            } else {
              return "mail sent";
            }
          });
        }
      });
    });
  });
};
