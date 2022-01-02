const {Client, MessageEmbed, Message} = require('discord.js');

module.exports = {
    name: "ban",
    description: "ban guild members",
     /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async ({client, message, args}) => {
        if(!message.member.permissions.has("BAN_MEMBERS")) return;
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Mention a member to ban");
        }

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            return message.reply("You cannot ban a member that has a similar or higher role than you");
        }

        const reason = args.slice(1).join(" ") || "No reason";

        member.ban({reason});
        message.channel.send(`Banned ${member} for ${reason}`);
    }
    
}