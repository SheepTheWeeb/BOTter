import { Redflag } from './Redflag';
import { Sequelize } from 'sequelize';
import { Otteruser } from './Otteruser';
import config from '../config/config';

export function initializeDb() {
  const env: string = process.env.NODE_ENV || 'development';
  const envConfig = config[env as keyof typeof config];

  const sequelize: Sequelize = new Sequelize(
    envConfig.database!,
    envConfig.username!,
    envConfig.password!,
    { host: envConfig.host!, port: envConfig.port!, dialect: 'mysql' }
  );

  Otteruser.prepareInit(sequelize);
  Redflag.prepareInit(sequelize);

  Otteruser.setAssociations();
  Redflag.setAssociations();
}
