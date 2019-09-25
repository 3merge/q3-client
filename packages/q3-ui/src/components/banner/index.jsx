import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
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
    paddingTop: `calc(100px + ${theme.spacing(3)}px)`,
    width: '100%',
  },
  mobileDirection: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      flexDirection: 'column-reverse',
    },
  },
}));

const defaultAligment = (bool) =>
  bool ? 'center' : 'flex-start';

export const Title = ({ title }) => (
  <Box mt={1} mb={2}>
    <Typography variant="h1" color="inherit">
      {typeof title === 'function' ? title() : title}
    </Typography>
  </Box>
);

Title.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
};

const renderBannerBody = ({
  title,
  subtitle,
  label,
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
  </Box>
);

const GridItemRenderer = ({ children, render, size }) =>
  render ? (
    <Grid item md={size} sm={12}>
      {render()}
      {children}
    </Grid>
  ) : null;

GridItemRenderer.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func.isRequired,
  size: PropTypes.number,
};

GridItemRenderer.defaultProps = {
  children: null,
  size: 6,
};

export const BannerBase = ({
  children,
  center,
  dense,
  style,
}) => {
  const { base } = useStyles();
  return (
    <Box component="section" className={base} style={style}>
      <Container fixed>
        <Box
          my={dense ? 3 : 6}
          textAlign={defaultAligment(center)}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

BannerBase.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  dense: PropTypes.bool,
  center: PropTypes.bool,
};

BannerBase.defaultProps = {
  dense: false,
  center: false,
  style: null,
};

export const FeaturedPhotoBanner = ({
  imgSrc,
  children,
  flip,
  ...rest
}) => {
  const { mobileDirection } = useStyles();
  return (
    <BannerBase {...rest}>
      <Grid
        container
        alignItems="center"
        spacing={8}
        direction={flip ? 'row-reverse' : 'reverse'}
        className={mobileDirection}
      >
        <GridItemRenderer render={renderBannerBody(rest)}>
          {children}
        </GridItemRenderer>
        <GridItemRenderer
          render={() => (
            <img src={imgSrc} alt={rest.title} />
          )}
        />
      </Grid>
    </BannerBase>
  );
};

FeaturedPhotoBanner.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  flip: PropTypes.bool,
};

FeaturedPhotoBanner.defaultProps = {
  flip: false,
};

export const FullWidthBanner = ({
  children,
  flip,
  ...rest
}) => {
  return (
    <BannerBase center {...rest}>
      {flip && children}
      <GridItemRenderer
        render={renderBannerBody(rest)}
        size={12}
      />
      {!flip && children}
    </BannerBase>
  );
};

FullWidthBanner.propTypes = {
  children: PropTypes.node.isRequired,
  flip: PropTypes.bool,
};

FullWidthBanner.defaultProps = {
  flip: false,
};
