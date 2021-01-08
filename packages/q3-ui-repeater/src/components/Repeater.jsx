import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Box, Paper, Grid } from '@material-ui/core';
import { array } from 'q3-ui-helpers';
import { compose } from 'lodash/fp';
import {
  AddItem,
  RepeaterTable,
  Search,
  SelectForm,
} from '.';
import useStyles from './useStyle';
import withReducer from '../withReducer';
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
const forms = { md: 6, sm: 6, xs: 12 };
const init = {
  sortBy: 0,
  filterBy: 0,
  input: 0,
};

const Repeater = ({
  addComponent,
  children,
  create,
  collectionName,
  data,
  filterOptions,
  groupBy,
  initialValues,
  name,
  sortOptions,
  ...rest
}) => {
  const [state, dispatch] = React.useReducer(reducer, init);
  const { t } = useTranslation();
  const Form = withReducer(SelectForm, [state, dispatch]);

  const handleInput = (val) =>
    dispatch({ type: 'input', payload: val });

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
        <Grid
          spacing={2}
          alignItems="center"
          container
          justify="space-between"
        >
          <Grid item xl lg md={10} sm={9} xs={9}>
            <Search handleInput={handleInput} />
          </Grid>
          <Grid
            item
            {...size}
            {...forms}
            className={cls.form}
          >
            <Form
              options={filterOptions}
              label="filterBy"
              data={data}
            />
          </Grid>
          <Grid
            item
            {...size}
            {...forms}
            className={cls.form}
          >
            <Form
              options={sortOptions}
              label="sortBy"
              data={data}
            />
          </Grid>
          <Grid item {...size} md={2} sm={3} xs={3}>
            <AddItem
              addComponent={addComponent}
              initialValues={initialValues}
              create={create}
              collectionName={collectionName}
              name={name}
            >
              {children}
            </AddItem>
          </Grid>
        </Grid>
        <Box>
          <RepeaterTable
            data={newData}
            collectionName={collectionName}
            {...rest}
          >
            {children}
          </RepeaterTable>
        </Box>
      </Box>
    </Paper>
  );
};

export default Repeater;
