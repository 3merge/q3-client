import React from 'react';
import {
  isPartialMatch,
  filterByVisibility,
  recursivelyRenderMenuItems,
  getPartialMatch,
} from './useNavigation';

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
      genLinkItem({ to: '/hi/there' }),
      genLinkItem({ to: '/hi/here' }),
    ],
  },
];

const lists = items.map(genLinkItem);

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

    it.only('should partially match location', () => {
      expect(
        getPartialMatch({ pathname: '/hello' })(lists),
      ).toEqual(['/hello/there', '/hello/here']);
    });
  });
});

jest.mock('@material-ui/core/Hidden', () =>
  // this component blocks mount from finding nested components
  jest.fn().mockImplementation(({ children }) => children),
);

// const countLinks = (menuItems, expectedOutput) => {
//   const el = global.mount(
//     <Navigation menuItems={menuItems} />,
//   );

//   return expect(el.find(TreeItem)).toHaveLength(
//     expectedOutput,
//   );
// };

describe('Navigation', () => {
  it('should filter out invisible elements', () => {
    expect(filterByVisibility(lists)).toHaveLength(2);
  });

  it('should recursively render menu items', () => {
    const result = recursivelyRenderMenuItems(
      Tree,
      Link,
    )(lists);
    expect(result).toHaveLength(3);
    expect(result[2].props.children).toBeDefined();
    result
      .slice(0, 2)
      .forEach((x) => expect(x.props.children).toBeNull());
  });
});
