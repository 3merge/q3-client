import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import EditableTypography from './EditableTypography';
import useStyle from './useStyle';

export const Attribute = ({ name, data, ...etc }) => {
  const { label } = useStyle();
  const { t } = useTranslation('labels');

  return (
    <Grid container alignItems="center">
      <Grid item style={{ width: 'auto' }}>
        <Typography className={label}>
          {t(name)}:
        </Typography>
      </Grid>
      <Grid item style={{ flex: 1 }}>
        <EditableTypography
          name={name}
          data={data}
          {...etc}
        >
          {get(data, name)}
        </EditableTypography>
      </Grid>
    </Grid>
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
