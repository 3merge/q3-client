import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';

export const SearchContext = React.createContext();

const SearchBar = ({ onChange, value }) => {
  const { t } = useTranslation('labels');

  return (
    <TextField
      fullWidth
      name="search"
      onChange={onChange}
      type="search"
      value={value}
      autoComplete="off"
      label={t('searchResults')}
      variant="outlined"
      size="small"
      margin="dense"
    />
  );
};

export default SearchBar;
