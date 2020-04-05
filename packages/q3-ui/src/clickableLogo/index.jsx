import React from 'react';
import { Link } from '@reach/router';
import Image from 'gatsby-image';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import useStyles from './useStyle';

export const Logo = ({ src, alt }) => {
  const cls = useStyles();
  return (
    <Box p={1}>
      <Image
        fluid={{
          src,
        }}
        alt={alt}
        className={cls.img}
        imgStyle={{
          objectFit: 'contain',
        }}
      />
    </Box>
  );
};

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const ClickableLogo = ({ name, logo, to }) => {
  const cls = useStyles();

  return (
    <Grid item>
      <Card className={cls.root} raised>
        <CardActionArea component={Link} to={to}>
          <Logo src={logo} alt={name} />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

ClickableLogo.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ClickableLogo;
