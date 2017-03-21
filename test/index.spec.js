const {describe, it} = require('mocha');
const {expect} = require('chai');
const langList = require('../src/modules/langList');
const searchLang = require('../src/modules/searchLang');

const nodeVersion = Number(process.version.match(/^v(\d)/)[1]);

if (nodeVersion < 7) {
  require('./v6.js')();
} else {
  require('./v7.js')();
}

describe('Search Function', () => {

  it('should return cs when searching for Czech or czech', () => {
    expect(searchLang('Czech')).to.deep.equal([{ short: 'cs', lang: 'Czech' }]);
    expect(searchLang('czech')).to.deep.equal([{ short: 'cs', lang: 'Czech' }]);
  });

  it('should return empty [] if language not exists', () => {
    expect(searchLang('sample')).to.deep.equal([]);
    expect(searchLang('sample')).to.deep.equal([]);
  });

});