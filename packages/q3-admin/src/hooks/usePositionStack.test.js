import {
  useEffectMock,
  useStateMock,
} from 'q3-ui-test-utils/lib/reactUtils';
import { browser } from 'q3-ui-helpers';
import usePositionStack, {
  printValues,
  shapeAddressQueryString,
} from './usePositionStack';

useEffectMock();

const stateSpy = useStateMock();
const address = {
  'streetNumber': 104,
  'streetLine1': 'Crockford Blvd',
  'streetLine2': 'Suite 211',
  'city': 'Scarborough',
  'region': 'ON',
  'country': 'CA',
  'postal': 'M1R 3C3',
};

jest.mock('q3-ui-helpers', () => ({
  browser: {
    fetchJson: jest.fn(),
  },
}));

describe('printValues', () => {
  it('should comma-separate', () => {
    expect(printValues(['foo', 'bar'])).toBe('foo bar');
  });

  it('should comma-separate values', () => {
    expect(printValues({ key1: 'foo', key2: 'bar' })).toBe(
      'foo bar',
    );
  });
});

describe('usePositionStack', (done) => {
  it('should attempt API three times on error', () => {
    browser.fetchJson.mockResolvedValue([]);
    usePositionStack(address);

    setTimeout(() => {
      expect(browser.fetchJson).toHaveBeenCalledTimes(3);
      expect(stateSpy.setState).toHaveBeenCalledWith([]);

      done();
    });
  });

  it('should attempt API once', () => {
    browser.fetchJson.mockResolvedValue([
      {
        lng: 1,
        lat: 1,
      },
    ]);

    usePositionStack(address);

    setTimeout(() => {
      expect(browser.fetchJson).toHaveBeenCalledTimes(1);
      expect(stateSpy.setState).toHaveBeenCalledWith([
        1, 1,
      ]);

      done();
    });
  });
});

describe('shapeAddressQueryString', () => {
  it('should return all', () => {
    expect(shapeAddressQueryString(address, 'full')).toBe(
      '104 Crockford Blvd Suite 211 Scarborough ON CA M1R 3C3',
    );
  });

  it('should return truncated', () => {
    expect(
      shapeAddressQueryString(address, 'truncated'),
    ).toBe('104 Crockford Blvd Scarborough ON CA');
  });

  it('should return simple', () => {
    expect(shapeAddressQueryString(address, 'simple')).toBe(
      'Crockford Blvd Scarborough ON CA',
    );
  });
});
