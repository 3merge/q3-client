import React from 'react';
import { Link } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import {
  Box,
  Container,
  Divider,
  Fade,
  Typography,
  Link as MuiLink,
} from '@material-ui/core';

export default ({ maxWidth = 'sm', title, children }) => {
  const { t } = useTranslation();

  return (
    <Fade in>
      <Container maxWidth={maxWidth}>
        <MuiLink component={Link} to="..">
          {t('labels:back')}
        </MuiLink>
        <Box mt={1}>
          <Typography component="h1" variant="h5">
            {t(`titles:${title}`)}
          </Typography>
        </Box>
        <Box py={2}>
          <Divider />
        </Box>
        {children}
      </Container>
    </Fade>
  );
};
