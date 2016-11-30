(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('departments', [{
        id: 1,
        name: 'Operations (Sociaal Domein)',
        defaultPerson_id: 3
      },
      {
        id: 2,
        name: 'Ruimtelijke Expertise',
        defaultPerson_id: 1

      },
      {
        id: 3,
        name: 'Programma & Gebiedsmanagement',
        defaultPerson_id: 1

      },
      {
        id: 23,
        name: 'Gemeente Eindhoven'
      },
      {
        id: 24,
        name: 'Wooninc'
      },
      {
        id: 25,
        name: 'St. Trudo'
      },
      {
        id: 26,
        name: 'Woonbedrijf'
      },
      {
        id: 27,
        name: 'Thuis'
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('departments', null, {});
    }
  };
}());
