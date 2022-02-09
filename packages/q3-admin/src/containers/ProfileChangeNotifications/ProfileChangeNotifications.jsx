import React from 'react';
import { Builders } from 'q3-ui-forms';
import { useTranslation } from 'q3-ui-locale';
import Typography from '@material-ui/core/Typography';
import { get, size, map } from 'lodash';
import useDomainContext from '../../hooks/useDomainContext';
import useProfileForm from '../../hooks/useProfileForm';
import SystemPageSub from '../../components/SystemPageSub';

// eslint-disable-next-line
const ProfileNotifications = ({ children }) => {
  const { t } = useTranslation('descriptions');
  const domain = useDomainContext();
  const { initialValues, onSubmit } = useProfileForm();
  const listens = initialValues?.listens;
  const listeners = get(
    domain?.domain?.listeners,
    initialValues?.role,
  );

  return (
    <SystemPageSub title="notifications">
      <Builders.Form
        isNew
        collectionName="profile"
        showSuccessMessage
        disabled={!size(listeners)}
        initialValues={
          Array.isArray(listens)
            ? listens.reduce((acc, curr) => {
                acc[curr] = true;
                return acc;
              }, {})
            : {}
        }
        onSubmit={(values) =>
          onSubmit({
            listens: Object.entries(values)
              .reduce((acc, [key, value]) => {
                if (value) acc.push(key);
                return acc;
              }, [])
              .sort(),
          })
        }
      >
        {!size(listeners) ? (
          <Typography>
            {t('noNotificationsToSubscribeTo')}
          </Typography>
        ) : (
          map(listeners, (listen) => (
            <Builders.Field
              key={listen}
              name={listen}
              type="checkbox"
              variant="switch"
            />
          ))
        )}
      </Builders.Form>
    </SystemPageSub>
  );
};

export default ProfileNotifications;
