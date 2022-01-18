import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@material-ui/core';
import useRest from 'q3-ui-rest';
import { map } from 'lodash';

const withUsers = (Component) => {
  const InternalComponent = ({
    collectionName,
    id,
    ...rest
  }) => {
    const { fetching, users } = useRest({
      runOnInit: true,
      url: '/audit-users',
      key: 'data',
      pluralized: 'data',
      location: {
        search: `?id=${id}&collectionName=${collectionName}`,
      },
    });

    const data = map(users, (user) => ({
      label: user.name,
      value: user.id || user.value,
    }));

    return fetching ? (
      <CircularProgress />
    ) : (
      <Component {...rest} users={data} />
    );
  };

  InternalComponent.propTypes = {
    id: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
  };

  return InternalComponent;
};

export default withUsers;
