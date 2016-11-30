(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.bulkInsert('categoryGroups', [{
        id: 1,
        name: 'Openbare ruimte',
        ordering: 2
      },
      {
        id: 2,
        name: 'Veiligheid',
        ordering: 3
      },
      {
        id: 3,
        name: 'Mobiliteit',
        ordering: 1
      }], {});
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.bulkDelete('categoryGroups', null, {});
    }
  };
}());
