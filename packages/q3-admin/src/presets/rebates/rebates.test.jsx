import {
  isValid,
  isInvalid,
} from 'q3-ui-forms/lib/validations/testUtils';
import { formatTierValueStatment } from './utils';
import { general } from './__fields.json';

const shouldMatchOp = (symbol, match) =>
  expect(
    formatTierValueStatment({ symbol })({ value: 10 }),
  ).toMatch(match);

describe('Form validation', () => {
  describe('General', () => {
    it('should be valid', () =>
      isValid(general, {
        name: 'John',
        description: 'Kelly',
        couponCode: 'CODE',
        value: 12,
        currency: 'CAD',
        symbol: '$',
      }));

    it('should flag invalid value', () =>
      isInvalid(general, {
        name: 'John',
        description: 'Kelly',
        couponCode: 'CODE',
        value: -3,
        currency: 'CAD',
        symbol: '%',
      }));

    it('should flag invalid symbol', () =>
      isInvalid(general, {
        name: 'John',
        description: 'Kelly',
        couponCode: 'CODE',
        value: 12,
        currency: 'CAD',
        symbol: '?',
      }));
  });
});

describe('Utilities', () => {
  describe('formatTierValueStatment', () => {
    it('should return prefixed with dollar sign', () => {
      shouldMatchOp('$', '-$10');
    });

    it('should return prefixed with dollar sign', () => {
      shouldMatchOp('=', '$10');
    });

    it('should return suffixed with percent sign', () => {
      shouldMatchOp('%', '-10%');
    });
  });
});
