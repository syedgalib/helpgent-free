const wpPot = require('wp-pot');

wpPot({
  destFile: './languages/helpgent.pot',
  domain: 'helpgent',
  package: 'HelpGent',
  src: './**/*.php'
});