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
      tableName: 'departments',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          department.hasMany(models.person,{foreignKey: 'department_id'});
        }
      }
    });
    return department;
  };
}());
