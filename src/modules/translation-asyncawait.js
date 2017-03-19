const request = require('superagent')
const chalk = require('chalk')

const handleError = require('./handleError');
const url = require('./url');

module.exports = async function(sl, tl, q) {

    let result = {};
    try {
        result = await request
            .post(url)
            .type('form')
            .accept('json')
            .set('User-Agent', 'AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1')
            .query({ sl })
            .query({ tl })
            .query({ q });
    } catch (err) {
        handleError(err);
        process.exit(0);
    }
    return result;
};