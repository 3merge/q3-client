import React from 'react';
import { storiesOf } from '@storybook/react';
import TableCell from '@material-ui/core/TableCell';
import Label from '@material-ui/icons/Label';
import Table, { TableCellHeader } from '.';
import { Wrapper } from '../../helpers/storyUtils';
import sidebar from './README.md';
import Avatar from '../avatar';

const props = {
  header: ['Column', 'Column two', 'Column three'],
  onChange: () => null,
};

const stubs = [];
for (let i = 0; i < 50; i += 1) {
  stubs.push({
    id: i,
    name: 'Mike',
    email: 'mike@demo.ca',
    phone: '416-000-1234',
  });
}

storiesOf('Components|Table', module)
  .addParameters({
    jest: ['table'],
    readme: {
      sidebar,
    },
  })
  .add('With loading', () => (
    <Wrapper>
      <Table {...props} loading />
    </Wrapper>
  ))
  .add('With error', () => (
    <Wrapper>
      <Table {...props} error />
    </Wrapper>
  ))
  .add('With empty', () => (
    <Wrapper>
      <Table {...props} rows={[]} />
    </Wrapper>
  ))
  .add('With rows', () => {
    const Simulated = () => {
      const params = new URLSearchParams(
        window.location.search,
      );
      const paged = parseInt(params.get('page'), 10);
      const page = Number.isNaN(paged) ? 1 : paged;
      const data = stubs.slice(page - 1, page * 25);

      return (
        <Wrapper>
          <Table
            {...props}
            loading={false}
            total={stubs.length}
            rows={data}
            rowTemplate={({
              name,
              email,
              phone,
              children,
            }) => (
              <>
                <TableCellHeader name={name} sub={email}>
                  <Avatar word="hey" icon={Label} />
                </TableCellHeader>
                <TableCell>{email}</TableCell>
                <TableCell>{phone}</TableCell>
                {children}
              </>
            )}
          />
        </Wrapper>
      );
    };

    return <Simulated />;
  });
