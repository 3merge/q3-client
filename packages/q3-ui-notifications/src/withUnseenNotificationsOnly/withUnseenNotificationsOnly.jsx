import React from 'react';
import { filter } from 'lodash';
import { browser } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import {
  Box,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { useToggle } from 'useful-state';

const STORAGE_KEY = 'q3-notification-unseen-pref';

const withUnseenNotifications = (Component) => (props) => {
  const shouldOnlyShowUnseenNotifications = () =>
    String(
      browser.proxyLocalStorageApi('getItem', STORAGE_KEY),
    ) === 'true';

  const { t } = useTranslation('labels');
  const { state, toggle } = useToggle(
    shouldOnlyShowUnseenNotifications(),
  );

  const [showUnseenOnly, setShowUnseenOnly] =
    React.useState();

  React.useEffect(() => {
    setShowUnseenOnly(state);
    browser.proxyLocalStorageApi(
      'setItem',
      STORAGE_KEY,
      state,
    );
  }, [state]);

  // eslint-disable-next-line
  const data = filter(props.data, (item) => {
    if (showUnseenOnly) return !item.hasSeen;
    return true;
  });

  return (
    <>
      <Box display="inline-block" ml={1.5}>
        <FormControlLabel
          control={
            <Switch
              checked={state}
              onChange={toggle}
              name="unseen"
              color="primary"
            />
          }
          label={t('labels:showUnseenOnly')}
        />
      </Box>
      <Component {...props} data={data} />
    </>
  );
};

export default withUnseenNotifications;
