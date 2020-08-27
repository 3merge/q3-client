# 🧰 Q3 Admin

## Usage

Q3 admin ships with a default component that handles most
state and routing for you. As such, there's a lot of props
available to customize this setup process. Most are optional
and used in more advanced cases.

### Admin

#### API

| Prop                                        | Description                                                                                                                                                  | Type      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `AppProps`                                  | A prop object for setting up views and custom routes.                                                                                                        | `object*` |
| `AppProps.customRoutes`                     | An array of components (with path props) to render inside the app's primary `Router` component                                                               | `array*`  |
| `AppProps.pages`                            | An array of collection objects for mounting all associated list and detail views. When using `AbstractBuilder`, key assignment for each object is automated. | `array`   |
| `AppProps.redirectPathForUnauthorizedUsers` | A path for redirecting non-authorized route requests. It defaults to login.                                                                                  | `string`  |
| `ProfileProps`                              | A prop object for customizing the profile route.                                                                                                             | `object`  |
| `ProfileProps.items`                        | An array of objects (`{ label: String, component: Node }`) for creating profile tabs and views.                                                              | `object`  |
| `ProfileProps.fields`                       | A component that renders directly inside the `ProfileGeneral` container. Used for adding fields or content to the default form.                              | `node`    |
| `ProfileProps.fieldKeys`                    | An array of profile attributes to add into the `ProfileGeneral` `initialValues` prop state. Otherwise, it defaults to `firstName`, `lastName` and `email`.   | `array`   |
| `ProfileProps.formProps`                    | An object forwarded into the `ProfileGeneral` inner `Form` component.                                                                                        | `object`  |

#### Example

```javascript
import React from 'react';
import Admin from 'q3-admin';
import { Builders } from 'q3-ui-forms';
import Dashboard from './components/Dashboard';
import Changelog from './components/Changelog';
import { addCountryCode } from './helpers';

export default () => (
  <Admin
    AppProps={{
      pages,
      customRoutes: [
        <Dashboard path="/" />,
        <Changelog path="/changelog" />,
      ],
      redirectPathForUnauthorizedUsers: 'login',
    }}
    ProfileProps={{
      fields: <Builders type="tel" name="tel" />,
      fieldKeys: ['tel'],
      fieldProps: {
        marshal: {
          tel: [addCountryCode],
        },
      },
      items: [
        {
          label: 'other',
          component: Foo,
        },
      ],
    }}
  />
);
```
