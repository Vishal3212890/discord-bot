const mongoose = require('mongoose');

const { DB_URL } = process.env;

module.exports = async function () {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(DB_URL);
    console.log('Connected to MongoDB...');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
