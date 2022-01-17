import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import useStyle from './styles';

const TimelineEntryMeta = ({ date, user }) => {
  const cls = useStyle();

  return (
    <Typography component="em" className={cls.text}>
      {`${user} @ ${string.toDate(date)}`}
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
