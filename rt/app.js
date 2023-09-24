const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log('start server', PORT)
})

app.get('/',(req,res) => {
    res.send('hello world');
})

app.get('/:id', (req,res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8">
            <title>Sign up 로그인 페이지 </title>
        </head>
        <body>
            <h1>로그인 페이지</h1>
            ID <input type = "text" name = "id" placeholder = "아이디를 입력하세요"><br/>
            PASSWORD <input type = "password" name = "password" placeholder = "비밀번호를 입력하세요"><br/>
            <p>
                <input value = "LOGIN" type = "submit" name = "login">
            </p>
        </body>
        </html>
        `);
    });
