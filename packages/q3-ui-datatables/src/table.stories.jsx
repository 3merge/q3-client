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
  unknown: undefined,
  ...args,
});

export default {
  title: 'Q3 Datatables|Table',
  parameters: {
    component: TableView,
    componentSubtitle: 'For data-rich UIs and list views',
  },
};

export const Full = () => (
  <TableView
    id="for-testing"
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
      disableLink
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
