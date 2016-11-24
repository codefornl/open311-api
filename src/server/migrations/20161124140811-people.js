(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('people', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstname: {
          type: Sequelize.STRING
        },
        middlename: {
          type: Sequelize.STRING
        },
        lastname: {
          type: Sequelize.STRING
        },
        organization: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        city: {
          type: Sequelize.STRING
        },
        state: {
          type: Sequelize.STRING
        },
        zip: {
          type: Sequelize.STRING
        },
        department_id: Sequelize.INTEGER,
        username: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        authenticationMethod: {
          type: Sequelize.STRING
        },
        role: {
          type: Sequelize.STRING
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('people');
    }
  };
}());
