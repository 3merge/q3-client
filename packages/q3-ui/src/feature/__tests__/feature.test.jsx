import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Media } from '..';

describe('Feature', () => {
  describe('"Media"', () => {
    it('should render image', () => {
      const el = global
        .shallow(<Media imgSrc="https://google.ca" />)
        .find(LazyLoadImage);
      expect(el).toHaveLength(1);
    });

    it('should not render image', () => {
      const el = global
        .shallow(<Media />)
        .find(LazyLoadImage);
      expect(el).toHaveLength(0);
    });
  });
});
