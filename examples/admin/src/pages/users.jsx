import React from 'react';
import Add from '@material-ui/icons/Add';
import Form from 'q3-ui/lib/form';
import Input from 'q3-ui/lib/inputs';
import Repeater from 'q3-ui/lib/repeater';
import { Delete as DeleteDialog } from 'q3-ui/lib/dialogs';
import Wizard from 'q3-ui/lib/wizard';
import { List } from 'q3-admin/lib/templates';
import { Detail } from 'q3-admin/lib/templates';
import { USER_COLLECTION } from '../constants';

export const UserDetail = (props) => (
  <Detail
    {...props}
    name="users"
    pathToTitle="user.first_name"
    views={({ user, put, remove, id }) => [
      {
        label: 'General',
        component: () => (
          <Form
            title="contact"
            onSubmit={put(id)}
            initialValues={user}
          >
            {() => (
              <>
                <Input name="first_name" />
                <Input name="last_name" />
                <Input name="gender" />
              </>
            )}
          </Form>
        ),
      },
      {
        to: 'about',
        label: 'About',
        component: () => (
          <Repeater
            name="about"
            primary="year"
            secondary="achievement"
            data={user.history}
            renderRowToolbar={() => (
              <>
                <DeleteDialog next={remove(id)} />
              </>
            )}
            renderPost={() => (
              <Wizard icon={Add} steps={[]} />
            )}
          />
        ),
      },
    ]}
  />
);

export const UserList = (props) => (
  <List
    {...props}
    name="users"
    enablePost={false}
    coll={USER_COLLECTION}
    columns={[
      ['first_name', 'email', 'featuredPhoto'],
      'gender',
      'ip_address',
    ]}
  />
);
