import { combineReducers } from 'redux';
import { questReducer as quests, feedbackReducer as feedbacks, stepReducer as steps, newQuest, editedQuest , authenticated } from './questReducer';

const rootReducer = combineReducers({
  quests,
  feedbacks,
  steps,
  authenticated,
  newQuest,
  editedQuest,
});

export default rootReducer;
