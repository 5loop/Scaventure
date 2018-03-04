import axios from 'axios';
import { apiUrl } from './config';

class QuestApi {
  static getQuests() {
    return axios.get(`${apiUrl}/api/quests?type=public`);
  }

<<<<<<< HEAD
  static addQuest(data) {
    return axios.post(`${apiUrl}/api/quests`, data);
=======
  static getMyQuests() {
    return axios.get(`${apiUrl}/api/quests?type=user`);
  }

  static getFeedbacks(questId) {
    return axios.get(`${apiUrl}/api/quests/${questId}/feedbacks`);
  }

  static addFeedback(questId, data) {
    return axios.post(`${apiUrl}/api/quests/${questId}/feedbacks`, data);
  }

  static getSteps(questId) {
    return axios.get(`${apiUrl}/api/quests/${questId}/steps`);
>>>>>>> b25ce627ee2ab6325eb8ac53bea761f6451212eb
  }
}

export default QuestApi;
