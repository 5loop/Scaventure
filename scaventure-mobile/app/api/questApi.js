import axios from 'axios';
import { apiUrl } from './config';

class QuestApi {
  static getQuests() {
    return axios.get(`${apiUrl}/api/quests?type=public`);
  }

  static getMyQuests() {
    return axios.get(`${apiUrl}/api/quests?type=user`);
  }

  static deleteQuest(questId) {
    return axios.delete(`${apiUrl}/api/quests/${questId}`);
  }

  static getFeedbacks(questId) {
    return axios.get(`${apiUrl}/api/quests/${questId}/feedbacks`);
  }

  static addFeedback(questId, data) {
    return axios.post(`${apiUrl}/api/quests/${questId}/feedbacks`, data);
  }

  static getSteps(questId) {
    return axios.get(`${apiUrl}/api/quests/${questId}/steps`);
  }
}

export default QuestApi;
