import React from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { get } from 'lodash';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { FeaturedPhotoBanner } from 'q3-ui/lib/banner';
import { useTranslation } from 'react-i18next';
import { browser } from 'q3-ui-helpers';
import {
  MongoStats,
  MongoChart,
} from 'q3-admin/lib/containers';

export default () => {
  const { t } = useTranslation('titles');

  return (
    <Box overflow="auto" height="100vh">
      <FeaturedPhotoBanner
        style={{ backgroundColor: '#FFF' }}
        title={t('home')}
      />
      <Box my={4}>
        <Container>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
          >
            Visualizations
          </Typography>

          <Grid container spacing={1}>
            <MongoChart
              id="56d2b267-cff5-4f94-9f0e-88ddd088b5a7"
              filters={{
                active: true,
              }}
              GridProps={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            />
          </Grid>
        </Container>
        <Container>
          <Box my={4}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
            >
              Quick links
            </Typography>
            <Grid
              container
              spacing={1}
              style={{ marginBottom: '2rem' }}
            >
              <MongoStats
                collectionName="investments"
                title="New Orders"
                to="/app/orders?sort=-updatedAt"
              />
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
