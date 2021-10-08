import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import { getSafelyForAutoCompleteWithProjection } from 'q3-ui-rest';
import { map } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import { useTranslation } from 'react-i18next';

const Q3_USER_COLLECTION_NAME = 'q3-api-users';

export const mapToName = (users) =>
  map(users, (user) => ({
    ...user,
    label: user.name || user.email,
    value: user.id,
  }));

const FilterByUser = ({ collectionName, id }) => {
  const { canSee } = useAuth(Q3_USER_COLLECTION_NAME);
  const { t } = useTranslation();

  const getUsersFromQ3ApiEndpoint = (e) => {
    return getSafelyForAutoCompleteWithProjection(
      `/audit-users?collectionName=${collectionName}&id=${id}`,
      'users',
      'name',
    )(e).then(mapToName);
  };

  return (
    <Builders.Field
      name="user"
      type="autocomplete"
      label={t('labels:filterByUser')}
      helperText={t('helpers:filterByUser')}
      loadOptions={getUsersFromQ3ApiEndpoint}
      disabled={!canSee}
      preload
      xl={12}
      lg={12}
      md={12}
    />
  );
};

FilterByUser.propTypes = {
  collectionName: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default FilterByUser;
