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
    display: 'block',
    marginLeft: -theme.spacing(4),
    width: `calc(100% + ${theme.spacing(4)}px)`,
    borderRadius: 10,
    overflow: 'hidden',
    paddingTop: '125%',
    position: 'relative',
    height: 0,
    '& img': {
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
    left: theme.spacing(4),
    height: 60,
    position: 'absolute',
    top: 'calc(100% - 30px)',
    width: 60,
  },
  iconBody: {
    padding: `${theme.spacing(6)}px ${theme.spacing(4)}px`,
  },
  iconText: {
    color: blueGrey[200],
    lineHeight: 0,
  },
  spacing: {
    marginLeft: theme.spacing(1),
  },
}));

export const ResourceCard = ({
  imgSrc,
  name,
  title,
  to,
  description,
}) => {
  const cls = useStyles();
  return (
    <Grid
      item
      md={4}
      sm={6}
      xs={12}
      style={{ marginTop: '2rem' }}
    >
      <Card style={{ overflow: 'visible' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item lg={4} md={5} sm={6} xs={12}>
            <Link to={to} className={cls.negativeMargin}>
              <img src={imgSrc} />
            </Link>
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
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
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
    <Card
      component={Link}
      to={to}
      style={{ display: 'block', textDecoration: 'none' }}
    >
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
        <TrendingFlat />
      </CardContent>
    </Card>
  );
};

export const NewsCard = ({
  imgSrc,
  title,
  description,
  to,
}) => {
  const { iconCls, spacing } = useStyles();
  return (
    <Card elevation={0} component="article">
      <Link to={to} className={iconCls}>
        <img src={imgSrc} alt={title} />
      </Link>
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
            <Button to={to} component={Link}>
              Go
              <TrendingFlat className={spacing} />
            </Button>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

NewsCard.propTypes = {
  Icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
