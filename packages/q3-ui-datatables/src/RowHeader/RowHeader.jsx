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
  imgSrc,
  url,
  disableMultiselect,
  disableAvatar,
  icon,
  iconBg,
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
              <Avatar
                icon={icon}
                iconBg={iconBg}
                word={name}
                imgSrc={imgSrc}
              />
            </Grid>
          )}
          <Grid item {...asLink} className={cellHeaderLink}>
            {name}
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
