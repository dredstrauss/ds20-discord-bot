const between = require('./Between');

const roll = (arg) => {
    const faces = between(parseInt(arg),1,99);
    let result = Math.floor( (Math.random() * faces ) +1 );
    return result
}

module.exports = roll;
