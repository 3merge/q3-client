import React from 'react';
import Button from '@material-ui/core/Button';
import Image from 'gatsby-image';
import { omit } from 'lodash';
import CallToAction, { CallToActionButton } from '..';
import fixture from '../__fixtures__';

describe('CallToAction', () => {
  it('should not render an image', () => {
    const el = global
      .shallow(
        <CallToAction {...omit(fixture, ['fluid'])} />,
      )
      .find(Image);
    expect(el).toHaveLength(0);
  });

  it('should render an image', () => {
    const el = global
      .shallow(<CallToAction {...fixture} />)
      .find(Image);
    expect(el).toHaveLength(1);
  });
});

describe('CallToActionButton', () => {
  it('should return nothing', () => {
    const el = global
      .shallow(<CallToActionButton />)
      .find(Button);
    expect(el).toHaveLength(0);
  });

  it('should return as an outlined Button', () => {
    const el = global
      .shallow(
        <CallToActionButton to="/" text="Hey!" withColor />,
      )
      .find(Button)
      .props();
    expect(el).toMatchObject({
      color: 'inherit',
      variant: 'outlined',
    });
  });
});
