/*
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index'))
  .listen(PORT, () => console.log(`Listening on port ${ PORT }`));
*/

var express = require('express');
var app = express();
var http = require('http').Server(app).listen(5000);
var port = 5000;

app.use("/css", express.static("./css"));
app.use("/js", express.static("./js"));
app.use("/img", express.static("./img"));
app.use("/html", express.static("./html"));
app.use("/php", express.static("./php"));

console.log(`Server started on port ${port}`);

app.get("/", function(req, res){
    res.sendFile(__dirname + '/html/index.ejs');
});