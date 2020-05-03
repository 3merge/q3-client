import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import { SelectOne } from 'q3-ui-exports';
import useStyle from './useStyle';
import RepeaterState from './state';
import withEditableTypography from '../withEditableTypography';

const ItemHeader = ({
  showMultiselect,
  item,
  color,
  description,
  icon,
  photo,
  isIn,
  title,
}) => {
  const { id } = item;
  const { multiselect } = React.useContext(RepeaterState);
  const selected = multiselect.isChecked(id);

  const Title = withEditableTypography({
    data: item,
  });

  const { titleCls, tableCell } = useStyle({
    selected,
    color,
  });

  return (
    <TableCell className={tableCell}>
      <Box p={0.5} maxWidth="350px">
        <Grid alignItems="center" container spacing={1}>
          {showMultiselect && (
            <Hidden mdDown>
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
            <Title
              component="h3"
              color="primary"
              name={title}
              editable={isIn(title)}
              className={titleCls}
            />
            {description && (
              <Typography>{description}</Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </TableCell>
  );
};

ItemHeader.propTypes = {
  title: PropTypes.oneOf([PropTypes.string, PropTypes.func])
    .isRequired,
  description: PropTypes.string,
  item: PropTypes.shape({ id: PropTypes.string.isRequired })
    .isRequired,
  color: PropTypes.string,
  showMultiselect: PropTypes.bool,
  isIn: PropTypes.func.isRequired,
  icon: PropTypes.func,
  photo: PropTypes.string,
};

ItemHeader.defaultProps = {
  description: null,
  showMultiselect: true,
  color: null,
  icon: null,
  photo: null,
};

export default ItemHeader;
