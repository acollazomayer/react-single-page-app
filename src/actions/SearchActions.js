import { FETCH_SUGGESTIONS, FETCH_WEATHER_QUALITY, FETCH_CITY_LOCATION } from './actionsTypes';
import api from '../services/api';

export const fetchSuggestions = (query) => {
  return {
    payload: api.fetchSuggestions(query),
    type: FETCH_SUGGESTIONS,
  };
};

export const fetchWeatherQuality = (location) => {
  return {
    payload: api.fetchWeatherQuality(location),
    type: FETCH_WEATHER_QUALITY,
  };
};

export const fetchCityLocation = (city) => {
  return {
    payload: api.fetchCityLocation(city),
    type: FETCH_CITY_LOCATION,
  };
};
