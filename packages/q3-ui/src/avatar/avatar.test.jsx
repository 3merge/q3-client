import React from 'react';
import Add from '@material-ui/icons/Add';
import Avatar from '.';

describe('Avatar', () => {
  it('should parse the first letter', () =>
    expect(
      global.shallow(<Avatar word="Mike" />).text(),
    ).toBe('M'));

  it('should render Icon', () =>
    expect(
      global
        .shallow(<Avatar word="Mike" icon={Add} />)
        .find(Add),
    ).toHaveLength(1));
});
