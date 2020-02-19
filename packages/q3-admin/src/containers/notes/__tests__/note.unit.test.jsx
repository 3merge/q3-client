import React from 'react';
import Button from '@material-ui/core/Button';
import { Form } from 'q3-ui-forms/lib/builders';
import Note from '../note';

jest.unmock('useful-state');

describe('Note', () => {
  it('should reveal editor', () => {
    const props = {
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      message: 'Text',
      date: new Date().toISOString(),
      author: 'Doe',
      id: '1',
    };

    const el = global.shallow(<Note {...props} />);

    el.find(Button).simulate('click');
    el.update();
    expect(el.find(Form)).toHaveLength(1);
    expect(el.find(Button)).toHaveLength(3);
  });
});
