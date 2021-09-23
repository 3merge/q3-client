import '../helpers/polyfillRange';
import React from 'react';
import * as utils from 'q3-ui-test-utils/lib/enzymeUtils';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TreeView } from '@material-ui/lab';
import EmailEditor from '../..';
import EmailEditorErrorGraphic from '../../components/EmailEditorErrorGraphic';
import Fixtures from '../fixtures';

jest.unmock('axios');
jest.unmock('notistack');

describe('EmailEditor', () => {
  it('should fetch', async () => {
    const el = await utils.asyncMount(
      <Fixtures delay={5000}>
        <EmailEditor />
      </Fixtures>,
    );

    expect(el.find(CircularProgress).exists()).toBeTruthy();
  });

  it('should error', async () => {
    const el = await utils.asyncMount(
      <Fixtures delay={0} causeError>
        <EmailEditor />
      </Fixtures>,
    );

    expect(
      el.find(EmailEditorErrorGraphic).exists(),
    ).toBeTruthy();
  });

  it('should generate previews for full templates', async () => {
    const el = await utils.asyncMount(
      <Fixtures delay={0}>
        <EmailEditor />
      </Fixtures>,
    );

    await utils.asyncAct(async () => {
      // debounced preview call
      await utils.wait(2000);
      return el;
    });

    const iframe = el.find('iframe');
    expect(iframe.exists()).toBeTruthy();
    expect(iframe.prop('data-test')).toMatch('Preview');

    await utils.asyncAct(() => {
      // simulating TreeItem click doesn't work
      el.find(TreeView).prop('onNodeSelect')(null, 't1');
      return el;
    });

    expect(el.find('iframe').exists()).toBeFalsy();
  });

  it('should save MJML changes', async () => {
    const newValue =
      '<mjml><mj-body><mj-text>Changed.</mj-text></mj-body></mjml>';

    const el = await utils.asyncMount(
      <Fixtures delay={0}>
        <EmailEditor />
      </Fixtures>,
    );

    await utils.asyncAct(() => {
      el.find('textarea')
        .prop('data-test')
        .setValue(newValue);

      return el;
    });

    await utils.asyncAct(async () => {
      // debounced save call
      await el
        .find('#save-email-template')
        .first()
        .simulate('click');

      return el;
    });

    await utils.asyncAct(async () => {
      // debounced save call
      await utils.wait(500);
      return el;
    });

    expect(el.find('textarea').prop('data-value')).toMatch(
      newValue,
    );
  });
});
