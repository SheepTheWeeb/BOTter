module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    discord_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discord_tag: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    underscored: true,
    freezeTableName: true,
  })

  user.associate = function(models) {
    user.hasMany(models.redflag, { foreignKey: 'user_id' });
    user.hasMany(models.redflag, { foreignKey: 'received_from' });
  }

  return user;
};
