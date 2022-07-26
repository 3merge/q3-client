import React from 'react';
import useMultiSelect from './useMultiSelect';

let useState;

const getLastResult = (fn) => fn.mock.results[0].value;

beforeEach(() => {
  jest
    .spyOn(React, 'useCallback')
    .mockImplementation((fn) => fn);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: null,
  });

  useState = jest.spyOn(React, 'useState');
});

describe('useMultiselect', () => {
  it('should match when selected contains', () => {
    useState.mockReturnValue([['foo', 'bar']]);
    expect(useMultiSelect().isSelected('foo')).toBeTruthy();
  });

  it('should match when all ids have been selected', () => {
    useState.mockReturnValue([['foo', 'bar']]);
    expect(
      useMultiSelect().isSelected('foo,bar'),
    ).toBeTruthy();
  });

  it('should not match when some of the ids of been selected', () => {
    useState.mockReturnValue([['foo']]);
    expect(
      useMultiSelect().isSelected('foo,bar'),
    ).toBeFalsy();
  });

  it('should not match when the id has not been selected', () => {
    useState.mockReturnValue([['foo']]);
    expect(useMultiSelect().isSelected('bar')).toBeFalsy();
  });

  it('should join with selected', () => {
    const mock = jest
      .fn()
      .mockImplementation((fn) => fn(['foo']));
    useState.mockReturnValue([null, mock]);
    useMultiSelect().select('bar', true);
    expect(getLastResult(mock)).toEqual(['foo', 'bar']);
  });

  it('should replace selected', () => {
    const mock = jest
      .fn()
      .mockImplementation((fn) => fn(['foo']));
    useState.mockReturnValue([null, mock]);
    useMultiSelect().select('bar');
    expect(getLastResult(mock)).toEqual(['bar']);
  });

  it('should ignore', () => {
    const mock = jest
      .fn()
      .mockImplementation((fn) => fn(['foo']));
    useState.mockReturnValue([null, mock]);
    useMultiSelect().deselect('bar');
    expect(getLastResult(mock)).toEqual(['foo']);
  });

  it('should remove from array', () => {
    const mock = jest
      .fn()
      .mockImplementation((fn) => fn(['foo']));
    useState.mockReturnValue([null, mock]);
    useMultiSelect().deselect('foo');
    expect(getLastResult(mock)).toEqual([]);
  });

  it('should remove from array when none matches', () => {
    const mock = jest
      .fn()
      .mockImplementation((fn) => fn(['foo']));
    useState.mockReturnValue([null, mock]);
    useMultiSelect().deselect(['foo', 'bar']);
    expect(getLastResult(mock)).toEqual([]);
  });

  it('should emit select', () => {
    const mock = jest
      .fn()
      .mockImplementation((fn) => fn([]));

    const selection = [
      {
        getAttribute: jest.fn().mockReturnValue(1),
      },
    ];

    useState.mockReturnValue([null, mock]);

    useMultiSelect().container.current.emit('select', {
      added: selection,
      selected: selection,
    });

    expect(mock).toHaveBeenCalled();
    expect(getLastResult(mock)).toEqual(['1']);
  });
});
