const chalk = require('chalk');

module.exports = (err) => {
  console.log(
    chalk.red('Got an error: ' + err.message + ' please Open an issue on Github.')
  );
};