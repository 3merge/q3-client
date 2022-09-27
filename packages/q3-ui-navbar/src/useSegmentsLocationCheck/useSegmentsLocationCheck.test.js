import { useLocation } from '@reach/router';
import useSegmentsLocationCheck from './useSegmentsLocationCheck';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

test.each([
  [
    '?status=Quote&total<1000',
    [
      {
        id: 1,
        label: 'Cheap Quotes',
        value: '?status=string(Quote)&total<1000',
      },
      {
        id: 2,
        label: 'Expensive Quotes',
        value: '?status=string(Quote)&total>1000',
      },
    ],
    'Cheap Quotes',
  ],
  [
    '?status=Quote&total<1000&deferred=false&search=Term',
    [
      {
        id: 1,
        label: 'Cheap Quotes',
        value: '?status=string(Quote)&total<1000',
      },
      {
        id: 2,
        label: 'Expensive Quotes',
        value: '?status=string(Quote)&total>1000',
      },
    ],
    'Cheap Quotes',
  ],
  [
    '?status=Quote&total<2000',
    [
      {
        id: 1,
        label: 'Cheap Quotes',
        value: '?status=string(Quote)&total<1000',
      },
      {
        id: 2,
        label: 'Expensive Quotes',
        value: '?status=string(Quote)&total>1000',
      },
    ],
    undefined,
  ],
  [
    '?status=string(Quote)&payment=in(Visa,Mastercard)',
    [
      {
        id: 1,
        label: 'Without casting',
        // duplicates always come first
        value: '?status=Quote&payment=Mastercard,Visa',
      },
      {
        id: 2,
        label: 'With casting',
        value:
          '?status=string(Quote)&payment=in(Visa,Mastercard)',
      },
    ],
    'Without casting',
  ],
])(
  '.useSegmentsLocationCheck',
  (search, segments, expected) => {
    useLocation.mockReturnValue({
      search,
    });

    expect(
      useSegmentsLocationCheck()
        .check(segments)
        .find((item) => item.applied)?.label,
    ).toBe(expected);
  },
);
