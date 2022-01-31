//ready meassage 
const client = require("../index");

module.exports = ready = async () => {
    console.log(`${client.user.tag} is up and ready to go!`);
}

client.on("ready", ready);
