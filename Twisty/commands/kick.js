const {Client, MessageEmbed, Message} = require('discord.js');

module.exports = {
    name: "kick",
    description: "kick guild members",
     /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    
    run: async ({client, message, args}) => {
        if(!message.member.permissions.has("KICK_MEMBERS")) return;
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Mention a member to kick");
        }

        console.log(member.roles.highest.position);

        if (message.member.roles.highest.position <= member.roles.highest.position) {
            return message.reply("You cannot kick a member that has a similar or higher role than you");
        }

        const reason = args.slice(1).join(" ") || "No reason";

        member.kick({reason});
        message.channel.send(`Kicked ${member} for ${reason}`);
    }
    
}