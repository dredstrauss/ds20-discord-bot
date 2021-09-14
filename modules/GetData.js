const axios = require('axios');

const lang = process.env.LANGUAGE;

const apiUrl = 'http://ds20api.dreadmythos.com/';

const getTable = async(query) => {
    let params = JSON.parse(JSON.stringify(query)); delete params.table;
    let paramsKeys = [];
    paramsKeys = Object.keys(params);
    if (typeof(paramsKeys) == 'string') {paramsKeys = [paramsKeys]};
    let urlQuery = `?lang=${lang}`;
    paramsKeys.forEach((key) => { urlQuery += `&${key}=${params[key]}` } );
    const { data } = await axios.get(`${apiUrl}${query.table}${urlQuery}`);
    return data
};

module.exports = { getTable }
