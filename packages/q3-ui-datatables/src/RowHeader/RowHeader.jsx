import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import TableCell from '@material-ui/core/TableCell';
import classnames from 'classnames';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Avatar from 'q3-ui/lib/avatar';
import { SelectOne } from 'q3-ui-exports';
import { ellpisis } from '../utils/helpers';
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
  const asLink = url
    ? {
        component: Link,
        to: url,
      }
    : {};

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
            <strong>{ellpisis(name, 45)}</strong>
            {description && (
              <Box component="small" display="block">
                {ellpisis(description, 75)}
              </Box>
            )}
          </Grid>
        </>
      }
    />
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
