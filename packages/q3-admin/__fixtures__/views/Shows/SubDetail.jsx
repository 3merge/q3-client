import React from 'react';
import { SubDetail } from 'q3-admin';
import { Builders } from 'q3-ui-forms';

const SubDetailForm = (props) => (
  <Builders.Form {...props} keep={['title']}>
    <Builders.Field under="seasons" name="title" />
    <Builders.Field
      under="seasons"
      name="rte"
      type="editor"
    />
  </Builders.Form>
);

export default (props) => (
  <SubDetail
    {...props}
    th="seasons"
    root="seasons"
    cardProps={{
      title: 'title',
    }}
    initialValues={{
      title: '',
    }}
  >
    <SubDetailForm />
  </SubDetail>
);
