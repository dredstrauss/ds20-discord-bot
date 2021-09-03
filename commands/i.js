const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');

const roll = require('../modules/Roll');
const between = require('../modules/Between');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('i')
    .setDescription(`Tirada de iniciativa`)
    .addStringOption(option =>
        option.setName('iniciativa')
        .setDescription('Puntaje iniciativa (modificación a la tirada)')
        .setRequired(true)
    ),
    async execute(interaction) {

        let ini = between(interaction.options.getString('iniciativa'),-99,99);

        let results = {
            d10 : 0,
            ini : 0
        };

        results.d10 = parseInt(roll(10));
        results.ini = results.d10 + ini;

        await interaction.reply(
            `Modificador de iniciativa: ${ini}\n`+
            `>>> *d10: **${results.d10}***\n`+
            `**Resultado de iniciativa: __${results.ini}__**`
        );
    },
};
