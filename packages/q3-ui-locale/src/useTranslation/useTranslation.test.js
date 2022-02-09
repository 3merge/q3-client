import React from 'react';
import useTranslation from './useTranslation';

const translate = jest.fn();

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    translate,
  });
});

beforeEach(() => {
  translate.mockClear();
});

describe('useTranslation', () => {
  it('should use default namespace', () => {
    useTranslation('foo').t('bar', {
      var: 1,
    });

    expect(translate).toHaveBeenCalledWith('foo', 'bar', {
      var: 1,
    });
  });

  it('should use overwrite namespace', () => {
    useTranslation('foo').t('quuz:bar');

    expect(translate).toHaveBeenCalledWith(
      'quuz',
      'bar',
      {},
    );
  });
});
