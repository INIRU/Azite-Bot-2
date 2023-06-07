const { config } = require('dotenv');
const { getEnvironmentVariable } = require('./utils');

config();

module.exports = {
  token: getEnvironmentVariable('TOKEN'),
  clientId: getEnvironmentVariable('CLIENT_ID'),
  guildId: getEnvironmentVariable('GUILD_ID'),
};
