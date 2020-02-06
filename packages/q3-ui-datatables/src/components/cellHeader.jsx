import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from 'q3-ui/lib/avatar';
import { ellpisis } from '../utils/helpers';

const CellHeader = ({ name, sub, imgSrc, to }) => (
  <TableCell>
    <Grid
      container
      alignItems="center"
      spacing={1}
      style={{ width: 'auto' }}
    >
      <Grid item>
        <Avatar word={name} imgSrc={imgSrc} />
      </Grid>
      <Grid
        component={Link}
        to={to}
        item
        style={{ flex: 1 }}
      >
        <Typography variant="body1">
          <strong>{ellpisis(name, 25)}</strong>
          {sub && (
            <Box component="small" display="block">
              {ellpisis(sub, 75)}
            </Box>
          )}
        </Typography>
      </Grid>
    </Grid>
  </TableCell>
);

CellHeader.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string,
  sub: PropTypes.string,
  imgSrc: PropTypes.string,
};

CellHeader.defaultProps = {
  sub: null,
  imgSrc: null,
  to: '/',
};

export default CellHeader;
