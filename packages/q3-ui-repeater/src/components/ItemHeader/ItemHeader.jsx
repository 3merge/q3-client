import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import { SelectOne } from 'q3-ui-exports';
import useStyle from '../useStyle';
import Context from '../state';
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
  const { multiselect } = React.useContext(Context);
  const selected = multiselect.isChecked(id);

  const Title = withEditableTypography({
    data: item,
  });

  const { titleCls, tableCellHeader } = useStyle({
    selected,
    color,
  });

  return (
    <TableCell className={tableCellHeader}>
      <Grid alignItems="center" container spacing={1}>
        {showMultiselect && (
          <Hidden smDown>
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
            component="h4"
            color="primary"
            name={title}
            editable={isIn(title)}
            className={titleCls}
          />
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
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  description: PropTypes.string,
  item: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }).isRequired,
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
