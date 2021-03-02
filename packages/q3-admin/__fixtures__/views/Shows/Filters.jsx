import React from 'react';
import Filters from '../../../src/containers/filters';
import FilterEntry from '../../../src/components/FilterEntry';

const Add = () => (
  <Filters>
    {() => (
      <>
        <FilterEntry type="dateRange" name="demo" />
        <FilterEntry
          type="radio"
          name="demo"
          options={['Yes', 'No', 'Either']}
        />
        <FilterEntry
          type="checkset"
          name="example"
          options={['One', 'Two', 'Three', 'Four']}
          suppressLabel
          collapsable={false}
        />
        <FilterEntry
          type="checkset"
          name="example"
          options={['One', 'Two', 'Three', 'Four']}
          suppressLabel
          collapsable={false}
        />
        <FilterEntry
          type="checkset"
          name="example"
          options={['One', 'Two', 'Three', 'Four']}
          suppressLabel
          collapsable={false}
        />
      </>
    )}
  </Filters>
);

export default Add;
