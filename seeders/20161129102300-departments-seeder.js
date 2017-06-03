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
        name: 'Eindhoven',
        jurisdiction_id: 772
      },
      {
        id: 24,
        name: 'Wooninc',
        jurisdiction_id: 772
      },
      {
        id: 25,
        name: 'St. Trudo',
        jurisdiction_id: 772
      },
      {
        id: 26,
        name: 'Woonbedrijf',
        jurisdiction_id: 772
      },
      {
        id: 27,
        name: 'Thuis',
        jurisdiction_id: 772
      },
      {
        id: 28,
        name: 'TESTCORP1',
        jurisdiction_id: 772
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('departments', null, {});
    }
  };
}());
