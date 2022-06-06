const wpPot = require('wp-pot');
 
wpPot({
  destFile: './languages/simple-todo.pot',
  domain: 'wpwax-customer-support-app',
  package: 'Simple Todo',
  src: './**/*.php'
});