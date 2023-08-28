import axios from 'axios';
import {RepoResponse} from './RepoModel';
import URL_MANAGER from '../../utils/urls';

class RepoService {
    
  async fetchRepos(): Promise<RepoResponse | null> {
    try {
      const response = await axios.get(URL_MANAGER.REPO_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching repos:', error);
      return null;
    }
  }
}
export default new RepoService();