(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('service_i18ns', [{
        language_id: 'nl',
        parent_id: 1,
        service_name: 'Gedrag',
        description: 'Hinderlijk gedrag van buurtbewoners',
        keywords: "schelden, schreeuwen, schoppen, slaan"
      }, {
        language_id: 'en',
        parent_id: 1,
        service_name: 'Behaviour',
        description: 'Uncivilized behaviour',
        keywords: "cursing, screaming, kicking, beating"
      }, {
        language_id: 'nl',
        parent_id: 2,
        service_name: 'Vuil, vervuiling',
        description: 'Vuil dat niet op een reguliere manier is aangeboden maar illegaal is gedumpt.'
      }, {
        language_id: 'en',
        parent_id: 2,
        service_name: 'Dirt and waste',
        description: 'Dirt and waste'
      }, {
        language_id: 'en',
        parent_id: 3,
        service_name: 'TestService-en',
        description: 'Test-en'
      }, {
        language_id: 'nl',
        parent_id: 3,
        service_name: 'TestService-nl',
        description: 'Test-nl'
      }, {
        language_id: 'fr',
        parent_id: 3,
        service_name: 'TestService-fr',
        description: 'Test-fr'
      }, {
        language_id: 'de',
        parent_id: 3,
        service_name: 'TestService-de',
        description: 'Test-de'
      }
    ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('service_i18ns', null, {});
    }
  };
}());
