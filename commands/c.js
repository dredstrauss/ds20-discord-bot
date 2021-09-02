const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');
const roll = require('../Roll');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('c')
    .setDescription(`Tirada de característica: /c [característica] [bonificación] [penalización]`)
    .addStringOption(option =>
        option.setName('caracteristica')
        .setDescription('Puntaje de la característica a usar')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('bonificacion')
        .setDescription('Bonificaciones (0 o más)')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('penalizacion')
        .setDescription('Penalizaciones (0 o más)')
        .setRequired(true)
    ),
    async execute(interaction) {
        const between099 = (val) => {
            let num = parseInt(val);
            if (num > 99) { num = 99 }
            if (num < 0) { num *= -1 }
            return num
        }

        const args = {
            cha : between099(interaction.options.getString('caracteristica')),
            bon : between099(interaction.options.getString('bonificacion')),
            pen : between099(interaction.options.getString('penalizacion'))
        }

        let diceRolls = {
            d20 : 0,
            arrBon : [0],
            arrPen : [0]
        };

        diceRolls.d20 = parseInt(roll(20));
        if (args.bon > 0) {
            diceRolls.arrBon = [];
            for (let i = 0; i < args.bon; i++) { diceRolls.arrBon.push(roll(4)) };
        }
        if (args.pen > 0) {
            diceRolls.arrPen = [];
            for (let i = 0; i < args.pen; i++) { diceRolls.arrPen.push(roll(4)) };
        }

        const margin = args.cha - diceRolls.d20 + diceRolls.arrBon.reduce((x,y)=>x+y) - diceRolls.arrPen.reduce((x,y)=>x+y);

        const message = {
            bon : (function() {
                if (args.bon > 0) {
                    return ` / Bonificaciones: ${args.bon}`
                } else {
                    return ''
                }
            }()),
            pen : (function() {
                if (args.pen > 0) {
                    return ` / Penalizaciones: ${args.pen}`
                } else {
                    return ''
                }
            }()),
            result : (function() {
                if (margin < 0) {
                    return `**Margen de fallo: __${margin}__**`
                } else {
                    return `**Margen de éxito: __${margin}__**`
                }
            }()),
            bonpen : (function() {
                if (args.bon > 0 || args.pen > 0) {
                    let textBon = '';
                    let textPen = '';
                    if (args.bon > 0) {
                        textBon = `Bon.: **${diceRolls.arrBon}** `
                    }
                    if (args.pen > 0) {
                        textPen = `Pen.: **${diceRolls.arrPen}**`
                    }
                    return (textBon + textPen)
                } else {
                    return ''
                }
            }())
        }

        await interaction.reply(
            `*Característica: ${args.cha} ${message.bon}${message.pen}*\n`+
            `>>> *d20: **${diceRolls.d20}** `+
            `${message.bonpen}*\n`+
            `${message.result}`
        );
    },
};
