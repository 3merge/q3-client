import React from 'react';
import { Builders } from 'q3-ui-forms';
import SystemPageSub from '../../components/SystemPageSub';
import useDomainContext from '../../hooks/useDomainContext';

export const isNull = (v) =>
  v === 'null' || v === null ? '' : v;

const DomainChangePolicies = () => {
  const { domain = {}, update } = useDomainContext();

  return (
    <SystemPageSub title="domainPolicies">
      <Builders.Form
        initialValues={domain}
        modify={{
          'terms': [isNull],
          'privacy': [isNull],
          'cancellation': [isNull],
        }}
        onSubmit={update}
      >
        <Builders.Field
          folder="uploads"
          name="terms"
          type="file"
        />
        <Builders.Field
          folder="uploads"
          name="privacy"
          type="file"
        />
        <Builders.Field
          folder="uploads"
          name="cancellation"
          type="file"
        />
      </Builders.Form>
    </SystemPageSub>
  );
};

export default DomainChangePolicies;
