(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('peoplePhones', {
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
        number: Sequelize.STRING,
        deviceId: Sequelize.STRING,
        label: {
          type: Sequelize.ENUM,
          values: ['Main','Mobile','Fax','Pager','Home', 'Work', 'Other'],
          allowNull: false,
          defaultValue: 'Other'
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('peoplePhones');
    }
  };
}());
