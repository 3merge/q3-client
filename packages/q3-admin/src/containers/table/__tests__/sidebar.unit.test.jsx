import React from 'react';
import Grid from '@material-ui/core/Grid';
import Sidebar from '../sidebar';
import EmptyView from '../../../components/empty';

describe('List sidebar', () => {
  it('should return children without an aside fn', () => {
    expect(
      global
        .shallow(
          <Sidebar>
            <EmptyView />
          </Sidebar>,
        )
        .find(Grid),
    ).toHaveLength(0);
  });

  it('should return children wrapped in a grid', () => {
    const renderer = jest.fn().mockReturnValue('RENDERED');
    expect(
      global
        .shallow(
          <Sidebar renderAside={renderer}>
            <EmptyView />
          </Sidebar>,
        )
        .find(Grid).length,
    ).toBeGreaterThan(1);
    expect(renderer).toHaveBeenCalled();
  });
});
