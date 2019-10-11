import React from 'react';
import Typography from '@material-ui/core/Typography';
import { materialShallow } from '../_helpers/testUtils';
import Title from '.';

const props = {
  logoSrc: 'logo.png',
  companyName: 'Hooli',
  title: 'Foo',
};

const Child = jest.fn().mockImplementation(() => <div />);

describe('Component', () => {
  it('should render text', () => {
    const mount = materialShallow(Title, props);
    expect(mount.find(Typography).text()).toBe(props.title);
  });

  it('should render children', () => {
    const mount = materialShallow(() => (
      <Title {...props}>
        <Child />
      </Title>
    ));
    expect(mount.find(Child)).toHaveLength(1);
  });
});
