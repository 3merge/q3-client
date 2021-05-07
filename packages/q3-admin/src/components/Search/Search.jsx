import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
import { Box, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useValue } from 'useful-state';
import { string } from 'q3-ui-helpers';
import SearchFullWidth from '../SearchFullWidth';
import SearchMobile from '../SearchMobile';
import { Definitions } from '../../containers/state';

export const Search = () => {
  const { t } = useTranslation('labels');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = React.useRef();

  const locationSearch = new URLSearchParams(
    location?.search,
  );
  const { value, onChange, setValue } = useValue(
    locationSearch.get('search'),
  );

  const handleReset = () => {
    setValue('');
    inputRef.current.focus();
  };
  const {
    collectionName,
    directoryPath,
  } = React.useContext(Definitions);

  const handleKeyCode = (e) => {
    const val = e.target.value;
    if (
      !['Enter', 'NumpadEnter'].includes(e?.code) &&
      e?.key !== 'Enter'
    )
      return;

    navigate(
      val
        ? `${directoryPath}?search=${string.encode(val)}`
        : directoryPath,
    );
  };

  const textFieldProps = {
    'aria-label': 'search',
    value,
    onChange,
    handleReset,
    placeholder: t(
      collectionName
        ? `${collectionName}SearchPlaceholder`
        : 'searchPlaceholder',
    ),
    fullWidth: true,
    onKeyPress: handleKeyCode,
    type: 'text',
    inputRef,
  };

  return (
    <Box id="q3-searchbar" width="100%">
      <Hidden smDown>
        <SearchFullWidth {...textFieldProps} />
      </Hidden>
      <Hidden mdUp>
        <SearchMobile {...textFieldProps} />
      </Hidden>
    </Box>
  );
};

export default Search;
