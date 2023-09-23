const express = require('express');
const app = express();
const PORT = 8888;

app.listen(PORT, () => {
    console.log('start server', PORT)
})

app.get('/',(req,res) => {
    res.send('로그인 구현');
})

app.get('/: id',(req,res) => {
    res.send(`아이디는 ${req.params.id}`)
})