const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve('.env') });

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  SECRET: process.env.SECRET
};
