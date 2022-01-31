const {Client, MessageEmbed, Message} = require('discord.js');
const swearModel = require('../events/antiswear');

module.exports = {
    name: 'antiswear-on',
    description: 'toggles antiswear event to true and sets it on',
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
        if (option[0] === false) {
            await swearModel.find({}).distinct('antiswearToggler').updateOne({antiswearToggler: true});
            message.channel.send('Antiswear turned on');
        }
        else {
            message.channel.send('Antiswear is already on');
        }
    }
}