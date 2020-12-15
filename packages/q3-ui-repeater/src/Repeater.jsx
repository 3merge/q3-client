import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import { useChecked, useValue } from 'useful-state';
import Exports from 'q3-ui-exports';
import Pagination from '@material-ui/lab/Pagination';
import {
  Box,
  Table,
  InputLabel,
  NativeSelect,
} from '@material-ui/core';
import { Auth, AddButton, List } from './components';
import Context from './components/state';
import { override } from './helpers';
import usePagination from './usePagination';
import { sort } from './sort.test';

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
  perPage,
  sortOptions = [],
  ...rest
}) => {
  const search = useValue('');
  const multiselect = useChecked();
  const auth = useAuth(collectionName);
  const { t } = useTranslation();
  const [sortBy, setSortBy] = React.useState(
    () => sortOptions[0] || '',
  );

  const handleChange = (e) => setSortBy(e.target.value);

  const sorted = sortBy ? sort({ sortBy }, data) : data;
  const { totalPage, onChange, list } = usePagination(
    perPage,
    sorted,
  );

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
          <Box>
            <InputLabel htmlFor="age-native-helper">
              {t('sortBy')}
            </InputLabel>
            <NativeSelect
              value={sortBy}
              onChange={handleChange}
              inputProps={{
                name: t('sortBy'),
                id: 'age-native-helper',
              }}
            >
              {sortOptions.map((x, i) => (
                <option
                  value={x}
                  key={x + i}
                  aria-label={x}
                >
                  {t(x)}
                </option>
              ))}
            </NativeSelect>
          </Box>

          <Table>
            {list.length > 0 && (
              <List
                {...rest}
                data={list}
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
          <Box
            display="flex"
            justifyContent="center"
            mt={2}
          >
            <Pagination
              color="primary"
              count={totalPage}
              onChange={onChange}
            />
          </Box>
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
  perPage: PropTypes.number,
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
  perPage: 15,
  ...override.defaultProps,
};

export default Repeater;
