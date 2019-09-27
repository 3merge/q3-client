import React from 'react';
import { Components, Templates } from 'q3-admin';

export default (props) => (
  <Templates.Detail
    {...props}
    name="users"
    pathToTitle="user.name"
    views={({ post }) => [
      {
        label: 'General',
        component: () => (
          <Components.Form
            title="general"
            onSubmit={post}
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
            }}
          >
            {() => (
              <>
                <Components.Input
                  name="firstName"
                  type="text"
                />
                <Components.Input
                  name="lastName"
                  type="text"
                />
                <Components.Input
                  name="email"
                  type="email"
                />
              </>
            )}
          </Components.Form>
        ),
      },
      {
        to: 'about',
        label: 'About',
        component: () => {
          return 'About';
        },
      },
    ]}
  />
);
