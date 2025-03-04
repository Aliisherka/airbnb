import { API_URL } from './config';

export const getHouses = async () => {
  try {
    const response = await fetch(`${API_URL}/houses`);
    if (!response.ok) throw new Error('Failed to fetch houses');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return [];
  }
}