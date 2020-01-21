import React from 'react';
import { storiesOf } from '@storybook/react';
import AccountBox from '@material-ui/icons/AccountBox';
import Table, {
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

storiesOf('DataTables|Populated', module).add(
  'With many columns',
  () => (
    <Table
      fixedWidths={[
        '100%',
        '100%',
        '125px',
        '96px',
        '75px',
      ]}
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
    </Table>
  ),
);
