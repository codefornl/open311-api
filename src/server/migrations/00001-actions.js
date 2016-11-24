(function() {
  "use strict";
  module.exports = {
    up: function(migration, DataTypes, done) {
      migration.createTable("actions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        name: {
          type: DataTypes.STRING
        },
        description: {
          type: DataTypes.STRING
        },
        type: {
          type: DataTypes.ENUM,
          values: ['system', 'department']
        }
      }).done(done);
    },
    down: function(migration, DataTypes, done) {
      migration.dropTable("actions").done(done);
    }
  };
}());
