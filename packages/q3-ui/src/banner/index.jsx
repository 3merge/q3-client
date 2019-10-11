import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const generateNegative = (num) => ({ negativeMargin }) =>
  !negativeMargin ? 0 : num;

const useStyles = makeStyles((theme) => ({
  base: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
    boxSizing: 'border-box',
    overflow: 'hidden',
    marginTop: generateNegative(-150),
    paddingTop: generateNegative(150),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginTop: generateNegative(-100),
      paddingTop: generateNegative(100),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: generateNegative(-120),
    },
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

export const Title = ({ title, color }) => (
  <Box mt={1} mb={2}>
    <Typography variant="h1" color={color}>
      {typeof title === 'function' ? title() : title}
    </Typography>
  </Box>
);

Title.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  color: PropTypes.string,
};

Title.defaultProps = {
  color: undefined,
};

const renderBannerBody = ({ subtitle, ...rest }) => () => (
  <Box>
    <Title {...rest} />
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
  negativeMargin,
  top,
  bottom,
}) => {
  const { base } = useStyles({ negativeMargin });
  return (
    <Box component="section" className={base} style={style}>
      <Container fixed>
        <Box
          my={dense ? 2 : 6}
          textAlign={defaultAligment(center)}
        >
          {top}
          {children}
          {bottom}
        </Box>
      </Container>
    </Box>
  );
};

BannerBase.propTypes = {
  children: PropTypes.node.isRequired,
  top: PropTypes.node,
  bottom: PropTypes.node,
  style: PropTypes.shape({}),
  dense: PropTypes.bool,
  center: PropTypes.bool,
  negativeMargin: PropTypes.bool,
};

BannerBase.defaultProps = {
  dense: false,
  center: false,
  style: null,
  negativeMargin: false,
  top: null,
  bottom: null,
};

export const FeaturedPhotoBanner = ({
  imgSrc,
  children,
  flip,
  customImgRender,
  ...rest
}) => {
  const { mobileDirection } = useStyles();
  return (
    <BannerBase {...rest}>
      <Grid
        container
        alignItems="center"
        spacing={4}
        direction={flip ? 'row-reverse' : 'reverse'}
        className={mobileDirection}
      >
        <GridItemRenderer render={renderBannerBody(rest)}>
          {children}
        </GridItemRenderer>
        {(imgSrc || customImgRender) && (
          <GridItemRenderer
            render={() =>
              customImgRender || (
                <img
                  src={imgSrc}
                  alt={rest.title}
                  style={{ maxHeight: 500 }}
                />
              )
            }
          />
        )}
      </Grid>
    </BannerBase>
  );
};

FeaturedPhotoBanner.propTypes = {
  imgSrc: PropTypes.string,
  customImgRender: PropTypes.node,
  children: PropTypes.node.isRequired,
  flip: PropTypes.bool,
};

FeaturedPhotoBanner.defaultProps = {
  flip: false,
  imgSrc: null,
  customImgRender: null,
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
