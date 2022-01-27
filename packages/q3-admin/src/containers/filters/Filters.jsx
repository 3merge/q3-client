import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'q3-ui-locale';
import { useNavigate } from '@reach/router';
import { Definitions } from '../state';
import FiltersForm from './FiltersForm';
import FiltersClear from './FiltersClear';
import FiltersShare from './FiltersShare';

const Groups = ({ children, ...etc }) => {
  const { location } = React.useContext(Definitions);
  const { t } = useTranslation('labels');
  const navigate = useNavigate();

  return (
    <Box id="q3-filters">
      <FiltersForm
        onSave={(query) =>
          navigate(location.pathname + query)
        }
        search={location?.search}
        {...etc}
      >
        {(...params) => (
          <>
            {children(...params)}
            <Grid item xs={12}>
              <Box px={1} position="sticky" bottom="0">
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  style={{ marginBottom: '0.5rem' }}
                  fullWidth
                >
                  {t('applyFilters')}
                </Button>
                <Grid
                  container
                  justify="center"
                  spacing={2}
                >
                  <Grid item xs={6}>
                    <FiltersShare />
                  </Grid>
                  <Grid item xs={6}>
                    <FiltersClear />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </>
        )}
      </FiltersForm>
    </Box>
  );
};

Groups.defaultProps = {};

Groups.propTypes = {
  children: PropTypes.func.isRequired,
};

export default React.memo(Groups);
