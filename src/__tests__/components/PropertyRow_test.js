import React from 'react';
import renderer from 'react-test-renderer';
import PropertyRow from '../../components/PropertyRow';

describe('PropertyRow Component', () => {
  const props = {
    title: 'sometitle',
    message: 'somemessage',
  };

  describe('When it renders', () => {
    const wrapper = renderer.create(<PropertyRow {...props} />);

    it('should render with a title and a message', () => {
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});
