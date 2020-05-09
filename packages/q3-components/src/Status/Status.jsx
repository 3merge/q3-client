import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import useStyle from './useStyle';

const Status = ({ icon: Icon, label, color }) => {
  const cls = useStyle({ color });

  return (
    <Chip
      label={label}
      size={Icon ? 'medium' : 'small'}
      className={cls.chip}
      avatar={
        Icon ? (
          <Avatar className={cls.root}>
            <Icon className={cls.icon} />
          </Avatar>
        ) : null
      }
    />
  );
};

Status.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
  ]),
};

Status.defaultProps = {
  icon: null,
};

export default Status;
