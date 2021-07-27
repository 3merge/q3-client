import React from 'react';
import PropTypes from 'prop-types';
import Exports from 'q3-ui-exports';
import Repeater from '../Repeater';
import Context from '../state';
import useProviderAuth from '../useProviderAuth';

const Provider = ({
  edit,
  editBulk,
  create,
  remove,
  removeBulk,
  poll,
  ...rest
}) => {
  const auth = useProviderAuth(rest);

  return !auth.disable ? (
    <Context.Provider
      value={{
        ...auth,
        name: rest.name,
        edit,
        editBulk,
        remove,
        removeBulk,
        poll,
        create,
      }}
    >
      <Exports>
        <Repeater {...rest} />
      </Exports>
    </Context.Provider>
  ) : null;
};

Provider.defaultProps = {
  edit: null,
  collectionName: null,
  create: null,
  remove: null,
  editBulk: null,
  removeBulk: null,
  poll: null,
  name: null,
};

Provider.propTypes = {
  edit: PropTypes.func,
  name: PropTypes.string,
  collectionName: PropTypes.string,
  create: PropTypes.func,
  remove: PropTypes.func,
  editBulk: PropTypes.func,
  removeBulk: PropTypes.func,
  poll: PropTypes.func,
};

export default Provider;
