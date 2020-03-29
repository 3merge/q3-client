import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import { SelectOne } from 'q3-ui-exports';
import useStyle from './useStyle';
import EditableTypography from './EditableTypography';
import RepeaterState from './state';

const ItemHeaderTitle = ({ item, title, ...rest }) =>
  typeof title === 'function' ? (
    <Typography {...rest}>{title(item)}</Typography>
  ) : (
    <EditableTypography {...rest} name={title} data={item}>
      {get(item, title)}
    </EditableTypography>
  );

ItemHeaderTitle.propTypes = {
  item: PropTypes.shape({}).isRequired,
  title: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
};

const ItemHeader = ({
  renderMobileColumns,
  showMultiselect,
  item,
  color,
  description,
  icon,
  photo,
  isIn,
  save,
  title,
}) => {
  const { id } = item;
  const { multiselect } = React.useContext(RepeaterState);
  const selected = multiselect.isChecked(id);

  const { titleCls } = useStyle({
    selected,
    color,
  });

  return (
    <TableCell>
      <Box p={1} maxWidth="300px">
        <Grid alignItems="center" container spacing={1}>
          {showMultiselect && (
            <Grid item>
              <Hidden mdDown>
                <SelectOne id={id} />
              </Hidden>
            </Grid>
          )}
          {icon && <Grid item>{icon(item)}</Grid>}
          {photo && (
            <Grid item>
              <Avatar src={photo} alt={title} />
            </Grid>
          )}
          <Grid item xs zeroMinWidth>
            <ItemHeaderTitle
              component="h3"
              color="primary"
              title={title}
              editable={isIn(title)}
              save={save}
              className={titleCls}
              item={item}
            />
            {description && (
              <Typography>{description}</Typography>
            )}
            <Hidden mdUp>
              {renderMobileColumns &&
                renderMobileColumns(item)}
            </Hidden>
          </Grid>
        </Grid>
      </Box>
    </TableCell>
  );
};

ItemHeader.propTypes = {
  // eslint-disable-next-line
  title: ItemHeaderTitle.propTypes.title,
  description: PropTypes.string,
  item: PropTypes.shape({ id: PropTypes.string.isRequired })
    .isRequired,
  color: PropTypes.string,
  showMultiselect: PropTypes.bool,
  save: PropTypes.func.isRequired,
  isIn: PropTypes.func.isRequired,
  renderMobileColumns: PropTypes.func,
  icon: PropTypes.func,
  photo: PropTypes.string,
};

ItemHeader.defaultProps = {
  description: null,
  renderMobileColumns: null,
  showMultiselect: true,
  color: null,
  icon: null,
  photo: null,
};

export default ItemHeader;
