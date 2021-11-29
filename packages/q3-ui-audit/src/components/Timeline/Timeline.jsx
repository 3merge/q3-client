import React from 'react';
import { map, size, isString } from 'lodash';
import GraphicWithMessage from 'q3-ui-assets';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { object } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import TimelineEntry from '../TimelineEntry';
import useStyle from '../TimelineEntry/styles';

const includes = (a, b) =>
  Array.isArray(a) ? !a.length || a.includes(b) : false;

const matches = (a, b) => (isString(a) ? a === b : false);

const Timeline = ({
  loading,
  error,
  data,
  filterState,
}) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  const renderGraphicMessage = () => {
    if (loading)
      return (
        <Box align="center" p={1}>
          <CircularProgress />
        </Box>
      );

    if (error)
      return (
        <GraphicWithMessage
          icon="Error"
          title="cannotAudit"
        />
      );

    return (
      <GraphicWithMessage
        icon="Puzzle"
        title="nothingToAudit"
      />
    );
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell component="th" className={cls.padding}>
            {t('operation')}
          </TableCell>
          <TableCell component="th">{t('date')}</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody className={cls.body}>
        {size(data) ? (
          map(data, (item, idx) => {
            const { added, updated, deleted, ...rest } =
              item;

            const isInItem = (key) => {
              const d = item[key];
              const op = filterState?.operation;

              return (
                object.hasKeys(d) &&
                (!op ||
                  includes(op, key) ||
                  matches(op, key))
              );
            };

            return (
              <React.Fragment key={`${item.date}-${idx}`}>
                {isInItem('added') && (
                  <TimelineEntry added={added} {...rest} />
                )}
                {isInItem('updated') && (
                  <TimelineEntry
                    updated={updated}
                    {...rest}
                  />
                )}
                {isInItem('deleted') && (
                  <TimelineEntry
                    deleted={deleted}
                    {...rest}
                  />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              className={cls.padding}
              component="td"
              colSpan="3"
            >
              {renderGraphicMessage()}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

Timeline.defaultProps = {
  data: [],
  error: false,
  loading: false,
  filterState: {},
};

Timeline.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
    }),
  ),
  filterState: PropTypes.shape({
    operation: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
  }),
};

export default Timeline;
