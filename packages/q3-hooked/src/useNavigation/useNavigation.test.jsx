import React from 'react';
import { useLocation } from '@reach/router';
import useNavigation from './useNavigation';
import {
  isPartialMatch,
  getPartialMatch,
  getParentMatch,
} from './helpers';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

beforeEach(() => {
  useLocation.mockClear();
});

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

// describe('useNavigation', () => {
//   describe('"Admin>isPartialMatch"', () => {
//     it('should match without leading', () =>
//       expect(isPartialMatch('/foo', 'foo')).toBeTruthy());

//     it('should match parent directory', () =>
//       expect(
//         isPartialMatch('/app/foo', 'foo'),
//       ).toBeTruthy());

//     it('should match subdirectories', () =>
//       expect(
//         isPartialMatch('/foo', '/foo/123'),
//       ).toBeTruthy());

//     it('should not match', () =>
//       expect(isPartialMatch('/foo', 'bar')).toBeFalsy());

//     it('should partially match location', () => {
//       expect(
//         getPartialMatch('/hello/there', lists),
//       ).toEqual(['/hello/there']);
//     });

//     it('should get parent matches', () => {
//       expect(
//         getParentMatch('/parent', extendedLists),
//       ).toEqual(['Parent Match']);
//     });

//     it('should return empty array when no parent match', () => {
//       expect(
//         getParentMatch('/no-parent', extendedLists),
//       ).toEqual([]);
//     });
//   });
// });

// describe('Navigation', () => {
//   it('should filter out invisible elements', () => {
//     expect(filterByVisibility(lists)).toHaveLength(2);
//   });

//   it('should recursively render menu items', () => {
//     const result = recursivelyRenderMenuItems(lists)(
//       Tree,
//       Link,
//     );
//     expect(result).toHaveLength(3);
//     expect(result[2].props.children).not.toBeNull();
//     result
//       .slice(0, 2)
//       .forEach((x) => expect(x.props.children).toBeNull());
//   });
// });

const parentWithoutNests = [
  genLinkItem({
    label: 'Parent Without Nests',
    to: '/parentWithoutNests',
    icon: 'icon',
  }),
];

const parentWithNests = [
  genLinkItem({
    label: 'Parent With Nests',
    icon: 'icon',
    nestedMenuItems: [
      {
        label: 'Nest 1',
        icon: 'icon',
        nestedMenuItems: [
          {
            label: 'Nest 1',
            icon: 'icon',
            to: '/sub-nest1',
          },
        ],
      },
      {
        label: 'Nest 2',
        icon: 'icon',
        to: '/nest2',
      },
      {
        label: 'Sub-Nest 2',
        icon: 'icon',
        nestedMenuItems: [
          {
            label: 'Nest 1',
            icon: 'icon',
            to: '/sub-nest1',
          },
        ],
      },
    ],
  }),
];

describe('New useNavigation', () => {
  it('should return transform data as a parent without nests', () => {
    useLocation.mockReturnValue({
      pathname: '/parentWithoutNests',
    });
    expect(
      useNavigation(parentWithoutNests).navigationMenus[0],
    ).toEqual({
      label: 'Parent Without Nests',
      to: '/parentWithoutNests',
      icon: 'icon',
      isSelected: true,
    });
  });

  it('should transform data as a parent with nests', () => {
    useLocation.mockReturnValue({
      pathname: '/nest1',
    });

    expect(
      useNavigation(parentWithNests).navigationMenus[0],
    ).toMatchObject({
      label: 'Parent With Nests',
      icon: 'icon',
      isExpanded: false,
      nestedMenuItems: [
        {
          label: 'Nest 1',
          icon: 'icon',
          to: '/nest1',
          isSelected: true,
        },
        {
          label: 'Nest 2',
          icon: 'icon',
          to: '/nest2',
          isSelected: false,
        },
      ],
    });
  });

  let spy;

  beforeEach(() => {
    spy = jest.spyOn(React, 'useState');
  });

  it('should inherit isExpanded from nested menu items', () => {
    spy.mockReturnValue(['1-3', jest.fn()]);
    useLocation.mockReturnValue({
      pathname: '/',
    });

    const {
      navigationMenus: [menuItems],
    } = useNavigation(parentWithNests);

    const checkNestedMenuItems = (
      index,
      expectedExpandedValue,
    ) =>
      expect(menuItems).toHaveProperty(
        index === null
          ? 'isExpanded'
          : `nestedMenuItems.${index}.isExpanded`,
        expectedExpandedValue,
      );

    checkNestedMenuItems(null, true);
    checkNestedMenuItems(0, false);
    checkNestedMenuItems(2, true);
  });

  it.only('should set the expanded value', () => {
    const setState = jest.fn();
    spy.mockReturnValue(['', setState]);
    useLocation.mockReturnValue({
      pathname: '/',
    });

    const {
      navigationMenus: [
        {
          nestedMenuItems: [, , item],
        },
      ],
    } = useNavigation(parentWithNests);

    item.expand();
    expect(setState).toHaveBeenCalledWith('1-3');
  });
});
