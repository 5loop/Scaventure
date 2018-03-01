import mongoose, { Schema } from 'mongoose';
import {User} from '../users/model';
import {Quest} from '../quests/model';


// User Schema
const ProgressSchema = new Schema({    
    timeTaken: {
      type: Number,
      default: 0
    },
    pointsEarned: {
      type: Number,
      default: 0
    },
    _questId: {
        type: Schema.ObjectId,
        required: true
    },
    _userId: {
        type: Schema.ObjectId,
        required: true        
    }    
  });

  const Progress = mongoose.model('Progress', ProgressSchema);  
  //const Token = mongoose.model('Token', TokenSchema);  
  export { Progress };