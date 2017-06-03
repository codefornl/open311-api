(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('peopleEmails', [{
        id: 1,
        person_id: 3,
        email: 'eindhoven@dogodigi.net'
      },{
        id: 2,
        person_id: 4,
        email: 'wooninc@dogodigi.net'
      },{
        id: 3,
        person_id: 5,
        email: 'st_trudo@dogodigi.net'
      },{
        id: 4,
        person_id: 6,
        email: 'woonbedrijf@dogodigi.net'
      },{
        id: 5,
        person_id: 7,
        email: 'thuis@dogodigi.net'
      },{
        id: 6,
        person_id: 8,
        email: 'testcorp@dogodigi.net'
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('peopleEmails', null, {});
    }
  };
}());
