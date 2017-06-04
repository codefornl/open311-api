/*!
 * Service model
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var request = sequelize.define("request", {
      status: DataTypes.STRING,
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
          request.belongsTo(models.service,{foreignKey: 'service_id'});
          request.belongsTo(models.jurisdiction,{foreignKey: 'jurisdiction_id'});
          request.belongsTo(models.application,{foreignKey: 'application_id'});
          request.hasMany(models.issue,{foreignKey: 'ticket_id'});
          request.belongsTo(models.person,{foreignKey: 'assignedPerson_id'});
          request.belongsTo(models.person,{foreignKey: 'enteredByPerson_id'});
        }
      }
    });
    return request;
  };
}());
