const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ds')
<<<<<<< HEAD
    .setDescription('Check if bot is running'),
=======
    .setDescription('Check if bot is running');
>>>>>>> 0f6354d6f13ae396b3e8f8f436563517089cacc7
    async execute(interaction) {
        await interaction.reply(`I'm here!`);
    }
};
