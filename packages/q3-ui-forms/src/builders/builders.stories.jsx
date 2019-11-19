import React from 'react';
import { storiesOf } from '@storybook/react';
import MockApi from 'q3-axios-mock';
import Auth from 'q3-ui-permissions';
import Inputs, { CheckSet } from 'q3-ui/lib/inputs';
import { QueryLayer, DataLayer } from './location';
import Submit from './submit';

storiesOf('Form Builders', module)
  .add('Location', () => {
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
              <CheckSet
                name="categories"
                options={[
                  { label: 'One', value: 1 },
                  { label: 'Two', value: 2 },
                  { label: 'Three', value: 3 },
                ]}
              />
            </>
          )}
        </DataLayer>
      </>
    );
  })
  .add('Submit', () => {
    const schema = {
      firstName: {
        type: Inputs,
        expected: 'text',
        required: true,
      },
      lastName: {
        type: Inputs,
        expected: 'text',
        required: true,
      },
    };

    const definePermission = (m) => {
      m.onGet('/profile').reply(200, {
        profile: {
          id: 1,
          role: 'Admin',
        },
        permissions: [
          {
            coll: 'q3-api-protected',
            op: 'Read',
            role: 'Admin',
            ownership: 'Any',
            fields: '*',
          },
        ],
      });
    };

    return (
      <MockApi define={definePermission}>
        <Auth>
          <Submit
            title="Demo"
            data={{ createdBy: 123 }}
            schema={schema}
            collectionName="q3-api-protected"
          />
          <Submit
            title="Demo"
            data={{ createdBy: 123 }}
            schema={schema}
            collectionName="q3-api-protected"
          >
            {() => <p>Child! Free to render however</p>}
          </Submit>
        </Auth>
      </MockApi>
    );
  });
