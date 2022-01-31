
const mongoose = require('mongoose');
const client = require("../index");

const swearSchema = new mongoose.Schema({antiswearToggler: Boolean, swearWords: Array
}, {collection: 'antiswear'});
const swearModel = mongoose.model('swearModel', swearSchema, 'antiswear')

client.on('message', async( message ) => {
    const option = await swearModel.find({}).distinct('antiswearToggler');
    const words = await swearModel.find({}).distinct('swearWords');
    capsInWords = [];

    if (option[0] === false) return;

    for (let i = 0; i < words.length; i++) {
        rawCont = message.content; // raw messsage
        casedCont = rawCont.split('').map((letter) => {
            return letter === letter.toUpperCase() ? letter.toLowerCase() : letter.toLowerCase()
            }).join(''); // every letter to lowercase
        
        if(message.content.includes(words[i]) | casedCont === words[i]) {
            message.delete();
            message.channel.send('Message deleted. Your message contains words not allowed in the server');
        }
    }
})

module.exports = swearModel;