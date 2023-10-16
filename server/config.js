const dotenv = require('dotenv');
dotenv.config();

const { env } = process;

module.exports = {
  host: env.DB_HOST,
  user: env.DB_USER,
  database: env.DB_NAME,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
}