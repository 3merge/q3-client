import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import { useTranslation } from 'q3-ui-locale';
import { capitalize, map, get, find } from 'lodash';
import {
  castToBeginning,
  castToEnd,
} from 'q3-ui-forms/lib/helpers';

const AuditTemplateSelect = ({
  templates,
  onSubmit,
  users,
  ...rest
}) => {
  const { t } = useTranslation('labels');

  return (
    <Builders.Form
      {...rest}
      disableChangeDetection
      keep={['date', 'date>', 'date<', 'template', 'user']}
      modify={{
        user: [
          (value) => ({
            label: get(
              find(users, (item) => item.value === value),
              'label',
            ),
            value,
          }),
        ],
      }}
      submitLabel="getLogs"
      onSubmit={onSubmit}
      marshal={{
        'date>': [castToBeginning],
        'date<': [castToEnd],
        template: 'template',
        user: 'user.value',
      }}
    >
      <Builders.Field
        xl={12}
        lg={12}
        required
        type="select"
        name="template"
        label={t('auditTemplate')}
        options={map(templates, (value) => ({
          label: capitalize(value),
          value,
        }))}
        suppressHelper
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
        label={t('auditUser')}
        type="autocomplete"
        name="user"
        options={users}
        suppressHelper
      />
    </Builders.Form>
  );
};

AuditTemplateSelect.defaultProps = {
  users: [],
};

AuditTemplateSelect.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line
  templates: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

export default AuditTemplateSelect;
