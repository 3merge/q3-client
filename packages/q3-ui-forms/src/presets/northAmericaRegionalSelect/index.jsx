import React from 'react';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import { Field } from '../../builders';
import { asOptions } from '../../helpers';

export const CA = 'CA';
export const US = 'US';

const PROVINCES = [
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

const STATES = [
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

export const getRegions = (values) => {
  const c = get(values, 'country');
  if (!c) return [];
  return c === US
    ? asOptions(STATES)
    : asOptions(PROVINCES);
};

const NorthAmericaRegionalSelect = () => (
  <Grid container>
    <Grid item md={4} xs={6}>
      <Field
        name="region"
        type="select"
        required
        override={({ values }) => ({
          options: getRegions(values),
        })}
      />
    </Grid>
    <Grid item md={8} xs={6}>
      <Field
        name="country"
        type="select"
        required
        options={[
          { value: CA, label: 'Canada' },
          { value: US, label: 'United States' },
        ]}
      />
    </Grid>
  </Grid>
);

export default NorthAmericaRegionalSelect;
