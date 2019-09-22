import React from 'react';
import { storiesOf } from '@storybook/react';
import { TableCellHeader } from '../../components';
import List from '.';

storiesOf('Layouts|List', module).add(
  'With one view',
  () => (
    <List
      enablePost
      post={() => null}
      totalDocs={2}
      name="resources"
      addComponent={() => (
        <button type="button">Add</button>
      )}
      rowComponent={({ name, children }) => (
        <>
          <TableCellHeader name={name} />
          {children}
        </>
      )}
      headers={(t) => [t('name')]}
      data={{
        resources: [
          {
            id: 1,
            name: 'Jon',
          },
          {
            id: 2,
            name: 'Doe',
          },
        ],
      }}
    />
  ),
);
