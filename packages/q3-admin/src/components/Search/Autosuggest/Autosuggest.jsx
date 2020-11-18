import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import { useSearch } from 'q3-hooked';

const getOptionLabel = (option) => {
  return option.title;
};

const DesktopSearch = () => {
  const { t } = useTranslation('labels');
  const { groupBy, onChange, value } = useSearch([
    '/quicksearch',
  ]);

  return (
    <Box width="100%">
      <Autocomplete
        inputValue={value}
        onInputChange={onChange}
        options={groupBy()}
        getOptionLabel={getOptionLabel}
        freeSolo
        autoComplete
        ListboxComponent={List}
        PaperComponent={(props) =>
          React.createElement(Paper, {
            ...props,
            elevation: 2,
          })
        }
        groupBy={(option) => option.label}
        filterOptions={(options) => options}
        renderOption={({
          title: primary,
          description: secondary,
        }) => (
          <ListItem
            onClick={(e) => {
              e.preventDefault();
            }}
            dense
            style={{ padding: 0 }}
          >
            <ListItemText
              primary={primary}
              secondary={secondary}
            />
          </ListItem>
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
  );
};

export default DesktopSearch;
