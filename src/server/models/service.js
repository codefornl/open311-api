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
      description: DataTypes.TEXT,
      keywords: DataTypes.TEXT
    }, {
      tableName: 'categories',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          service.belongsTo(models.service_group,{foreignKey: 'categoryGroup_id'});
          service.hasMany(models.request,{foreignKey: 'category_id'});
        }
      }
    });
    return service;
  };
}());
/*
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
*/
