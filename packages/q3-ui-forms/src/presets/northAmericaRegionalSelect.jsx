import React from 'react';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import { Field } from '../builders';
import { asOptions } from '../helpers';

const CA = 'CA';
const US = 'US';

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
  'AS',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DE',
  'DC',
  'FM',
  'FL',
  'GA',
  'GU',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MH',
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
  'MP',
  'OH',
  'OK',
  'OR',
  'PW',
  'PA',
  'PR',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VI',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY',
];

export const getRegions = (values) =>
  get(values, 'country') === US
    ? asOptions(STATES)
    : asOptions(PROVINCES);

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
