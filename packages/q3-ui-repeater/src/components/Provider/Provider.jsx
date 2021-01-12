import React from 'react';
import PropTypes from 'prop-types';
import Exports from 'q3-ui-exports';
import { useAuth } from 'q3-ui-permissions';
import { useChecked } from 'useful-state';
import Auth from '../Auth';
import Repeater from '../Repeater';
import Context from '../state';

const Provider = ({
  name,
  collectionName,
  edit,
  editBulk,
  create,
  remove,
  removeBulk,
  poll,
  ...rest
}) => {
  const multiselect = useChecked();
  const auth = useAuth(collectionName);
  const value = {
    auth,
    name,
    collectionName,
    multiselect,
    edit,
    editBulk,
    remove,
    removeBulk,
    poll,
    create,
  };

  return (
    <Context.Provider value={value}>
      <Auth op="Read">
        <Exports>
          <Repeater {...rest} />
        </Exports>
      </Auth>
    </Context.Provider>
  );
};

Provider.defaultProps = {
  edit: null,
  collectionName: null,
  create: null,
  remove: null,
  editBulk: null,
  removeBulk: null,
  poll: null,
};

Provider.propTypes = {
  edit: PropTypes.func,
  name: PropTypes.string.isRequired,
  collectionName: PropTypes.string,
  create: PropTypes.func,
  remove: PropTypes.func,
  editBulk: PropTypes.func,
  removeBulk: PropTypes.func,
  poll: PropTypes.func,
};

export default Provider;
