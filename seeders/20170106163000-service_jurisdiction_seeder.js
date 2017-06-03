(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkUpdate('categories', {jurisdiction_id: 772}, {department_id:23});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkUpdate('categories', {jurisdiction_id: null},{department_id: 23});
    }
  };
}());
