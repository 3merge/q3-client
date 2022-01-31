import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { getMeta } from 'q3-ui/lib/timeline';
import { useTranslation } from 'q3-ui-locale';
import { Link as ReachLink } from '@reach/router';
import { Link } from '@material-ui/core';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { useDetailRegisterFunction } from '../../hooks';
import { Store } from '../state';
import useStyle from './styles';

const getAuthorship = getMeta('createdBy', 'createdAt');
const getLastModification = getMeta(
  'lastModifiedBy',
  'updatedAt',
);

const DetailOptions = ({ registerOptions }) => {
  const cls = useStyle();
  const { data } = React.useContext(Store);
  const { t } = useTranslation('labels');

  const options =
    useDetailRegisterFunction(registerOptions);

  const createdBy = getAuthorship(data);
  const updatedBy = getLastModification(data);

  const renderIcon = (Icon = ContactSupportIcon) => (
    <Icon />
  );

  if (createdBy)
    options.push({
      title: t('creator'),
      description: createdBy,
      icon: EventAvailableIcon,
    });

  if (updatedBy)
    options.push({
      title: t('lastUpdated'),
      description: updatedBy,
      icon: EventNoteIcon,
    });

  return (
    <ul className={cls.list}>
      {map(options, (option) => (
        <li className={cls.listItem} key={option.title}>
          {renderIcon(option.icon)} {option.title}{' '}
          {option.href ? (
            <Link
              color="inherit"
              component={ReachLink}
              to={option.href}
            >
              {option.description}
            </Link>
          ) : (
            option.description
          )}
        </li>
      ))}
    </ul>
  );
};

DetailOptions.defaultProps = {
  registerOptions: null,
};

DetailOptions.propTypes = {
  registerOptions: PropTypes.func,
};

export default DetailOptions;
