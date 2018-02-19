import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import api from '../../../services/api';
import { fetchSuggestions, fetchCityLocation, fetchWeatherQuality } from '../../../actions/SearchActions';
import { FETCH_SUGGESTIONS, FETCH_CITY_LOCATION, FETCH_WEATHER_QUALITY } from '../../../actions/actionsTypes';


describe('Search Actions', () => {
  const mock = new MockAdapter(axios);
  mock.onAny().reply(200);

  describe('when creating fetchSuggestions action', () => {
    const query = 'somequery';
    const expectedAction = {
      type: FETCH_SUGGESTIONS,
      payload: api.fetchSuggestions(query),
    };

    it('should create the action fetchSuggestions', () => {
      expect(fetchSuggestions(query)).toEqual(expectedAction);
    });
  });

  describe('when creating fetchCityLocation action', () => {
    const query = 'somequery';
    const expectedAction = {
      type: FETCH_CITY_LOCATION,
      payload: api.fetchCityLocation(query),
    };

    it('should create the action fetchCityLocation', () => {
      expect(fetchCityLocation(query)).toEqual(expectedAction);
    });
  });

  describe('when creating fetchWeatherQuality action', () => {
    const query = { lat: 34, lng: 30 };
    const expectedAction = {
      type: FETCH_WEATHER_QUALITY,
      payload: api.fetchWeatherQuality(query),
    };

    it('should create the action fetchWeatherQuality', () => {
      expect(fetchWeatherQuality(query)).toEqual(expectedAction);
    });
  });
});
