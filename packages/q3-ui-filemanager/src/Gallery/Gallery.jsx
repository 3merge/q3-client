import React from 'react';
import PropTypes from 'prop-types';
import { map, size } from 'lodash';
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import GalleryItem from '../GalleryItem';
import GalleryItemFolder from '../GalleryItemFolder';
import withAlertNoFiles from '../withAlertNoFiles';

const Gallery = ({ files, siblings }) => {
  const { t } = useTranslation('titles');

  const renderGrid = (xs, title, Component) =>
    size(xs) > 0 && (
      <Box mb={2}>
        <Typography component="h3" variant="overline">
          {t(title)}
        </Typography>
        <Grid container spacing={1}>
          {map(xs, (item) => (
            <Grid
              key={item.name}
              item
              style={{
                maxWidth: 275,
                width: '50%',
              }}
            >
              <Component {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );

  return (
    <Container>
      {renderGrid(siblings, 'folders', GalleryItemFolder)}
      {renderGrid(files, 'files', GalleryItem)}
    </Container>
  );
};

Gallery.defaultProps = {
  files: [],
  siblings: [],
};

Gallery.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
  siblings: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default withAlertNoFiles(Gallery);
