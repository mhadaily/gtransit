const {describe, it} = require('mocha');
const {expect} = require('chai');
const langList = require('../src/modules/langList');
const searchLang = require('../src/modules/searchLang');
const translatorAsync = require('../src/modules/translation-asyncawait');
const {q, tl, sl} = require('./constant');

module.exports = () => {
  describe('Translate Async/Await Functions', () => {
    it('should return Amour when adding Love in English with Async based function', (done) => {
      translatorAsync(sl, tl, q)
        .then(res => {
          expect(res.body.sentences[0].orig).to.equal(q);
          expect(res.body.sentences[0].trans).to.equal('Amour');
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error if query is empty', (done) => {
      translatorAsync(sl, tl, '')
        .then(res => {
          expect(res.body.sentences[0].orig).to.equal('');
          expect(res.body.sentences[0].trans).to.not.equal('Amour');
          done();
        })
        .catch(err => done(err));
    });

    it('should return an error if all args are empty', (done) => {
      translatorAsync('', '', '')
        .then(res => {
          expect(res.ok).to.be.equal(true);
          expect(res.body.sentences[0].trans).to.be.equal('');
          done();
        })
        .catch(err => done(err));
    });
  });

};