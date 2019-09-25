import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  base: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    boxSizing: 'border-box',
    overflow: 'hidden',
    padding: theme.spacing(3),
    width: '100%',
  },
}));

const defaultAligment = (bool) =>
  bool ? 'center' : 'flex-start';

const defaultJustification = (bool) =>
  bool ? 'center' : 'flex-start';

const hasAction = (obj, render) =>
  obj && typeof obj === 'object' && 'href' in obj ? (
    <Grid item>{render(obj.href, obj.label)}</Grid>
  ) : null;

const IntersectionButton = ({
  children,
  href,
  ...rest
}) => (
  <Button {...rest} to={href} size="large">
    {children}
  </Button>
);

export const Title = ({ title }) => (
  <Box mt={1} mb={2}>
    <Typography variant="h1" color="inherit">
      {typeof title === 'function' ? title() : title}
    </Typography>
  </Box>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

const BannerActions = ({
  primaryAction,
  secondaryAction,
  justify,
}) =>
  primaryAction || secondaryAction ? (
    <Box mt={4}>
      <Grid
        container
        spacing={1}
        alignItems="center"
        justify={justify}
      >
        {hasAction(primaryAction, (href, label) => (
          <IntersectionButton
            href={href}
            variant="contained"
            color="secondary"
            size="large"
          >
            {label}
          </IntersectionButton>
        ))}
        {hasAction(secondaryAction, (href, label) => (
          <IntersectionButton
            href={href}
            variant="outlined"
            color="primary"
            size="large"
          >
            {label}
          </IntersectionButton>
        ))}
      </Grid>
    </Box>
  ) : null;

const renderBannerBody = ({
  title,
  subtitle,
  label,
  center,
  ...rest
}) => () => (
  <Box>
    <Typography variant="overline" color="inherit">
      {label}
    </Typography>
    <Title title={title} />
    {subtitle && (
      <Typography
        variant="subtitle1"
        component="h2"
        color="inherit"
      >
        {subtitle}
      </Typography>
    )}
    <BannerActions
      {...rest}
      justify={defaultJustification(center)}
    />
  </Box>
);

const GridItemRenderer = ({ render, size }) =>
  render && typeof render === 'function' ? (
    <Grid item sm={size} xs={12}>
      {render()}
    </Grid>
  ) : null;

const Banner = (props) => {
  const { base, blob } = useStyles();
  const {
    backgroundStyle,
    dense,
    renderLeft,
    renderRight,
    renderTop,
    renderBottom,
    center,
  } = props;

  return (
    <Box
      component="section"
      className={base}
      style={backgroundStyle}
    >
      <Container>
        <Box
          my={dense ? 3 : 6}
          textAlign={defaultAligment(center)}
        >
          <Grid
            container
            alignItems="center"
            justify={defaultJustification(center)}
            spacing={8}
          >
            <GridItemRenderer
              size={12}
              render={renderTop}
            />
            <GridItemRenderer
              size={6}
              render={renderLeft}
            />
            <GridItemRenderer
              size={6}
              render={renderBannerBody(props)}
            />
            <GridItemRenderer
              size={6}
              render={renderRight}
            />
            <GridItemRenderer
              size={12}
              render={renderBottom}
            />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
