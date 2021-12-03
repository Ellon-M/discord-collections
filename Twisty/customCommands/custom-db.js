const mongoose = require('mongoose');

// schema for the custom commands
const customCommandsSchema = new mongoose.Schema({
    guildId: String,
    commandName: String,
    response: String
});

module.exports = mongoose.model("custom-commands-schema", customCommandsSchema);