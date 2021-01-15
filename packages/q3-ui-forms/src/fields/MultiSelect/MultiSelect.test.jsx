import React from 'react';
import MultiSelect, {
  extractValues,
  genPayload,
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

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('../../hooks', () => ({
  useOptions: jest.fn().mockReturnValue({
    location: false,
    items: [
      { label: 'foo', value: 'foo-value' },
      { label: 'bar', value: 'bar-value' },
    ],
  }),
}));

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

    it.todo(
      'should return each item if the array contains only string value',
    );
  });

  // TEST NOTE: Not sure how to test this but "renderValue" is tested.
  it.todo(
    'should match item labels with state value when displayLabelAsValue is true',
  );

  it.todo(
    'should serialize values with a comma when displayLabelAsValue is false',
  );

  it(`should set status to "${INDETERMINATE}" when the value contains some of the available items`, () => {
    status.mockImplementation(() => [CHECKED, setState]);

    const wrapper = global
      .shallow(<MultiSelect onChange={jest.fn()} />)
      .find(SelectBase);

    wrapper.simulate('change', {
      target: {
        name: '3merge',
        value: ['foo-value', 'bar-value'],
      },
    });

    expect(setState).toHaveBeenCalledWith(INDETERMINATE);
  });

  it(`should set checked to "${UNCHECKED}" when the value contains none of the available items`, () => {
    status.mockImplementation(() => [undefined, setState]);

    const wrapper = global
      .shallow(<MultiSelect onChange={jest.fn()} />)
      .find(SelectBase);

    wrapper.simulate('change', {
      target: {
        name: '3merge',
        value: [],
      },
    });

    expect(setState).toHaveBeenCalledWith(UNCHECKED);
  });

  it(`should set status to "${CHECKED}" when the value contains all of the available items`, () => {
    status.mockImplementation(() => [undefined, setState]);

    const wrapper = global
      .shallow(<MultiSelect onChange={jest.fn()} />)
      .find(SelectBase);

    wrapper.simulate('change', {
      target: {
        name: '3merge',
        value: ['foo-value', 'bar-value'],
      },
    });

    expect(setState).toHaveBeenCalledWith(CHECKED);
  });
});
