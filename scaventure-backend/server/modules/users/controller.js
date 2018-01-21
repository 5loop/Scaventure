const jwt = require('jsonwebtoken');

import User from './model';
import config from '../../config/config';
import { validateEmail } from '../../utils/validateInput'; 

function generateToken(user) {  
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

// Set user info from request
function setUserInfo(request) {  
  return {
    _id: request._id,
    email: request.email,
    role: request.role,
  };
}

// Login Route
export const login = function(req, res, next) {  
  let userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}

// Update user info
export const update = function(req, res, next) {  
  // Check for registration errors
  const {email,password} = req.body;

  // Return error if no email provided
  if (!email || !validateEmail(email)) {
    return res.status(422).send({ error: true, message: 'You must enter valid email address.'});
  }

  // Return error if no password provided
  if (!password || password.length < 6) {
    return res.status(422).send({ error: true, message: 'You must enter a password at least 6 characters long.' });
  }

  // Validate that the email is not already taken by other user
  User.findOne({ email: email }, (err, user) => {
    
    // User tries to update someone else credentials
    if (user && user.email.trim() != req.user.email) {
      return res.status(422).send({error: true, message: 'The email address is already taken!' });
    } else {

      // Update 
      User.findOne({ email: req.user.email }, function(err, user) {
        if (err) { return next(err); }
    
        // If user is not unique, return error
        if (err) {
          return res.status(422).send({ error: 'Error happened!' });
        }
    
        // If email is unique and password was provided, create account
        if (email) { user.email = email; }
        if (password) { user.password = password; }
    
        user.save(function(err, user) {
          if (err) { return next(err); }
          let userInfo = setUserInfo(user);
    
          res.status(201).json({
            token: 'JWT ' + generateToken(userInfo),
            user: userInfo
          });
        });
      });
    }
  });
}

  
// Registration Route
export const register = function(req, res, next) {  
  // Check for registration errors
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  // Return error if no email provided
  if (!email || !validateEmail(email)) {
    return res.status(422).send({ error: 'You must enter valid email address.'});
  }

  // Return error if no password provided
  if (!password || password.length < 6) {
    return res.status(422).send({ error: 'You must enter a password at least 6 characters long.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // do email verification here
        // Respond with JWT if user was created

        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}
