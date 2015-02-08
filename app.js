var express = require('express');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');

var app = express();
var port = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function(req, res){
  console.log(req.body);
  res.send('');
});

app.listen(port);