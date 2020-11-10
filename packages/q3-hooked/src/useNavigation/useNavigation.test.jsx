import React from 'react';
import {
  filterByVisibility,
  recursivelyRenderMenuItems,
} from './useNavigation';
import {
  isPartialMatch,
  getPartialMatch,
  getParentMatch,
} from './helpers';

const Tree = (props) => <div {...props} />;
const Link = (props) => <div {...props} />;

const genLinkItem = (props) => ({
  label: 'Test',
  visible: true,
  to: '/',
  ...props,
});

const items = [
  {},
  { visible: false, to: '/foo' },
  {
    visible: false,
    nestedMenuItems: [
      genLinkItem({ to: '/hello/there' }),
      genLinkItem({ to: '/hello/here' }),
    ],
  },
];

const lists = items.map(genLinkItem);

const extendedLists = items.concat([
  {
    label: 'Parent Match',
    to: '/parent',
    nestedMenuItems: [
      genLinkItem({ to: '/parent/1' }),
      genLinkItem({ to: '/parent/2' }),
    ],
  },
]);

describe('useNavigation', () => {
  describe('"Admin>isPartialMatch"', () => {
    it('should match without leading', () =>
      expect(isPartialMatch('/foo', 'foo')).toBeTruthy());

    it('should match parent directory', () =>
      expect(
        isPartialMatch('/app/foo', 'foo'),
      ).toBeTruthy());

    it('should match subdirectories', () =>
      expect(
        isPartialMatch('/foo', '/foo/123'),
      ).toBeTruthy());

    it('should not match', () =>
      expect(isPartialMatch('/foo', 'bar')).toBeFalsy());

    it('should partially match location', () => {
      expect(
        getPartialMatch('/hello/there', lists),
      ).toEqual(['/hello/there']);
    });

    it('should get parent matches', () => {
      expect(
        getParentMatch('/parent', extendedLists),
      ).toEqual(['Parent Match']);
    });

    it('should return empty array when no parent match', () => {
      expect(
        getParentMatch('/no-parent', extendedLists),
      ).toEqual([]);
    });
  });
});

describe('Navigation', () => {
  it('should filter out invisible elements', () => {
    expect(filterByVisibility(lists)).toHaveLength(2);
  });

  it('should recursively render menu items', () => {
    const result = recursivelyRenderMenuItems(lists)(
      Tree,
      Link,
    );
    expect(result).toHaveLength(3);
    expect(result[2].props.children).not.toBeNull();
    result
      .slice(0, 2)
      .forEach((x) => expect(x.props.children).toBeNull());
  });
});
