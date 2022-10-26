import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import classnames from 'classnames';
import Notifications from 'q3-ui-notifications';
import { useNotifications } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';
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
  const { isOn } = useNotificationsPage();

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
        icon={icon}
        label="notifications"
        id="app-notifications"
        {...(isOn()
          ? { disabled: true }
          : { count: amount })}
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

export default React.memo(NotificationsContainer);
