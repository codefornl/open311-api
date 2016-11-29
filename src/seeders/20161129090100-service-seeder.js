(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('categories', [{
        id: 3,
        name: 'TestService',
        description: 'Test',
        department_id: 4,
        categoryGroup_id: 3,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('categories', null, {});
    }
  };
}());
