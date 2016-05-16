/*!
 * personEmail model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var personDevice = sequelize.define("personDevice", {
      number: DataTypes.STRING,
      label: DataTypes.STRING,
      deviceid: DataTypes.STRING
    }, {
      tableName: 'peoplePhones',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          personDevice.belongsTo(models.person,{foreignKey: 'person_id'});
        }
      }
    });
    return personDevice;
  };
}());
