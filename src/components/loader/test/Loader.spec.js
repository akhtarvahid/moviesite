import React from 'react';
import renderer from 'react-test-renderer';
import Loader from '../Loader';

test('should render Loader Component', () => {
    const tree = renderer
        .create(<Loader />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
