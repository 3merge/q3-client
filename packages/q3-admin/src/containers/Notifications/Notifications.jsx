import React from 'react';
import PropTypes from 'prop-types';
import { Fab, Box, Hidden } from '@material-ui/core';
import classnames from 'classnames';
import Notifications from 'q3-ui-notifications';
import NotificationIcon from '@material-ui/icons/Notifications';
import { useNotifications } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import useButtonStyle from '../../components/ButtonWithIcon/styles';
import useStyle from './styles';
import useNotificationsPage from '../../hooks/useNotificationsPage';

export const ButtonComponentWithAnimation = ({
  icon,
  numberOfNotifications,
  ...rest
}) => {
  const cls = useStyle();
  const [amount, setAmount] = React.useState(0);
  const [classlist, setClassList] = React.useState([]);

  React.useEffect(() => {
    if (numberOfNotifications > amount) {
      setClassList([cls.shake]);
    } else {
      setClassList([]);
    }

    setAmount(numberOfNotifications);
  }, [numberOfNotifications]);

  return (
    <Box className={classnames(...classlist)}>
      <ButtonWithIcon
        {...rest}
        count={amount}
        icon={icon}
        label="notifications"
        id="app-notifications"
      />
    </Box>
  );
};

ButtonComponentWithAnimation.defaultProps = {
  icon: null,
  numberOfNotifications: 0,
};

ButtonComponentWithAnimation.propTypes = {
  icon: PropTypes.element,
  numberOfNotifications: PropTypes.number,
};

const NotificationsContainer = () => {
  const { visit } = useNotificationsPage();
  const { data, clear, error, loading, syncSeen } =
    useNotifications({
      numberOfDays: 7,
    });

  const ButtonComponent = React.useCallback(
    (notificationProps) => (
      <ButtonComponentWithAnimation
        {...notificationProps}
      />
    ),
    [],
  );

  return (
    <Notifications
      buttonComponent={ButtonComponent}
      data={data}
      error={error}
      clear={clear}
      loading={loading}
      more={visit}
      syncSeen={syncSeen}
    />
  );
};

const withPlaceholderButton = (Component) => (props) => {
  const { isOn, visit } = useNotificationsPage();
  const cls = useButtonStyle({
    on: true,
  });

  return isOn() ? (
    <Hidden lgUp>
      <Fab
        aria-current="page"
        onClick={visit}
        className={cls.fab}
      >
        <NotificationIcon />
      </Fab>
    </Hidden>
  ) : (
    <Component {...props} />
  );
};

export default React.memo(
  /**
   * This prevents the notification service from running
   * while on the notifications page
   */
  withPlaceholderButton(NotificationsContainer),
);
