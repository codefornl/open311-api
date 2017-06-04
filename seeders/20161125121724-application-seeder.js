(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('applications', [{
        id: 1,
        name: 'nl.eindhoven.open311',
        url: 'https://play.google.com/store/apps/details?id=nl.eindhoven.open311',
        api_key: '56b074c9495b1'
      },{
        id: 2,
        name: 'open311.io',
        url: 'https://www.open311.io',
        api_key: 'd5a7852e-cf34-4d69-971a-c24524c452d3'
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('applications', null, {});
    }
  };
}());
