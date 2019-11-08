import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { navigate } from '@reach/router';
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
import Apps from '@material-ui/icons/Apps';
import SelectAll from '@material-ui/icons/SelectAll';
import Refresh from '@material-ui/icons/Refresh';
import Clear from '@material-ui/icons/Clear';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { grey, yellow } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import { Delete as DeleteConfirmation } from '../dialogs';
import Avatar from '../avatar';
import { DropDownMenu } from '../toolbar';
import ErrorComponent, {
  Empty as EmptyComponent,
} from '../error';
import Filter, {
  FilterProps,
  withLocation,
} from '../filter';

const useStyles = makeStyles(() => ({
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
    width: 130,
  },
}));

const extractId = (obj, i) =>
  typeof obj === 'object' && 'id' in obj ? obj.id : i;

export const TableCellHeader = ({ name, sub, imgSrc }) => (
  <TableCell>
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Avatar word={name} imgSrc={imgSrc} />
      </Grid>
      <Grid item>
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
  const { tableRowHover, boxes } = useStyles();
  const { t } = useTranslation('labels');
  const redirect = () => navigate(`${root}/${id}`);

  return (
    <TableRow key={id} className={tableRowHover}>
      {showChildren && (
        <TableCell className={boxes}>{children}</TableCell>
      )}
      {columns.map((key) =>
        Array.isArray(key) ? (
          <TableCellHeader
            name={t(get(rest, key[0]))}
            sub={t(get(rest, key[1]))}
            imgSrc={get(rest, key[2])}
            data={rest}
          />
        ) : (
          <TableCell>
            <Typography
              variant="subtitle2"
              component="span"
            >
              {t(get(rest, key))}
            </Typography>
          </TableCell>
        ),
      )}
      <TableCell className="visible-on-hover">
        {rowToolbar && rowToolbar.length ? (
          <DropDownMenu items={rowToolbar}>
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
        ) : (
          <Tooltip title={t('view')}>
            <IconButton onClick={redirect}>
              <Apps />
            </IconButton>
          </Tooltip>
        )}
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
    elevation={4}
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
  clear,
  hasServices,
  children,
  canDelete,
  canDownload,
}) => {
  const { float } = useStyles();
  const { t } = useTranslation();

  if (!checked.length) return children;
  if (!hasServices) return null;

  return (
    <TableRow>
      <TableCell colSpan="10">
        <IconButton
          aria-label={t('labels:clearAll')}
          onClick={clear}
        >
          <Badge badgeContent={checked.length}>
            <Clear />
          </Badge>
        </IconButton>
        <Box className={float}>
          {canDelete && (
            <DeleteConfirmation next={executeBulkDelete} />
          )}
          {canDownload && (
            <IconButton
              aria-label={t('labels:download')}
              onClick={executeBulkDownload}
            >
              <CloudDownload />
            </IconButton>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

TableToolbar.propTypes = {
  hasServices: PropTypes.bool.isRequired,
  clear: PropTypes.func.isRequired,
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
}) => {
  const { t } = useTranslation();
  if (!hasServices) return null;

  return (
    <TableCell>
      <IconButton
        aria-label={t('labels:selectAll')}
        onClick={() => setChecked(ids)}
      >
        <SelectAll />
      </IconButton>
    </TableCell>
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
      onClick={() => mark(id)({ featured: !featured })}
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
  const { t } = useTranslation();
  const [showResults, setShowResults] = React.useState(
    false,
  );

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
      <Table size="small">
        <TableHead>
          <Toolbar>
            <TableRow>
              <CheckboxMaster ids={rows.map(extractId)} />
              {columns.map((key) => (
                <TableCell key={getId(key)}>
                  {t(`labels:${getId(key)}`)}
                </TableCell>
              ))}
              <TableCell style={{ textAlign: 'right' }}>
                <Poll />
                <Filter {...filterProps} />
              </TableCell>
            </TableRow>
          </Toolbar>
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
