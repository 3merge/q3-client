import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Graphic from 'q3-ui-assets';
import * as utils from 'q3-ui-test-utils/lib/enzymeUtils';
import QueueLogs from '../..';
import Fixtures from '../fixtures';

jest.unmock('axios');

const isInProgress = (item) =>
  !['Done', 'Failed'].includes(item.status);

const checkDisabledState = (el, expectedValue) =>
  expect(
    global
      .mount(
        <div>
          {el
            .find(DataGrid)
            .last()
            .prop('columns')[4]
            .renderCell({
              row: {
                status: 'Done',
                type: 'Single',
                import: ['https://google.ca'],
              },
            })}
        </div>,
      )
      .find('button')
      .first()
      .props(),
  ).toHaveProperty('disabled', expectedValue);

describe('QueueLogs', () => {
  it('should catch errors', async () => {
    const el = await utils.asyncMount(
      <Fixtures delay={0} causeError>
        <QueueLogs />
      </Fixtures>,
    );

    expect(el.find(Graphic).exists()).toBeTruthy();
  });

  it('should render rows', async () => {
    const el = await utils.asyncMount(
      <Fixtures delay={0}>
        <QueueLogs />
      </Fixtures>,
    );

    expect(
      el
        .find(DataGrid)
        .first()
        .prop('rows')
        .every(isInProgress),
    ).toBeTruthy();

    checkDisabledState(el, false);
  });

  it('should disable actions', async () => {
    checkDisabledState(
      await utils.asyncMount(
        <Fixtures delay={0} revokeAccessToQueuesEditing>
          <QueueLogs />
        </Fixtures>,
      ),
      true,
    );
  });
});
