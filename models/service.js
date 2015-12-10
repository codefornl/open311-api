/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service = sequelize.define("service", {
      service_code: DataTypes.STRING,
      service_name: DataTypes.STRING,
      description: DataTypes.TEXT,
      metadata: DataTypes.BOOLEAN, //true,false
      type: DataTypes.STRING, //realtime,batch,blackbox
      keywords: DataTypes.TEXT,
      group: DataTypes.STRING
    }, {
      classMethods: {
        associate: function(models) {
          service.belongsTo(models.jurisdiction);
          service.hasMany(models.service_attribute);
        }
      }
    });
    return service;
  };
}());
