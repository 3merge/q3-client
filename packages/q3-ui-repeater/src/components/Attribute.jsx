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
  const { label } = useStyle();
  const { t } = useTranslation('labels');

  return (
    <Box py={0.5}>
      <Grid container alignItems="center">
        <Grid item xl={2} lg={3} md={3} sm={2} xs={3}>
          <Typography className={label}>
            {t(name)}:
          </Typography>
        </Grid>
        <Grid item xl={9} lg={9} md={9} sm={10} xs={9}>
          <EditableTypography
            name={name}
            data={data}
            {...etc}
          >
            {get(data, name)}
          </EditableTypography>
        </Grid>
      </Grid>
    </Box>
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
