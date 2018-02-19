import deepFreeze from 'deep-freeze';
import searchReducer from '../../../reducers/SearchReducer';
import { getStoredArray } from '../../../lib/stack';
import {
  FETCH_SUGGESTIONS_FULFILLED,
  FETCH_SUGGESTIONS_REJECTED,
  FETCH_WEATHER_QUALITY_FULFILLED,
  FETCH_WEATHER_QUALITY_REJECTED,
  FETCH_CITY_LOCATION_PENDING,
  FETCH_CITY_LOCATION_FULFILLED,
  FETCH_CITY_LOCATION_REJECTED,
} from '../../../actions/actionsTypes';

describe('Search Reducer', () => {
  const keyName = 'somename';

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

  describe('when an irrelevant action is dispatched', () => {
    const irrelevantAction = { type: 'IRRELEVANT_ACTION' };

    deepFreeze(defaultState);
    deepFreeze(irrelevantAction);

    it('should not affect the state', () => {
      expect(searchReducer(defaultState, irrelevantAction)).toEqual(defaultState);
    });
  });

  describe('FETCH_SUGGESTIONS', () => {

    describe('when a FETCH_SUGGESTIONS_FULFILLED action is dispatched', () => {
      const payload = {
        data: {
          predictions: [
            { description: 'Paris' },
          ],
        },
      };

      const fetchSuggestionsFulfilledAction = {
        payload,
        type: FETCH_SUGGESTIONS_FULFILLED,
      };

      deepFreeze(defaultState);
      deepFreeze(fetchSuggestionsFulfilledAction);

      it('should set the suggestion array with suggestions', () => {
        const newState = searchReducer(defaultState, fetchSuggestionsFulfilledAction);
        expect(newState).toEqual({ ...defaultState, suggestions: ['Paris'] });
      });
    });

    describe('when a FETCH_SUGGESTIONS_REJECTED action is dispatched', () => {
      const payload = {
        data: {
          status: 'someerrorstatus',
        },
      };

      const fetchSuggestionsRejectedAction = {
        payload,
        type: FETCH_SUGGESTIONS_REJECTED,
      };

      deepFreeze(defaultState);
      deepFreeze(fetchSuggestionsRejectedAction);

      it('should set an error', () => {
        const newState = searchReducer(defaultState, fetchSuggestionsRejectedAction);
        expect(newState).toEqual(
          { ...defaultState,
            error: fetchSuggestionsRejectedAction.payload,
          });
      });
    });

    describe('FETCH_CITY_LOCATION', () => {
      describe('when a FETCH_CITY_LOCATION_PENDING action is dispatched', () => {
        const fetchCityLocationPendingAction = {
          type: FETCH_CITY_LOCATION_PENDING,
        };

        deepFreeze(defaultState);
        deepFreeze(fetchCityLocationPendingAction);

        it('should set the suggestion array with suggestions', () => {
          const newState = searchReducer(defaultState, fetchCityLocationPendingAction);
          expect(newState).toEqual({ ...defaultState, isFetching: true, error: null, weatherState: {}, city: '' });
        });
      });

      describe('when a FETCH_CITY_LOCATION_FULFILLED action is dispatched', () => {
        const payload = {
          data: {
            results: [
              {
                geometry: {
                  location: {
                    lat: 23,
                    lng: 45,
                  },
                },
                formatted_address: 'Paris',
              },
            ],
          },
        };

        const fetchCityLocationFulfilledAction = {
          payload,
          type: FETCH_CITY_LOCATION_FULFILLED,
        };

        deepFreeze(defaultState);
        deepFreeze(fetchCityLocationFulfilledAction);

        it('should set the suggestion array with suggestions', () => {
          const newState = searchReducer(defaultState, fetchCityLocationFulfilledAction);
          expect(newState).toEqual({ ...defaultState, cityLocation: { lat: 23, lng: 45 }, city: 'Paris', lastSearches: ['Paris'] });
        });
      });

      describe('when a FETCH_CITY_LOCATION_REJECTED action is dispatched', () => {
        const payload = {
          data: {
            status: 'someerrorstatus',
          },
        };

        const fetchCityLocationRejectedAction = {
          payload,
          type: FETCH_CITY_LOCATION_REJECTED,
        };

        deepFreeze(defaultState);
        deepFreeze(fetchCityLocationRejectedAction);

        it('should set an error', () => {
          const newState = searchReducer(defaultState, fetchCityLocationRejectedAction);
          expect(newState).toEqual(
            { ...defaultState,
              error: fetchCityLocationRejectedAction.payload,
            });
        });
      });
    });

    describe('FETCH_WEATHER_QUALITY', () => {

      describe('when a FETCH_WEATHER_QUALITY_FULFILLED action is dispatched and its a complete success', () => {
        const payload = {
          data: {
            breezometer_color: 'white',
            breezometer_aqi: '19',
            breezometer_description: 'Poor Air Quality',
            dominant_pollutant_canonical_name: 'co2',
            dominant_pollutant_description: 'This is risky',
          },
        };

        const fetchWeatherQualityFulfilledAction = {
          payload,
          type: FETCH_WEATHER_QUALITY_FULFILLED,
        };

        deepFreeze(defaultState);
        deepFreeze(fetchWeatherQualityFulfilledAction);

        const weatherState = {
          color: 'white',
          breezometerAqi: '19',
          breezometerDescription: 'Poor Air Quality',
          dominantPollutantCanonicalName: 'co2',
          dominantPollutantDescription: 'This is risky',
        };

        it('should set the weatherState object, hasFetched to true and isFetching to false', () => {
          const newState = searchReducer(defaultState, fetchWeatherQualityFulfilledAction);
          expect(newState).toEqual({
            ...defaultState,
            weatherState,
            hasFetched: true,
            isFetching: false,
          });
        });
      });

      describe('when a FETCH_WEATHER_QUALITY_FULFILLED action is dispatched and has an error', () => {
        const payload = {
          data: {
            error: {
              error_code: 23,
              message: 'somemessage',
              info: 'someinfo',
            },
          },
        };

        const fetchWeatherQualityFulfilledAction = {
          payload,
          type: FETCH_WEATHER_QUALITY_FULFILLED,
        };

        deepFreeze(defaultState);
        deepFreeze(fetchWeatherQualityFulfilledAction);

        it('should set the error object, hasFetched to true and isFetching to false', () => {
          const newState = searchReducer(defaultState, fetchWeatherQualityFulfilledAction);
          expect(newState).toEqual({
            ...defaultState,
            error: fetchWeatherQualityFulfilledAction.payload.data.error,
            hasFetched: true,
            isFetching: false,
          });
        });
      });

      describe('when a FETCH_WEATHER_QUALITY_REJECTED action is dispatched', () => {
        const error = {
          response: {
            data: {
              error: {
                error_code: 23,
                message: 'somemessage',
                info: 'someinfo',
              },
            },
          },
        };

        const fetchWeatherQualityRejectedAction = {
          type: FETCH_WEATHER_QUALITY_REJECTED,
          payload: error,
        };

        deepFreeze(defaultState);
        deepFreeze(fetchWeatherQualityRejectedAction);

        it('should set an error', () => {
          const newState = searchReducer(defaultState, fetchWeatherQualityRejectedAction);
          expect(newState).toEqual(
            { ...defaultState,
              error: fetchWeatherQualityRejectedAction.payload.response.data.error,
            });
        });
      });
    });
  });
});
