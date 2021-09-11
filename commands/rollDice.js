const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');

const roll = require('../modules/Roll');
const between = require('../modules/Between');

const lang = process.env.LANGUAGE;
const text = require('../lang.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(text.rollDice.name[lang])
    .setDescription(text.rollDice.description[lang])
    .addStringOption(option =>
        option.setName(text.rollDice.opt1Name[lang])
        .setDescription(text.rollDice.opt1Description[lang])
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName(text.rollDice.opt2Name[lang])
        .setDescription(text.rollDice.opt2Description[lang])
        .setRequired(false)
    ),
    async execute(interaction) {

        let sides = between(interaction.options.getString(text.rollDice.opt1Name[lang]),1,999);
        let sidesInput = interaction.options.getString(text.rollDice.opt2Name[lang]);
        let dice = 1;

        if (parseInt(sidesInput) > 1) { dice = between(sidesInput,1,99) };

        let results = [];

        for (let i = 0; i < dice; i++) results.push(roll(sides));

        let messages = {
            dieOrDice : text.rollDice.message1[lang],
            results : text.rollDice.message2[lang],
            sum : ''
        }

        if (dice > 1) {
            messages.dieOrDice = text.rollDice.message3[lang];
            messages.results = text.rollDice.message4[lang];
            messages.sum = `*(${text.rollDice.message5[lang]}: ${results.reduce((x,y)=>x+y)})*`;
        };

        await interaction.reply(
            `${messages.dieOrDice}: ${dice}d${sides}\n`+
            `>>> ${messages.results}: **${results}**\n`+
            `${messages.sum}`
        );
    },
};
