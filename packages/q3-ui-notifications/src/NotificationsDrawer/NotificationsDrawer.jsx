import React from 'react';
import Dialog from 'q3-ui-dialog';
import useStyle from './styles';

const NotificationsDrawer = (props) => {
  const cls = useStyle();

  return (
    <Dialog
      {...props}
      anchor="right"
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
