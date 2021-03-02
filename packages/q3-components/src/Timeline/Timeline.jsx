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
import {
  Typography,
  CircularProgress,
} from '@material-ui/core';
import {
  omit,
  get,
  map,
  isObject,
  join,
  compact,
  sortBy,
  first,
} from 'lodash';
import flat from 'flat';
import alpha from 'alphabetize-object-keys';
import GraphicWithMessage from 'q3-ui-assets';
import useStyles from './useStyle';

const firstKey = (v) => {
  if (!isObject(v)) return undefined;
  try {
    return first(Object.keys(flat(first(v))).sort());
  } catch (e) {
    // otherwise give up
    return undefined;
  }
};

const sortObj = (o) =>
  isObject(o)
    ? alpha(
        Object.entries(o).reduce((acc, [key, value]) => {
          acc[key] = Array.isArray(value)
            ? sortBy(value, firstKey(value)).map(sortObj)
            : sortObj(value);

          return acc;
        }, {}),
      )
    : o;

const removeMeta = (o) =>
  JSON.stringify(
    flat(sortObj(omit(o, ['lastModifiedBy', 'updatedAt']))),
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

  if (fetching) return <CircularProgress />;

  if (data.length < 2)
    return (
      <GraphicWithMessage
        title="trackChanges"
        icon="Puzzle"
      />
    );

  return (
    <MaterialTimeline style={{ padding: 0 }}>
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
              <div style={{ fontSize: '.833rem' }}>
                <ReactDiffViewer
                  newValue={removeMeta(data[i - 1])}
                  oldValue={removeMeta(item)}
                  compareMethod={DiffMethod.WORDS}
                  splitView
                />
              </div>
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
