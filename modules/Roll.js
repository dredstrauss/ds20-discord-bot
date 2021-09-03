const roll = (arg) => {
    const faces = parseInt(arg);
    if (faces < 1) { faces = 1 };
    if (faces > 999) { faces = 999 };
    let result = Math.floor( (Math.random() * faces ) +1 );
    return result
}

module.exports = roll;
