/*!
 * personEmail model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var personEmail = sequelize.define("personEmail", {
      email: DataTypes.STRING,
      label: DataTypes.STRING,
      usedForNotifications: DataTypes.BOOLEAN
    }, {
      tableName: 'peopleEmails',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          personEmail.belongsTo(models.person,{foreignKey: 'person_id'});
        }
      }
    });
    return personEmail;
  };
}());
