import 'q3-ui-test-utils/lib/localeUtils';
import React from 'react';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import { NorthAmericaRegionalSelect } from 'q3-ui-forms/lib/presets';
import {
  PatternFormDialogContent,
  PatternFormDialog,
} from './PatternFormDialog';
import ListFormatted from '../ListFormatted';

jest.mock('../ListFormatted');
jest.mock('../../containers', () => ({
  connect: jest.fn().mockImplementation((fn) => fn),
}));

describe('PatternFormDialog', () => {
  it('should remove form-only fields', () => {
    expect(
      global
        .shallow(
          <PatternFormDialog
            title="test"
            fields={[
              {
                field: 'yes',
              },
              {
                field: 'no',
                formOnly: true,
              },
            ]}
          />,
        )
        .find(ListFormatted)
        .prop('fields'),
    ).toEqual([
      {
        field: 'yes',
      },
    ]);
  });
});

describe('PatternFormDialogContent', () => {
  it('should map field and field references', () => {
    expect(
      global
        .shallow(
          <PatternFormDialogContent
            data={{
              age: 1,
              name: 1,
              color: 1,
            }}
            fields={[
              { field: 'name' },
              { fieldReferences: ['age'] },
              {},
            ]}
          />,
        )
        .find(Form)
        .prop('initialValues'),
    ).toEqual({
      name: 1,
      age: 1,
    });
  });

  it('should render Field', () => {
    expect(
      global
        .shallow(
          <PatternFormDialogContent
            data={{
              age: 1,
              name: 1,
              color: 1,
            }}
            fields={[{ field: 'name', type: 'text' }]}
          />,
        )
        .find(Field).length,
    ).toBe(1);
  });

  it('should render Preset', () => {
    expect(
      global
        .shallow(
          <PatternFormDialogContent
            data={{
              age: 1,
              name: 1,
              color: 1,
            }}
            fields={[
              { preset: 'NorthAmericaRegionalSelect' },
            ]}
          />,
        )
        .find(NorthAmericaRegionalSelect).length,
    ).toBe(1);
  });

  it('should not render anything without preset or type', () => {
    expect(
      global
        .shallow(
          <PatternFormDialogContent
            data={{
              age: 1,
              name: 1,
              color: 1,
            }}
            fields={[{ field: 'age' }]}
          />,
        )
        .find(Field).length,
    ).toBe(0);
  });
});
