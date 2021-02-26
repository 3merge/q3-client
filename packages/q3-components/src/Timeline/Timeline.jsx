import React from 'react';
import PropTypes from 'prop-types';
import { Timeline as MaterialTimeline } from '@material-ui/lab';
import {
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
  TimelineDot,
} from '@material-ui/lab';
import { string } from 'q3-ui-helpers';
import ReactDiffViewer, {
  DiffMethod,
} from 'react-diff-viewer';
import { Typography } from '@material-ui/core';
import {
  omit,
  get,
  map,
  isObject,
  join,
  compact,
} from 'lodash';
import useStyles from './useStyle';

const removeMeta = (o) =>
  JSON.stringify(
    omit(o, ['lastModifiedBy', 'updatedAt']),
    null,
    2,
  );

const getName = (o) =>
  isObject(o)
    ? join(
        compact(
          map(['firstName', 'lastName'], (v) => get(o, v)),
        ),
        ' ',
      )
    : 'System';

const Timeline = ({ entries, fetching }) => {
  const cls = useStyles();
  const data = Array.isArray(entries) ? entries : [];
  if (fetching || data.length === 0) return null;

  return (
    <MaterialTimeline>
      {data.map((item, i) =>
        i !== 0 ? (
          <TimelineItem
            key={`timelineItem${i}`}
            className={cls.wrapper}
          >
            <TimelineOppositeContent
              className={cls.initial}
            >
              <Typography className={cls.date}>
                <strong>
                  {getName(item.lastModifiedBy)}
                </strong>
                <br />
                {string.toDate(item.updatedAt)}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <ReactDiffViewer
                newValue={removeMeta(data[i - 1])}
                oldValue={removeMeta(item)}
                compareMethod={DiffMethod.WORDS}
                splitView
              />
            </TimelineContent>
          </TimelineItem>
        ) : null,
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
