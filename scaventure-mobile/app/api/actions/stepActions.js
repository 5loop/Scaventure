import StepApi from '../api/StepApi';
import Data from '../api/steps.json';
import { LOAD_STEPS_SUCCESS } from '../constants/actionTypes';

export function getSteps() {
  return dispatch => {
    return StepApi.getSteps().then(res => {
      dispatch({ type: LOAD_STEPSS_SUCCESS, steps: res.data.steps });
    }).catch(e => {
      console.log(e);
    });
    // setTimeout(() => {
    //   const quests = Data.quests;
    //   dispatch({ type: LOAD_QUESTS_SUCCESS, quests });
    // }, 2000);
  };
}

export function getOneStep(id) {
  return dispatch => {
    setTimeout(() => {
      const step = Data.steps[0];
      dispatch({ type: LOAD_STEPS_SUCCESS, step });
    }, 2000);
  };
}
