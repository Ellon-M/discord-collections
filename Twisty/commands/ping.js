const { Message, Client } = require("discord.js");
const { Command } = require("reconlx");

module.exports = {
    name: 'ping',
    aliases: ['p'],
    type: 'CHAT_INPUT',
    run: async ({client, message, args}) => {
        message.channel.send(`${client.ws.ping} ms`);
    }
}