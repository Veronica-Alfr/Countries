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

export const getCountryInfo = async (countryCode: string) => {
  try {
    const response = await axios.get(`${API_URL}/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching country info:', error);
    throw error;
  }
};

export const useCountryInfo = (countryCode: string) => {
  return useQuery({
    queryKey: ['countryInfo', countryCode],
    queryFn: () => getCountryInfo(countryCode),
  });
};