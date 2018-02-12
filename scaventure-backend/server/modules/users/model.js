import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// User Schema
const UserSchema = new Schema({  
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true    
  },
  password: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }, 
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},
{
  timestamps: true
});

const TokenSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,    
    required: true
  },  
  createdAt: { 
    type: Date, 
    required: true, 
    default: Date.now, 
    expires: 43200 }
});

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function(next) {  
  const user = this,
        SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function(candidatePassword, cb) {  
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
}

const User = mongoose.model('User', UserSchema);  
const Token = mongoose.model('Token', TokenSchema);  
export { User, Token };