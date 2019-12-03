import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Link } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Star from '@material-ui/icons/Star';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Apps from '@material-ui/icons/MoreVert';
import Pageview from '@material-ui/icons/Link';
import SelectAll from '@material-ui/icons/SelectAll';
import Refresh from '@material-ui/icons/Refresh';
import Clear from '@material-ui/icons/Clear';
import Trash from '@material-ui/icons/DeleteForever';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { grey, yellow } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import {
  useOpenState,
  Delete as DeleteConfirmation,
} from '../dialogs';
import Avatar from '../avatar';
import { DropDownMenu } from '../toolbar';
import ErrorComponent, {
  Empty as EmptyComponent,
} from '../error';
import Filter, {
  FilterProps,
  withLocation,
} from '../filter';

const useStyles = makeStyles((theme) => ({
  tableRowHover: {
    transition: 'all 500ms',
    '&:nth-child(even)': {
      backgroundColor: grey[100],
    },
    '&>.visible-on-hover': {
      textAlign: 'right',
    },
    '&>.visible-on-hover button': {
      opacity: 0,
      transition: 'opacity 250',
    },
    '&>.visible-on-hover button:focus': {
      opacity: 1,
    },
    '&:hover>.visible-on-hover button': {
      opacity: 1,
    },
    [theme.breakpoints.down('sm')]: {
      '&>.visible-on-hover button': {
        opacity: 1,
      },
    },
  },
  starred: {
    color: ({ featured }) =>
      featured ? yellow[500] : grey[200],
    '&:hover': {
      color: ({ featured }) =>
        featured ? yellow[300] : grey[500],
    },
  },
  float: {
    float: 'right',
  },
  boxes: {
    width: 250,
  },
  leader: {
    width: 350,
  },
  mobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const extractId = (obj, i) =>
  typeof obj === 'object' && 'id' in obj ? obj.id : i;

export const TableCellHeader = ({ name, sub, imgSrc }) => (
  <TableCell>
    <Grid container alignItems="center" spacing={1}>
      <Grid item md={2} sm={1} xs={2}>
        <Avatar word={name} imgSrc={imgSrc} />
      </Grid>
      <Grid item md={10} sm={11} xs={10}>
        <Typography
          variant="body1"
          component="span"
          style={{ lineHeight: 1 }}
        >
          <strong>{name}</strong>
          {sub && (
            <div>
              <small>{sub}</small>
            </div>
          )}
        </Typography>
      </Grid>
    </Grid>
  </TableCell>
);

TableCellHeader.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  sub: PropTypes.string,
};

TableCellHeader.defaultProps = {
  sub: null,
  imgSrc: null,
};

export const Templated = ({
  root,
  columns,
  rowToolbar,
  children,
  showChildren,
  ...rest
}) => {
  const { id } = rest;
  const { t } = useTranslation('labels');

  const getText = (k) => {
    const v = get(rest, k);
    const d = moment(v, moment.ISO_8601, true);
    return d.isValid() ? d.format('MMM Do YYYY') : t(v);
  };

  return (
    <TableRow key={id}>
      {columns.map((key, i) =>
        Array.isArray(key) ? (
          <TableCellHeader
            name={t(get(rest, key[0]))}
            sub={t(get(rest, key[1]))}
            imgSrc={get(rest, key[2])}
            data={rest}
          />
        ) : (
          <TableCell data-title={t(`labels:${columns[i]}`)}>
            <Typography
              variant="subtitle2"
              component="span"
            >
              {getText(key)}
            </Typography>
          </TableCell>
        ),
      )}

      <TableCell style={{ textAlign: 'right' }}>
        {children}
        <IconButton
          component={Link}
          to={`${root}/${id}`}
          aria-label="View"
        >
          <Pageview />
        </IconButton>
        {rowToolbar && rowToolbar.length ? (
          <DropDownMenu
            items={
              typeof rowToolbar === 'function'
                ? rowToolbar(rest)
                : rowToolbar
            }
          >
            {(open, isOpen) => (
              <Tooltip title={t('menu')}>
                <IconButton
                  style={{ opacity: isOpen ? 1 : null }}
                  onClick={open}
                >
                  <Apps />
                </IconButton>
              </Tooltip>
            )}
          </DropDownMenu>
        ) : null}
      </TableCell>
    </TableRow>
  );
};

Templated.propTypes = {
  children: PropTypes.node,
  showChildren: PropTypes.bool,
  root: PropTypes.string.isRequired,
  rowToolbar: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
  ).isRequired,
};

Templated.defaultProps = {
  children: null,
  rowToolbar: [],
  showChildren: PropTypes.bool,
};

const TablePaper = ({ children }) => (
  <Paper
    elevation={2}
    style={{ maxWidth: '100%', overflow: 'auto' }}
  >
    {children}
  </Paper>
);

TablePaper.propTypes = {
  children: PropTypes.node.isRequired,
};

const TableSkeleton = () => (
  <Box p={3}>
    <Skeleton />
    <Skeleton width="60%" />
    <Skeleton width="25%" />
    <Skeleton width="80%" />
    <Skeleton width="42%" />
    <Skeleton width="90%" />
  </Box>
);

const getPage = (query) => Number(query.get('page') || 0);

const TablePaginationQuery = withLocation(
  ({ locationParams, updateParams, total }) => (
    <TablePagination
      page={getPage(locationParams)}
      onChangePage={(e, num) =>
        num >= 0 ? updateParams({ page: num }) : null
      }
      rowsPerPageOptions={[]}
      count={total}
      rowsPerPage={25}
    />
  ),
);

const TableToolbar = ({
  checked,
  executeBulkDelete,
  executeBulkDownload,
  canDelete,
  canDownload,
  children,
}) => {
  const { t } = useTranslation();
  const openState = useOpenState();

  return (
    <Box
      textAlign="right"
      style={{
        padding: '0.5rem',
        backgroundColor: grey[200],
        borderBottom: `1px solid ${grey[300]}`,
      }}
    >
      {children}
      {checked.length ? (
        <>
          {canDelete && (
            <>
              <IconButton
                onClick={openState.open}
                aria-label="Delete"
              >
                <Trash />
              </IconButton>
              <DeleteConfirmation
                {...openState}
                next={executeBulkDelete}
              />
            </>
          )}
          {canDownload && (
            <IconButton
              aria-label={t('labels:download')}
              onClick={executeBulkDownload}
            >
              <CloudDownload />
            </IconButton>
          )}
        </>
      ) : null}
    </Box>
  );
};

TableToolbar.propTypes = {
  children: PropTypes.node.isRequired,
  checked: PropTypes.arrayOf(PropTypes.string),
  executeBulkDelete: PropTypes.func,
  executeBulkDownload: PropTypes.func,
  canDelete: PropTypes.bool,
  canDownload: PropTypes.bool,
};

TableToolbar.defaultProps = {
  executeBulkDelete: null,
  executeBulkDownload: null,
  checked: [],
  canDelete: false,
  canDownload: false,
};

const SelectAllButton = ({
  hasServices,
  ids,
  setChecked,
  clear,
  checked,
}) => {
  const { t } = useTranslation();
  const label = checked.length
    ? t('labels:clearAll')
    : t('labels:selectAll');
  const onClick = checked.length
    ? clear
    : () => setChecked(ids);
  const Icon = checked.length ? Clear : SelectAll;

  if (!hasServices) return null;

  return (
    <IconButton aria-label={label} onClick={onClick}>
      <Badge badgeContent={checked.length}>
        <Icon />
      </Badge>
    </IconButton>
  );
};

SelectAllButton.propTypes = {
  hasServices: PropTypes.bool.isRequired,
  setChecked: PropTypes.func.isRequired,
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const SelectCheckbox = ({
  id,
  hasServices,
  isChecked,
  onCheck,
}) => {
  const { t } = useTranslation();
  if (!hasServices) return null;

  return (
    <Checkbox
      aria-label={t('labels:check')}
      onClick={onCheck(id)}
      checked={isChecked(id)}
    />
  );
};

SelectCheckbox.propTypes = {
  isChecked: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  hasServices: PropTypes.bool.isRequired,
};

const RefreshButton = ({ poll, clear }) => {
  const { t } = useTranslation();
  return poll ? (
    <IconButton
      aria-label={t('labels:poll')}
      onClick={() => {
        poll();
        clear();
      }}
    >
      <Refresh />
    </IconButton>
  ) : null;
};

RefreshButton.propTypes = {
  clear: PropTypes.func.isRequired,
  poll: PropTypes.func.isRequired,
};

const Favourite = ({ id, featured, mark }) => {
  const { t } = useTranslation();
  const { starred } = useStyles({ featured });
  if (!mark) return null;

  return (
    <IconButton
      aria-label={t('labels:favourite')}
      onClick={mark(id, !featured)}
      className={starred}
    >
      <Star />
    </IconButton>
  );
};

Favourite.propTypes = {
  id: PropTypes.string.isRequired,
  mark: PropTypes.func,
  featured: PropTypes.bool,
};

Favourite.defaultProps = {
  featured: false,
  mark: null,
};

export const useCheckboxes = () => {
  const [checked, setChecked] = React.useState([]);
  const clear = () => setChecked([]);
  const isChecked = (key) => checked.includes(key);

  const onCheck = (key) => () =>
    setChecked(
      checked.includes(key)
        ? checked.filter((i) => i !== key)
        : checked.concat(key),
    );

  return {
    checked,
    setChecked,
    onCheck,
    isChecked,
    clear,
  };
};

const useActionBar = ({
  deleteMany,
  downloadMany,
  poll,
  mark,
}) => {
  const {
    checked,
    setChecked,
    onCheck,
    isChecked,
    clear,
  } = useCheckboxes();

  const hasServices = Boolean(deleteMany || downloadMany);

  const executeBulkDelete = () =>
    deleteMany(checked).then((e) => {
      setChecked([]);
      return e;
    });

  const executeBulkDownload = () =>
    downloadMany(checked).then((e) => {
      return e;
    });

  const withActions = (Comp) => (props) => (
    <Comp
      {...props}
      clear={clear}
      hasServices={hasServices}
      executeBulkDelete={executeBulkDelete}
      executeBulkDownload={executeBulkDownload}
      checked={checked}
      poll={poll}
      mark={mark}
      onCheck={onCheck}
      isChecked={isChecked}
      setChecked={setChecked}
      canDelete={Boolean(deleteMany)}
      canDownload={Boolean(downloadMany)}
    />
  );

  return {
    Toolbar: withActions(TableToolbar),
    CheckboxMaster: withActions(SelectAllButton),
    CheckboxRow: withActions(SelectCheckbox),
    Poll: withActions(RefreshButton),
    Mark: withActions(Favourite),
    hasServices,
  };
};

export const TableView = ({
  rows,
  loading,
  error,
  columns,
  total,
  root,
  rowTemplate: Row,
  filterProps,
  ...etc
}) => {
  const {
    Toolbar,
    CheckboxMaster,
    Poll,
    CheckboxRow,
    Mark,
    hasServices,
  } = useActionBar(etc);
  const { leader, mobile, boxes } = useStyles();
  const { t } = useTranslation();
  const [showResults, setShowResults] = React.useState(
    false,
  );

  const getClassName = (v) => {
    if (v === 0) return leader;
    return null;
  };

  const getId = React.useCallback(
    (k) => (Array.isArray(k) ? k[0] : k),
    [],
  );

  React.useEffect(() => {
    if (!loading && !showResults) {
      const clear = setTimeout(() => {
        setShowResults(true);
        clearTimeout(clear);
      }, 120);
    }
  }, [loading]);

  if (!showResults)
    return (
      <TablePaper>
        <TableSkeleton />
      </TablePaper>
    );

  if (error)
    return (
      <TablePaper>
        <ErrorComponent />
      </TablePaper>
    );

  if (!rows || !rows.length)
    return (
      <TablePaper>
        <EmptyComponent />
      </TablePaper>
    );

  return (
    <TablePaper>
      <Toolbar>
        <CheckboxMaster ids={rows.map(extractId)} />
        <Poll />
        <Filter {...filterProps} />
      </Toolbar>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow className={mobile}>
            {columns.map((key, i) => (
              <TableCell
                key={getId(key)}
                className={getClassName(i)}
              >
                {t(`labels:${getId(key)}`)}
              </TableCell>
            ))}
            <TableCell className={boxes} />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((props, i) => {
            const key = extractId(props, i);
            return (
              <Templated
                {...etc}
                {...props}
                key={key}
                showChildren={hasServices}
                Component={Row}
                columns={columns}
                root={root || window.location.pathname}
              >
                <CheckboxRow id={key} {...props} />
                <Mark id={key} {...props} />
              </Templated>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePaginationQuery total={total} />
          </TableRow>
        </TableFooter>
      </Table>
    </TablePaper>
  );
};

TableView.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  rowTemplate: PropTypes.func.isRequired,
  filterProps: PropTypes.shape(FilterProps).isRequired,
  total: PropTypes.number,
  root: PropTypes.string,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ),
};

TableView.defaultProps = {
  loading: false,
  error: false,
  rows: [],
  columns: [],
  total: 0,
  root: '',
};

export default TableView;
