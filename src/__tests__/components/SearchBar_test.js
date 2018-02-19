import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';

describe('SearchBar Component', () => {
  const props = {
    suggestions: [],
    cityLocation: {},
    lastSearches: [],
    fetchSuggestions: () => {},
    fetchWeatherQuality: () => {},
    fetchCityLocation: () => {},
  };

  const wrapper = shallow(<SearchBar {...props} />);

  describe('When it renders', () => {

    it('should render without crashing', () => {
      shallow(<SearchBar {...props} />);
    });
  });

  describe('when the input is empty', () => {
    wrapper.setState({ query: '' });
    const button = wrapper.find(Button);

    it('should render the search button disabled', () => {
      expect(button.prop('disabled')).toEqual(true);
    });
  });

  describe('when there is an input', () => {
    wrapper.setState({ query: 'someinput' });
    const button = wrapper.find(Button);

    it('should render the button not disabled', () => {
      expect(button.prop('disabled')).toEqual(false);
    });
  });
});
