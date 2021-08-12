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
import { object } from 'q3-ui-helpers';
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
          <TableCell component="th">{t('date')}</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody className={cls.body}>
        {size(data) ? (
          map(data, (item, idx) => {
            const {
              added,
              updated,
              deleted,
              ...rest
            } = item;

            return (
              <React.Fragment key={`${item.date}-${idx}`}>
                {object.hasKeys(added) && (
                  <TimelineEntry added={added} {...rest} />
                )}
                {object.hasKeys(updated) && (
                  <TimelineEntry
                    updated={updated}
                    {...rest}
                  />
                )}
                {object.hasKeys(deleted) && (
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
