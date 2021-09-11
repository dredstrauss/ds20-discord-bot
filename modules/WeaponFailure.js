const roll = require('./Roll');

const lang = process.env.LANGUAGE;
const text = require('../lang.json');

const weaponFailure = () => {
    let die = roll(20);
    if (die == 1) {return text.rollCharacteristic.weaponFailure.message1[lang]}
    else if (die <= 5) {return text.rollCharacteristic.weaponFailure.message2[lang]}
    else if (die <= 10) {return text.rollCharacteristic.weaponFailure.message3[lang]}
    else {return text.rollCharacteristic.weaponFailure.message4[lang]}
};

module.exports = weaponFailure;
