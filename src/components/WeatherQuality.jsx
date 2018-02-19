import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import PropertyRow from './PropertyRow';
import Spinner from './Spinner';
import en from '../locales/en';
import '../styles/airquality.css';


class WeatherQuality extends Component {
  renderComponentBody() {
    if (this.props.error) return this.props.error.message;
    if (this.props.isFetching) {
      return (
        <Spinner />
      );
    }
    const {
      breezometerAqi,
      breezometerDescription,
      dominantPollutantCanonicalName,
      dominantPollutantDescription,
    } = { ...this.props.weatherState };

    return (
      <div>
        <PropertyRow
          title={en.AirQualityMessage}
          message={breezometerDescription}
        />
        <PropertyRow
          title={en.AirQualityIndex}
          message={breezometerAqi}
        />
        <PropertyRow
          title={en.DominantPolutant}
          message={dominantPollutantCanonicalName}
        />
        <PropertyRow
          title={en.PolutantDescription}
          message={dominantPollutantDescription}
        />
      </div>
    );
  }

  render() {
    const { color } = { ...this.props.weatherState };

    const title = (
      <h1>
        {this.props.city}
        <span
          className='circle-style'
          style={{
            color,
          }}
        >
          &#8226;
        </span>
      </h1>
    );

    return (
      <Panel header={title} bsStyle="info">
        {this.renderComponentBody()}
      </Panel>
    );
  }
}

export default WeatherQuality;

WeatherQuality.propTypes = {
  weatherState: PropTypes.shape().isRequired,
  city: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.shape(),
};

WeatherQuality.defaultProps = {
  error: null,
};
