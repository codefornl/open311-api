/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service = sequelize.define("service", {
      service_name: {
        "type": DataTypes.STRING,
        "field": "name"
      },
      customFields: DataTypes.TEXT,
      description: DataTypes.TEXT,
      keywords: DataTypes.TEXT
    }, {
      tableName: 'categories',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          service.belongsTo(models.jurisdiction);
          service.belongsTo(models.service_group,{foreignKey: 'categoryGroup_id'});
          service.hasMany(models.request,{foreignKey: 'category_id'});
        }
      }
    });
    return service;
  };
}());
