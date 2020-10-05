import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import useStyle from './useStyle';

const FieldGroup = ({ children, label }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Container>
      <Box my={2}>
        <Grid container>
          <Grid item className={cls.root}>
            <Typography variant="body2">
              <strong>{t(label)}</strong>
            </Typography>
          </Grid>
          <Grid item xs>
            <Grid container spacing={1}>
              {children}
            </Grid>
          </Grid>
        </Grid>
        <Box py={2}>
          <Divider />
        </Box>
      </Box>
    </Container>
  );
};

FieldGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  label: PropTypes.string.isRequired,
};

export default FieldGroup;
