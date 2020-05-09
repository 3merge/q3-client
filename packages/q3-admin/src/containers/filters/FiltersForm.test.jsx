import React from 'react';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFilters } from 'q3-ui-rest';
import FiltersForm from './FiltersForm';

jest.unmock('useful-state');

jest.mock('q3-ui-rest', () => ({
  useFilters: jest.fn(),
}));

const requiredProps = {
  lookup: ['foo'],
  handleSave: jest.fn(),
  initialValues: {},
};

describe('FiltersForm', () => {
  it('should not provide save callback', () => {
    useFilters.mockReturnValue({
      fields: {},
      loading: false,
    });
    const { onSave } = global
      .shallow(
        <FiltersForm {...requiredProps}>
          {jest.fn()}
        </FiltersForm>,
      )
      .find(EncodedUrl)
      .props();

    expect(onSave).toBeNull();
  });

  it('should  provide save callback', () => {
    useFilters.mockReturnValue({
      fields: {},
      loading: false,
    });

    const { onSave } = global
      .shallow(
        <FiltersForm name="testing" {...requiredProps}>
          {jest.fn()}
        </FiltersForm>,
      )
      .find(EncodedUrl)
      .props();

    expect(onSave).toEqual(expect.any(Function));
  });

  it('should return loading indicator', () => {
    useFilters.mockReturnValue({
      loading: true,
    });

    const { length } = global
      .shallow(
        <FiltersForm {...requiredProps}>
          {jest.fn()}
        </FiltersForm>,
      )
      .find(CircularProgress);

    expect(length).toBe(1);
  });
});
