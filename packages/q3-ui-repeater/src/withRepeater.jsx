import React from 'react';
import { useValue } from 'useful-state';
import { useTranslation } from 'react-i18next';
import {
  Box,
  InputLabel,
  NativeSelect,
} from '@material-ui/core';
import Search from './components/Search';
import { sort, group } from './helper';

const testSearchTerm = (val) => (item) =>
  !val.length ||
  new RegExp(val, 'gi').test(JSON.stringify(item));

const useRepeater = (Component) => ({
  data,
  groupBy,
  sortOptions,
  ...rest
}) => {
  const [sortBy, setSortBy] = React.useState(
    () => sortOptions[0] || '',
  );
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
          {sortOptions.map((x, i) => (
            <option value={x} key={x + i} aria-label={x}>
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
        />
      ))}
    </>
  );
};

export default useRepeater;
