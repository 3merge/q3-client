import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from '@reach/router';
import { Box, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import SearchFullWidth from '../SearchFullWidth';
import SearchMobile from '../SearchMobile';

export const Search = ({ collectionName }) => {
  const { t } = useTranslation('labels');
  const navigate = useNavigate();
  const location = useLocation();

  const handleKeyCode = (e) => {
    const val = e.target.value;
    if (e?.code !== 'Enter') return;
    navigate(`${location.pathname}/?search=${val}`);
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

Search.propTypes = {
  collectionName: PropTypes.string,
};

Search.defaultProps = {
  collectionName: undefined,
};

export default Search;
