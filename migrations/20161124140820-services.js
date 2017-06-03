(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('services', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER.UNSIGNED
        },
        department_id: Sequelize.INTEGER,
        service_group_id: Sequelize.INTEGER,
        displayPermissionLevel: {
          type: Sequelize.ENUM,
          allowNull: false,
          defaultValue: 'staff',
          values: ['staff', 'public', 'anonymous']
        },
        postingPermissionLevel: {
          type: Sequelize.ENUM,
          allowNull: false,
          defaultValue: 'staff',
          values: ['staff', 'public', 'anonymous']
        },
        customFields: Sequelize.TEXT,
        lastModified:{
          type: Sequelize.DATE,
          allowNull: false
        }
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('services');
    }
  };
}());
