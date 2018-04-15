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
  progressReducer as progress,
  feedbackReducer as feedbacks, stepReducer as steps, newQuest, editedQuest, authenticated } from './questReducer';

const rootReducer = combineReducers({
  quests,
  privateQuests,
  myQuests,
  feedbacks,
  steps,
  authenticated,
  newQuest,
  editedQuest,
  invitedusers,
  progress,
});

export default rootReducer;
