import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import SidePanelContent from '../../components/SidePanelContent';
import { Definitions } from '../state';
import FiltersForm from './FiltersForm';
import FiltersClear from './FiltersClear';
import FiltersShare from './FiltersShare';
import Segments from '../segments';

const Groups = ({ children, ...etc }) => {
  const { location } = React.useContext(Definitions);

  return (
    <Box my={1}>
      <Segments>
        {(renderer, onSave, searchValue) => (
          <FiltersForm
            search={searchValue}
            onSave={onSave}
            {...etc}
          >
            {(...params) => (
              <>
                <Grid item xs={12}>
                  {renderer()}
                </Grid>
                {children(...params)}
                <Grid item xs={12}>
                  <Button type="submit">Save</Button>
                </Grid>
              </>
            )}
          </FiltersForm>
        )}
      </Segments>
      <SidePanelContent title="Filters">
        <Box id="q3-filters">
          <FiltersForm search={location.search} {...etc}>
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
                      Apply filters
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
    </Box>
  );
};

Groups.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(Groups);
