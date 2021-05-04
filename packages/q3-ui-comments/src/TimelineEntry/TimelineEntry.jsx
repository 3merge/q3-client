import React from 'react';
import moment from 'moment';
import { string } from 'q3-ui-helpers';
import { Box, Typography } from '@material-ui/core';
import Avatar from 'q3-ui/lib/avatar';
import { compact } from 'lodash';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import useStyles from './styles';

const getTime = (d) => {
  const diff = moment().diff(d, 'minutes');
  const pluralize = (num, str) =>
    num !== 1 ? `${str}s` : str;

  if (diff < 60)
    return `${diff} ${pluralize(diff, 'minute')} ago`;
  if (diff < 1440)
    return `${Math.floor(diff / 60)} ${pluralize(
      Math.floor(diff / 60),
      'hour',
    )} ago`;
  if (diff < 4320)
    return `${Math.floor(diff / 1440)} ${pluralize(
      Math.floor(diff / 1440),
      'data',
    )} ago`;

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
  const name =
    compact([
      createdBy?.firstName,
      createdBy?.lastName,
    ]).join(' ') || 'Anonymous';

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
            <Avatar imgSrc={createdBy?.photo} word={name} />
          </TimelineDot>
        )}
      </TimelineSeparator>
      <TimelineContent>
        <Box mb={1}>
          <Typography className={cls.title}>
            <strong>{name}</strong>
            <small>{getTime(createdAt)}</small>
          </Typography>
          <div
            className={cls.rich}
            dangerouslySetInnerHTML={{
              __html: message,
            }}
          />
          {children}
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};

export default TimelineEntry;
