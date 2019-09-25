import React from 'react';
import { Link } from 'gatsby';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  raised: {
    boxShadow: 'rgba(0, 0, 0, 0.07) 0px 5px 14px 2px !important',
    display: 'block',
    textDecoration: 'none',
  },
  border: {
    background: `linear-gradient( 60deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100% )`,
    height: 4,
    width: '100%',
  },
}));

const Resource = () => {
  const { border, raised } = useStyles();

  return (
    <Card square className={raised} component={Link} to="">
      <div className={border} />
      <CardContent>
        <Grid container justify="space=between">
          <Grid item xs={9}>
            <Typography component="h5" variant="h5">
              Live From Space
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Chip clickable={false} label="Feature" />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" color="textSecondary">
          Mac Miller
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Resource;
