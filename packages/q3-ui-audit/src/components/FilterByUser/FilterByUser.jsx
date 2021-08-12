import React from 'react';
import { Builders } from 'q3-ui-forms';
import { getSafelyForAutoCompleteWithProjection } from 'q3-ui-rest';
import { compact, map } from 'lodash';
import { useAuth } from 'q3-ui-permissions';
import { useTranslation } from 'react-i18next';

const Q3_USER_COLLECTION_NAME = 'q3-api-users';

export const mapToName = (users) =>
  map(users, (user) => ({
    ...user,
    label:
      compact([user?.firstName, user?.lastName]).join(
        ' ',
      ) || user.email,
    value: user.id,
  }));

const getUsersFromQ3ApiEndpoint = (e) =>
  getSafelyForAutoCompleteWithProjection(
    `/${Q3_USER_COLLECTION_NAME}?sort=firstName&limit=8`,
    'users',
    'email',
  )(e).then(mapToName);

const FilterByUser = () => {
  const { canSee } = useAuth(Q3_USER_COLLECTION_NAME);
  const { t } = useTranslation();

  return (
    <Builders.Field
      name="user"
      type="autocomplete"
      label={t('labels:filterByUser')}
      helperText={t('helpers:filterByUser')}
      loadOptions={getUsersFromQ3ApiEndpoint}
      disabled={!canSee}
      xl={12}
      lg={12}
      md={12}
    />
  );
};

export default FilterByUser;
