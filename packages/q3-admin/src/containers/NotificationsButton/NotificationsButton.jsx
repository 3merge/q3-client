import React from 'react';
import { Fab, Box, Hidden } from '@material-ui/core';
import classnames from 'classnames';
import NotificationIcon from '@material-ui/icons/Notifications';
import { get } from 'lodash';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import useButtonStyle from '../../components/ButtonWithIcon/styles';
import useStyle from './styles';
import useNotificationsPage from '../../hooks/useNotificationsPage';
import ServerSideEventsContext from '../ServerSideEventsContext';

const NotificationsButton = (props) => {
  const { isOn, visit } = useNotificationsPage();
  const { shake } = useStyle();
  const { fab } = useButtonStyle({
    on: true,
  });

  const { connected, counters, error } = React.useContext(
    ServerSideEventsContext,
  );

  const [amount, setAmount] = React.useState(0);
  const [classlist, setClassList] = React.useState([]);

  const numberOfNotifications = get(
    counters,
    'notifications',
    0,
  );

  const getIcon = () => {
    if (error) return NotificationImportantIcon;
    if (connected) return NotificationIcon;
    return NotificationsOffIcon;
  };

  React.useEffect(() => {
    if (numberOfNotifications > amount) {
      setClassList([shake]);
    } else {
      setClassList([]);
    }

    setAmount(numberOfNotifications);
  }, [numberOfNotifications]);

  return isOn() ? (
    <Hidden lgUp>
      <Fab
        aria-current="page"
        onClick={visit}
        className={fab}
      >
        <NotificationIcon />
      </Fab>
    </Hidden>
  ) : (
    <Box className={classnames(...classlist)}>
      <ButtonWithIcon
        {...props}
        count={amount}
        icon={getIcon()}
        label="notifications"
        id="app-notifications"
      />
    </Box>
  );
};

export default NotificationsButton;
