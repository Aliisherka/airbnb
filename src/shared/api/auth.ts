import { postRequest } from './postRequest';

const authenticate = async (phoneNumber: string, password: string) => {
  try {
    const response = await postRequest('/auth', { phoneNumber, password });
    
    const { token, user } = response.data.data;
    
    localStorage.setItem('token', token);
    
    return user;
  } catch (error) {
    throw error.response?.data || 'Ошибка при аутентификации';
  }
};

export default authenticate