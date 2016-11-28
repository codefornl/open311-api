var fs = require('fs');
(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      fs.readFile('migrations/20161124140838-sp_SearchAtLocation.sql', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        return queryInterface.sequelize.query(data);
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS `SearchAtLocation`');
    }
  };
}());
