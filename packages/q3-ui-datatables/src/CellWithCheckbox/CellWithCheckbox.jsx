import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import useStyles from '../utils/useStyles';

const CellWithCheckbox = ({
  renderCheckbox,
  renderContent,
  ...rest
}) => {
  const { cellHeader, cellHeaderWrapper } = useStyles();

  return (
    <TableCell
      style={{ border: 0 }}
      className={classnames(cellHeader, 'liftup')}
      {...rest}
    >
      <Grid
        container
        alignItems="center"
        className={cellHeaderWrapper}
        spacing={1}
      >
        <Grid item>{renderCheckbox}</Grid>
        {renderContent}
      </Grid>
    </TableCell>
  );
};

CellWithCheckbox.propTypes = {
  renderCheckbox: PropTypes.node.isRequired,
  renderContent: PropTypes.node.isRequired,
};

CellWithCheckbox.defaultProps = {};

export default CellWithCheckbox;
