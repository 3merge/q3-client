import React from 'react';
import PropTypes from 'prop-types';
import { Timeline as MaterialTimeline } from '@material-ui/lab';
import { string } from 'q3-ui-helpers';
import { size } from 'lodash';
import {
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
  TimelineDot,
} from '@material-ui/lab';
import { Typography } from '@material-ui/core';
import useStyles from './useStyle';
import TimelineEntry from '../TimelineEntry';

const hasDiff = (a) =>
  (size(a.updatedFields) || size(a.removedFields)) &&
  a.modifiedOn;

const Timeline = ({ entries, fetching }) => {
  const cls = useStyles();
  const data = Array.isArray(entries)
    ? entries.filter(hasDiff)
    : [];

  if (fetching || data.length === 0) return null;

  return (
    <MaterialTimeline>
      {data.map(
        ({ modifiedOn, modifiedBy, ...rest }, idx) => (
          <TimelineItem
            key={`timelineItem${idx}`}
            className={cls.wrapper}
          >
            <TimelineOppositeContent
              className={cls.initial}
            >
              <Typography className={cls.date}>
                <i>{string.toDate(modifiedOn)}</i>
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <small>
                <u>{modifiedBy || 'Sys'}</u>
              </small>
              <TimelineEntry data={rest} />
            </TimelineContent>
          </TimelineItem>
        ),
      )}
    </MaterialTimeline>
  );
};

Timeline.defaultProps = {
  fetching: false,
};

Timeline.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  entries: PropTypes.array.isRequired,
  fetching: PropTypes.bool,
};

export default Timeline;
