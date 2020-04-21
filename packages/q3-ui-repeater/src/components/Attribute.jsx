import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';
import TableCell from '@material-ui/core/TableCell';

import EditableTypography from './EditableTypography';

//= ===============================================================================
// Helpers
//= ===============================================================================

export const getBoolIcon = (truthy) =>
  truthy ? 'Yes' : 'No';

export const getContent = (content, contentType) => {
  if (contentType === 'checkbox')
    return getBoolIcon(content);

  if (!content) return '--';

  if (contentType === 'date')
    return moment(content).format('LLL');

  return content;
};

//= ===============================================================================
// Partials
//= ===============================================================================

export const Attribute = ({ name, data, ...etc }) => (
  <EditableTypography name={name} data={data} {...etc}>
    {getContent(get(data, name), get(etc, 'editable.type'))}
  </EditableTypography>
);

Attribute.propTypes = {
  /**
   * Used to fetch data from state.
   */
  name: PropTypes.string.isRequired,

  /**
   * The repeater state.
   */
  data: PropTypes.shape({}).isRequired,
};

//= ===============================================================================
// Components
//= ===============================================================================

export const Attributes = ({
  component: Component,
  attributes,
  show,
  isIn,
}) =>
  show &&
  attributes.map((attribute) => (
    <TableCell key={attribute}>
      <Component
        editable={isIn(attribute)}
        name={attribute}
      />
    </TableCell>
  ));

/**
 * This will allow us to configure the component props once
 * and use in multiple places.
 */
export default (sharedProps) => (props) =>
  React.createElement(Attribute, {
    ...sharedProps,
    ...props,
  });
