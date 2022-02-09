import React from 'react';
import moment from 'moment';
import { Form, Field } from 'q3-ui-forms/lib/builders';
import Context from 'q3-ui-locale/lib/context';
import { compact, uniq } from 'lodash';
import useProfileForm from '../../hooks/useProfileForm';
import SystemPageSub from '../../components/SystemPageSub';

const ProfileChangeTheme = (props) => {
  const { initialValues, onSubmit } = useProfileForm();
  const { supportedLngs } = React.useContext(Context);

  return (
    <SystemPageSub title="appLocale">
      <Form
        {...props}
        isNew
        collectionName="profile"
        keep={['lang', 'timezone']}
        showSuccessMessage
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <Field
          name="lang"
          type="select"
          options={uniq(
            compact([
              initialValues?.lang,
              ...supportedLngs,
            ]),
          )}
          xl={12}
          lg={12}
        />
        <Field
          name="timezone"
          type="select"
          options={moment.tz.names()}
          xl={12}
          lg={12}
        />
      </Form>
    </SystemPageSub>
  );
};

export default ProfileChangeTheme;
