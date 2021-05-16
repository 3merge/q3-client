import React from 'react';
import PropTypes from 'prop-types';
import { useInputDebounce } from 'q3-ui-helpers/lib/hooks';
import { SearchDesktop } from 'q3-admin-ui';
import { useTranslation } from 'react-i18next';

export const SearchContext = React.createContext();

const SearchBar = ({ handleInput }) => {
  const [state, setState] = React.useState('');
  const shouldRun = useInputDebounce(state);
  const { t } = useTranslation();

  const handleChange = ({ target: { value } }) => {
    setState(value);
  };

  const handleReset = () => {
    setState('');
  };

  React.useEffect(() => {
    handleInput(state);
  }, [shouldRun]);

  return (
    <SearchDesktop
      placeholder={t('labels:searchByPhrase')}
      handleReset={handleReset}
      onChange={handleChange}
      value={state}
    />
  );
};

SearchBar.propTypes = {
  handleInput: PropTypes.func.isRequired,
};

export default SearchBar;
