import mongoose, { Schema } from 'mongoose';

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

  link: { // only for private quests
    type: Schema.ObjectId,
    required: false
  }

});

// Index to allow geo-optimization
questSchema.index({'loc': '2dsphere'});

const options = { discriminatorKey: 'type' };

/* This is base schema for steps ( see http://mongoosejs.com/docs/discriminators.html )*/
const stepSchema = new Schema({
  description: {
    type: String,
    required: true
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
      type: String,
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
}, options));


const GPSStep = Step.discriminator('GPSStep',
  new Schema({
    radius: {
      type: Number,
      default: 16
    },
}, options));

//////////////////////
// define models here
const Quest  = mongoose.model('Quest',  questSchema);

export { Quest, Step, QAStep, QRStep, GPSStep };
