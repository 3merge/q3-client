/* eslint-disable prefer-destructuring  */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Chip } from '@material-ui/core';
import useTimelineEntry from '../useTimelineEntry';

const TimelineIcon = (props) => {
  const { t } = useTranslation('labels');
  const checkout = useTimelineEntry();
  const { Icon, text, color } = checkout(props);

  return (
    <Chip
      style={{ borderColor: color, color }}
      avatar={<Icon style={{ color: 'inherit' }} />}
      size="small"
      variant="outlined"
      label={t(text)}
    />
  );
};

export default TimelineIcon;
