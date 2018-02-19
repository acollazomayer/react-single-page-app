import React from 'react';
import { shallow } from 'enzyme';
import App from '../../components/App';
import WeatherQuality from '../../components/WeatherQuality';

describe('App Component', () => {
  const props = {
    hasFetched: false,
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

  describe('when nothing has been searched', () => {
    const wrapper = shallow(<App {...props} />);
    const { city, weatherState } = { ...props };
    const airQuialityWrapper = (
      <WeatherQuality
        city={city}
        weatherState={weatherState}
        isFetching={false}
      />
    );

    it('should not render AirQuality container', () => {
      expect(wrapper.contains(airQuialityWrapper)).toEqual(false);
    });
  });

  describe('when a city has been searched and there is a result', () => {
    const newProps = { ...props, hasFetched: true, isFetching: true };
    const wrapper = shallow(<App {...newProps} />);
    const { city, weatherState } = { ...props };
    const airQuialityWrapper = (
      <WeatherQuality
        city={city}
        weatherState={weatherState}
        isFetching
      />
    );

    it('should render the AirQuality container', () => {
      expect(wrapper.contains(airQuialityWrapper)).toEqual(true);
    });
  });
});
