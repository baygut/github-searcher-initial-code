import axios from 'axios';
import {UserResponse} from './UserModel';
import URL_MANAGER from '../../utils/urls';

type FetchUsersResult = UserResponse | { data: null; error: any };
class UserService {
    
  async fetchUsers(query: string): Promise<FetchUsersResult> {
    try {
      const response = await axios.get(`${URL_MANAGER.USER_BASE_URL}${query}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return { data: null, error: error };
    }
  }
}
export default new UserService();
