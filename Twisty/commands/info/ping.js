const { Command } = require("reconlx");

module.exports = new Command({
    name: 'ping',
    aliases: ['p'],
    description: 'returns websocket ping',
    run: async ({client, message, args}) => {
        message.channel.send(`${client.ws.ping} ws ping`);
    }
})