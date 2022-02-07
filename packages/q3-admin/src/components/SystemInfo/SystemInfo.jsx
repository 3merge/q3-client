import React from 'react';
import { Builders } from 'q3-ui-forms';
import { isNull } from 'lodash';
import { Box, Paper } from '@material-ui/core';
import { handleFormData } from 'q3-ui-forms/lib/helpers';
import useRest from 'q3-ui-rest';

const SystemInfo = () => {
  const {
    settings = [],
    fetching,
    fetchingError,
    patch,
  } = useRest({
    url: '/settings',
    key: 'setting',
    pluralized: 'settings',
    runOnInit: false,
  });

  const [setting = {}] = settings;

  return (
    <Box p={2}>
      {' '}
      <Paper>
        <Box p={2}>
          <Builders.Form
            onSubmit={handleFormData(patch(setting.id))}
            initialValues={setting}
            modify={{
              'terms': [isNull],
              'privacy': [isNull],
              'cancellation': [isNull],
            }}
          >
            <Builders.Field
              folder="uploads"
              name="logo"
              type="file"
            />
            <Builders.Field
              folder="uploads"
              name="favicon"
              type="file"
            />
            <Builders.Field
              folder="uploads"
              name="terms"
              type="file"
            />
            <Builders.Field
              folder="uploads"
              name="privacy"
              type="file"
            />
            <Builders.Field
              folder="uploads"
              name="cancellation"
              type="file"
            />
          </Builders.Form>
        </Box>
      </Paper>
      <Paper style={{ marginTop: '2rem' }}>
        <Box p={2}>
          <Builders.Form>
            <Builders.Field type="text" name="subdomain" />
            <Builders.Field type="text" name="metaTitle" />
            <Builders.Field type="text" name="metaBrand" />
            <Builders.Field
              type="color"
              name="themeColor"
            />
            <Builders.Field
              type="text"
              name="metaDescription"
              max="155"
            />
            <Builders.Field
              type="chips"
              name="supportedLngs"
              options={['en', 'fr']}
            />
          </Builders.Form>
        </Box>
      </Paper>
    </Box>
  );
};
export default SystemInfo;
