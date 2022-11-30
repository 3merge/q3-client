import React from 'react';
import PropTypes from 'prop-types';
import { string } from 'q3-ui-helpers';
import classnames from 'classnames';
import Alert from '@material-ui/lab/Alert';
import { Box, Typography } from '@material-ui/core';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { useTranslation } from 'q3-ui-locale';
import useStyles from './styles';
import Avatar, { makeName } from '../Avatar';

const TimelineEntry = ({
  actions,
  connector,
  createdAt,
  createdBy,
  message,
  children,
  id,
  removed,
}) => {
  const { t } = useTranslation('descriptions');
  const cls = useStyles({
    connector,
  });

  return (
    <TimelineItem
      id={id ? `comment-${id}` : undefined}
      className={cls.root}
    >
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
          <Box
            alignItems="center"
            display="flex"
            className={cls.wrap}
          >
            <Typography
              className={cls.title}
              component="div"
            >
              <strong>{makeName(createdBy)}</strong>
              <small>{string.toDate(createdAt)}</small>
              <span className="actions">{actions}</span>
            </Typography>
          </Box>
          {
            // eslint-disable-next-line
            removed ? (
              <Alert severity="error">
                {t('commentRemoved')}
              </Alert>
            ) : message ? (
              <div
                className={classnames(cls.rich, 'message')}
                // eslint-disable-next-line
                dangerouslySetInnerHTML={{
                  __html: message,
                }}
              />
            ) : null
          }
          {children}
        </Box>
      </TimelineContent>
    </TimelineItem>
  );
};

TimelineEntry.defaultProps = {
  actions: null,
  connector: false,
  createdAt: undefined,
  createdBy: null,
  message: '',
  children: null,
  id: undefined,
  removed: false,
};

TimelineEntry.propTypes = {
  actions: PropTypes.node,
  connector: PropTypes.bool,
  createdAt: PropTypes.string,
  createdBy: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }),
  message: PropTypes.string,
  children: PropTypes.node,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  removed: PropTypes.bool,
};

export default TimelineEntry;
