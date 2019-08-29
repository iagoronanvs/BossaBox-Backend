'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tool = sequelize.define('Tool', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: DataTypes.STRING,
    description: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING)
  }, {});
  Tool.associate = function(models) {
    // associations can be defined here
  };
  return Tool;
};