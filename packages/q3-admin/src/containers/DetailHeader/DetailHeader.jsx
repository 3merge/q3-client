import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTitle } from '../../hooks';
import { Store } from '../state';

const DetailHeader = ({ children, ...props }) => {
  const { data } = React.useContext(Store);

  const Title = (
    <Typography component="h1" variant="h5">
      {useTitle(data, props)}
    </Typography>
  );

  return children ? (
    <Box ml=".5rem">
      {Title}
      {children}
    </Box>
  ) : (
    Title
  );
};

DetailHeader.defaultProps = {
  children: null,
};

DetailHeader.propTypes = {
  children: PropTypes.element,
};

export default DetailHeader;
