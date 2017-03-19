#!/usr/bin/env node --harmony

const path = require('path');
const program = require('commander');
const chalk = require('chalk');

const handleError = require('./modules/handleError');
const langList = require('./modules/langList');
const searchLang = require('./modules/searchLang');

const packagePath = path.join(__dirname, '/../');
const packageVersion = require(packagePath + 'package').version;

const nodeVersion = Number(process.version.match(/^v(\d)/)[1]);

var translate;

if (nodeVersion < 7) {
    translate = require('./modules/translation-promise');
} else {
    translate = require('./modules/translation-asyncawait');
}

program
    .version(packageVersion);

program
    .command('translate <yourText>').alias('t')
    .option('-s --source [sourceLang]', 'This is original lang')
    .option('-t --target [targetLang]', 'This is target lang')
    .description('just type yout phrase or word')
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
    .description('Search for shortcode of languages')
    .action((language) => {
        const search = searchLang(language);
        if (search.length > 0) {
            return search.map(res => console.log(chalk.red(`Shortcode for ${res.lang} is ${res.short}`)));
        }
        console.log(chalk.red('Either Language is not support or it is misespelled.'));
    });

program
    .on('--help', function() {
        console.log(chalk.red('  Default:'));
        console.log('');
        console.log(`    Source Language is English`);
        console.log(`     Target Language is Espanish`);
        console.log('');
        console.log(chalk.cyan('  Usage:'));
        console.log('');
        console.log(`    $ gtransme t "Hello world" -o en -t fr`);
        console.log(`    $ gtransme t Hello -t ar`);
        console.log(`    $ gtransme l`);
        console.log(`    $ gtransme s czech`);
        console.log(`    $ gtransit s "Haitian Creole"`);
        console.log('');
    });

program
    .parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}