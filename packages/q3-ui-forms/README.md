# ⌨️ Q3 UI Forms

## Builders

Most use cases can be taken care of using our builder
components. These components handle your state, validation
and marshalling workflows for you, allowing you to focus on
capturing user input safely and quickly. When more
customization is required, you can still import our field
components and hooks directly.

### Next

The `Next` component renders a submit button, controlled by
the form's master validation and submission state. In other
words, it will disable on load or error automatically.

#### Example

```javascript
import { Builders } from  'q3-ui-forms';

export const AsCustom () => (
	<Builders.Form>
		<Builders.Next>
			{(nextProps) => {
				// forward all props somewhere else
				return null;
			}}
		</Builders.Next>
	</Builders.Form>
);

export const AsDefault () => (
	<Builders.Form>
		<Builders.Next submit />
	</Builders.Form>
);
```

#### API

| Name       | Description                                                   | Type       |
| ---------- | ------------------------------------------------------------- | ---------- |
| `submit`   | Include if this should submit the parent form                 | `Boolean`  |
| `children` | Used to forward all state props into a custom element         | `Function` |
| `label`    | Replace the default button label                              | `String`   |
| `onClick`  | Used for non-submit buttons that still need to be state-aware | `Function` |

## Helpers

### `handleFormData`

The `handleFormData` curries the `onSubmit` handler to
process attachments for you. Rather than receiving the raw
data object, you'll get a FormData instance that can be sent
directly to your API.

#### Example

```javascript
import React from 'react';
import { Builders, helpers } from 'q3-ui-forms';

export default ({ onSubmit }) => (
  <Builders.Form
    onSubmit={helpers.handleFormData(onSubmit)}
  >
    <Builders.Field type="file" name="example" />
  </Builders.Form>
);
```
