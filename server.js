#!/usr/bin/env node

const express = require('express');
const mysql   = require('mysql');
const cors    = require('cors');
const app     = express();

app.use(cors());
app.use(express.json()); // support json encoded bodies

const conn    = mysql.createConnection({
  host:         'localhost',
  user:         'root',
  password:     'root',
  database:     'test',
  insecureAuth: true,
});

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
