import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {
  ErrorGraphic,
  EmptyGraphic,
  MissingGraphic,
} from '../graphic';

const ErrorTemplate = ({ Graphic, title, desc }) => (
  <Paper elevation={0}>
    <Graphic />
    <Container maxWidth="sm">
      <Box
        textAlign="center"
        mt={-2}
        pb={4}
        position="relative"
      >
        <Typography variant="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {desc}
        </Typography>
      </Box>
    </Container>
  </Paper>
);

ErrorTemplate.propTypes = {
  Graphic: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default () => {
  const { t } = useTranslation();
  return (
    <ErrorTemplate
      Graphic={ErrorGraphic}
      title={t('titles:serverError')}
      desc={t('descriptions:serverError')}
    />
  );
};

export const Missing = () => {
  const { t } = useTranslation();
  return (
    <ErrorTemplate
      Graphic={MissingGraphic}
      title={t('titles:missing')}
      desc={t('descriptions:missing')}
    />
  );
};

export const Empty = () => {
  const { t } = useTranslation();
  return (
    <ErrorTemplate
      Graphic={EmptyGraphic}
      title={t('titles:empty')}
      desc={t('descriptions:empty')}
    />
  );
};
