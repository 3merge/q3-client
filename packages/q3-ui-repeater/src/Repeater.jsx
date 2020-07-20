import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import { useChecked, useValue } from 'useful-state';
import Exports from 'q3-ui-exports';
import Table from '@material-ui/core/Table';
import { Auth, AddButton, List } from './components';
import Context from './components/state';
import { override } from './helpers';

const Repeater = ({
  data,
  name,
  edit,
  editBulk,
  create,
  remove,
  removeBulk,
  children,
  initialValues,
  collectionName,
  disableEditor,
  disableRemove,
  disableMultiselect,
  renderCustomAddForm,
  renderNestedTableRow,
  addComponent,
  bulkEditorComponent,
  disableEmptyState,
  actions,
  poll,
  ...rest
}) => {
  const search = useValue('');
  const multiselect = useChecked();
  const auth = useAuth(collectionName);

  return (
    <Context.Provider
      value={{
        auth,
        name,
        collectionName,
        multiselect,
        search,
        edit,
        editBulk,
        create,
        remove,
        removeBulk,
        poll,
      }}
    >
      <Auth op="Read">
        <Exports>
          <Auth op="Create">
            {addComponent ? (
              React.cloneElement(addComponent, {
                initialValues,
                create,
              })
            ) : (
              <AddButton
                create={create}
                initialValues={initialValues}
                {...rest}
              >
                {children}
              </AddButton>
            )}
          </Auth>

          <Table>
            {data.length > 0 && (
              <List
                {...rest}
                data={data}
                disableEditor={disableEditor}
                disableMultiselect={
                  disableMultiselect ||
                  (!auth.canDelete && !bulkEditorComponent)
                }
                disableRemove={disableRemove}
                renderNestedTableRow={renderNestedTableRow}
                actionComponent={bulkEditorComponent}
              >
                {children}
              </List>
            )}
          </Table>
        </Exports>
      </Auth>
    </Context.Provider>
  );
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

  disableEmptyState: PropTypes.bool,
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
  disableEmptyState: false,
  ...override.defaultProps,
};

export default Repeater;
