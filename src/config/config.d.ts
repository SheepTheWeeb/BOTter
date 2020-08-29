interface Environment {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: string;
}

interface Config {
  [key: string]: Environment;
}

declare const config: Config;
export default config;
