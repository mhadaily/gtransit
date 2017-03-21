# Google Translator in your terminal

This is a simple Node CLI translator via Google translate that uses Async/Await in Node 7 and a fallback to Promise in Node < 7. It is able to say 
your translation based on your operating system text-to-speech default. 

## Installation

````
npm install --global gtransit
````
## Test

````
npm test
````

## Fun Test

````
npm run fun
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

    $ gtransit t "Hello world" -o en -t fr
    $ gtransit t Hello -t ar
    $ gtransit l
    $ gtransit s czech
    $ gtransit s "Haitian Creole"

  Command: translate|t [options] <yourText>
  Options:

    -h, --help                output usage information
    -s --source [sourceLang]  This is original lang
    -t --target [targetLang]  This is target lang
    --say  This will say your translation. 

````
![gTransIt](https://www.majidhajian.com/images/gtransit.gif "gTransIt")

## OS X Notes

### Feminine Voices

Agnes, Kathy, Princess, Vicki, Victoria

### Masculine Voices

Albert, Alex, Bruce, Fred, Junior, Ralph

### Miscellaneous Voices

Bad News, Bahh, Bells, Boing, Bubbles, Cellos, Deranged, Good News, Hysterical, Pipe Organ, Trinoids, Whisper, Zarvox


## Windows Notes

Voice parameter is not yet available. Uses whatever default system voice is set, ignoring voice parameter.
Speed parameter is not yet available.

The `export` method is not available.


## Linux Notes

Linux support involves the use of [Festival](http://www.cstr.ed.ac.uk/projects/festival/), which uses decidedly less friendly names for its voices.  Voices for
Festival sometimes need to be installed separately - you can check which voices are available by starting up Festival in interactive mode, typing `(voice_`,
and pressing `TAB`.  Then take the name of the voice you'd like to try, minus the parentheses, and pass it in to say.js.

The `export` method is not yet available.

Try the following commad to install Festival as well as a default voice:

```shell
sudo apt-get install festival festvox-kallpc16k
```


## Requirements

* Mac OS X (comes with `say`)
* Linux with Festival installed
* Windows (comes with SAPI.SpVoice)

## Bug

Please open your issue [HERE](https://github.com/mhadaily/gtransit/issues)

## Contribution

Feel free to fork this project and make that better.

## Disclaimer 

Please do not use this package in production or for heavy usage.
