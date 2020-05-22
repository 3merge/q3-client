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
  <LocationProvider search="?paymentOption=Visa&currency.commons=CAD,USD&total%3C=100&total%3E=1500&email=mibberson%2Bdemo%403merge.ca&!hasLength.0">
    <LocationDebugger>
      <EncodedUrl
        debug
        onSave={console.log}
        initialValues={{
          try: '',
          paymentOption: '',
          currency: [],
          'total>': '',
          'total<': '',
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

        <Field name="total" type="range" />
        <Field
          name="currency~commons"
          type="multiselect"
          options={asOptions(['CAD', 'USD'])}
        />
        <Field
          name="draft"
          strict
          type="checkbox"
          checkedValue="!=isVisble"
        />
        <Field
          name="approved"
          type="radio"
          collapse={false}
          options={[
            {
              label: 'Is approved',
              value: 'exists(true)',
            },
            {
              label: 'Is not approved',
              value: 'exists(false)',
            },
            {
              label: 'Either',
              value: '',
            },
          ]}
        />
        <Field
          name="items~0"
          type="radio"
          collapse={false}
          options={[
            {
              label: 'Has at least one',
              value: 'has(true)',
            },
            {
              label: 'Has none',
              value: 'has(false)',
            },
            {
              label: 'Either',
              value: '',
            },
          ]}
        />

        <Field
          name="email"
          type="chips"
          options={[
            {
              label: 'Mike',
              value: 'mibberson+demo@3merge.ca',
            },
          ]}
        />
        <button type="submit">Enter</button>
      </EncodedUrl>
    </LocationDebugger>
  </LocationProvider>
);
