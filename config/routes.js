const axios = require('axios');

const { authenticate, generateToken } = require('./middlewares');

const bcrypt = require('bcryptjs');


const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registrationconst

  credentials = req.body; 
  // console.log("register", req.body);

  const hash = bcrypt.hashSync(credentials.password, 10);
  // console.log("hash", hash);
  credentials.password = hash;

    db('users')
      .insert(credentials)
      .then(ids => {
      const id = ids[0];
      res.status(201).json({ newUserId: id , hash})
    })
   .catch(err => {
     res.status(500).json(err);
   });
}

function login(req, res) {
  // implement user login
  const creds = req.body;
  // console.log("login", creds);

  db('users')
    .where({username: creds.username})
    .first()
    .then(user => {
        console.log(creds.password, user.password);
        console.log(user);
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          
          ////Why is compareSync not working?
          const token = generateToken(user);

            res.status(200).json({welcome: user.username, token });
    }
        else {
            res.status(401).json({message: 'You just cannot enter. That is all.'})
    }
  })
        .catch(err => {res.status(500).json({ message: 'Something went wrong...on our end.'})
    });
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
