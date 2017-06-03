(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('service_group_i18ns', [{
        language_id: 'nl',
        parent_id: 1,
        group_name: 'Openbare ruimte'
      }, {
        language_id: 'en',
        parent_id: 2,
        group_name: 'Public space'
      }, {
        language_id: 'nl',
        parent_id: 2,
        group_name: 'Veiligheid'
      }, {
        language_id: 'en',
        parent_id: 2,
        group_name: 'Safety'
      }, {
        language_id: 'nl',
        parent_id: 3,
        group_name: 'Mobiliteit'
      }, {
        language_id: 'en',
        parent_id: 3,
        group_name: 'Mobility'
      }
    ], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('service_group_i18ns', null, {});
    }
  };
}());
