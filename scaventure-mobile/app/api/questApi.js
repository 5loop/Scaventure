import axios from 'axios';
import { apiUrl } from './config';

class QuestApi {
  static getQuests() {
    return axios.get(`${apiUrl}/api/quests?type=public`);
  }

  static getQuestsNearby(coordinates, skip, distance = 100 * 1000) {
    const { longitude, latitude } = coordinates;
    const query = `type=nearby&longitude=${longitude}&latitude=${latitude}&distance=${distance}&skip=${skip}`;
    return axios.get(`${apiUrl}/api/quests?${query}`);
  }

  static getPrivateQuests() {
    return axios.get(`${apiUrl}/api/quests?type=private`);
  }

  static addQuest(data) {
    return axios.post(`${apiUrl}/api/quests`, data);
  }

  static editQuest(questId, data) {
    return axios.post(`${apiUrl}/api/quests/${questId}`, data);
  }

  static editStep(stepId, questId, data) {
    return axios.post(`${apiUrl}/api/quests/${questId}/steps/edit/${stepId}`, data);
  }  
  
  static getMyQuests() {
    return axios.get(`${apiUrl}/api/quests?type=user`);
  }

  static emailQuestPackage(questId) {
    return axios.get(`${apiUrl}/api/quests/${questId}/package`);
  }

  static deleteQuest(questId) {
    return axios.delete(`${apiUrl}/api/quests/${questId}`);
  }

  static getInvitedUsers(questId) {
    return axios.get(`${apiUrl}/api/quests/${questId}/users`);
  }

  static deleteInvitedUsers(questId, email) {
    return axios.delete(`${apiUrl}/api/quests/${questId}/users/${email}`);
  }

  static sendInvitation(questId, data) {
    return axios.post(`${apiUrl}/api/quests/${questId}/users`, data);
  }

  static getFeedbacks(questId) {
    return axios.get(`${apiUrl}/api/quests/${questId}/feedbacks`);
  }

  static addFeedback(questId, data) {
    return axios.post(`${apiUrl}/api/quests/${questId}/feedbacks`, data);
  }

  static addHint(stepId, questId, data) {
    return axios.post(`${apiUrl}/api/quests/${questId}/steps/${stepId}/hints/text`, data);
  }

  static getSteps(questId) {
    return axios.get(`${apiUrl}/api/quests/${questId}/steps`);
  }

  static deleteStep(questId, stepId) {
    return axios.delete(`${apiUrl}/api/quests/${questId}/steps/${stepId}`);
  }
  
  static addStep(type, questId, data) {
    return axios.post(`${apiUrl}/api/quests/${questId}/steps/${type}`, data);
  }

  static reorderSteps(questId, order) {
    return axios.patch(`${apiUrl}/api/quests/${questId}/steps/reorder`, order);
  }

  static saveProgress(data) {
    return axios.post(`${apiUrl}/api/progress`, data);
  }

  static getProgress() {
    return axios.get(`${apiUrl}/api/progress`);
  }
}

export default QuestApi;
