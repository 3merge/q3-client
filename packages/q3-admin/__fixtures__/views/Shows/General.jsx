import React from 'react';
import { string } from 'q3-ui-helpers';
import { castToLocalDateTime } from 'q3-ui-forms/lib/helpers';
import { connect } from '../../../src/containers';
import {
  PatternContainer,
  PatternFormDialog,
  PatternList,
  PatternMap,
  PatternDataGrid,
  PatternChart,
  PatternStatistic,
  PatternMultistepper,
} from '../../../src/components';

export default connect(() => (
  <PatternContainer>
    <PatternStatistic report="stat" />
    <PatternChart report="chartexample" />
    <PatternDataGrid
      title="Recent appearances"
      report="appearances"
    />
    <PatternMap />
    <PatternFormDialog
      FormProps={{
        modify: {
          createdAt: [castToLocalDateTime],
        },
      }}
      fields={[
        {
          field: 'name',
          type: 'text',
        },
        {
          label: 'Address',
          formatter: 'address',
        },
        {
          field: 'streetNumber',
          type: 'number',
          formOnly: true,
          required: true,
        },
        {
          field: 'streetLine1',
          type: 'text',
          formOnly: true,
          required: true,
        },
        {
          field: 'streetLine2',
          type: 'text',
          formOnly: true,
        },
        {
          field: 'city',
          type: 'text',
          formOnly: true,
          required: true,
        },
      ]}
      title="Billing"
    />
    <PatternMultistepper
      title="workflow"
      getCurrentStep={() => 1}
      steps={[
        {
          label: 'testing',
          component: () => 'Step one',
        },
        {
          label: 'testing',
          component: () => 'Step two',
        },
      ]}
    />
    <PatternList
      apiParams={() => ({
        key: 'show',
        pluralized: 'shows',
        url: '/shows',
      })}
      renderListItem={({ id, name, boxOffice }) => ({
        title: name,
        description: string.toPrice(boxOffice),
        href: `/shows/${id}`,
      })}
      title="Related"
      action={() => 'CHANGE'}
    />
  </PatternContainer>
));
