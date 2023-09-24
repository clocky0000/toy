const express = require('express');
const axios = require('axios');
const app = express();

const GOOGLE_CLIENT_ID = '1088427609061-98rmpcfetpeu2lkfn1pmu60t74ogecjl.apps.googleusercontent.com';               // 발급받은 내 아이디
const GOOGLE_CLIENT_SECRET = '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';                                                      // 발급받은 내 비번
const GOOGLE_LOGIN_REDIRECT_URI = 'http://localhost:8888/login/redirect';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';                    // 토큰 요청 서버
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

app.get('/',(req, res) => {                                                              // 첫 페이지 구성
    res.send(`
        <h1>This is Login Page</h1>
        <a href="/login">Go to Google Login</a>
    `);
});

app.get('/login',(req, res) => {
    let url = 'https://accounts.google.com/o/oauth2/v2/auth';
    url += `?client_id=${GOOGLE_CLIENT_ID}`
    url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`     // 구글이 redirect 할 uri -> 계정 선택
    url += '&response_type=code'
    url += '&scope=email profile'
    res.redirect(url);
});

app.get('/login/redirect', (req, res) => {
    const { code } = req.query;                 // redirect 될 때, code라는 쿼리스트링 (사용자 입력 데이터 전달)
    console.log(`code: ${code}`);
    res.send('Login success!');
});

app.listen(8888, () => {
    console.log('server 8888');
});