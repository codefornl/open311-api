(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('people', [
        {
          id: 1,
          firstname: 'System',
          lastname: 'User',
          username: 'system_user',
          role: 'admin',
          token: 'e899db9a-a178-44ee-9a6c-17ee4915af2d'
        }, {
          id: 2,
          firstname: 'Admin',
          lastname: 'User',
          username: 'admin_user',
          role: 'fd603012-705a-4ad5-b335-3ef3869015c1'
        }, {
          id: 3,
          firstname: 'Eindhoven',
          lastname: 'Behandelaar',
          username: 'eindhoven_behandelaar',
          role: 'user',
          department_id: 23
        }, {
          id: 4,
          firstname: 'Wooninc',
          lastname: 'Behandelaar',
          username: 'wooninc_behandelaar',
          role: 'user',
          department_id: 24
        }, {
          id: 5,
          firstname: 'St. Trudo',
          lastname: 'Behandelaar',
          username: 'st_trudo_behandelaar',
          role: 'user',
          department_id: 25
        },{
          id: 6,
          firstname: 'Woonbedrijf',
          lastname: 'Behandelaar',
          username: 'woonbedrijf_behandelaar',
          role: 'user',
          department_id: 26
        },{
          id: 7,
          firstname: 'Thuis',
          lastname: 'Behandelaar',
          username: 'thuis_behandelaar',
          role: 'user',
          department_id: 27
        }, {
          id: 8,
          firstname: 'TESTCORP1',
          lastname: 'User',
          role: 'user',
          username: 'testcorp1_user',
          department_id: 28
        }
      ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('people', null, {});
    }
  };
}());
