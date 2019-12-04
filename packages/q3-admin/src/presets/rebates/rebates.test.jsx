import { formatTierValueStatment } from './utils';

const shouldMatchOp = (symbol, match) =>
  expect(
    formatTierValueStatment({ symbol })({ value: 10 }),
  ).toMatch(match);

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
