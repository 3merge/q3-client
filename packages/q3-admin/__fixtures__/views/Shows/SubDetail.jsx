import React from 'react';
import { SubDetail } from 'q3-admin';
import { Builders } from 'q3-ui-forms';
import { compact, join } from 'lodash';

const printAddress = ({ print }) =>
  join(compact(print), ', ') || 'Unset';

export default (props) => (
  <SubDetail
    {...props}
    th="movies"
    root="movies"
    cardProps={{
      title: printAddress,
    }}
    initialValues={{
      title: '',
    }}
  >
    <Builders.Form
      {...props}
      keep={[
        'name',
        'streetNumber',
        'streetLine1',
        'streetLine2',
        'city',
        'postal',
        'region',
        'country',
      ]}
    >
      <div />
    </Builders.Form>
  </SubDetail>
);
