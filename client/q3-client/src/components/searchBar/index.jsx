import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#fff',
    border: '1px solid transparent',
    boxSizing: 'border-box',
    borderRadius: 0,
    margin: 0,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    transition: 'border-color 500ms ease-in-out',
    width: '100%',
  },
  clearBtn: {
    width: 45,
  },
  input: {
    flex: 1,
    lineHeight: 2,
  },
}));

const Searchbar = ({ location, history }) => {
  const ref = React.useRef();
  const [state, setState] = React.useState('');
  const { container, input, clearBtn } = useStyles();

  const onFocus = React.useCallback(() => {
    if (!ref.current) return;
    ref.current.focus();
  }, []);

  const onChange = React.useCallback(({ target }) => {
    setState(target.value);
  }, []);

  const onClear = React.useCallback(() => {
    setState('');
    history.push();
    onFocus();
  }, []);

  const onKeyPress = React.useCallback(
    ({ key, target }) => {
      if (key === 'Enter') {
        const { search } = location;
        const params = new URLSearchParams(search);
        params.set('search', target.value);
        history.push(`?${params.toString()}`);
      }
    },
    [],
  );

  return (
    <Grid
      container
      alignItems="center"
      className={container}
      elevation={0}
      spacing={5}
      onClick={onFocus}
    >
      <SearchIcon />
      <Grid item className={input}>
        <InputBase
          onKeyPress={onKeyPress}
          inputRef={ref}
          name="search"
          type="text"
          className={input}
          value={state}
          onChange={onChange}
        />
      </Grid>
      <Grid item className={clearBtn}>
        {state && (
          <IconButton
            size="small"
            onClick={onClear}
            aria-label="Clear search input"
          >
            <Close
              fontSize="small"
              style={{ color: grey[400] }}
            />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

Searchbar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default withRouter(Searchbar);
