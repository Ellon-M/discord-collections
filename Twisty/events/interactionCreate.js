const client = require("../index");
const customCommandModel = require('../customCommands/custom-db');
const { GuildMember } = require("discord.js");

client.on("interactionCreate", async (interaction) => {

    // Slash Command Handling
    if (interaction.isCommand()) {
        // put off/postpone reply for a bit
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        //get slash command
        const cmd = client.slashCommands.get(interaction.commandName);

    if (cmd) {
       if (interaction.commandName === 'cs' && interaction.memberPermissions.bitfield !== 1099511627775n) {
            return interaction.followUp({
                content: 'You do not have permission to use this command!'
            })
        }
        // console.log(interaction.memberPermissions.bitfield);

        const args = [];

        // if cmd has args..
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);
        cmd.run({client, interaction, args});
    }
    else {
        const customCommand = await customCommandModel.findOne({
            commandName: interaction.commandName
        });
        
        if (!customCommand) {
         return interaction.followUp({
            content: 'An error has occured!'
        })
        }

        return interaction.followUp({
            content: customCommand.response
        });
    }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {

        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run({client, interaction});

    }
});
