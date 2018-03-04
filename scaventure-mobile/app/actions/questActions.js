import QuestApi from '../api/questApi';
import Data from '../api/quests.json';
import { LOAD_QUESTS_SUCCESS } from '../constants/actionTypes';

export function getQuests() {
  return dispatch => {
    return QuestApi.getQuests().then(res => {
      dispatch({ type: LOAD_QUESTS_SUCCESS, quests: res.data.quests });
    }).catch(e => {
      console.log(e);
    });
    // setTimeout(() => {
    //   const quests = Data.quests;
    //   dispatch({ type: LOAD_QUESTS_SUCCESS, quests });
    // }, 2000);
  };
}

export function getOneQuest(id) {
  return dispatch => {
    setTimeout(() => {
      const quest = Data.quests[0];
      dispatch({ type: LOAD_QUESTS_SUCCESS, quest });
    }, 2000);
  };
}

export function addQuest(data) {
  return dispatch => {
    return QuestApi.addQuest(data).then(res => {
      dispatch(getQuests());
    }).catch(e => {
      console.log(e);
    });
    // setTimeout(() => {
    //   const quests = Data.quests;
    //   dispatch({ type: LOAD_QUESTS_SUCCESS, quests });
    // }, 2000);
  };
}
