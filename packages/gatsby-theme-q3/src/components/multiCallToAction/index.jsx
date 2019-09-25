import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
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

const CallToActionBlock = ({ title, description, href, buttonText }) => (
  <Grid item md={6} xs={12}>
    {renderIf(
      href,
      <Typography variant="h4" gutterBottom color="inherit">
        {title}
      </Typography>,
    )}
    {renderIf(
      description,
      <Typography component="p" gutterBottom color="inherit">
        {description}
      </Typography>,
    )}
    {renderIf(
      href,
      <Button to={href} component={Link} variant="contained" color="secondary">
        {buttonText}
      </Button>,
    )}
  </Grid>
);

CallToActionBlock.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

const MultiCallToAction = ({
  title,
  label,
  columnLeft,
  columnRight,
  color,
}) => {
  const cls = useStyles();
  return (
    <Box py={10} className={cls[color]}>
      <Container maxWidth="lg">
        <Grid container spacing="5" justify="space-between">
          <Grid item md={4} sm={4} xs={12}>
            <Typography variant="overline" gutterBottom color="secondary">
              {label}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid item md={7} sm={8} xs={12}>
            <Grid container spacing={5}>
              <CallToActionBlock {...columnLeft} />
              <CallToActionBlock {...columnRight} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

MultiCallToAction.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  columnLeft: PropTypes.shape(CallToActionBlock).isRequired,
  columnRight: PropTypes.shape(CallToActionBlock).isRequired,
  color: PropTypes.oneOf(['primary', 'secondary']),
};

MultiCallToAction.defaultProps = {
  color: null,
};

export default MultiCallToAction;
