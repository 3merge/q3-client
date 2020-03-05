import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Input from '@material-ui/core/Input';
import { withLocation } from 'with-location';
import { useToggle, useValue } from 'useful-state';
import SearchDrawer from './drawer';
import { SearchTrigger, CloseTrigger } from './triggers';
import ExpandedSearchField from './expandedSearchField';
import SearchResults from './results';

const Searchbar = ({
  expanded,
  getResults,
  handleSearch,
  getFrom,
  icon,
  redirectPath,
}) => {
  const { t } = useTranslation();
  const { state, open, close } = useToggle();
  const initialValue = getFrom('search') || '';

  const {
    value,
    onChange,
    onFocus,
    onClear,
    ref,
  } = useValue(initialValue);

  const handleFocus = React.useCallback(() => {
    onClear();
    onFocus();
  }, []);

  const inputProps = {
    value,
    placeholder: t('labels:searchPlaceholder'),
    name: 'search',
    type: 'text',
    onChange,
    onKeyPress: handleSearch(close, redirectPath),
    inputProps: {
      'aria-label': t('labels:search'),
    },
  };

  return (
    <>
      {expanded && (
        <ExpandedSearchField
          {...inputProps}
          onClick={open}
          onFocus={handleFocus}
          innerRef={ref}
        />
      )}
      <Hidden mdUp={expanded}>
        <Box>
          <SearchTrigger onClick={open} size="large" />
        </Box>
      </Hidden>
      <SearchDrawer
        state={state}
        open={open}
        close={close}
        component="aside"
      >
        <Input
          {...inputProps}
          id="fullscreen-searchbar"
          autoComplete="off"
          fullWidth
          autoFocus
          startAdornment={
            <Box display="flex" mr={1}>
              <CloseTrigger onClick={close} />
            </Box>
          }
        />
        <SearchResults
          term={value}
          getResults={getResults}
          icon={icon}
        />
      </SearchDrawer>
    </>
  );
};

Searchbar.propTypes = {
  expanded: PropTypes.bool,
  redirectPath: PropTypes.string,
  getResults: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  getFrom: PropTypes.func.isRequired,
  filter: PropTypes.node,
  icon: PropTypes.node.isRequired,
};

Searchbar.defaultProps = {
  expanded: true,
  redirectPath: '',
  filter: null,
};

export default withLocation(Searchbar);
