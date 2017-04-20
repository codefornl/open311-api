(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('tickets', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        category_id: Sequelize.INTEGER.UNSIGNED,
        client_id: Sequelize.INTEGER.UNSIGNED,
        enteredByPerson_id: Sequelize.INTEGER.UNSIGNED,
        assignedPerson_id: Sequelize.INTEGER.UNSIGNED,
        referredPerson_id: Sequelize.INTEGER.UNSIGNED,
        enteredDate:{
          type:Sequelize.DATE,
          allowNull: false
        },
        lastModified:{
          type: Sequelize.DATE,
          allowNull: false
        },
        addressId: Sequelize.INTEGER.UNSIGNED,
        latitude: Sequelize.FLOAT(17,14),
        longitude: Sequelize.FLOAT(17,14),
        location: Sequelize.STRING(128),
        city: Sequelize.STRING(128),
        state: Sequelize.STRING(128),
        zip: Sequelize.STRING(40),
        status: {
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: 'open'
        },
        closedDate:Sequelize.DATE,
        substatus_id: Sequelize.INTEGER.UNSIGNED,
        additionalFields: Sequelize.STRING
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('tickets');
    }
  };
}());
