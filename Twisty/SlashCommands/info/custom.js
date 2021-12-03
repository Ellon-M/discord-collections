const { MessageEmbed } = require("discord.js");
const { Command } = require("reconlx");
const customCommandModel = require('../../customCommands/custom-db');

module.exports = new Command({
    name: "cs",
    description: "custom command configurations",
    permissions: ['MANAGE_MESSAGESK'],
    options: [
        {
            name: "create",
            description: "create command",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "command",
                    description: "name of custom command",
                    type: "STRING",
                    required: true
                },
                {
                    name: "response",
                    description: "response for the custom command",
                    type: "STRING",
                    required: true,

                },
            ],
        },
        {
            name: "delete",
            type: "SUB_COMMAND",
            description: "remove a command",
            options: [
                {
                    name: "command",
                    description: "name of custom command",
                    type: "STRING",
                    required: true
                },
            ]
        }
    ],
    run: async ({client, interaction}) => {
        const subCommand = interaction.options.getSubcommand();
        const commandName = interaction.options.getString('command');
        const customCommand = await customCommandModel.findOne({commandName});

        if (subCommand === "create") {
            const response = interaction.options.getString("response");
            const fields = {
                commandName,
                response,
                guildId: interaction.guildId
            }

            // new instance
            if (!customCommand) {
                await customCommandModel.create(fields);
            }
            // update old instance
            else {
                await customCommand.updateOne(fields);
            }

            await interaction.guild.commands.create({
                name: commandName,
                description: 'lightyears ahead',
            });

            const embed = new MessageEmbed()
                        .setTitle("new custom command")
                        .addField("name", commandName)
                        .addField("response", response)
                        .setImage("http://www.celinda.info/wp-content/uploads/2017/08/orgazm-olan-kadini-eve-atip-sonrada-sikiyor.gif")
                        .setTimestamp(Date.now());
                        

            return interaction.followUp({ embeds: [embed]});
        }
        if (subCommand === "delete") {
            if (!customCommand) {
                return interaction.followUp({ content: "No such command, weirdo"});
            }
            await customCommand.delete();
            const command = await interaction.guild.commands.cache.find((cmd) =>  cmd.name === commandName
            );

            await interaction.guild.commands.delete(command.id);
            return interaction.followUp({content: "Custom command deleted"});
        }
    }

})