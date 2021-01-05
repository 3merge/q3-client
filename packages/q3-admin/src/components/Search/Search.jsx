import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
import { Box, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SearchFullWidth from '../SearchFullWidth';
import SearchMobile from '../SearchMobile';
import { Definitions } from '../../containers/state';

export const Search = () => {
  const { t } = useTranslation('labels');
  const navigate = useNavigate();
  const location = useLocation();

  const {
    collectionName,
    directoryPath,
  } = React.useContext(Definitions);

  const handleKeyCode = (e) => {
    const val = e.target.value;
    if (e?.code !== 'Enter') return;
    navigate(`${directoryPath}?search=${val}`);
  };

  const textFieldProps = {
    'aria-label': 'search',
    defaultValue: new URLSearchParams(location?.search).get(
      'search',
    ),
    placeholder: t(
      collectionName
        ? `${collectionName}SearchPlaceholder`
        : 'searchPlaceholder',
    ),
    fullWidth: true,
    onKeyPress: handleKeyCode,
    type: 'search',
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
