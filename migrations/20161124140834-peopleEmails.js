(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('peopleEmails', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        person_id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        label: {
          type: Sequelize.ENUM,
          values: ['Home', 'Work', 'Other'],
          allowNull: false,
          defaultValue: 'Other'
        },
        usedForNotifications: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }

      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('peopleEmails');
    }
  };
}());
