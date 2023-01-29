const mongoose = require('mongoose');

const { DB_URL } = process.env;

module.exports = async function () {
  mongoose.set('strictQuery', false);
  await mongoose.connect(DB_URL).then();
  console.log('Connected to MongoDB...');
};
