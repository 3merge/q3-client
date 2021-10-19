import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

const FiltersStacked = ({ fields }) =>
  map(fields, (field) => (
    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary>{field.name}</AccordionSummary>
        <AccordionDetails>
          {field.component}
        </AccordionDetails>
      </Accordion>
    </Grid>
  ));

FiltersStacked.defaultProps = {
  fields: [],
};

FiltersStacked.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      component: PropTypes.node,
    }),
  ),
};

export default FiltersStacked;
