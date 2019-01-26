const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const Joi = require('joi');
const validation = require('../helpers/validations')

const { authenticate } = require('../auth/authenticate');
const jwtKey = process.env.JWT_KEY || 'It\'s a secret';

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
  const user = req.body;
  const validateUser = Joi.validate(user, validation.userInput);
  if(validateUser.error){
    res.status(406).json({message: "Please make sure you have Username & Password (min 6 chars)"})
  }else{
    const hash = bcrypt.hashSync(user.password);
    user.password = hash;
    db('users').insert(user).then(id=>{
      res.status(201).json({message: "user created"})
    })
    .catch(err=>{
      res.status(500).send(err)
    })
  }
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
