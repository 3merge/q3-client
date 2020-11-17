import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Box,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  Input,
  InputAdornment,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useTranslation } from 'react-i18next';
import { useSearch } from 'q3-hooked';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from 'q3-ui-dialog';
import renderTrigger from '../renderTrigger';

const useStyle = makeStyles((theme) => ({
  input: {},
}));

const Drawer = (props) => {
  const cls = useStyle();
  const { results, onChange, value } = useSearch([
    '/quicksearch',
  ]);

  return (
    <Dialog
      {...props}
      variant="drawer"
      title={
        <Input
          disableUnderline
          className={cls.input}
          fullWidth
          onChange={onChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          value={value}
        />
      }
      renderTrigger={renderTrigger}
      renderContent={() => (
        <Box bgcolor="background.paper" width="100%">
          {Object.entries(results).map(([key, items]) => (
            <List
              subheader={
                <ListSubheader disableSticky>
                  {key}
                </ListSubheader>
              }
            >
              {items.map((item) => (
                <ListItem button component="li" divider>
                  <ListItemText
                    primary={item.title}
                    secondary={item.description}
                  />
                </ListItem>
              ))}
            </List>
          ))}
        </Box>
      )}
    />
  );
};

export default Drawer;
