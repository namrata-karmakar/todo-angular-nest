/**
 * This file would help configure environment variables, from outside the application when running this   project in docker-compose or k8s.
 * Primarily this file uses convict framework, in-order to configure the env variables.
 *
 */
import convict from 'convict';
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['prod', 'local', 'test'],
    default: 'local',
    env: 'NODE_ENV',
  },
  applicationPort: {
    doc: 'The application port, on which this ORM layer will be served.',
    default: 3001,
    env: 'APPLICATION_PORT',
  },
  databaseHost: {
    doc: 'The database host for TypeORM.',
    default: '127.0.0.1',
    env: 'DATABASE_HOST',
  },
  databasePort: {
    doc: 'The database port for TypeORM.',
    default: 5432,
    env: 'DATABASE_PORT',
  },
  databaseUsername: {
    doc: 'The database username for TypeORM.',
    default: 'postgres',
    env: 'DATABASE_USERNAME',
  },
  databasePassword: {
    doc: 'The database password for TypeORM.',
    default: 'myDefaultPassword',
    env: 'DATABASE_PASSWORD',
  },
  databaseName: {
    doc: 'The database name for TypeORM.',
    default: 'postgres',
    env: 'DATABASE_NAME',
  },
  databaseSchema: {
    doc: 'The database schema for TypeORM.',
    default: 'public',
    env: 'DATABASE_SCHEMA',
  },
  secretKey: {
    doc: 'The secret key for JWT',
    default: 'someSecretKey',
    env: 'SECRET_KEY',
  },
  expiresIn: {
    doc: 'the time in which JWT expires in',
    default: '1h',
    env: 'EXPIRES_IN',
  },
});
const env = config.get('env');
config.loadFile(`${__dirname}/${env}.json`);
config.validate({ allowed: 'strict' });
export { config };
