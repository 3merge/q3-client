import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { Form } from 'q3-ui-forms/lib/builders';
import SplitButton from 'q3-ui/lib/splitButton';
import { withLocation } from 'with-location';
import { useToggle } from 'useful-state';
import { connect } from 'formik';

const FilterActionButton = connect(
  ({ formik: { submitForm } }) => (
    <SplitButton
      size="normal"
      color="secondary"
      options={[
        {
          label: 'Apply',
          description:
            'Append all filters to the search results',
          handler: submitForm,
        },
        {
          label: 'Apply/Save',
          description:
            'Apply search filters and save them to your local browser',
          handler: () => null,
        },
        {
          label: 'Reset',
          description:
            'Append all filters to the search results',
          handler: submitForm,
        },
        {
          label: 'Reset/Save',
          description:
            'Append all filters to the search results',
          handler: submitForm,
        },
      ]}
    />
  ),
);

const FilterForm = withLocation(
  ({ children, pushTo, params, ...rest }) => (
    <Box position="sticky" top="80px">
      <Form
        enableSubmit={false}
        onSubmit={(values) => {
          pushTo(values);
          navigate(`?${params.toString()}`);
        }}
        {...rest}
      >
        <Typography variant="h5" component="h3">
          Narrow the results
        </Typography>
        {children}
        <FilterActionButton />
      </Form>
    </Box>
  ),
);

// MOBILE IT BECOMES FIXED...
// TABLE BREAKPOINT EARLIER...

const FilterBox = ({ children, formFields, debug }) => {
  const { toggle, state } = useToggle(true);

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      {state && (
        <Grid item>
          <Box
            py={3}
            px={3}
            style={{
              border: '2px solid whitesmoke',
              background: '#FFF',
              height: '100%',
              width: 255,
            }}
          >
            <FilterForm debug={debug}>
              {formFields}
            </FilterForm>
          </Box>
        </Grid>
      )}
      <Grid item style={{ flex: 1 }}>
        <Fab
          size="small"
          aria-label="Toggle filter panel"
          onClick={toggle}
          style={{
            marginLeft: '-1.5rem',
            position: 'fixed',
            top: '82%',
          }}
        >
          <SwapHoriz />
        </Fab>
        <Box my={2}>{children}</Box>
      </Grid>
    </Grid>
  );
};

FilterBox.propTypes = {
  children: PropTypes.func.isRequired,
};

export default FilterBox;
