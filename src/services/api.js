import axios from 'axios';
import { GOOGLE_APIKEY, BREEZOMETER_APIKEY } from '../constants/constants';

const fetchSuggestionsUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
const fetchWeatherQualityUrl = 'https://api.breezometer.com/baqi/';
const fetchCityLocationUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
function fetchSuggestions(query) {
  return axios.get(
    `${fetchSuggestionsUrl}?input=${query}&types=(cities)&key=${GOOGLE_APIKEY}`,
  );
}

function fetchWeatherQuality(location) {
  return axios.get(
    `${fetchWeatherQualityUrl}?lat=${location.lat}&lon=${location.lng}&key=${BREEZOMETER_APIKEY}`,
  );
}

function fetchCityLocation(city) {
  return axios.get(`${fetchCityLocationUrl}?address=${city}&key=${GOOGLE_APIKEY}`);
}

export default {
  fetchSuggestions,
  fetchCityLocation,
  fetchWeatherQuality,
};
