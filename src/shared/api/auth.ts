import { patchRequest, postRequest } from './postRequest';

export const authenticate = async (phoneNumber: string, password: string) => {
  try {
    const response = await postRequest('/auth', { phoneNumber, password });
    
    const { token, user } = response.data.data;
    
    localStorage.setItem('access_token', token);
    
    return user;
  } catch (error) {
    throw error.response?.data || 'Ошибка при аутентификации';
  }
};

export const completeProfile = async (name: string) => {
  const response = await patchRequest('/auth/complete-profile', { name });
  return response.data;
}