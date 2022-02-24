import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { map, join, size } from 'lodash';
import PropTypes from 'prop-types';
import { lighten } from '@material-ui/core/styles';
import {
  Box,
  CircularProgress,
  useTheme,
} from '@material-ui/core';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { useTranslation } from 'q3-ui-locale';
import TimelineEntry from '../TimelineEntry';
import TimelineEntryMeta from '../TimelineEntryMeta';
import { getColor, getIcon } from '../utils';
import useStyle from './styles';

const makeEntries = (xs) => {
  const out = [];

  const push = (key) => {
    if (size(xs[key]))
      xs[key].forEach((entry, idx) =>
        out.push({
          ...xs,
          action: key,
          data: entry,
          key: join([xs.date, key, idx], '-'),
        }),
      );
  };

  push('updates');
  push('additions');
  push('deletions');
  return out;
};

const TimelineCustom = ({
  fetching,
  fetchingError,
  changes,
}) => {
  const cls = useStyle();
  const theme = useTheme();
  const { t } = useTranslation('descriptions');
  const isDark = theme?.palette?.type === 'dark';

  if (fetching) return <CircularProgress />;

  if (fetchingError)
    return (
      <Box my={1}>
        <Alert severity="error">{t('cannotAudit')}</Alert>
      </Box>
    );

  if (!size(changes))
    return (
      <Box my={1}>
        <Alert severity="warning">
          {t('auditLogsEmpty')}
        </Alert>
      </Box>
    );

  return (
    <Timeline align="left">
      {map(changes, (record) =>
        makeEntries(record).map(
          ({ action, data: entry, key }) => {
            const color = getColor(action);
            const hue = isDark ? 50 : 900;
            const backgroundColor = color[hue];

            return (
              <TimelineItem className={cls.entry} key={key}>
                <TimelineSeparator>
                  <TimelineDot
                    style={{
                      backgroundColor,
                    }}
                  />
                  <TimelineConnector
                    style={{
                      backgroundColor,
                    }}
                  />
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    bgcolor={
                      isDark ? color[500] : color[50]
                    }
                    color="inherit"
                    p={1}
                    position="relative"
                  >
                    <Box
                      color={backgroundColor}
                      display="flex"
                      mb={0.5}
                      justifyContent="space-between"
                    >
                      <TimelineEntryMeta
                        action={action}
                        {...record}
                      />
                      <small>{t(`labels:${action}`)}</small>
                    </Box>
                    <TimelineEntry {...entry} />
                  </Box>
                </TimelineContent>
              </TimelineItem>
            );
          },
        ),
      )}
    </Timeline>
  );
};

TimelineCustom.defaultProps = {
  changes: [],
  fetchingError: false,
  fetching: false,
};

TimelineCustom.propTypes = {
  fetching: PropTypes.bool,
  fetchingError: PropTypes.bool,
  changes: PropTypes.arrayOf(
    PropTypes.shape({
      action: PropTypes.string,
      date: PropTypes.string,
      user: PropTypes.string,
    }),
  ),
};

export default TimelineCustom;
