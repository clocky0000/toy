const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("main을 붙여보세요");
});

app.get('/main',(req, res) => {                                                              // 첫 페이지 구성
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>Kakao 지도 시작하기</title>
    </head>
    <body>
        <div id="map" style="width:500px;height:400px;"></div>
        <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=76c10b42ec0ce903d1781b79638ba950"></script>
        <script>
            var container = document.getElementById('map');
            var options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };
    
            var map = new kakao.maps.Map(container, options);
        </script>
    </body>
    </html>
    `);
});

app.listen(8080, () => {
    console.log('server 8080');
});