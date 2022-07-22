import React from 'react';
import {
  asyncAct,
  asyncMount,
  wait,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import Fixtures from '../fixtures';
import Thread from '../..';
import Note from '../../components/Note';

jest.unmock('axios');
jest.unmock('useful-state');

describe('Interactivity', () => {
  it('should invert pin', async () => {
    const el = await asyncMount(
      <Fixtures
        delay={0}
        ops={['Read', 'Create', 'Update']}
      >
        <Thread />
      </Fixtures>,
    );

    const testSelector = '[data-pinned-for="15"]';
    const button = el.find(testSelector).first();
    const initialValue = button.prop('data-pinned');

    await asyncAct(async () => {
      await button.prop('onClick')({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      });

      return el;
    });

    expect(
      el.find(testSelector).first().prop('data-pinned'),
    ).not.toEqual(initialValue);
  });

  it('should search', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read']}>
        <Thread />
      </Fixtures>,
    );

    await asyncAct(async () => {
      el.find('.q3-thread-search')
        .first()
        .props()
        .onChange({
          target: {
            value: 'Tax',
          },
        });

      // debounced
      await wait(1500);
      return el;
    });

    expect(el.find(Note).length).toBe(2);
  });

  it('should filter by tag', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read']}>
        <Thread />
      </Fixtures>,
    );

    await asyncAct(async () => {
      el.find('.q3-thread-tag-select')
        .first()
        .simulate('click');

      return el;
    });

    await asyncAct(async () => {
      el.find('#q3-thread-tag-list')
        .first()
        .find('li')
        .forEach((item) => {
          if (item.text() === 'Ford')
            item.simulate('click');
        });

      return el;
    });

    expect(el.find(Note).length).toBe(2);
  });
});
