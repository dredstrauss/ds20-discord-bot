const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');

const roll = require('../modules/Roll');
const between = require('../modules/Between');

const lang = process.env.LANGUAGE;
const text = require('../lang.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(text.rollInitiative.name[lang])
    .setDescription(text.rollInitiative.description[lang])
    .addStringOption(option =>
        option.setName(text.rollInitiative.opt1Name[lang])
        .setDescription(text.rollInitiative.opt1Description[lang])
        .setRequired(true)
    ),
    async execute(interaction) {

        let ini = between(interaction.options.getString(text.rollInitiative.opt1Name[lang]),-99,99);

        let results = {
            d10 : 0,
            ini : 0
        };

        results.d10 = parseInt(roll(10));
        results.ini = results.d10 + ini;

        await interaction.reply(
            `${text.rollInitiative.message1[lang]} ${ini}\n`+
            `>>> *d10: **${results.d10}***\n`+
            `**${text.rollInitiative.message2[lang]} __${results.ini}__**`
        );
    },
};
