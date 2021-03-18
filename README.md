## REVDEBUG Cypress Integrtion tutorial

The following application is a simple web based sql console with few Cypress end-to-end tests.
The third one test fails because the latest changes in the application. Follow the instructions below to add RevDeBug module, insert the Cypress integration snipped and run the tests. 
Resulting trace ID from a failed test can be used to find the exact trace and code execution recording on the RevDeBug server interface.

Configure RevDeBug repository:

    npm config set @revdebug:registry https://nexus.revdebug.com/repository/npm/

Install dependancies: 

    npm install

Add RevDeBug:

    npm install @revdebug/revdebug

\* Note: Before instrumenting you may need to change the "host" (and maybe "port" / "webPort") fields in "revdebug.json" or specify different values on the command line if you are not running the record server locally.

Normal instrument:

    npx revd

Or instrument passing different host:

    npx revd --host your_record_server.com

Add Cypress integration snippet to cypress/support/index.js file:

```javascript
  Cypress.on('fail', (error) => {
      // reference application under test iframe
      var innerWin = window.parent.document.getElementsByClassName("aut-iframe")[0];
      if (innerWin && innerWin.contentWindow.revdebug) { 
          error.message = '(RevDeBug trace: '+ innerWin.contentWindow.revdebug.lastBadTraceId +' )\n\n'
              + error.message;
      }
      // rethrow modified error
      throw error;
  });
```

Run the mysql server:

    docker-compose up -d

Run the express server:

    ./server.js &

And off we go...

    npm run dev

Now you can run Cypress test runner and execute tests in their order:

   npx cypress open

The third test should fail and return a trace id that can be corellated in the RevDeBug Server interface.
