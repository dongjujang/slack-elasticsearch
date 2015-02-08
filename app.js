var express = require('express');
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');

var app = express();
var port = process.env.PORT || 8888;
var client = new elasticsearch.Client({
  host: (process.env.ELASTICSEARCH || 'localhost:9200'),
  log: 'trace'
});

app.use(bodyParser.urlencoded({ extended: false }));

app.all('/*', function(req, res){
  var channel = req.body.channel_name;
  var user = req.body.user_name;
  var text = req.body.text;
  var timestamp = req.body.timestamp;

  res.send('');

  if (!channel || !user || !text || !timestamp) return;

  client.create({
    index: 'slack',
    type: 'message',
    '@timestamp': timestamp,
    id: channel + user + text,
    ttl: 60 * 60 * 24 * 30,
    body: {
      channel: channel,
      user: user,
      text: text,
      timestamp: timestamp
    }
  }, function(error, response){

  });
});

app.listen(port);