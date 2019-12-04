import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Search from '@material-ui/icons/Search';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Close from '@material-ui/icons/Close';
import GridOn from '@material-ui/icons/GridOn';
import GridOff from '@material-ui/icons/GridOff';
import Highlighter from 'react-highlight-words';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Graphic from '../graphic';
import searchImg from '../../images/search.png';

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

export const CloseTrigger = ({ onClick, size }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t('label:close')}>
      <IconButton onClick={onClick} size="small">
        <ArrowBack />
      </IconButton>
    </Tooltip>
  );
};

export const OpenFilter = ({ onClick, active }) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={t('label:filter')}>
      <IconButton
        onClick={onClick}
        size="small"
        color={active ? 'primary' : 'normal'}
      >
        {active ? <GridOn /> : <GridOff />}
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

const Searchbar = ({
  expanded,
  redirectPath,
  getResults,
  filter: Filter,
}) => {
  const ref = React.useRef();
  const { t } = useTranslation();
  const [state, setState] = React.useState(false);
  const [showFilter, setShowFilter] = React.useState(false);
  const [term, setTerm] = React.useState('');
  const [results, setResults] = React.useState([]);

  const toggleFilter = React.useCallback(() => {
    setShowFilter(!showFilter);
  }, [showFilter]);

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
    return target.value.length
      ? getResults(target.value).then((v) => {
          setResults(v);
        })
      : setResults([]);
  }, []);

  const onClear = React.useCallback((e) => {
    e.stopPropagation();
    setTerm('');
    const { search } = window.location;
    const params = new URLSearchParams(search);
    params.delete('search');
    navigate(`${redirectPath}?${params.toString()}`);
    onFocus();
  }, []);

  const onKeyPress = React.useCallback(
    ({ key, target }) => {
      if (key === 'Enter') {
        const { search } = window.location;
        const params = new URLSearchParams(search);
        params.delete('page');

        if (target.value === '' || !target.value) {
          params.delete('search');
        } else {
          params.set('search', target.value);
        }

        navigate(`${redirectPath}?${params.toString()}`);
        close();
      }
    },
    [],
  );

  React.useEffect(() => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    const url = params.get('search');
    if (url !== term) setTerm(url);
  }, []);

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
        anchor="right"
        open={state}
        onOpen={open}
        onClose={close}
        component="aside"
      >
        <Box
          p={2}
          width={450}
          style={{ height: '100%', overflowY: 'scroll' }}
        >
          <Input
            {...inputProps}
            id="fullscreen-searchbar"
            autoComplete="off"
            fullWidth
            autoFocus
            disableUnderline
            startAdornment={
              <Box display="flex" mr={1}>
                <CloseTrigger onClick={close} />
                <OpenFilter
                  active={showFilter}
                  onClick={toggleFilter}
                />
              </Box>
            }
          />
          <Box>
            <Collapse in={!showFilter}>
              <Typography variant="h4">
                {results && results.length
                  ? t('labels:results')
                  : t('labels:search')}
              </Typography>
              <List
                component="nav"
                aria-label="main mailbox folders"
              >
                {results && results.length ? (
                  results.map(
                    ({ name, description, url }) => (
                      <ListItem button>
                        <ListItemText
                          primary={
                            <Highlighter
                              textToHighlight={name}
                              autoEscape
                              searchWords={term.split(' ')}
                            />
                          }
                          secondary={
                            <>
                              <Typography
                                variant="h6"
                                component="em"
                              >
                                {url}
                              </Typography>
                              <br />
                              <small>
                                <Highlighter
                                  textToHighlight={
                                    description
                                  }
                                  searchWords={term.split(
                                    ' ',
                                  )}
                                  autoEscape
                                />
                              </small>
                            </>
                          }
                        />
                      </ListItem>
                    ),
                  )
                ) : (
                  <div style={{ filter: 'grayscale(1)' }}>
                    <Graphic
                      src={searchImg}
                      alt={t('labels:search')}
                    />
                  </div>
                )}
                <small>
                  Showing first {results.length} results
                </small>
              </List>
            </Collapse>
            <Collapse in={showFilter}>
              <Box my={2}>
                <Typography variant="h4">
                  {t('labels:filter')}
                </Typography>
                <Filter />
              </Box>
            </Collapse>
          </Box>
        </Box>
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
