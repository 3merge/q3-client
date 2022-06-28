import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import {
  Grid,
  ListItem,
  ListItemText,
} from '@material-ui/core';
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
      <Grid item>
        <ListItem component="div" dense>
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
    <Grid
      className={cls.meta}
      container
      justifyContent="flex-start"
    >
      {renderListItem('createdAt', 'createdBy')}
      {renderListItem('updatedAt', 'lastModifiedBy')}
    </Grid>
  );
};

DetailMeta.defaultProps = {};

DetailMeta.propTypes = {};

export default DetailMeta;
