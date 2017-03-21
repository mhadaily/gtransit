const request = require('superagent');
const chalk = require('chalk');

const url = require('./url');

module.exports = (sl, tl, q) => {
  return request
    .post(url)
    .type('form')
    .accept('json')
    .set('User-Agent', 'AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1')
    .query({sl})
    .query({tl})
    .query({q});
};