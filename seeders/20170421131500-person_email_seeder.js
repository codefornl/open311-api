(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('peopleEmails', [{
        id: 1,
        person_id: 1,
        email: 'test@eindhoven.nl'
      },{
        id: 2,
        person_id: 4,
        email: 'test@testcorp1.org'
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('peopleEmails', null, {});
    }
  };
}());
