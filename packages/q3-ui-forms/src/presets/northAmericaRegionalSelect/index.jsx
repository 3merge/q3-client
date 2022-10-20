import React from 'react';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { Field } from '../../builders';
import { asOptions } from '../../helpers';

export const CA = 'CA';
export const US = 'US';

export const PROVINCES = [
  'AB',
  'BC',
  'MB',
  'NB',
  'NL',
  'NT',
  'NS',
  'NU',
  'ON',
  'PE',
  'QC',
  'SK',
  'YT',
];

export const STATES = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const getRegions = (
  values,
  countryFieldName = 'country',
) => {
  const c = get(values, countryFieldName);
  if (!c) return [];
  return c === US
    ? asOptions(STATES)
    : asOptions(PROVINCES);
};

const NorthAmericaRegionalSelect = ({
  // so that it doesn't forward in
  // eslint-disable-next-line
  name,
  nameRegionSelect,
  nameCountrySelect,
  ...props
}) => (
  <Grid item xs={12}>
    <Grid container spacing={1}>
      <Grid item sm={6} xs={12}>
        <Field
          name={nameRegionSelect}
          type="select"
          listen={nameCountrySelect}
          required
          xl={12}
          lg={12}
          runOnChange={[nameCountrySelect]}
          override={({ values }) => ({
            options: getRegions(values, nameCountrySelect),
          })}
          {...props}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <Field
          name={nameCountrySelect}
          type="select"
          required
          xl={12}
          lg={12}
          options={[
            { value: CA, label: 'Canada' },
            { value: US, label: 'United States' },
          ]}
          {...props}
        />
      </Grid>
    </Grid>
  </Grid>
);

NorthAmericaRegionalSelect.defaultProps = {
  nameRegionSelect: 'region',
  nameCountrySelect: 'country',
};

NorthAmericaRegionalSelect.propTypes = {
  nameRegionSelect: PropTypes.string,
  nameCountrySelect: PropTypes.string,
};

export default NorthAmericaRegionalSelect;
