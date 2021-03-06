import QuestApi from '../api/questApi';
import * as types from '../constants/actionTypes';
import { ajaxCallError } from './ajaxStatusActions';
//import { getOneHint } from '../../../scaventure-backend/server/modules/quests/hintController';

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
      dispatch({ type: types.LOAD_PRIVATE_QUESTS_SUCCESS, quests: res.data.quests });
    }).catch(e => {
      dispatch(ajaxCallError(e));
    });
}

export function getMyQuests() {
  return dispatch =>
    QuestApi.getMyQuests().then(res => {
      dispatch({ type: types.LOAD_MY_QUESTS_SUCCESS, quests: res.data.quests });
    }).catch(e => {
      console.log(e); 
    });
}

export function emailQuestPackage(questId) {
  return dispatch => 
    QuestApi.emailQuestPackage(questId).then(() => {
      dispatch({ type: types.EMAIL_PACKAGE_SUCCESS });
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

export function getInvitedUsers(questId) {
  return dispatch =>
    QuestApi.getInvitedUsers(questId).then(res => {
      dispatch({ type: types.LOAD_USERS_SUCCESS, invitedusers: res.data.links });
    }).catch(e => {
      console.log(e);
    });
}

export function deleteInvitedUsers(questId, email) {
  return dispatch =>
    QuestApi.deleteInvitedUsers(questId, email).then(() => {
      dispatch({ type: types.DELETE_INVITATED_USERS_SUCCESS });
      dispatch(getInvitedUsers(questId));
    }).catch(e => {
      console.log(e);
    });
}

export function sendInvitation(questId, data) {
  return dispatch =>
    QuestApi.sendInvitation(questId, data).then(() => {
      dispatch({ type: types.LOAD_SEND_INVITATION_SUCCESS });
      dispatch(getInvitedUsers(questId));
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

export function editStep(stepId, questId, data) {
  return dispatch => {
    return QuestApi.editStep(stepId, questId, data).then(res => {
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

export function addHint(stepId, questId, data) {
  return dispatch => {
    return QuestApi.addHint(stepId, questId, data).then(res => {
      //dispatch(getOneHint(stepId));
    }).catch(e => {
      console.log(e);
    });
    // setTimeout(() => {
    //   const quests = Data.quests;
    //   dispatch({ type: LOAD_QUESTS_SUCCESS, quests });
    // }, 2000);
  };
}

export function saveProgress(data) {
  return dispatch =>
    QuestApi.saveProgress(data).then(() => {
      dispatch({ type: types.ADD_PROGRESS_SUCCESS, progress: data });
    }).catch(e => {
      console.log(e);
    });
}

export function getProgress() {
  return dispatch => 
    QuestApi.getProgress().then((res) => {
      dispatch({ type: types.LOAD_PROGRESS_SUCCESS, progress: res.data.progress });
    });
}

