import React from 'react';
import Button from '@material-ui/core/Button';
import { Form } from 'q3-ui-forms/lib/builders';
import { string } from 'q3-ui-helpers';
import moment from 'moment';
import Note from '../note';

jest.unmock('useful-state');

describe('Note', () => {
  it('should reveal editor', () => {
    const props = {
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      message: 'Text',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: 'Doe',
      id: '1',
    };

    const el = global.shallow(<Note {...props} />);

    el.find(Button).simulate('click');
    el.update();
    expect(el.find(Form)).toHaveLength(1);
    expect(el.find(Button)).toHaveLength(3);
  });

  it('should render revised date string', () => {
    const props = {
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      message: 'Text',
      createdAt: moment().toISOString(),
      updatedAt: moment().add(1, 'hour').toISOString(),
      author: 'Jon',
      id: '1',
    };

    const created = string.toDate(props.createdAt);
    const updated = string.toDate(props.updatedAt);

    const text = global
      .shallow(<Note {...props} />)
      .find('cite')
      .text();
    expect(text).toMatch(
      `Jon posted on ${created} (revised ${updated})`,
    );
  });

  it('should render created date only', () => {
    const d = moment().toDate();
    const props = {
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
      message: 'Text',
      createdAt: d,
      updatedAt: d,
      id: '1',
    };

    const created = string.toDate(props.createdAt);

    const text = global
      .shallow(<Note {...props} />)
      .find('cite')
      .text();
    expect(text).toMatch(`Posted on ${created}`);
  });
});
