import QuestApi from '../api/questApi';
import * as types from '../constants/actionTypes';

export function getQuests() {
  return dispatch => 
    QuestApi.getQuests().then(res => {
      dispatch({ type: types.LOAD_QUESTS_SUCCESS, quests: res.data.quests });
    }).catch(e => {
      console.log(e);
    });
}

export function getFeedbacks(questId) {
  return dispatch => 
    QuestApi.getFeedbacks(questId).then(res => {
      dispatch({ type: types.LOAD_FEEDBACKS_SUCCESS, feedbacks: res.data.feedbacks });
    }).catch(e => {
      console.log(e);
    });
}

export function addFeedback(questId, data) {
  return dispatch => 
    QuestApi.addFeedback(questId, data).then(res => {
      dispatch({ type: types.ADD_FEEDBACK_SUCCESS });
      dispatch(getFeedbacks(questId));
    }).catch(e => {
      dispatch({ type: types.ADD_FEEDBACK_ERROR });
    });
}

export function getSteps(questId) {
  return dispatch => 
    QuestApi.getSteps(questId).then(res => {
      dispatch({ type: types.LOAD_STEPS_SUCCESS, steps: res.data.steps });
    }).catch(e => {
      console.log(e);
    });
}
