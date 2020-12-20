import React from 'react';
import PropTypes from 'prop-types';
import { useValue } from 'useful-state';
import { useTranslation } from 'react-i18next';
import { compose } from 'lodash/fp';
import { Box } from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { useAuth } from 'q3-ui-permissions';
import { useChecked } from 'useful-state';
import Search from './components/Search';
import { sort, group } from './helper';
import Context from './components/state';
import { Auth, AddButton, SortForm } from './components';

const testSearchTerm = (val) => (item) =>
  !val.length ||
  new RegExp(val, 'gi').test(JSON.stringify(item));

const useRepeater = (Component) => {
  const Inner = ({
    addComponent,
    name,
    initialValues,
    data,
    children,
    groupBy,
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
    const [sortBy, setSortBy] = React.useState(0);
    const auth = useAuth(collectionName);
    const multiselect = useChecked();
    const search = useValue('');
    const { t } = useTranslation();

    const handleChange = (e) => setSortBy(e.target.value);

    const filter = (xs) =>
      search.value
        ? xs.filter(testSearchTerm(search.value))
        : xs;

    const run = compose(
      group(groupBy),
      sort(sortOptions[sortBy]),
      filter,
    );

    const newData = run(data);

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
          tableName={t(key)}
          {...rest}
        >
          {children}
        </Component>
      ));

    return (
      <>
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
          <Search
            {...search}
            ids={data.map((item) => item.id)}
          />
          <Auth op="Read">
            <Exports>
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
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
                  {sortOptions && (
                    <SortForm
                      sortOptions={sortOptions}
                      sortBy={sortBy}
                      handleChange={handleChange}
                    />
                  )}
                </Box>
              </Box>
              {Array.isArray(newData)
                ? renderRepeater()
                : mapRepeater()}
            </Exports>
          </Auth>
        </Context.Provider>
      </>
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
    sortOptions: null,
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
        sortBy: PropTypes.string.isRequired,
        fn: PropTypes.func,
      }),
    ),
    groupBy: PropTypes.shape({
      groupBy: PropTypes.string.isRequired,
      fn: PropTypes.func,
    }),
  };

  return Inner;
};

export default useRepeater;
