import React from 'react';
import { storiesOf } from '@storybook/react';
import FolderIcon from '@material-ui/icons/Folder';
import Table, { TableViewSkeleton } from '.';
import TableActionBar from '../tableActionBar';
import { Wrapper } from '../_helpers/storyUtils';

const props = {
  columns: [
    ['name', 'email', 'profilePic'],
    'phone',
    'date',
    'age',
  ],
};

const stubs = [];
for (let i = 0; i < 50; i += 1) {
  stubs.push({
    id: i,
    name: 'Mike Ibberson - My name',
    email:
      'mike@demo.ca, mike2@demo.ca, mike3@demo.ca, mike4@demo.ca, mike5@demo.ca',
    phone: '416-000-1234',
    date: '2020-01-17T13:25:00.000Z',
    profilePic: 'https://picsum.photos/id/57/200/300',
    featured: i % 2,
    age: 28,
  });
}

storiesOf('Components|Table', module)
  .add('Skeleton', () => (
    <Wrapper>
      <TableViewSkeleton />
    </Wrapper>
  ))
  .add('Simple rows', () => (
    <Wrapper>
      <Table {...props} total={stubs.length} rows={stubs} />
    </Wrapper>
  ))
  .add('With rows and services', () => {
    const Simulated = () => {
      const [seed] = React.useState(stubs);
      const params = new URLSearchParams(
        window.location.search,
      );

      const paged = parseInt(params.get('page'), 10);
      const page = Number.isNaN(paged) ? 1 : paged;
      const data = seed.slice(page - 1, page * 25);

      // eslint-disable-next-line
      const downloadMany = () => alert('Download');

      return (
        <Wrapper>
          <TableActionBar
            actions={[
              { label: 'Download', icon: FolderIcon },
            ]}
          >
            <Table
              {...props}
              total={seed.length}
              rows={data}
              rowToolbar={[
                {
                  onClick: () => null,
                  label: 'Export',
                },
                {
                  onClick: () => null,
                  label: 'Start order',
                },
              ]}
            />
          </TableActionBar>
        </Wrapper>
      );
    };

    return <Simulated />;
  });
