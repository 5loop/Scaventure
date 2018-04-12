import { combineReducers } from 'redux';
// import {  
//   questReducer as quests, 
//   feedbackReducer as feedbacks, 
//   stepReducer as steps, newQuest, authenticated } from './questReducer';
import { 
  invitationReducer as invitedusers,
  questReducer as quests, 
  privateQuestReducer as privateQuests,
  myQuestReducer as myQuests,
  feedbackReducer as feedbacks, stepReducer as steps, newQuest, authenticated } from './questReducer';

const rootReducer = combineReducers({
  quests,
  privateQuests,
  myQuests,
  feedbacks,
  steps,
  authenticated,
  invitedusers,
  newQuest,
});

export default rootReducer;
