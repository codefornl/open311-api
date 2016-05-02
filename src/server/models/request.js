/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var request = sequelize.define("request", {
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      location: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING
    }, {
      tableName: 'tickets',
      timestamps: true,
      createdAt: 'enteredDate',
      updatedAt: 'lastModified',
      classMethods: {
        associate: function(models) {
          request.belongsTo(models.service,{foreignKey: 'category_id'});
        }
      }
    });
    return request;
  };
}());
