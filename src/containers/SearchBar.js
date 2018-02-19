import { connect } from 'react-redux';

import { fetchSuggestions, fetchWeatherQuality, fetchCityLocation } from '../actions/SearchActions';
import SearchBar from '../components/SearchBar';

function mapStateToProps({ search }) {
  return {
    suggestions: search.suggestions,
    lastSearches: search.lastSearches,
    cityLocation: search.cityLocation,
  };
}

export default connect(mapStateToProps, {
  fetchSuggestions,
  fetchWeatherQuality,
  fetchCityLocation,
})(SearchBar);
