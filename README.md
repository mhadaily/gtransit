# Google Translator in your terminal

This is a simple translator using Async/Await in Node 7 for experimental and a fallback to Promise in Node < 7. 

## Installation

````
npm install --global gtransit
````
## Test

````
npm test
````

## Commands

````
    Usage: gtransit [options] [command]


  Commands:

    translate|t [options] <yourText>  just type yout "phrase" or word
    list|l                            List all available languages
    search|s <language>               Search for shortcode of languages

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Default:

    Source Language is English
     Target Language is Espanish

  Usage:

    $ gtransme t "Hello world" -o en -t fr
    $ gtransme t Hello -t ar
    $ gtransme l
    $ gtransme s czech
    $ gtransit s "Haitian Creole"

  Command: translate|t [options] <yourText>
  Options:

    -h, --help                output usage information
    -s --source [sourceLang]  This is original lang
    -t --target [targetLang]  This is target lang

````

## Bug

Please open your issue (HERE)[https://github.com/mhadaily/gtransit/issues]

## Contribution

Feel free to fork this project and make that better.

## Disclaimer 

Please do not use this package in production or for heavy usage.