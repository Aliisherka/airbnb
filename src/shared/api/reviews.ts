import { API_URL } from "./config";

export const getReviews = async (id: string | undefined) => {
  if (!id) return null;
  try {
    const response = await fetch(`${API_URL}/reviews/${id}`)
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
}