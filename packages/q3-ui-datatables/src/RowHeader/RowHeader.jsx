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
  disableMultiselect,
  disableAvatar,
}) => {
  const { cellHeaderLink } = useStyles();
  const asLink = url ? { component: Link, to: url } : {};

  return (
    <CellWithCheckbox
      id={name}
      component="td"
      renderCheckbox={
        !disableMultiselect ? <SelectOne id={id} /> : null
      }
      renderContent={
        <>
          {!disableAvatar && (
            <Grid item>
              <Avatar word={name} imgSrc={imgSrc} />
            </Grid>
          )}
          <Grid item {...asLink} className={cellHeaderLink}>
            <Popover
              popoverChildren={
                <>
                  <strong>{name}</strong> <br />
                  {description}
                </>
              }
              disablePopover={
                String(name).length < 45 &&
                String(description).length < 75
              }
            >
              <Box
                style={{
                  maxWidth: 450,
                  whiteSpace: 'break-spaces',
                }}
              >
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
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  description: PropTypes.string,
  to: PropTypes.string,
  sub: PropTypes.string,
  imgSrc: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  onClick: PropTypes.func,
  disableMultiselect: PropTypes.bool,
  disableAvatar: PropTypes.bool,
};

CellHeader.defaultProps = {
  description: '',
  sub: null,
  imgSrc: null,
  onClick: null,
  to: '/',
  disableMultiselect: false,
  disableAvatar: false,
};

export default CellHeader;
