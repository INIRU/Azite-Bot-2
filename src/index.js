const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
const { local } = require('./language');
const logger = require('./logger.js');
const config = require('./config.js');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
  ],
});

/** Prototype */
Client.prototype.local = local;
Client.prototype.config = config;
Error.prototype.client = client;
Error.prototype.interaction = null;
String.prototype.bind = function (parameter) {
  let text = this;
  const key = text.match(/\{(.*?)\}/g);
  if (!key) return this;

  key.forEach((key) => {
    const name = key.replace(/\{/, '').replace(/\}/, '');
    const code = String(parameter[name]);
    text = text.replace(key, code ?? '');
  });
  return text;
};

client.commands = new Collection();

logger.info('Commands Handler is Ready');

const commandsPath = path.join(__dirname, './commands');
const commandsFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    logger.info(`Command: ${command.data.name} is Load`);
    client.commands.set(command.data.name, command);
  } else {
    logger.warn(`${filePath} Not Command File Formats.`);
  }
}

logger.info('Events Handler is Ready');

const eventsPath = path.join(__dirname, './events');
const eventsFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventsFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  logger.info(`Event: ${event.name} is Load`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

(async () => await client.login(client.config.token))();
