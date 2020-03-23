import React from 'react';
import { invoke } from 'lodash';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import Dialog from 'q3-ui-dialog';
import { useChecked, useValue } from 'useful-state';
import {
  ActionBar,
  AddButton,
  List,
  Search,
} from './components';
import Context from './components/state';

const Repeater = ({
  data,
  name,
  edit,
  create,
  remove,
  children,
  initialValues,
  collectionName,
  ...rest
}) => {
  const search = useValue('');
  const multiselect = useChecked();
  const auth = useAuth(collectionName);
  const execAuthFn = (fn, returnValue) =>
    invoke(auth, fn, name) || !collectionName
      ? returnValue
      : null;

  const canSeeSub = execAuthFn('canSeeSub', true);
  const onRemove = execAuthFn('canDeleteSub', remove);
  const onUpdate = execAuthFn('canEditSub', edit);

  return canSeeSub ? (
    <Context.Provider
      value={{
        auth,
        name,
        collectionName,
        multiselect,
        search,
      }}
    >
      <Search />
      <ActionBar />
      <List
        data={data}
        onRemove={onRemove}
        onUpdate={onUpdate}
        {...rest}
      >
        {children}
      </List>
      <Dialog
        {...rest}
        variant="drawer"
        title={`${name}Create`}
        renderContent={(close) =>
          React.cloneElement(children, {
            onSubmit: (...params) =>
              create(...params).then(() => {
                close();
              }),
            isNew: true,
            collectionName,
            initialValues,
          })
        }
        renderTrigger={(open) => (
          <AddButton
            onClick={execAuthFn('canCreateSub', open)}
          />
        )}
      />
    </Context.Provider>
  ) : null;
};

Repeater.propTypes = {
  collectionName: PropTypes.string,
  name: PropTypes.string.isRequired,
  primary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  secondary: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func,
  edit: PropTypes.func,
  create: PropTypes.func,
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.shape({}).isRequired,
};

Repeater.defaultProps = {
  data: [],
  collectionName: null,
  remove: null,
  edit: null,
  create: null,
};

export default Repeater;
