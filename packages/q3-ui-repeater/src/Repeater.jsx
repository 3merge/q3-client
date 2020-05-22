import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'q3-ui-permissions';
import { useChecked, useValue } from 'useful-state';
import Exports from 'q3-ui-exports';
import Table from '@material-ui/core/Table';
import Graphic from 'q3-ui-assets';
import CustomActionBar from './components/ActionBar';
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
  renderCustomAddForm,
  renderNestedTableRow,
  renderMobileColumns,
  addComponent: AddComponent,
  bulkEditorComponent: BulkEditorComponent,
  actions,
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
      }}
    >
      <Auth op="Read">
        <Exports>
          <Auth op="Create">
            {AddComponent ? (
              <AddComponent
                create={create}
                initialValues={initialValues}
              />
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
          <CustomActionBar data={data}>
            {BulkEditorComponent && <BulkEditorComponent />}
          </CustomActionBar>
          <Table>
            {data.length > 0 ? (
              <List
                {...rest}
                data={data}
                disableEditor={disableEditor}
                disableRemove={disableRemove}
                renderNestedTableRow={renderNestedTableRow}
                renderMobileColumns={renderMobileColumns}
              >
                {children}
              </List>
            ) : (
              <Graphic icon="Build" title="addFirst" />
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
