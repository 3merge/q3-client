import React from 'react';
import LocationProvider from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
import EncodedUrl from './EncodedUrl';
import { Field } from '../../builders';
import { asOptions } from '../../helpers';

export default {
  title: 'Q3 Forms|Adapters/EncodedUrl',
};

export const ToNavigate = () => (
  <LocationProvider search="?paymentOption=Visa&currency=CAD,USD&total>=100&total<=1500">
    <LocationDebugger>
      <EncodedUrl
        debug
        initialValues={{
          try: '',
          paymentOption: '',
          currency: [],
          'total%3E': '',
          'total%3C': '',
        }}
      >
        <Field
          name="paymentOption"
          type="autocomplete"
          options={asOptions([
            'Visa',
            'Mastercard',
            'PayPal',
          ])}
        />
        <Field name="total%3E" type="number" />
        <Field name="total%3C" type="number" />
        <Field
          name="currency"
          type="multiselect"
          options={asOptions(['CAD', 'USD'])}
        />
      </EncodedUrl>
    </LocationDebugger>
  </LocationProvider>
);
