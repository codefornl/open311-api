/*!
 * person model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var application = sequelize.define("application", {
      id : {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      url: DataTypes.STRING,
      api_key: DataTypes.STRING,
    }, {
      timestamps: false,
      classMethods: {
        associate: function(models) {
          application.belongsTo(models.person,{foreignKey: 'person_id'});
        }
      }
    });
    return application;
  };
}());
