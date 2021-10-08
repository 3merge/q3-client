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
        <Audit collectionName="test" id="1" />
      </Fixtures>
    </FormsProvider>
  </Providers>
);

describe('Audit', () => {
  it('should fetch data', async () => {
    const el = await asyncMount(mount());
    expect(el.find('tbody').find('tr')).toHaveLength(150);
  });

  it('should catch errors data', async () => {
    const el = await asyncMount(
      mount({
        causeError: true,
      }),
    );

    expect(el.find('tbody').find('tr')).toHaveLength(1);
  });

  it('should merge data', async () => {
    const el = await asyncMount(mount());

    await asyncAct(async () => {
      el.find('#q3-audit-load-more')
        .first()
        .simulate('click');

      return el;
    });

    expect(el.find('tbody').find('tr')).toHaveLength(300);
  });

  it('should filter the results', async () => {
    const el = await asyncMount(mount());

    await asyncAct(() => {
      el.find(Builders.Form)
        .first()
        .props()
        .onSubmit({
          operation: ['added'],
        });

      return el;
    });

    expect(el.find('tbody').find('tr').length).toBeLessThan(
      150,
    );

    expect(
      el
        .find('#q3-audit-load-more')
        .first()
        .prop('disabled'),
    ).toBeTruthy();
  });
});
