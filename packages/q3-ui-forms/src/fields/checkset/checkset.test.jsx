import React from 'react';
import { useField } from 'formik';
import Checkset from '.';
import Bool from '../bool';

describe('Checkset', () => {
  it('should iterate over options', () =>
    expect(
      global
        .shallow(
          <Checkset
            name="Set"
            options={[
              { value: 1, label: 'One' },
              { value: 2, label: 'Two' },
            ]}
          />,
        )
        .find(Bool),
    ).toHaveLength(2));

  it('should mark as checked', () => {
    useField.mockReturnValue([
      { value: [1] },
      { error: 'Noop' },
    ]);

    expect(
      global
        .shallow(
          <Checkset
            name="Set"
            options={[
              { value: 1, label: 'One' },
              { value: 2, label: 'Two' },
            ]}
          />,
        )
        .find(Bool)
        .first()
        .props(),
    ).toHaveProperty('isChecked', true);
  });
});
