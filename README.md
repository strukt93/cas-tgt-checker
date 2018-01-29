# cas-tgt-checker
A Node module that checks the validity of CAS Ticket Granting Tickets (TGT).
This module is currently only able to check the validity of a provided CAS TGT.

# Installation
`$ npm install cas-tgt-checker`

# Sample Usage
```
var casTgtChecker = require('cas-tgt-checker');
casTgtChecker.validateTGT("https://example.com/cas", "TGT-448-E2SwL0NPIq0seFlvcAsR6IMW9491CPnW29s6COdwMeY0RcFyHkL-cas",
function(valid, message){
	console.log(valid);
	console.log(message);
});
```


If the above code was placed in a file called `index.js` and was run via `$ node index.js`, `true` will be printed in the console if the supplied ticket value was valid along with the ticket value originally supplied to the function, given that the URL argument (CAS base endpoint) was correctly provided. `false`, along with a corresponding error `message`, will be printed otherwise.
