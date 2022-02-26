# 🧰 Q3 Admin

## Containers

### Admin

Q3 admin ships with a default component that handles most
state and routing for you. As such, there's a lot of props
available to customize this setup process. Most are optional
and used in more advanced cases.

#### API

| Prop                 | Description                                                      | Type     |
| -------------------- | ---------------------------------------------------------------- | -------- |
| `AppProps.directory` | The relative path where Q3 renders (i.e. /app/)                  | `string` |
| `AppProps.pages`     | Collections to render. See `AbstractBuilder` for data structure. | `array`  |

#### Example

```javascript
import React from 'react';
import Admin from 'q3-admin';
import { Builders } from 'q3-ui-forms';
import Tests from './components/Tests';

export default () => (
  <Admin AppProps={{ pages }}>
    <Tests path="/tests" />
  </Admin>
);
```

### Detail

The container for viewing individual documents in Q3. When
using the builders, properties of `genDetail` and
`genDetailProps` are assembled into this container.

#### API

| Prop              | Description                                                                                                                          | Type          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `registerOptions` | Used to register custom UI elements in the detail side panel. Options can be programmatically setup or inferred (see example below). | `func/array*` |
| `registerPanels`  | Same as above for usage, though this prop is intended for lengthier content and actions.                                             | `func/array*` |

#### Example

```javascript
// programmatic method
export const registerOptions = (data, dispatchers, t) => {
  const out = [];
  if (data.isOn)
    out.push({
      title: t('titles:hello'),
      component: () => null,
    });

  return out;
};

// inferred method
export const registerPanels = [
  {
    // is localized
    title: 'hello',
    // receives all params from method above
    component: ({ data, dispatchers, t }) => null,
    // runs through comparisons for easy conditional rendering
    conditions: ['foo=1'],
  },
];
```

### Gatekeeper

The container for checking user authentication. Redirects
users if necessary.

#### API

| Prop                    | Description                                                                                                                                                                                     | Type     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `redirectCheck`         | Redirects users when the function returns a string. The function can take user profile as an argument. Note: redirectPathOnPublic and redirectPathOnSession are evaluated before this function. | `func`   |
| `redirectPathOnSession` | Redirects a user when logged in and this prop is a string.                                                                                                                                      | `string` |
| `redirectPathOnPublic`  | Redirects a user when not logged in and this prop is a string                                                                                                                                   | `string` |
| `children`              | children will be returned when none of conditions are true                                                                                                                                      | `node`   |

#### Example

```javascript
import { Gatekeeper } from  'q3-admin/lib/containers';
import  IsBrowserReady  from  'gatsby-theme-q3/src/components/IsBrowserReady';

const shouldRedirect = (auth) => auth.role === 'Employer" ? '/employers' : undefined;

const AdminPrivateGateway = ({ children, ...rest }) => {
	return (
		<IsBrowserReady>
			<Gatekeeper
				redirectCheck={shouldRedirect}
				redirectPathOnPublic="/login"
				{...rest}
			>
				{children}
			</Gatekeeper>
		</IsBrowserReady>
	);
};
```

## Components

### SidePanelAction

This component standardizes the UI for single-click actions
in the Detail SidePanel implementation.

#### API

| Prop          | Description                          | Type      |
| ------------- | ------------------------------------ | --------- |
| `description` | A key for the descriptions namespace | `string*` |
| `label`       | A key for the labels namespace       | `string*` |
| `onClick`     | A callback for the default button    | `func*`   |

#### Example

```javascript
import { SidePanelAction } from 'q3-admin/lib/components';

export default ({ isOn, update }) => (
  <SidePanelAction
    description="enableFeature"
    label={isOn ? 'off' : 'on'}
    onClick={update(!isOn)}
  />
);
```

## Hooks

### useIo

Returns `exportCollection` and `importCollection` for
connecting to Q3 API's process automation. Both methods are
curried and intended for use with click handlers. Note that
this hook does not actual call React hooks API, so it may be
used in non-components.

#### API

| Parameter | Description                                                 | Type     |
| --------- | ----------------------------------------------------------- | -------- | ------ |
| `ids`     | Document IDs to target in the bulk operation                | `string  | array` |
| `params`  | Location URL parameter methods (i.e. delete, set, toString) | `object` |

#### Example

```javascript
import { useIo } from 'q3-admin/lib/hooks';
import { withLocation } from 'with-location';

export default withLocation(({ params }) => {
  const { exportCollection } = useIo(1, params);
  return (
    <button
      type="button"
      onClick={exportCollection('templateName')}
    >
      Export ID #1
    </button>
  );
});
```
