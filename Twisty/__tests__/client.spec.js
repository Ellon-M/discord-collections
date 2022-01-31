const { Client } = require("discord.js");
const conf = require("../config.json");

describe('client status testing', () => {
    const log = console.log;
    jest.useFakeTimers();
    const client = new Client({
        intents: 32767,
    });

    beforeEach(() => {
        console.log = jest.fn();
    })

    afterAll(() => {
        console.log = log;
        client.destroy();
    });

    it('shows that the client presence status is online', () => {
        console.log(client.presence.status);
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        expect(message).toEqual(expect.stringContaining('online'));
        log(message);
    })

    it('asserts whether the bot token is provided in the config file', () => {
        expect(conf).toHaveProperty('token');
    })
})

