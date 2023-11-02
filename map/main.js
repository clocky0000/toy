const express = require('express');
const ejs = require('ejs');

const app = express();
const path = require("path");

app.get('/', (req, res) => {
  // 루트 경로 ("/")에 대한 처리를 여기에 작성
  res.sendFile(__dirname + '/index.html'); // HTML 파일을 보내는 예제
});

app.get('/mappage', (req, res) => {
  // 루트 경로 ("/")에 대한 처리를 여기에 작성
  res.sendFile(__dirname + '/index.html'); // HTML 파일을 보내는 예제
});

app.listen(8080, () => {
    console.log('server 8080');
});
