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
});

// Index to allow geo-optimization
questSchema.index({'loc': '2dsphere'});

const options = { discriminatorKey: 'type' };

/* This is base schema for steps ( see http://mongoosejs.com/docs/discriminators.html )*/
const stepSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  startLocation: { // where challenge begins
    type: {type: String, default: 'Point'},
    coordinates: [Number]
  },
  stepLocation: { // where answer lies
    type: {type: String, default: 'Point'},
    coordinates: [Number]
  },
  startBoundToLastStep: { // true if start is the same as last-step location
    type: Boolean,
    default: true
  },
  isRequired: {
    type: Boolean,
    default: true
  },
  points: {
    type: Number,
    required: true
  },
  stepNumber: { // order of the step
    type: Number,
    required: true
  },
  stepHint: {
    type: String,
    required: false,
    default: "",
  },

  // keys //
  questId : {
    type: Schema.ObjectId,
    ref: 'Quest',
    required: true
  }
}, options);

stepSchema.index({'startLocation': '2dsphere', 'stepLocation':'2dsphere'});
const Step = mongoose.model('Step', stepSchema);

const QAStep = Step.discriminator('QAStep',
  new Schema({
    question: {
      type: String,
      required: true
    },
    answer: {
      type: Number,
      required: true
    },
    options: {
      type: [String],
      required: false
    },
    regEx: {
      type: String
    }
}, options));

const QRStep = Step.discriminator('QRStep',
  new Schema({
    qrCode: {
      type: String,
      required: true
    },
    backupEnabled: {
      type: Boolean,
      required: false,
      default: false,
    },
}, options));


const GPSStep = Step.discriminator('GPSStep',
  new Schema({
    radius: {
      type: Number,
      default: 16
    },
}, options));

// Hint schema
const hintSchema = new Schema ({
  type: {
    type: String,
    enum: ['location', 'text'],
    required: true,
    default: 'text'
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [Number]
  },
  stepId: {
    type: Schema.ObjectId,
    ref: 'Step',
    required: true
  },
  textHint: {
    type: String
  },
  penalty: {
    type: Number
  }
});


//////////////////////
// define models here
const Quest  = mongoose.model('Quest',  questSchema);
const Link   = mongoose.model('Link', linkSchema);
const Hint   = mongoose.model('Hint', hintSchema);


stepSchema.pre('remove', function (next) {
  Hint.remove({stepId: this._id}).exec();
  next();
});

questSchema.pre('remove', function (next) {
  Step.remove({questId: this._id}).exec();
  next();
});

export { Quest, Feedback, Link, Step, QAStep, QRStep, GPSStep, Hint };

