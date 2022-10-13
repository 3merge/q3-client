import React from 'react';
import { Builders } from 'q3-ui-forms';
import { handleFormData } from 'q3-ui-forms/lib/helpers';
import SystemPageSub from '../../components/SystemPageSub';
import useDomainContext from '../../hooks/useDomainContext';

export const isNull = (v) =>
  v === 'null' || v === null ? '' : v;

const DomainChangePublicNotice = () => {
  const { domain = {}, update } = useDomainContext();

  return (
    <SystemPageSub title="domainPublicNotice">
      <Builders.Form
        isNew
        showSuccessMessage
        collectionName="domain"
        initialValues={domain}
        keep={['publicNotice']}
        onSubmit={handleFormData(update)}
      >
        <Builders.Field
          name="publicNotice"
          type="text"
          multiline
          rows={8}
          xl={12}
          lg={12}
        />
      </Builders.Form>
    </SystemPageSub>
  );
};

export default DomainChangePublicNotice;
