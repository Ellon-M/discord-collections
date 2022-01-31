const Scraper = require('images-scraper');

const google = new Scraper({
    puppeteer: {
        headless: false,
      }
})

module.exports = {
    name : 'searchimage',
    description: 'return an image from google as per the query provided in the message string',
     /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run : async({client, message, args}) => {
        const query = args.join("")
        if(!query) return message.channel.send('Type something to search for');
        message.channel.send('Finding image...');
        const results = await google.scrape(query, 1);
        console.log(results);
        message.channel.send(results[0].url);
    }
}