const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `config/${NODE_ENV}.env` });
