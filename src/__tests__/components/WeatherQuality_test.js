import React from 'react';
import renderer from 'react-test-renderer';
import WeatherQuality from '../../components/WeatherQuality';

describe('WeatherQuality Component', () => {

  describe('when there is an error', () => {
    const props = {
      isFetching: false,
      city: 'Paris',
      weatherState: {
        color: 'white',
        breezometerAqi: '19',
        breezometerDescription: 'Poor Air Quality',
        dominantPollutantCanonicalName: 'co2',
        dominantPollutantDescription: 'This is risky',
      },
      error: {
        message: 'someerror',
      },
    };
    const wrapper = renderer.create(<WeatherQuality {...props} />);

    it('should render the error message', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('When is fetching', () => {
    const props = {
      isFetching: true,
      city: 'Paris',
      weatherState: {
        color: 'white',
        breezometerAqi: '19',
        breezometerDescription: 'Poor Air Quality',
        dominantPollutantCanonicalName: 'co2',
        dominantPollutantDescription: 'This is risky',
      },
    };
    const wrapper = renderer.create(<WeatherQuality {...props} />);

    it('should render the spinner', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });

  describe('When has fetched', () => {
    const props = {
      isFetching: false,
      city: 'Paris',
      weatherState: {
        color: 'white',
        breezometerAqi: '19',
        breezometerDescription: 'Poor Air Quality',
        dominantPollutantCanonicalName: 'co2',
        dominantPollutantDescription: 'This is risky',
      },
    };
    const wrapper = renderer.create(<WeatherQuality {...props} />);

    it('should render the weather quality', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});
