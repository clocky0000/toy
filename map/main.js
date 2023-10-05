const express = require('express');
const app = express();

app.set('views','./views');
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("main/home");
});

app.get('/main',(req, res) => {
    res.render("main/mappage");
});

app.listen(8080, () => {
    console.log('server 8080');
});