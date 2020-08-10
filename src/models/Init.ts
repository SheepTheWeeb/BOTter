import { Redflag } from './Redflag';
import { DataTypes, Sequelize } from 'sequelize';
import { User } from './User';
import config from '../config/config';

export function initializeDb() {
  const env: string = process.env.NODE_ENV || 'development';
  const envConfig = config[env as keyof typeof config];

  const sequelize = new Sequelize(
    envConfig.database!,
    envConfig.username!,
    envConfig.password!,
    { host: envConfig.host!, port: envConfig.port!, dialect: 'mysql' }
  );

  Redflag.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      received_from: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false
      },
      double_red: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'redflag',
      underscored: true
    }
  );

  // TODO: this got broken in the process of converting to TS
  // Redflag.belongsTo(User, { foreignKey: 'user_id', as: 'receiver' });
  // Redflag.belongsTo(User, {
  //   foreignKey: 'received_from',
  //   as: 'giver'
  // });

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      discord_id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      discord_tag: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'user',
      underscored: true
    }
  );

  User.hasMany(Redflag, {
    foreignKey: 'user_id'
  });
  User.hasMany(Redflag, {
    foreignKey: 'received_from'
  });
}
