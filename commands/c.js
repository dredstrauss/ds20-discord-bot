const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');
const tirada = require('../Roll');

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
            cha : between099(interaction.options.getInt('caracteristica')),
            bon : between099(interaction.options.getInt('bonificacion')),
            pen : between099(interaction.options.getInt('penalizacion'))
        }

        const diceRolls = {
            d20 : parseInt(roll(20)),
            arrBon : (function() {
<<<<<<< HEAD
                if (bon > 0) {
                    let arr = [];
                    for (let i = 0; i < bon; i++) { arr.push(roll(4)) };
=======
                if (args.bon > 0) {
                    let arr = [];
                    for (let i = 0; i < args.bon; i++) { arr.push(roll(4)) };
>>>>>>> basicroll
                    return arr
                } else {
                    return [0]
                }
            }()),
            arrPen : (function() {
<<<<<<< HEAD
                if (pen > 0) {
                    let arr = [];
                    for (let i = 0; i < pen; i++) { arr.push(roll(4)) };
=======
                if (args.pen > 0) {
                    let arr = [];
                    for (let i = 0; i < args.pen; i++) { arr.push(roll(4)) };
>>>>>>> basicroll
                    return arr
                } else {
                    return [0]
                }
            }())
        };

        const margin = args.cha - diceRolls.d20 - diceRolls.arrBon.reduce((x,y)=>x+y) + diceRolls.arrPen.reduce((x,y)=>x+y);

        const message = {
            bon : (function() {
<<<<<<< HEAD
                if (bon > 0) {
=======
                if (args.bon > 0) {
>>>>>>> basicroll
                    return ` - Bon.: **-${bon}**`
                } else {
                    return ''
                }
            }()),
            pen : (function() {
<<<<<<< HEAD
                if (pen > 0) {
=======
                if (args.pen > 0) {
>>>>>>> basicroll
                    return ` - Pen.: **+${pen}**`
                } else {
                    return ''
                }
            }()),
            result : (function() {
                if (margin < 0) {
                    return `\`\`\`diff\nMargen de fallo: **${margin}**\n\`\`\``
                } else {
                    return `\`\`\`bash\nMargen de éxito: **${margin}**\n\`\`\``
                }
            }())
        }

        await interaction.reply(
            `Car.: **${args.cha}**${message.bon}${message.pen}\n`
            `${message.result}`
        );
    },
};
