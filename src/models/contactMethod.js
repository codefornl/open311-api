/*!
 * person model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var contactMethod = sequelize.define("contactMethod", {
      name: DataTypes.STRING
    }, {
      tableName: 'contactMethods',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          contactMethod.hasMany(models.application,{foreignKey: 'contactMethod_id'});
        }
      }
    });
    return contactMethod;
  };
}());
