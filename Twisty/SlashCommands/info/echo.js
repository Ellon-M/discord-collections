const { Command } = require("reconlx");

module.exports = new Command({
    name: "echo",
    description: "echo your message",
    options: [
        {
            name: "message",
            description: "the message to echo",
            type: "STRING",
            required: true
        }
    ],
    run: async ({interaction}) => {
        const message = interaction.options.getString('message');
        interaction.followUp(`you said: ${message}`); 
    } ,
})