const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');

const lang = process.env.LANGUAGE;
const text = require('../lang.json');

const { getTable } = require('../modules/GetData');

const writeList = (arr) => {
    let message = '';
    arr.every((weapon) => {
        message += `**${weapon.name}**: ${weapon.mlw}/${weapon.msw} (id: ${weapon.id})\n`
        if (message.length > 1750) {
            message += `\n*${text.compendium.message3[lang]}*`
            return false;
        } else {
            return true;
        }
    });
    return message
};

const writeDetail = (weapon) => {
    const wh = text.compendium.weaponHeaders;
    let df = weapon.d > weapon.f ? `${wh.d[lang]}: ${weapon.d}` : `${wh.f[lang]}: ${weapon.f}`;
    let cal = weapon.cal != '' && weapon.cal != null ? `\n${wh.cal[lang]}: ${weapon.cal}` : '';
    let cap = weapon.cap > 0 ? `\n${wh.cap[lang]}: ${weapon.cap}` : '';
    let rea = weapon.rea > 0 ? `\n${wh.rea[lang]}: ${weapon.rea} m` : '';
    let special = weapon.special != null ? `\n${wh.special[lang]}: ${weapon.special}` : '';
    let access = `\n*${wh.access[lang]}: ${weapon.access}*`;

    let message = `**${weapon.name}** *(${weapon.category}*)${access}\n${wh.mlw[lang]}:${weapon.mlw} / ${wh.msw[lang]}:${weapon.msw}\n${df}${cal}${cap}${rea}${special}`;

    return message
};

module.exports = {
    data: new SlashCommandBuilder()
    .setName(text.compendium.name[lang])
    .setDescription(text.compendium.description[lang])
    .addStringOption(option =>
        option.setName(text.compendium.opt1Name[lang])
        .setDescription(text.compendium.opt1Description[lang])
        .setRequired(true)
        .addChoice(text.compendium.natural1[lang],text.compendium.natural2[lang])
        .addChoice(text.compendium.mele1[lang],text.compendium.mele2[lang])
        .addChoice(text.compendium.fire1[lang],text.compendium.fire2[lang])
        .addChoice(text.compendium.explosives1[lang],text.compendium.explosives2[lang])
    )
    .addStringOption(option =>
        option.setName(text.compendium.opt2Name[lang])
        .setDescription(text.compendium.opt2Description[lang])
        .setRequired(false)
    ),
    async execute(interaction) {
        let type = interaction.options.getString(text.compendium.opt1Name[lang]);
        let tableQuery = { table: 'weapons', type };

        if (interaction.options.getString(text.compendium.opt2Name[lang]) != null) {
            try {
                tableQuery.id = interaction.options.getString(text.compendium.opt2Name[lang]);
                const data = await getTable(tableQuery);
                const message = writeDetail(data[0]);
                await interaction.reply(message);
            } catch (e) {
                await interaction.reply(`${text.compendium.message1[lang]}`);
            }
        } else {
            try {
                const data = await getTable(tableQuery);
                const message = writeList(data);
                await interaction.reply(message);
            } catch (e) {
                await interaction.reply(`${text.compendium.message1[lang]}`);
            }
        }

    },
};
