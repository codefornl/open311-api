(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('service_i18ns', [{
        language_id: 'nl',
        parent_id: 1,
        service_name: 'Gedrag',
        description: 'Hinderlijk gedrag zoals intimidatie, discriminatie en pesten',
        keywords: "schreeuwen, schelden, schoppen, slaan, intimidatie, geweld, pesten"
      }, {
        language_id: 'en',
        parent_id: 1,
        service_name: 'Behaviour',
        description: 'Uncivilized behaviour',
        keywords: "cursing, screaming, kicking, beating"
      }, {
        language_id: 'nl',
        parent_id: 2,
        service_name: 'Vuil en stank',
        description: 'Rommel in de straat, om het huis of stankoverlast',
        keywords: "vuil, vuilnis, stank, vervuiling, rommel, stankoverlast"
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
      }, {
        language_id: 'en',
        parent_id: 4,
        service_name: 'Vehicles',
        description: 'Wrongly parked vehicles or containers'
      }, {
        language_id: 'nl',
        parent_id: 4,
        service_name: 'Voertuigen',
        description: "Fout of hinderlijk geparkeerde auto's, andere voertuigen of containers",
        keywords: "drukte, getoeter, parkeren, foutparkeren, container, containers, auto, voertuig, vrachtwagen"
      }, {
        language_id: 'en',
        parent_id: 5,
        service_name: 'Noise',
        description: 'Noise complaint'
      }, {
        language_id: 'nl',
        parent_id: 5,
        service_name: 'Geluid',
        description: "Lawaai van buren, andere personen of apparatuur",
        keywords: "lawaai,buren,muziek,luid, geluid, herrie, geluidsoverlast, personen, persoon, apparatuur"
      }, {
        language_id: 'en',
        parent_id: 6,
        service_name: 'General',
        description: 'General complaint'
      }, {
        language_id: 'nl',
        parent_id: 6,
        service_name: 'Overige'
      }, {
        language_id: 'en',
        parent_id: 7,
        service_name: 'Streetlights',
      }, {
        language_id: 'nl',
        parent_id: 7,
        service_name: 'Lantarenpalen',
        description: 'Lantarenpaal defect'
      }
    ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('service_i18ns', null, {});
    }
  };
}());
