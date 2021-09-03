const between = (num,min,max) => {
    if (num < min) {num = min};
    if (num > max) {num = max};
    return num
};

module.exports = between;
