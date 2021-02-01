import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
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
              popoverChildren={<span>{name}</span>}
              disablePopover={String(name).length < 45}
            >
              <strong>{ellipsis(name, 45)}</strong>
            </Popover>
            <Popover
              popoverChildren={<span>{description}</span>}
              disablePopover={
                String(description).length < 75
              }
            >
              <Box component="small" display="block">
                {ellipsis(description, 75)}
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
