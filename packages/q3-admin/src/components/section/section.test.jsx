import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Sidebar from '.';

const Child = () => null;

describe('Section', () => {
  it('should render loading icon', () => {
    expect(
      global
        .shallow(
          <Sidebar fetching>
            <Child />
          </Sidebar>,
        )
        .find(CircularProgress),
    ).toHaveLength(1);
  });

  it('should render children', () => {
    expect(
      global
        .shallow(
          <Sidebar>
            <Child />
          </Sidebar>,
        )
        .find(Child),
    ).toHaveLength(1);
  });
});
