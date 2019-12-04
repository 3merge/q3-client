import React from 'react';
import { Router } from '@reach/router';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { getForTransfer } from 'q3-ui-rest';
import Detail from 'q3-admin/lib/templates/detail';
import List from 'q3-admin/lib/templates/list';
import FormBuilder, {
  iterateSchemas,
} from 'q3-ui-forms/lib/builders/submit';
import RepeaterBuilder from 'q3-ui-forms/lib/builders/repeater';
import {
  withJsonFields,
  withValidation,
} from 'q3-ui-forms/lib/builders/fromJson';
import { formatTierValueStatment } from './utils';

const rebateTabsSchema = {
  general: {
    name: {
      type: 'text',
      required: true,
      validate: yup.string().required(),
    },
    description: {
      type: 'text',
      required: true,
      validate: yup.string().required(),
      multiline: true,
      rows: 5,
    },
    couponCode: {
      type: 'string',
      validate: yup.string(),
    },
    value: {
      type: 'number',
      validate: yup
        .number()
        .min(0)
        .required(),
    },
    currency: {
      type: 'select',
      options: ['CAD', 'USD'].map((value) => ({
        label: value,
        value,
      })),
      validate: yup
        .mixed()
        .oneOf(['CAD', 'USD'])
        .required(),
    },
    symbol: {
      type: 'select',
      options: ['$', '%'].map((value) => ({
        label: value,
        value,
      })),
      validate: yup
        .mixed()
        .oneOf(['$', '%'])
        .required(),
    },
  },
  conditions: {
    effectiveFrom: {
      type: 'date',
    },
    expiresOn: {
      type: 'date',
    },
    maximumPerProduct: {
      type: 'number',
      validate: yup.number(),
    },
    maximumPerOrder: {
      type: 'number',
      validate: yup.number(),
    },
    maximumPerHistory: {
      type: 'number',
      validate: yup.number(),
    },
    requiredSkus: {
      type: 'transfer',
      loadOptions: getForTransfer(
        '/products',
        'products',
        'sku',
      ),
    },
    conditionalSkus: {
      type: 'transfer',
      loadOptions: getForTransfer(
        '/products',
        'products',
        'sku',
      ),
    },
    conditionalSkuThreshold: {
      type: 'number',
      validate: yup.number(),
    },
  },
};

const tierFields = {
  quantity: {
    type: 'number',
    required: true,
    validate: yup
      .number()
      .min(0)
      .required(),
  },
  value: {
    type: 'number',
    required: true,
    validate: yup
      .number()
      .min(0)
      .required(),
  },
};

export const withRepeater = (rebate, id) => {
  const { t } = useTranslation();
  const subfield = 'tiers';
  const collectionName = 'rebates';

  return () => (
    <RepeaterBuilder
      id={id}
      resourceName={subfield}
      collectionName={collectionName}
      primary="quantity"
      secondary={formatTierValueStatment(rebate)}
      primaryPrefix={`${t('labels:quantity')}: `}
      wizardProps={{
        steps: withJsonFields({
          fields: tierFields,
          subfield,
          collectionName,
        }),
        getValidation: withValidation(tierFields),
        getContent: 'tier',
        initialValues: {
          quantity: '',
          value: '',
        },
      }}
      data={{
        quantity: '',
        value: '',
      }}
    />
  );
};

const createTabs = ({ id, patch, rebate = {}, ...etc }) =>
  iterateSchemas(rebateTabsSchema, {
    collectionName: 'rebates',
    onSubmit: patch(null),
    data: rebate,
    ...etc,
  }).concat({
    component: withRepeater(rebate, id),
    label: 'tiers',
    to: '/tiers',
  });

const NewRebateForm = ({ post }) => (
  <FormBuilder
    isNew
    deriveSubtitle
    collectionName="rebates"
    title="newRebate"
    onSubmit={post}
    dividers={false}
    fields={rebateTabsSchema.general}
    initialValues={{
      name: '',
      description: '',
      value: 0,
      currency: 'CAD',
      maximum: '',
      symbol: '$',
    }}
  />
);

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
