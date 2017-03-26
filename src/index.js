#!/usr/bin/env node --harmony

const path = require('path');
const program = require('commander');
const chalk = require('chalk');
const fs = require("fs");

const handleError = require('./modules/handleError');
const langList = require('./modules/langList');
const searchLang = require('./modules/searchLang');
const sayIt = require('./modules/say');

const version = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))).version;

const nodeVersion = Number(process.version.match(/^v(\d)/)[1]);

let translate;

if (nodeVersion < 7) {
  translate = require('./modules/translation-promise');
} else {
  translate = require('./modules/translation-asyncawait');
}

program
  .version(version);

program
  .command('translate <yourText>').alias('t')
  .option('-s --source [sourceLang]', 'This is original lang')
  .option('-t --target [targetLang]', 'This is target lang')
  .option('--say', 'This will say your translation.')
  .description('just type your phrase or word')
  .action((yourText, options) => {

    const sl = options.source || 'en';
    const tl = options.target || 'es';

    translate(sl, tl, yourText)
      .then(result => {
        const translation = result.body.sentences[0];
        const trans = chalk.yellow(translation.trans);
        const orig = chalk.cyan(translation.orig);

        console.log(chalk.gray('*********************'));
        console.log(`Orig: ${orig}`);
        console.log(`Trans: ${trans}`);
        console.log(chalk.gray('*********************'));

        if (options.say) {
          const text = translation.trans;
          const voice = null;
          const speed = 1;
          const supportedLang = ['en', 'fr', 'it', 'es', 'nl', 'pl', 'pt', 'sv', 'nb', 'fi', 'de', 'da'];

          console.log(chalk.gray('Start Saying...'));

          if (supportedLang.includes(tl)) {
            //check if they passed target lang
            if (!options.target) {
              return console.log(chalk.red('Sorry, you have not passed your target language'));
            }
            //say translation if supported
            sayIt(text, voice, speed);
            console.log(chalk.yellow(text));
          } else {
            // if target language is not in the supported languages list
            return console.error(chalk.red(`Sorry, ${tl} is not supported yet.`));
          }

          console.log(chalk.gray('Saying Done.'));

        }

      })
      .catch(err => {
        handleError(err);
        process.exit(0);
      });
  });


program
  .command('list').alias('l')
  .description('List all available languages')
  .action(() => {
    return langList.map(language => {
      const short = chalk.bold.yellow(language.short);
      const lang = chalk.bold.cyan(language.lang);
      console.log(`Shortcode: ${short}  ,  Language:  ${lang}`);
    })
  });

program
  .command('search <language>').alias('s')
  .description('Search for shortcode of a language')
  .action((language) => {
    const search = searchLang(language);
    if (search.length > 0) {
      return search.map(res => console.log(chalk.red(`Shortcode for ${res.lang} is ${res.short}`)));
    }
    console.log(chalk.red('Either Language is not supported or it is misspelled.'));
  });

program
  .on('--help', function () {
    console.log(chalk.red('  Default:'));
    console.log('');
    console.log(`    Source Language is English`);
    console.log(`    Target Language is Espanish`);
    console.log('');
    console.log(chalk.cyan('  Usage:'));
    console.log('');
    console.log(`    $ gtransit t "Hello world" -s en -t fr`);
    console.log(`    $ gtransit t Hello -t ar`);
    console.log(`    $ gtransit l`);
    console.log(`    $ gtransit s czech`);
    console.log(`    $ gtransit s "Haitian Creole"`);
    console.log('');
    console.log(chalk.cyan('  Text To Speech:'));
    console.log('');
    console.log(`    $ gtransit t "Hello world" -s en -t fr --say`);
    console.log(`    $ gtransit t Hello -t fr --say`);
    console.log('');
  });

program
  .parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}