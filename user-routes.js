var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

// In a real scenario you would conncet a database!
var users = [{
  id: 1,
  email: 'saimon@devdactic.com',
  password: 'devdactic'
}];

// Create a new JWT Token
function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

// Create a new User
app.post('/users', function(req, res) {

  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  if (_.find(users, {'email': req.body.email})) {
   return res.status(400).send("A user with that email already exists");
  }

  var newUser = _.pick(req.body, 'email', 'password');
  newUser.id = _.max(users, 'id').id + 1;

  users.push(newUser);

  res.status(201).send({
    id_token: createToken(newUser)
  });
});

// Login a user and return JWT Token
app.post('/users/login', function(req, res) {

  if (!req.body.email || !req.body.password) {
    return res.status(400).send("You must send the email and the password");
  }

  var user = _.find(users, {'email': req.body.email});

  if (!user) {
    return res.status(401).send("The email was not found");
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The email or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
