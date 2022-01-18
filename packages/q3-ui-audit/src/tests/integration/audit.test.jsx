import React from 'react';
import {
  asyncAct,
  asyncMount,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import FormsProvider, { Builders } from 'q3-ui-forms';
import Providers from 'q3-ui/lib/_helpers/providers';
import Fixtures from '../fixtures';
import Audit from '../..';

// fixtures will do this for us
jest.unmock('axios');
jest.unmock('notistack');

const mount = (props) => (
  <Providers>
    <FormsProvider>
      <Fixtures delay={0} {...props}>
        <Audit />
      </Fixtures>
    </FormsProvider>
  </Providers>
);

describe('Audit', () => {
  it('should fetch data', async () => {
    const el = await asyncMount(mount());

    await asyncAct(() => {
      el.find(Builders.Form).first().props().onSubmit({
        template: 'one,two',
      });

      return el;
    });

    expect(el.find('.q3-ui-audit-entry')).toHaveLength(15);
  });

  it('should not fetch data', async () => {
    const el = await asyncMount(mount());

    expect(el.find('.q3-ui-audit-entry')).toHaveLength(0);
  });

  it('should apply filters', async () => {
    const el = await asyncMount(mount());

    await asyncAct(() => {
      el.find(Builders.Form).first().props().onSubmit({
        template: 'one',
        user: 'Kevin R.',
      });

      return el;
    });

    expect(el.find('.q3-ui-audit-entry')).toHaveLength(6);
  });

  it('should hide timeline', async () => {
    const el = await asyncMount(mount());

    await asyncAct(() => {
      el.find(Builders.Form).first().props().onSubmit({
        template: 'one',
      });

      return el;
    });

    await asyncAct(() => {
      el.find('.q3-ui-audit-back')
        .first()
        .simulate('click');
      return el;
    });

    expect(el.find('.q3-ui-audit-entry')).toHaveLength(0);
  });
});
