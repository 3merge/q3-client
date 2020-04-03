import React from 'react';
import Notice from './notice';
import Link from '../link';

const getLinkLength = (to) =>
  global
    .shallow(<Notice content="Foo" to={to} />)
    .find(Link).length;

describe('Notice', () => {
  it('should render a Link if provided with a "to" address', () =>
    expect(getLinkLength('/bar')).toBe(1));

  it('should render a Link if provided with a "to" address', () =>
    expect(getLinkLength()).toBe(0));
});
