import React from 'react';
import Typography from '@material-ui/core/Typography';
import Header from '.';

describe('Header', () => {
  it('should render title and description elements', () => {
    const wrap = global
      .shallow(<Header title="Foo" description="Bar" />)
      .find(Typography);
    expect(wrap).toHaveLength(2);
  });

  it('should render overline if provided a name', () => {
    const wrap = global
      .shallow(
        <Header
          title="Foo"
          description="Bar"
          name="Over!"
        />,
      )
      .find(Typography);
    expect(wrap).toHaveLength(3);
    expect(wrap.first().props()).toHaveProperty(
      'variant',
      'overline',
    );
  });
});
