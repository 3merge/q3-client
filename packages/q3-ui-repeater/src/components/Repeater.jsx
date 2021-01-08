import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Grid } from '@material-ui/core';
import { array } from 'q3-ui-helpers';
import { compose } from 'lodash/fp';
import { AddItem, RepeaterTable, RepeaterOptions } from '.';
import useStyles from './useStyle';
import {
  filter,
  sort,
  search,
  group,
  reducer,
} from '../helper';

const optionType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    fn: PropTypes.func,
  }),
);

const size = { xl: 'auto', lg: 'auto' };
const init = {
  sortBy: 0,
  filterBy: 0,
  input: 0,
};

const Repeater = ({
  addComponent,
  children,
  data,
  filterOptions,
  groupBy,
  initialValues,
  sortOptions,
  ...rest
}) => {
  const [state, dispatch] = React.useReducer(reducer, init);
  const { t } = useTranslation();

  const cls = useStyles();

  const run = compose(
    // group(groupBy),
    sort(sortOptions[state.sortBy]),
    filter(filterOptions[state.filterBy]),
    search(state.input),
  );

  const newData = run(data);

  return (
    <Paper
      elevation={0}
      style={{ top: 0, position: 'sticky', zIndex: 10 }}
    >
      <Box px={2}>
        <Grid container>
          <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
            <RepeaterOptions
              state={state}
              dispatch={dispatch}
              filterOptions={filterOptions}
              sortOptions={sortOptions}
            />
          </Grid>
          <Grid xs={12} sm={12} md={3} lg={2} xl={2}>
            <AddItem
              addComponent={addComponent}
              initialValues={initialValues}
            >
              {children}
            </AddItem>
          </Grid>
        </Grid>
        <Box>
          <RepeaterTable data={newData} {...rest}>
            {children}
          </RepeaterTable>
        </Box>
      </Box>
    </Paper>
  );
};

export default Repeater;
