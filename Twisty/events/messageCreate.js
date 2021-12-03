const client = require("../index");
const { Permissions } = require('discord.js');

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(client.config.prefix)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(client.config.prefix.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    if (command) {
        if (!message.member.permissions.has(command.userPermissions)) {
            return message.channel.send(
                "You do not have permission to use this command!"
            );
        }
        if (!message.guild.me.permissions.has(command.botPermissions)) {
            return message.channel.send(
                "I do not have permission to use this command!"
            );
        }
        await command.run({client, message, args});
    }
    
});
