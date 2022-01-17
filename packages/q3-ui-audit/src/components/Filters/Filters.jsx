import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import {
  castToBeginning,
  castToEnd,
} from 'q3-ui-forms/lib/helpers';
import { isString } from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import withUsers from '../withUsers';

export const toTargets = (xs) =>
  isString(xs) ? String(xs).split(',') : xs;

const Filters = ({ onSubmit, fields, users, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Builders.Form
      {...rest}
      keep={['date>', 'date<', 'targets', 'user']}
      modify={{
        targets: [toTargets],
      }}
      submitLabel="getLogs"
      onSubmit={onSubmit}
      marshal={{
        'date>': [castToBeginning],
        'date<': [castToEnd],
        targets: 'targets',
        user: 'user.value',
      }}
    >
      <Builders.Field
        xl={12}
        lg={12}
        name="targets"
        type="chips"
        label={t('labels:auditTargets')}
        helperText={t('helpers:auditTargets')}
        options={fields}
        required
      />
      <Builders.Field
        xl={12}
        lg={12}
        type="dateRange"
        name="date"
      />
      <Builders.Field
        xl={12}
        lg={12}
        type="autocomplete"
        name="user"
        options={users}
        label={t('labels:auditUser')}
        helperText={t('helpers:auditUser')}
      />
    </Builders.Form>
  );
};

Filters.defaultProps = {
  fields: [],
  users: [],
};

Filters.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

export default withUsers(Filters);
