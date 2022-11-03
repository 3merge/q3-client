import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { useTitle } from '../../hooks';
import { Store } from '../state';
import Back from '../back';

const DetailHeader = ({ children, ...props }) => {
  const { data } = React.useContext(Store);

  const Title = (
    <div>
      <Typography
        contentEditable
        component="h1"
        variant="h3"
      >
        {useTitle(data, props)}
      </Typography>
    </div>
  );

  return children ? (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Box>
          <Hidden mdDown>
            <Back />
          </Hidden>
        </Box>
        <Box display="flex">{children}</Box>
      </Box>
      {Title}
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
