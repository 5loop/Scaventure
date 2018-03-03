import { combineReducers } from 'redux';
import { questReducer as quests, feedbackReducer as feedbacks, stepReducer as steps } from './questReducer';

const rootReducer = combineReducers({
  quests,
  feedbacks,
  steps,
});

export default rootReducer;
