import React from 'react';
import { Filters } from 'q3-admin/lib/containers';
import FilterEntry from 'q3-admin/lib/components/FilterEntry';

export default () => {
  return (
    <Filters
      debug
      initialValues={{ role: [], gender: [], flag: '' }}
    >
      {(fields, getFilters) => (
        <>
          <FilterEntry
            name="role"
            type="chips"
            options={getFilters('role')}
            freeSolo
          />
          <FilterEntry
            name="gender"
            type="checkset"
            options={getFilters('gender')}
          />
          <FilterEntry name="createdAt" type="dateRange" />
        </>
      )}
    </Filters>
  );
};
