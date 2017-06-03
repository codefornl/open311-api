/*!
 * department model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var department = sequelize.define("department", {
      name: DataTypes.STRING
    }, {
      timestamps: false,
      classMethods: {
        associate: function(models) {
          department.hasMany(models.person,{foreignKey: 'department_id'});
          department.hasOne(models.jurisdiction,{foreignKey: 'jurisdiction_id'});
        }
      }
    });
    return department;
  };
}());
