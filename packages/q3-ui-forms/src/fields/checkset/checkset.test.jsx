import React from 'react';
import { useField } from 'formik';
import Checkset from '.';
import Bool from '../bool';

const options = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
  { value: 4, label: 'Four' },
];

const getWrapper = (props) =>
  global.mount(
    <Checkset
      name="checkset"
      options={options}
      {...props}
    />,
  );

const countOptions = (el, expected) => {
  expect(el.find(Bool)).toHaveLength(expected);
};

describe('Checkset', () => {
  it('should iterate over options', () => {
    const el = getWrapper();
    countOptions(el, options.length);
  });

  it('should redact options', () => {
    const el = getWrapper({ maxVisible: 2 });
    countOptions(el, 2);
  });

  it('should expand options', () => {
    const el = getWrapper({ maxVisible: 2 });
    el.find('button#toggle-visibility').simulate('click');
    countOptions(el, options.length);
  });

  it('should mark as checked', () => {
    useField.mockReturnValue([
      { value: [1] },
      { error: 'Noop' },
    ]);

    expect(
      global
        .mount(
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
