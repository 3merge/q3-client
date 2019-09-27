import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
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

export const SearchTrigger = ({ onOpen, size }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t('label:enlarge')}>
      <IconButton onClick={onOpen} size={size}>
        <Search />
      </IconButton>
    </Tooltip>
  );
};

SearchTrigger.propTypes = {
  onOpen: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
};

export const Adornment = ({ children, term, onClear }) => {
  const { t } = useTranslation();
  return (
    <InputAdornment position="end">
      {term ? (
        <Tooltip title={t('label:clear')}>
          <IconButton onClick={onClear} size="small">
            <Close />
          </IconButton>
        </Tooltip>
      ) : (
        children
      )}
    </InputAdornment>
  );
};

Adornment.propTypes = {
  children: PropTypes.node,
  onClear: PropTypes.func.isRequired,
  term: PropTypes.string,
};

Adornment.defaultProps = {
  children: null,
  term: '',
};

const Searchbar = ({ expanded, redirectPath }) => {
  const ref = React.useRef();
  const { t } = useTranslation();
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
    placeholder: t('labels:searchPlaceholder'),
    name: 'search',
    type: 'text',
    value: term,
    onChange,
    onKeyPress,
    inputProps: {
      'aria-label': t('labels:search'),
    },
  };

  return (
    <>
      {expanded && (
        <Hidden smDown>
          <TextField
            {...inputProps}
            inputRef={ref}
            id="header-searchbar"
            variant="outlined"
            margin="dense"
            InputProps={{
              endAdornment: (
                <Adornment onClear={onClear} term={term}>
                  <SearchTrigger
                    onOpen={open}
                    size="small"
                  />
                </Adornment>
              ),
            }}
          />
        </Hidden>
      )}
      <Hidden mdUp={expanded}>
        <Box>
          <SearchTrigger onOpen={open} size="large" />
        </Box>
      </Hidden>
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
          className={bar}
          autoFocus
        />
      </Drawer>
    </>
  );
};

Searchbar.propTypes = {
  expanded: PropTypes.bool,
  redirectPath: PropTypes.string,
};

Searchbar.defaultProps = {
  expanded: true,
  redirectPath: '',
};

export default Searchbar;
