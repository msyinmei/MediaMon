"use strict";

module.exports = function(sequelize, DataTypes) {
  var Keyword = sequelize.define("Keyword", {
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(db) {
        // associations can be defined here
        Keyword.hasMany(db.User);
      }
    }
  });

  return Keyword;
};
