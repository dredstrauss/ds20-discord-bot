const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ds')
    .setDescription('Check if bot is running'),
    async execute(interaction) {
        await interaction.reply(`I'm here!`);
    },
};
