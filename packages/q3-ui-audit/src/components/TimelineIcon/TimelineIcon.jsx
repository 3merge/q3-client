/* eslint-disable prefer-destructuring  */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@material-ui/core';
import { get } from 'lodash';
import { useTheme } from '@material-ui/core/styles';
import useTimelineEntry from '../useTimelineEntry';

const TimelineIcon = (props) => {
  const { t } = useTranslation('labels');
  const { Icon, text, color } = useTimelineEntry(props);
  const theme = useTheme();

  return (
    <Avatar
      aria-label={t(text)}
      style={{
        color: theme.palette.background.paper,
        backgroundColor: get(
          color,
          theme?.palette.type === 'dark' ? '100' : '900',
        ),
      }}
    >
      <Icon style={{ color: 'inherit' }} />
    </Avatar>
  );
};

export default TimelineIcon;
