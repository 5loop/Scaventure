import mongoose, { Schema } from 'mongoose';

/** Quest Collection Structure  */

const feedbackSchema = new Schema({
title: {
	type: String,
	required: true
},
description: {
    type: String,
    required: true
  },
datePosted: {
	type:Date,
	default: new Date()
},
numStars: {
	type: Number
},
questId: {
	type: Schema.ObjectId
},
reportedBy: {
	type: Schema.ObjectId
} 
});

const Feedback  = mongoose.model('Feedback',  feedbackSchema);

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
  
  link: { // only for private quests
    type: Schema.ObjectId,
    required: false
  }

});

// Index to allow geo-optimization
questSchema.index({'loc': '2dsphere'});

//////////////////////
// define models here
const Quest  = mongoose.model('Quest',  questSchema);

export { Quest, Feedback };
