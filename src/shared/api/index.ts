import { fetchExchangeRate } from './currency';
import { getHouse, getHouses, searchHouses } from './houses';
import { getReviews } from './reviews';

export const apiCall = {
  getHouses,
  getHouse,
  searchHouses,
  fetchExchangeRate,
  getReviews
}
