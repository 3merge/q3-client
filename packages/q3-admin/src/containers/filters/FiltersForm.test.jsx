import React from 'react';
import { EncodedUrl } from 'q3-ui-forms/lib/adapters';
import FiltersForm from './FiltersForm';

jest.unmock('useful-state');

describe('FiltersForm', () => {
  it('should not provide save callback', () => {
    const { onSave } = global
      .shallow(
        <FiltersForm handleSave={jest.fn()}>
          <div />
        </FiltersForm>,
      )
      .find(EncodedUrl)
      .props();

    expect(onSave).toBeNull();
  });

  it('should  provide save callback', () => {
    const { onSave } = global
      .shallow(
        <FiltersForm name="testing" handleSave={jest.fn()}>
          <div />
        </FiltersForm>,
      )
      .find(EncodedUrl)
      .props();

    expect(onSave).toEqual(expect.any(Function));
  });
});
