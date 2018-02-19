import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Form, InputGroup, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import en from '../locales/en';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getSuggestions() {
    if (this.state.query === '') {
      return this.props.lastSearches;
    }
    return this.props.suggestions;
  }

  handleChange(query) {
    this.setState({ query });
    this.props.fetchSuggestions(query);
  }

  async handleSubmit(e, query) {
    e.preventDefault();
    await this.props.fetchCityLocation(query);
    this.props.fetchWeatherQuality(this.props.cityLocation);
  }

  isButtonDisabled() {
    return this.state.query.length === 0;
  }

  render() {
    const suggestions = this.getSuggestions();

    return (
      <Form onSubmit={e => this.handleSubmit(e, this.state.query)}>
        <InputGroup>
          <Typeahead
            labelKey="name"
            options={suggestions}
            placeholder={en.SearchBarPlaceHolder}
            submitFormOnEnter
            onInputChange={this.handleChange}
          />
          <InputGroup.Button>
            <Button type="submit" disabled={this.isButtonDisabled()}>Search</Button>
          </InputGroup.Button>
        </InputGroup>
      </Form>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  cityLocation: PropTypes.shape().isRequired,
  fetchCityLocation: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func.isRequired,
  fetchWeatherQuality: PropTypes.func.isRequired,
  lastSearches: PropTypes.arrayOf(PropTypes.string).isRequired,
};
