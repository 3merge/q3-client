import React from 'react';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { array } from 'q3-ui-helpers';
import useStyle from './useStyle';

const Gallery = ({ photos, size }) => {
  const cls = useStyle({ size });
  if (!array.hasLength(photos)) return null;

  const sizes =
    size === 'small'
      ? { style: { width: 155 } }
      : { style: { width: 225 } };

  return (
    <Grid container justify="center">
      {photos.map(({ id, fluid, name, bio }) => (
        <Grid item key={id} {...sizes}>
          <Box height="100%">
            <Image
              alt={name}
              className={cls.headshot}
              fluid={fluid}
            />
            <Box mb={2} px={0.5}>
              <Typography variant="h6" gutterBottom>
                {name}
              </Typography>
              <Typography>
                {size === 'small' ? (
                  <small
                    style={{
                      display: 'block',
                      lineHeight: 1.45,
                    }}
                  >
                    {bio}
                  </small>
                ) : (
                  bio
                )}
              </Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fluid: PropTypes.object,
      label: PropTypes.string,
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
  ),
  size: PropTypes.oneOf(['medium', 'small']),
};

Gallery.defaultProps = {
  photos: [],
  size: 'medium',
};

export default Gallery;
