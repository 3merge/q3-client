import React from 'react';
import { Builders } from 'q3-ui-forms';
import { first } from 'lodash';
import {
  Box,
  CircularProgress,
  Grid,
  Container,
} from '@material-ui/core';
import { handleFormData } from 'q3-ui-forms/lib/helpers';
import useRest from 'q3-ui-rest';
import Graphic from 'q3-ui-assets';
import { PhotoUpload } from 'q3-ui-filemanager';
import FeaturedPhoto from '../../containers/FeaturedPhoto';

export const isNull = (v) =>
  v === 'null' || v === null ? '' : v;

const SystemInfo = () => {
  const {
    domains = [],
    fetching,
    fetchingError,
    patch,
  } = useRest({
    url: '/domains',
    key: 'domain',
    pluralized: 'domains',
    runOnInit: true,
  });

  const setting = first(domains);
  const fn = patch(setting?.id);

  if (fetching)
    return (
      <Box textAlign="center" p={8}>
        <CircularProgress />
      </Box>
    );

  if (fetchingError)
    return (
      <Graphic
        icon="Error"
        title="failedToFetchSiteSettings"
      />
    );

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item>
          Logo
          <FeaturedPhoto
            src={setting?.logo}
            update={fn}
            component={PhotoUpload}
            field="logo"
          />
        </Grid>
        <Grid>
          Fav
          <FeaturedPhoto
            src={setting?.favicon}
            update={fn}
            component={PhotoUpload}
            field="favicon"
          />
        </Grid>
        <Grid item xs={12}>
          <Builders.Form
            onSubmit={handleFormData(fn)}
            initialValues={setting}
            keep={[
              'terms',
              'privacy',
              'cancellation',
              'subdomain',
              'metaTitle',
              'metaBrand',
              'themeColor',
              'metaDescription',
              'supportedLngs',
            ]}
            modify={{
              'terms': [isNull],
              'privacy': [isNull],
              'cancellation': [isNull],
            }}
          >
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
        </Grid>
      </Grid>
    </Container>
  );
};
export default SystemInfo;
