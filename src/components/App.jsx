import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../containers/SearchBar';
import WeatherQuality from '../components/WeatherQuality';
import '../styles/app.css';

class App extends Component {

  renderAirQuality() {
    const { hasFetched, city, isFetching, weatherState, error } = this.props;

    if (!hasFetched && !isFetching) return null;
    return (
      <div className='air-quality-container'>
        <WeatherQuality
          city={city}
          weatherState={weatherState}
          isFetching={isFetching}
          error={error}
        />
      </div>
    );
  }

  render() {
    return (
      <div className='background'>
        <div className='search-bar-container'>
          <SearchBar />
        </div>
        {this.renderAirQuality()}
      </div>
    );
  }
}

export default App;

App.propTypes = {
  hasFetched: PropTypes.bool.isRequired,
  city: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  weatherState: PropTypes.shape().isRequired,
  error: PropTypes.shape(),
};

App.defaultProps = {
  error: null,
};
