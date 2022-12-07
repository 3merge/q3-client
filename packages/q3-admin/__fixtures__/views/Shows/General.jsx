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
    <PatternChart height={850} report="chartexample" />
    <PatternDataGrid
      refresh={['name', 'streetLine1']}
      title="Recent appearances"
      report="appearances"
      formatters={{
        episode: (value, { id }) => (
          <a href="test">
            #{id}-{value}
          </a>
        ),
        date: 'datetime',
        compensation: 'price',
      }}
      width={{
        quote: 230,
        date: 195,
        compensation: 165,
      }}
    />
    <PatternMap />
    <PatternFormDialog
      FormProps={{
        modify: {
          createdAt: [castToLocalDateTime],
        },
        initialValues: {
          custom: 'DEFAULT VAL',
        },
      }}
      fields={[
        {
          field: 'name',
          type: 'text',
        },
        {
          field: 'custom',
          type: 'text',
        },
        {
          field: 'createdBy.firstName',
          type: 'text',
        },
        {
          label: 'Address',
          formatter: 'address',
        },
        {
          label: 'Address 2',
          formatter: 'address',
          field: 'createdBy',
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
        {
          preset: 'NorthAmericaRegionalSelect',
          fieldReferences: ['region', 'country'],
          formOnly: true,
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
