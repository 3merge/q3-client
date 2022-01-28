import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { getMeta } from 'q3-ui/lib/timeline';
import { useTranslation } from 'q3-ui-locale';
import { Link } from '@reach/router';
import {
  List,
  ListItem,
  ListItemText,
  ListSubheader,
} from '@material-ui/core';
import { useDetailRegisterFunction } from '../../hooks';
import { Store } from '../state';

const getAuthorship = getMeta('createdBy', 'createdAt');
const getLastModification = getMeta(
  'lastModifiedBy',
  'updatedAt',
);

const DetailOptions = ({ registerOptions }) => {
  const { data } = React.useContext(Store);
  const { t } = useTranslation('labels');

  const options =
    useDetailRegisterFunction(registerOptions);

  const createdBy = getAuthorship(data);
  const updatedBy = getLastModification(data);

  if (createdBy)
    options.push({
      title: t('creator'),
      description: createdBy,
    });

  if (updatedBy)
    options.push({
      title: t('lastUpdated'),
      description: updatedBy,
    });

  return (
    <List
      component="aside"
      subheader={
        <ListSubheader
          disableGutters
          disableSticky
          component="span"
        >
          {t('summary')}
        </ListSubheader>
      }
    >
      {map(options, (option) => (
        <ListItem
          button={!!option.href}
          component={option.href ? Link : undefined}
          dense
          key={option.title}
          to={option.href}
        >
          <ListItemText
            primary={option.title}
            secondary={option.description}
          />
        </ListItem>
      ))}
    </List>
  );
};

DetailOptions.defaultProps = {
  registerOptions: null,
};

DetailOptions.propTypes = {
  registerOptions: PropTypes.func,
};

export default DetailOptions;
