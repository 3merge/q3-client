import React from 'react';
import { filter } from 'lodash';
import { browser } from 'q3-ui-helpers';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'q3-ui-locale';
import Alert from '@material-ui/lab/Alert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useToggle } from 'useful-state';

const STORAGE_KEY = 'q3-notification-unseen-pref';
const LANG_KEY = 'showUnseenOnly';

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

  const renderText = (namespace) =>
    t(`${namespace}:${LANG_KEY}`);

  return (
    <>
      <Box mt={-1.5} mb={1}>
        <Alert severity="info">
          <strong>{renderText('titles')}</strong>
          <br />
          {renderText('descriptions')}
          <br />
          <FormControlLabel
            control={
              <Switch
                checked={state}
                onChange={toggle}
                name="unseen"
                color="primary"
              />
            }
            label={renderText('labels')}
          />
        </Alert>
      </Box>
      <Component {...props} data={data} />
    </>
  );
};

export default withUnseenNotifications;
