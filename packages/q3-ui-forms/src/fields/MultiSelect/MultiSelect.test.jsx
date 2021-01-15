import React from 'react';
import MultiSelect, {
  extractValues,
  genPayload,
} from './MultiSelect';
import { STATUS } from '../MultiSelectAll';
import { useOptions } from '../../hooks';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

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
      const items = [
        { label: 'foo', value: 'foo-value' },
        { label: 'bar', value: 'foo-bar' },
      ];
      expect(extractValues(items)).toEqual([
        'foo-value',
        'foo-bar',
      ]);
    });

    it.todo(
      'should return each item if the array contains only string value',
    );
  });

  it('should match item labels with state value when displayLabelAsValue is true', () => {
    const items = [
      { label: 'hello', value: 'world' },
      { label: 'john', value: 'doe' },
    ];

    const status = UNCHECKED;
    const setState = jest.fn();

    // jest
    //   .spyOn(React, 'useState')
    //   .mockImplementation(() => [status, setState]);

    jest.mock('../../hooks', () => ({
      useOptions: jest.fn().mockReturnValue({
        location: false,
        items,
      }),
    }));

    const wrapper = global.shallow(
      <MultiSelect
        displayLabelAsValue
        name="foo"
        value={['world', 'doe']}
      />,
    );
  });

  it.todo(
    'should serialize values with a comma when displayLabelAsValue is false',
  );

  it.todo(
    `should set checked to "${INDETERMINATE}" when the value contains some of the available items`,
  );

  it.todo(
    `should set checked to "${CHECKED}" when the value contains all of the available items`,
  );

  it.todo(
    `should set checked to "${UNCHECKED}" when the value contains none of the available items`,
  );
});
