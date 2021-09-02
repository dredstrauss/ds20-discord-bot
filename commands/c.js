const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');
const roll = require('../Roll');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('c')
    .setDescription(`Tirada de característica (incluye daño de arma de fuego)`)
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
            arrPen : [0],
            crit: false
        };

        diceRolls.d20 = parseInt(roll(20));
        if (args.bon > 0) {
            diceRolls.arrBon = [];
            for (let i = 0; i < args.bon; i++) { diceRolls.arrBon.push(roll(4)) };
        };
        if (args.pen > 0) {
            diceRolls.arrPen = [];
            for (let i = 0; i < args.pen; i++) { diceRolls.arrPen.push(roll(4)) };
        };
        if (diceRolls.d20 == 1) { diceRolls.crit = 'crit1' };
        if (diceRolls.d20 == 20) { diceRolls.crit = 'crit20' };

        let margin = args.cha - diceRolls.d20 + diceRolls.arrBon.reduce((x,y)=>x+y) - diceRolls.arrPen.reduce((x,y)=>x+y);

        if (diceRolls.crit == 'crit1') {
            if (margin < 0 && margin >= -10) { margin = 0 };
            margin *= 2;
        }
        if (diceRolls.crit == 'crit20') {
            if (margin >= 0) { margin = -1; return }
            margin *= 2;
        }

        const message = {
            bon : (function() {
                if (args.bon > 0) {
<<<<<<< HEAD
                    return ` / Bon.: **-${args.bon}**`
=======
                    return ` / Bonificaciones: ${args.bon}`
>>>>>>> prod
                } else {
                    return ''
                }
            }()),
            pen : (function() {
                if (args.pen > 0) {
<<<<<<< HEAD
                    return ` / Pen.: **+${args.pen}**`
=======
                    return ` / Penalizaciones: ${args.pen}`
>>>>>>> prod
                } else {
                    return ''
                }
            }()),
            result : (function() {
                if (diceRolls.crit) {
                    if (diceRolls.crit == 'crit1') {
                        return `**Margen de éxito espectacular: __${margin}__**`
                    } else {
                        return `**Margen de fallo desastroso: __${margin}__**`
                    }
                }
                if (margin < 0) {
<<<<<<< HEAD
                    return `\`\`\`diff\nMargen de fallo: ${margin}\n\`\`\``
                } else {
                    return `\`\`\`bash\nMargen de éxito: ${margin}\n\`\`\``
=======
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
                        textBon = ` Bon.: **${diceRolls.arrBon}** `
                    }
                    if (args.pen > 0) {
                        textPen = ` Pen.: **${diceRolls.arrPen}**`
                    }
                    return (textBon + textPen)
                } else {
                    return ''
                }
            }()),
            fireDamage : (function() {
                if (margin > -1) {
                    let result = margin + diceRolls.arrPen.reduce((x,y)=>x+y);
                    if (diceRolls.crit == 'crit1') { result += diceRolls.arrPen.reduce((x,y)=>x+y) };
                    return `*(Daño de arma de fuego: ${result})*`
                } else {
                    return ''
>>>>>>> prod
                }
            }())
        }

        await interaction.reply(
            `Característica: ${args.cha} ${message.bon}${message.pen}\n`+
            `>>> *d20: **${diceRolls.d20}**`+
            `${message.bonpen}*\n`+
            `${message.result}\n`+
            `${message.fireDamage}`
        );
    },
};
