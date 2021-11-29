import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import { PhotoUpload } from 'q3-ui-filemanager';
import TemplateFullWidth from '../../components/TemplateFullWidth';
import FeaturedPhoto from '../FeaturedPhoto';

const ProfileNavigation = ({
  children,
  withPhoto,
  ...rest
}) => {
  const { t } = useTranslation();
  const { state, update } = React.useContext(AuthContext);
  const src = get(state, 'profile.photo', null);

  return (
    <TemplateFullWidth
      {...rest}
      title={t('titles:profile')}
      subtitle={t('descriptions:profile')}
      asideComponent={
        withPhoto ? (
          <FeaturedPhoto
            src={src}
            update={update}
            component={PhotoUpload}
          />
        ) : undefined
      }
    >
      {children}
    </TemplateFullWidth>
  );
};

ProfileNavigation.propTypes = {
  children: PropTypes.node,
  withPhoto: PropTypes.bool,
};

ProfileNavigation.defaultProps = {
  children: null,
  withPhoto: true,
};

export default ProfileNavigation;
