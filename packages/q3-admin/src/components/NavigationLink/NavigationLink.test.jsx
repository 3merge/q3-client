import React from 'react';
import { Link } from '@reach/router';
import NavigationLink from './NavigationLink';

describe('NavigationLink', () => {
  const renderLink = (props) =>
    global
      .mount(<NavigationLink label="Foo" {...props} />)
      .find(Link)
      .exists();

  it('should not render a link', () =>
    expect(renderLink()).toBeFalsy());

  it('should render a link', () =>
    expect(renderLink({ to: '/' })).toBeTruthy());
});
