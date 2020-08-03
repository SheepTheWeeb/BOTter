const Postgrator = require('postgrator');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const postgrator = new Postgrator({
  // Directory containing migration files
  migrationDirectory: './../migrations',
  // or a glob pattern to files
  migrationPattern: `${__dirname}/some/pattern/*`,
  // Driver: must be pg, mysql, mysql2 or mssql
  driver: 'mysql2',
  // Database connection config
  host: config.host,
  port: config.port || 3306,
  database: config.database,
  username: config.username,
  password: config.password,
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: 'schemaversion'
});

postgrator
  .migrate()
  .then((appliedMigrations) => logger.info(appliedMigrations))
  .catch((error) => logger.error(error));
