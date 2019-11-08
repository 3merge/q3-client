import React from 'react';
import Add from '@material-ui/icons/ShoppingCart';
import Form from 'q3-ui/lib/form';
import Input from 'q3-ui/lib/inputs';
import Repeater from 'q3-ui/lib/repeater';
import { Delete as DeleteDialog } from 'q3-ui/lib/dialogs';
import Wizard from 'q3-ui/lib/wizard';
import { List } from 'q3-admin/lib/templates';
import { Detail } from 'q3-admin/lib/templates';
import Picture from 'q3-admin/lib/presets/picture';
import Uploads from 'q3-admin/lib/presets/files';
import { USER_COLLECTION } from '../constants';

export const UserDetail = (props) => (
  <Detail
    {...props}
    name={USER_COLLECTION}
    coll={USER_COLLECTION}
    pathToTitle="user.firstName"
    resourceName="users"
    resourceNameSingular="user"
    views={({ user, put, id }) => [
      {
        to: '/',
        label: 'General',
        component: () => (
          <div>
            <Form
              title="contact"
              onSubmit={put(id)}
              initialValues={user}
            >
              {() => (
                <>
                  <Input name="firstName" />
                  <Input name="lastName" />
                  <Input name="email" />
                </>
              )}
            </Form>
          </div>
        ),
      },
      {
        to: '/profile',
        label: 'Profile',
        component: () => (
          <Picture
            path={`${USER_COLLECTION}/${id}`}
            photo={user.photo}
          />
        ),
      },
      {
        to: '/uploads',
        label: 'Uploads',
        component: () => (
          <Uploads path={`${USER_COLLECTION}/${id}`} />
        ),
      },
    ]}
  />
);

export const UserList = (props) => (
  <List
    {...props}
    resourceName="users"
    resourceNameSingular="user"
    coll={USER_COLLECTION}
    name={USER_COLLECTION}
    columns={[
      ['firstName', 'email', 'photo'],
      'gender',
      'ip_address',
    ]}
  />
);
