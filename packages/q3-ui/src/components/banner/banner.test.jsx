import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {
  materialShallow,
  materialMount,
} from '../../helpers/testUtils';
import { BannerBase, FeaturedPhotoBanner, Title } from '.';

const Child = () => null;

describe('Title', () => {
  it('should accept a string', () => {
    const mounted = materialShallow(Title, {
      title: 'Foo',
    });
    expect(mounted.text()).toBe('Foo');
  });

  it('should accept a function', () => {
    const mounted = materialShallow(Title, {
      title: () => 'Bar',
    });
    expect(mounted.text()).toBe('Bar');
  });
});

describe('BannerBase', () => {
  it('should assign styles', () => {
    const mounted = materialShallow(BannerBase, {
      children: <Child />,
      style: {
        backgroundColor: 'red',
      },
    });
    expect(mounted.find(Child)).toHaveLength(1);
    expect(
      mounted
        .find(Box)
        .first()
        .prop('style'),
    ).toMatchObject({
      backgroundColor: 'red',
    });
  });
});

describe('FeaturedImageBanner', () => {
  const defaultProps = {
    children: <Child />,
    imgSrc: 'https://pic.net',
    title: 'Title',
    flip: true,
  };

  it('should render image first', () => {
    const mounted = materialMount(
      FeaturedPhotoBanner,
      defaultProps,
    );
    const container = mounted.find(Grid);
    expect(container.first().props()).toHaveProperty(
      'direction',
      'row-reverse',
    );
  });
});
