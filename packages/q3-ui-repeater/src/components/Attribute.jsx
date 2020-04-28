import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import useStyle from './useStyle';
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

  isIn,
}) => {
  const { tableCell } = useStyle();
  const { t } = useTranslation('labels');

  if (!Array.isArray(attributes)) return null;

  return attributes.map((attribute) => (
    <TableCell className={tableCell} key={attribute}>
      <Grid container spacing={2}>
        <Hidden mdUp>
          <Grid item style={{ marginLeft: '0.25rem' }}>
            <Typography
              variant="subtitle2"
              style={{ textTransform: 'uppercase' }}
            >
              {t(attribute)}:
            </Typography>
          </Grid>
        </Hidden>
        <Grid item>
          <Component
            editable={isIn(attribute)}
            name={attribute}
          />
        </Grid>
      </Grid>
    </TableCell>
  ));
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
