import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { renderIf } from '../../helpers';

export const useStyles = makeStyles((theme) => ({
  primary: {
    backgroundColor: theme.palette.primary.light,
  },
  secondary: {
    backgroundColor: theme.palette.secondary.dark,
    color: '#FFF',
  },
}));

const CallToAction = ({ title, label, description, children, center }) => {
  const cls = useStyles();
  return (
    <Box component="aside" my={2} py={10}>
      <Container maxWidth="lg">
        <Grid item md={8} xs={12}>
          <Box textAlign={center ? 'center' : 'left'}>
            {renderIf(
              label,
              <Typography variant="overline" gutterBottom color="secondary">
                {label}
              </Typography>,
            )}
            {renderIf(
              title,
              <Typography variant="h2" gutterBottom>
                {title}
              </Typography>,
            )}
            {renderIf(
              description,
              <Typography variant="subtitle1" gutterBottom>
                {description}
              </Typography>,
            )}
            {children}
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

CallToAction.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
};

CallToAction.defaultProps = {
  color: null,
};

export default CallToAction;
