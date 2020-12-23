import React from 'react';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
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

export const getRegions = (values) => {
  const c = get(values, 'country');
  if (!c) return [];
  return c === US
    ? asOptions(STATES)
    : asOptions(PROVINCES);
};

const NorthAmericaRegionalSelect = (props) => (
  <Grid item xs={12}>
    <Grid container spacing={1}>
      <Grid item sm={6} xs={12}>
        <Field
          name="region"
          type="select"
          listen="country"
          required
          xl={12}
          lg={12}
          runOnChange={['country']}
          override={({ values }) => ({
            options: getRegions(values),
          })}
          {...props}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <Field
          name="country"
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

export default NorthAmericaRegionalSelect;
