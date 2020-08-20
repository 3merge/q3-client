# ⌨️ Q3 UI Forms

## Builders

Most use cases can be taken care of using our builder
components. These components handle your state, validation
and marshalling workflows for you, allowing you to focus on
capturing user input safely and quickly. When more
customization is required, you can still import our field
components and hooks directly.

### Form

The `Form` component renders a basic HTML form element with
a few decorations like `onSubmit`, `onReset`, a submit
button and validation. It also sets up a MUI `Grid` for
formatting. See `Wrapper` for more information.

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

### Wrapper

The `Wrapper` HOC should not be called directly. Instead,
use either `Form` or `MultiStep`. This simply forwards state
functions and values into each.

#### Example

```javascript
import { Builders } from  'q3-ui-forms';

const incrementOne = v => v * 1.5;
const incrementTwo = v => v * 2.5;

export const WithProps () => (
	<Builders.Form
		initialValues={{ foo: 1, bar: 1 }}
		// will drop "bar" from state
		keep={['foo']}
		marshal={{
			foo: [
				incrementOne,
				incrementTwo,
			]
		}}
		onSubmit={(values) => {
			// values.foo will output 3.75
			// noop
		}}
	>
		<Builders.Field type="number" name="foo" />
	</Builders.Form>
);
```

#### Api

| Name      | Description                                                                      | Type       |
| --------- | -------------------------------------------------------------------------------- | ---------- |
| `keep`    | Drops every key from `initialValues` that doesn't match an item of this array    | `Array`    |
| `marshal` | Mutates internal field values pre-submit using a series of compounding functions | `Function` |

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
