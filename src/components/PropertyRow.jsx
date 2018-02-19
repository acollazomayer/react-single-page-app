import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Well, Col, ControlLabel } from 'react-bootstrap';

class PropertyRow extends Component {
  render() {
    return (
      <Well bsSize="small">
        <Col xs={3}>
          <ControlLabel>
            {this.props.title}
          </ControlLabel>
        </Col>
        {this.props.message}
      </Well>
    );
  }
}

export default PropertyRow;

PropertyRow.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
