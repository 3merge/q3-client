import React from 'react';
import PropTypes from 'prop-types';
import { useValue, useChecked } from 'useful-state';
import { useTranslation } from 'react-i18next';
import { compose } from 'lodash/fp';
import { Box, Paper, Grid } from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { useAuth } from 'q3-ui-permissions';
import { array } from 'q3-ui-helpers';
import {
  filter,
  sort,
  search,
  group,
  reducer,
} from './helper';
import {
  Auth,
  AddItem,
  Context,
  SelectForm,
  Search,
} from './components';
import withReducer from './withReducer';
import useStyles from './components/useStyle';

const optionType = PropTypes.arrayOf(
  PropTypes.shape({
    label: PropTypes.string.isRequired,
    fn: PropTypes.func,
  }),
);

const size = { xl: 'auto', lg: 'auto' };
const forms = { md: 6, sm: 6, xs: 12 };

const useRepeater = (Component) => {
  const Inner = ({
    addComponent,
    name,
    initialValues,
    data,
    children,
    groupBy,
    filterOptions,
    sortOptions,
    collectionName,
    edit,
    editBulk,
    create,
    remove,
    removeBulk,
    poll,
    ...rest
  }) => {
    const [state, dispatch] = React.useReducer(reducer, {
      sortBy: 0,
      filterBy: 0,
    });
    const [input, setInput] = React.useState('');

    const auth = useAuth(collectionName);
    const multiselect = useChecked();
    const { t } = useTranslation();
    const cls = useStyles();

    const run = compose(
      group(groupBy),
      sort(sortOptions[state.sortBy]),
      filter(filterOptions[state.filterBy]),
      search(input),
    );

    const newData = run(data);

    const Form = withReducer(SelectForm, [state, dispatch]);

    const renderRepeater = () => (
      <Component data={newData} {...rest}>
        {children}
      </Component>
    );

    const mapRepeater = () =>
      Object.entries(newData).map(([key, xs]) => (
        <Component
          key={key}
          data={xs}
          ids={data.map((item) => item.id)}
          groupName={t(key)}
          {...rest}
        >
          {children}
        </Component>
      ));

    return (
      <Context.Provider
        value={{
          auth,
          name,
          collectionName,
          multiselect,
          edit,
          editBulk,
          remove,
          removeBulk,
          poll,
        }}
      >
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
                <Search setInput={setInput} />
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
                  {...rest}
                >
                  {children}
                </AddItem>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <Auth op="Read">
          <Exports>
            {Array.isArray(newData) && array.hasLength(data)
              ? renderRepeater()
              : mapRepeater()}
          </Exports>
        </Auth>
      </Context.Provider>
    );
  };

  Inner.defaultProps = {
    addComponent: null,
    edit: null,
    collectionName: null,
    create: null,
    remove: null,
    data: [],
    editBulk: null,
    removeBulk: null,
    poll: null,
    groupBy: null,
    sortOptions: [],
    filterOptions: [],
  };

  Inner.propTypes = {
    addComponent: PropTypes.node,
    edit: PropTypes.func,
    name: PropTypes.string.isRequired,
    collectionName: PropTypes.string,
    create: PropTypes.func,
    remove: PropTypes.func,
    initialValues: PropTypes.shape({}).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    editBulk: PropTypes.func,
    removeBulk: PropTypes.func,
    poll: PropTypes.func,
    children: PropTypes.node.isRequired,
    sortOptions: optionType,
    filterOptions: optionType,
    groupBy: optionType,
  };

  return Inner;
};

export default useRepeater;
