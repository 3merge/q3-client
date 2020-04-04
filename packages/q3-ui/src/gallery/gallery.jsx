import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Section from '../section';
import useStyle from './useStyle';

const Gallery = ({ photos, title, ...etc }) => {
  const cls = useStyle();
  const { t } = useTranslation('titles');

  return (
    <Section fullWidth title={t(title)} {...etc}>
      <Grid container justify="center">
        {photos.map(({ id, fluid, name, bio }) => (
          <Grid item key={id} lg={2} md={3} sm={4} xs={6}>
            <Box height="100%">
              <Image
                alt={name}
                className={cls.headshot}
                fluid={fluid}
              />
              <Box mb={2}>
                <Typography
                  variant="h3"
                  className={cls.title}
                >
                  {name}
                </Typography>
                <Typography component="small">
                  {bio}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
};

Gallery.propTypes = {
  title: PropTypes.string,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      fluid: PropTypes.object,
      label: PropTypes.string,
      name: PropTypes.string,
      bio: PropTypes.string,
    }),
  ),
};

Gallery.defaultProps = {
  title: 'meetTheTeam',
  photos: [],
};

export default Gallery;
