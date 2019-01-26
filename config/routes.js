const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

const { authenticate } = require('../auth/authenticate');
const jwtKey = process.env.JWT_KEY || 'It\'s a secret';
const 
module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

createToken=(user)=>{
  const payload={
    username: user.username,
    id: user.id
  };
  const options={
    expiresIn: '1.5h',
    jwtid: toString(Date.now())
  }
  return jwt.sign(payload, jwtKey, options);

}

function register(req, res) {
  const endpoint = `http://localhost:${process.env.PORT}/api/register`;
  const user = req.body;
  db('users').post(user)
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
