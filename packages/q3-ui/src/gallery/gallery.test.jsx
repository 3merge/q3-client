import React from 'react';
import Image from 'gatsby-image';
import Gallery from './gallery';
import { people } from './__fixtures__';

describe('Gallery', () => {
  it('should render each photo in the list', () => {
    const el = global
      .shallow(<Gallery photos={people} />)
      .find(Image);
    expect(el.length).toBe(people.length);
  });
});
