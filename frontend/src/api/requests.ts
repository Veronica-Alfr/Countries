import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3001/countries';

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
export const useCountries = () => {
  return useQuery({
    queryKey: ['countries'],
    queryFn: getCountries,
  });
};
