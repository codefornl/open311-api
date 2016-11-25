/*!
 * Issue model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var issue = sequelize.define("issue", {
      description: DataTypes.TEXT
    }, {
      tableName: 'issues',
      timestamps: true,
      createdAt: false,
      updatedAt: 'date',
      classMethods: {
        associate: function(models) {
          issue.belongsTo(models.request,{foreignKey: 'ticket_id'});
          issue.belongsTo(models.contactMethod,{foreignKey: 'contactMethod_id'});
          issue.belongsTo(models.person,{foreignKey: 'reportedByPerson_id'});
          issue.hasMany(models.media,{foreignKey: 'issue_id'});
        }
      }
    });
    return issue;
  };
}());
