(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkUpdate('services', {jurisdiction_id: 9999}, {department_id:28});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkUpdate('services', {jurisdiction_id: null},{department_id: 28});
    }
  };
}());
