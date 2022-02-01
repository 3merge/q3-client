import React from 'react';
import PropTypes from 'prop-types';
import { getMeta } from 'q3-ui/lib/timeline';
import { useTranslation } from 'q3-ui-locale';
import {
  Grid,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { Store } from '../state';

const getAuthorship = getMeta('createdBy', 'createdAt');
const getLastModification = getMeta(
  'lastModifiedBy',
  'updatedAt',
);

const DetailOptions = () => {
  const { data } = React.useContext(Store);
  const { t } = useTranslation('labels');

  const createdBy = getAuthorship(data);
  const updatedBy = getLastModification(data);

  return (
    <Grid container justifyContent="flex-end">
      {createdBy && (
        <Grid item md={6} xs={12}>
          <ListItem component="div" dense>
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText
              primary={createdBy}
              secondary={t('creator')}
            />
          </ListItem>
        </Grid>
      )}
      {updatedBy && (
        <Grid item md={6} xs={12}>
          <ListItem component="div" dense>
            <ListItemIcon>
              <EventNoteIcon />
            </ListItemIcon>
            <ListItemText
              primary={updatedBy}
              secondary={t('lastUpdated')}
            />
          </ListItem>
        </Grid>
      )}
    </Grid>
  );
};

DetailOptions.defaultProps = {
  registerOptions: null,
};

DetailOptions.propTypes = {
  registerOptions: PropTypes.func,
};

export default DetailOptions;
