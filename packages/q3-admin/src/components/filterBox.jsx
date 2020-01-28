import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from 'q3-ui/lib/iconButton';
import { Form, Back } from 'q3-ui-forms/lib/builders';
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
          label: 'Apply and Save',
          description:
            'Apply search filters and save them to your local browser',
          handler: () => null,
        },
      ]}
    />
  ),
);

const FilterForm = withLocation(
  ({ children, pushTo, params, ...rest }) => (
    <Box position="sticky" top="100px">
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
        <Box display="inline">
          <FilterActionButton />
          <Back label="reset" />
        </Box>
      </Form>
    </Box>
  ),
);

const FilterBox = ({ children, formFields, debug }) => {
  const { toggle, state } = useToggle(true);

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      {state && (
        <Grid item>
          <Box
            p={2}
            style={{
              height: '100%',
              backgroundColor: '#FFF',
              borderTop: '2px solid whitesmoke',
              width: 350,
            }}
          >
            <FilterForm debug={debug}>
              {formFields}
            </FilterForm>
          </Box>
        </Grid>
      )}
      <Grid item style={{ flex: 1 }}>
        <IconButton
          label="toggleFilterPanel"
          icon={SwapHoriz}
          buttonProps={{
            onClick: toggle,
            style: {
              marginLeft: state ? '-1.5rem' : 'auto',
            },
          }}
        />
        <Box my={2}>{children}</Box>
      </Grid>
    </Grid>
  );
};

FilterBox.propTypes = {
  children: PropTypes.func.isRequired,
};

export default FilterBox;
