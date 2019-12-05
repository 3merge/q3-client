import React from 'react';
import { Router } from '@reach/router';
import { useTranslation } from 'react-i18next';
import Detail from 'q3-admin/lib/templates/detail';
import List from 'q3-admin/lib/templates/list';
import FormBuilder, {
  iterateSchemas,
} from 'q3-ui-forms/lib/builders/submit';
import RepeaterBuilder from 'q3-ui-forms/lib/builders/repeater';
import { withJsonFields } from 'q3-ui-forms/lib/builders/fromJson';
import { withValidation } from 'q3-ui-forms/lib/validations';
import { formatTierValueStatment } from './utils';
import {
  general,
  conditions,
  tiers,
} from './__fields.json';

export const withTierRepeater = ({
  rebate,
  id,
  collectionName,
}) => {
  const { t } = useTranslation();
  const subfield = 'tiers';

  return {
    label: subfield,
    to: '/tiers',
    component: () => (
      <RepeaterBuilder
        id={id}
        resourceName={subfield}
        collectionName={collectionName}
        primary="quantity"
        primaryPrefix={`${t('labels:quantity')}: `}
        secondary={formatTierValueStatment(rebate)}
        wizardProps={{
          steps: withJsonFields({
            fields: tiers,
            collectionName,
            subfield,
          }),
          getValidation: withValidation(tiers),
          getContent: 'tier',
          initialValues: {
            quantity: '',
            value: '',
          },
        }}
      />
    ),
  };
};

const NewRebateForm = (props) => (
  <FormBuilder
    {...props}
    title="newRebate"
    deriveSubtitle
    dividers={false}
    fields={general}
    initialValues={{
      currency: 'CAD',
      symbol: '%',
    }}
  />
);

const createTabs = ({ patch, ...etc }) =>
  iterateSchemas(
    { general, conditions },
    { onSubmit: patch(), ...etc },
  ).concat(withTierRepeater(etc));

export default (props) => (
  <Router>
    <List
      {...props}
      path="rebates"
      addComponent={NewRebateForm}
      columns={[
        ['name', 'description'],
        'effectiveFrom',
        'expiresOn',
      ]}
      searchFields={['symbol', 'currency']}
      searchSchema={(state) => ({
        symbol: {
          type: 'select',
          options: state.getOptions('symbol'),
        },
        currency: {
          type: 'select',
          options: state.getOptions('currency'),
        },
      })}
    />
    <Detail
      path="rebates/:id/*"
      views={createTabs}
      {...props}
    />
  </Router>
);
