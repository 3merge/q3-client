import React from 'react';
import Typography from '@material-ui/core/Typography';
import SubHeader from '.';

describe('List/ListSubHeader', () => {
  it('should not render title', () =>
    expect(
      global.shallow(<SubHeader />).find(Typography),
    ).toHaveLength(0));

  it('should render title', () =>
    expect(
      global
        .shallow(<SubHeader title="Show me!" />)
        .find(Typography),
    ).toHaveLength(1));
});
