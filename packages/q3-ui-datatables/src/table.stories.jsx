import React from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import Box from '@material-ui/core/Box';
import TableView, {
  TableBadge,
  TableProgress,
  TableCheck,
} from '.';

export default {
  title: 'Q3 Datatables|Table',
  parameters: {
    component: TableView,
    componentSubtitle: 'For data-rich UIs and list views',
  },
};

export const Full = () => (
  <Box p={4} style={{ backgroundColor: 'whitesmoke' }}>
    <TableView
      id="for-testing"
      total={50}
      data={[
        {
          name: 'Jonny',
          description: 'This is a description',
          email: 'jonny@3merge.ca',
          photo: 'https://i.pravatar.cc/150?img=17',
          status: 'Done',
          color: 'success',
          value: 100,
          verified: true,
        },
        {
          name: 'Helen',
          description: 'This is a description',
          email: 'helen@3merge.ca',
          photo: 'https://i.pravatar.cc/150?img=18',
          status: 'Not Ready',
          color: 'danger',
          value: 2,
          started: new Date().toISOString(),
          numberOfRecords: 66,
        },
        {
          name: 'Nolan',
          description: 'This is a description',
          email: 'nolan@3merge.ca',
          photo: 'https://i.pravatar.cc/150?img=19',
          status: 'Done',
          color: 'success',
          value: 87,
          verified: true,
          numberOfRecords: 99,
        },
        {
          name: 'Brie',
          description: 'This is a description',
          email: 'brie@3merge.ca',
          photo: 'https://i.pravatar.cc/150?img=20',
          status: 'Under Review',
          color: 'warning',
          value: 55,
          started: new Date().toISOString(),
          numberOfRecords: 12,
          cost: {
            dealer: '12.99',
          },
        },
      ]}
      allColumns={[
        'status',
        'progress',
        'verified',
        'email',
        'started',
        'numberOfRecords',
        'cost.dealer',
      ]}
      resolvers={(v) => ({
        ...v,
        disableLink: v.id === 2,
        two: <TableCheck show={v.two} />,
        progress: <TableProgress value={v.progress} />,
        verified: <TableCheck show={v.verified} />,
        email: <a href={`mailTo:${v.email}`}>{v.email}</a>,
        status: (
          <TableBadge status={v.status} color={v.color} />
        ),
      })}
      actions={[
        {
          label: 'Yikes',
          onClick: () => null,
          icon: AccountBox,
        },
      ]}
    />
  </Box>
);
