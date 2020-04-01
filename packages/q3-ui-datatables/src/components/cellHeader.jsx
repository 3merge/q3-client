import React from 'react';
import PropTypes from 'prop-types';
import { Link, Location } from '@reach/router';
import TableCell from '@material-ui/core/TableCell';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from 'q3-ui/lib/avatar';
import { ellpisis } from '../utils/helpers';
import useStyles from '../utils/useStyles';

const CellHeader = ({ name, sub, imgSrc, to, onClick }) => {
  const { withoutPseudo } = useStyles();
  const asLink = to ? { component: Link, to } : {};

  return (
    <Location>
      {({ location: { pathname } }) => (
        <TableCell className={withoutPseudo}>
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
              item
              style={{ flex: 1 }}
              {...asLink}
              onClick={() => {
                if (onClick) onClick(pathname);
              }}
            >
              <Typography variant="body1">
                <strong>{ellpisis(name, 45)}</strong>
                {sub && (
                  <Box component="small" display="block">
                    {ellpisis(sub, 75)}
                  </Box>
                )}
              </Typography>
            </Grid>
          </Grid>
        </TableCell>
      )}
    </Location>
  );
};

CellHeader.propTypes = {
  name: PropTypes.string.isRequired,
  to: PropTypes.string,
  sub: PropTypes.string,
  imgSrc: PropTypes.string,
  onClick: PropTypes.func,
};

CellHeader.defaultProps = {
  sub: null,
  imgSrc: null,
  onClick: null,
  to: '/',
};

export default CellHeader;
