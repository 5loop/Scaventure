import { combineReducers } from 'redux';
import { questReducer as quests, 
  privateQuestReducer as privateQuests,
  myQuestReducer as myQuests,
  progressReducer as progress,
  feedbackReducer as feedbacks, stepReducer as steps, newQuest, authenticated } from './questReducer';

const rootReducer = combineReducers({
  quests,
  privateQuests,
  myQuests,
  feedbacks,
  steps,
  authenticated,
  newQuest,
  progress,
});

export default rootReducer;
