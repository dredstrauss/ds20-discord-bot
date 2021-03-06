const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', () => {
    console.log(`Bot ready!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    // if (interaction.user.bot) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (e) {
        console.error(e);
        await interaction.reply({ content: 'Error... Oops!', ephemeral: true });
    }

});

client.login(process.env.TOKEN);
