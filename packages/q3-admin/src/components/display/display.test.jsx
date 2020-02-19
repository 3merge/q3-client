import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Display from '.';

const props = {
  errorLabel: 'error',
};

describe('Display', () => {
  it('should render loading icon', () => {
    expect(
      global
        .shallow(<Display loading {...props} />)
        .find(CircularProgress),
    ).toHaveLength(1);
  });

  it('should render error text', () => {
    expect(
      global.shallow(<Display error {...props} />).text(),
    ).toMatch(props.errorLabel);
  });

  it('should render children', () => {
    expect(
      global
        .shallow(
          <Display {...props}>
            <div />
          </Display>,
        )
        .find('div'),
    ).toHaveLength(1);
  });
});
