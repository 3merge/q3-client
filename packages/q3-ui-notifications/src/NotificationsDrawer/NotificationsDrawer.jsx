import React from 'react';
import Dialog from 'q3-ui-dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyle from './styles';

const NotificationsDrawer = (props) => {
  const cls = useStyle();
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  );

  return (
    <Dialog
      {...props}
      anchor={isMobile ? 'right' : 'left'}
      className={cls.root}
      closeOnRouteChange
      title="notifications"
      variant="drawer"
    />
  );
};

NotificationsDrawer.propTypes = {};
NotificationsDrawer.defaultProps = {};

export default NotificationsDrawer;
