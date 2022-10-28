import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import {
  TextField,
  Grid,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';
import { handleEnter } from '../../hooks/useSearchInput';
import useStyle from './styles';

const DomainI18n = ({ children }) => {
  const [search, setSearch] = React.useState('');
  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const cls = useStyle();

  const doesStringMatchSearch = React.useCallback(
    (str) =>
      search
        ? String(str)
            .toLowerCase()
            .includes(String(search).toLowerCase())
        : false,
    [search],
  );

  const handleClear = () => {
    setSearch('');
  };

  const handleSearch = () => {
    setSearch(
      ref.current.querySelector('input').value || '',
    );
  };

  return (
    <>
      <Box mb={1}>
        <Grid
          alignItems="center"
          container
          justifyContent="space-between"
          spacing={2}
        >
          <Grid className={cls.search} item xs>
            <TextField
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              label={t('textFinder')}
              onKeyPress={handleEnter(setSearch)}
              placeholder={t('helpers:searchInAppText')}
              ref={ref}
              type="text"
              variant="filled"
            />
          </Grid>
          <Grid item>
            {search && (
              <Tooltip title={t('clear')}>
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title={t('search')}>
              <IconButton onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
      {children(doesStringMatchSearch, search)}
    </>
  );
};

DomainI18n.propTypes = {
  children: PropTypes.func.isRequired,
};

export default DomainI18n;
