import React from 'react';
import {
  getBoolIcon,
  getContent,
  isLast,
  Attributes,
} from './Attribute';

describe('Attribute', () => {
  describe('"getBoolIcon"', () => {
    it('should return outline', () => {
      expect(getBoolIcon(true).type.displayName).toMatch(
        'Outline',
      );
    });

    it('should return block', () => {
      expect(getBoolIcon(false).type.displayName).toMatch(
        'Block',
      );
    });
  });

  describe('"getBoolIcon"', () => {
    it('should return icon', () => {
      expect(getContent(true, 'checkbox')).toHaveProperty(
        'type',
      );
    });

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
