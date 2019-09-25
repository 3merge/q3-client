import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const PanelHeader = ({ label, title, headingSize }) => (
  <>
    {label && (
      <Typography variant="overline" gutterBottom>
        {label}
      </Typography>
    )}
    {title && (
      <Typography variant={headingSize} gutterBottom>
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
}) => (
  <Container maxWidth={size}>
    <Grid
      container
      spacing={10}
      direction={invert ? 'row-reverse' : 'row'}
    >
      <Grid item xs={6}>
        {columnLeft}
      </Grid>
      <Grid item xs={6}>
        {columnRight}
      </Grid>
    </Grid>
  </Container>
);

SplitPanel.propTypes = {
  columnLeft: PropTypes.node.isRequired,
  columnRight: PropTypes.node.isRequired,
  invert: PropTypes.bool,
  size: PropTypes.string,
};

SplitPanel.defaultProps = {
  invert: false,
  size: 'md',
};

export const TwoColumnPanel = ({
  subtitle,
  body,
  ...rest
}) => (
  <SplitPanel
    columnLeft={
      <>
        <PanelHeader {...rest} headingSize="h2" />
        <Typography
          variant="subtitle1"
          component="p"
          gutterBottom
        >
          {subtitle}
        </Typography>
      </>
    }
    columnRight={
      <Typography variant="body2" component="div">
        {body}
      </Typography>
    }
  />
);

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
    <Grid container justify="space-between" spacing={5}>
      <Grid item xs={3}>
        <PanelHeader {...rest} headingSize="h3" />
      </Grid>
      <Grid item xs={8}>
        <Grid container spacing={10}>
          <Grid item xs={6}>
            {columnOne}
          </Grid>
          <Grid item xs={6}>
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
