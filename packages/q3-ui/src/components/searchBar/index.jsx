import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  bar: {
    padding: theme.spacing(3),
  },
}));

const Searchbar = ({ visible, redirectPath }) => {
  const ref = React.useRef();
  const [state, setState] = React.useState(false);
  const [term, setTerm] = React.useState('');
  const { bar } = useStyles();

  const open = React.useCallback(() => {
    setState(true);
  }, [state]);

  const close = React.useCallback(() => {
    setState(false);
  }, [state]);

  const onFocus = React.useCallback(() => {
    if (!ref.current) return;
    ref.current.focus();
  }, []);

  const onChange = React.useCallback(({ target }) => {
    setTerm(target.value);
  }, []);

  const onClear = React.useCallback(() => {
    setTerm('');
    onFocus();
  }, []);

  const onKeyPress = React.useCallback(
    ({ key, target }) => {
      if (key === 'Enter') {
        const { search } = window.location;
        const params = new URLSearchParams(search);
        params.set('search', target.value);
        navigate(`${redirectPath}?${params.toString()}`);
        close();
      }
    },
    [],
  );

  const inputProps = {
    name: 'search',
    type: 'text',
    value: term,
    onChange,
    onKeyPress,
  };

  const renderSearchIcon = (size) => (
    <Tooltip title="Click to enlarge">
      <IconButton onClick={open} size={size}>
        <Search />
      </IconButton>
    </Tooltip>
  );

  const renderClearIcon = () =>
    term && (
      <Tooltip title="Click to clear">
        <IconButton onClick={onClear} size="small">
          <Close />
        </IconButton>
      </Tooltip>
    );

  return (
    <>
      {visible ? (
        <TextField
          {...inputProps}
          inputRef={ref}
          id="header-searchbar"
          placeholder="Search"
          variant="outlined"
          margin="dense"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {renderClearIcon() ||
                  renderSearchIcon('small')}
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
  redirectPath: PropTypes.string,
};

Searchbar.defaultProps = {
  visible: true,
  redirectPath: '',
};

export default Searchbar;
