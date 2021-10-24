require('dotenv').config();

const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

const app = express();
const PORT = process.env.PORT || 5001;

// mock user details
const userData = {
  userId: '123456',
  password: '123456',
  name: 'Sara Sadot',
  username: 'sarasadot',
  isAdmin: true,
};

// enable CORS
app.use(cors());
// parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // to perse the incoming requests with JSON playloads
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// step - 3. Implement middleware to validate the token
// this middleware checks if JWT token exists and verifies.
// In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
    if (err) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.',
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

// request handlers
app.get('/', (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: 'Invalid user to access it.' });
  }
  res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
});

// step - 1. Create API for user signin: validate the user's credentials and sends the status code if error occurs or user details with token
app.post('/users/signin', (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  // return 400 status if username/password is not exists
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: 'Username or password is required',
    });
  }
  // return 401 status if the credential is not match
  if (user !== userData.username || pwd !== userData.password) {
    return res.status(401).json({
      error: true,
      message: 'Username or Password is wrong',
    });
  }

  // generate token for the user
  const token = utils.generateToken(userData);
  // get basic user details
  const userObj = utils.getCleanUser(userData);
  // finally return the token along with the user details
  return res.json({
    user: userObj,
    token,
  });
});

// step - 2. Create API for verify token
app.get('/verifyToken', (req, res) => {
  // check header or url parameters or post parameters for token
  const token = req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: 'Token is required',
    });
  }
  // check the token that was passed by decoding token using secret key
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: 'Invalid Token',
      });
    }
    // return 401 status if the userId does not match
    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user',
      });
    }
  });
  // get basic user details
  const userObj = utils.getCleanUser(userData);
  return res.json({
    user: userObj,
    token,
  });
});

app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
