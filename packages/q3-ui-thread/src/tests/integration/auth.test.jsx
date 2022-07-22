import React from 'react';
import {
  asyncMount,
  hasNoneOf,
  hasSomeOf,
  doesNotExist,
  exists,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import Fixtures from '../fixtures';
import Thread from '../..';

jest.unmock('axios');

describe('Thread', () => {
  it('should render auth alert', () => {
    expect(
      global
        .mount(
          <Fixtures delay={0} ops={[]}>
            <Thread />
          </Fixtures>,
        )
        .text(),
    ).toMatch('cannotSeeThread');
  });

  it('should remove pin buttons', async () => {
    const el = await asyncMount(
      <Fixtures
        delay={0}
        ops={['Read', 'Create', 'Update']}
      >
        <Thread enablePins={false} />
      </Fixtures>,
    );

    hasNoneOf(el.find('.q3-thread-pin'));
  });

  it('should remove pin buttons when read-only', async () => {
    const el = await asyncMount(
      <Fixtures delay={0} ops={['Read']}>
        <Thread />
      </Fixtures>,
    );

    hasNoneOf(el.find('.q3-thread-pin'));
  });

  it('should include pin buttons', async () => {
    const el = await asyncMount(
      <Fixtures
        delay={0}
        // must include each
        ops={['Create', 'Read', 'Update']}
      >
        <Thread />
      </Fixtures>,
    );

    hasSomeOf(el.find('.q3-thread-pin'));
  });

  it('should remove tag selection', async () => {
    const el = await asyncMount(
      <Fixtures
        delay={0}
        // must include each
        ops={['Create', 'Read', 'Update']}
      >
        <Thread enableTags={false} />
      </Fixtures>,
    );

    doesNotExist(el.find('.q3-thread-tag-select'));
    hasNoneOf(el.find('.q3-thread-tag'));
  });

  it('should show editor', async () => {
    const el = await asyncMount(
      <Fixtures
        delay={0}
        // must include each
        ops={['Read', 'Update']}
      >
        <Thread />
      </Fixtures>,
    );

    hasSomeOf(el.find('.q3-thread-editor'));
  });

  it('should hide editor', async () => {
    const el = await asyncMount(
      <Fixtures
        delay={0}
        // must include each
        ops={['Read']}
      >
        <Thread />
      </Fixtures>,
    );

    hasNoneOf(el.find('.q3-thread-editor'));
  });

  it('should show add button', async () => {
    const el = await asyncMount(
      <Fixtures
        delay={0}
        // must include each
        ops={['Read', 'Create']}
      >
        <Thread />
      </Fixtures>,
    );

    exists(el.find('.q3-thread-new'));
  });

  it('should hide add button', async () => {
    const el = await asyncMount(
      <Fixtures
        delay={0}
        // must include each
        ops={['Read']}
      >
        <Thread />
      </Fixtures>,
    );

    doesNotExist(el.find('.q3-thread-new'));
  });
});
