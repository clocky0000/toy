const express = require('express');
const mysql = require('mysql2/promise');
const { Client } = require('@googlemaps/google-maps-services-js');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Google Maps API 키
const googleMapsClient = new Client({ key: 'AIzaSyAGYQ4XUty5CemiTsQ1Ung5lnkLhdsxpBQ' });

// MySQL 연결 설정
const dbConfig = {
  user: 'root',
  password: 'lyjin0928!',
  database: 'test1',
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/addAddress', async (req, res) => {
  try {
    // 입력받은 주소
    const address = req.body.address;

    // Google Maps Geocoding API를 사용하여 주소를 좌표로 변환
    const response = await googleMapsClient.geocode({
      params: { address: address, language: 'ko' },
    });

    if (response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;

      // MySQL 데이터베이스에 좌표 저장
      const connection = await mysql.createConnection(dbConfig);
      const [results] = await connection.execute('INSERT INTO addresses (address, lat, lng) VALUES (?, ?, ?)', [
        address,
        location.lat,
        location.lng,
      ]);

      connection.end();

      res.send('주소와 좌표가 성공적으로 저장되었습니다.');
    } else {
      res.send('주소를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).send('에러 발생');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('에러 발생');
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});