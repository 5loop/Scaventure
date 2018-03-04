import axios from 'axios';
import { apiUrl } from './config';

class QuestApi {
  static getQuests() {
    return axios.get(`${apiUrl}/api/quests?type=public`);
  }

  static addQuest(data) {
    return axios.post(`${apiUrl}/api/quests`, data);
  }
}

export default QuestApi;
