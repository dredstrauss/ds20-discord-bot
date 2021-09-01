const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log(`Bot ready!`);
});

client.on('message', msg => {

    if (msg.content.startsWith('ds' || 'DS' || 'Ds' || 'dS')) {
        msg.reply(`I'm here...`);
    }

});

client.login('token');
