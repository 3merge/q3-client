import React from 'react';
import { map, size } from 'lodash';
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
import { useTranslation } from 'react-i18next';
import TimelineEntry from '../TimelineEntry';
import useStyle from '../TimelineEntry/styles';

const Timeline = ({ loading, error, data }) => {
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
          <TableCell component="th">{t('user')}</TableCell>
          <TableCell component="th">
            {t('entity')}
          </TableCell>
          <TableCell component="th">{t('date')}</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {size(data) ? (
          map(data, (item, idx) => (
            <TimelineEntry
              key={`${item.date}-${idx}`}
              {...item}
            />
          ))
        ) : (
          <TableRow>
            <TableCell
              className={cls.padding}
              component="td"
              colSpan="5"
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
};

Timeline.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string,
    }),
  ),
};

export default Timeline;
