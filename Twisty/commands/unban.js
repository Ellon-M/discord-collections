const {Client, Message, MessageEmbed} = require('discord.js');

module.exports = {
    name: "unban",
    description: "unban guild members",
     /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async ({client, message, args}) => {

        if(!message.member.permissions.has("BAN_MEMBERS")) return;

        const id = args[0];

        if (!id) return message.reply("Please provide an ID");

        const banned = await message.guild.bans.fetch();

        if (!banned.find((user) => user.user.id === id)) { return message.reply("User is not banned");
        }

    message.guild.members.unban(id);
    message.reply("Unbanned user");
}
}