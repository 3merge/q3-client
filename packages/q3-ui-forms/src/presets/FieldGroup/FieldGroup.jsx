import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'q3-ui-locale';
import Comparision from 'comparisons';
import { size } from 'lodash';
import useStyle from './useStyle';
import { BuilderState } from '../../FormsContext';

const FieldGroup = ({
  children,
  description,
  conditional,
  label,
}) => {
  const { values } = React.useContext(BuilderState);
  const { t } = useTranslation('labels');
  const cls = useStyle();

  const show =
    size(conditional) > 0
      ? new Comparision(conditional).eval(values)
      : true;

  return (
    show && (
      <Container>
        <Box my={2}>
          <Grid container spacing={2}>
            <Grid item className={cls.root}>
              <Typography variant="body2">
                <strong>{t(label)}</strong>
              </Typography>
              {description && (
                <Typography
                  variant="caption"
                  component="small"
                >
                  {t(`descriptions:${description}`)}
                </Typography>
              )}
            </Grid>
            <Grid item xs>
              <Grid container spacing={1}>
                {children}
              </Grid>
            </Grid>
          </Grid>
          <Box py={2}>
            <Divider />
          </Box>
        </Box>
      </Container>
    )
  );
};

FieldGroup.defaultProps = {
  conditional: [],
  description: undefined,
};

FieldGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  conditional: PropTypes.arrayOf(PropTypes.string),
};

export default FieldGroup;
