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
import Apps from '@material-ui/icons/AssignmentReturned';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { grey, yellow } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '../avatar';
import { DropDownMenu } from '../toolbar';
import ErrorComponent, {
  Empty as EmptyComponent,
} from '../error';
import { withLocation } from '../filter';
import { TableContext } from '../tableActionBar';

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
    width: 185,
  },
  leader: {
    minWidth: 350,
  },
  mobile: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const extractId = (obj, i) =>
  typeof obj === 'object' && 'id' in obj ? obj.id : i;

const ellpisis = (sub = '', num) =>
  sub && sub.length > num
    ? `${sub.substring(0, num)}...`
    : sub;

export const TableCellHeader = ({
  name,
  sub,
  imgSrc,
  to,
}) => (
  <TableCell>
    <Grid container alignItems="center" spacing={2}>
      <Grid item style={{ width: 'calc(40px + 1rem)' }}>
        <Avatar word={name} imgSrc={imgSrc} />
      </Grid>
      <Grid item style={{ flex: 1 }}>
        <Typography
          component={Link}
          to={to}
          variant="body1"
        >
          <strong>{ellpisis(name, 25)}</strong>
          {sub && (
              <Box component="small" display="block">{ellpisis(sub, 75)}</Box>
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
            to={`${id}`}
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
      <TableCell>
        <SelectCheckbox id={id} />
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

        <IconButton
          to={`${id}`}
          component={Link}
          aria-label="View"
        >
          <ArrowForward />
        </IconButton>
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
    elevation={0}
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

const SelectAllButton = ({ ids }) => {
  const { t } = useTranslation();
  const ctx = React.useContext(TableContext);

  if (!ctx) return null;
  const { clear, checked, setChecked, hasChecked } = ctx;
  const label = checked.length
    ? t('labels:clearAll')
    : t('labels:selectAll');

  const onClick = !checked.length
    ? () => setChecked(ids)
    : clear;

  return (
    <Badge badgeContent={checked.length} color="primary">
      <Checkbox
        style={{ padding: 12 }}
        aria-label={label}
        onClick={onClick}
        checked={hasChecked()}
      />
    </Badge>
  );
};

SelectAllButton.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const SelectCheckbox = ({ id }) => {
  const { t } = useTranslation();
  const ctx = React.useContext(TableContext);
  if (!ctx) return null;

  const { isChecked, onCheck } = ctx;

  return (
    <Checkbox
      aria-label={t('labels:check')}
      onClick={onCheck(id)}
      checked={isChecked(id)}
      style={{ padding: 12 }}
    />
  );
};

SelectCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
};

export const TableView = ({
  rows,
  loading,
  error,
  columns,
  total,
  root,
  rowTemplate: Row,
  ...etc
}) => {
  const { t } = useTranslation();
  const { leader, mobile, boxes } = useStyles();
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
      <Table stickyHeader>
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
            <TableCell className={boxes}>
              <SelectAllButton ids={rows.map(extractId)} />
            </TableCell>
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
                Component={Row}
                columns={columns}
                root={root || window.location.pathname}
              />
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
