import { combineReducers } from 'redux';
import { questReducer as quests } from './questReducer';

const rootReducer = combineReducers({
  quests,
});

export default rootReducer;
