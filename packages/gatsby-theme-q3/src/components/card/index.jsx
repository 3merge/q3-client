import React from 'react';
import { Link } from 'gatsby';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  onHover: {
    display: 'block',
    textDecoration: 'none',

    '& .border': {
      background: 'rgba(2,2,2,0.9)',
      left: 0,
      height: '100%',
      opacity: 0.75,
      position: 'absolute',
      top: 0,
      transition: 'opacity 500ms',
      width: '100%',
    },
    '&:hover .border': {
      opacity: '0.87',
    },
  },
  media: {
    height: 230,
  },
  relative: {
    display: 'block',
    position: 'relative',
  },
  centered: {
    color: '#FFF',
    position: 'absolute',
    left: '2rem',
    bottom: '2rem',
    width: '65%',
    '& *': {
      display: 'block',
    },
    '& cite': {
      marginLeft: '2rem',
    },
  },
}));

const CustomCard = ({ imgSrc, title, caption, slug, horizontal }) => {
  const { media, onHover, relative, centered } = useStyles();

  return (
    <Card className={onHover}>
      <Box p={2} component="article">
        <Link to={slug} className={relative}>
          <CardMedia image={imgSrc} title={title} className={media} />
          <div className="border" />
          <div className={centered}>
            <Typography component="blockquote" variant="h4" color="inherit">
              Something interesting to say about this!
            </Typography>
            <Typography component="cite" variant="body1" color="inherit">
              - name
            </Typography>
          </div>
        </Link>
        <CardContent>
          <Typography variant="overline" gutterBottom>
            Case study
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" component="p">
            {caption}
          </Typography>
          <Button component={Link} to={slug}>
            Read more
          </Button>
        </CardContent>
      </Box>
    </Card>
  );
};

export default CustomCard;
