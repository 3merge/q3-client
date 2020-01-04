import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { blueGrey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { getLinkAttributes } from '../utils';

const useStyles = makeStyles((theme) => ({
  iconCls: {
    display: 'block',
    margin: '0 auto',
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
    marginLeft: `-${theme.spacing(3)}`,
    width: `calc(100% + ${theme.spacing(4)})`,
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
    padding: theme.spacing(2.5),
    position: 'relative',
  },
  iconThumb: {
    borderRadius: ({ square }) => (square ? 5 : '50%'),
    left: theme.spacing(1.5),
    height: 70,
    position: 'absolute',
    top: 'calc(100% - 35px)',
    width: 70,
  },
  iconBody: {
    padding: `${theme.spacing(3)} ${theme.spacing(2)} 0`,
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
    height: '100%',
  },
  ribbon: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFF',
    fontSize: '0.75rem',
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
      <Card
        {...getLinkAttributes(to)}
        elevation={1}
        className={root}
        to={to}
      >
        {children}
      </Card>
    </Grid>
  );
};

CardWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

const CardHeader = ({ title, name, description }) => (
  <Box my={1}>
    {name && (
      <Typography
        variant="overline"
        gutterBottom
        color="primary"
      >
        {name}
      </Typography>
    )}
    <Typography variant="h3" gutterBottom>
      {title}
    </Typography>
    <Typography gutterBottom>{description}</Typography>
  </Box>
);

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  name: PropTypes.string,
};

CardHeader.defaultProps = {
  name: null,
};

export const ResourceCard = ({
  imgSrc,
  title,
  buttonText,
  to,
  secondaryButtonText,
  secondaryTo,
  ...rest
}) => (
  <Grid item md={6} sm={8} xs={10}>
    <Card>
      <Grid container spacing={1} alignItems="center">
        <Grid item lg={4} md={5} sm={6} xs={12}>
          <Box p={2}>
            <LazyLoadImage src={imgSrc} alt={title} />
          </Box>
        </Grid>
        <Grid item lg={8} md={7} sm={6} xs={12}>
          <CardContent>
            <CardHeader title={title} {...rest} />
            <Button
              tabIndex="-1"
              size="small"
              color="primary"
              variant="contained"
              component={Link}
              to={to}
            >
              {buttonText}
            </Button>
            {secondaryButtonText && (
              <Button
                tabIndex="-1"
                size="small"
                to={secondaryTo}
                component={Link}
              >
                {secondaryButtonText}
              </Button>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  </Grid>
);

ResourceCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

ResourceCard.defaultProps = {
  to: '/',
};

export const ProjectCard = ({
  imgSrc,
  to,
  label,
  buttonText,
  fullWidth,
  square,
  ...rest
}) => {
  const cls = useStyles({
    square,
  });
  const sizing = {
    md: 4,
    sm: 6,
    xs: 12,
  };

  if (fullWidth) {
    delete sizing.sm;
    delete sizing.md;
  }

  return (
    <CardWrapper {...sizing} to={to}>
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
        <CardHeader {...rest} />
        <Typography
          variant="subtitle2"
          style={{ textDecoration: 'underline' }}
        >
          {buttonText}
        </Typography>
      </CardContent>
    </CardWrapper>
  );
};

ProjectCard.propTypes = {
  ...ResourceCard.propTypes,
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export const NewsCard = ({
  imgSrc,
  title,
  to,
  label,
  md,
  date,
  ...rest
}) => {
  const { iconCls, ribbon } = useStyles();
  return (
    <CardWrapper md={md} sm={6} xs={12} to={to}>
      {imgSrc && (
        <div className={iconCls}>
          <LazyLoadImage src={imgSrc} alt={title} />
        </div>
      )}
      <CardContent>
        {label && <span className={ribbon}>{label}</span>}
        <Box px={1}>
          <CardHeader title={title} {...rest} />
          {date && (
            <Typography align="right" variant="subtitle2">
              {moment(date).format('ddd, MMMM, YYYY')}
            </Typography>
          )}
        </Box>
      </CardContent>
    </CardWrapper>
  );
};

NewsCard.propTypes = {
  ...ResourceCard.propTypes,
  label: PropTypes.string.isRequired,
  md: PropTypes.number,
  date: PropTypes.date,
};

NewsCard.defaultProps = {
  md: 4,
  date: null,
};
