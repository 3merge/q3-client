import React from 'react';
import { Link } from 'gatsby';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  onHover: {
    display: 'block',
    textDecoration: 'none',
    '& .border': {
      background: `linear-gradient( 60deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100% )`,
      left: 0,
      height: '100%',
      opacity: 0,
      position: 'absolute',
      top: 0,
      transition: 'opacity 500ms',
      width: '100%',
    },
    '&:hover .border': {
      opacity: '0.6',
    },
  },
  media: {
    height: 180,
  },
  relative: {
    position: 'relative',
  },
}));

export default function SimpleCard({ img, title, caption, slug, withBorders }) {
  const { media, onHover, relative } = useStyles();

  return (
    <Card to={slug} component={Link} className={onHover} square>
      <Box p={2} component="article">
        <div className={relative}>
          <CardMedia image={img} title={title} className={media} />
          <div className="border" />
        </div>

        <CardContent>
          <Typography variant="h5" component="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            {caption}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
