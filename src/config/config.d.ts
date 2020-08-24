interface Environment {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
}

interface Config {
  development: Environment;
  test: Environment;
  production: Environment;
}

declare const config: Config;
export default config;
