import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import EditableTypography from './EditableTypography';
import useStyle from './useStyle';

export const Attribute = ({ name, data, ...etc }) => {
  const { label, attribute } = useStyle();
  const { t } = useTranslation('labels');

  return (
    <Grid item className={attribute}>
      <Box border="1px solid whitesmoke" p={1}>
        <Typography variant="overline" className={label}>
          {t(name)}
        </Typography>
        <EditableTypography
          name={name}
          data={data}
          {...etc}
        >
          {get(data, name)}
        </EditableTypography>
      </Box>
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
