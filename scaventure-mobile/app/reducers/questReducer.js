import * as types from '../constants/actionTypes';
import initialState from './initialState';

export function questReducer(state = initialState.quests, action) {
  switch (action.type) {
    case types.LOAD_QUESTS_SUCCESS:
      state = Object.assign({}, state, { quests: action.quests, loading: false });
      return state;
    default:
      return state;
  }
}

export function authenticated(state = { authenticated: false }, action) {
  switch (action.type) {
    case types.UNAUTH_USER:
      state = Object.assign({}, state, { authenticated: false });
      return state;
    case types.AUTH_USER:
      state = Object.assign({}, state, { authenticated: true });
      return state;
    default:
      return state;
  }
}

export function invitationReducer(state = initialState.invitedusers, action) {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      state = Object.assign({}, state, { loading: false });
      return state;
    default:
      return state;
  }
}

export function feedbackReducer(state = initialState.feedbacks, action) {
  switch (action.type) {
    case types.LOAD_FEEDBACKS_SUCCESS:
      state = Object.assign({}, state, { feedbacks: action.feedbacks, loading: false });
      return state;
    default:
      return state;
  }
}

export function stepReducer(state = initialState.steps, action) {
  switch (action.type) {
    case types.LOAD_STEPS_SUCCESS:
      state = Object.assign({}, state, { steps: action.steps, loading: false });
      return state;
    default:
      return state;
  }
}

export function newQuest(state = initialState.newQuest, action) {

  switch (action.type) {
    case types.ADD_QUEST_SUCCESS:
      state = Object.assign({}, state, { newQuest: action.newQuest, loading: false });
      return state;
    default:
      return state;
  }
}




