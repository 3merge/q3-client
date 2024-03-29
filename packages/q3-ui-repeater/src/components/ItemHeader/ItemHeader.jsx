import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import { SelectOne, State } from 'q3-ui-exports';
import useStyle from '../useStyle';

const ItemHeader = ({
  showMultiselect,
  item,
  description,
  icon,
  photo,
  title,
}) => {
  const { id } = item;
  const multiselect = React.useContext(State);
  const selected = multiselect.isChecked(id);

  const { titleCls, tableCellHeader } = useStyle({
    selected,
  });

  return (
    <TableCell className={tableCellHeader}>
      <Grid alignItems="center" container spacing={1}>
        {showMultiselect && (
          <Hidden implementation="css" smDown>
            <Grid item>
              <SelectOne id={id} />
            </Grid>
          </Hidden>
        )}
        {icon && <Grid item>{icon(item)}</Grid>}
        {photo && (
          <Grid item>
            <Avatar src={photo} alt={title} />
          </Grid>
        )}
        <Grid item xs zeroMinWidth>
          <Box component="h4" className={titleCls}>
            {title}
          </Box>
          {description && (
            <Typography
              style={{
                fontSize: '0.833rem',
              }}
            >
              {description}
            </Typography>
          )}
        </Grid>
      </Grid>
    </TableCell>
  );
};

ItemHeader.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }).isRequired,
  showMultiselect: PropTypes.bool,
  icon: PropTypes.func,
  photo: PropTypes.string,
};

ItemHeader.defaultProps = {
  description: null,
  showMultiselect: true,
  icon: null,
  photo: null,
};

export default ItemHeader;
