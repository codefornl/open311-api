(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('departments', [{
        id: 1,
        name: 'Systeem'
      },
      {
        id: 23,
        name: 'Eindhoven'
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
      },
      {
        id: 28,
        name: 'TESTCORP1'
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('departments', null, {});
    }
  };
}());
