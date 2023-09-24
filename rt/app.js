const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.set('views','./views');
app.set('view engine','ejs');
app.use(express.static(`${__dirname}/public`));     
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));   

app.listen(PORT, () => {
    console.log('start server', PORT)
});

const main = require('./routes/main');           // 라우팅 연결
app.use('/',main);                         // 미들 웨어 등록 메서드