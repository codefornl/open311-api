(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('categories', [{
        id: 1,
        name: 'Gedrag',
        description: 'Hinderlijk gedrag van buurtbewoners',
        department_id: 23,
        categoryGroup_id: 2,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        keywords: "schelden, schreeuwen, schoppen, slaan",
        lastModified: new Date()
      },
      {
        id: 2,
        name: 'Vuil, vervuiling',
        description: 'Vuil dat niet op een reguliere manier is aangeboden maar illegaal is gedumpt.',
        department_id: 23,
        categoryGroup_id: 2,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      },
      {
        id: 3,
        name: 'TestService',
        description: 'Test',
        department_id: 28,
        categoryGroup_id: 1,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        customFields: '[{"variable":true,"code":"WHISHETN","datatype":"singlevaluelist","required":true,"datatype_description":null,"order":1,"description":"What is the ticket/tag/DL number?","values":[{"key":123,"name":"Ford"},{"key":124,"name":"Chrysler"}]}]',
        lastModified: new Date()
      }
    ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('categories', null, {});
    }
  };
}());
