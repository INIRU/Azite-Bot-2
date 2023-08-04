const { Events, PermissionFlagsBits } = require('discord.js');
const logger = require('../logger');

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client, arg) {
    if (!client.isReady()) return;

    /* Azite Guild ALl Member **/
    try {
      setInterval(async () => {
        const guild = await client.guilds.fetch('670930847293112321');
        const allCountChannel = guild.channels.cache.get('1136355225431707688');
        const memberCountChannel = guild.channels.cache.get(
          '1136363727046848592'
        );
        const staffCountChannel = guild.channels.cache.get(
          '1136371465210576926'
        );
        const [bots, humans] = (await guild.members.fetch()).partition(
          (member) => member.user.bot
        );
        const staff = await humans.filter((member) =>
          member.permissions.has(PermissionFlagsBits.Administrator)
        );

        await allCountChannel.setName(
          `‧₊˚﹕🎮₊◜전체인원 : ${humans.size + bots.size}`
        );
        await memberCountChannel.setName(`‧₊˚﹕🎲₊◜순수인원 : ${humans.size}`);
        await staffCountChannel.setName(`‧₊˚╰👑₊◜관리자 : ${staff.size}`);
        logger.info('Server State Channel Edited');
      }, 100000); // Server State Channel Name 10m cycle change!
    } catch (e) {
      logger.warn(e);
    }

    logger.info(`${client.user.tag} is now online!`);
  },
};
