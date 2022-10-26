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
  const { t } = useTranslation('labels');
  const defaultState =
    String(
      browser.proxyLocalStorageApi('getItem', STORAGE_KEY),
    ) === 'true';

  const { state, toggle } = useToggle(defaultState);

  React.useEffect(() => {
    if (state !== defaultState)
      browser.proxyLocalStorageApi(
        'setItem',
        STORAGE_KEY,
        state,
      );
  }, [defaultState, state]);

  // eslint-disable-next-line
  const data = filter(props?.data, (item) => {
    if (state) return !item.hasSeen;
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
