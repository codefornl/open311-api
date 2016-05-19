var path = require('path');
var nodemailer = require('nodemailer');
var moment = require('moment');
var EmailTemplate = require('email-templates').EmailTemplate;
var models = require('../models');

exports.newRequest = function(id){

  //First grab the request object from the database
  var options = {
    where: {
      id: id
    },
    attributes: [
      ['id', 'service_request_id'],
      ['category_id', 'service_code'],
      'status',
      ['location', 'address'],
      ['latitude', 'lat'],
      ['longitude', 'long'],
      ['enteredDate', 'requested_datetime'],
      ['lastModified', 'updated_datetime']
    ],
    include: [{
      model: models.service,
      attributes: ['service_name']
    },{
      model: models.issue,
      attributes: ['description'],
      include: [{
        model: models.media
      }]
    },{
      model: models.person,
      attributes: ['firstname', 'middlename', 'lastname'],
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
    console.log(result.service.service_name);
    var templateDir = path.join(__dirname, '../templates/mail', 'request');
    var template = new EmailTemplate(templateDir);


    var filename = result.dataValues.issues[0].media[0].internalFilename;
    var attachmentDir = path.join(__dirname, '../media', moment(result.dataValues.issues[0].media[0].uploaded).format('YYYY/M/D')) + "/";

    var request = {
      service: result.service.service_name,
      description: result.issues[0].description,
      user: result.person.firstname
    };

    template.render(request, function (err, results) {
      if (err) {
        return console.error(err);
      }
      var debugtransport = {
        name: 'minimal',
        version: '0.1.0',
        send: function (mail, callback) {
          var input = mail.message.createReadStream();
          input.pipe(process.stdout);
          input.on('end', function () {
            callback(null, true);
          });
        }
      };
      var transport = nodemailer.createTransport(debugtransport);
      transport.sendMail({
        from: 'eindhoven@meldloket.nl',
        to: 'milo@dogodigi.net',
        subject: 'A new request has been issued',
        html: results.html,
        text: results.text,
        attachments: [{
            filename: filename,
            path: attachmentDir + filename,
            cid: 'image@meldloket.nl' //same cid value as in the html img src
        }]
      }, function (err, responseStatus) {
        if (err) {
          return console.error(err);
        }
      });
    });
  });
};
