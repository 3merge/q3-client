import React from 'react';
import { Builders } from 'q3-ui-forms';
import { handleFormData } from 'q3-ui-forms/lib/helpers';
import SystemPageSub from '../../components/SystemPageSub';
import useDomainContext from '../../hooks/useDomainContext';

export const isNull = (v) =>
  v === 'null' || v === null ? '' : v;

const DomainChangePolicies = () => {
  const { domain = {}, update } = useDomainContext();

  return (
    <SystemPageSub title="domainPolicies">
      <Builders.Form
        isNew
        showSuccessMessage
        collectionName="domain"
        initialValues={domain}
        modify={{
          'termsFilePath': [isNull],
          'privacyFilePath': [isNull],
          'cancellationFilePath': [isNull],
        }}
        onSubmit={handleFormData(update)}
      >
        <Builders.Field
          folder="uploads"
          name="termsFilePath"
          type="file"
        />
        <Builders.Field
          folder="uploads"
          name="privacyFilePath"
          type="file"
        />
        <Builders.Field
          folder="uploads"
          name="cancellationFilePath"
          type="file"
        />
      </Builders.Form>
    </SystemPageSub>
  );
};

export default DomainChangePolicies;
