var express = require('express');

var app = module.exports = express.Router();

app.get('/api/information', function(req, res) {
  res.status(200).send({'title': 'Public Information', 'msg': 'This can be seen by anyone!'});
});
