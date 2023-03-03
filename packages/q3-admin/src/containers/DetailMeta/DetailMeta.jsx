import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { get } from 'lodash';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { Store } from '../state';
import useStyle from './styles';

export const formatUser = (u) =>
  ['firstName', 'lastName']
    .filter((name) => u && u[name])
    .map((name) => u[name])
    .join(' ') || null;

const DetailMeta = () => {
  const { data } = React.useContext(Store);
  const { t } = useTranslation('labels');
  const cls = useStyle();

  const renderListItem = (timekey, authorkey) => {
    const time = get(data, timekey);
    const author = formatUser(get(data, authorkey));

    return time ? (
      <ListItem
        button
        disableRipple
        component="li"
        dense
        tabIndex={-1}
        style={{
          cursor: 'initial',
        }}
      >
        <ListItemIcon>
          <DoubleArrowIcon />
        </ListItemIcon>
        <ListItemText
          primary={string.toDate(time)}
          secondary={
            author
              ? t(authorkey, {
                  name: author,
                })
              : t(timekey)
          }
          primaryTypographyProps={{
            className: cls.primary,
          }}
        />
      </ListItem>
    ) : null;
  };

  return (
    <List className={cls.meta}>
      {renderListItem('createdAt', 'createdBy')}
      {renderListItem('updatedAt', 'lastModifiedBy')}
    </List>
  );
};

DetailMeta.defaultProps = {};

DetailMeta.propTypes = {};

export default DetailMeta;
