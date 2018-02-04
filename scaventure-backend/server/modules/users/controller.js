const jwt = require('jsonwebtoken');

import {User, Token} from './model';
//import Token from './model';
import config from '../../config/config';
import { validateEmail } from '../../utils/validateInput'; 

var sg = require('sendgrid')(config.sendgrid_key);

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
        
        var request = sg.emptyRequest({
          method: 'POST',
          path: '/v3/mail/send',
          body: {
            personalizations: [
              {
                to: [
                  {
                    email: req.body.email
                  }
                ],
                subject: 'Sending with SendGrid is Fun'
              }
            ],
            from: {
              email: 'scaventureapp@gmail.com'
            },
            content: [
              {
                type: 'text/plain',
                value: 'and easy to do anywhere, even with Node.js'
              }
            ]
          }
        });
         
        // With promise
        sg.API(request)
          .then(function (response) {
            console.log("Sent!!")
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
          })
          .catch(function (error) {
            console.log("Sent!!")
            // error is an instance of SendGridError
            // The full response is attached to error.response
            console.log(error.response.statusCode);
          });

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo
        });
      });
  });
}

/**
* POST /confirmation
*/
export const confirmation = function (req, res, next) {  
  //req.assert('email', 'Email is not valid').isEmail();
  //req.assert('email', 'Email cannot be blank').notEmpty();
  //req.assert('token', 'Token cannot be blank').notEmpty();
  //req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  // var errors = req.validationErrors();
  // if (errors) return res.status(400).send(errors);

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

/**
* POST /resend
*/
export const resendToken = function (req, res, next) {
  /*req.assert('email', 'Email is not valid').isEmail();
  req.assert('email', 'Email cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  var errors = req.validationErrors();
  if (errors) return res.status(400).send(errors);
*/
  User.findOne({ email: req.body.email }, function (err, user) {
      if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
      if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

      // Create a verification token, save it, and send email
      var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

      // Save the token
      token.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }

          // Send the email
          var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_KEY } });
          var mailOptions = { from: 'scaventureapp@gmail.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
          transporter.sendMail(mailOptions, function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
              res.status(200).send('A verification email has been sent to ' + user.email + '.');
          });
      });

  });
};