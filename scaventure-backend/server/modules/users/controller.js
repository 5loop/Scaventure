const jwt = require('jsonwebtoken');

import {User, Token} from './model';
//import Token from './model';
import config from '../../config/config';
import { validateEmail } from '../../utils/validateInput'; 

var sg = require('sendgrid')(config.sendgrid_key);
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var randomize = require('randomatic');

function generateToken(user) {  
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

// Set user info from request
function setUserInfo(request) {  
  return {
    _id: request._id,
    email: request.email
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

// Update user info route
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

      user.save(function(err) {
        if (err) { return res.status(500).send({ msg: err.message }); }

        // do email verification here
        // Respond with JWT if user was created
        let userInfo = setUserInfo(user);
        var token = new Token({ _userId: userInfo._id, token: crypto.randomBytes(16).toString('hex') });
        
        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            // Send the email            
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: {
                personalizations: [
                  {
                    to: [
                      {
                        email: userInfo.email
                      }
                    ],
                    subject: 'Account Verification Token'
                  }
                ],
                from: {
                  email: 'scaventureapp@gmail.com'
                },
                content: [
                  {
                    type: 'text/plain',
                    value: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/api/auth/confirmation\/' + token.token + '.\n'
                  }
                ]
              }
            });

            sg.API(request)
            .then(function (response) {
              console.log("Sent!!")
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            })
            .catch(function (error) {
              console.log("Not Sent!!")
              // error is an instance of SendGridError          
              // The full response is attached to error.response
              console.log(error.response.statusCode);
            });
        });        

        return res.status(201).json({
          key: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}

/**
* Get /confirmation
*/
export const confirmation = function (req, res, next) {  
  // Find a matching token
  Token.findOne({ token: req.params.token }, function (err, token) {
      if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });

      // If we found a token, find a matching user
      User.findOne({ _id: token._userId }, function (err, user) {
          if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
          if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              return res.status(200).send("The account has been verified. Please log in.");
          });
      });
  });
};



// forgot password route
export const forgot_password = function(req, res, next) {
  // Check for registration errors
  const email = req.body.email;  
 
  // Return error if no email provided
  if (!email || !validateEmail(email)) {
    return res.status(422).send({ error: 'You must enter valid email address.'});
  }  

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {      
        if (err) { return res.status(500).send({ msg: err.message }); }

        // do email verification here
        // Respond with JWT if user was created
        let userInfo = setUserInfo(existingUser);
        var token = new Token({ _userId: userInfo._id, token: randomize('0', 6) });
        
        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }            
            var request = sg.emptyRequest({
              method: 'POST',
              path: '/v3/mail/send',
              body: {
                personalizations: [
                  {
                    to: [
                      {
                        email: userInfo.email
                      }
                    ],
                    subject: 'Password Reset Key'
                  }
                ],
                from: {
                  email: 'scaventureapp@gmail.com'
                },
                content: [
                  {
                    type: 'text/plain',
                    value: 'Hello,\n\n' + 'This is your reset password key: ' + token.token + ', enter the key on the reset password screen on app to reset password.\n'
                  }
                ]
              }
            });

            sg.API(request)
            .then(function (response) {
              console.log("Sent!!")
              console.log(response.statusCode);
              console.log(response.body);
              console.log(response.headers);
            })
            .catch(function (error) {
              console.log("Not Sent!!")
              // error is an instance of SendGridError          
              // The full response is attached to error.response
              console.log(error.response.statusCode);
            });
        });        

        return res.status(201).json({
          key: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });     
    }
  });
}


/**
 * Reset password
 */

export const reset_password = function(req, res, next) {
  const email = req.body.email;
  const key = req.body.key;  
  const password = req.body.password;

  Token.findOne({ token: key }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token may have expired.' });

    // If we found a token, find a matching user
    User.findOne({ _id: token._userId }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
        
        // Verify and save the user
        user.password = password;
        user.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            return res.status(200).send("The password has been reset. Please log in.");
        });
    });
});
};