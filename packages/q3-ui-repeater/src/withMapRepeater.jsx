import React from 'react';
import PropTypes from 'prop-types';
import { array } from 'q3-ui-helpers';
import { useValue } from 'useful-state';
import { useTranslation } from 'react-i18next';
import { compose } from 'lodash/fp';
import { Box, Paper, Grid } from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { useAuth } from 'q3-ui-permissions';
import { useChecked } from 'useful-state';
import Search from './components/Search';
import { filter, sort, search, group } from './helper';
import Context from './components/state';
import { Auth, AddItem, SelectForm } from './components';
import withReducer from './withReducer';

const reducer = (state, action) => {
  switch (action.type) {
    case 'filterBy':
      return {
        ...state,
        filterBy: action.index,
      };

    case 'sortBy':
      return {
        ...state,
        sortBy: action.index,
      };

    default:
      return state;
  }
};

const useRepeater = (Component) => {
  const Inner = ({
    addComponent,
    name,
    initialValues,
    data,
    children,
    groupBy,
    filters,
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

    const auth = useAuth(collectionName);
    const multiselect = useChecked();
    const searchObj = useValue('');
    const { t } = useTranslation();

    const run = compose(
      group(groupBy),
      sort(sortOptions[state.sortBy]),
      filter(filters[state.filterBy]),
      search(searchObj.value),
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
          create,
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
              alignItems="center"
              container
              justify="space-between"
            >
              <Grid item xs style={{ flex: 1 }}>
                <Search {...searchObj} />
              </Grid>
              <Grid item>
                <Grid
                  alignItems="center"
                  container
                  justify="flex-end"
                  spacing={1}
                >
                  <Form
                    options={filters}
                    label="filterBy"
                  />
                  <Form
                    options={sortOptions}
                    label="sortBy"
                    data={data}
                  />
                  <Grid item>
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
    sortOptions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        fn: PropTypes.func,
      }),
    ),
    groupBy: PropTypes.arrayOf(
      PropTypes.shape({
        groupBy: PropTypes.string.isRequired,
        fn: PropTypes.func,
      }),
    ),
  };

  return Inner;
};

export default useRepeater;
