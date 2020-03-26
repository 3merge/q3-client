import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BlockIcon from '@material-ui/icons/Block';
import { green, red } from '@material-ui/core/colors';
import EditableTypography from './EditableTypography';

export const getBoolIcon = (truthy) =>
  truthy ? (
    <CheckCircleOutlineIcon style={{ color: green[900] }} />
  ) : (
    <BlockIcon style={{ color: red[900] }} />
  );

export const getContent = (content, contentType) => {
  if (contentType === 'checkbox')
    return getBoolIcon(content);

  if (!content) return '--';

  if (contentType === 'date')
    return moment(content).format('LLL');

  return content;
};

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

/**
 * This will allow us to configure the component props once
 * and use in multiple places.
 */
export default (sharedProps) => (props) =>
  React.createElement(Attribute, {
    ...sharedProps,
    ...props,
  });
