import React from 'react';
import { Paper } from '@material-ui/core';
import { containerSpec } from 'q3-ui-test-utils/lib/enzymeUtils';
import Tooltip from './Tooltip';

const payload = [
  {
    name: 'Testing',
    payload: {},
  },
];

describe('Tooltip', () => {
  test.each([
    [{}],
    [{ active: true, label: 'Testing' }],
    [{ label: 'Testing', payload }],
    [{ active: true, payload }],
  ])('should return empty container', (props) => {
    containerSpec(
      global.shallow(<Tooltip {...props} />),
    ).toBeEmpty();
  });

  it('should render Paper', () =>
    expect(
      global
        .shallow(
          <Tooltip
            active
            label="testing"
            payload={payload}
          />,
        )
        .find(Paper),
    ).toHaveLength(1));
});
