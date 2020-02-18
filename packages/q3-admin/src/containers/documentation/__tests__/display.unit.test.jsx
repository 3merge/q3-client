import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Display from '../display';

describe('Display', () => {
  it('should render loading icon', () => {
    expect(
      global
        .shallow(<Display loading />)
        .find(CircularProgress),
    ).toHaveLength(1);
  });

  it('should render error text', () => {
    expect(
      global.shallow(<Display error />).text(),
    ).toMatch('documentationError');
  });

  it('should render missing text', () => {
    expect(global.shallow(<Display />).text()).toMatch(
      'documentationEmpty',
    );
  });

  it('should render HTML', () => {
    expect(
      global
        .shallow(<Display data={{ foo: 'bar' }} />)
        .find('div')
        .props(),
    ).toHaveProperty(
      'dangerouslySetInnerHTML',
      expect.objectContaining({
        __html: { foo: 'bar' },
      }),
    );
  });
});
