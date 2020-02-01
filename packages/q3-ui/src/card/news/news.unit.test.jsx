import React from 'react';
import Typography from '@material-ui/core/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { DateString, CardImage, Ribbon } from '.';

describe('NewsCard partials', () => {
  describe('"DateString"', () => {
    it('should return empty component', () =>
      expect(global.shallow(<DateString />)).toEqual({}));

    it('should render text', () =>
      expect(
        global
          .shallow(
            <DateString iso={new Date().toISOString()} />,
          )
          .find(Typography),
      ).toHaveLength(1));
  });

  describe('"CardImage"', () => {
    it('should return empty component', () =>
      expect(
        global.shallow(<CardImage alt="foo" />),
      ).toEqual({}));

    it('should assign src/alt attributes', () => {
      const img = global
        .shallow(<CardImage alt="alt" src="src" />)
        .find(LazyLoadImage);

      expect(img).toHaveLength(1);
      expect(img.props()).toMatchObject({
        alt: 'alt',
        src: 'src',
      });
    });
  });

  describe('"Ribbon"', () => {
    it('should return empty component', () =>
      expect(global.shallow(<Ribbon />)).toEqual({}));

    it('should render text', () =>
      expect(
        global.shallow(<Ribbon text="Here" />).find('span'),
      ).toHaveLength(1));
  });
});
