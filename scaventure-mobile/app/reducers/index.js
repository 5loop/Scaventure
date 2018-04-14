import { combineReducers } from 'redux';
import { questReducer as quests, 
  privateQuestReducer as privateQuests,
  myQuestReducer as myQuests,
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
});

export default rootReducer;
