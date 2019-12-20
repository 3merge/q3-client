import React from 'react';
import PropTypes from 'prop-types';
import { uniq, difference } from 'lodash';
import { FixedSizeList } from 'react-window';
import minimatch from 'minimatch';
import isGlob from 'is-glob';
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
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import CompareArrows from '@material-ui/icons/CompareArrows';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import { CircularProgress, Badge } from '@material-ui/core';
import useOpen from 'useful-state/lib/useOpen';
import { useValue } from 'useful-state';
import useDecorator from '../helpers/useDecorator';
import useOptions from '../helpers/useOptions';

export const findNestedExpressions = (a = []) =>
  a.reduce(
    (acc, curr) => {
      acc[/^\((.*)\)?$/.test(curr) ? 0 : 1].push(curr);
      return acc;
    },
    [[], []],
  );

const castToLowercase = (s = '') => s.toLowerCase().trim();

const sanitizeArrayStrings = (a = []) =>
  a.map(castToLowercase).filter(Boolean);

export const transformDelineatedStringIntoArray = (
  str = [],
) =>
  Array.isArray(str)
    ? str.map(castToLowercase).filter((i) => i)
    : sanitizeArrayStrings(str.split(','));

export const transformArrayIntoDelineatedString = (
  arr = [],
) => sanitizeArrayStrings(arr).join(',');

export const filterByExpressions = (a = []) => (b) =>
  a.some((re) => minimatch(b, re));

export const intersects = (a = [], b = [], c = []) => {
  const has = (item) => !c.includes(item);
  const keepInA = a.filter(has);
  const keepInB = b.filter(has);

  return [
    keepInA.concat(difference(b, keepInB)),
    keepInB.filter(has).concat(difference(a, keepInA)),
  ];
};

const fn = (exec, args) => (props) => exec(args, props);

export const getUniquelyWithoutRegex = (
  a = [],
  b = [],
  c = [],
) => uniq(a.concat(b.filter(filterByExpressions(c))));

export const getUniquelyAgainstRegex = (
  a = [],
  b = [],
  c = [],
) =>
  uniq(
    b
      .filter((i) => !a.includes(i))
      .filter((i) => !filterByExpressions(c)(i)),
  );

export const filterBySearch = (a = [], s) =>
  a.filter(minimatch.filter(s));

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
  const [err, setError] = React.useState(false);

  return (
    <Box m={2}>
      <TextField
        onChange={search}
        value={term}
        className={classes.input}
        label="Start typing..."
        fullWidth
        helperText={
          !err ? t('searchByGlob') : t('notAGlob')
        }
        error={err}
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
                    onClick={() => setError(!addRule())}
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
          onDelete={fn(pullRule, item)}
          label={item}
        />
      ))}
    </Box>
  );
}

Chips.propTypes = {
  data: PropTypes.arrayOf(PropTypes.String).isRequired,
  pullRule: PropTypes.func.isRequired,
};

const TransferListDataRow = (data, select, isSelected) => {
  const Row = ({ index, style }) => (
    <ListItem
      button
      disableRipple
      onClick={fn(select, data[index])}
      selected={isSelected(data[index])}
      style={style}
      key={index}
    >
      <ListItemText primary={data[index]} />
    </ListItem>
  );

  Row.propTypes = {
    index: PropTypes.number.isRequired,
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

const Input = ({ name, applied, readOnly, open }) => {
  const { t } = useTranslation();

  return (
    <TextField
      disabled
      fullWidth
      variant="filled"
      label={t(`labels:${name}`)}
      helperText={t(`helpers:${name}`)}
      value={applied.join(', ')}
      InputProps={{
        disableUnderline: true,
        endAdornment: !readOnly && (
          <Badge
            badgeContent={applied.length}
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
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  open: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  applied: PropTypes.arrayOf(PropTypes.string),
};

Input.defaultProps = {
  applied: [],
  readOnly: false,
};

export function TransferList(props) {
  const { name } = props;
  const { value: init, onChange } = useDecorator(props);
  const {
    value: search,
    onChange: handleSearch,
    onClear,
  } = useValue();
  const [selected, setSelected] = React.useState([]);
  const { items, loading } = useOptions(props);
  const { open, close, isOpen } = useOpen();
  const cls = useStyles();

  const initAsArray = transformDelineatedStringIntoArray(
    init,
  );

  const [rules, words] = findNestedExpressions(initAsArray);
  const isSelected = (item) => selected.includes(item);
  const transformedItems = items.map(castToLowercase);

  const active = uniq(
    words.flatMap((word) =>
      transformedItems.filter(minimatch.filter(word)),
    ),
  );

  const inactive = uniq(
    transformedItems
      .filter((i) => !active.includes(i))
      .filter(
        (i) =>
          i.toLowerCase().includes(search.toLowerCase()) ||
          minimatch(i.toLowerCase(), search.toLowerCase()),
      ),
  );

  const addToSelected = (item) => {
    if (isSelected(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected(selected.concat(item));
    }
  };

  const transferTo = () => {
    const [val] = intersects(words, inactive, selected);
    onChange(
      transformArrayIntoDelineatedString(
        uniq(val).concat(rules),
      ),
    );
    setSelected([]);
  };

  const addRule = () => {
    if (!isGlob(search)) return false;
    onChange(initAsArray.concat(search).join(', '));
    setSelected([]);
    onClear();
    return true;
  };

  const removeRule = (term) => {
    onChange(
      initAsArray
        .filter((item) => item !== term)
        .join(', '),
    );
    setSelected([]);
  };

  const selectAll = () => {
    setSelected(
      inactive.filter(
        (i) =>
          i.toLowerCase().includes(search.toLowerCase()) &&
          !selected.includes(i),
      ),
    );
  };

  return (
    <>
      <Input
        name={name}
        applied={initAsArray}
        open={open}
      />
      <Drawer anchor="bottom" open={isOpen} onClose={close}>
        <Search
          addRule={addRule}
          search={handleSearch}
          term={search}
          toggle={selectAll}
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
                  label="options"
                  isSelected={isSelected}
                  select={addToSelected}
                  data={inactive}
                />
                <TransferListColumn
                  label="active"
                  data={active}
                  isSelected={isSelected}
                  select={addToSelected}
                />
                <Fab
                  onClick={transferTo}
                  color="secondary"
                  className={cls.fabs}
                >
                  <CompareArrows />
                </Fab>
              </Grid>
              <Chips
                data={words.filter(isGlob)}
                pullRule={removeRule}
              />
            </Container>
          </Fade>
        )}
      </Drawer>
    </>
  );
}

TransferList.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TransferList;
