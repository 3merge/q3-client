import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import useNavigation from './useNavigation';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

let spy;
let useEffect;

beforeEach(() => {
  spy = jest.spyOn(React, 'useState');
  useEffect = jest.spyOn(React, 'useEffect');
  useLocation.mockClear();
  useNavigate.mockClear();
});

const genLinkItem = (props) => ({
  label: 'Test',
  visible: true,
  to: '/',
  ...props,
});

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
    const setState = jest.fn();
    useLocation.mockReturnValue({
      pathname: '/parentWithoutNests',
    });
    useEffect.mockImplementation(() => {});
    spy.mockReturnValue(['', setState]);

    expect(
      useNavigation(parentWithoutNests).navigationMenus[0],
    ).toEqual(
      expect.objectContaining({
        label: 'Parent Without Nests',
        to: '/parentWithoutNests',
        icon: 'icon',
        isSelected: true,
        nodeId: '1',
        role: 'link',
        onClick: expect.any(Function),
      }),
    );
  });

  it('should transform data as a parent with nests', () => {
    useLocation.mockReturnValue({
      pathname: '/nest1',
    });

    const setState = jest.fn();
    useLocation.mockReturnValue({
      pathname: '/parentWithoutNests',
    });
    useEffect.mockImplementation(() => {});
    spy.mockReturnValue(['', setState]);

    expect(
      useNavigation(parentWithNests).navigationMenus[0],
    ).toEqual(
      expect.objectContaining({
        label: 'Parent With Nests',
        icon: 'icon',
        isExpanded: false,
        nodeId: '1',
        nestedMenuItems: expect.any(Array),
        onClick: expect.any(Function),
      }),
    );
  });

  it('should inherit isExpanded from nested menu items', () => {
    spy.mockReturnValue(['1-3', jest.fn()]);
    useLocation.mockReturnValue({
      pathname: '/',
    });
    useEffect.mockImplementation(() => {});

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

  it('should set the expanded value', () => {
    const setState = jest.fn();
    spy.mockReturnValue(['', setState]);
    useLocation.mockReturnValue({
      pathname: '/',
    });
    useEffect.mockImplementation(() => {});

    const {
      navigationMenus: [
        {
          nestedMenuItems: [, , item],
        },
      ],
    } = useNavigation(parentWithNests);

    expect(item.nodeId).toBe('1-3');
  });
});
