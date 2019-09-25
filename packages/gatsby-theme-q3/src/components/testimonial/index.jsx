import React from 'react';
import { Link } from 'gatsby';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Testimonial = ({ quote, name, position, logo, slug }) => (
  <Card>
    <CardActionArea component={Link} to={slug}>
      <CardContent>
        <CardMedia>
          <img
            src={logo}
            alt={name}
            style={{
              width: 105,
              display: 'block',
              margin: '1rem 1rem 1rem auto',
            }}
          />
        </CardMedia>
        <blockquote>{quote}</blockquote>
        <cite>
          <strong>{name}</strong>
          <small>{position}</small>
        </cite>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default Testimonial;
