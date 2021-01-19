import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Grid } from '@material-ui/core';
import { compose } from 'lodash/fp';
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

  return (
    <Paper
      elevation={0}
      style={{
        top: 0,
        position: 'sticky',
        zIndex: 10,
        padding: '2rem',
      }}
    >
      <Box mb={2}>
        <ActionBar
          data={data}
          renderSelected={bulkEditorComponent}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
            <RepeaterOptions
              state={state}
              dispatch={dispatch}
              filterOptions={filterOptions}
              sortOptions={sortOptions}
              disableSearch={disableSearch}
            />
          </Grid>
          {!addDisabled && (
            <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
              <Box mt={[0, 0, 0.5]}>
                <AddItem
                  addComponent={addComponent}
                  initialValues={initialValues}
                >
                  {children}
                </AddItem>
              </Box>
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
        <Box>
          <span>No results</span>
        </Box>
      )}
    </Paper>
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
};

Repeater.propTypes = {
  addComponent: PropTypes.node,
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
