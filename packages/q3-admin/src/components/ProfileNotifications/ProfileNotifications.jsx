import React from 'react';
import { Builders } from 'q3-ui-forms';
import { useTranslation } from 'q3-ui-locale';
import Typography from '@material-ui/core/Typography';
import useProfileForm from '../../hooks/useProfileForm';
import SystemPageSub from '../SystemPageSub';

// eslint-disable-next-line
const ProfileNotifications = ({ children }) => {
  const { t } = useTranslation('descriptions');
  const { initialValues, onSubmit } = useProfileForm();
  const listens = initialValues?.listens;

  return (
    <SystemPageSub title="notifications">
      <Builders.Form
        isNew
        collectionName="profile"
        showSuccessMessage
        disabled={!children}
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
        {children || (
          <Typography>
            {t('noNotificationsToSubscribeTo')}
          </Typography>
        )}
      </Builders.Form>
    </SystemPageSub>
  );
};

export default ProfileNotifications;
