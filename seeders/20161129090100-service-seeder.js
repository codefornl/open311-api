(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('services', [{
        id: 1,
        department_id: 23,
        service_group_id: 2,
        sequence: 2,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      },
      {
        id: 2,
        department_id: 23,
        sequence: 4,
        service_group_id: 2,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      },
      {
        id: 3,
        department_id: 28,
        service_group_id: 1,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        customFields: '[{"variable":true,"code":"WHISHETN","datatype":"singlevaluelist","required":true,"datatype_description":null,"order":1,"description":"What is the ticket/tag/DL number?","values":[{"key":123,"name":"Ford"},{"key":124,"name":"Chrysler"}]}]',
        lastModified: new Date()
      },
      {
        id: 4,
        department_id: 23,
        sequence: 3,
        service_group_id: 2,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      },
      {
        id: 5,
        department_id: 23,
        service_group_id: 2,
        sequence: 1,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      },
      {
        id: 6,
        department_id: 23,
        service_group_id: 2,
        sequence: 5,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      },
      {
        id: 7,
        department_id: 29,
        service_group_id: 1,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      }
    ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('services', null, {});
    }
  };
}());
