import axios from 'axios';
import {UserResponse} from './UserModel';
import URL_MANAGER from '../../utils/urls';

class UserService {
    
  async fetchUsers(query: string): Promise<UserResponse | null> {
    try {
      const response = await axios.get(`${URL_MANAGER.USER_BASE_URL}${query}`);

      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return null;
    }
  }
}
export default new UserService();
