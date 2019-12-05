import React from 'react';
import { Router } from '@reach/router';
import Detail from 'q3-admin/lib/templates/detail';
import List from 'q3-admin/lib/templates/list';
import FormBuilder, {
  iterateSchemas,
} from 'q3-ui-forms/lib/builders/submit';
import { general } from './__fields.json';

const NewRateForm = (props) => (
  <FormBuilder
    {...props}
    title="newRate"
    deriveSubtitle
    dividers={false}
    fields={general}
  />
);

const createTabs = ({ patch, ...etc }) =>
  iterateSchemas(
    { general },
    { onSubmit: patch(), ...etc },
  );

export default (props) => (
  <Router>
    <List
      {...props}
      path="rates"
      addComponent={NewRateForm}
      columns={[['name', 'type'], 'value']}
      searchFields={['type', 'region']}
      searchSchema={(state) => ({
        type: {
          type: 'select',
          options: state.getOptions('type'),
        },
        regions: {
          type: 'select',
          options: state.getOptions('region'),
        },
      })}
    />
    <Detail
      path="rates/:id/*"
      views={createTabs}
      {...props}
    />
  </Router>
);
