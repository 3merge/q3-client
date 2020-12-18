import React from 'react';
import PropTypes from 'prop-types';
import { useValue } from 'useful-state';
import { useTranslation } from 'react-i18next';
import {
  Box,
  InputLabel,
  NativeSelect,
} from '@material-ui/core';
import Exports from 'q3-ui-exports';
import { useAuth } from 'q3-ui-permissions';
import { useChecked } from 'useful-state';
import Search from './components/Search';
import { sort, group } from './helper';
import Context from './components/state';
import { Auth, AddButton, List } from './components';

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
    const [sortBy, setSortBy] = React.useState(
      () => sortOptions[0] || '',
    );
    const auth = useAuth(collectionName);
    const multiselect = useChecked();
    const search = useValue('');
    const { t } = useTranslation();

    const handleChange = (e) => setSortBy(e.target.value);

    const filtered = search.value
      ? data.filter(testSearchTerm(search.value))
      : data;

    const sorted = sortBy
      ? sort({ sortBy }, filtered)
      : filtered;

    const grouped = group(groupBy, sorted);

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
          <Auth op="Read">
            <Exports>
              <Box>
                <Search
                  {...search}
                  ids={sorted.map((item) => item.id)}
                />
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
              {Object.entries(grouped).map(([key, xs]) => (
                <Component
                  key={key}
                  data={xs}
                  tableName={key}
                  {...rest}
                >
                  {children}
                </Component>
              ))}
            </Exports>
          </Auth>
        </Context.Provider>
      </>
    );
  };

  Inner.defaultProps = {
    edit: null,
    collectionName: null,
    create: null,
    remove: null,
    data: [],
  };

  Inner.propTypes = {
    edit: PropTypes.func,
    name: PropTypes.string.isRequired,
    collectionName: PropTypes.string,
    create: PropTypes.func,
    remove: PropTypes.func,
    initialValues: PropTypes.shape({}).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
  };
  return Inner;
};

export default useRepeater;
