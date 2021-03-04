import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import SidePanelContent from '../../components/SidePanelContent';
import { Definitions } from '../state';
import FiltersForm from './FiltersForm';
import FiltersClear from './FiltersClear';
import FiltersShare from './FiltersShare';

const Groups = ({ children, ...etc }) => {
  const { location } = React.useContext(Definitions);
  const { t } = useTranslation('labels');

  return (
    <SidePanelContent title={t('filters')}>
      <Box id="q3-filters">
        <FiltersForm search={location?.search} {...etc}>
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
    </SidePanelContent>
  );
};

Groups.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Groups);
