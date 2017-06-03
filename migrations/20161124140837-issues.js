(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('issues', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        ticket_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
        person_id: Sequelize.INTEGER.UNSIGNED,
        date:{
          type:Sequelize.DATE,
          allowNull: false
        },
        description: Sequelize.TEXT,
        customFields: Sequelize.TEXT
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('issues');
    }
  };
}());
