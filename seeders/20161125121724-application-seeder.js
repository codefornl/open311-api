(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('applications', [{
        id: 1,
        name: 'nl.eindhoven.open311',
        url: 'https://play.google.com/store/apps/details?id=nl.eindhoven.open311',
        api_key: '56b074c9495b1'
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('applications', null, {});
    }
  };
}());
