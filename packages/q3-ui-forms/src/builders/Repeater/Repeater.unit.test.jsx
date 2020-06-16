import React from 'react';
import Repeater from './Repeater';
import { BuilderState } from '../../FormsContext';

const Field = () => <div />;

describe('renameFieldComponents', () => {
  it('should reassign the <Field /> name property to match the index', () => {
    const el = global.mount(
      <BuilderState.Provider
        value={{ values: { foo: [{ bar: '' }] } }}
      >
        <Repeater group="foo">
          <Field name="bar" />
        </Repeater>
      </BuilderState.Provider>,
    );

    expect(el.find(Field).first().props()).toHaveProperty(
      'name',
      'foo.0.bar',
    );
  });
});
