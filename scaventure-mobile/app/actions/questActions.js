import Data from '../api/quests.json'
import { LOAD_QUESTS_SUCCESS } from '../constants/actionTypes';

export function getQuests() {
  return (dispatch) => {
    setTimeout(() => {
      var quests  = Data.quests;
      dispatch({type: LOAD_QUESTS_SUCCESS, quests});
  }, 2000);
  }
}