import { combineReducers } from 'redux';
import { invitationReducer as invitedusers, questReducer as quests, feedbackReducer as feedbacks, stepReducer as steps, newQuest , authenticated } from './questReducer';

const rootReducer = combineReducers({
  quests,
  feedbacks,
  steps,
  authenticated,
  invitedusers,
  newQuest,
});

export default rootReducer;
