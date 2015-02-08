var express = require('express');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');

var app = express();
var port = process.env.PORT || 8888;

app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function(req, res){
  var channel = req.body.channel_name;
  var user = req.body.user_name;
  var text = req.body.text;
  var timestamp = req.body.timestamp;

  res.send('');

  if (!channel || !user || !text || !timestamp) return;

  console.log(channel);
  console.log(user);
  console.log(text);
  console.log(timestamp);
});

app.listen(port);