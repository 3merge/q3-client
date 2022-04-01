import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import {
  Grid,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { string } from 'q3-ui-helpers';
import { get } from 'lodash';
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

  const renderListItem = (timekey, authorkey, Icon) => {
    const time = get(data, timekey);
    const author = formatUser(get(data, authorkey));

    return time ? (
      <Grid item md={6} xs={12}>
        <ListItem component="div" dense>
          <ListItemIcon>
            <Icon />
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
      </Grid>
    ) : null;
  };

  return (
    <Grid container justifyContent="flex-end">
      {renderListItem(
        'createdAt',
        'createdBy',
        EventAvailableIcon,
      )}
      {renderListItem(
        'updatedAt',
        'lastModifiedBy',
        EventNoteIcon,
      )}
    </Grid>
  );
};

DetailMeta.defaultProps = {};

DetailMeta.propTypes = {};

export default DetailMeta;
