(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('categories', [{
        id: 1,
        name: 'Gedrag',
        description: 'Hinderlijk gedrag van buurtbewoners',
        department_id: 1,
        categoryGroup_id: 1,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        keywords: "schelden, schreeuwen, schoppen, slaan",
        lastModified: new Date()
      },
      {
        id: 2,
        name: 'Vuil, vervuiling',
        description: 'Vuil dat niet op een reguliere manier is aangeboden maar illegaal is gedumpt.',
        department_id: 1,
        categoryGroup_id: 1,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      },
      {
        id: 3,
        name: 'TestService',
        description: 'Test',
        department_id: 4,
        categoryGroup_id: 3,
        displayPermissionLevel: 'anonymous',
        postingPermissionLevel: 'anonymous',
        lastModified: new Date()
      }
    ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('categories', null, {});
    }
  };
}());
