/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service = sequelize.define("service", {
      id : {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      service_name: {
        "type": DataTypes.STRING,
        i18n: true
      },
      customFields: DataTypes.TEXT,
      description: {
        type: DataTypes.TEXT,
        i18n: true
      },
      keywords: {
        type: DataTypes.TEXT,
        i18n: true
      }
    }, {
      timestamps: false,
      classMethods: {
        associate: function(models) {
          service.belongsTo(models.jurisdiction,{foreignKey: 'jurisdiction_id'});
          service.belongsTo(models.service_group,{foreignKey: 'service_group_id'});
          service.hasMany(models.service_attribute,{foreignKey: 'service_id'});
          service.hasMany(models.request,{foreignKey: 'service_id'});
        }
      }
    });
    return service;
  };
}());
