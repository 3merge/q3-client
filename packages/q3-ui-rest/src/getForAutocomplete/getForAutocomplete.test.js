import getOptions from './getOptions';
import {
  getSafelyForAutoComplete,
  getSafelyForAutoCompleteWithProjection,
} from '.';

jest.mock('./getOptions', () => jest.fn());

describe('getForAutoComplete', () => {
  it('should have been called with projection-based URL', () => {
    getSafelyForAutoComplete('/foo', 'key', 'path')('bar');
    expect(getOptions).toHaveBeenCalledWith(
      '/foo?search=bar',
      'key',
      'path',
    );
  });

  it('should have been called with projection-based URL', () => {
    getSafelyForAutoCompleteWithProjection(
      '/foo?fields=id,key',
      'key',
      'path',
    )('bar');
    expect(getOptions).toHaveBeenCalledWith(
      '/foo?fields=id,key&search=bar',
      'key',
      'path',
    );
  });
});
