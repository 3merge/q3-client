import React from 'react';
import { storiesOf } from '@storybook/react';

import Table from '.';
import { Wrapper } from '../_helpers/storyUtils';
import sidebar from './README.md';

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
  .addParameters({
    jest: ['table'],
    readme: {
      sidebar,
    },
  })
  .add('With loading', () => {
    const [v, setV] = React.useState(0);

    const timer = setTimeout(() => {
      if (v < 100) setV(v + 2);
      clearTimeout(timer);
    }, 100);

    return (
      <Wrapper>
        <Table {...props} loading progress={v} />
      </Wrapper>
    );
  })
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
  .add('With rows', () => (
    <Wrapper>
      <Table
        {...props}
        loading={false}
        total={stubs.length}
        rows={stubs}
      />
    </Wrapper>
  ))
  .add('With rows and services', () => {
    const Simulated = () => {
      const [seed, setSeed] = React.useState(stubs);
      const params = new URLSearchParams(
        window.location.search,
      );

      const paged = parseInt(params.get('page'), 10);
      const page = Number.isNaN(paged) ? 1 : paged;
      const data = seed.slice(page - 1, page * 25);

      const deleteMany = (ids = []) =>
        new Promise((resolve) => {
          setSeed(seed.filter((v, i) => !ids.includes(i)));
          resolve();
        });

      const refresh = () =>
        new Promise((resolve) => {
          setSeed(stubs);
          resolve();
        });

      const mark = (id, featured) => () =>
        setSeed(
          seed.map((v, i) =>
            i === id ? { ...v, featured } : v,
          ),
        );

      // eslint-disable-next-line
      const downloadMany = () => alert('Download');

      return (
        <Wrapper>
          <Table
            {...props}
            loading={false}
            total={seed.length}
            rows={data}
            mark={mark}
            deleteMany={deleteMany}
            downloadMany={downloadMany}
            poll={refresh}
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
            filterProps={{
              onChange: () => null,
              total: 1,
              initialValues: {
                foo: '',
              },
              render: () => {
                <p>HEY!</p>;
              },
            }}
          />
        </Wrapper>
      );
    };

    return <Simulated />;
  });
