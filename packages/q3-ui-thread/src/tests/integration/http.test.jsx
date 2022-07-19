import React from 'react';
import {
  asyncAct,
  asyncMount,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import { Builders } from 'q3-ui-forms';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fixtures from '../fixtures';
import Thread from '../..';
import Note from '../../components/Note';

jest.unmock('axios');
jest.unmock('useful-state');

describe('HTTP', () => {
  it('should render loading', () => {
    exists(
      global
        .mount(
          <Fixtures delay={60000} ops={['Read']}>
            <Thread />
          </Fixtures>,
        )
        .find(CircularProgress),
    );
  });

  it('should render error', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} onGetError ops={['Read']}>
        <Thread />
      </Fixtures>,
    );

    expect(el.text()).toMatch('threadFetchingError');
  });

  it('should update note', async () => {
    const value = 'New title for testing';
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read', 'Update']}>
        <Thread />
      </Fixtures>,
    );

    await asyncAct(() =>
      el
        .find('.q3-thread-editor')
        .first()
        .simulate('click'),
    );

    await asyncAct(async () => {
      await el.find(Builders.Form).first().prop('onSubmit')(
        {
          title: value,
        },
      );

      return el;
    });

    const result = el
      .find(Note)
      .someWhere((note) => note.prop('title') === value);

    expect(result).toBeTruthy();
  });

  it('should create note', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read', 'Create']}>
        <Thread />
      </Fixtures>,
    );

    const initialLength = el.find(Note).length;

    await asyncAct(() =>
      el.find('.q3-thread-new').first().simulate('click'),
    );

    await asyncAct(async () => {
      await el.find(Builders.Form).first().prop('onSubmit')(
        {
          title: 'Something new',
          message: 'Test',
        },
      );

      return el;
    });

    expect(el.find(Note).length).toBeGreaterThan(
      initialLength,
    );
  });
});
