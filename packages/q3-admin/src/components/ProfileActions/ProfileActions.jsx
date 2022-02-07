import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { compact } from 'lodash';
import {
  Avatar,
  ListItem,
  List,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';
import { AuthContext } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import useStyle from './styles';
// import ThemeMode from '../ThemeMode';

const ProfileActions = ({ brand, faviconSrc }) => {
  const { state } = React.useContext(AuthContext);
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <List
      component="div"
      style={{ margin: '0', padding: 0 }}
    >
      <ListItem button dense component={Link} to="account">
        <ListItemAvatar>
          <Avatar
            src={state?.profile?.photo}
            variant="rounded"
          />
        </ListItemAvatar>
        <ListItemText
          primary={compact([
            state?.profile?.firstName,
            state?.profile?.lastName,
          ]).join(' ')}
          secondary={state?.profile?.role}
        />
      </ListItem>
      <ListItem button dense component={Link} to="system">
        <ListItemAvatar>
          <Avatar
            src={faviconSrc}
            variant="rounded"
            className={cls.avatar}
          >
            <SettingsApplicationsIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={brand}
          secondary={t('labels:systemSettings')}
        />
      </ListItem>
    </List>
  );
};

ProfileActions.defaultProps = {
  brand: 'Unassigned',
  faviconSrc: '',
};

ProfileActions.propTypes = {
  brand: PropTypes.string,
  faviconSrc: PropTypes.string,
};

export default ProfileActions;
