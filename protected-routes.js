var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config');

var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/information', function(req, res) {
  res.status(200).send({'title': 'New Hidden Information', 'msg': 'This is only visible for you my friend!'});
});
