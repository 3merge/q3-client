import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';

export const SearchContext = React.createContext();

const SearchBar = ({ setInput }) => {
  const [state, setState] = React.useState('');
  const { t } = useTranslation('labels');
  const handleChange = (e) => setState(e.target.value);
  let ref = React.useRef(null);

  React.useEffect(() => {
    let timer;
    if (ref) {
      timer = setTimeout(() => setInput(state), 500);
    } else {
      ref = true;
    }
    return () => {
      setTimeout(timer);
    };
  }, [state]);

  return (
    <TextField
      fullWidth
      name="search"
      onChange={handleChange}
      type="search"
      value={state}
      autoComplete="off"
      label={t('searchResults')}
      variant="outlined"
      size="small"
      margin="dense"
    />
  );
};

export default SearchBar;
