import React from 'react';
import { Link } from '@reach/router';
import { SearchEngine } from 'gatsby-theme-q3/src/components';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <Box component="main" p={2}>
      <SearchEngine title={t('titles:sample')} />
      <Typography variant="h1">
        {t('titles:sample')}
      </Typography>
      <Button
        id="app-launcher"
        variant="contained"
        color="primary"
        component={Link}
        to="/app"
      >
        {t('labels:loadApp')}
      </Button>
    </Box>
  );
};

export default IndexPage;
