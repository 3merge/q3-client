import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItemText,
  ListItem,
} from '@material-ui/core';
import { size, map } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import { useHelperFormats } from 'q3-ui-helpers/lib/hooks';
import { connect } from '../../containers';
import useStyle from './styles';

export const ListFormatted = ({ data, fields }) => {
  const { t } = useTranslation('labels');
  const format = useHelperFormats(data);
  const cls = useStyle();

  return size(fields) ? (
    <List className={cls.list} component="div">
      {map(fields, (item) => (
        <ListItem
          dense
          className={cls.listItem}
          component="div"
          key={item.field}
        >
          <ListItemText
            primary={t(item.label || item.field)}
            secondary={
              // some formatters return empty
              format(item.field, item.formatter) || '--'
            }
            primaryTypographyProps={{
              style: {
                fontSize: '0.812rem',
                fontWeight: 'bold',
              },
            }}
          />
        </ListItem>
      ))}
    </List>
  ) : null;
};

ListFormatted.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      label: PropTypes.string,
      formatter: PropTypes.string,
    }),
  ).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default connect(ListFormatted);
