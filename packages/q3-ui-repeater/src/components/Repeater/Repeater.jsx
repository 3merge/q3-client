import React from 'react';
import PropTypes from 'prop-types';
import Asset from 'q3-ui-assets';
import { Box, Grid } from '@material-ui/core';
import { compose } from 'lodash/fp';
import { size } from 'lodash';
import ActionBar from '../ActionBar';
import AddItem from '../AddItem';
import RepeaterTable from '../RepeaterTable';
import RepeaterOptions from '../RepeaterOptions';
import {
  checkValues,
  filter,
  sort,
  search,
  group,
  reducer,
} from '../../helpers';

const optionType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    fn: PropTypes.func,
  }),
);

const init = {
  sortBy: 0,
  filterBy: 0,
  input: '',
};

const Repeater = ({
  addComponent,
  bulkEditorComponent,
  emptyComponent,
  addDisabled,
  children,
  data,
  disableSearch,
  filterOptions,
  groupBy,
  initialValues,
  sortOptions,
  ...rest
}) => {
  const [state, dispatch] = React.useReducer(reducer, init);

  const run = compose(
    group(groupBy),
    sort(sortOptions[state.sortBy]),
    filter(filterOptions[state.filterBy]),
    search(state.input),
  );

  const newData = run(data);

  const renderEmpty = () =>
    emptyComponent || (
      <Box>
        <Asset icon="Empty" title="empty" />
      </Box>
    );

  return (
    <>
      <Box
        bgcolor="background.paper"
        mb={Array.isArray(newData) ? 1 : 0}
      >
        <Grid alignItems="center" container spacing={2}>
          <Grid item xs={12} sm>
            <RepeaterOptions
              state={state}
              dispatch={dispatch}
              filterOptions={filterOptions}
              sortOptions={sortOptions}
              disableSearch={disableSearch}
            >
              <ActionBar
                renderSelected={bulkEditorComponent}
                length={size(data)}
              />
            </RepeaterOptions>
          </Grid>
          {!addDisabled && (
            <Grid item xs={addComponent ? 12 : 'auto'}>
              <AddItem
                addComponent={addComponent}
                initialValues={initialValues}
              >
                {children}
              </AddItem>
            </Grid>
          )}
        </Grid>
      </Box>
      {checkValues(data, newData) ? (
        <Box>
          <RepeaterTable
            data={newData}
            initialValues={initialValues}
            {...rest}
          >
            {children}
          </RepeaterTable>
        </Box>
      ) : (
        renderEmpty()
      )}
    </>
  );
};

Repeater.defaultProps = {
  addComponent: null,
  addDisabled: false,
  data: [],
  disableSearch: false,
  groupBy: null,
  sortOptions: [],
  filterOptions: [],
  emptyComponent: null,
};

Repeater.propTypes = {
  addComponent: PropTypes.node,
  emptyComponent: PropTypes.node,
  addDisabled: PropTypes.bool,
  initialValues: PropTypes.shape({}).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  disableSearch: PropTypes.bool,
  children: PropTypes.node.isRequired,
  sortOptions: optionType,
  filterOptions: optionType,
  groupBy: optionType,
};

export default Repeater;
