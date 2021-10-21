import React from 'react';
import { SubDetail } from 'q3-admin';
import { Builders } from 'q3-ui-forms';
import AccountBox from '@material-ui/icons/AccountBox';

export default (props) => (
  <SubDetail
    {...props}
    th="movies"
    root="movies"
    cardProps={{
      title: 'title',
      actions: [
        {
          icon: AccountBox,
          label: 'custom',
          component: (p) => (
            <Builders.Form {...p}>
              <Builders.Field name="title" />
              <Builders.Field name="year" type="date" />
            </Builders.Form>
          ),
        },
      ],
    }}
  >
    <Builders.Form>
      <Builders.Field name="title" />
      <Builders.Field name="year" type="date" />
    </Builders.Form>
  </SubDetail>
);
