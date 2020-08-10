const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env: string = process.env.NODE_ENV || 'development';
import config from './../config/config';
const envConfig = config[env as keyof typeof config];

const db = {};

const sequelize: any = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  envConfig
);

fs.readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file: any) => {
    /* eslint-disable-next-line global-require */
    const model: any = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
