import React from 'react';
import { storiesOf } from '@storybook/react';
import Table from '.';
import { Wrapper } from '../_helpers/storyUtils';
import sidebar from './README.md';

const props = {
  columns: [['name', 'email', 'profilePic'], 'phone'],
};

const stubs = [];
for (let i = 0; i < 50; i += 1) {
  stubs.push({
    id: i,
    name: 'Mike',
    email: 'mike@demo.ca',
    phone: '416-000-1234',
    profilePic: 'https://picsum.photos/id/57/200/300',
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
          />
        </Wrapper>
      );
    };

    return <Simulated />;
  });
