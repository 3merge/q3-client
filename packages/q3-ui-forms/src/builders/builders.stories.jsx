import React from 'react';
import { createHistory } from '@reach/router';
import { storiesOf } from '@storybook/react';
import LocationFormBuilder from './location';

storiesOf('Form Builders', module).add(
  'LocationFormBuilder',
  () => (
    <LocationFormBuilder
      nodes={['Data item post-filter']}
      searchForm={({ values, setFieldValue }) => (
        <input
          name="search"
          type="search"
          value={values.search}
          onChange={({ target: { value } }) =>
            setFieldValue('search', value)
          }
        />
      )}
      initialValues={{
        search: '',
      }}
      render={(SearchForm, data) => (
        <div>
          {SearchForm}
          <p>{JSON.stringify(createHistory(window))}</p>
          <ul>
            {data.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      )}
    />
  ),
);
