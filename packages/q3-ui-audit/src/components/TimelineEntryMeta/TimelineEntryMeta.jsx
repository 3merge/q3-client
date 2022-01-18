import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { compact } from 'lodash';
import useStyle from './styles';

const TimelineEntryMeta = ({ date, user }) => {
  const cls = useStyle();

  return (
    <Typography component="em" className={cls.text}>
      {compact([user, string.toDate(date)]).join(' @ ')}
    </Typography>
  );
};

TimelineEntryMeta.defaultProps = {
  user: 'System',
};

TimelineEntryMeta.propTypes = {
  date: PropTypes.string.isRequired,
  user: PropTypes.string,
};

export default TimelineEntryMeta;
