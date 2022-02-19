const {Client, MessageEmbed, Message} = require('discord.js');
const blacklistModel = require('../events/blacklistwords');

module.exports = {
    name: 'blacklist',
    description: 'blacklists specified words from being mentioned',
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async ({client, message, args}) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return;

        const blacklisted = await blacklistModel.find({}).distinct('words');

        for (let i = 0; i < blacklisted.length; i++) {
            if (message.content.includes(blacklisted[i])) {
                message.channel.send('The word is already blacklisted');
                return
            }
        }
        const cont = message.content;
        const splitCont = cont.split(' ');
        splitCont.shift();
        const mergedCont = splitCont.join(' ');
        blacklisted.push(mergedCont);
        await blacklistModel.find({}).distinct('words').updateOne({words: blacklisted});
        message.channel.send('Blacklisted. The word(s) can no longer be used in the server');
    }
}
