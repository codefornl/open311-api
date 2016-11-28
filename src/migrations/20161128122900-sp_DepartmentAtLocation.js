var fs = require('fs');
(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      fs.readFile('migrations/20161128122900-sp_DepartmentAtLocation.sql', 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        return queryInterface.sequelize.query(data);
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.sequelize.query('DROP PROCEDURE IF EXISTS `DepartmentsAtLocation`');
    }
  };
}());
