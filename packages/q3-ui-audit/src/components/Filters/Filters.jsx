import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import { Builders } from 'q3-ui-forms';
import { get, isObject, uniq } from 'lodash';
import flat from 'flat';
import { useTranslation } from 'react-i18next';
import FilterByDate from '../FilterByDate';
import FilterByOperation from '../FilterByOperation';
import FilterByUser from '../FilterByUser';

export const generateSuggestions = (xs = []) => {
  if (!Array.isArray(xs)) return [];
  const ops = ['added', 'deleted', 'updated'];

  return uniq(
    xs
      .reduce((acc, curr) => {
        ops.forEach((op) => {
          if (isObject(get(curr, op))) {
            acc.push(
              Object.keys(
                flat(curr[op], {
                  safe: true,
                }),
              ),
            );
          }
        });

        return acc;
      }, [])
      .flat(3)
      .sort(),
  );
};

const Filters = ({
  loading,
  initialValues,
  onSubmit,
  ...rest
}) => {
  const { t } = useTranslation('descriptions');
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

  const handleSearchMarshal = (xs) =>
    isObject(xs) ? xs?.value : xs;

  const handleUserMarshal = (xs) => {
    ref.current = xs;
    return xs?.value || '';
  };

  return (
    <Builders.Form
      disabled={loading}
      enableSubmit={false}
      initialValues={getInitialValues(rest?.data)}
      onSubmit={onSubmit}
      marshalSelectively
      marshal={{
        search: [handleSearchMarshal],
        user: [handleUserMarshal],
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
                  type="autocomplete"
                  name="search"
                  helperText={t('auditSearch')}
                  freeSolo
                  options={generateSuggestions(rest?.data)}
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
