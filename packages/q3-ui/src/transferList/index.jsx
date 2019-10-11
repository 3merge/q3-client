import React from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList } from 'react-window';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FlashOn from '@material-ui/icons/FlashOn';
import ClearAll from '@material-ui/icons/ClearAll';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { grey } from '@material-ui/core/colors';
import { connect, getIn } from 'formik';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import CompareArrows from '@material-ui/icons/CompareArrows';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import { CircularProgress, Badge } from '@material-ui/core';
import * as utils from '../_helpers/utils';
import { useOpenState } from '../dialogs';
import Alert from '../alert';
import { styleProps } from '../inputs';

const useStyles = makeStyles(() => ({
  listItem: {
    backgroundColor: '#fff',
    padding: '0.25rem 0.5rem',
  },
  column: {
    padding: 0,
  },
  columnTitle: {
    fontSize: '1.1em',
    margin: 0,
    paddingBottom: 0,
  },
  noPadding: {
    padding: 0,
  },
  margin: {
    marginBottom: '0.25rem',
  },
  overflow: {
    backgroundColor: grey[200],
    height: 325,
    overflow: 'hidden',
  },
  fabs: {
    position: 'absolute',
    bottom: '-1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    '& button': {
      marginBottom: '0.25rem',
    },
  },
  box: {
    position: 'relative',
    padding: '2rem',
    marginBottom: '1rem',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
}));

function Search({ search, term, toggle, addRule }) {
  const classes = useStyles();
  const { t } = useTranslation('labels');

  return (
    <Box m={2}>
      <TextField
        onChange={search}
        value={term}
        className={classes.input}
        label="Start typing..."
        fullWidth
        helperText="Search to filter or construct regular expressions"
        InputProps={{
          endAdornment: (
            <>
              <Tooltip title={t('select_all')}>
                <IconButton
                  onClick={toggle}
                  color="primary"
                  className={classes.iconButton}
                  aria-label={t('select_all')}
                >
                  <ClearAll />
                </IconButton>
              </Tooltip>
              {addRule && (
                <Tooltip title={t('create_rule')}>
                  <IconButton
                    color="primary"
                    onClick={addRule}
                    className={classes.iconButton}
                    aria-label={t('create_rule')}
                  >
                    <FlashOn />
                  </IconButton>
                </Tooltip>
              )}
            </>
          ),
        }}
      />
    </Box>
  );
}

Search.propTypes = {
  search: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
  addRule: PropTypes.func.isRequired,
  term: PropTypes.string,
};

Search.defaultProps = {
  term: '',
};

function Chips({ data, pullRule }) {
  const renderAvatar = () => (
    <Avatar>
      <FlashOn />
    </Avatar>
  );
  return (
    <Box my={2}>
      {data.map((item) => (
        <Chip
          color="primary"
          avatar={renderAvatar()}
          key={item}
          onDelete={utils.fn(pullRule, item)}
          label={`fn${item}`}
        />
      ))}
    </Box>
  );
}

Chips.propTypes = {
  data: PropTypes.arrayOf(PropTypes.String).isRequired,
  pullRule: PropTypes.func.isRequired,
};

function useTransfer(rows = []) {
  const [term, setSearch] = React.useState('');
  const [selected, setSelect] = React.useState([]);
  const data = utils.filterByTerm(rows, term);

  function select(item) {
    if (selected.includes(item)) {
      setSelect(utils.removeFrom(selected, item));
    } else {
      setSelect(selected.concat(item));
    }
  }

  function clear() {
    setSelect([]);
  }

  function toggle() {
    if (selected.length !== data.length) {
      setSelect(data);
    } else {
      clear();
    }
  }

  function isSelected(item) {
    return utils.contains(selected, item);
  }

  function search({ target }) {
    setSearch(target.value);
    setSelect(utils.intersects(selected, data));
  }

  function getUnique() {
    return utils.unique(data, selected);
  }

  return {
    data,
    select,
    toggle,
    isSelected,
    getUnique,
    selected,
    search,
    term,
    clear,
  };
}

const TransferListDataRow = (data, select, isSelected) => {
  const Row = ({ index, style }) => (
    <ListItem
      button
      disableRipple
      onClick={utils.fn(select, data[index])}
      selected={isSelected(data[index])}
      style={style}
      key={index}
    >
      <ListItemText primary={data[index]} />
    </ListItem>
  );

  Row.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };

  return Row;
};

function TransferListColumn({
  label,
  select,
  data,
  isSelected,
}) {
  const cls = useStyles();
  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <Box className={cls.column}>
        <Typography variant="overline" gutterBottom>
          {t(`labels:${label}`)}
        </Typography>
        <FixedSizeList
          className={cls.overflow}
          itemCount={data.length}
          height={325}
          width="100%"
          itemSize={46}
        >
          {TransferListDataRow(data, select, isSelected)}
        </FixedSizeList>
      </Box>
    </Grid>
  );
}

TransferListColumn.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(PropTypes.string))
    .isRequired,
  isSelected: PropTypes.func.isRequired,
  select: PropTypes.func.isRequired,
};

const base = utils.WILDCARD;
const char = utils.INVERSION;

export function convertToString(arr = []) {
  const sorted = arr.sort();
  sorted.unshift(base);
  return sorted.join(`, ${char}`);
}

export function readDelineatedString(str, options = []) {
  const [state, tests] = utils.reduceByParentheses(
    str
      ? utils
          .splitByChar(str, ',')
          .map((item) => item.trim())
          .filter(utils.hasFlag)
          .map(utils.subFlags)
      : [],
  );
  return [
    utils.removeDuplicates(
      tests
        .map((item) => utils.filterByTerm(options, item))
        .flat()
        .concat(state),
    ),
    tests,
  ];
}

export function testSome(arr) {
  return (item) =>
    !arr.some((re) => {
      try {
        return new RegExp(re, 'gi').test(item);
      } catch (err) {
        return true;
      }
    });
}

export function TransferList({
  name,
  options,
  readOnly,
  regex,
  loadOptions,
  formik,
}) {
  const { open, close, isOpen } = useOpenState();
  const [items, setItems] = React.useState(options || []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const init = getIn(formik.values, name);
  const { t } = useTranslation();

  const [initExceptions, initRules] = readDelineatedString(
    init,
    items,
  );
  const exceptions = useTransfer(initExceptions);
  const inclusions = useTransfer(
    utils.unique(items, exceptions.data),
  );
  const cls = useStyles();

  function executeRules(a, b) {
    const suite = b || initRules;
    if (!suite.length) return a;
    return a.filter(testSome(suite));
  }

  function insertIntoFormik(cb) {
    const { data } = exceptions;
    const state = executeRules(cb(data)).concat(initRules);
    formik.setFieldValue(name, convertToString(state));
    inclusions.clear();
    exceptions.clear();
  }

  function notifyError(test) {
    if (!executeRules(test).length && test.length) {
      setError(true);
      return true;
    }
    setError(false);
    return false;
  }

  function pushToState(push) {
    insertIntoFormik(() =>
      exceptions.getUnique().concat(push),
    );
  }

  function mergeAndPushToState() {
    if (
      notifyError(inclusions.selected) ||
      notifyError(exceptions.selected)
    )
      return;
    pushToState(inclusions.selected);
  }

  function addRule() {
    pushToState(`(${inclusions.term})`);
    inclusions.search({ target: '' });
  }

  function pullRuleFromState(item) {
    const rules = utils.removeFrom(initRules, item);
    const redactedExceptions = executeRules(
      initExceptions,
      [item],
    );
    const state = convertToString(
      redactedExceptions.concat(rules),
    );
    formik.setFieldValue(name, state);
  }

  React.useEffect(
    React.useCallback(() => {
      if (!loadOptions || !isOpen) return;
      setLoading(true);
      loadOptions()
        .then(setItems)
        .finally(setLoading);
    }, [loadOptions, isOpen]),
    [isOpen],
  );

  return (
    <>
      <TextField
        {...styleProps}
        label={t(`labels:${name}`)}
        helperText={t(`helperText:${name}`)}
        value={exceptions.data.join(',')}
        disabled
        InputProps={{
          endAdornment: !readOnly && (
            <Badge
              badgeContent={exceptions.data.length}
              color="secondary"
            >
              <IconButton
                onClick={open}
                size="small"
                color="primary"
              >
                <ViewColumn />
              </IconButton>
            </Badge>
          ),
        }}
      />
      <Drawer anchor="bottom" open={isOpen} onClose={close}>
        <Search
          addRule={regex ? addRule : null}
          {...inclusions}
        />
        {loading ? (
          <Box textAlign="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Fade in>
            <Container maxWidth="md" className={cls.box}>
              <Grid
                container
                justify="center"
                alignItems="center"
                spacing={1}
                style={{ position: 'relative' }}
              >
                <TransferListColumn
                  loading={loading}
                  label="inclusions"
                  {...inclusions}
                />
                <TransferListColumn
                  label="exceptions"
                  {...exceptions}
                />
                <Fab
                  onClick={mergeAndPushToState}
                  color="secondary"
                  className={cls.fabs}
                >
                  <CompareArrows />
                </Fab>
              </Grid>
              <Chips
                data={initRules}
                pullRule={pullRuleFromState}
              />
              {error && (
                <Alert label="Whoops, you cannot do this." />
              )}
            </Container>
          </Fade>
        )}
      </Drawer>
    </>
  );
}

export default connect(TransferList);

TransferList.propTypes = {
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func,
    values: PropTypes.object,
  }).isRequired,
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  loadOptions: PropTypes.func,
  regex: PropTypes.bool,
  readOnly: PropTypes.bool,
};

TransferList.defaultProps = {
  loadOptions: null,
  regex: true,
  readOnly: false,
};
