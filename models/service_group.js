/*!
 * User model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service_group = sequelize.define("service_group", {
      id : {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      group_name: {
        "type": DataTypes.STRING,
        i18n: true
      },
      ordering: DataTypes.INTEGER
    }, {
      timestamps: false,
      classMethods: {
        associate: function(models) {
          service_group.hasMany(models.service,{foreignKey: 'service_group_id'});
        }
      }
    });
    return service_group;
  };
}());
