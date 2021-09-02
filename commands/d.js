const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');
const roll = require('../Roll');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('d')
    .setDescription(`Tirada de dados genérica`)
    .addStringOption(option =>
        option.setName('caras')
        .setDescription('Caras del dado (ej.: 4, 6, 8, 10, 12, 20, 100)')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('cantidad')
        .setDescription('Cantidad de dados similares a lanzar (0 o más)')
        .setRequired(false)
    ),
    async execute(interaction) {
        const between = (val) => {
            let num = parseInt(val);
            if (num > 999) { num = 999 }
            if (num < 0) { num = 1 }
            return num
        }

        let caras = between(interaction.options.getString('caras'));
        let cantidadInput = interaction.options.getString('cantidad');
        let cantidad = 1;

        if (parseInt(cantidadInput) > 1) { cantidad = between(cantidadInput) };

        let results = [];

        for (let i = 0; i < cantidad; i++) results.push(roll(caras));

        let messages = {
            dieOrDice : 'Dado',
            results : 'Resultado',
            sum : ''
        }

        if (cantidad > 1) {
            messages.dieOrDice = 'Dados';
            messages.results = 'Resultados';
            messages.sum = `*(Suma de las tiradas: ${results.reduce((x,y)=>x+y)})*`;
        };

        await interaction.reply(
            `${messages.dieOrDice}: ${cantidad}d${caras}\n`+
            `>>> ${messages.results}: **${results}**\n`+
            `${messages.sum}`
        );
    },
};
