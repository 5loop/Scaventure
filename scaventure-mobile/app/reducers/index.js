import { combineReducers } from 'redux';
import { questReducer as quests, feedbackReducer as feedbacks, stepReducer as steps, authenticated } from './questReducer';

const rootReducer = combineReducers({
  quests,
  feedbacks,
  steps,
  authenticated,
});

export default rootReducer;
