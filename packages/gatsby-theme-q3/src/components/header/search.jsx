import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Search from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  bar: {
    padding: theme.spacing(3),
  },
}));

const Searchbar = ({ visible }) => {
  const [state, setState] = React.useState(false);
  const [term, setTerm] = React.useState('');
  const { bar } = useStyles();

  const open = React.useCallback(() => {
    setState(true);
  }, [state]);

  const close = React.useCallback(() => {
    setState(false);
  }, [state]);

  const onChange = React.useCallback(({ target }) => {
    setTerm(target.value);
  }, []);

  const inputProps = {
    name: 'search',
    type: 'search',
    value: term,
    onChange,
  };

  const renderSearchIcon = (size) => (
    <Tooltip title="Click to enlarge">
      <IconButton onClick={open} size={size}>
        <Search />
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      {visible ? (
        <TextField
          {...inputProps}
          id="header-searchbar"
          placeholder="Search"
          variant="outlined"
          margin="dense"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {renderSearchIcon('small')}
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <Box>{renderSearchIcon()}</Box>
      )}

      <Drawer
        anchor="top"
        open={state}
        onOpen={open}
        onClose={close}
        component="aside"
      >
        <Input
          {...inputProps}
          id="fullscreen-searchbar"
          placeholder="Press enter to perform search"
          className={bar}
          autoFocus
        />
      </Drawer>
    </>
  );
};

Searchbar.propTypes = {
  visible: PropTypes.bool,
};

Searchbar.defaultProps = {
  visible: true,
};

export default Searchbar;
