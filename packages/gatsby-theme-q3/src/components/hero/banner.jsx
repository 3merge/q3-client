import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BannerActions from './bannerActions';
import Title from './title';

const useStyles = makeStyles((theme) => ({
  base: {
    position: 'relative',
    boxSizing: 'border-box',
    overflow: 'hidden',
    padding: theme.spacing(3),
    width: '100%',
  },
}));

const defaultAligment = (bool) => (bool ? 'center' : 'flex-start');
const defaultJustification = (bool) => (bool ? 'center' : 'flex-start');

const renderBannerBody = ({
  title,
  subtitle,
  label,
  center,
  ...rest
}) => () => (
  <Box>
    <Typography variant="overline" color="secondary">
      {label}
    </Typography>
    <Title title={title} />
    {subtitle && (
      <Typography variant="subtitle1" component="h2">
        {subtitle}
      </Typography>
    )}
    <BannerActions {...rest} justify={defaultJustification(center)} />
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
    <Box component="section" className={base} style={backgroundStyle}>
      <Container>
        <Box my={dense ? 3 : 6} textAlign={defaultAligment(center)}>
          <Grid
            container
            alignItems="center"
            justify={defaultJustification(center)}
            spacing={8}
          >
            <GridItemRenderer size={12} render={renderTop} />
            <GridItemRenderer size={6} render={renderLeft} />
            <GridItemRenderer size={6} render={renderBannerBody(props)} />
            <GridItemRenderer size={6} render={renderRight} />
            <GridItemRenderer size={12} render={renderBottom} />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;
