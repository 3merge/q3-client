import { splitBeforeOperator } from '../FieldToQueryBuilder';

describe('splitBeforeOperator', () => {
  it('should return first portion of string', () => {
    expect(splitBeforeOperator('test__in')).toEqual('test');
  });

  it('should return second portion of string, with leading __', () => {
    expect(splitBeforeOperator('__t')).toEqual('__t');
    expect(splitBeforeOperator('__t__eq')).toEqual('__t');
  });
});
