import mongoose, { Schema } from 'mongoose';

/** Used for private quests */
const linkSchema = new Schema({
  userEmail: {
    type: String,
    required: true 
  },
  questId: {
    type: Schema.ObjectId,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  }, 
  hash: {
    type: String,
    required: true
  }
});

/** Quest Collection Structure  */
const questSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  createdAt:  {
    type: Date,
    required: false,
    default:  new Date()
  },
  loc: { 
    type: {type: String, default: 'Point'}, 
    coordinates: [Number] 
  },
  type: {
    type: String,
    enum: ['public', 'private'],
    required: true,
    default: 'public'
  },
  numOfPlayers: { // only for private quests
    type: Number,
    required: false,
    default: 0
  },

  // keys //
  createdBy: {
    type: Schema.ObjectId,
    required: true
  },
});

// Index to allow geo-optimization
questSchema.index({'loc': '2dsphere'});

//////////////////////
// define models here
const Quest  = mongoose.model('Quest',  questSchema);
const Link   = mongoose.model('Link', linkSchema);

export { Quest, Link };
