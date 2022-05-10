import React from 'react';
import { Box } from '@material-ui/core';
import classnames from 'classnames';
// eslint-disable-next-line
import Notifications from 'q3-ui-notifications';
import { useNotifications } from '../../hooks';
import ButtonWithIcon from '../../components/ButtonWithIcon';
import useStyle from './styles';

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
      setClassList([cls.button, cls.shake]);
    } else {
      setClassList([cls.button]);
    }

    setAmount(numberOfNotifications);
  }, [numberOfNotifications]);

  return React.useMemo(
    () => (
      <Box
        className={classnames(...classlist)}
        display="inline-block"
        width="100%"
      >
        <ButtonWithIcon
          {...rest}
          count={amount}
          icon={icon}
          label="notifications"
        />
      </Box>
    ),
    [amount],
  );
};

const NotificationsContainer = () => {
  const { data, syncSeen, error } = useNotifications({
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
      data={data}
      error={error}
      syncSeen={syncSeen}
      buttonComponent={ButtonComponent}
    />
  );
};

export default React.memo(NotificationsContainer);
