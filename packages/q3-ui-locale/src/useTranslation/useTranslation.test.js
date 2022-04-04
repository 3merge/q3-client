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
    useTranslation('labels').t('bar', {
      var: 1,
    });

    expect(translate).toHaveBeenCalledWith(
      'labels',
      'bar',
      {
        var: 1,
      },
    );
  });

  it('should use overwrite namespace', () => {
    useTranslation('labels').t('titles:bar');

    expect(translate).toHaveBeenCalledWith(
      'titles',
      'bar',
      {},
    );
  });

  it('should ignore nested', () => {
    useTranslation('helpers').t('descriptions:bar:thunk');

    expect(translate).toHaveBeenCalledWith(
      'descriptions',
      'bar&colon;thunk',
      {},
    );
  });
});
