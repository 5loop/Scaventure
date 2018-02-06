import { LOAD_QUESTS_SUCCESS } from '../constants/actionTypes';
import initialState from './initialState';

export function questReducer(state = initialState.quests, action) {
  switch (action.type) {
    case LOAD_QUESTS_SUCCESS:
      state = Object.assign({}, state, { quests: action.quests, loading: false });
      return state;
    default:
       return state;
  }
}