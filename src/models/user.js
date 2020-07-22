module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    underscored: true,
    freezeTableName: true,
  })

  user.associate = function(models) {
    user.hasMany(models.redflag, {
        foreignKey: 'id'
    })
  }

  return user;
};
