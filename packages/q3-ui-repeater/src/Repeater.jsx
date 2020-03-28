import React from 'react';
import { invoke } from 'lodash';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import Dialog from 'q3-ui-dialog';
import { useChecked, useValue } from 'useful-state';
import Exports, { Actionbar } from 'q3-ui-exports';
import { AddButton, List } from './components';
import Context from './components/state';
import { override } from './helpers';

const Repeater = ({
  data,
  name,
  edit,
  create,
  remove,
  children,
  initialValues,
  collectionName,
  disableEditor,
  disableRemove,
  renderCustomAddForm,
  renderNestedTableRow,
  renderMobileColumns,
  actions,
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
  const hasCustomRenderer =
    typeof renderCustomAddForm === 'function';

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
      {hasCustomRenderer &&
        execAuthFn(
          'canCreateSub',
          renderCustomAddForm({
            onSubmit: create,
            initialValues,
            collectionName,
            ...rest,
          }),
        )}
      <Exports>
        <Actionbar actions={actions} data={data} />
        <List
          createRenderer={
            !hasCustomRenderer ? (
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
                    onClick={execAuthFn(
                      'canCreateSub',
                      open,
                    )}
                  />
                )}
              />
            ) : null
          }
          data={data}
          onRemove={onRemove}
          onUpdate={onUpdate}
          disableEditor={disableEditor}
          disableRemove={disableRemove}
          renderNestedTableRow={renderNestedTableRow}
          renderMobileColumns={renderMobileColumns}
          {...rest}
        >
          {children}
        </List>
      </Exports>
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

  /**
   * Renderer for replacing the Add component.
   */
  renderCustomAddForm: PropTypes.func,

  /**
   * Renderer for custom full-span TableRow component nesting.
   */
  renderNestedTableRow: PropTypes.func,

  /**
   * Renderer for mobile-columns on small screens.
   * The "attributes" disappear on tablet/phone, so we created
   * a custom renderer for inside the row header.
   */
  renderMobileColumns: PropTypes.func,
  ...override.propTypes,
};

Repeater.defaultProps = {
  data: [],
  collectionName: null,
  remove: null,
  edit: null,
  create: null,
  renderCustomAddForm: null,
  renderNestedTableRow: null,
  ...override.defaultProps,
};

export default Repeater;
