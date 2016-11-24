(function() {
  'use strict';
  module.exports = {
    up: function(queryInterface, Sequelize) {
      return queryInterface.createTable('categories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        department_id: Sequelize.INTEGER,
        categoryGroup_id: Sequelize.INTEGER,
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
        },
        slaDays: Sequelize.INTEGER,
        notificationReplyEmail: Sequelize.STRING,
        autoResponseIsActive: Sequelize.BOOLEAN,
        autoResponseText: Sequelize.TEXT,
        autoCloseIsActive: Sequelize.BOOLEAN,
        autoCloseSubstatus_id: Sequelize.INTEGER,
        keywords: Sequelize.TEXT
      });
    },
    down: function(queryInterface, Sequelize) {
      return queryInterface.dropTable('categories');
    }
  };
}());
