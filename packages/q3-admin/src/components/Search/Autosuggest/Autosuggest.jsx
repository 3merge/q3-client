import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from '@material-ui/core/List';
import { Box, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import { useSearch } from 'q3-hooked';
import AutosuggestListItem from '../AutosuggestListItem';

const getOptionLabel = (option) => option.name;

const DesktopSearch = () => {
  const ref = React.useRef();
  const { t } = useTranslation('labels');
  const s = useSearch(['/characters']);

  console.log(s);

  return (
    <Hidden smDown>
      <Box width="100%">
        <Autocomplete
          options={[]}
          innerRef={ref}
          freeSolo
          autoComplete
          ListboxComponent={List}
          PaperComponent={(props) =>
            React.createElement(Paper, {
              ...props,
              elevation: 2,
            })
          }
          getOptionLabel={getOptionLabel}
          filterOptions={(options) => options}
          renderOption={(option) => (
            <AutosuggestListItem
              onClick={() => null}
              {...option}
            />
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              disableUnderline
              inputProps={{
                ...params.inputProps,
                'aria-label': t('searchSite'),
              }}
              // eslint-disable-next-line
              InputProps={{
                ...params.InputProps,
                style: { flexWrap: 'nowrap' },
                disableUnderline: true,
                placeholder: 'Search the site',
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>
    </Hidden>
  );
};

export default DesktopSearch;
