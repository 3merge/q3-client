import React from 'react';
import {
  getLinkAttributes,
  withCriticalProp,
} from './utils';

describe('getLinkAttributes', () => {
  it('should return @reach/router Link', () => {
    expect(getLinkAttributes('/')).toMatchObject({
      component: expect.any(Object),
      to: '/',
    });
  });

  it('should NOT prepend forward slash on @reach/router Link', () => {
    expect(getLinkAttributes('demo')).toMatchObject({
      component: expect.any(Object),
      to: 'demo',
    });
  });

  it('should return with target attributes', () => {
    expect(
      getLinkAttributes('https://www.example.com'),
    ).toMatchObject({
      href: '//www.example.com',
      target: '_blank',
      rel: 'noopener noreferrer',
    });
  });
});

describe('withCriticalProp', () => {
  it('should conditionally render', () => {
    const Sample = () => 'Renderer';
    const Wrapped = withCriticalProp(Sample, 'render');
    // eslint-disable-next-line
    expect(global.shallow(<Wrapped />)).toEqual({});
    expect(
      global.shallow(<Wrapped render />).name(),
    ).toMatch('Sample');
  });
});
