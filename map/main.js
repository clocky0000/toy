const express = require('express');
const fs = require('fs')
const ejs = require('ejs')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const client = mysql.createConnection({
    user: 'root',
    password: 'lyjin0928!', 
    database: 'test1' 
  })
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
  }))

app.listen(8080, () => {
    console.log('server 8080');
});

app.set('views','./map/views');
app.set('view engine','ejs');

app.get('/', function (req, res) {
    fs.readFile('list.ejs', 'utf8', function (err, data) {
      client.query('select * from res', function (err, results) {
        if (err) {
          res.send(err)
        } else {
          res.send(ejs.render(data, {
            data: results
          }))
        }
      })
    })
  })

  app.get('/main',(req,res)=>{
    res.render("main/mappage");
  });

  app.get('/delete/:id', function (req, res) {
    client.query('delete from res where id=?', [req.params.id], function () {
        res.redirect('/')
      })
  })
  
  app.get('/insert', function (req, res) {
    fs.readFile('insert.html', 'utf8', function (err, data) {
        res.send(data)
      })
  })
  
  app.post('/insert', function (req, res) {
    const body = req.body
    client.query('insert into res (name, phone, address, lat, lng, infor) values (?, ?, ?, ?, ?, ?);', [
        body.name,
        body.phone,
        body.address,
        body.lat,
        body.lng,
        body.infor,
      ], function() {
        res.redirect('/')
      })
  })
  
  app.get('/edit/:id', function (req, res) {
    fs.readFile('edit.ejs', 'utf8', function (err, data) {
        client.query('select * from res where id = ?', [req.params.id], function (err, result) {
          res.send(ejs.render(data, {
            data: result[0]
          }))
        })
      })
  })
  
  app.post('/edit/:id', function (req, res) {
    const body = req.body
    client.query('update res SET name=?, phone=?, address=?, lat=?, lng=?, infor=? where id=?',[
        body.name, body.phone, body.address, body.lat, body.lng, body.infor, req.params.id
    ], function () {
        res.redirect('/')
    })
  })