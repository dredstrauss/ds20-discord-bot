const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');

const roll = require('../modules/Roll');
const between = require('../modules/Between');
const weaponFailure = require('../modules/WeaponFailure');

const lang = process.env.LANGUAGE;
const text = require('../lang.json');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(text.rollCharacteristic.name[lang])
    .setDescription(text.rollCharacteristic.description[lang])
    .addStringOption(option =>
        option.setName(text.rollCharacteristic.opt1Name[lang])
        .setDescription(text.rollCharacteristic.opt1Description[lang])
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName(text.rollCharacteristic.opt2Name[lang])
        .setDescription(text.rollCharacteristic.opt3Description[lang])
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName(text.rollCharacteristic.opt3Name[lang])
        .setDescription(text.rollCharacteristic.opt3Description[lang])
        .setRequired(true)
    ),
    async execute(interaction) {

        const args = {
            cha : between(interaction.options.getString(text.rollCharacteristic.opt1Name[lang]),0,99),
            bon : between(interaction.options.getString(text.rollCharacteristic.opt2Name[lang],0,99)),
            pen : between(interaction.options.getString(text.rollCharacteristic.opt3Name[lang],0,99))
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
                    return ` / ${text.rollCharacteristic.message1[lang]}: ${args.bon}`
                } else {
                    return ''
                }
            }()),
            pen : (function() {
                if (args.pen > 0) {
                    return ` / ${text.rollCharacteristic.message2[lang]}: ${args.pen}`
                } else {
                    return ''
                }
            }()),
            result : (function() {
                if (diceRolls.crit) {
                    if (diceRolls.crit == 'crit1') {
                        return `**${text.rollCharacteristic.message3[lang]}: __${margin}__**`
                    } else {
                        return `**${text.rollCharacteristic.message4[lang]}: __${margin}__**`
                    }
                }
                if (margin < 0) {
                    return `**${text.rollCharacteristic.message5[lang]}: __${margin}__**`
                } else {
                    return `**${text.rollCharacteristic.message6[lang]}: __${margin}__**`
                }
            }()),
            bonpen : (function() {
                if (args.bon > 0 || args.pen > 0) {
                    let textBon = '';
                    let textPen = '';
                    if (args.bon > 0) {
                        textBon = ` ${text.rollCharacteristic.message7[lang]}: **${diceRolls.arrBon}**`
                    }
                    if (args.pen > 0) {
                        textPen = ` ${text.rollCharacteristic.message8[lang]}: **${diceRolls.arrPen}**`
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
                    return `*(${text.rollCharacteristic.message9[lang]}: ${result})*\n`
                } else {
                    return ''
                }
            }()),
            weaponFailure : (function() {
                if (diceRolls.crit == 'crit20') {
                    return `*${weaponFailure()}*`;
                } else {
                    return ''
                }
            }())
        }

        await interaction.reply(
            `${text.rollCharacteristic.message10[lang]}: ${args.cha} ${message.bon}${message.pen}\n`+
            `>>> *d20: **${diceRolls.d20}**`+
            `${message.bonpen}*\n`+
            `${message.result}\n`+
            `${message.fireDamage}`+
            `${message.weaponFailure}`
        );
    },
};
