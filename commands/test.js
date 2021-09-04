const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');

const roll = require('../modules/Roll');

const lang = 'esp';
const text = require('../lang.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription(text.test.description[lang]),
    async execute(interaction) {
        await interaction.reply(
            `${text.test.message1[lang]}\n`+
            `${text.test.message2[lang]} **${roll(20)}**`
        );
    },
};
