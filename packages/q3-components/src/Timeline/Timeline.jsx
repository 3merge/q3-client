import React from 'react';
import PropTypes from 'prop-types';
import { Timeline as MaterialTimeline } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import {
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
} from '@material-ui/lab';
import { Grid, Typography } from '@material-ui/core';
import useStyles from './useStyle';

const ops = {
  N: 'Create',
  D: 'Delete',
  E: 'Update',
  A: 'Update',
};

const getName = (name) => {
  if (!name) return null;

  const ns = name.split(' ');

  return { firstName: ns[0], lastName: ns[1] || '' };
};

export const transform = (entry) => {
  const { diff, modifiedBy, modifiedOn } = entry;

  return {
    target: diff.path[0],
    op: ops[diff.kind],
    modifiedOn,
    modified: {
      [diff.path.join('.')]: {
        prev: diff.lhs,
        curr: diff.rhs,
      },
    },
    modifiedBy: getName(modifiedBy),
  };
};

const getUser = (modifiedBy) => {
  if (!modifiedBy) return 'Untracked user';
  return `${modifiedBy.firstName} ${modifiedBy.lastName}`;
};

const isBase = (target) => target === 'baseSchema';

const getDescription = (op, target, t) => {
  if (isBase(target))
    return `${op.toLowerCase()}d the document`;

  if (op === 'Delete')
    return `remove an entry from ${t(target)}`;
  if (op === 'Create') return `added to ${t(target)}`;
  return `updated entries in ${t(target)}`;
};

const formatPrevCurrDescription = ({ prev, curr }) =>
  prev
    ? `changed from "${prev}" to "${curr}"`
    : `set to "${curr}"`;

const formatNestedProperty = (target, name) =>
  name && name.includes('%2E') && !isBase(target)
    ? name.replace(target, '').replace(/(%2E)\d+(%2E)/, '')
    : name;

const Timeline = ({ entries, fetching }) => {
  const { t } = useTranslation('labels');
  const cls = useStyles();
  const diffs = entries.map((x) =>
    x.ref ? x : transform(x),
  );

  return fetching ? null : (
    <MaterialTimeline>
      {diffs.map(
        (
          { op, target, modifiedOn, modifiedBy, modified },
          idx,
        ) => (
          <TimelineItem
            key={`timelineItem${idx}`}
            className={cls.wrapper}
          >
            <TimelineSeparator>
              <TimelineDot
                className={cls[op] || cls.other}
              />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Grid container spacing={1}>
                <Grid item>
                  <Typography style={{ margin: 0 }}>
                    {`${getUser(
                      modifiedBy,
                    )} ${getDescription(
                      op,
                      target,
                      t,
                    )} on ${moment(modifiedOn).format(
                      'LLLL',
                    )}`}
                  </Typography>
                  <Typography component="ul">
                    {Object.entries(modified).map(
                      ([key, value]) => (
                        <li key={key}>
                          <strong>
                            <u>
                              {t(
                                formatNestedProperty(
                                  target,
                                  key,
                                ),
                              )}
                            </u>
                          </strong>{' '}
                          {formatPrevCurrDescription(value)}
                        </li>
                      ),
                    )}
                  </Typography>
                </Grid>
              </Grid>
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
