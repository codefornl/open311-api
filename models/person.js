/*!
 * person model,
 * This one is mainly here because of uReport legacy
 */
(function() {
  'use strict';
  module.exports = function(sequelize, DataTypes) {
    var person = sequelize.define("person", {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      token: DataTypes.STRING,
      role: DataTypes.STRING
    }, {
      tableName: 'people',
      timestamps: false,
      classMethods: {
        associate: function(models) {
          person.belongsTo(models.department,{foreignKey: 'department_id'});
          person.hasMany(models.personEmail, {foreignKey: 'person_id'});
        }
      }
    });
    return person;
  };
}());
