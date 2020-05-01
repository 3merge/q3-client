import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  graphic: {
    '& svg, & img': {
      display: 'block',
      margin: '0 auto 4rem',
      maxWidth: '100%',
      height: 300,
      width: 350,
    },
  },
}));

const ErrorTemplate = ({
  children,
  title,
  description,
  transparent,
  disableGutter,
}) => {
  const { t } = useTranslation();
  const { graphic } = useStyles();

  return (
    <Paper
      elevation={0}
      style={{
        backgroundColor: transparent
          ? 'transparent'
          : undefined,
      }}
    >
      <Container maxWidth="sm">
        <Box className={graphic}>{children}</Box>
        <Box
          textAlign="center"
          mt={-2}
          pb={disableGutter ? 1 : 4}
          position="relative"
        >
          <Typography variant="h2" gutterBottom>
            {t(`titles:${title}`)}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t(`descriptions:${description}`)}
          </Typography>
        </Box>
      </Container>
    </Paper>
  );
};

const childrenProp = PropTypes.oneOfType([
  PropTypes.object,
  PropTypes.node,
]);

ErrorTemplate.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  children: childrenProp.isRequired,
  transparent: PropTypes.bool,
  disableGutter: PropTypes.bool,
};

ErrorTemplate.defaultProps = {
  title: 'error',
  description: 'error',
  transparent: false,
  disableGutter: false,
};

export default ErrorTemplate;

export const Missing = ({ children }) => (
  <ErrorTemplate title="missing" description="missing">
    {children}
  </ErrorTemplate>
);

Missing.propTypes = {
  children: childrenProp.isRequired,
};

export const Empty = ({ children }) => (
  <ErrorTemplate title="empty" description="empty">
    {children}
  </ErrorTemplate>
);

Empty.propTypes = {
  children: childrenProp.isRequired,
};
