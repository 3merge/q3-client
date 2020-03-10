import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import useStyles from './useStyle';

const CollapsiblePanelAlert = ({
  important,
  title,
  label,
}) => {
  const cls = useStyles({ important });
  const Icon = important
    ? LabelImportantIcon
    : NotificationsActiveIcon;

  return (
    <Grid item xs={12} className={cls.root}>
      <Box p={1} display="block" component="em">
        <Icon className={cls.icon} />
        <strong style={{ textTransform: 'uppercase' }}>
          {label}
        </strong>
        &mdash; {title}
      </Box>
    </Grid>
  );
};

CollapsiblePanelAlert.propTypes = {
  important: PropTypes.bool,
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

CollapsiblePanelAlert.defaultProps = {
  important: false,
};

export default CollapsiblePanelAlert;
