import React from 'react';
import Chip from '@material-ui/core/Chip';
import MultiSelect, {
  extractValues,
  genPayload,
  isDisabled,
} from './MultiSelect';
import SelectBase from '../SelectBase';
import { STATUS } from '../MultiSelectAll';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

const items = [
  { label: 'foo', value: 'foo-value' },
  { label: 'bar', value: 'bar-value' },
];

const status = jest.spyOn(React, 'useState');
const setState = jest.fn();

const getSelectBase = () =>
  global
    .shallow(<MultiSelect onChange={jest.fn()} />)
    .find(SelectBase);

const simulateOnChange = (arg) =>
  getSelectBase().simulate('change', {
    target: arg,
  });

const getRenderValue = () =>
  getSelectBase().prop('SelectProps');

jest.mock('../../hooks', () => ({
  useOptions: jest.fn().mockReturnValue({
    location: false,
    items: [
      { label: 'foo', value: 'foo-value' },
      { label: 'bar', value: 'bar-value' },
    ],
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('MultiSelect', () => {
  describe('"genPayload"', () => {
    it('should assign parameters to nested object structure', () => {
      const values = ['hello', 'world', 'john'];
      expect(genPayload('foo', values)).toEqual({
        target: {
          name: 'foo',
          value: values,
        },
      });
    });
  });

  describe('"extractValues"', () => {
    it('should extract value property from all objects in the array', () => {
      expect(extractValues(items)).toEqual([
        'foo-value',
        'bar-value',
      ]);
    });

    it('should return each item if the array contains only string value', () =>
      expect(extractValues(['foo'])).toEqual(['foo']));
  });

  const checkRenderValue = (a, b) => {
    const El = () => getRenderValue().renderValue(a);
    expect(
      global
        .shallow(<El />)
        .find(Chip)
        .first()
        .prop('label'),
    ).toMatch(b);
  };

  it('should render labels as values when displayLabelAsValue is true', () =>
    checkRenderValue(['foo-value'], 'foo'));

  it('should split by comma', () =>
    checkRenderValue(['one', 'two'], 'one'));

  it(`should set status to "${INDETERMINATE}" when the value contains some of the available items`, () => {
    status.mockImplementation(() => [CHECKED, setState]);

    simulateOnChange({
      name: '3merge',
      value: ['foo-value'],
    });

    expect(setState).toHaveBeenCalledWith(INDETERMINATE);
  });

  it(`should set checked to "${UNCHECKED}" when the value contains none of the available items`, () => {
    status.mockImplementation(() => [undefined, setState]);

    simulateOnChange({
      name: '3merge',
      value: [],
    });

    expect(setState).toHaveBeenCalledWith(UNCHECKED);
  });

  it(`should set status to "${CHECKED}" when the value contains all of the available items`, () => {
    status.mockImplementation(() => [undefined, setState]);
    simulateOnChange({
      name: '3merge',
      value: ['foo-value', 'bar-value'],
    });

    expect(setState).toHaveBeenCalledWith(CHECKED);
  });

  it('should disable MultiSelectAll', () => {
    expect(
      isDisabled([
        { label: 1, value: 1, disabled: true },
        { label: 2, value: 2, disabled: true },
      ]),
    ).toBeTruthy();
  });

  it('should not disable MultiSelectAll', () => {
    expect(
      isDisabled([
        { label: 1, value: 1, disabled: true },
        { label: 2, value: 2 },
      ]),
    ).toBeFalsy();
  });

  it('should not disable MultiSelectAll for simple array', () => {
    expect(isDisabled([1, 2])).toBeFalsy();
  });
});
