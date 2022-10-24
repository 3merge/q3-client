import { exists } from 'q3-ui-test-utils/lib/enzymeUtils';
import React from 'react';
import { Grid } from '@material-ui/core';
import Pattern, {
  PatternError,
  PatternLoading,
} from './Pattern';

describe('Pattern', () => {
  it('should render loading component', () => {
    exists(
      global
        .shallow(<Pattern loading title="test" />)
        .find(PatternLoading),
    );
  });

  it('should render error component', () => {
    exists(
      global
        .shallow(<Pattern error title="test" />)
        .find(PatternError),
    );
  });

  it('should render child', () => {
    exists(
      global
        .shallow(
          <Pattern title="test">
            <div id="success" />
          </Pattern>,
        )
        .find('#success'),
    );
  });

  test.each([
    [undefined, { md: 12 }],
    ['xl', { md: 12 }],
    ['lg', { md: 8 }],
    ['md', { md: 6 }],
    ['sm', { md: 4 }],
    ['xs', { md: 3 }],
  ])('.getGridItemDimensions', (size, expectedProps) => {
    expect(
      global
        .shallow(
          <Pattern title="test" size={size}>
            <div id="success" />
          </Pattern>,
        )
        .find(Grid)
        .props(),
    ).toEqual({
      children: expect.anything(),
      item: true,
      xs: 12,
      ...expectedProps,
    });
  });
});
