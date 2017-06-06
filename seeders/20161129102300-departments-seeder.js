(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('departments', [{
        id: 1,
        name: 'Systeem',
        jurisdiction_id: 9999
      },
      {
        id: 2,
        name: 'Breda',
        jurisdiction_id: 758
      },
      {
        id: 3,
        name: 'Amsterdam',
        jurisdiction_id: 363
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
        name: 'Sint Trudo',
        jurisdiction_id: 772
      },
      {
        id: 26,
        name: 'Woonbedrijf',
        jurisdiction_id: 772
      },
      {
        id: 27,
        name: '`thuis',
        jurisdiction_id: 772
      },
      {
        id: 28,
        name: 'TESTCORP1',
        jurisdiction_id: 9999
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('departments', null, {});
    }
  };
}());
