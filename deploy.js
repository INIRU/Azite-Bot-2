const { REST, Routes } = require('discord.js');
const config = require('./src/config');
const fs = require('node:fs');
const path = require('node:path');
const logger = require('./src/logger');

const commands = [];

const commandsPath = path.join(__dirname, './src/commands');
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    logger.info(`Deploy ${file}`);
    commands.push(command.data.toJSON());
  } else {
    logger.warn(`${file} is not (/) commands file.`);
  }
}

const rest = new REST({}).setToken(config.token);

(async () => {
  try {
    logger.http(`[Discord API] start (/) commands refreshing`);
    await rest.put(
      Routes.applicationGuildCommands(config.clientId, config.guildId),
      // Routes.applicationCommands(config.clientId),
      { body: commands }
    );
    logger.info('[Discord API] Successfully reloaded (/) commands.');
  } catch (e) {
    logger.error(e.stack);
  }
})();
