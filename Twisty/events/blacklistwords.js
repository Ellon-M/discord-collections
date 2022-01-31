const mongoose = require('mongoose');
const client = require('../index');

const blacklistSchema = new mongoose.Schema({
    words: Array
});
const blacklistModel = mongoose.model('blacklistModel', blacklistSchema)



client.on('message', async (message) => {
    const blacklisted = await blacklistModel.find({}).distinct('words');
    for (let i = 0; i < blacklisted.length; i++) {
        if (message.content === blacklisted[i]) {
            message.delete();
            message.channel.send('Message deleted. Your message contains words blacklisted in the server');
        }
    }
})

module.exports = blacklistModel;