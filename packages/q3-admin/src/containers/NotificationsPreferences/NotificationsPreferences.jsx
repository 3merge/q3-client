import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import { useTranslation } from 'q3-ui-locale';
import {
  CircularProgress,
  Box,
  Typography,
} from '@material-ui/core';
import { size, map, first } from 'lodash';
import useProfileNotifications from '../../hooks/useProfileNotifications';
import useProfileNotificationsLegacySync from '../../hooks/useProfileNotificationsLegacySync';
import Tab from '../../components/Tab';
import Tabs from '../../components/Tabs';

const ProfileNotifications = ({ channels, ...opts }) => {
  const { t } = useTranslation('descriptions');
  const init = useProfileNotificationsLegacySync(
    channels,
    opts,
  );

  const [state, setState] = React.useState(
    size(channels) ? first(channels) : undefined,
  );

  const handleChange = (_, nextValue) =>
    setState(nextValue);

  const { listensOptions, initialValues, onSubmit } =
    useProfileNotifications(state, opts);

  return init ? (
    <>
      {state && (
        <Box mb={2}>
          <Tabs onChange={handleChange} value={state}>
            {channels.map((item) => (
              <Tab
                key={item}
                label={t(`labels:${item}Notifications`)}
                value={item}
              />
            ))}
          </Tabs>
        </Box>
      )}
      {!size(listensOptions) ? (
        <Typography>
          {t('noNotificationsToSubscribeTo')}
        </Typography>
      ) : (
        <Builders.Form
          collectionName="profile"
          initialValues={initialValues}
          isNew
          onSubmit={onSubmit}
          showSuccessMessage
          submitLabel="update"
        >
          {map(listensOptions, (listen) => {
            const label = first(listen.split('__'));
            return (
              <Builders.Field
                key={listen}
                name={listen}
                label={t(`labels:${label}`)}
                helper={t(`helpers:${label}`)}
                type="checkbox"
                variant="switch"
                under="listens"
              />
            );
          })}
        </Builders.Form>
      )}
    </>
  ) : (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      p={4}
    >
      <CircularProgress />
    </Box>
  );
};

ProfileNotifications.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.string),
  mine: PropTypes.bool,
};

ProfileNotifications.defaultProps = {
  channels: [],
  mine: true,
};

export default ProfileNotifications;
