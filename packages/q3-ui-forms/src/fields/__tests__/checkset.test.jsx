import React from 'react';
import { useField } from 'formik';
import Button from '@material-ui/core/Button';
import KeyboardUp from '@material-ui/icons/KeyboardArrowUp';
import Checkset, {
  CollapseableFieldset,
  ControlledCheckbox,
} from '../checkset';

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
        .find(ControlledCheckbox),
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
        .find(ControlledCheckbox)
        .first()
        .props(),
    ).toHaveProperty('isChecked', true);
  });
});

describe('CollapseableFieldset', () => {
  it('should disable collapsing feature', () => {
    const { disabled } = global
      .shallow(
        <CollapseableFieldset
          name="demo"
          label="demo"
          collapse={false}
        >
          <p>Children!</p>
        </CollapseableFieldset>,
      )
      .find(Button)
      .props();
    expect(disabled).toBeTruthy();
  });

  it('should render KeyboardUp by default', () => {
    const icon = global
      .shallow(
        <CollapseableFieldset name="demo" label="demo">
          <p>Children!</p>
        </CollapseableFieldset>,
      )
      .find(KeyboardUp);
    expect(icon).toHaveLength(1);
  });
});
