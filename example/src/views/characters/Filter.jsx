import React from 'react';
import { Filters } from 'q3-admin/lib/containers';
import FilterEntry from 'q3-admin/lib/components/FilterEntry';

export default () => {
  return (
    <Filters
      initialValues={{ role: [], gender: [], flag: '' }}
    >
      {(fields) => (
        <>
          <FilterEntry
            name="role"
            type="chips"
            options={fields.role}
          />
          <FilterEntry
            name="gender"
            type="checkset"
            options={fields.gender}
          />
        </>
      )}
    </Filters>
  );
};
