import React from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import TableView, {
  TableRow,
  TableBadge,
  TableProgress,
  TableCheck,
} from '.';

const fixture = (
  args = {},
  status = 'complete',
  color = 'primary',
  value = 40,
) => ({
  name: 'Mike',
  description: 'This is a description',
  email: (
    <a href="mailTo:mibberson@3merge.ca">
      mibberson@3merge.ca
    </a>
  ),
  status: <TableBadge status={status} color={color} />,
  progress: <TableProgress value={value} />,
  verified: <TableCheck show={color !== 'danger'} />,
  ...args,
});

export default {
  title: 'TableView',

  parameters: {
    component: TableView,
    componentSubtitle: 'subtitle',
    componentDescription: 'This is imort',
  },
};

export const populated = () => (
  <TableView
    fixedWidths={['100%', '100%', '125px', '96px', '75px']}
    total={50}
    actions={[
      {
        label: 'Yikes',
        onClick: () => null,
        icon: AccountBox,
      },
    ]}
  >
    <TableRow
      id={1}
      columns={fixture(
        { photo: <AccountBox /> },
        'Hardly Started',
        'warning',
        20,
      )}
    />
    <TableRow
      id={2}
      columns={fixture(
        {
          photo: 'https://i.pravatar.cc/150?img=17',
        },
        'Done',
        'success',
        100,
      )}
    />
    <TableRow
      id={3}
      columns={fixture({}, 'In-Progress', 'danger', 49)}
    />
  </TableView>
);
