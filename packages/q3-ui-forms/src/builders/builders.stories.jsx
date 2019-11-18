import React from 'react';
import { storiesOf } from '@storybook/react';
import Inputs, { CheckSet } from 'q3-ui/lib/inputs';
import { QueryLayer, DataLayer } from './location';

storiesOf('Form Builders', module).add('Location', () => {
  const init = {
    search: '',
    categories: [],
  };

  return (
    <>
      <QueryLayer initialValues={init}>
        {(data) => (
          <div>
            <p>{JSON.stringify(data)}</p>
          </div>
        )}
      </QueryLayer>
      <DataLayer initialValues={init}>
        {() => (
          <>
            <Inputs name="search" type="search" />
            <CheckSet name="categories" options={[
              { label: 'One', value: 1 },
              { label: 'Two', value: 2 },
              { label: 'Three', value: 3 },
              ]} />
          </>
        )}
      </DataLayer>
    </>
  );
});
