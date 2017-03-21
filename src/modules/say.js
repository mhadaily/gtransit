const say = require('say');
const chalk = require('chalk');

module.exports = (text, voice, speed) => {
  //will say the text that is being sent with default value for all operation system.
  say.speak(text, voice, speed, (error) => {
    if (error) {
      return console.log(chalk.red('Error speaking!', error));
    }
  });
  // Will fire stop function later,
  // setTimeout(() => {
  //   say.stop(err => {
  //     if (err) {
  //       return handleError('unable to stop speech', err);
  //     }
  //   });
  // }, 1000);
};

