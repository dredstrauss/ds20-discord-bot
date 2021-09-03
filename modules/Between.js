const between = (num,min,max) => {
    num = parseInt(num);
    min = parseInt(min);
    max = parseInt(max);
    if (num < min) {num = min};
    if (num > max) {num = max};
    return num
};

module.exports = between;
