const express = require('express');
const fs = require('fs');
const ejs = require('ejs');
const mysql = require("mysql2/promise");
const secret = require(" /config/secret");
const bodyParser = require('body-parser');

const pool = mysql.createPool({
  host: secret.host,
  user: secret.user,
  port: secret.port,
  password: secret.password,
  database: secret.database,
});

module.exports = {
  pool: pool,
};

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}))

const path = require("path");

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/insert', (req, res) => {
  fs.readFile('insert.html', 'utf8', function (err, data) {
    res.send(data)
  })
})

app.post('/insert', (req, res) => {
  const body = req.body
  client.query('insert into res (name, address, phone, info)  => values (?, ?, ?, ?);', [
    body.name,
    body.address,
    body.phone,
    body.info,
  ], function() {
    res.redirect('/')
  })
})

app.listen(8080, () => {
    console.log('server 8080');
});
