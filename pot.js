const wpPot = require('wp-pot');
 
wpPot({
  destFile: './languages/wpwax-customer-support-app.pot',
  domain: 'wpwax-customer-support-app',
  package: 'Simple Todo',
  src: './**/*.php'
});