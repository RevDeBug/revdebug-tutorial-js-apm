# REVDEBUG Cypress Integration tutorial

The following application is a simple web based sql console with few Cypress end-to-end tests.
The third test will fail caused by some latest changes to the application. Follow the instructions below to add RevDeBug module, insert the Cypress integration snipped and run the tests. 
Resulting trace ID included in the failed test results can be used to find the exact trace and code execution recording using the RevDeBug server web interface.

A prerequisite for this follow along tutorial is a working RevDeBug Server instance running, please refer to user manual at: https://revdebug.gitbook.io/revdebug/installing-revdebug-server#setting-up-revdebug-server-instance

## Configure RevDeBug repository:

    npm config set @revdebug:registry https://nexus.revdebug.com/repository/npm/

## Install dependancies: 

    npm install

## Add RevDeBug (as it is a frontend vue and nodejs backend application mingled together we'll add it as development dependency):

    npm install @revdebug/revdebug --save-dev

## Next create revdebug.json configuration file to configure both of the server and frontend parts of the project:

```javascript
{
      "apm":     true,
      "logging": "info",

      ".server": {
          // name of the application
          "application": "Vue Query Example Server",
          "target":      "node",
          "files":       "server.js"
      },

      ".client": {
          // name of the application
          "application": "Vue Query Example Client",
          "vueErrors":   true,
          "target":      "web",
          "type":        "module",
          "sourceMap":   true,
          // magical webpack function must not be instrumented
          "excludeInst": ["require", "require.**"],
          "path":        "src",
          "files":       "**/*.{js,vue}",
          // RevDeBug will inject itself into this application startup html file
          // that's why it can work as a dev dependency - a necessary step
          // for Vue/React/etc web applications that make translation of dependencies
          // to web-friendly versions.
          "index":       "index.html"
      }
  }
```

## Instrument application:

    npx revd --host your_record_server.com

## Add Cypress integration snippet to cypress/support/index.js file:

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

## Run the mysql server:

    docker-compose up -d

## Run the express server and frontend application:

    ./server.js &

    npm run dev

## Now you can run Cypress test runner and execute tests in their order:

    npx cypress open

The third test should fail and return a trace id that can be corellated in the RevDeBug Server interface.
