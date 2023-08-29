import axios from 'axios';
import {RepoResponse} from './RepoModel';
import URL_MANAGER from '../../utils/urls';
type FetchReposResult = RepoResponse | { data: null; error: any };

class RepoService {
  async fetchRepos(query : string): Promise<FetchReposResult> {
    try {
      const response = await axios.get(`${URL_MANAGER.REPO_BASE_URL}${query})`);
      return response.data;
    } catch (error) {
      console.error('Error fetching repos:', error);
      return { data: null, error: error };;
    }
  }
}
export default new RepoService();