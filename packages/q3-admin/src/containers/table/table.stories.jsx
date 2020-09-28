import React from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from 'q3-ui-permissions';
import { Store } from '../state';
import Table from '.';
import Groups from '../../components/groups';

export default {
  title: 'Q3 Admin/Containers/Table',
  parameters: {
    component: Table,
    componentSubtitle:
      'Q3 Datatable integration with Q3 Admin context',
  },
};

const stub = {
  collectionName: 'examples',
  resourceName: 'examples',
};

const Wrapper = ({ children, permissions }) => (
  <AuthContext.Provider
    value={{
      state: {
        permissions: [
          {
            coll: stub.collectionName,
            op: 'Read',
            ownership: 'Any',
            fields: '*',
          },
          ...permissions.map((item) => ({
            ownership: 'Any',
            fields: '*',
            ...item,
          })),
        ],
      },
    }}
  >
    {children}
  </AuthContext.Provider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  permissions: PropTypes.arrayOf(
    PropTypes.shape({
      coll: PropTypes.string,
      op: PropTypes.string,
    }),
  ),
};

Wrapper.defaultProps = {
  permissions: [],
};

const renderRows = () => {
  const arr = [];

  for (let i = 0; i < 50; i += 1) {
    arr.push({
      id: 1,
      name: 'First row',
    });
  }

  return arr;
};
export const WithFilter = () => (
  <Wrapper
    permissions={[
      { op: 'Delete', coll: stub.collectionName },
    ]}
  >
    <Store.Provider
      value={{
        ...stub,
        // eslint-disable-next-line
        removeBulk: () => alert('Bulk delete!'),
        data: renderRows(),
      }}
    >
      <Table
        renderTop={() => (
          <Groups
            search="?"
            queries={{
              Ready: 'kind=ready',
              NotReady: 'kind=notReady',
              AlmostReady: 'kind=almostReady',
            }}
          />
        )}
        renderForm={() => (
          <p>
            Filters! Embed any filter form here to redact
            items from the Context.
          </p>
        )}
      />
    </Store.Provider>
  </Wrapper>
);

export const WithFilterTriggerOnly = () => (
  <Wrapper
    permissions={[
      { op: 'Delete', coll: stub.collectionName },
    ]}
  >
    <Store.Provider
      value={{
        ...stub,
        // eslint-disable-next-line
        removeBulk: () => alert('Bulk delete!'),
        data: renderRows(),
      }}
    >
      <Table
        renderForm={() => (
          <p>
            Filters! Embed any filter form here to redact
            items from the Context.
          </p>
        )}
      />
    </Store.Provider>
  </Wrapper>
);

export const Error = () => (
  <Wrapper>
    <Store.Provider
      value={{
        fetchingError: true,
        ...stub,
      }}
    >
      <Table renderTop={() => 'Show!'} />
    </Store.Provider>
  </Wrapper>
);

export const Loading = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Wrapper>
      <Store.Provider
        value={{
          fetching: loading,
          ...stub,
        }}
      >
        <Table renderForm={() => 'Hi'} />
      </Store.Provider>
    </Wrapper>
  );
};
