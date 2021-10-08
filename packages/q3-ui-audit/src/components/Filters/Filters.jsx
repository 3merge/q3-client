import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Builders } from 'q3-ui-forms';
import FilterByDate from '../FilterByDate';
import FilterByOperation from '../FilterByOperation';
import FilterByUser from '../FilterByUser';

const Filters = ({
  loading,
  initialValues,
  onSubmit,
  ...rest
}) => {
  const ref = React.useRef({
    current: null,
  });

  const getInitialValues = () => {
    if (
      String(initialValues?.user) ===
        String(ref?.current?.value) &&
      ref?.current?.value
    ) {
      const output = { ...initialValues };
      output.user = ref.current;
      return output;
    }

    return initialValues;
  };

  return (
    <Builders.Form
      disabled={loading}
      enableSubmit={false}
      initialValues={getInitialValues()}
      onSubmit={onSubmit}
      marshalSelectively
      marshal={{
        user: [
          (xs) => {
            ref.current = xs;
            return xs?.value || '';
          },
        ],
      }}
    >
      <Grid item xs={12}>
        <Grid
          container
          spacing={1}
          align="center"
          justify="space-between"
          style={{
            textAlign: 'left',
          }}
        >
          <Grid item xs>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Builders.Field
                  type="text"
                  name="search"
                  xl={12}
                  lg={12}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <FilterByUser {...rest} />
              </Grid>
              <Grid item md={3} xs={12}>
                <FilterByDate />
              </Grid>
              <Grid item md={3} xs={12}>
                <FilterByOperation />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={1}
            xs={12}
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box mt={0.5}>
              <Builders.Next
                disableGutters
                submit
                label="apply"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Builders.Form>
  );
};

Filters.defaultProps = {
  loading: false,
  initialValues: {
    date: new Date(),
    operation: [],
    user: '',
  },
};

Filters.propTypes = {
  initialValues: PropTypes.shape({
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    operation: PropTypes.arrayOf(PropTypes.string),
    user: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Filters;
