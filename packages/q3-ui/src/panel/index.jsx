import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  removeMobileSpacing: {
    [theme.breakpoints.down('sm')]: {
      '&> .MuiGrid-item:first-of-type': {
        paddingBottom: 0,
      },
      '&> .MuiGrid-item:not(:first-of-type)': {
        paddingBottom: 0,
        paddingTop: 0,
        '& p:first-of-type': {
          marginTop: 0,
        },
      },
    },
  },
  columnSpacing: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
}));

const PanelHeader = ({ label, title, headingSize }) => (
  <>
    {label && (
      <Typography variant="overline" gutterBottom>
        {label}
      </Typography>
    )}
    {title && (
      <Typography
        variant={headingSize}
        gutterBottom
        color="inherit"
      >
        {title}
      </Typography>
    )}
  </>
);

PanelHeader.propTypes = {
  title: PropTypes.string,
  label: PropTypes.string,
  headingSize: PropTypes.string,
};

PanelHeader.defaultProps = {
  title: null,
  label: null,
  headingSize: 'h2',
};

export const SplitPanel = ({
  invert,
  columnLeft,
  columnRight,
  size,
  align,
  ...rest
}) => {
  const { removeMobileSpacing } = useStyles();
  return (
    <Container {...rest} maxWidth={size}>
      <Grid
        container
        spacing={1}
        direction={invert ? 'row-reverse' : 'row'}
        className={removeMobileSpacing}
        alignItems={align}
      >
        <Grid item md={6} xs={12}>
          {columnLeft}
        </Grid>
        <Grid item md={6} xs={12}>
          {columnRight}
        </Grid>
      </Grid>
    </Container>
  );
};

SplitPanel.propTypes = {
  columnLeft: PropTypes.node.isRequired,
  columnRight: PropTypes.node.isRequired,
  invert: PropTypes.bool,
  size: PropTypes.string,
  align: PropTypes.string,
};

SplitPanel.defaultProps = {
  invert: false,
  size: 'md',
  align: null,
};

export const TwoColumnPanel = ({
  subtitle,
  body,
  ...rest
}) => {
  const { columnSpacing } = useStyles();
  return (
    <SplitPanel
      columnLeft={
        <Box className={columnSpacing}>
          <PanelHeader {...rest} headingSize="h2" />
          {subtitle && (
            <Typography
              variant="subtitle1"
              component="p"
              gutterBottom
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      }
      columnRight={
        <Box className={columnSpacing}>
          <Typography variant="body2" component="div">
            {body}
          </Typography>
        </Box>
      }
    />
  );
};

TwoColumnPanel.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  label: PropTypes.string,
  body: PropTypes.node.isRequired,
};

TwoColumnPanel.defaultProps = {
  subtitle: null,
  label: null,
};

export const ThreeColumnPanel = ({
  columnOne,
  columnTwo,
  ...rest
}) => (
  <Container maxWidth="lg">
    <Grid container justify="space-between" spacing={2}>
      <Grid item md={3} sm={12}>
        <PanelHeader {...rest} headingSize="h3" />
      </Grid>
      <Grid item md={8} sm={12}>
        <Grid container justify="space-between" spacing={2}>
          <Grid item md={5} sm={6} xs={12}>
            {columnOne}
          </Grid>
          <Grid item md={5} sm={6} xs={12}>
            {columnTwo}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Container>
);

ThreeColumnPanel.propTypes = {
  columnOne: PropTypes.node.isRequired,
  columnTwo: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
