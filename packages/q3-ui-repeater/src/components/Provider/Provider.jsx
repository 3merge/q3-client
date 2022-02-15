import React from 'react';
import PropTypes from 'prop-types';
import Exports from 'q3-ui-exports';
import Repeater from '../Repeater';
import Context, { ActionContext } from '../state';
import useProviderAuth from '../useProviderAuth';

const Provider = ({
  disableAdd,
  disableEditor,
  disableRemove,
  create,
  edit,
  editBulk,
  poll,
  remove,
  removeBulk,
  ...rest
}) => {
  const auth = useProviderAuth(rest);
  const [state, setState] = React.useState();
  const serviceEnablementProps = {
    disableAdd,
    disableEditor,
    disableRemove,
  };

  const contextProps = React.useMemo(
    () => ({
      ...auth,
      ...serviceEnablementProps,
      name: rest.name,
      edit,
      editBulk,
      remove,
      removeBulk,
      poll,
      create,
    }),
    [auth, serviceEnablementProps],
  );

  const actionProps = React.useMemo(
    () => ({
      state,
      setState,
    }),
    [state],
  );

  return !auth.disable ? (
    <ActionContext.Provider value={actionProps}>
      <Context.Provider value={contextProps}>
        <Exports>
          <Repeater {...rest} />
        </Exports>
      </Context.Provider>
    </ActionContext.Provider>
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

  disableAdd: false,
  disableEditor: false,
  disableRemove: false,
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

  disableAdd: PropTypes.bool,
  disableEditor: PropTypes.bool,
  disableRemove: PropTypes.bool,
};

export default Provider;
