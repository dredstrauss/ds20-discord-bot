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

        const diceRolls = {
            d20 : parseInt(roll(20)),
            arrBon : (function() {
                if (args.bon > 0) {
                    let arr = [];
                    for (let i = 0; i < args.bon; i++) { arr.push(roll(4)) };
                    return arr
                } else {
                    return [0]
                }
            }()),
            arrPen : (function() {
                if (args.pen > 0) {
                    let arr = [];
                    for (let i = 0; i < args.pen; i++) { arr.push(roll(4)) };
                    return arr
                } else {
                    return [0]
                }
            }())
        };

        const margin = args.cha - diceRolls.d20 - diceRolls.arrBon.reduce((x,y)=>x+y) + diceRolls.arrPen.reduce((x,y)=>x+y);

        const message = {
            bon : (function() {
                if (args.bon > 0) {
                    return ` / Bon.: **-${args.bon}**`
                } else {
                    return ''
                }
            }()),
            pen : (function() {
                if (args.pen > 0) {
                    return ` / Pen.: **+${args.pen}**`
                } else {
                    return ''
                }
            }()),
            result : (function() {
                if (margin < 0) {
                    return `\`\`\`diff\nMargen de fallo: ${margin}\n\`\`\``
                } else {
                    return `\`\`\`bash\nMargen de éxito: ${margin}\n\`\`\``
                }
            }())
        }

        await interaction.reply(
            `Car.: **${args.cha}**${message.bon}${message.pen}\n`+
            `${message.result}`
        );
    },
};
