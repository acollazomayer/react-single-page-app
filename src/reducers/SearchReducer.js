import {
  FETCH_SUGGESTIONS_FULFILLED,
  FETCH_SUGGESTIONS_REJECTED,
  FETCH_WEATHER_QUALITY_FULFILLED,
  FETCH_WEATHER_QUALITY_REJECTED,
  FETCH_CITY_LOCATION_FULFILLED,
  FETCH_CITY_LOCATION_REJECTED,
  FETCH_CITY_LOCATION_PENDING,
} from '../actions/actionsTypes';
import { getStoredArray, buildPush } from '../lib/stack';

const keyName = 'lastSearches';
const maxStore = 5;
const push = buildPush(maxStore, keyName);

const defaultState = {
  isFetching: false,
  hasFetched: false,
  cityLocation: {},
  city: '',
  weatherState: {},
  suggestions: [],
  error: null,
  lastSearches: getStoredArray(keyName),
};

const searchBarReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SUGGESTIONS_FULFILLED: {
      const suggestions = action.payload.data.predictions.map((prediction) => {
        return prediction.description;
      });
      return { ...state, suggestions };
    }
    case FETCH_SUGGESTIONS_REJECTED: {
      return { ...state, error: action.payload };
    }
    case FETCH_CITY_LOCATION_PENDING: {
      return { ...state, isFetching: true, error: null, weatherState: {}, city: '' };
    }
    case FETCH_CITY_LOCATION_FULFILLED: {
      const cityLocation = action.payload.data.results[0].geometry.location;
      const city = action.payload.data.results[0].formatted_address;
      const lastSearches = state.lastSearches;
      return { ...state, city, cityLocation, lastSearches: push(lastSearches, city) };
    }
    case FETCH_CITY_LOCATION_REJECTED: {
      return { ...state, error: action.payload };
    }
    case FETCH_WEATHER_QUALITY_FULFILLED: {
      if (action.payload.data.error) {
        const error = action.payload.data.error;
        return { ...state, error, hasFetched: true, isFetching: false };
      }
      const weatherState = {
        color: action.payload.data.breezometer_color,
        breezometerAqi: action.payload.data.breezometer_aqi,
        breezometerDescription: action.payload.data.breezometer_description,
        dominantPollutantCanonicalName: action.payload.data.dominant_pollutant_canonical_name,
        dominantPollutantDescription: action.payload.data.dominant_pollutant_description,
      };
      return { ...state, weatherState, hasFetched: true, isFetching: false };
    }
    case FETCH_WEATHER_QUALITY_REJECTED: {
      return { ...state, error: action.payload.response.data.error };
    }
    default:
      return state;
  }
};

export default searchBarReducer;
