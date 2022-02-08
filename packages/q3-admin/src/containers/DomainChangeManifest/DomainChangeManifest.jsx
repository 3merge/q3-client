import React from 'react';
import { Builders } from 'q3-ui-forms';
import SystemPageSub from '../../components/SystemPageSub';
import useDomainContext from '../../hooks/useDomainContext';

const DomainChangeManifest = () => {
  const { domain = {}, update } = useDomainContext();

  return (
    <SystemPageSub title="domainManifest">
      <Builders.Form
        initialValues={domain}
        keep={[
          'brand',
          'title',
          'color',
          'supportedLngs',
          'description',
        ]}
        onSubmit={update}
      >
        <Builders.Field
          type="text"
          name="brand"
          xl={12}
          lg={12}
        />
        <Builders.Field
          type="text"
          name="title"
          xl={12}
          lg={12}
        />
        <Builders.Field
          type="color"
          name="color"
          xl={12}
          lg={12}
        />
        <Builders.Field
          type="chips"
          name="supportedLngs"
          options={domain.supportedLngs}
          xl={12}
          lg={12}
        />
        <Builders.Field
          type="text"
          name="description"
          multiline
          rows={5}
          max="155"
          xl={12}
          lg={12}
        />
      </Builders.Form>
    </SystemPageSub>
  );
};

export default DomainChangeManifest;
