const roll = require('./Roll');

const weaponFailure = () => {
    let die = roll(20);
    if (die == 1) {return 'Falla mecánica (arma de fuego dañada)'}
    else if (die <= 5) {return 'Traba mayor (arma de fuego atascada)'}
    else if (die <= 10) {return 'Traba menor (bala defectuosa)'}
    else {return 'Bala perdida (disparo llega a otro objetivo)'}
};

module.exports = weaponFailure;
