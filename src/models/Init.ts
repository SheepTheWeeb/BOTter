import { Redflag } from './Redflag';
import { Sequelize } from 'sequelize';
import { Otteruser } from './Otteruser';
import config from '../config/config';

export function initializeDb() {
  const env: string = process.env.NODE_ENV || 'development';
  const envConfig = config[env];

  const sequelize: Sequelize = new Sequelize(
    envConfig.database!,
    envConfig.username!,
    envConfig.password!,
    { host: envConfig.host!, port: envConfig.port!, dialect: 'mysql', dialectOptions: envConfig.dialectOptions }
  );

  Otteruser.prepareInit(sequelize);
  Redflag.prepareInit(sequelize);

  Otteruser.setAssociations();
  Redflag.setAssociations();
}
