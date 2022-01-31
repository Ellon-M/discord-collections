const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
const { Collection, Client } = require('discord.js');
const client = new Client({
    intents: 32767,
});

describe('async handler function behaviour', () => {
    const log = console.log;
    jest.useFakeTimers();

    beforeEach(() => {
        console.log = jest.fn();
    })

    afterAll(() => {
        console.log = log;
    });

    it('fetches bot commands from the commands directory', async () => {
        const botCmds = await globPromise(`${process.cwd()}/commands/*.js`);
        console.log(botCmds);
        expect(console.log).toBeCalledWith(expect.anything());
        const message = console.log.mock.calls[0][0];
        expect(message.length).toBeGreaterThanOrEqual(2);
        log(message);
    })

    it('confirms that all the fetched bot commands are set on the client instance', async () => {
        client.commands = new Collection();
        const botCmds = await globPromise(`${process.cwd()}/commands/*.js`);
        botCmds.map((val) => {
            const file = require(val);
            const split = val.split("/");
            const directory = split[split.length - 2];

            if (file.name) {
                const properties = { directory, ...file };
                client.commands.set(file.name, properties);
            }
        })
        expect(client.commands.size).toEqual(botCmds.length);
    })

    it('fetches slash commands from the slash commands directory', async () => {
        const slashCmds = await globPromise(
            `${process.cwd()}/SlashCommands/*/*.js`
        );
        console.log(slashCmds);
        expect(console.log).toBeCalledWith(expect.anything());
        const message = console.log.mock.calls[0][0];
        expect(message.length).toBeGreaterThanOrEqual(2);
        log(message);
    })

    it('confirms that all the fetched slash commands are set on the client instance', async() => {
        client.slashCommands = new Collection();
        const slashCmds = await globPromise(
            `${process.cwd()}/SlashCommands/*/*.js`
        );
        slashCmds.map((val) => {
            const file = require(val);
            client.slashCommands.set(file.name, file);
        })
        expect(client.slashCommands.first()).toHaveProperty('name');
        expect(client.slashCommands.first()).toHaveProperty('run');
        expect(client.slashCommands.last()).toHaveProperty('name');
        expect(client.slashCommands.last()).toHaveProperty('run');
    })
})