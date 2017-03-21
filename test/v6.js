const {describe, it} = require('mocha');
const {expect} = require('chai');
const langList = require('../src/modules/langList');
const searchLang = require('../src/modules/searchLang');
const translatorPromise = require('../src/modules/translation-promise');
const {q, tl, sl} = require('./constant');

module.exports = () => {
  describe('Translate Promise Based Function', () => {
    it('should return Amour when adding Love in English with Promise based function', (done) => {
      translatorPromise(sl, tl, q)
        .then(res => {
          expect(res.body.sentences[0].orig).to.equal(q);
          expect(res.body.sentences[0].trans).to.equal('Amour');
          done();
        })
        .catch(err => done(err));
    });
  });
};
