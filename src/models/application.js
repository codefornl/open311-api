/*!
 * person model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var application = sequelize.define("application", {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      api_key: DataTypes.STRING,
    }, {
      tableName: 'clients',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          application.belongsTo(models.person,{foreignKey: 'contactPerson_id'});
          application.belongsTo(models.contactMethod,{foreignKey: 'contactMethod_id'});
        }
      }
    });
    return application;
  };
}());
