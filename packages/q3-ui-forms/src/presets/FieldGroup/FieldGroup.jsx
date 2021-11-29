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

const FieldGroup = ({ children, conditional, label }) => {
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
          <Grid container>
            <Grid item className={cls.root}>
              <Typography variant="body2">
                <strong>{t(label)}</strong>
              </Typography>
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
};

FieldGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  label: PropTypes.string.isRequired,
  conditional: PropTypes.arrayOf(PropTypes.string),
};

export default FieldGroup;
