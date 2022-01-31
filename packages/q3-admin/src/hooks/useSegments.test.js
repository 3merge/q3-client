import { useLocation } from '@reach/router';
import useSegments from './useSegments';

jest.mock('@reach/router', () => ({
  useLocation: jest.fn(),
}));

test.each([
  [
    '?status=Quote&total<1000',
    [
      {
        label: 'Cheap Quotes',
        value: '?status=string(Quote)&total<1000',
      },
      {
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
        label: 'Cheap Quotes',
        value: '?status=string(Quote)&total<1000',
      },
      {
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
        label: 'Cheap Quotes',
        value: '?status=string(Quote)&total<1000',
      },
      {
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
        label: 'With casting',
        value:
          '?status=string(Quote)&payment=in(Visa,Mastercard)',
      },
      {
        label: 'Without casting',
        value: '?status=Quote&payment=Mastercard,Visa',
      },
    ],
    'Without casting',
  ],
])(
  '.useSegments() active',
  (search, segments, expected) => {
    useLocation.mockReturnValue({
      search,
    });

    const { active } = useSegments(segments);
    expect(active).toEqual(expected);
  },
);
