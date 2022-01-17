import React from 'react';
import PropTypes from 'prop-types';
import { Builders } from 'q3-ui-forms';
import { isString } from 'lodash';

export const fromTargets = (xs) =>
  !isString(xs) ? '' : xs;

const AuditTemplateSelect = ({
  templates,
  onSubmit,
  ...rest
}) => (
  <Builders.Form
    {...rest}
    keep={['targets']}
    translate={{
      auditTemplate: 'targets',
    }}
    modify={{
      auditTemplate: [fromTargets],
    }}
    submitLabel="getLogs"
    onSubmit={onSubmit}
    marshal={{
      targets: 'auditTemplate',
    }}
  >
    <Builders.Field
      xl={12}
      lg={12}
      required
      type="select"
      name="auditTemplate"
      options={Object.entries(templates).map(
        ([label, value]) => ({
          label,
          value,
        }),
      )}
    />
  </Builders.Form>
);

AuditTemplateSelect.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  // eslint-disable-next-line
  templates: PropTypes.object.isRequired,
};

export default AuditTemplateSelect;
