import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Fade from '@material-ui/core/Fade';
import Search from '@material-ui/icons/Search';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Close from '@material-ui/icons/Close';
import GridOn from '@material-ui/icons/GridOn';
import GridOff from '@material-ui/icons/GridOff';
import Highlighter from 'react-highlight-words';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { withLocation } from 'with-location';
import { useToggle, useValue } from 'useful-state';
import AccessibleIconButton from '../iconButton';

const SearchTrigger = ({ onClick }) => (
  <AccessibleIconButton
    label="enlarge"
    buttonProps={{ onClick }}
    icon={Search}
  />
);

SearchTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const CloseTrigger = ({ onClick }) => (
  <AccessibleIconButton
    label="close"
    buttonProps={{ onClick }}
    icon={ArrowBack}
  />
);

CloseTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export const FilterTrigger = ({ onClick, active }) => (
  <AccessibleIconButton
    label="filter"
    icon={active ? GridOn : GridOff}
    buttonProps={{
      onClick,
      color: active ? 'primary' : 'normal',
    }}
  />
);

FilterTrigger.propTypes = {
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export const Adornment = withLocation(
  ({ children, term, clearByName, focus }) => (
    <InputAdornment position="end">
      <Fade
        in={typeof term === 'string' && term.length > 0}
      >
        <div>
          <AccessibleIconButton
            label="clear"
            icon={Close}
            buttonProps={{
              onClick: clearByName(focus),
              name: 'search',
            }}
          />
        </div>
      </Fade>
      {children}
    </InputAdornment>
  ),
);

export const SearchResultList = ({
  term,
  getResults,
  icon: Icon,
}) => {
  const [results, setResults] = React.useState([]);
  const hasResults = results && results.length;

  React.useEffect(() => {
    if (term) {
      getResults(term).then(setResults);
    } else {
      setResults([]);
    }
  }, [term]);

  return !hasResults || !term || !term.length ? (
    <Box my={2} width="250px">
      <Icon />
    </Box>
  ) : (
    <List component="nav">
      {results.map(({ id, name, description, url }) => (
        <ListItem button component={Link} key={id} to={url}>
          <ListItemText
            primary={
              name ? (
                <Highlighter
                  textToHighlight={name}
                  searchWords={String(term).split(' ')}
                  autoEscape={false}
                />
              ) : null
            }
            secondary={
              description ? (
                <Box>
                  <Box display="block" component="small">
                    <Highlighter
                      textToHighlight={description}
                      searchWords={String(term).split(' ')}
                      autoEscape={false}
                    />
                  </Box>
                </Box>
              ) : null
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

SearchResultList.propTypes = {
  term: PropTypes.string.isRequired,
  getResults: PropTypes.func.isRequired,
};

const SearchPanel = ({ show, children }) =>
  show ? (
    <Collapse in={show}>
      <Box p={2}>{children}</Box>
    </Collapse>
  ) : null;

SearchPanel.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

SearchPanel.defaultProps = {
  children: null,
};

const SearchDrawer = ({ state, open, close, children }) => (
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
      {children}
    </Box>
  </Drawer>
);

SearchDrawer.propTypes = {
  state: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  close: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const Searchbar = ({
  expanded,
  getResults,
  handleSearch,
  getFrom,
  filter: Filter,
  icon,
}) => {
  const { t } = useTranslation();
  const {
    value,
    onChange,
    onFocus,
    onClear,
    ref,
  } = useValue(getFrom('search') || '');

  const {
    toggle: toggleFilter,
    state: showFilter,
  } = useToggle(false);
  const { state, open, close } = useToggle();

  const inputProps = {
    value,
    placeholder: t('labels:searchPlaceholder'),
    name: 'search',
    type: 'text',
    onChange,
    onKeyPress: handleSearch(() => {
      close();
    }),
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
            InputProps={{
              endAdornment: (
                <Adornment
                  term={value}
                  focus={() => {
                    onClear();
                    onFocus();
                  }}
                >
                  <SearchTrigger
                    onClick={open}
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
          disableUnderline
          startAdornment={
            <Box display="flex" mr={1}>
              <CloseTrigger onClick={close} />
              {Filter && (
                <FilterTrigger
                  active={showFilter}
                  onClick={toggleFilter}
                />
              )}
            </Box>
          }
        />
        <SearchPanel show={!showFilter} label="search">
          <SearchResultList
            term={value}
            getResults={getResults}
            icon={icon}
          />
        </SearchPanel>
        {Filter && (
          <SearchPanel show={showFilter} label="filter">
            <Filter />
          </SearchPanel>
        )}
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
