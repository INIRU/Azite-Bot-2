const { config } = require('dotenv');
const { getEnvironmentVariable } = require('./utils');

config();

module.exports = {
  token: getEnvironmentVariable('TOKEN'),
  clientId: getEnvironmentVariable('CLIENT_ID'),
  guildId: getEnvironmentVariable('GUILD_ID'),
  errlogchId: getEnvironmentVariable('ERROR_CHANNEL_ID'),
  dbHost: getEnvironmentVariable('DB_HOST'),
  dbUser: getEnvironmentVariable('DB_USER'),
  dbPasswd: getEnvironmentVariable('DB_PASSWD'),
  dbName: getEnvironmentVariable('DB_NAME'),
};
