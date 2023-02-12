require('./startup/env');
require('./startup/uncaughtException');
const db = require('./startup/db');
const settingSeeder = require('./seeders/setting.seeder');
const discordBot = require('./startup/discordBot');

async function main() {
  await db();
  await settingSeeder();
  await discordBot();
}

main();
