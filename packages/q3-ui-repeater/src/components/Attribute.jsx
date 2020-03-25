import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';
import EditableTypography from './EditableTypography';

export const Attribute = ({ name, data, ...etc }) => {
  let content = get(data, name);
  const type = get(etc, 'editable.type');

  if (type === 'checkbox') content = content ? 'Yes' : 'No';

  if (type === 'date')
    content = moment(content).format('LLL');

  return (
    <EditableTypography name={name} data={data} {...etc}>
      {content}
    </EditableTypography>
  );
};

Attribute.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
};

/**
 * This will allow us to configure the component props once
 * and use in multiple places.
 */
export default (sharedProps) => (props) =>
  React.createElement(Attribute, {
    ...sharedProps,
    ...props,
  });
