import React from 'react';
import { Create as CreateDialog } from 'q3-ui/lib/dialogs';
import Add from '../add';

jest.spyOn(React, 'useContext').mockReturnValue({
  collectionName: 'demo',
  post: jest.fn(),
});

describe('Add', () => {
  it('should render a title as H2', () => {
    const fn = jest.fn();
    const el = global.shallow(
      <Add title="foo">
        <p>Test</p>
      </Add>,
    );

    const [typography, form] = el
      .find(CreateDialog)
      .props()
      .render(fn).props.children;

    expect(typography.props).toMatchObject({
      children: expect.any(String),
      variant: 'h2',
    });

    expect(form.props).toMatchObject({
      collectionName: expect.any(String),
      onSubmit: expect.any(Function),
    });
  });

  it('should block Dialog from rendering without children', () => {
    const el = global.shallow(<Add title="foo" />);
    expect(el.find(CreateDialog)).toHaveLength(0);
  });
});
