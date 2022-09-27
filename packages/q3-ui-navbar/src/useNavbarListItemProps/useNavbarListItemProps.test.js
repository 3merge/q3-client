import {
  useCallbackMock,
  useMemoMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import { Link } from '@reach/router';
import useNavbarListItemProps from './useNavbarListItemProps';

useCallbackMock();
useMemoMock();

jest.mock('../useToggleWithLocationDefaults', () =>
  jest.fn().mockReturnValue({
    matches: false,
    state: true,
    toggle: jest.fn(),
  }),
);

describe('useNavbarListItemProps', () => {
  it('should create link props', () => {
    expect(useNavbarListItemProps({})).toEqual({
      component: Link,
      disabled: true,
      hasSegments: false,
      matches: false,
      state: true,
      to: '/',
    });
  });

  it('should create link props', () => {
    expect(
      useNavbarListItemProps({
        enableSegments: true,
        to: '/app',
      }),
    ).toEqual({
      component: Link,
      disabled: false,
      hasSegments: false,
      matches: false,
      onContextMenu: expect.any(Function),
      state: true,
      to: '/app',
    });
  });

  it('should create button props', () => {
    expect(
      useNavbarListItemProps({
        enableSegments: true,
        menuId: 'foo',
        segmentId: 'bar',
        segments: [
          {
            label: 1,
          },
        ],
      }),
    ).toEqual({
      'aria-haspopup': 'true',
      'aria-expanded': true,
      'aria-controls': 'foo,bar',
      onClick: expect.any(Function),
      onContextMenu: expect.any(Function),
      hasSegments: true,
      matches: false,
      state: true,
    });
  });
});
