import React from 'react';
import { Form } from 'q3-ui-forms/lib/builders';
import AddNote from '../add';

describe('AddNote', () => {
  it('should render empty', () =>
    expect(
      global.shallow(
        <AddNote show={false} onSubmit={jest.fn()} />,
      ),
    ).toEqual({}));

  it('should render Form', () =>
    expect(
      global
        .shallow(<AddNote show onSubmit={jest.fn()} />)
        .find(Form),
    ).toHaveLength(1));
});
