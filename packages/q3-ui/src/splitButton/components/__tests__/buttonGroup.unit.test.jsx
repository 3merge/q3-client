import React from 'react';
import ButtonGroupMui from '@material-ui/core/ButtonGroup';
import CircularProgress from '@material-ui/core/CircularProgress';
import ButtonGroup from '../buttonGroup';

const props = {
  id: '1',
  toggleOpenState: jest.fn(),
  onClick: jest.fn(),
  anchorRef: { current: null },
  label: 'Foo',
};

describe('"ButtonGroup"', () => {
  it('should disable the button while loading', () =>
    expect(
      global
        .shallow(<ButtonGroup {...props} loading />)
        .find(ButtonGroupMui)
        .props(),
    ).toHaveProperty('disabled', true));

  it('should show loading indicator', () =>
    expect(
      global
        .shallow(<ButtonGroup {...props} loading />)
        .find(CircularProgress),
    ).toHaveLength(1));
});
