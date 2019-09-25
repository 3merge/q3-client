import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import TrendingFlat from '@material-ui/icons/TrendingFlat';
import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  iconCls: {
    display: 'block',
    margin: `0 auto ${theme.spacing(2)}px`,
    maxWidth: '100%',
    height: 210,
    '& img': {
      width: '100%',
      height: '100%',
      position: 'relative',
      objectFit: 'cover',
    },
  },
  negativeMargin: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    display: 'block',
    marginLeft: -theme.spacing(4),
    width: `calc(100% + ${theme.spacing(4)}px)`,
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: '150%',
    position: 'relative',
    height: 0,
    '& img': {
      mixBlendMode: 'screen',
      position: 'absolute',
      objectFit: 'cover',
      height: '100%',
      width: '100%',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    },
    [theme.breakpoints.down('xs')]: {
      margin: '16px auto -16px',
      paddingTop: 0,
      height: 130,
      width: 'calc(100% - 32px)',
    },
  },
  iconHead: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(4),
    position: 'relative',
  },
  iconThumb: {
    left: theme.spacing(3.5),
    height: 70,
    position: 'absolute',
    top: 'calc(100% - 35px)',
    width: 70,
  },
  iconBody: {
    padding: `${theme.spacing(6)}px ${theme.spacing(
      4,
    )}px 0`,
  },
  iconText: {
    color: blueGrey[200],
    lineHeight: 0,
  },
  spacing: {
    marginLeft: theme.spacing(1),
  },
  root: {
    display: 'block',
    overflow: 'visible',
    textDecoration: 'none',
    position: 'relative',
  },
  ribbon: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFF',
    fontSize: '0.85rem',
    padding: '0.25rem 1rem',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
    textTransform: 'uppercase',
    '&::before,&::after': {
      content: "''",
      position: 'absolute',
      width: 0,
      height: 0,
      left: '100%',
      borderRight: '10px solid transparent',
    },
    '&::before': {
      borderBottom: '20px solid transparent',
      borderLeft: `10px solid ${theme.palette.primary.main}`,
      top: 0,
    },
    '&::after': {
      borderTop: '20px solid transparent',
      borderBottom: `20px solid ${theme.palette.primary.main}`,
      bottom: 0,
    },
  },
}));

const CardWrapper = ({ children, to, ...rest }) => {
  const { root } = useStyles();
  return (
    <Grid item {...rest}>
      <Card component={Link} className={root} to={to}>
        {children}
      </Card>
    </Grid>
  );
};

export const ResourceCard = ({
  imgSrc,
  name,
  title,
  to,
  description,
}) => {
  const cls = useStyles();
  return (
    <CardWrapper item md={6} sm={12} to={to}>
      <Grid container spacing={4} alignItems="center">
        <Grid item lg={4} md={5} sm={6} xs={12}>
          <div className={cls.negativeMargin}>
            <img src={imgSrc} alt={title} />
          </div>
        </Grid>
        <Grid item lg={8} md={7} sm={6} xs={12}>
          <CardContent>
            <Typography
              className="MuiTypography--overline"
              variant="overline"
              gutterBottom
            >
              {name}
            </Typography>
            <Typography
              className="MuiTypography--heading"
              variant="h3"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography gutterBottom>
              {description}
            </Typography>
            <Button
              tabIndex="-1"
              variant="outlined"
              color="primary"
            >
              More
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </CardWrapper>
  );
};

ResourceCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export const ProjectCard = ({
  imgSrc,
  name,
  title,
  to,
  description,
  label,
}) => {
  const cls = useStyles();
  return (
    <CardWrapper md={4} sm={6} xs={12} to={to}>
      <div className={cls.iconHead}>
        <Avatar className={cls.iconThumb} src={imgSrc} />
        <Typography
          variant="overline"
          className={cls.iconText}
        >
          {label}
        </Typography>
      </div>
      <Divider light />
      <CardContent className={cls.iconBody}>
        <Typography
          className="MuiTypography--overline"
          variant="overline"
          gutterBottom
        >
          {name}
        </Typography>
        <Typography
          className="MuiTypography--heading"
          variant="h3"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography gutterBottom>{description}</Typography>
        <Typography
          variant="subtitle2"
          style={{ textDecoration: 'underline' }}
        >
          Read more
        </Typography>
      </CardContent>
    </CardWrapper>
  );
};

export const NewsCard = ({
  imgSrc,
  title,
  description,
  to,
  label,
}) => {
  const { iconCls, spacing, ribbon } = useStyles();
  return (
    <CardWrapper md={4} sm={6} xs={12} to={to}>
      <div to={to} className={iconCls}>
        <img src={imgSrc} alt={title} />
        {label && <span className={ribbon}>{label}</span>}
      </div>
      <CardContent>
        <Box px={3}>
          <Typography
            gutterBottom
            variant="h4"
            component="h3"
          >
            {title}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
          <Typography component="div" align="right">
            <TrendingFlat className={spacing} />
          </Typography>
        </Box>
      </CardContent>
    </CardWrapper>
  );
};

ProjectCard.propTypes = ResourceCard.propTypes;
NewsCard.propTypes = ResourceCard.propTypes;
