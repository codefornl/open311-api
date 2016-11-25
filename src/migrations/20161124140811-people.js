(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('people', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        firstname: Sequelize.STRING,
        middlename: Sequelize.STRING,
        lastname: Sequelize.STRING,
        organization: Sequelize.STRING,
        address: Sequelize.STRING,
        city: Sequelize.STRING,
        state: Sequelize.STRING,
        zip: Sequelize.STRING,
        department_id: Sequelize.INTEGER,
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        authenticationMethod: Sequelize.STRING,
        role: Sequelize.STRING
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('people');
    }
  };
}());
