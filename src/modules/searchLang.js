const langList = require('./langList');

module.exports = (language) => {
    return langList.filter(obj => obj.lang === language || obj.lang.toLowerCase() === language);
};