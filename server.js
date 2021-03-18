#!/usr/bin/env node

// const {default: Agent, ContextManager} = require('@revdebug/skywalking');

// Agent.start({  // not necessary with REVDEBUG_APM=1
//   serviceName: 'client',
//   // serviceInstance: '',
//   // collectorAddress: '',
//   // authorization: '',
//   // maxBufferSize: 1000,
// });

const express    = require('express');
const mysql      = require('mysql');
const cors       = require('cors');
const bodyParser = require('body-parser');

const app        = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

const conn  = mysql.createConnection({
  host:         'localhost',
  user:         'root',
  password:     'root',
  database:     'test',
  insecureAuth: true,
});

// app.get('/', function (req, res, next) {
//   conn.query(req.query.q, function (error, results, fields) {
//     if (error)
//       next(error);

//     else {
//       res.set('content-type', 'text/plain');
//       res.end(JSON.stringify(results));
//     }
//   });
// });

app.post('/', function (req, res, next) {
  conn.query(req.body.query, function (error, results, fields) {
    if (error)
      next(error);

    else {
      res.set('content-type', 'text/plain');
      res.end(JSON.stringify(results));
    }
  });
});

app.listen(5000);
