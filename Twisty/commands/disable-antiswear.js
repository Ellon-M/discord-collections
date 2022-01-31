const {Client, MessageEmbed, Message} = require('discord.js');
const swearModel = require('../events/antiswear');

module.exports = {
    name: 'antiswear-off',
    description: 'toggles antiswear event to false and sets it off',
     /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async({client, message, args}) => {
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        if(!message.member.permissions.has("MANAGE_MESSAGES")) return;

        const option = await swearModel.find({}).distinct('antiswearToggler');
        console.log(option);
        if (option[0] === true) {
            await swearModel.find({}).distinct('antiswearToggler').updateOne({antiswearToggler: false});
            message.channel.send('Antiswear turned off');
        }
        else {
            message.channel.send('Antiswear is already off');
        }
    }
}