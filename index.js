const Discord = require('discord.js');
const client = new Discord.Client();

const token = 'ODgyNjU3NDA4MDAwODgwNjQw.YS-kxQ.0-1SXuqIxoWec652qertw0iNrZY';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if (msg.content.startsWith('ds' || 'DS' || 'Ds' || 'dS')) {
        msg.reply(`I'm here...`);
    }

});

client.login('token');
