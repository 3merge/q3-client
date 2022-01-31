import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Breadcrumbs from './Breadcrumbs';

let spy;

jest.mock('./styles', () => jest.fn().mockReturnValue({}));

beforeEach(() => {
  spy = jest.spyOn(React, 'useContext');
});

describe('Breadcrumbs', () => {
  it('should not render breadcrumbs without an id', () => {
    spy.mockReturnValue({
      id: null,
    });

    expect(
      global
        .shallow(<Breadcrumbs />)
        .find(Typography)
        .exists(),
    ).toBeFalsy();
  });

  it('should render resource name', () => {
    spy.mockReturnValue({
      id: 1,
      resourceName: 'foo',
      directoryPath: '/foo/',
    });

    const el = global.shallow(<Breadcrumbs />);
    expect(el.find(Typography).text()).toMatch('foo');
    expect(el.find(MuiLink).last().props()).toHaveProperty(
      'to',
      '/foo/',
    );
  });
});
