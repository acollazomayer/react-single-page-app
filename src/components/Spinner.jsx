import React, { Component } from 'react';
import spinner from '../images/spinner.svg';
import '../styles/spinner.css';

class Spinner extends Component {
  render() {
    return (
      <img className='spinner' src={spinner} alt='loading' />
    );
  }
}

export default Spinner;
