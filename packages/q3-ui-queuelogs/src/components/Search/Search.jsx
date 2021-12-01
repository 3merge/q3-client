import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'q3-ui-locale';
import { useInputDebounce } from 'q3-ui-helpers/lib/hooks';

const Search = ({ handleInput }) => {
  const [state, setState] = React.useState('');
  const { t } = useTranslation('labels');
  const shouldRun = useInputDebounce(state);

  const handleChange = (e) => setState(e.target.value);

  React.useEffect(() => {
    handleInput(state);
  }, [shouldRun]);

  return (
    <TextField
      fullWidth
      name="search"
      onChange={handleChange}
      type="search"
      value={state}
      autoComplete="off"
      label={t('search')}
      variant="outlined"
      size="small"
    />
  );
};

Search.propTypes = {
  handleInput: PropTypes.func.isRequired,
};

export default Search;
