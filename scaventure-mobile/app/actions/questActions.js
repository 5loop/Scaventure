import QuestApi from '../api/questApi';
import * as types from '../constants/actionTypes';
import { ajaxCallError } from './ajaxStatusActions';

export function getQuests() {
  return dispatch => 
    QuestApi.getQuests().then(res => {
      dispatch({ type: types.LOAD_QUESTS_SUCCESS, quests: res.data.quests });
    }).catch(e => {
      dispatch(ajaxCallError(e));
    });
}

export function getQuestsNearby(coordinates, skip = 0) {
  return dispatch => 
    QuestApi.getQuestsNearby(coordinates, skip).then(res => {
      dispatch({ type: types.LOAD_QUESTS_SUCCESS, quests: res.data.quests });
    }).catch(e => {
      dispatch({ type: types.LOAD_QUESTS_SUCCESS, quests: [] });
      throw (e);  
    });  
}

export function getPrivateQuests() {
  return dispatch => 
    QuestApi.getPrivateQuests().then(res => {
      dispatch({ type: types.LOAD_PRIVATE_QUESTS_SUCCESS, privateQuests: res.data.quests });
    }).catch(e => {
      dispatch(ajaxCallError(e));
    });
}

export function getMyQuests() {
  return dispatch =>
    QuestApi.getMyQuests().then(res => {
      dispatch({ type: types.LOAD_MY_QUESTS_SUCCESS, myQuests: res.data.quests });
    }).catch(e => {
      console.log(e); 
    });
}

export function deleteQuest(questId) {
  return dispatch =>
    QuestApi.deleteQuest(questId).then(res => {
      dispatch({ type: types.DELETE_QUEST_SUCCESS });
      dispatch(getMyQuests());
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

export function deleteStep(questId, stepId) {
  return dispatch =>
    QuestApi.deleteStep(questId, stepId).then(res => {
      dispatch(getSteps(questId));
      dispatch({ type: types.DELETE_STEP_SUCCESS });
    }).catch(e => {
      console.log(e); 
    });
}

export function addQuest(data) {
  return dispatch => {
    return QuestApi.addQuest(data).then(res => {
      dispatch({ type: types.ADD_QUEST_SUCCESS, newQuest: res.data.quest });
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

export function editQuest(questId, data) {
  return dispatch => {
    return QuestApi.editQuest(questId, data).then(res => {
      dispatch({ type: types.EDIT_QUEST_SUCCESS, editQuest: res.data.quest });
      dispatch(getMyQuests());
    }).catch(e => {
      console.log(e);
    });
    // setTimeout(() => {
    //   const quests = Data.quests;
    //   dispatch({ type: LOAD_QUESTS_SUCCESS, quests });
    // }, 2000);
  };
}

export function addStep(type, questId, data) {
  return dispatch => {
    return QuestApi.addStep(type, questId, data).then(res => {
      dispatch(getSteps(questId));
    }).catch(e => {
      console.log(e);
    });
    // setTimeout(() => {
    //   const quests = Data.quests;
    //   dispatch({ type: LOAD_QUESTS_SUCCESS, quests });
    // }, 2000);
  };
}

export function reorderSteps(questId, order) {
  return dispatch =>
    QuestApi.reorderSteps(questId, { order }).then(res => {
      // dispatch(getSteps(questId));
    }).catch(e => {
      console.log(e);
    });
}
