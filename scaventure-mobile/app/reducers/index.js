import { questReducer as quests }from './questReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  quests
});

export default rootReducer;