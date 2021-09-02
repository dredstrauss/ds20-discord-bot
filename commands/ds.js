const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');
const roll = require('../Roll');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ds')
    .setDescription('Comprobar que el Bot está funcionando'),
    async execute(interaction) {
        await interaction.reply(
            `¡Aquí estoy! Todo funcionando bien\n`+
            `Prueba de dado d20: *${roll(20)}*`
        );
    },
};
