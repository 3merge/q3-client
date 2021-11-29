import React from 'react';
import PropTypes from 'prop-types';
import { uniq } from 'lodash';
import { FixedSizeList } from 'react-window';
import isGlob from 'is-glob';
import { useTranslation } from 'q3-ui-locale';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import FlashOn from '@material-ui/icons/FlashOn';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import { grey } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import CompareArrows from '@material-ui/icons/CompareArrows';
import IconButton from 'q3-ui/lib/iconButton';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Collapse from '@material-ui/core/Collapse';
import LinearProgress from '@material-ui/core/LinearProgress';
import Badge from '@material-ui/core/Badge';
import useOpen from 'useful-state/lib/useOpen';
import { Placeholder } from 'q3-ui-assets';
import { array, string } from 'q3-ui-helpers';
import withState from './withState';
import { useOptions } from '../hooks';
import withGrid from './withGrid';

const fn = (exec, args) => (props) => exec(args, props);

export const getInactiveItems = (terms = [], rules = []) =>
  terms.filter((term) => !array.matchOnSome(rules, term));

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
    height: 275,
    overflow: 'hidden',
    position: 'relative',
    '& > svg': {
      left: '50%',
      height: '65%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      width: '65%',
    },
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

function Search({
  search,
  term,
  toggle,
  addRule,
  disableRule,
  ...rest
}) {
  const classes = useStyles();
  const { t } = useTranslation('labels');
  const [err, setError] = React.useState(false);

  return (
    <Box m={2} mb={0}>
      <TextField
        {...rest}
        onChange={search}
        value={term}
        className={classes.input}
        label="Start typing..."
        fullWidth
        helperText={
          !err ? t('searchByGlob') : t('notAGlob')
        }
        error={err}
        inputProps={{
          autocomplete: 'off',
        }}
        // eslint-disable-next-line
        InputProps={{
          endAdornment: (
            <>
              <IconButton
                label="selectAll"
                icon={AllInclusiveIcon}
                buttonProps={{
                  onClick: toggle,
                  ...rest,
                }}
              />
              {addRule && !disableRule && (
                <IconButton
                  label="createRule"
                  icon={FlashOn}
                  buttonProps={{
                    onClick: () => setError(!addRule()),
                    ...rest,
                  }}
                />
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
      <ListItemText primary={data[index].toUpperCase()} />
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
  showPlaceholder,
}) {
  const cls = useStyles();
  const { t } = useTranslation();
  return (
    <Grid item xs={6}>
      <Box className={cls.column}>
        <Typography variant="overline" gutterBottom>
          {t(`labels:${label}`)}
        </Typography>
        {data.length || !showPlaceholder ? (
          <FixedSizeList
            className={cls.overflow}
            itemCount={data.length}
            height={275}
            width="100%"
            itemSize={46}
          >
            {TransferListDataRow(data, select, isSelected)}
          </FixedSizeList>
        ) : (
          <Fade in>
            <Box className={cls.overflow}>
              <Placeholder />
            </Box>
          </Fade>
        )}
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
  showPlaceholder: PropTypes.bool,
};

TransferListColumn.defaultProps = {
  showPlaceholder: false,
};

export const Toggle = ({ applied, label, open }) => (
  <Button size="large" onClick={open} color="primary">
    <Badge
      badgeContent={applied.length}
      style={{ marginRight: '0.75rem' }}
      color="secondary"
    >
      <Avatar>
        <SettingsOverscanIcon />
      </Avatar>
    </Badge>
    {label}
  </Button>
);

Toggle.propTypes = {
  /**
   * Text to display inside the button.
   */
  label: PropTypes.string.isRequired,

  /**
   * Function to attach to onClick handler.
   * Intended to launch transfer editor.
   */
  open: PropTypes.func.isRequired,

  /**
   * List of applied, or "active", rules in the editor.
   */
  applied: PropTypes.arrayOf(PropTypes.string),
};

Toggle.defaultProps = {
  applied: [],
};

export function TransferList(props) {
  const {
    value: init,
    onChange,
    helperText,
    error,
    ...deco
  } = props;

  const [selected, setSelected] = React.useState([]);
  const {
    items,
    loading,
    value: search,
    onChange: handleSearch,
    onClear,
  } = useOptions({
    loadOptionsPlainly: true,
    ...props,
  });

  const { open, close, isOpen } = useOpen();
  const cls = useStyles();

  const initAsArray =
    string.transformDelineatedStringIntoArray(init);

  const isSelected = (item) => selected.includes(item);
  const transformedItems = items.map(
    string.castToLowercase,
  );

  const active = uniq(initAsArray);
  const inactive = uniq(
    getInactiveItems(transformedItems, active),
  );

  const addToSelected = (item) => {
    if (isSelected(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected(selected.concat(item));
    }
  };

  const transferTo = () => {
    const [val] = array.shuffle(
      initAsArray,
      inactive,
      selected,
    );
    onChange(
      string.transformArrayIntoDelineatedString(uniq(val)),
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

  const selectAll = () =>
    inactive.length === selected.length
      ? setSelected([])
      : setSelected(inactive);

  return (
    <>
      <Toggle
        applied={active}
        open={open}
        loading={loading}
        {...deco}
      />
      <Collapse in={Boolean(helperText)}>
        <FormHelperText
          error={error}
          style={{ padding: '4px 14px', margin: 0 }}
        >
          {helperText}
        </FormHelperText>
      </Collapse>

      <Drawer anchor="bottom" open={isOpen} onClose={close}>
        {loading && <LinearProgress />}

        <Search
          addRule={addRule}
          search={handleSearch}
          term={search}
          toggle={selectAll}
          {...deco}
        />
        <Container maxWidth="md" className={cls.box}>
          <Grid
            container
            justify="center"
            alignItems="center"
            spacing={1}
            style={{
              position: 'relative',
            }}
          >
            <TransferListColumn
              label="optionsBySearch"
              isSelected={isSelected}
              select={addToSelected}
              data={inactive}
              showPlaceholder
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
              {...deco}
            >
              <CompareArrows />
            </Fab>
          </Grid>
        </Container>
      </Drawer>
    </>
  );
}

TransferList.propTypes = {
  name: PropTypes.string.isRequired,
};

export default withGrid(withState(TransferList), {
  xl: 12,
  lg: 12,
});
