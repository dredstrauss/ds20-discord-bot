const { SlashCommandBuilder } = require('../node_modules/discord.js/node_modules/@discordjs/builders');
const tirada = require('../Roll');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('c')
    .setDescription(`Tirada de característica: /c c[característica] b[bonificación] p[penalización]\nEjemplo: */c c13 b2 p1*`),
    async execute(interaction) {
        const input = message.content.slice(prefix.length).trim().split(/ +/g);
        const args = input.shift().toLowerCase();

        let cha = 10;
        let bon = 0;
        let pen = 0;

        args.forEach((rawArg) => {
            const arg = rawArg.charAt(0);
            let num = rawArg.slice(1);
            let value = 0;
            if (num.length > 2) {
                num = 99;
            } else {
                value = parseInt(num);
                if (value < 0) { value *= -1 }
            };
            if (arg == 'c') { cha = value };
            if (arg == 'b') { bon = value };
            if (arg == 'p') { pen = value };
        });

        const diceRolls = {
            d20 : parseInt(roll(20)),
            arrBon : if (bon > 0) {
                let arr = [];
                for (let i = 0; i < bon; i++) { arr.push(roll(4)) };
                return arr
            } else {
                return [0]
            },
            arrPen : if (pen > 0) {
                let arr = [];
                for (let i = 0; i < pen; i++) { arr.push(roll(4)) };
                return arr
            } else {
                return [0]
            },
        };

        const margin = cha - diceRolls.d20 - diceRolls.arrBon.reduce((x,y)=>x+y) + diceRolls.arrPen.reduce((x,y)=>x+y);

        const message = {
            bon : if (bon > 0) {
                return ` - Bon.: **-${bon}**`
            } else {
                return ''
            },
            pen : if (pen > 0) {
                return ` - Pen.: **+${pen}**`
            } else {
                return ''
            },
            result : if (margin < 0) {
                return `\`\`\`diff\nMargen de fallo: **${margin}**\n\`\`\``
            } else {
                return `\`\`\`bash\nMargen de éxito: **${margin}**\n\`\`\``
            }
        }

        await interaction.reply(
            `Car.: **${cha}**${message.bon}${message.pen}\n`
            `${message.result}`
        );
    },
};
