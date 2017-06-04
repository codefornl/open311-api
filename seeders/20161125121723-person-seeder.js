(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('people', [
        {
          id: 1,
          name: 'System User',
          username: 'system_user',
          role: 'admin',
          token: 'e899db9a-a178-44ee-9a6c-17ee4915af2d'
        }, {
          id: 2,
          name: 'Admin User',
          username: 'admin_user',
          role: 'admin',
          token: 'fd603012-705a-4ad5-b335-3ef3869015c1'
        }, {
          id: 3,
          name: 'Eindhoven Behandelaar',
          username: 'eindhoven_behandelaar',
          role: 'user',
          department_id: 23,
          token: '2b4ca649-0407-4088-a203-0fbbf48563be'
        }, {
          id: 4,
          name: 'Wooninc Behandelaar',
          username: 'wooninc_behandelaar',
          role: 'user',
          department_id: 24
        }, {
          id: 5,
          name: 'St. Trudo Behandelaar',
          username: 'st_trudo_behandelaar',
          role: 'user',
          department_id: 25
        },{
          id: 6,
          name: 'Woonbedrijf Behandelaar',
          username: 'woonbedrijf_behandelaar',
          role: 'user',
          department_id: 26
        },{
          id: 7,
          name: 'Thuis Behandelaar',
          username: 'thuis_behandelaar',
          role: 'user',
          department_id: 27
        }, {
          id: 8,
          name: 'TESTCORP1 User',
          role: 'user',
          username: 'testcorp1_user',
          department_id: 28,
          token: 'cadcd183-e586-4e64-91a5-b34915ec7b09'
        }, {
          id: 9,
          name: 'Amsterdam Behandelaar',
          role: 'user',
          username: 'amsterdam_behandelaar',
          department_id: 3,
          token: '3b561c98-e41e-478c-bd5b-9bf16d670070'
        }, {
          id: 10,
          name: 'Breda Behandelaar',
          role: 'user',
          username: 'breda_behandelaar',
          department_id: 2,
          token: '1dc8b5ca-239f-4eed-8ab8-033b62e67e5a'

        }
      ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('people', null, {});
    }
  };
}());
