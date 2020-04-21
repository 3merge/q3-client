import React from 'react';
import {
  getBoolIcon,
  getContent,
  Attributes,
} from './Attribute';

describe('Attribute', () => {
  describe('"getBoolIcon"', () => {
    it('should return outline', () => {
      expect(getBoolIcon(true)).toMatch('Yes');
    });

    it('should return block', () => {
      expect(getBoolIcon(false)).toMatch('No');
    });
  });

  describe('"getBoolIcon"', () => {
    it('should two dashes', () => {
      expect(getContent()).toMatch('--');
    });

    it('should return date', () => {
      expect(getContent(new Date(), 'date')).toEqual(
        expect.any(String),
      );
    });

    it('should return text', () => {
      const foo = 'foo';
      expect(getContent(foo, 'text')).toMatch(foo);
    });
  });

  describe('"Attributes"', () => {
    it('should return custom rendered components', () => {
      const Comp = () => <div />;

      const el = global
        .shallow(
          <Attributes
            show
            attributes={['Foo', 'Bar']}
            isIn={jest.fn()}
            component={Comp}
          />,
        )
        .find(Comp);

      expect(el).toHaveLength(2);
    });

    it('should return nullish on show false', () => {
      const el = global.shallow(
        <Attributes show={false} />,
      );

      expect(el).toEqual({});
    });
  });
});
