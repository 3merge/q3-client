import React from 'react';
import useRest from 'q3-ui-rest';
import useEmailTemplates, {
  isPartial,
  findById,
  getFirstFullTemplateId,
} from './useEmailTemplates';

let state;

jest.mock('q3-ui-rest');
jest.mock('q3-ui-permissions', () => ({
  useAuth: jest.fn().mockReturnValue({
    canSee: true,
  }),
}));

beforeEach(() => {
  state = jest
    .spyOn(React, 'useState')
    .mockReturnValue([null, jest.fn()]);

  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());
});

describe('useEmailTemplates', () => {
  test.each([
    [{}, true],
    [{ name: '__header' }, true],
    [{ name: 'foo' }, false],
  ])('.isPartial()', (a, expected) => {
    expect(isPartial(a)).toBe(expected);
  });

  test.each([
    [[], null, undefined],
    [[{ id: '0', name: '_' }], '1', undefined],
    [
      [
        { id: '1', name: 'A' },
        { id: '2', name: 'B' },
        { id: '3', name: 'C' },
      ],
      '2',
      { id: '2', name: 'B' },
    ],
  ])('.findById()', (a, b, expected) => {
    expect(findById(a, b)).toEqual(expected);
  });

  test.each([
    [[], undefined],
    [[{ id: '1', name: '__partial' }], undefined],
    [
      [
        { id: '1', name: '__partial' },
        { id: '2', name: 'template' },
      ],
      '2',
    ],
  ])('.getFirstFullTemplateId()', (a, expected) => {
    expect(getFirstFullTemplateId(a)).toEqual(expected);
  });

  it('should not be ready while thinking', () => {
    useRest.mockReturnValue({
      fetching: true,
    });

    expect(useEmailTemplates()).toHaveProperty(
      'ready',
      false,
    );
  });

  it('should not be ready without a current template', () => {
    useRest.mockReturnValue({
      fetching: false,
      emails: [
        {
          id: 1,
          name: 'foo',
        },
      ],
    });

    expect(useEmailTemplates()).toHaveProperty(
      'ready',
      false,
    );
  });

  it('should be ready once a current template is assigned', () => {
    useRest.mockReturnValue({
      fetching: false,
      emails: [
        {
          id: 1,
          name: 'foo',
        },
      ],
    });

    state.mockReturnValue([1, jest.fn()]);

    expect(useEmailTemplates()).toHaveProperty(
      'ready',
      true,
    );

    expect(useEmailTemplates()).toHaveProperty(
      'error',
      false,
    );
  });

  it('should report error', () => {
    useRest.mockReturnValue({
      fetchingError: true,
    });

    expect(useEmailTemplates()).toHaveProperty(
      'error',
      true,
    );
  });

  it('should report error when empty', () => {
    useRest.mockReturnValue({
      fetchingError: false,
      emails: [],
    });

    expect(useEmailTemplates()).toHaveProperty(
      'error',
      true,
    );
  });
});
