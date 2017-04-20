/*!
 * User model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var service_group = sequelize.define("service_group", {
      name: DataTypes.STRING,
      ordering: DataTypes.INTEGER
    }, {
      tableName: 'categoryGroups',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          service_group.hasMany(models.service,{foreignKey: 'categoryGroup_id'});
        }
      }
    });
    return service_group;
  };
}());
