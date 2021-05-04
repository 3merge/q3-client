import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { string } from 'q3-ui-helpers';
import { Box, Typography } from '@material-ui/core';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import useStyles from './styles';
import Avatar, { makeName } from '../Avatar';

export const getTime = (xs) => {
  const d = moment(xs);
  if (!d.isValid()) return '';

  const diff = moment().diff(d, 'minutes');
  if (diff < 60) return `+${diff}min.`;
  if (diff < 1440) return `+${Math.floor(diff / 60)}hr.`;
  if (diff < 4320) return `+${Math.floor(diff / 1440)}d.`;
  return string.toDate(d);
};

const TimelineEntry = ({
  connector,
  createdAt,
  createdBy,
  message,
  children,
}) => {
  const cls = useStyles({
    connector,
  });

  return (
    <TimelineItem className={cls.root}>
      <TimelineSeparator>
        {connector ? (
          <>
            <TimelineDot />
            <TimelineConnector />
          </>
        ) : (
          <TimelineDot className={cls.dot}>
            <Avatar {...createdBy} />
          </TimelineDot>
        )}
      </TimelineSeparator>
      <TimelineContent>
        <Box mb={1}>
          <Typography className={cls.title}>
            <strong>{makeName(createdBy)}</strong>
            <small>{getTime(createdAt)}</small>
          </Typography>
          {message && (
            <div
              className={cls.rich}
              // eslint-disable-next-line
              dangerouslySetInnerHTML={{
                __html: message,
              }}
            />
          )}
          {children}
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};

TimelineEntry.defaultProps = {
  connector: false,
  createdAt: undefined,
  createdBy: null,
  message: '',
  children: null,
};

TimelineEntry.propTypes = {
  connector: PropTypes.bool,
  createdAt: PropTypes.string,
  createdBy: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  message: PropTypes.string,
  children: PropTypes.node,
};

export default TimelineEntry;
