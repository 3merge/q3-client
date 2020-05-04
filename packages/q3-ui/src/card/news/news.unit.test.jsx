import React from 'react';
import Typography from '@material-ui/core/Typography';
import Image from 'gatsby-image';
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
        global.shallow(<CardImage alt="alt" />).find(Image),
      ).toHaveLength(0));

    it('should assign src/alt attributes', () => {
      const img = global
        .shallow(
          <CardImage alt="alt" fluid={{ src: 'src' }} />,
        )
        .find(Image);

      expect(img).toHaveLength(1);
      expect(img.props()).toMatchObject({
        alt: 'alt',
        fluid: expect.any(Object),
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
