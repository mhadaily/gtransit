'use strict';

const expect = require('chai').expect;

const langList = require('../src/modules/langList');
const searchLang = require('../src/modules/searchLang');

const translatorPromise = require('../src/modules/translation-promise');
const translatorAsync = require('../src/modules/translation-asyncawait');

const { q, tl, sl } = { q: 'Love', tl: 'fr', sl: 'en' };

describe('Translate Functions', () => {
    it('should return Amour when adding Love in English with Promise based function', (done) => {
        translatorPromise(sl, tl, q)
            .then(res => {
                expect(res.body.sentences[0].orig).to.equal(q);
                expect(res.body.sentences[0].trans).to.equal('Amour');
                done();
            })
            .catch(err => done(err));
    });

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

    it('should return cs when searching for Czech or czech', () => {
        expect(searchLang('Czech')).to.deep.equal([{ short: 'cs', lang: 'Czech' }]);
        expect(searchLang('czech')).to.deep.equal([{ short: 'cs', lang: 'Czech' }]);
    });

    it('should return empty [] if langage not exists', () => {
        expect(searchLang('sample')).to.deep.equal([]);
        expect(searchLang('sample')).to.deep.equal([]);
    });

});