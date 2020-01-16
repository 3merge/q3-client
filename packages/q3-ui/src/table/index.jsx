import React from 'react';
import Badge from '@material-ui/core/Badge';
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
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import { useToggle } from 'useful-state';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import Apps from '@material-ui/icons/AssignmentReturned';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { grey, yellow } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import Avatar from '../avatar';
import { DropDownMenu } from '../toolbar';
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
  rowRenderer,
  ...rest
}) => {
  const { toggle, state } = useToggle();

  return (
    <TableCell
      onClick={toggle}
      style={{
        cursor: rowRenderer ? 'pointer' : 'inherit',
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item style={{ width: 'calc(40px + 1rem)' }}>
          <Avatar word={name} imgSrc={imgSrc} />
        </Grid>
        <Grid item style={{ flex: 1, minWidth: 275 }}>
          <Typography variant="body1">
            <strong>{ellpisis(name, 25)}</strong>
            {sub && (
              <Box component="small" display="block">
                {ellpisis(sub, 75)}
              </Box>
            )}
          </Typography>
        </Grid>
        {'status' in rest && (
          <Grid item>
            <Chip
              size="small"
              color="secondary"
              label={rest.status}
            />
          </Grid>
        )}
      </Grid>
      <Collapse
        in={state && typeof rowRenderer === 'function'}
      >
        {rowRenderer ? rowRenderer(rest) : null}
      </Collapse>
    </TableCell>
  );
};

TableCellHeader.propTypes = {
  imgSrc: PropTypes.string,
  name: PropTypes.string.isRequired,
  sub: PropTypes.string,
  rowRenderer: PropTypes.func,
};

TableCellHeader.defaultProps = {
  rowRenderer: null,
};

TableCellHeader.defaultProps = {
  sub: null,
  imgSrc: null,
};

export const Templated = ({
  root,
  rowHeader,
  rowToolbar,
  children,
  ...rest
}) => {
  const { id } = rest;
  const { t } = useTranslation('labels');

  return (
    <TableRow>
      <TableCellHeader
        name={t(get(rest, rowHeader[0]))}
        sub={t(get(rest, rowHeader[1]))}
        imgSrc={get(rest, rowHeader[2])}
        {...rest}
      />
      <TableCell
        style={{
          verticalAlign: 'text-top',
        }}
      >
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
  root: PropTypes.string.isRequired,
  rowToolbar: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
  rowHeader: PropTypes.arrayOf(PropTypes.string).isRequired,
};

Templated.defaultProps = {
  children: null,
  rowToolbar: [],
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

const SkeletonRow = () => (
  <Skeleton
    variant="rect"
    height={67}
    width="100%"
    style={{
      background: '#FFF',
      borderBottom: '3px solid #f5f5f5',
    }}
  />
);

const TableSkeleton = () => (
  <Box>
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
    <SkeletonRow />
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
  ids: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
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
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export const TableViewSkeleton = () => (
  <TablePaper>
    <TableSkeleton />
  </TablePaper>
);

export const TableView = ({
  rows,
  total,
  root,
  ...etc
}) => {
  const { t } = useTranslation();
  const { leader, mobile, boxes } = useStyles();

  const getClassName = (v) => {
    if (v === 0) return leader;
    return null;
  };

  return (
    <TablePaper>
      <Table stickyHeader>
        <TableHead>
          <TableRow className={mobile}>
            <TableCell className={getClassName(0)}>
              {t('labels:showingResults', { total })}
            </TableCell>
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
  rows: [],
  total: 0,
  root: '',
};

export default TableView;
