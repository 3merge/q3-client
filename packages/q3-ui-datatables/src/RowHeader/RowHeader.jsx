import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Avatar from 'q3-ui/lib/avatar';
import { SelectOne } from 'q3-ui-exports';
import Popover from 'q3-ui/lib/popover';
import { ellipsis } from '../utils/helpers';
import useStyles from '../utils/useStyles';
import CellWithCheckbox from '../CellWithCheckbox';

const CellHeader = ({
  id,
  name,
  description,
  imgSrc,
  url,
}) => {
  const { cellHeaderLink } = useStyles();
  const asLink = url ? { component: Link, to: url } : {};

  return (
    <CellWithCheckbox
      id={name}
      component="td"
      style={{ borderTop: '2px solid #F5F7F9' }}
      renderCheckbox={<SelectOne id={id} />}
      renderContent={
        <>
          <Grid item>
            <Avatar word={name} imgSrc={imgSrc} />
          </Grid>
          <Grid item {...asLink} className={cellHeaderLink}>
            <Popover
              popoverChildren={
                <Box p={0.3} style={{ maxWidth: '350px' }}>
                  <Typography
                    variant="body2"
                    style={{ fontSize: '.9rem' }}
                  >
                    {name}
                  </Typography>
                  <Divider />
                  <Typography
                    variant="body1"
                    style={{ fontSize: '.8rem' }}
                  >
                    {description}
                  </Typography>
                </Box>
              }
              disablePopover={
                String(name).length < 45 &&
                String(description).length < 75
              }
            >
              <Box>
                <strong>{ellipsis(name, 45)}</strong>
                <Box>{ellipsis(description, 75)}</Box>
              </Box>
            </Popover>
          </Grid>
        </>
      }
    />
  );
};

CellHeader.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  to: PropTypes.string,
  sub: PropTypes.string,
  imgSrc: PropTypes.string,
  onClick: PropTypes.func,
};

CellHeader.defaultProps = {
  description: '',
  sub: null,
  imgSrc: null,
  onClick: null,
  to: '/',
};

export default CellHeader;
